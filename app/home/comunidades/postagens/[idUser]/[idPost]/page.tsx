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
import { Ellipsis, Heart, MessageCircle } from "lucide-react";
import PostagemDetail from "@/components/ui/postagemDetail";
import { Backdrop3 } from "@/app/home/components/backdrop";
import { usePathname, useRouter } from "next/navigation";
import { stringify } from "querystring";

type UserData = {
  primeiroNome?: string;
  cargo?: string;
  foto?: string;
  // add other properties if needed
};
type BannerData = {
  mensagem?: string;
  relatorio?: string;
  relatorioUrl?: string;
  // add other properties if needed
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
  tipo: "PUBLICA" | "PRIVADA" | string;
  banner: string;
  assunto: string | null;
  avataresUltimosUsuarios: string[];
  criadoEm: string; // ISO date string
  moderadorId: string;
  quantidadeEstudantes: number;
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

type AutorComentario = {
  id: string;
  nome: string;
  foto: string;
};

type Comentario = {
  id: string;
  conteudo: string;
  criadoEm: string;
  curtidas: number;
  quantidadeCurtidas: number;
  curtidoPeloUsuario: boolean;
  autor: AutorComentario;
};

export default function Materiais() {
  const pathname = usePathname();
  const router = useRouter();
  const [message, setMessage] = useState<string | null>(null);
  const [user, setUser] = useState<UserData>({});
  const [loading, setLoading] = useState(false);
  const [appear, setAppear] = useState(false);
  const [appear2, setAppear2] = useState(0);
  const [image, setImage] = useState(0);
  const [open, setOpen] = useState(false);
  const [scale, setScale] = useState(1);
  const [origin, setOrigin] = useState({ x: 50, y: 50 });
  const imgContainerRef = useRef<HTMLDivElement>(null);
  const postID = pathname.split("/")[5];
  const [post, setPost] = useState<Postagem>();
  const [postComentarios, setComentarios] = useState<Comentario[]>([]);
  const [userID, setUserID] = useState<string>("");
  const [curtidaCheck, setCurtidaCheck] = useState<boolean | undefined>(
    undefined
  );
  const [curtidaNumero, setCurtidaNumero] = useState<number>(-1);
  const [comentar, setComentar] = useState<string>("");

  // Motion values for smooth dragging and reset
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    if (!imgContainerRef.current) return;

    const rect = imgContainerRef.current.getBoundingClientRect();

    // Get cursor position relative to the element (as %)
    const offsetX = ((e.clientX - rect.left) / rect.width) * 100;
    const offsetY = ((e.clientY - rect.top) / rect.height) * 100;

    setOrigin({ x: offsetX, y: offsetY });

    // Zoom step
    const delta = e.deltaY > 0 ? -0.15 : 0.15;

    setScale((prev) => {
      const next = Math.min(Math.max(prev + delta, 1), 3);

      // 🧲 If zooming out (deltaY > 0), recenter smoothly
      if (delta < 0 && next < prev) {
        animate(x, 0, { duration: 0.25, ease: "easeOut" });
        animate(y, 0, { duration: 0.25, ease: "easeOut" });
      }

      return next;
    });
  };

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

        console.log(postID);
        // Run all fetches in parallel
        const [userRes, postRes, comentariosRes] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/home/identificacao`, {
            method: "GET",
            credentials: "include",
          }),
          fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/sala-estudo/post/${postID}?usuarioId=${userIDdata.userId}`,
            {
              method: "GET",
              credentials: "include",
            }
          ),
          fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/sala-estudo/post/${postID}/comentarios?usuarioId=${userIDdata.userId}`,
            {
              method: "GET",
              credentials: "include",
            }
          ),
        ]);

        // Parse all JSONs in parallel
        const [userData, postData, comentariosData] = await Promise.all([
          userRes.json(),
          postRes.json(),
          comentariosRes.json(),
        ]);

        // ✅ Set states after everything is done
        setUser(userData);
        setPost(postData);
        setComentarios(comentariosData);
        console.log(comentariosData);

        // Extract data from /home/salas-estudo safely

        console.log("✅ All data successfully loaded");
      } catch (err) {
        console.error("Erro ao carregar dados:", err);
        setMessage("Erro ao carregar dados.");
      } finally {
        // ✅ Stop loading only after all requests (success or error)
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

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

      console.log(postID);
      // Run all fetches in parallel
      const [userRes, postRes, comentariosRes] = await Promise.all([
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/home/identificacao`, {
          method: "GET",
          credentials: "include",
        }),
        fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/sala-estudo/post/${postID}?usuarioId=${userIDdata.userId}`,
          {
            method: "GET",
            credentials: "include",
          }
        ),
        fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/sala-estudo/post/${postID}/comentarios?usuarioId=${userIDdata.userId}`,
          {
            method: "GET",
            credentials: "include",
          }
        ),
      ]);

      // Parse all JSONs in parallel
      const [userData, postData, comentariosData] = await Promise.all([
        userRes.json(),
        postRes.json(),
        comentariosRes.json(),
      ]);

      // ✅ Set states after everything is done
      setUser(userData);
      setPost(postData);
      setComentarios(comentariosData);
      console.log(comentariosData);

      // Extract data from /home/salas-estudo safely

      console.log("✅ All data successfully loaded");
    } catch (err) {
      console.error("Erro ao carregar dados:", err);
      setMessage("Erro ao carregar dados.");
    } finally {
      // ✅ Stop loading only after all requests (success or error)
      setLoading(false);
    }
  };

  const Curtir = async (id: string) => {
    try {
      // 🔹 Determine current liked state before toggling
      const wasLiked = curtidaCheck ?? post?.curtidoPeloUsuario ?? false;
      const currentLikes =
        curtidaNumero === -1 ? (post?.curtidas ?? 0) : curtidaNumero;

      // 🔹 Compute new values right away (predictive)
      const newLiked = !wasLiked;
      const newLikes = newLiked
        ? currentLikes + 1
        : Math.max(currentLikes - 1, 0);

      // 🔹 Apply immediately to UI (optimistic)
      setCurtidaCheck(newLiked);
      setCurtidaNumero(newLikes);

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

      // 🔹 POST + GET to update + confirm
      const curtirRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/sala-estudo/post/${id}/curtir/${userID}`,
        {
          method: "POST",
          credentials: "include",
        }
      );

      const curtirCheckRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/sala-estudo/post/${id}?usuarioId=${userID}`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      if (!curtirRes.ok || !curtirCheckRes.ok)
        throw new Error("Erro ao curtir ou verificar curtida");

      const curtidaData = await curtirCheckRes.json();

      // 🔹 Sync back with backend (ensures accuracy)
      setCurtidaCheck(curtidaData.curtidoPeloUsuario);
      setCurtidaNumero(curtidaData.curtidas);
    } catch (error) {
      console.error("Erro ao curtir:", error);
    }
  };

  const CurtirComentario = async (comentarioId: string) => {
    try {
      // Get user ID
      const userIDRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/id`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const userIDdata = await userIDRes.json();
      const userID = userIDdata.userId;

      // Optimistically update the local comment list
      setComentarios((prev) =>
        prev.map((comentario) => {
          if (comentario.id === comentarioId) {
            const newLiked = !comentario.curtidoPeloUsuario;
            const newLikes = newLiked
              ? comentario.curtidas + 1
              : Math.max(comentario.curtidas - 1, 0);
            return {
              ...comentario,
              curtidoPeloUsuario: newLiked,
              curtidas: newLikes,
            };
          }
          return comentario;
        })
      );

      // Perform backend request
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/sala-estudo/comentario/${comentarioId}/curtir/${userID}`,
        {
          method: "POST",
          credentials: "include",
        }
      );

      if (!res.ok) throw new Error("Erro ao curtir comentário");

      // Optional: re-fetch to ensure sync
      const comentariosRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/sala-estudo/post/${postID}/comentarios?usuarioId=${userID}`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const comentariosData = await comentariosRes.json();
      setComentarios(comentariosData);
    } catch (error) {
      console.error("Erro ao curtir comentário:", error);
    }
  };

  function formatNumber(num: number) {
    if (num >= 1_000_000)
      return (num / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
    if (num >= 1_000) return (num / 1_000).toFixed(1).replace(/\.0$/, "") + "k";
    return num.toString();
  }

  function closing() {
    setOpen(false);
    setImage(0);
  }

  const Comentar = async (id: string) => {
    try {
      // Get user ID
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
        postId: id,
        autorId: userID,
        conteudo: comentar,
      };

      const comentarRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/sala-estudo/comentario`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload), // ✅ send the object, not the string
          credentials: "include",
        }
      );
      const comentarData = await comentarRes.json();
      if (comentarData.error) {
        setMessage(comentarData.error);
        return;
      }

      fetchAll();
      // Optional: append comment to UI
      setComentar(""); // reset textarea
    } catch (error) {
      console.error("Erro ao comentar:", error);
    }
  };

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  if (loading) return <Loading />;
  return (
    <>
      {message && (
        <ErrorModal message={message} onClose={() => setMessage(null)} />
      )}
      {open && (
        <>
          <motion.div
            key="content"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="w-full h-full fixed top-0 left-0 flex justify-center items-center overflow-hidden z-[1100]"
          >
            {/* Background click to close */}
            <div
              className="w-full h-full absolute top-0 left-0 cursor-zoom-out"
              onClick={() => closing()}
            />

            {/* Zoomable + draggable image */}
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

          {/* Optional backdrop */}
          <div className="w-full absolute flex justify-center items-center ">
            <Backdrop3 onClick={() => closing()} />
          </div>
        </>
      )}
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="w-full h-fit flex flex-col mb-3 ">
            {post && (
              <>
                <div className="w-full flex flex-col gap-6">
                  <div className="flex gap-1">
                    <img
                      src={`${post.autor.foto}`}
                      className="rounded-full cursor-pointer transition-all w-12 h-12 shadow-md  "
                      alt="Foto de perfil"
                    />
                    <div className="flex flex-col text-[18px]">
                      <span className="font-semibold truncate">
                        {post.autor.nome}
                      </span>
                      <span
                        onClick={() => {
                          router.push(
                            `/home/comunidades/salas_de_estudo/${post.sala.id}/postagens`
                          );
                        }}
                        className="cursor-pointer font-medium"
                      >
                        {post.sala.nome}
                      </span>
                      {/* <span className="font-medium"> Badminton</span> */}
                    </div>
                  </div>

                  {/* <div
                onClick={() => {
                  setImage(index + 1);
                  setOpen(true);
                }}
                className=" cursor-pointer max-w-full max-h-[600px] w-fit h-fit border border-[#a39cec] overflow-hidden my-3 rounded-[35px] shadow-md relative"
              >
                <img src="/Profile.png " alt="test" className="h-full" />
              </div> */}
                  <p className="text-[18px] ">{post.conteudo}</p>

                  <div className="flex justify-between  pb-4 border border-b-[#D7DDEA]">
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
                    </div>

                    <motion.div className="w-6 h-6  relative">
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full h-full cursor-pointer relative"
                        onClick={() => setAppear(!appear)}
                      >
                        <Ellipsis
                          className=" w-full h-full"
                          stroke="currentColor"
                        />
                      </motion.div>

                      <PostagemDetail
                        message={post.id}
                        Mine={post.autor.id === userID}
                        onClose={() => {
                          setAppear(false);
                          fetchAll();
                        }}
                        last={10}
                        index={appear ? 1 : 0}
                        appear={appear}
                      />
                    </motion.div>
                  </div>
                </div>
                <h1 className="text-[24px] font-medium mt-3">
                  {post.comentarios.length} Comentários{" "}
                </h1>
              </>
            )}
          </div>

          {post && (
            <form
              onSubmit={(e) => e.preventDefault()}
              className="w-full flex gap-2 mt-1 rounded-[25px] "
            >
              <div className="w-full text-[18px]  rounded-[25px] overflow-hidden">
                <textarea
                  ref={textareaRef}
                  className="w-full pl-4 py-2 min-h-full h-full text-[18px] border-2 overflow-y-auto border-[rgba(0,0,0,0.19)] shadow-md rounded-[25px] outline-[rgba(151,103,248,0.6)] resize-none "
                  placeholder="Escreva um comentário..."
                  // value={newComentario}
                  value={comentar}
                  onChange={(e) => {
                    setComentar(e.target.value);
                    //   setNewComentario(e.target.value)
                    const textarea = e.target;
                    textarea.style.height = "auto"; // reset height
                    textarea.style.maxHeight = "200px";
                    textarea.style.height = textarea.scrollHeight + "px";
                  }}
                  rows={1}
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ ease: "easeInOut" }}
                onClick={() => Comentar(post.id)}
                className="self-start bg-[#9B79E0] text-white px-4 py-2 shadow-md  rounded-full"
              >
                Comentar
              </motion.button>
            </form>
          )}

          <div className="w-full h-full flex flex-col  py-2 ">
            {postComentarios.map((comentario, index) => {
              return (
                <div key={index} className="w-full h-fit flex flex-col mb-4 ">
                  <div className="w-full flex flex-col gap-3">
                    <div className="flex gap-1">
                      <img
                        src={`${comentario.autor.foto}`}
                        className="rounded-full cursor-pointer transition-all w-12 h-12 shadow-md  "
                        alt="Foto de perfil"
                      />
                      <div className="flex flex-col text-[18px] justify-center">
                        <span className="font-semibold truncate">
                          {comentario.autor.nome}
                        </span>
                      </div>
                    </div>

                    {/* <div
                      onClick={() => {
                        setImage(index + 1);
                        setOpen(true);
                      }}
                      className=" cursor-pointer max-w-full max-h-[600px] w-fit h-fit border border-[#a39cec] overflow-hidden my-3 rounded-[35px] shadow-md relative"
                    >
                      <img src="/Profile.png " alt="test" className="h-full" />
                    </div> 
                    */}

                    <p className="text-[18px] ">{comentario.conteudo}</p>
                    <div className="flex justify-between pb-3  border border-b-[#D7DDEA]">
                      <div className="flex gap-5">
                        <div className="flex gap-1 font-semibold ">
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            animate={{
                              scale: comentario.curtidoPeloUsuario
                                ? [1, 1.3, 1]
                                : 1,
                            }}
                            transition={{ duration: 0.25, ease: "easeOut" }}
                            className="w-6 h-6 cursor-pointer"
                            onClick={() => CurtirComentario(comentario.id)}
                          >
                            <Heart
                              className="text-[#C85959] w-full h-full"
                              fill={
                                comentario.curtidoPeloUsuario
                                  ? "#C85959"
                                  : "transparent"
                              }
                              stroke="currentColor"
                            />
                          </motion.div>
                          <span>{formatNumber(comentario.curtidas)}</span>
                        </div>

                        {/* <div className="flex gap-1 font-semibold ">
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
                          <span>
                            {formatNumber(comentario.comentarios.length)}
                          </span>
                        </div> */}
                      </div>

                      <motion.div className="w-6 h-6  relative">
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="w-full h-full cursor-pointer relative"
                          onClick={() =>
                            setAppear2(appear2 === index + 1 ? 0 : index + 1)
                          }
                        >
                          <Ellipsis
                            className=" w-full h-full"
                            stroke="currentColor"
                          />
                        </motion.div>

                        <PostagemDetail
                          message={comentario.id}
                          Mine={
                            comentario.autor.id === userID ||
                            post?.autor.id === userID
                          }
                          onClose={() => {
                            setAppear2(0);
                            fetchAll();
                          }}
                          comentario={true}
                          last={postComentarios.length}
                          index={index + 1}
                          appear={appear2 === index + 1 && true}
                        />
                      </motion.div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </>
  );
}
// initial={{ scale: 0, opacity: 0 }}
//         animate={{ scale: 1, opacity: 1 }}
//         exit={{
//           scale: 0,
//           opacity: 0,
//           transition: { duration: 0.15, ease: "easeInOut" },
//         }}
