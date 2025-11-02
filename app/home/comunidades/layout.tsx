"use client";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import ErrorModal from "@/components/ui/ErrorModal";
import Loading from "../loading";
import {
  ArrowLeft,
  ChevronDown,
  ChevronRight,
  Search,
  User,
} from "lucide-react";
import path from "path";

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

export default function LayoutSalas({ children }: SalasProps) {
  const router = useRouter();
  const scrollRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const [user, setUser] = useState<UserData>({});
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<string | null>(null);
  const [sala, setSala] = useState<Sala[]>([]);
  const [salaID, setSalaID] = useState<string>("");
  const emComentario = pathname.split("/")[5];
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setSalaID(pathname.split("/")[4]);
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
    setLoading(true);
    const fetchAll = async () => {
      try {
        // Run all fetches in parallel
        const [userRes, salaRes] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/home/identificacao`, {
            method: "GET",
            credentials: "include",
          }),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/sala-estudo/${salaID}`, {
            method: "GET",
            credentials: "include",
          }),
        ]);

        // Parse all JSONs in parallel
        const [userData, salaData] = await Promise.all([
          userRes.json(),
          salaRes.json(),
        ]);

        // ✅ Set states after everything is done
        setUser(userData);
        setSala(salaData.salas);

        // Extract data from /home/salas-estudo safely
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

  return (
    <>
      {message && (
        <ErrorModal message={message} onClose={() => setMessage(null)} />
      )}

      {/* h-[calc(100vh-24px)] */}
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
                              {!loading && sala?.[0]?.banner && (
                                <>
                                  <div className="w-7 h-7 absolute top-4 left-4">
                                    <ArrowLeft
                                      className="cursor-pointer w-full h-full"
                                      onClick={() => router.back()}
                                    />
                                  </div>
                                  <img
                                    src={sala[0].banner}
                                    className="w-full h-full object-cover"
                                    alt="Banner"
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
                    pathname.endsWith("/materiais") ? ( */}

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
                <div className="h-full flex w-full  rounded-[35px] overflow-hidden bg-white  flex-col items-center shadow-md border border-[#00000031]">
                  <AnimatePresence>
                    <div className="flex max-w-full w-full overflow-x-auto hide-scrollbar overflow-y-hidden border border-b-[#D7DDEA] relative text-[22px] font-medium gap-4 pl-4">
                      <div className="flex min-w-fit w-full relative gap-4 h-fit py-2">
                        <motion.a
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          href="/home/comunidades/postagens"
                          className=" cursor-pointer "
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
                              className={`origin-center -mb-1 rounded-3xl transition-all ease-in-out h-[5px] bg-[#A39CEC]`}
                            ></motion.div>
                          )}
                        </motion.a>

                        <motion.a
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          href="/home/comunidades/salas_de_estudo"
                          className=" cursor-pointer "
                        >
                          <motion.span className="text-nowrap">
                            Salas de estudo
                          </motion.span>
                          {pathname.endsWith("salas_de_estudo") && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              exit={{ scale: 1 }}
                              className={`origin-center -mb-1 rounded-3xl transition-all ease-in-out h-[5px] bg-[#A39CEC]`}
                            ></motion.div>
                          )}
                        </motion.a>

                        <motion.a
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          href="/home/comunidades/seguindo"
                          className=" cursor-pointer "
                        >
                          <motion.span>Seguindo</motion.span>
                          {pathname.endsWith("seguindo") && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              exit={{ scale: 1 }}
                              className={`origin-center -mb-1 rounded-3xl transition-all ease-in-out h-[5px] bg-[#A39CEC]`}
                            ></motion.div>
                          )}
                        </motion.a>
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
                {pathname.startsWith("/home/comunidades/salas_de_estudo/") &&
                pathname.endsWith("/postagens") ? (
                  <>
                    <h1 className="text-[25px] leading-none font-medium my-2">
                      {sala[0].nome}
                    </h1>
                    <p className="w-full text-[18px] break-all line-clamp-5">
                      {sala[0].descricao}
                    </p>
                    

                    <h1 className="text-[25px] leading-none font-medium my-2">
                      Recentes
                    </h1>
                    <div className="flex flex-col gap-3 border border-b-[#D7DDEA] ">
                      {Array.from({ length: 4 }).map((_, index) => (
                        <div
                          key={index}
                          className="flex gap-1 max-w-full w-full  overflow-hidden"
                        >
                          <img
                            src={`${user.foto}`}
                            className="rounded-full cursor-pointer transition-all w-10 h-10 shadow-md  "
                            alt="Foto de perfil"
                          />
                          <div className="flex flex-col text-[18px] leading-none gap-1 truncate ">
                            <span className="font-semibold truncate">
                              Matemática
                            </span>
                            <span className="font-medium truncate">
                              {" "}
                              3,4 mil seguidores
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
                      ))}
                      <div className="w-full text-[#EB9481] text-center text-[18px] flex justify-center items-center">
                        Ver mais
                        <ChevronDown className="" stroke="currentColor" />
                      </div>
                    </div>

                    <h1 className="text-[25px] leading-none font-medium my-2">
                      Postagens Favoritas
                    </h1>
                    <div className="flex flex-col gap-3 border border-b-[#D7DDEA] ">
                      {Array.from({ length: 4 }).map((_, index) => (
                        <div
                          key={index}
                          className="flex gap-1 max-w-full w-full  overflow-hidden"
                        >
                          <img
                            src={`${user.foto}`}
                            className="rounded-full cursor-pointer transition-all w-10 h-10 shadow-md  "
                            alt="Foto de perfil"
                          />
                          <div className="flex flex-col text-[18px] leading-none gap-1 truncate ">
                            <span className="font-semibold truncate">
                              Matemática
                            </span>
                            <span className="font-medium truncate">
                              {" "}
                              3,4 mil seguidores
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
                      ))}
                      <div className="w-full text-[#EB9481] text-center text-[18px] flex justify-center items-center">
                        Ver mais
                        <ChevronDown className="" stroke="currentColor" />
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <h1 className="text-[25px] leading-none font-medium my-2">
                      Suas comunidades
                    </h1>
                    <div className="flex flex-col gap-3 border border-b-[#D7DDEA] ">
                      {Array.from({ length: 4 }).map((_, index) => (
                        <div
                          key={index}
                          className="flex gap-1 max-w-full w-full  overflow-hidden"
                        >
                          <img
                            src={`${user.foto}`}
                            className="rounded-full cursor-pointer transition-all w-10 h-10 shadow-md  "
                            alt="Foto de perfil"
                          />
                          <div className="flex flex-col text-[18px] leading-none gap-1 truncate ">
                            <span className="font-semibold truncate">
                              Matemática
                            </span>
                            <span className="font-medium truncate">
                              {" "}
                              3,4 mil seguidores
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
                      ))}
                      <div className="cursor-pointer cw-full text-[#EB9481] text-center text-[18px] flex justify-center items-center">
                        Ver mais
                        <ChevronDown className="" stroke="currentColor" />
                      </div>
                    </div>

                    <h1 className="text-[25px] leading-none font-medium my-2">
                      Recentes
                    </h1>
                    <div className="flex flex-col gap-3 border border-b-[#D7DDEA] ">
                      {Array.from({ length: 4 }).map((_, index) => (
                        <div
                          key={index}
                          className="flex gap-1 max-w-full w-full  overflow-hidden"
                        >
                          <img
                            src={`${user.foto}`}
                            className="rounded-full cursor-pointer transition-all w-10 h-10 shadow-md  "
                            alt="Foto de perfil"
                          />
                          <div className="flex flex-col text-[18px] leading-none gap-1 truncate ">
                            <span className="font-semibold truncate">
                              Matemática
                            </span>
                            <span className="font-medium truncate">
                              {" "}
                              3,4 mil seguidores
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
                      ))}
                      <div className="w-full text-[#EB9481] text-center text-[18px] flex justify-center items-center">
                        Ver mais
                        <ChevronDown className="" stroke="currentColor" />
                      </div>
                    </div>

                    <h1 className="text-[25px] leading-none font-medium my-2">
                      Postagens Favoritas
                    </h1>
                    <div className="flex flex-col gap-3 border border-b-[#D7DDEA] ">
                      {Array.from({ length: 4 }).map((_, index) => (
                        <div
                          key={index}
                          className="flex gap-1 max-w-full w-full  overflow-hidden"
                        >
                          <img
                            src={`${user.foto}`}
                            className="rounded-full cursor-pointer transition-all w-10 h-10 shadow-md  "
                            alt="Foto de perfil"
                          />
                          <div className="flex flex-col text-[18px] leading-none gap-1 truncate ">
                            <span className="font-semibold truncate">
                              Matemática
                            </span>
                            <span className="font-medium truncate">
                              {" "}
                              3,4 mil seguidores
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
                      ))}
                      <div className="w-full text-[#EB9481] text-center text-[18px] flex justify-center items-center">
                        Ver mais
                        <ChevronDown className="" stroke="currentColor" />
                      </div>
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
