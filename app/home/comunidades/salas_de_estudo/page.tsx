"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef, useContext, useMemo } from "react";
import ErrorModal from "@/components/ui/ErrorModal";
import Loading from "@/app/home/components/loading";
import { Plus, X } from "lucide-react";
import { SearchContext } from "../layout";
import { useRouter } from "next/navigation";
import { Backdrop3 } from "../../components/backdrop";

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
type Salas = {
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

const cor = ["#8B81F3", "#CAC5FF", "#FFA6F1", "#FFACA1"];

export default function SalasdeEstudo() {
  const router = useRouter();
  const [message, setMessage] = useState<string | null>(null);
  const [user, setUser] = useState<UserData>({});
  const [bannerData, setBannerData] = useState<BannerData>({});
  const [loading, setLoading] = useState(false);
  const [salas, setSalas] = useState<Salas[]>([]);
  const [avatares, setAvatares] = useState<string[]>([]);
  const { searchTerm } = useContext(SearchContext);
  const [open2, setOpen2] = useState(false);

  const filteredPosts = useMemo(() => {
    if (!searchTerm.trim()) return salas;
    return salas.filter((p) =>
      p.nome.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, salas]);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const userIDRes1 = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/users/id`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        const userIDdata1 = await userIDRes1.json(); // parse the response
        // setUserID(userIDdata1.userId); // set the state

        // Run all fetches in parallel
        const [userRes, salasRes] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/home/identificacao`, {
            method: "GET",
            credentials: "include",
          }),
          fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/sala-estudo`,
            {
              method: "GET",
              credentials: "include",
            }
          ),
        ]);

        // Parse all JSONs in parallel
        const [userData, salasData] = await Promise.all([
          userRes.json(),
          salasRes.json(),
        ]);

        // ✅ Set states after everything is done
        setUser(userData);
        setSalas(salasData.salas);
        console.log(
          salasData,
          "DATA SALAS DATA SALAS DATA SALAS DATA SALAS DATA SALAS "
        );

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

    function closing() {
      setOpen2(false);
    }


  if (loading) return <Loading />;
  return (
    <>
      {open2 && (
        <>
          <motion.div
            key="content"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 0.94 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="w-full h-full fixed left-0 right-0  flex justify-center overflow-hidden items-center z-[1100] "
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

                  <div className="relative flex flex-col gap-1">
                    <h2 className="text-[20px] font-medium">
                      Matéria designada:
                    </h2>

                    
                  </div>

                  <div className="w-full flex justify-center items-center">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ ease: "easeInOut" }}
                      type="submit"
                      className=" bg-[#9B79E0] text-white px-4 py-2 shadow-md  rounded-full"
                    >
                      Vincular
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

      <div className="w-full mt-1 h-fit flex flex-col px-4 py-2 gap-3 overflow-y-auto overflow-x-hidden">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ ease: "easeInOut" }}
          onClick={() => setOpen2(true)}
          className=" bg-[#9B79E0] text-white px-4 py-2 shadow-md  rounded-full self-end"
        >
          Criar sala de estudo
        </motion.button>
        {(filteredPosts ?? []).map((sala, index) => {
          const randomColor = cor[Math.floor(Math.random() * cor.length)];
          console.log(sala);

          return (
            <div
              key={index}
              className="w-full min-h-fit h-[300px] border-2 border-[rgba(0,0,0,0.3)] rounded-[35px] shadow-md p-4 flex gap-3 lg:flex-row flex-col "
            >
              <div className="flex h-full flex-col min-w-[60%] w-full ">
                <div className="flex items-center w-full justify-between">
                  <h1>{sala.nome}</h1>
                </div>
                <div className="shadow-md flex justify-center items-center w-full h-full max-h-full rounded-[35px] min-h-[160px] overflow-hidden">
                  <div className="w-full h-64 relative overflow-hidden rounded-lg">
                    <img
                      src={sala.banner} // fallback if null
                      alt={sala.nome}
                      className="w-full h-full object-cover rounded-[35px]"
                    />
                  </div>
                  {/* <div className="max-w-[50%] w-[50%] max-h-full h-full flex justify-center items-center">
                    <Plus className="w-[50%] max-w-[155px] h-[70%]" />
                  </div> */}
                </div>
              </div>

              <div className="flex flex-col gap-5 w-full justify-center">
                <div className="flex flex-wrap gap-1 w-full ">
                  {sala.topicos.slice(0, 5).map((topico, index) => {
                    const randomColor =
                      cor[Math.floor(Math.random() * cor.length)];
                    return (
                      <span
                        key={index}
                        style={{ backgroundColor: randomColor }}
                        className="text-[16px] px-3 rounded-full h-fit w-fit shadow-md truncate"
                      >
                        {topico}
                      </span>
                    );
                  })}
                  {sala.topicos.length > 6 && (
                    <span className="text-[16px] px-3 rounded-full h-fit w-fit shadow-md bg-gray-300">
                      +{sala.topicos.length - 5} more
                    </span>
                  )}
                </div>
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  transition={{ ease: "easeInOut" }}
                  onClick={() => {
                    if (sala.id) {
                      router.push(
                         `/home/comunidades/salas_de_estudo/${sala.id}/postagens`
                      );
                    }
                    
                  }}
                  className="text-white font-medium text-[20px] bg-[#1E2351] w-full max-w-[230px] rounded-full  py-3 shadow-md"
                >
                  Visualizar
                </motion.button>

                <p className="w-full break-all line-clamp-5">
                  {sala.descricao}
                </p>
                <div className="flex items-center">
                  {/* container must allow overflow so avatars aren't clipped */}
                  <div className="relative flex items-center overflow-visible">
                    {(sala.avataresUltimosUsuarios ?? [])
                      .slice(0, 4)
                      .map((avatar, i) => {
                        // compute a zIndex so earlier avatars appear on top of later ones
                        const z = 100 - i;
                        console.log(avatar);
                        return (
                          <div
                            key={i}
                            className="relative"
                            style={{ marginLeft: i === 0 ? 0 : -12, zIndex: z }} // negative overlap
                          >
                            {avatar ? (
                              <img
                                src={avatar}
                                onError={(e) => {
                                  // fallback to show initials if image fails
                                  (
                                    e.currentTarget as HTMLImageElement
                                  ).style.display = "none";
                                  const parent = (
                                    e.currentTarget as HTMLImageElement
                                  ).parentElement;
                                  if (parent)
                                    parent.classList.add(
                                      "bg-gray-300",
                                      "flex",
                                      "items-center",
                                      "justify-center",
                                      "text-sm",
                                      "text-gray-700"
                                    );
                                }}
                                alt={`avatar-${i}`}
                                className="w-10 h-10 rounded-full border-[3px] border-white object-cover block"
                                style={{ display: "block" }}
                              />
                            ) : (
                              <div className="w-10 h-10 rounded-full bg-gray-300 border-[3px] border-white flex items-center justify-center text-sm text-gray-700">
                                {/* could put initials here */}?
                              </div>
                            )}
                          </div>
                        );
                      })}

                    {/* +N bubble when there are more than 4 avatars */}
                    {(sala.avataresUltimosUsuarios ?? []).length > 4 && (
                      <div
                        className="w-10 h-10 rounded-full bg-[#9B79E0] border-[3px] border-white flex items-center justify-center text-white text-sm font-medium ml-[-12px]"
                        style={{ zIndex: 50 }}
                      >
                        +{(sala.quantidadeEstudantes ?? 0) - 4}
                      </div>
                    )}
                  </div>

                  <div className="ml-3">
                    <h2 className="text-[18px]">
                      {sala.quantidadeEstudantes ?? 0}{" "}
                      {sala.quantidadeEstudantes === 1
                        ? "estudante"
                        : "estudantes"}
                    </h2>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
