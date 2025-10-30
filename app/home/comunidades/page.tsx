"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import ErrorModal from "@/components/ui/ErrorModal";
import Loading from "@/app/home/components/loading";

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
  topicos: string[];
  banner: string;
  moderadorId: string;
  assuntoId: string | null;
  criadoEm: string;
};
export default function Materiais() {
  const [message, setMessage] = useState<string | null>(null);
  const [user, setUser] = useState<UserData>({});
  const [bannerData, setBannerData] = useState<BannerData>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        // Run all fetches in parallel
        const [userRes] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/home/identificacao`, {
            method: "GET",
            credentials: "include",
          }),
        ]);

        // Parse all JSONs in parallel
        const [userData] = await Promise.all([userRes.json()]);

        // ✅ Set states after everything is done
        setUser(userData);

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
      {message && (
        <ErrorModal message={message} onClose={() => setMessage(null)} />
      )}

      {/* h-[calc(100vh-24px)] */}
      <div className="w-full h-screen  flex justify-center items-start overflow-hidden">
        <div className="w-[1800px] max-w-[98%] py-2 h-full gap-3 rounded-[35px] flex flex-row">
          <div className="w-full h-full overflow-hidden flex flex-col items-center gap-2">
            <div className="h-fit w-full flex justify-between gap-6">
              <input
                type="text"
                id="nome_materia"
                placeholder="Nome da matéria"
                className="pl-5 text-[18px] max-w-[650px] w-full py-2 border-2 border-[rgba(0,0,0,0.19)] h-[50px] rounded-full outline-[rgba(151,103,248,0.6)]"
              />
              <div className="flex gap-2 min-w-fit">
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
                  className="rounded-full cursor-pointer transition-all w-[55px] h-[55px] shadow-md bg-blue-200 "
                  alt="Foto de perfil"
                />
              </div>
            </div>
            <div className="h-full flex w-full  rounded-[35px] overflow-hidden bg-white  flex-col items-center shadow-md border border-[#00000031]">
              <div className="flex w-full pt-4  border border-b-[#D7DDEA] relative text-[25px] font-medium gap-4">
                <motion.button className=" cursor-pointer ">
                  <span>Postagens</span>
                  <AnimatePresence>
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 1 }}
                      className={`origin-center -mb-1 rounded-3xl transition-all ease-in-out h-[5px] bg-[#A39CEC]`}
                    ></motion.div>
                  </AnimatePresence>
                </motion.button>
                <motion.button className="cursor-pointer leading-none text-nowrap text-center flex justify-center items-center">
                  <span className="flex ">Salas de estudo</span>
                  <AnimatePresence>
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 1 }}
                      className={`origin-center  rounded-3xl transition-all ease-in-out h-[5px] bg-[#A39CEC]`}
                    ></motion.div>
                  </AnimatePresence>
                </motion.button>
              </div>
            </div>
          </div>

          <div className="md:flex hidden sm:min-w-[20%] sm:w-min sm:max-w-[45%] w-full  sm:flex-col px-4 pt-4 gap-2 sm:max-h-full h-[550px] max-h-[550px] sm:h-full bg-white rounded-[35px] h0 shadow-md overflow-hidden border border-[#00000031] "></div>
        </div>
      </div>
    </>
  );
}
