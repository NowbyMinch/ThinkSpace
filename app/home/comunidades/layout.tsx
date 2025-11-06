"use client";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { createContext, useEffect, useRef, useState } from "react";
import ErrorModal from "@/components/ui/ErrorModal";
import Loading from "../loading";
import {
  ArrowLeft,
  CalendarDays,
  ChevronDown,
  ChevronRight,
  Search,
  User,
} from "lucide-react";
import path from "path";
import { Backdrop3 } from "../components/backdrop";

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

export const FavoritosContext = createContext({
  refreshFavoritos: () => {},
});

export const SearchContext = createContext({
  searchTerm: "",
  setSearchTerm: (value: string) => {},
});

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
            `${process.env.NEXT_PUBLIC_API_URL}/sala-estudo/${pathname.split("/")[4]}`,
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
      if (favoritosData.length > 0) {
        setFavorito(Array.isArray(favoritosData) ? favoritosData : []);
      }
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
              `${process.env.NEXT_PUBLIC_API_URL}/sala-estudo/${pathname.split("/")[4]}`,
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
        setUserID(userIDdata.userId);
        if (recentesData.length > 0) {
          setRecentes(Array.isArray(recentesData) ? recentesData : []);
        }
        console.log(recentesData, "recentesData ");

        if (favoritosData.length > 0) {
          setFavorito(Array.isArray(favoritosData) ? favoritosData : []);
        }

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
  }


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
              </div>
            </motion.div>
          </motion.div>

          <div className="w-full absolute flex justify-center items-center">
            <Backdrop3 onClick={() => closing()} />
          </div>
        </>
      )}
      <FavoritosContext.Provider value={{ refreshFavoritos }}>
        {/* h-[calc(100vh-24px)] */}
        <SearchContext.Provider value={{ searchTerm, setSearchTerm }}>
          <div
            ref={scrollRef}
            className="w-full h-screen flex justify-center items-start"
          >
            <div className="w-[1600px] max-w-[98%] py-2 h-full gap-3 rounded-[35px] flex flex-row">
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
                            <div className="flex w-full h-full rounded-[35px] bg-white flex-col items-center shadow-md overflow-y-auto overflow-x-hidden ">
                              <div className="w-full">
                                <div className="w-full h-[385px] bg-[#9767F8] relative">
                                  {!loading && (
                                    <>
                                      <div className="w-7 h-7 absolute top-4 left-4">
                                        <ArrowLeft
                                          className="cursor-pointer w-full h-full "
                                          onClick={() => {
                                            router.push(
                                              "/home/comunidades/salas_de_estudo"
                                            );
                                          }}
                                        />
                                      </div>

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
                        <div className=" h-[60px] flex gap-2 min-w-fit">
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
                            className=" h-[60px] flex gap-2 min-w-fit"
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

              <div className="sm:flex hidden sm:max-w-[38%] md:max-w-[35%] lg:max-w-[30%] w-full sm:flex-col pt-4 gap-2 px-4 h-full bg-white rounded-[35px] h0 shadow-md overflow-hidden border border-[#00000031] overflow-y-auto">
                {loading ? (
                  <Loading />
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
                        <div className="flex gap-1 border border-b-[#D7DDEA] pb-4">
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

                        <h1 className="text-[25px] leading-none font-medium my-2">
                          Recentes:
                        </h1>
                        <div className="flex flex-col gap-2 ">
                          {recentes.map((item, index) => {
                            if (index < 4) {
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
                            } else if (index === 4) {
                              return (
                                <motion.div
                                  whileHover={{ scale: 1.01 }}
                                  whileTap={{ scale: 0.99 }}
                                  key={index}
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
                                    </div>
                                    <p className="break-all line-clamp-4">
                                      {favorito.conteudo}
                                    </p>
                                  </motion.div>
                                );
                              } else if (index === 5) {
                                console.log("Index", index);
                                return (
                                  <motion.div
                                    whileHover={{ scale: 1.01 }}
                                    whileTap={{ scale: 0.99 }}
                                    key={index}
                                    onClick={() => {setOpen(true)}}
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
                            console.log(index);
                            if (index < 4) {
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
                            } else if (index === 4) {
                              return (
                                <motion.div
                                  whileHover={{ scale: 1.01 }}
                                  whileTap={{ scale: 0.99 }}
                                  key={index}
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
                                    </div>
                                    <p className="break-all line-clamp-4">
                                      {favorito.conteudo}
                                    </p>
                                  </motion.div>
                                );
                              } else if (index === 4) {
                                 <motion.div
                                   whileHover={{ scale: 1.01 }}
                                   whileTap={{ scale: 0.99 }}
                                   key={index}
                                   className="cursor-pointer -mt-2 w-full text-[#EB9481] text-center text-[18px] flex justify-center items-center"
                                 >
                                   Ver mais
                                   <ChevronDown
                                     className=""
                                     stroke="currentColor"
                                   />
                                 </motion.div>
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
