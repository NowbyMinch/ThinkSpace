"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import ErrorModal from "@/components/ui/ErrorModal";
import Loading from "../loading";
import { User } from "lucide-react";
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

export default function Configurações({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [user, setUser] = useState<UserData>({});
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<string | null>(null);

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

  return (
    <>
      {message && (
        <ErrorModal message={message} onClose={() => setMessage(null)} />
      )}

      {/* h-[calc(100vh-24px)] */}
      <div className="w-full h-screen flex justify-center items-start overflow-hidden">
        <div className="w-[1600px] max-w-[98%] py-2 h-full gap-3 rounded-[35px] flex flex-row">
          <div className="w-full h-full overflow-hidden flex flex-col items-center gap-2">
            <div className="h-fit w-full flex justify-between gap-6">
              {pathname.endsWith("postagens") ? (
                <input
                  type="text"
                  id="nome_materia"
                  placeholder="Pesquisar postagem"
                  className="pl-5 text-[18px] max-w-[650px] w-full py-2 border-2 border-[rgba(0,0,0,0.19)] h-[50px] rounded-full outline-[rgba(151,103,248,0.6)]"
                />
              ) : (
                <input
                  type="text"
                  id="nome_materia"
                  placeholder="Pesquisar salas de estudo"
                  className="pl-5 text-[18px] max-w-[650px] w-full py-2 border-2 border-[rgba(0,0,0,0.19)] h-[50px] rounded-full outline-[rgba(151,103,248,0.6)]"
                />
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
                <div className="flex max-w-full w-full overflow-x-auto overflow-y-hidden border border-b-[#D7DDEA] relative text-[22px] font-medium gap-4 pl-4">
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
          </div>

          <div className="sm:flex hidden sm:max-w-[38%] md:max-w-[35%] lg:max-w-[30%] w-full sm:flex-col px-4 pt-4 gap-2  h-full bg-white rounded-[35px] h0 shadow-md overflow-hidden border border-[#00000031] "></div>
        </div>
      </div>
    </>
  );
}
