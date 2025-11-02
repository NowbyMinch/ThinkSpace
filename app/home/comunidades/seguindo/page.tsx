"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import ErrorModal from "@/components/ui/ErrorModal";
import Loading from "@/app/home/components/loading";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

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
  assunto: string | null;
  banner: string;
  criadoEm: string;
  descricao: string;
  id: string;
  moderadorId: string;
  nome: string;
  tipo: "PUBLICA" | "PRIVADA" | string; // you can restrict to known values
  topicos: string[];
};

const cor = ["#8B81F3", "#CAC5FF", "#FFA6F1", "#FFACA1"];

export default function Materiais() {
  const router = useRouter();
  const [message, setMessage] = useState<string | null>(null);
  const [user, setUser] = useState<UserData>({});
  const [bannerData, setBannerData] = useState<BannerData>({});
  const [loading, setLoading] = useState(false);
  const [salas, setSalas] = useState<Salas[]>([]);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        // Run all fetches in parallel
        const [userRes, salasRes] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/home/identificacao`, {
            method: "GET",
            credentials: "include",
          }),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/sala-estudo`, {
            method: "GET",
            credentials: "include",
          }),
        ]);

        // Parse all JSONs in parallel
        const [userData, salasData] = await Promise.all([
          userRes.json(),
          salasRes.json(),
        ]);

        // ✅ Set states after everything is done
        setUser(userData);
        setSalas(salasData.salas);

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

  if (loading) return <Loading />;
  return (
    <>
      <div className="w-full h-full flex flex-col px-4 py-2 gap-4 overflow-y-auto overflow-x-hidden">
        {salas.map((sala, index) => {
          const randomColor = cor[Math.floor(Math.random() * cor.length)];
          console.log(sala);

          return (
            <div
              key={index}
              className="w-full min-h-fit h-[300px] border-2 border-[rgba(0,0,0,0.3)] rounded-[35px] shadow-md p-4 flex gap-3 lg:flex-row flex-col "
            >
              <div className="flex h-full flex-col min-w-[60%] w-full ">
                <div className="flex items-center w-full justify-between">
                  <h1>Esportes</h1>
                </div>
                <div className="shadow-md flex justify-center items-center w-full h-full max-h-full rounded-[35px] min-h-[160px] overflow-hidden">
                  <img
                    src={`${sala.banner}`}
                    className="w-full h-full object-cover"
                    alt=""
                  />
                  {/* <div className="max-w-[50%] w-[50%] max-h-full h-full flex justify-center items-center">
    <Plus className="w-[50%] max-w-[155px] h-[70%]" />
  </div> */}
                </div>
              </div>

              <div className="flex flex-col gap-5 w-full justify-center">
                <div className="flex gap-1 w-full ">
                  {sala.topicos.map((topico, index) => {
                    const randomColor =
                      cor[Math.floor(Math.random() * cor.length)];

                    return (
                      <span
                        key={index}
                        style={{ backgroundColor: randomColor }}
                        className={` text-[16px] px-3 rounded-full h-fit w-fit shadow-md`}
                      >
                        {topico}
                      </span>
                    );
                  })}
                </div>
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  transition={{ ease: "easeInOut" }}
                  onClick={() => {
                    router.push(
                      `/home/comunidades/salas_de_estudo/${sala.id}/postagens`
                    );
                  }}
                  className="text-white font-medium text-[20px] bg-[#1E2351] w-full max-w-[230px] rounded-full  py-3 shadow-md"
                >
                  Visualizar
                </motion.button>
                {/* <div className="flex items-center ">
                  <div className="relative w-[160px] h-[50px] flex cursor-pointer">
                    <>
                      {avatares[3] && (
                        <img
                          src={avatares[3]}
                          className="diaOfensiva rounded-full absolute border-white border-[2px] left-[72px]"
                          alt="Usuário"
                        />
                      )}
                      {avatares[2] && (
                        <img
                          src={avatares[2]}
                          className="diaOfensiva rounded-full absolute border-white border-[2px] left-[48px]"
                          alt="Usuário"
                        />
                      )}
                      {avatares[1] && (
                        <img
                          src={avatares[1]}
                          className="diaOfensiva rounded-full absolute border-white border-[2px] left-[24px]"
                          alt="Usuário"
                        />
                      )}
                      {avatares[0] && (
                        <img
                          src={avatares[0]}
                          className="diaOfensiva rounded-full absolute border-white border-[2px]"
                          alt="Usuário"
                        />
                      )}
                    </>
                  </div>
                  <div className="flex justify-between  items-center h-[44px] w-full ">
                    <h2
                      className={`text-[18px] ${totalEstudantes > 4 ? "block" : "hidden"} pl-1`}
                    >
                      +{totalEstudantes - 4} estudantes
                    </h2>
                  </div>
                </div> */}
              </div>
            </div>
          );
        })}

        {Array.from({ length: 5 }).map((_, index) => {
          const randomColor = cor[Math.floor(Math.random() * cor.length)];

          {
            /* {
                sala.topicos.map((topico, index) => {
                  const randomColor = cor[Math.floor(Math.random() * cor.length)];
                  return (
                    <h2
                      key={index}
                      style={{ backgroundColor: randomColor }}
                      className="text-[18px] px-3 text-white rounded-full "
                    >
                      {topico}
                    </h2>
                  );
                });
              } */
          }

          return (
            <div
              key={index}
              className="w-full min-h-fit h-[300px] border-2 border-[rgba(0,0,0,0.3)] rounded-[35px] shadow-md p-4 flex gap-3 lg:flex-row flex-col "
            >
              <div className="flex h-full flex-col min-w-[60%] w-full ">
                <div className="flex items-center w-full justify-between">
                  <h1>Esportes</h1>
                  {/* <div className="flex gap-1">
                    {Array.from({ length: 2 }).map((_, index) => {
                      const randomColor =
                        cor[Math.floor(Math.random() * cor.length)];

                      return (
                        <span
                          style={{ backgroundColor: randomColor }}
                          className={` text-[20px] px-3 rounded-full`}
                        >
                          Matérias
                        </span>
                      );
                    })}
                  </div> */}
                </div>
                <div
                  style={{ backgroundColor: randomColor }}
                  className="shadow-md flex justify-center items-center w-full h-full max-h-full rounded-[35px] min-h-[160px]"
                >
                  <div className=" max-w-[50%] w-[50%] max-h-full h-full flex justify-center items-center">
                    <Plus className="w-[50%] max-w-[155px] h-[70%]" />
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-5 w-full justify-center">
                <div className="flex gap-1 w-full ">
                  {Array.from({ length: 2 }).map((_, index) => {
                    const randomColor =
                      cor[Math.floor(Math.random() * cor.length)];

                    return (
                      <span
                        key={index}
                        style={{ backgroundColor: randomColor }}
                        className={` text-[16px] px-3 rounded-full h-fit w-fit shadow-md`}
                      >
                        Matérias
                      </span>
                    );
                  })}
                </div>
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  transition={{ ease: "easeInOut" }}
                  className="text-white font-medium text-[20px] bg-[#1E2351] w-full max-w-[230px] rounded-full  py-3 shadow-md"
                >
                  Visualizar
                </motion.button>
                asddsa
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
