"use client";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { createContext, useEffect, useRef, useState } from "react";
import ErrorModal from "@/components/ui/ErrorModal";
import Loading from "../loading";
import Loading2 from "@/components/ui/loading";
import {
  ArrowLeft,
  Bookmark,
  CalendarDays,
  ChevronDown,
  ChevronRight,
  Ellipsis,
  Heart,
  MessageCircle,
  Search,
  SendHorizonal,
  User,
  X,
} from "lucide-react";
import path from "path";
import { Backdrop3 } from "../components/backdrop";
import PostagemDetail from "@/components/ui/postagemDetail";
import { FavoritosContext } from "@/app/context/FavoritosContext";
import { SearchContext } from "@/app/context/SearchContext";

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
  usuarioSegue: boolean;
};

type SalasProps = {
  children: React.ReactNode;
  searchTerm: string;
};

export type Autor = {
  foto: string;
  id: string;
  nome: string;
  perfil: string | null;
};

export type Comentario = {
  id: string;
  conteudo: string;
  criadoEm: string; // ISO date string
  autorId: string;
};

export type SalaFav = {
  id: string;
  nome: string;
};

export type Favorito = {
  autor: Autor;
  comentarios: Comentario[];
  conteudo: string;
  criadoEm: string; // ISO date string
  curtidas: number;
  curtidoPeloUsuario: boolean;
  id: string;
  quantidadeComentarios: number;
  sala: SalaFav;
};

type Recentes = {
  id: string;
  nome: string;
  descricao: string;
  banner: string | null;
  assunto: string | null;
  tipo: string;
  moderadorId: string;
  criadoEm: string;
  topicos: any[];
  quantidadeEstudantes?: number; // if you want
};

// FavoritosContext is imported from "@/app/context/FavoritosContext"

const cor = ["#8B81F3", "#CAC5FF", "#FFA6F1", "#FFACA1"];

export default function LayoutSalas({ children }: SalasProps) {
  const router = useRouter();
  const scrollRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const [user, setUser] = useState<UserData>({});
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<string | null>(null);
  const [sala, setSala] = useState<Sala>();
  const [salaID, setSalaID] = useState<string>("");
  const emComentario = pathname.split("/")[5];
  const [searchTerm, setSearchTerm] = useState("");
  const [userID, setUserID] = useState("");
  const [favorito, setFavorito] = useState<Favorito[]>([]);
  const [recentes, setRecentes] = useState<Recentes[]>([]);
  const [open, setOpen] = useState(false);

  const [editar, setEditar] = useState(false);

  const [editarNome, setEditarNome] = useState("");
  const [editarDescricao, setEditarDescricao] = useState("");

  const [deletar, setDeletar] = useState(false);
  const [curtidaCheck, setCurtidaCheck] = useState<boolean | undefined>(
    undefined
  );
  const [curtidaNumero, setCurtidaNumero] = useState<number>(-1);
  const [appear, setAppear] = useState(0);
  const [topicos, setTopicos] = useState<string[]>([]);
  const [topicoInput, setTopicoInput] = useState("");

  const refreshFavoritos = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/sala-estudo/usuario/${userID}/favoritos`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const data = await res.json();
      setFavorito(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Erro ao atualizar favoritos:", err);
    }
  };

  const fetchAllConst = async () => {
    setLoading(true);
    try {
      const userIDRes1 = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/id`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      const userIDdata1 = await userIDRes1.json(); // parse the response
      setUserID(userIDdata1.userId); // set the state

      // Run all fetches in parallel
      const [userRes, salaRes, userIDRes, favoritosRes, recentesRes] =
        await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/home/identificacao`, {
            method: "GET",
            credentials: "include",
          }),
          fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/sala-estudo/${pathname.split("/")[4]}?usuarioId=${userIDdata1.userId}`,
            {
              method: "GET",
              credentials: "include",
            }
          ),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/id`, {
            method: "GET",
            credentials: "include",
          }),
          fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/sala-estudo/usuario/${userIDdata1.userId}/favoritos`,
            {
              method: "GET",
              credentials: "include",
            }
          ),
          fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/sala-estudo/usuario/${userIDdata1.userId}/salas-recentes`,
            {
              method: "GET",
              credentials: "include",
            }
          ),
        ]);

      // Parse all JSONs in parallel
      const [userData, salaData, userIDdata, favoritosData, recentesData] =
        await Promise.all([
          userRes.json(),
          salaRes.json(),
          userIDRes.json(),
          favoritosRes.json(),
          recentesRes.json(),
        ]);

      // ✅ Set states after everything is done
      setFavorito(Array.isArray(favoritosData) ? favoritosData : []);

      setUser(userData);
      setSala(salaData);
      setUserID(userIDdata.userId);
      if (recentesData.length > 0) {
        setRecentes(Array.isArray(recentesData) ? recentesData : []);
      }
      console.log(recentesData, "recentesData ");

      // const salasRecentes = await fetch(
      //   `${process.env.NEXT_PUBLIC_API_URL}/sala-estudo/usuario/${userIDdata.userId}/salas-recentes`,
      //   {
      //     method: "GET",
      //     credentials: "include",
      //   }
      // );

      // const salasRecentesData = await salasRecentes.json(); // parse the response
      // console.log(salasRecentesData, "recentes recentes recentes recentes"); // set the state

      // Extract data from /home/salas-estudo safely
    } catch (err) {
      console.error("Erro ao carregar dados:", err);
      setMessage("Erro ao carregar dados.");
    } finally {
      // ✅ Stop loading only after all requests (success or error)
      setLoading(false);
    }
  };

  const SegueUpdate = async () => {
    try {
      const userIDRes1 = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/id`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      const userIDdata1 = await userIDRes1.json(); // parse the response
      setUserID(userIDdata1.userId); // set the state

      // Run all fetches in parallel
      const [salaRes] = await Promise.all([
        fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/sala-estudo/${pathname.split("/")[4]}?usuarioId=${userIDdata1.userId}`,
          {
            method: "GET",
            credentials: "include",
          }
        ),
      ]);

      // Parse all JSONs in parallel
      const [salaData] = await Promise.all([salaRes.json()]);

      setSala(salaData);
    } catch (err) {
      console.error("Erro ao carregar dados:", err);
      setMessage("Erro ao carregar dados.");
    }
  };
  // ALL ---------------------------------------------------------

  useEffect(() => {
    setSalaID(pathname.split("/")[4]);
    console.log(salaID);
    fetchAllConst();
    if (
      pathname.startsWith("/home/comunidades/salas_de_estudo/") &&
      (pathname.endsWith("/materiais") || pathname.endsWith("/postagens"))
    ) {
      const Fetch = async () => {
        const userIDRes1 = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/users/id`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        const userIDdata1 = await userIDRes1.json(); // parse the response
        setUserID(userIDdata1.userId); // set the state

        const Acessado = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/sala-estudo/usuario/${userIDdata1.userId}/acessar-sala/${pathname.split("/")[4]}`,
          {
            method: "POST",
            credentials: "include",
          }
        );
        const AcessadoData = Acessado.json();
      };
      Fetch();
    }
  }, [pathname]);

  useEffect(() => {
    if (sala) console.log("✅ Sala loaded:", sala);
  }, [sala]);

  useEffect(() => {
    if (!loading && scrollRef.current) {
      const saved = sessionStorage.getItem(`scrollPosition-${pathname}`);
      if (saved) scrollRef.current.scrollTop = parseInt(saved, 10);
    }
  }, [loading, pathname]);

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      try {
        const userIDRes1 = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/users/id`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        const userIDdata1 = await userIDRes1.json(); // parse the response
        setUserID(userIDdata1.userId); // set the state

        // Run all fetches in parallel
        const [userRes, salaRes, userIDRes, favoritosRes, recentesRes] =
          await Promise.all([
            fetch(`${process.env.NEXT_PUBLIC_API_URL}/home/identificacao`, {
              method: "GET",
              credentials: "include",
            }),
            fetch(
              `${process.env.NEXT_PUBLIC_API_URL}/sala-estudo/${pathname.split("/")[4]}?usuarioId=${userIDdata1.userId}`,
              {
                method: "GET",
                credentials: "include",
              }
            ),
            fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/id`, {
              method: "GET",
              credentials: "include",
            }),
            fetch(
              `${process.env.NEXT_PUBLIC_API_URL}/sala-estudo/usuario/${userIDdata1.userId}/favoritos`,
              {
                method: "GET",
                credentials: "include",
              }
            ),
            fetch(
              `${process.env.NEXT_PUBLIC_API_URL}/sala-estudo/usuario/${userIDdata1.userId}/salas-recentes`,
              {
                method: "GET",
                credentials: "include",
              }
            ),
          ]);

        // Parse all JSONs in parallel
        const [userData, salaData, userIDdata, favoritosData, recentesData] =
          await Promise.all([
            userRes.json(),
            salaRes.json(),
            userIDRes.json(),
            favoritosRes.json(),
            recentesRes.json(),
          ]);

        // ✅ Set states after everything is done
        setUser(userData);
        setSala(salaData);
        setEditarNome(salaData?.nome);
        setEditarDescricao(salaData?.descricao);
        setTopicos(salaData?.topicos);
        console.log(salaData.nome);
        console.log(salaData.descricao);

        setUserID(userIDdata.userId);
        if (recentesData.length > 0) {
          setRecentes(Array.isArray(recentesData) ? recentesData : []);
        }
        console.log(recentesData, "recentesData ");

        setFavorito(Array.isArray(favoritosData) ? favoritosData : []);

        // const salasRecentes = await fetch(
        //   `${process.env.NEXT_PUBLIC_API_URL}/sala-estudo/usuario/${userIDdata.userId}/salas-recentes`,
        //   {
        //     method: "GET",
        //     credentials: "include",
        //   }
        // );

        // const salasRecentesData = await salasRecentes.json(); // parse the response
        // console.log(salasRecentesData, "recentes recentes recentes recentes"); // set the state

        // Extract data from /home/salas-estudo safely
      } catch (err) {
        console.error("Erro ao carregar dados:", err);
        setMessage("Erro ao carregar dados.");
      } finally {
        // ✅ Stop loading only after all requests (success or error)
        setLoading(false);
      }
    };
    // ALL ---------------------------------------------------------
    fetchAll();
  }, [pathname]);

  useEffect(() => {
    return () => {
      // 🔹 Save scroll when this component unmounts or route changes
      if (scrollRef.current) {
        sessionStorage.setItem(
          `scrollPosition-${pathname}`,
          scrollRef.current.scrollTop.toString()
        );
      }
    };
  }, [pathname]);

  useEffect(() => {
    const saveScroll = () => {
      if (scrollRef.current) {
        sessionStorage.setItem(
          `scrollPosition-${pathname}`,
          scrollRef.current.scrollTop.toString()
        );
      }
    };
    window.addEventListener("beforeunload", saveScroll);
    return () => saveScroll();
  }, [pathname]);

  function closing() {
    setOpen(false);
    setEditar(false);
  }

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
      setFavorito((prevPosts) =>
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
      setFavorito((prevPosts) =>
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

  // --- Fetch posts + user, with sessionStorage caching for scroll + posts ---
  function formatNumber(num: number) {
    if (num >= 1_000_000)
      return (num / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
    if (num >= 1_000) return (num / 1_000).toFixed(1).replace(/\.0$/, "") + "k";
    return num.toString();
  }

  const handleOpenPost = (postId: string, autorId: string) => {
    sessionStorage.setItem("materiaisScroll", String(window.scrollY));
    sessionStorage.setItem("materiaisPosts", JSON.stringify(favorito));
    router.push(`/home/comunidades/postagens/${autorId}/${postId}`);
  };

  // /sala-estudo/sala/{salaId}/seguir/{usuarioId}

  const seguir = async () => {
    if (sala?.id && userID) {
      console.log(userID);
      const seguirRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/sala-estudo/sala/${sala?.id}/seguir/${userID}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );
      const seguirData = await seguirRes.json();
      console.log(seguirData);
      if (seguirData.error) {
        setMessage(seguirData.error);
      } else {
        SegueUpdate();
      }
    }
  };

  const editarFunction = async () => {
    const userIDRes1 = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/users/id`,
      {
        method: "GET",
        credentials: "include",
      }
    );

    const userIDdata1 = await userIDRes1.json(); // parse the response
    // setUserID(userIDdata1.userId); // set the state

    const payload = {
      nome: editarNome,
      descricao: editarDescricao,
      topicos: topicos,
    };

    const editarRes = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/sala-estudo/sala/${sala?.id}/editar/${userIDdata1.userId}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        credentials: "include",
      }
    );
    const editarData = await editarRes.json();

    console.log(
      "editarData editarData editarData editarData editarData ",
      editarData
    );

    if (editarData.message === "Sala de estudo editada com sucesso.") {
      setEditar(false);
      fetchAllConst();
    } else if (editarData.error) {
      setMessage(editarData.error);
    }
  };

  const excluir = async () => {
    if (sala?.id && userID) {
      const excluirRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/sala-estudo/sala/${sala?.id}/excluir/${userID}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );
      const excluirData = await excluirRes.json();
      console.log(excluirData);
      if (excluirData.error) {
        setMessage(excluirData.error);
      } else {
        if (
          excluirData.message ===
          "Sala de estudo excluída com sucesso. Os materiais publicados permanecem disponíveis para seus autores e usuários que copiaram."
        ) {
          router.back();
        }
      }
    }
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      // If clicked on something that is NOT part of PostagemDetail or the "..."
      if (
        !(e.target as HTMLElement).closest(".postagem-detail") &&
        !(e.target as HTMLElement).closest(".ellipsis-button")
      ) {
        setAppear(0);
      }
    };

    window.addEventListener("mousedown", handleClickOutside);
    return () => window.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const [appearFavoritos, setAppearFavoritos] = useState(false);
  return (
    <>
      {message && (
        <ErrorModal message={message} onClose={() => setMessage(null)} />
      )}

      <FavoritosContext.Provider value={{ refreshFavoritos }}>
        {/* h-[calc(100vh-24px)] */}
        <SearchContext.Provider value={{ searchTerm, setSearchTerm }}>
          {open && favorito && (
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
                  className="w-[700px] max-h-[100vh] bg-white h-auto flex rounded-[40px] overflow-hidden z-[1100]"
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

                    <div className="flex justify-between items-center w-full">
                      <h1 className="text-[35px] font-medium self-end ">
                        Postagens favoritas:
                      </h1>
                      <div className="w-fit">
                        <motion.div
                          whileHover={{ scale: 1.08 }}
                          whileTap={{ scale: 0.92 }}
                          onClick={closing}
                          className="cursor-pointer w-6 h-6"
                        >
                          <X className="w-full h-full" />
                        </motion.div>
                      </div>
                    </div>

                    <motion.div className="flex flex-wrap gap-3 w-full overflow-y-auto overflow-x-hidden pr-1 p-1">
                      {favorito &&
                        favorito.map((favoritoUnique, index) => {
                          return (
                            <motion.div
                              key={index}
                              whileHover={{ scale: 1.01 }}
                              whileTap={{ scale: 0.99 }}
                              transition={{ ease: "easeInOut" }}
                              onClick={(e) => {
                                e.stopPropagation();
                                router.push(
                                  `/home/comunidades/postagens/${favoritoUnique.autor.id}/${favoritoUnique.id}`
                                );
                                setOpen(false);
                              }}
                              className="flex flex-col w-full cursor-pointer p-2 border-1 border-[#b8b8b8] rounded-[10px] shadow-md gap-3 "
                            >
                              <motion.div
                                key={index}
                                className="flex gap-1 max-w-full w-full overflow-hidden"
                              >
                                <img
                                  src={favoritoUnique.autor.foto}
                                  className="rounded-full cursor-pointer transition-all w-10 h-10 object-cover shadow-md  "
                                  alt="Foto de perfil"
                                />
                                <div className="flex flex-col text-[18px] leading-none gap-1 truncate justify-center">
                                  <span className="font-semibold truncate">
                                    {favoritoUnique.autor.nome}
                                  </span>
                                  {/* <span className="font-medium truncate">
                                    {" "}
                                    {favorito.} seguidores
                                  </span> */}
                                </div>

                                <motion.div
                                  whileHover={{ scale: 1.08 }}
                                  whileTap={{ scale: 0.92 }}
                                  className="w-8 h-8 cursor-pointer ml-auto flex justify-center items-center"
                                >
                                  <ChevronRight className="w-full h-full text-[#EB9481]" />
                                </motion.div>
                              </motion.div>

                              <motion.p className="break-all line-clamp-4 text-[18px]">
                                {favoritoUnique.conteudo}
                              </motion.p>

                              <motion.div className=" flex justify-between items-center pb-4 border border-b-[#D7DDEA] ">
                                <div className=" gap-5 flex justify-between items-center h-fit">
                                  <div className="flex gap-1 font-semibold ">
                                    <motion.div
                                      onPointerDown={(e) => e.stopPropagation()}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        Curtir(favoritoUnique.id);
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
                                            : favoritoUnique.curtidoPeloUsuario
                                              ? "#C85959"
                                              : "transparent"
                                        }
                                        stroke="currentColor"
                                      />
                                    </motion.div>
                                    {curtidaNumero === -1 ? (
                                      <span>
                                        {formatNumber(favoritoUnique.curtidas)}
                                      </span>
                                    ) : (
                                      <span>
                                        {curtidaNumero
                                          ? formatNumber(curtidaNumero)
                                          : 0}
                                      </span>
                                    )}
                                  </div>

                                  <div
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleOpenPost(
                                        favoritoUnique.id,
                                        favoritoUnique.autor.id
                                      );
                                      setOpen(false);
                                    }}
                                    className="flex gap-1 font-semibold "
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
                                    <span>
                                      {formatNumber(
                                        favoritoUnique.comentarios.length
                                      )}
                                    </span>
                                  </div>
                                </div>

                                {/* <motion.div
                                  onClick={(e) => {e.stopPropagation();} }
                                  className="w-6 h-6 relative ">
                                  <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="ellipsis-button w-full h-full cursor-pointer relative"
                                    onClick={() => {
                                      
                                      setAppear(
                                        appear === index + 1 ? 0 : index + 1
                                      );
                                    }}
                                  >
                                    <Ellipsis
                                      className="w-full h-full"
                                      stroke="currentColor"
                                    />
                                  </motion.div>
                                  <PostagemDetail
                                    message={favoritoUnique.id}
                                    Mine={favoritoUnique.autor.id === userID}
                                    onClose={() => {
                                      setAppear(0);
                                    }}
                                    last={favorito.length}
                                    index={index + 1}
                                    appear={appear === index + 1}
                                  />
                                </motion.div> */}
                              </motion.div>
                            </motion.div>
                          );
                        })}
                      {favorito.length === 0 && (
                        <div className="w-full h-fit rounded-[25px] border-2 border-[#CAC5FF] p-4 text-center">
                          <span className="text-[25px] font-medium">
                            Nenhuma postagem salva. Salve uma para aparecer
                            aqui!
                          </span>
                        </div>
                      )}
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>

              <div className="w-full absolute flex justify-center items-center">
                <Backdrop3 onClick={() => closing()} />
              </div>
            </>
          )}

          {editar && (
            <>
              <motion.div
                key="backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed left-0 right-0 top-0 bottom-0 flex justify-center items-center z-[1100]"
              >
                <div className="absolute inset-0" onClick={() => closing()} />

                <motion.div
                  key="modal-wrapper"
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 0.94 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="relative z-[1101] rounded-[40px] overflow-hidden shadow-md"
                  style={{ width: 640 }}
                >
                  <div
                    className="bg-white w-full max-h-[90vh] overflow-y-auto overflow-x-hidden"
                    style={{
                      WebkitOverflowScrolling: "touch",
                      clipPath: "inset(0 round 40px)",
                    }}
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
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          editarFunction();
                        }}
                        className="w-full flex flex-col gap-4"
                      >
                        <div className="flex justify-between items-start">
                          <h1 className="text-[35px] font-medium self-end ">
                            Editar sala de estudo:
                          </h1>
                          <div className="w-fit">
                            <motion.div
                              whileHover={{ scale: 1.08 }}
                              whileTap={{ scale: 0.92 }}
                              onClick={closing}
                              className="cursor-pointer w-6 h-6"
                            >
                              <X className="w-full h-full" />
                            </motion.div>
                          </div>
                        </div>
                        <div className="relative flex flex-col gap-4 min-h-fit ">
                          <div className="min-h-fit">
                            <h2 className="text-[20px] font-medium">
                              Nome da sala:
                            </h2>
                            <input
                              type="text"
                              id="nome_materia"
                              placeholder="Pesquisar salas de estudo"
                              value={editarNome}
                              onChange={(e) => setEditarNome(e.target.value)}
                              className="pl-5 text-[18px] max-w-[700px] w-full py-2 border-2 border-[rgba(0,0,0,0.19)] h-[50px] rounded-full outline-[rgba(151,103,248,0.6)] shadow-md"
                            />{" "}
                          </div>

                          <div className="w-full h-full flex flex-col">
                            <h2 className="text-[20px] font-medium">
                              Descrição:
                            </h2>

                            <textarea
                              onChange={(e) =>
                                setEditarDescricao(e.target.value)
                              }
                              value={editarDescricao}
                              className="shadow-md border-2 border-[rgba(0,0,0,0.19)] w-full min-h-[95px] rounded-[25px] p-2 outline-[rgba(151,103,248,0.6)]"
                            />
                          </div>
                          <div className=" w-full lg:w-full max-w-full sm:h-full sm:max-h-[350px] min-h-fit overflow-y-auto overflow-x-hidden flex justify-center flex-col gap-4">
                            <div className=" lg:w-full w-[500px] max-w-full h-fit min-h-fit flex flex-col gap-1 ">
                              <h1 className="font-medium text-[20px] leading-[20px] ">
                                Tags
                              </h1>
                              <div className=" max-w-[600px] h-fit flex gap-1 justify-center items-end ">
                                <input
                                  type="text"
                                  value={topicoInput}
                                  onChange={(e) =>
                                    setTopicoInput(e.target.value)
                                  }
                                  onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                      e.preventDefault();
                                    }

                                    if (
                                      e.key === "Enter" &&
                                      topicoInput &&
                                      !topicos.includes(topicoInput)
                                    ) {
                                      setTopicos((prev) => [
                                        ...prev,
                                        topicoInput,
                                      ]);
                                      setTopicoInput("");
                                    }
                                  }}
                                  placeholder="Adicionar tags"
                                  className=" pl-5 text-[18px] w-full h-[50px] border-2 border-[rgba(0,0,0,0.19)] rounded-[20px] outline-[rgba(151,103,248,0.6)] shadow-md"
                                />

                                <motion.button
                                  whileHover={{ scale: 1.02 }}
                                  whileTap={{ scale: 0.92 }}
                                  onClick={() => {
                                    if (
                                      topicoInput &&
                                      !topicos.includes(topicoInput)
                                    ) {
                                      setTopicos((prev) => [
                                        ...prev,
                                        topicoInput,
                                      ]);
                                      setTopicoInput("");
                                    }
                                  }}
                                  type="button"
                                  className="p-[10px] min-w-[50px] bg-[#A39CEC] rounded-[27%] text-white flex justify-center items-center text-[20px] font-semibold shadow-md "
                                >
                                  <SendHorizonal className="size-6" />
                                </motion.button>
                              </div>
                            </div>
                            <div className="shadow-md lg:w-full min-h-[50px] w-[500px] max-w-full h-full rounded-[25px] max-h-[350px] overflow-y-auto overflow-x-hidden flex justify-center border-2 border-[rgba(0,0,0,0.19)] items-center">
                              <div className=" w-[95%] px-2 py-2 h-min mt-2 flex flex-wrap gap-2 overflow-auto min-h-fit max-h-[30px] ">
                                <AnimatePresence>
                                  {topicos.map((topico, index) => (
                                    <motion.div
                                      key={topico + index}
                                      initial={{ scale: 0 }}
                                      animate={{ scale: 1 }}
                                      id="topicos"
                                      className="flex w-fit h-fit py-1 px-2 gap-2 text-white bg-[#A387DC] rounded-[8px] max-w-full cursor-pointer"
                                    >
                                      <X
                                        onClick={() => {
                                          setTopicos((prev) =>
                                            prev.filter((_, i) => i !== index)
                                          );
                                        }}
                                        className="text-[rgba(0,0,0,0.34)]"
                                      />

                                      <span className="text-white w-full block text-ellipsis overflow-hidden break-words ">
                                        {topico}
                                      </span>
                                    </motion.div>
                                  ))}
                                </AnimatePresence>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="w-full flex justify-center items-center ">
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            transition={{ ease: "easeInOut" }}
                            type="submit"
                            className="self-center bg-[#9B79E0] text-white px-4 py-2 shadow-md  rounded-full"
                          >
                            Editar
                          </motion.button>
                        </div>
                      </form>
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              <div className="w-full absolute flex justify-center items-center">
                <Backdrop3 onClick={() => closing()} />
              </div>
            </>
          )}

          {deletar && (
            <>
              <motion.div
                key="content"
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 0.94 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className={`w-full h-full fixed flex justify-center items-center opacity-1 z-[1100] `}
              >
                <div
                  className="w-full h-full absolute"
                  onClick={() => setDeletar(false)}
                ></div>
                <motion.div
                  key="content"
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 0.94 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className={`w-[700px] p-4 h-[250px] flex rounded-[40px] z-[1100]  opacity-1 `}
                >
                  <div
                    id="white-box"
                    className={` w-full h-full rounded-[40px] bg-white shadow-md flex justify-center items-center relative overflow-hidden z-[1100] left-[50%] translate-x-[-50%] top-[50%] translate-y-[-50%]`}
                  >
                    <img
                      src="/Vector.svg"
                      alt="Decoração"
                      className="absolute top-0 left-[-180px] rotate-90 w-[550px]"
                    />
                    <img
                      src="/Vector.svg"
                      alt="Decoração"
                      className="absolute bottom-[-40px] right-[-170px] -rotate-90 w-[550px]"
                    />

                    <div className="w-[80%] h-[85%] flex flex-col items-center gap-2 z-[900] ">
                      <h1 className="text-center text-[20px] font-medium my-auto">
                        Você deseja mesmo excluir essa sala de estudo? Isso
                        também apagará todas as postagens .
                      </h1>
                      <div className="w-full flex justify-center gap-4 mt-auto">
                        <motion.button
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={() => setDeletar(false)}
                          className="p-[10px_15px] rounded-[20px] text-[18px] bg-[#F1F1F1] border border-[rgba(68,68,68, 0.17)]"
                        >
                          Voltar
                        </motion.button>

                        <motion.button
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={() => {
                            setDeletar(false);
                            excluir();
                          }}
                          className="p-[10px_15px] min-w-[65px] rounded-[20px] text-[18px] text-white bg-[#F55571] border border-[rgba(68,68,68, 0.17)]"
                        >
                          Excluir
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              <div className="w-full absolute flex justify-center items-center ">
                <Backdrop3 onClick={() => setDeletar(false)} />
              </div>
            </>
          )}

          <div
            ref={scrollRef}
            className="w-full h-screen flex justify-center items-start overflow-hidden"
          >
            <div className="w-[1600px] max-w-[98%]  py-2 h-full gap-3 rounded-[35px] flex flex-row relative">
              <div className="w-full h-full overflow-hidden flex flex-col items-center gap-2 ">
                {(pathname.startsWith("/home/comunidades/salas_de_estudo/") &&
                  pathname.endsWith("/postagens")) ||
                pathname.endsWith("/materiais") ? (
                  <>
                    <div className="w-[1600px] max-w-[98%] h-full gap-3  flex flex-row shadow-md">
                      <div className="w-full min-h-full border border-[#00000031]  flex flex-col items-center gap-2 rounded-[35px]  overflow-hidden">
                        {(pathname.startsWith(
                          "/home/comunidades/salas_de_estudo/"
                        ) &&
                          pathname.endsWith("/postagens")) ||
                        pathname.endsWith("/materiais") ? (
                          <>
                            <div className="flex w-full h-full rounded-[35px] bg-white flex-col items-center  overflow-y-auto overflow-x-hidden ">
                              <div className="w-full">
                                <div className="w-full h-[385px] bg-[#9767F8] relative">
                                  {!loading && (
                                    <>
                                      <motion.div
                                        whileHover={{ scale: 1.04 }}
                                        whileTap={{ scale: 0.96 }}
                                        className="w-7 h-7 absolute top-4 left-4 p-1 rounded-full bg-[#9767F8]"
                                      >
                                        <ArrowLeft
                                          className="cursor-pointer w-full h-full text-white  "
                                          onClick={() => {
                                            router.push(
                                              "/home/comunidades/salas_de_estudo"
                                            );
                                          }}
                                        />
                                      </motion.div>

                                      <img
                                        src={sala ? sala.banner : "a"}
                                        className="w-full h-full object-cover"
                                      />
                                    </>
                                  )}
                                </div>
                                <AnimatePresence>
                                  <div className="flex max-w-full w-full overflow-x-auto overflow-y-hidden border-b py-2 border-[#D7DDEA] relative text-[22px] font-medium gap-4 pl-4 h-fit pb-3 ">
                                    <div className="flex min-w-fit w-full relative gap-4 h-fit items-center ">
                                      <motion.a
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        href={`${salaID && `/home/comunidades/salas_de_estudo/${salaID}/postagens`} `}
                                        className="cursor-pointer h-full"
                                      >
                                        <motion.span
                                          whileHover={{ scale: 1.02 }}
                                          whileTap={{ scale: 0.98 }}
                                        >
                                          Postagens
                                        </motion.span>
                                        {pathname.endsWith("postagens") && (
                                          <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            exit={{ scale: 1 }}
                                            className="origin-center -mb-1 rounded-3xl transition-all ease-in-out h-[5px] bg-[#A39CEC]"
                                          ></motion.div>
                                        )}
                                      </motion.a>

                                      <motion.a
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        href={`${salaID && `/home/comunidades/salas_de_estudo/${salaID}/materiais`} `}
                                        className="cursor-pointer h-full"
                                      >
                                        <motion.span className="text-nowrap">
                                          Materiais
                                        </motion.span>
                                        {pathname.endsWith("materiais") && (
                                          <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            exit={{ scale: 1 }}
                                            className="origin-center -mb-1 rounded-3xl transition-all ease-in-out h-[5px] bg-[#A39CEC]"
                                          ></motion.div>
                                        )}
                                      </motion.a>
                                    </div>
                                  </div>
                                </AnimatePresence>
                              </div>
                              {/* {(pathname.startsWith(
                            "/home/comunidades/salas_de_estudo/"
                          ) &&
                            pathname.endsWith("/postagens")) ||
                          pathname.endsWith("/materiais") ? ( 
                          */}

                              {loading ? <Loading /> : children}
                            </div>
                          </>
                        ) : null}
                      </div>
                    </div>
                  </>
                ) : pathname.startsWith("/home/comunidades/postagens/") &&
                  pathname.endsWith(`${emComentario}`) ? (
                  <>
                    <div className="w-[1600px] max-w-[98%] h-full gap-3 flex flex-row rounded-[35px]">
                      <div className="w-full min-h-full border border-[#00000031] bg-white flex flex-col p-4 gap-2 rounded-[35px] overflow-y-auto overflow-x-hidden ">
                        <div className="w-7 h-7">
                          <ArrowLeft
                            className="cursor-pointer w-full h-full"
                            onClick={() => router.back()}
                          />
                        </div>
                        {children}
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="h-fit w-full flex justify-between gap-6">
                      {pathname.endsWith("postagens") ? (
                        <>
                          <div className="relative max-w-[650px] w-full h-[50px]">
                            <input
                              type="text"
                              id="search_bar"
                              value={searchTerm}
                              onChange={(e) => {
                                setSearchTerm(e.target.value);
                              }}
                              placeholder="Pesquisar postagem"
                              className="pl-5 text-[18px] max-w-[650px] w-full py-2 border-2 border-[rgba(0,0,0,0.19)] h-[50px] rounded-full outline-[rgba(151,103,248,0.6)] shadow-md"
                            />
                            <Search className="absolute right-[15px] text-black opacity-[36%] cursor-pointer top-[14px] size-[20px] sm:flex hidden" />
                          </div>
                        </>
                      ) : (
                        // Pesquisar salas de estudo
                        <>
                          <div className="relative max-w-[650px] w-full h-[50px]">
                            <input
                              type="text"
                              id="search_bar"
                              value={searchTerm}
                              onChange={(e) => setSearchTerm(e.target.value)}
                              placeholder="Pesquisar salas de estudo"
                              className="pl-5 text-[18px] max-w-[650px] w-full py-2 border-2 border-[rgba(0,0,0,0.19)] h-[50px] rounded-full outline-[rgba(151,103,248,0.6)] shadow-md"
                            />
                            <Search className="absolute right-[15px] text-black opacity-[36%] cursor-pointer top-[14px] size-[20px] sm:flex hidden" />
                          </div>
                        </>
                      )}

                      {!loading && (
                        <div className=" h-[60px] gap-2 min-w-fit sm:flex hidden">
                          <div className="text-end flex flex-col justify-center ">
                            <h1 className="font-medium leading-none text-[clamp(1.35rem,3vw,1.875rem)]">
                              {user.primeiroNome}
                            </h1>
                            <h2 className="font-medium text-[clamp(1.26rem,3vw,1.25rem)] text-[#828181]">
                              {user.cargo}
                            </h2>
                          </div>

                          <img
                            src={`${user.foto}`}
                            className="rounded-full cursor-pointer transition-all w-[55px] h-[55px] shadow-md  "
                            alt="Foto de perfil"
                          />
                        </div>
                      )}

                      {loading && (
                        <AnimatePresence>
                          <motion.div
                            initial={{ scale: 0.95 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.95 }}
                            className=" h-[60px] sm:flex hidden gap-2 min-w-fit"
                          >
                            <div className="text-end flex flex-col  justify-between">
                              <h1 className="text-transparent bg-[#A39CEC] max-w-full rounded-full opacity-50 font-medium leading-none text-[clamp(1.35rem,3vw,1.875rem)]">
                                NamePreset
                              </h1>
                              <h2 className="text-transparent bg-[#A39CEC] w-fit ml-auto py-[2px] leading-none max-w-full rounded-full opacity-50 font-medium text-[clamp(1.26rem,3vw,1.25rem)] text-[#828181]">
                                Cargo
                              </h2>
                            </div>

                            <div className="flex justify-center items-center rounded-full cursor-pointer transition-all w-[55px] h-[55px] shadow-md bg-[#A39CEC] ">
                              <User className="text-white size-8" />
                            </div>
                          </motion.div>
                        </AnimatePresence>
                      )}

                      <div
                        onClick={() => {
                          setOpen(true);
                        }}
                        className=" min-w-14 min-h-14 border border-[#00000031] rounded-full bg-white sm:hidden flex justify-center items-center p-3"
                      >
                        <Bookmark className="text-[rgb(114,107,182)] stroke-2 w-full h-full" />
                      </div>
                    </div>
                    <div className="h-full flex w-full max-w-[100dvw] rounded-[35px] max-h-full bg-white flex-col items-center shadow-md border border-[#00000031] overflow-hidden">
                      <AnimatePresence>
                        {/* sticky wrapper (no overflow here) */}
                        {/* STICKY HEADER (safe-area) */}
                        <div className="sticky top-0 z-30 w-full max-w-[100dvw] pt-[env(safe-area-inset-top)] rounded-t-[35px] border-b border-b-[#D7DDEA] bg-white">
                          {/* SCROLLER: put overflow here (child of sticky) */}
                          <div
                            className="overflow-x-auto hide-scrollbar"
                            style={{ WebkitOverflowScrolling: "touch" }}
                          >
                            {/* CONTENT ROW: must be able to overflow horizontally */}
                            <div className="inline-flex items-center py-2 px-4 space-x-4 text-[22px] font-medium min-w-max whitespace-nowrap">
                              <motion.a
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                href="/home/comunidades/postagens"
                                className="cursor-pointer"
                              >
                                <motion.span>Postagens</motion.span>
                                {pathname.endsWith("postagens") && (
                                  <motion.div className="h-[5px] origin-center bg-[#A39CEC] rounded-3xl -mb-1" />
                                )}
                              </motion.a>

                              <motion.a
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                href="/home/comunidades/salas_de_estudo"
                                className="cursor-pointer"
                              >
                                <motion.span>Salas de estudo</motion.span>
                                {pathname.endsWith("salas_de_estudo") && (
                                  <motion.div className="h-[5px] origin-center bg-[#A39CEC] rounded-3xl -mb-1" />
                                )}
                              </motion.a>

                              <motion.a
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                href="/home/comunidades/seguindo"
                                className="cursor-pointer"
                              >
                                <motion.span>Seguindo</motion.span>
                                {pathname.endsWith("seguindo") && (
                                  <motion.div className="h-[5px] origin-center bg-[#A39CEC] rounded-3xl -mb-1" />
                                )}
                              </motion.a>

                              {/* add more items to force overflow when needed */}
                            </div>
                          </div>
                        </div>
                      </AnimatePresence>
                      {loading ? <Loading /> : children}
                    </div>
                  </>
                )}
              </div>

              <div className="sm:flex hidden sm:max-w-[38%] md:max-w-[35%] lg:max-w-[30%] w-full sm:flex-col pt-4 gap-2 px-4 h-full rounded-[35px] shadow-md overflow-hidden bg-white border border-[#00000031] overflow-y-auto overflow-x-hidden ">
                {loading ? (
                  <Loading2 />
                ) : (
                  <>
                    {(pathname.startsWith(
                      "/home/comunidades/salas_de_estudo/"
                    ) &&
                      pathname.endsWith("/postagens")) ||
                    pathname.endsWith("/materiais") ? (
                      <>
                        <h1 className="text-[25px] leading-none font-medium ">
                          {sala && sala.nome}
                        </h1>
                        <p className="w-full text-[18px] break-all line-clamp-6 min-h-fit">
                          {sala && sala.descricao}
                        </p>

                        <div className="flex flex-wrap gap-1">
                          {Array.isArray(sala?.topicos) &&
                            sala.topicos.slice(0, 5).map((topico, index) => {
                              return (
                                <span
                                  key={index}
                                  className="text-[16px] font-medium px-3 w-fit rounded-full text-white"
                                  style={{
                                    backgroundColor:
                                      cor[
                                        Math.floor(Math.random() * cor.length)
                                      ],
                                  }}
                                >
                                  {topico}
                                </span>
                              );
                            })}
                        </div>

                        <div className="flex gap-1 ">
                          <CalendarDays />
                          Criada em{" "}
                          {sala &&
                            new Date(sala.criadoEm).toLocaleDateString(
                              "pt-BR",
                              {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              }
                            )}
                        </div>

                        <div className="w-full flex border border-b-[#D7DDEA] pb-2 gap-2 mt-2">
                          {userID === sala?.moderadorId && (
                            <>
                              <motion.button
                                whileHover={{
                                  scale: 1.02,
                                  backgroundColor: "#9B79E0",
                                  color: "#fff",
                                }}
                                whileTap={{ scale: 0.98 }}
                                transition={{ ease: "easeInOut" }}
                                onClick={() => setEditar(true)}
                                className=" border-1 border-[#9B79E0] text-[#667880 px-4 py-1 text-[16px] font-normal shadow-md my-auto rounded-full text-nowrap"
                              >
                                Editar sala
                              </motion.button>

                              <motion.button
                                whileHover={{
                                  scale: 1.02,
                                  backgroundColor: "#F55571",
                                  color: "#fff",
                                }}
                                whileTap={{ scale: 0.98 }}
                                transition={{ ease: "easeInOut" }}
                                onClick={() => {
                                  setDeletar(true);
                                }}
                                className=" border-1 border-[#F55571] text-[#667880 px-4 py-1 text-[16px] font-normal shadow-md my-auto rounded-full text-nowrap"
                              >
                                Excluir sala
                              </motion.button>
                            </>
                          )}

                          {userID !== sala?.moderadorId && (
                            <>
                              <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                transition={{ ease: "easeInOut" }}
                                onClick={seguir}
                                className=" bg-[#9B79E0] text-white px-4 py-2 text-[16px] font-normal shadow-md my-auto rounded-full text-nowrap"
                              >
                                {sala?.usuarioSegue
                                  ? "Deixar de seguir sala"
                                  : "Seguir sala"}
                              </motion.button>
                            </>
                          )}
                        </div>

                        <h1 className="text-[25px] leading-none font-medium my-2">
                          Recentes:
                        </h1>
                        <div className="flex flex-col gap-2 ">
                          {recentes.map((item, index) => {
                            return (
                              <motion.div
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.99 }}
                                onClick={() => {
                                  router.push(
                                    `/home/comunidades/salas_de_estudo/${item.id}/postagens`
                                  );
                                }}
                                key={index}
                                className="flex gap-1 max-w-full w-full  overflow-hidden cursor-pointer hover:bg-[rgba(0,0,0,0.06)] px-2 py-2 rounded-[10px]"
                              >
                                <img
                                  src={item.banner ? item.banner : "a"}
                                  className="rounded-full cursor-pointer transition-all w-10 h-10 object-cover shadow-md  "
                                  alt="Foto de perfil"
                                />
                                <div className="flex flex-col text-[18px] leading-none gap-1 truncate ">
                                  <span className="font-semibold truncate">
                                    {item && item.nome}
                                  </span>
                                  <span className="font-medium truncate">
                                    {" "}
                                    {item && item.quantidadeEstudantes}{" "}
                                    seguidores
                                  </span>
                                </div>

                                <motion.div
                                  whileHover={{ scale: 1.08 }}
                                  whileTap={{ scale: 0.92 }}
                                  className="w-8 h-8 cursor-pointer ml-auto flex justify-center items-center"
                                >
                                  <ChevronRight className="w-full h-full text-[#EB9481]" />
                                </motion.div>
                              </motion.div>
                            );
                          })}
                          {recentes.length === 0 && (
                            <div className="w-full h-fit rounded-[25px] border-2 border-[#CAC5FF] p-4 text-center">
                              <span className="text-[25px] font-medium ">
                                Você ainda não entrou em uma sala.
                              </span>
                            </div>
                          )}
                        </div>

                        <h1 className="text-[25px] leading-none font-medium my-2">
                          Postagens Favoritas:
                        </h1>
                        <motion.div className="flex flex-col gap-3 pb-3">
                          {favorito &&
                            favorito.map((favorito, index) => {
                              if (index < 4) {
                                return (
                                  <motion.div
                                    key={index}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    transition={{
                                      ease: "easeInOut",
                                      type: "spring",
                                    }}
                                    onClick={() => {
                                      router.push(
                                        `/home/comunidades/postagens/${favorito.autor.id}/${favorito.id}`
                                      );
                                    }}
                                    className="w-full cursor-pointer p-2 border-1 border-[#b8b8b8] rounded-[10px] shadow-md "
                                  >
                                    <div
                                      key={index}
                                      className="flex gap-1 max-w-full w-full  overflow-hidden"
                                    >
                                      <img
                                        src={favorito.autor.foto}
                                        className="rounded-full cursor-pointer transition-all w-10 h-10 object-cover shadow-md  "
                                        alt="Foto de perfil"
                                      />
                                      <div className="flex flex-col text-[18px] leading-none gap-1 truncate justify-center">
                                        <span className="font-semibold truncate">
                                          {favorito.autor.nome}
                                        </span>
                                        <span className="font-medium truncate text-[16px]">
                                          {" "}
                                          {favorito.sala.nome}
                                        </span>
                                      </div>

                                      <motion.div
                                        whileHover={{ scale: 1.08 }}
                                        whileTap={{ scale: 0.92 }}
                                        className="w-8 h-8 cursor-pointer ml-auto flex justify-center items-center"
                                      >
                                        <ChevronRight className="w-full h-full text-[#EB9481]" />
                                      </motion.div>
                                    </div>
                                    <p className="break-all line-clamp-4 text-[18px]">
                                      {favorito.conteudo}
                                    </p>
                                  </motion.div>
                                );
                              } else if (index === 4) {
                                return (
                                  <motion.div
                                    whileHover={{ scale: 1.01 }}
                                    whileTap={{ scale: 0.99 }}
                                    key={index}
                                    onClick={() => {
                                      setOpen(true);
                                    }}
                                    className="cursor-pointer -mt-2 w-full text-[#EB9481] text-center text-[18px] flex justify-center items-center"
                                  >
                                    Ver mais
                                    <ChevronDown
                                      className=""
                                      stroke="currentColor"
                                    />
                                  </motion.div>
                                );
                              }
                            })}
                          {favorito.length === 0 && (
                            <div className="w-full h-fit rounded-[25px] border-2 border-[#CAC5FF] p-4 text-center">
                              <span className="text-[25px] font-medium">
                                Nenhuma postagem salva. Salve uma para aparecer
                                aqui!
                              </span>
                            </div>
                          )}
                        </motion.div>
                      </>
                    ) : (
                      <>
                        <h1 className="text-[25px] leading-none font-medium my-2">
                          Recentes:
                        </h1>
                        <div className="flex flex-col gap-2 ">
                          {recentes.map((item, index) => {
                            return (
                              <motion.div
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.99 }}
                                onClick={() => {
                                  router.push(
                                    `/home/comunidades/salas_de_estudo/${item.id}/postagens`
                                  );
                                }}
                                key={index}
                                className="flex gap-1 max-w-full w-full  overflow-hidden cursor-pointer hover:bg-[rgba(0,0,0,0.06)] px-2 py-2 rounded-[10px]"
                              >
                                <img
                                  src={item.banner ? item.banner : "a"}
                                  className="rounded-full cursor-pointer transition-all w-10 h-10 object-cover shadow-md  "
                                  alt="Foto de perfil"
                                />
                                <div className="flex flex-col text-[18px] leading-none gap-1 truncate ">
                                  <span className="font-semibold truncate">
                                    {item && item.nome}
                                  </span>
                                  <span className="font-medium truncate">
                                    {" "}
                                    {item && item.quantidadeEstudantes}{" "}
                                    seguidores
                                  </span>
                                </div>

                                <motion.div
                                  whileHover={{ scale: 1.08 }}
                                  whileTap={{ scale: 0.92 }}
                                  className="w-8 h-8 cursor-pointer ml-auto flex justify-center items-center"
                                >
                                  <ChevronRight className="w-full h-full text-[#EB9481]" />
                                </motion.div>
                              </motion.div>
                            );
                          })}
                          {recentes.length === 0 && (
                            <div className="w-full h-fit rounded-[25px] border-2 border-[#CAC5FF] p-4 text-center">
                              <span className="text-[25px] font-medium">
                                Você ainda não entrou em uma sala.
                              </span>
                            </div>
                          )}
                        </div>

                        <h1 className="text-[25px] leading-none font-medium my-2">
                          Postagens Favoritas:
                        </h1>
                        <motion.div className="flex flex-col gap-3 ">
                          {favorito &&
                            favorito.map((favorito, index) => {
                              if (index < 4) {
                                return (
                                  <motion.div
                                    key={index}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    transition={{
                                      ease: "easeInOut",
                                      type: "spring",
                                    }}
                                    onClick={() => {
                                      router.push(
                                        `/home/comunidades/postagens/${favorito.autor.id}/${favorito.id}`
                                      );
                                    }}
                                    className="w-full cursor-pointer p-2 border-1 border-[#b8b8b8] rounded-[10px] shadow-md"
                                  >
                                    <div
                                      key={index}
                                      className="flex gap-1 max-w-full w-full  overflow-hidden"
                                    >
                                      <img
                                        src={favorito.autor.foto}
                                        className="rounded-full cursor-pointer transition-all w-10 h-10 object-cover shadow-md  "
                                        alt="Foto de perfil"
                                      />
                                      <div className="flex flex-col text-[18px] leading-none gap-1 truncate justify-center">
                                        <span className="font-semibold truncate">
                                          {favorito.autor.nome}
                                        </span>
                                        <span className="font-medium truncate text-[16px]">
                                          {" "}
                                          {favorito.sala.nome}
                                        </span>
                                      </div>

                                      <motion.div
                                        whileHover={{ scale: 1.08 }}
                                        whileTap={{ scale: 0.92 }}
                                        className="w-8 h-8 cursor-pointer ml-auto flex justify-center items-center"
                                      >
                                        <ChevronRight className="w-full h-full text-[#EB9481]" />
                                      </motion.div>
                                    </div>
                                    <p className="break-all line-clamp-4 text-[18px]">
                                      {favorito.conteudo}
                                    </p>
                                  </motion.div>
                                );
                              } else if (index === 4) {
                                return (
                                  <motion.div
                                    whileHover={{ scale: 1.01 }}
                                    whileTap={{ scale: 0.99 }}
                                    key={index}
                                    onClick={() => {
                                      setOpen(true);
                                    }}
                                    className="cursor-pointer -mt-2 w-full text-[#EB9481] text-center text-[18px] flex justify-center items-center"
                                  >
                                    Ver mais
                                    <ChevronDown
                                      className=""
                                      stroke="currentColor"
                                    />
                                  </motion.div>
                                );
                              }
                            })}
                          {favorito.length === 0 && (
                            <div className="w-full h-fit rounded-[25px] border-2 border-[#CAC5FF] p-4 text-center">
                              <span className="text-[25px] font-medium">
                                Nenhuma postagem salva. Salve uma para aparecer
                                aqui!
                              </span>
                            </div>
                          )}
                        </motion.div>
                      </>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </SearchContext.Provider>
      </FavoritosContext.Provider>
    </>
  );
}
