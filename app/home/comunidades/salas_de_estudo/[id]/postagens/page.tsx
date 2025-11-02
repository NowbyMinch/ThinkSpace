"use client";

import {
  motion,
  AnimatePresence,
  useMotionValue,
  animate,
} from "framer-motion";
import { useState, useEffect, useRef } from "react";
import ErrorModal from "@/components/ui/ErrorModal";
import Loading from "@/app/home/components/loading";
import { Ellipsis, Heart, MessageCircle, Router, X } from "lucide-react";
import PostagemDetail from "@/components/postagemDetail";
import { Backdrop3 } from "@/app/home/components/backdrop";
import { usePathname, useRouter } from "next/navigation";

type UserData = { primeiroNome?: string; cargo?: string; foto?: string };
type BannerData = {
  mensagem?: string;
  relatorio?: string;
  relatorioUrl?: string;
};
type Autor = {
  id: string;
  nome: string;
  foto: string;
  perfil: string | null;
};

type Sala = {
  id: string;
  nome: string;
  descricao: string;
  banner: string;
  moderadorId: string;
  tipo: "PUBLICA" | "PRIVADA"; // assuming only these two options
  assunto: string | null;
  criadoEm: string; // ISO date string
  topicos: string[];
};

type Postagem = {
  id: string;
  conteudo: string;
  criadoEm: string; // formato ISO (ex: "2025-11-01T23:00:07.203Z")
  curtidas: number;
  quantidadeCurtidas: number;
  curtidoPeloUsuario: boolean;
  quantidadeComentarios: number;
  autor: Autor;
  comentarios: any[]; // pode ser detalhado depois, se você tiver o formato dos comentários
  sala: Sala;
};

export default function Materiais() {
  const pathname = usePathname();
  const router = useRouter();
  const [message, setMessage] = useState<string | null>(null);
  const [user, setUser] = useState<UserData>({});
  const [bannerData, setBannerData] = useState<BannerData>({});
  const [loading, setLoading] = useState(false);
  const [appear, setAppear] = useState(0);
  const [image, setImage] = useState(0);
  const [open, setOpen] = useState(false);
  const [scale, setScale] = useState(1);
  const [origin, setOrigin] = useState({ x: 50, y: 50 });
  const imgContainerRef = useRef<HTMLDivElement>(null);
  const salaID = pathname.split("/")[4];
  const [posts, setPosts] = useState<Postagem[]>([]);
  const [userID, setUserID] = useState<string>("");
  const [curtidaCheck, setCurtidaCheck] = useState<boolean | undefined>(
    undefined
  );
  const [curtidaNumero, setCurtidaNumero] = useState<number>(-1);
  const [open2, setOpen2] = useState(false);
  const [postText, setPostText] = useState<string>("");

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    if (!imgContainerRef.current) return;
    const rect = imgContainerRef.current.getBoundingClientRect();
    const offsetX = ((e.clientX - rect.left) / rect.width) * 100;
    const offsetY = ((e.clientY - rect.top) / rect.height) * 100;
    setOrigin({ x: offsetX, y: offsetY });
    const delta = e.deltaY > 0 ? -0.15 : 0.15;
    setScale((prev) => {
      const next = Math.min(Math.max(prev + delta, 1), 3);
      if (delta < 0 && next < prev) {
        animate(x, 0, { duration: 0.25, ease: "easeOut" });
        animate(y, 0, { duration: 0.25, ease: "easeOut" });
      }
      return next;
    });
  };

  // --- Fetch posts + user, with sessionStorage caching for scroll + posts ---
  useEffect(() => {
    const fetchAll = async () => {
      try {
        const userIDRes = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/users/id`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        const userIDdata = await userIDRes.json(); // parse the response
        setUserID(userIDdata.userId); // set the state

        const [userRes, postsRes] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/home/identificacao`, {
            method: "GET",
            credentials: "include",
          }),
          fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/sala-estudo/${salaID}/posts?usuarioId=${userIDdata.userId}`,
            {
              method: "GET",
              credentials: "include",
            }
          ),
        ]);

        const [userData, postsData] = await Promise.all([
          userRes.json(),
          postsRes.json(),
        ]);
        setUser(userData);
        setPosts(postsData);
        console.log(postsData);

        console.log("✅ All data successfully loaded");
      } catch (err) {
        console.error("Erro ao carregar dados:", err);
        setMessage("Erro ao carregar dados.");
      } finally {
        setLoading(false);
      }
    };

    // Restore cached posts and scroll if present
    const cachedPosts = sessionStorage.getItem("materiaisPosts");
    const scrollY = sessionStorage.getItem("materiaisScroll");
    if (cachedPosts) {
      setPosts(JSON.parse(cachedPosts));
      sessionStorage.removeItem("materiaisPosts");
    } else {
      fetchAll();
    }
    if (scrollY) {
      window.scrollTo(0, parseFloat(scrollY));
      sessionStorage.removeItem("materiaisScroll");
    }
  }, []);

  // --- Fetch posts + user, with sessionStorage caching for scroll + posts ---
  useEffect(() => {
    console.log(curtidaCheck);
  }, [curtidaCheck]);

  function formatNumber(num: number) {
    if (num >= 1_000_000)
      return (num / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
    if (num >= 1_000) return (num / 1_000).toFixed(1).replace(/\.0$/, "") + "k";
    return num.toString();
  }

  function closing() {
    setOpen(false);
    setOpen2(false);
    setImage(0);
  }

  const handleOpenPost = (postId: string, autorId: string) => {
    sessionStorage.setItem("materiaisScroll", String(window.scrollY));
    sessionStorage.setItem("materiaisPosts", JSON.stringify(posts));
    router.push(`/home/comunidades/postagens/${autorId}/${postId}`);
  };

  const CurtidaCheck = async (postID: string) => {
    try {
      const userIDRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/id`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      const userIDdata = await userIDRes.json(); // parse the response
      setUserID(userIDdata.userId); // set the state

      const CurtidaCheck = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/sala-estudo/post/${postID}?usuarioId=${userIDdata.userId}`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const curtidaData = await CurtidaCheck.json(); // parse the response
      setCurtidaCheck(curtidaData.curtidoPeloUsuario);

      console.log("✅CURTIDA CHECK ", curtidaData);
    } catch (err) {
      console.error("Erro ao carregar dados:", err);
      setMessage("Erro ao carregar dados.");
    } finally {
      setLoading(false);
    }
  };

  const Curtir = async (id: string) => {
    try {
      // 🔹 Atualizar o post localmente (otimista)
      setPosts((prevPosts) =>
        prevPosts.map((post) => {
          if (post.id !== id) return post; // não mexe nos outros posts
          const newLiked = !post.curtidoPeloUsuario;
          const newLikes = newLiked
            ? post.curtidas + 1
            : Math.max(post.curtidas - 1, 0);
          return { ...post, curtidoPeloUsuario: newLiked, curtidas: newLikes };
        })
      );

      // 🔹 Pegar userID
      const userIDRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/id`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const userIDdata = await userIDRes.json();
      const userID = userIDdata.userId;

      // 🔹 POST para backend
      const curtirRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/sala-estudo/post/${id}/curtir/${userID}`,
        { method: "POST", credentials: "include" }
      );

      // 🔹 GET para confirmar o estado atualizado
      const curtirCheckRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/sala-estudo/post/${id}?usuarioId=${userID}`,
        { method: "GET", credentials: "include" }
      );

      if (!curtirRes.ok || !curtirCheckRes.ok)
        throw new Error("Erro ao curtir");

      const curtidaData = await curtirCheckRes.json();

      // 🔹 Sincronizar com backend
      setPosts((prevPosts) =>
        prevPosts.map((post) => {
          if (post.id !== id) return post;
          return {
            ...post,
            curtidoPeloUsuario: curtidaData.curtidoPeloUsuario,
            curtidas: curtidaData.curtidas,
          };
        })
      );
    } catch (error) {
      console.error("Erro ao curtir:", error);
    }
  };

  const CriarPost = async () => {
    try {
      // 🔹 Get user ID
      const userIDRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/id`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const userIDdata = await userIDRes.json();
      const userID = userIDdata.userId;

      const payload = {
        salaId: salaID,
        autorId: userID,
        conteudo: postText,
      };

      const postarRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/sala-estudo/post`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload), // ✅ send the object, not the string
          credentials: "include",
        }
      );

      const postarData = await postarRes.json();
      console.log(postarData);
    } catch (error) {
      console.error("Erro ao curtir:", error);
    } finally {
      closing();
    }
  };

  if (loading) return <Loading />;

  return (
    <>
      {open && (
        <>
          <motion.div
            key="content"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="w-full h-full fixed top-0 left-0 flex justify-center items-center overflow-hidden z-[1100]"
          >
            <div
              className="w-full h-full absolute top-0 left-0 cursor-zoom-out"
              onClick={() => closing()}
            />
            <motion.div
              ref={imgContainerRef}
              onWheel={handleWheel}
              drag={scale > 1}
              dragMomentum={false}
              style={{
                scale,
                transformOrigin: `${origin.x}% ${origin.y}%`,
                x,
                y,
              }}
              className="relative z-10 max-w-[95vw] max-h-[95vh] cursor-grab active:cursor-grabbing select-none"
            >
              <img
                src="/Profile.png"
                alt="zoomed image"
                draggable={false}
                className="w-auto h-auto max-w-full max-h-[95vh] rounded-[20px] shadow-lg object-contain"
              />
            </motion.div>
          </motion.div>
          <div className="w-full absolute flex justify-center items-center ">
            <Backdrop3 onClick={() => closing()} />
          </div>
        </>
      )}
      {open2 && (
        <>
          <motion.div
            key="content"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 0.94 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="w-full h-full fixed  flex justify-center overflow-hidden items-center z-[1100] "
          >
            <div
              className="w-full h-full absolute"
              onClick={() => closing()}
            ></div>

            <motion.div
              key="content"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 0.94 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="w-[500px] max-h-[100vh] bg-white h-auto flex rounded-[40px] overflow-hidden z-[1100]"
            >
              <div
                id="white-box"
                className="p-4 gap-4 w-full rounded-[40px] overflow-hidden shadow-md flex flex-col items-center relative z-[1100]"
              >
                <img
                  src="/Vector.svg"
                  alt="Decoração"
                  className="absolute top-0 left-[-180px] rotate-90 w-[550px] -z-10"
                />

                <div className="w-full flex flex-col justify-center h-full gap-4">
                  <div className="flex ">
                    <div className=" flex flex-col justify-center items-center w-full text-[35px] font-medium">
                      Fazer postagem:
                    </div>
                    <div className=" w-fit">
                      <motion.div
                        whileHover={{ scale: 1.08 }}
                        whileTap={{ scale: 0.92 }}
                        onClick={closing}
                        className="ml-auto cursor-pointer z-1000 w-6 h-6"
                      >
                        <X className="w-full h-full" />
                      </motion.div>
                    </div>
                  </div>

                  <div className="w-full text-[18px]  rounded-[25px] overflow-hidden">
                    <textarea
                      className="w-full pl-4 py-2 min-h-full h-full text-[18px] border-2 overflow-y-auto border-[rgba(0,0,0,0.19)] shadow-md rounded-[25px] outline-[rgba(151,103,248,0.6)]  "
                      placeholder="Escreva um comentário..."
                      // value={newComentario}
                      // value={comentar}
                      onChange={(e) => {
                        // setComentar(e.target.value);
                        //   setNewComentario(e.target.value)
                        const textarea = e.target;
                        textarea.style.height = "auto"; // reset height
                        textarea.style.maxHeight = "200px";
                        textarea.style.height = textarea.scrollHeight + "px";
                      }}
                      rows={1}
                    />
                  </div>
                  <div className="w-full flex justify-center items-center">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ ease: "easeInOut" }}
                      onClick={CriarPost}
                      className="self-start bg-[#9B79E0] text-white px-4 py-2 shadow-md  rounded-full"
                    >
                      Postar
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          <div className="w-full absolute flex justify-center items-center">
            <Backdrop3 onClick={() => closing()} />
          </div>
        </>
      )}

      <div className="w-full h-full flex flex-col px-4 py-2 gap-4 ">
        <div className="flex justify-between">
          <h1 className="text-[24px] font-medium">Principais postagens</h1>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ ease: "easeInOut" }}
            onClick={() => setOpen2(true)}
            className="self-start bg-[#9B79E0] text-white px-4 py-2 shadow-md  rounded-full"
          >
            Criar post
          </motion.button>
        </div>

        {posts.map((post, index) => {
          return (
            <div key={index} className="w-full h-fit flex flex-col mb-4">
              <div className="w-full flex flex-col gap-6">
                <div className="flex gap-1">
                  <img
                    src={`${post.autor.foto}`}
                    className="rounded-full cursor-pointer transition-all w-12 h-12 shadow-md"
                    alt="Foto de perfil"
                  />
                  <div className="flex flex-col text-[18px] justify-center">
                    <span className="font-semibold truncate">
                      {post.autor.nome}
                    </span>
                  </div>
                </div>

                <p className="text-[18px]">{post.conteudo}</p>

                <div className="flex justify-between pb-4 border border-b-[#D7DDEA]">
                  <div className="flex gap-5">
                    <div className="flex gap-1 font-semibold">
                      <motion.div
                        onClick={() => {
                          Curtir(post.id);
                        }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        animate={{
                          scale: curtidaCheck ? [1, 1.4, 1] : 1, // 💓 bounce animation
                        }}
                        transition={{
                          duration: 0.3,
                          ease: "easeOut",
                        }}
                        className="w-6 h-6 cursor-pointer"
                      >
                        <Heart
                          className="text-[#C85959] w-full h-full"
                          fill={
                            curtidaCheck !== undefined
                              ? curtidaCheck
                                ? "#C85959"
                                : "transparent"
                              : post.curtidoPeloUsuario
                                ? "#C85959"
                                : "transparent"
                          }
                          stroke="currentColor"
                        />
                      </motion.div>
                      {curtidaNumero === -1 ? (
                        <span>{formatNumber(post.curtidas)}</span>
                      ) : (
                        <span>
                          {curtidaNumero ? formatNumber(curtidaNumero) : 0}
                        </span>
                      )}
                    </div>

                    <div
                      onClick={() => handleOpenPost(post.id, post.autor.id)}
                      className="flex gap-1 font-semibold"
                    >
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-6 h-6 cursor-pointer"
                      >
                        <MessageCircle
                          className="text-[#726BB6] w-full h-full"
                          stroke="currentColor"
                        />
                      </motion.div>
                      <span>{formatNumber(post.comentarios.length)}</span>
                    </div>
                  </div>

                  <motion.div className="w-6 h-6 relative">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full h-full cursor-pointer relative"
                      onClick={() =>
                        setAppear(appear === index + 1 ? 0 : index + 1)
                      }
                    >
                      <Ellipsis
                        className=" w-full h-full"
                        stroke="currentColor"
                      />
                    </motion.div>
                    <PostagemDetail
                      message="a"
                      onClose={() => {}}
                      last={10}
                      index={index + 1}
                      appear={appear === index + 1 && true}
                    />
                  </motion.div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
