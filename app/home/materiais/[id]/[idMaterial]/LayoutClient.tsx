"use client";

import Link from "next/link";
import { usePathname, useParams } from "next/navigation";
import { Reply, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Backdrop3 } from "@/app/home/components/backdrop";
import Loading from "@/app/home/components/loading";
import { useRouter } from "next/navigation";

type UserData = {
  primeiroNome?: string;
  cargo?: string;
  foto?: string;
};

export default function LayoutClient({
  id,
  idMaterial,
}: {
  id: string;
  idMaterial: string;
}) {
  const pathname = usePathname();
  const router = useRouter(); // ✅ Hook no topo do componente

  const [concluiu, setConcluiu] = useState(false);
  const [user, setUser] = useState<UserData>({});
  const [documento, setDocumento] = useState(false);
  const [finalizado, setFinalizado] = useState<boolean>(true);

  // ------------------- Carregar dados -------------------
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/home/identificacao`,
          { method: "GET", credentials: "include" }
        );
        const data = await res.json();
        setUser(data);
      } catch (err) {
        console.error("Erro ao carregar usuário:", err);
      }
    };

    const fetchMaterial = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/materiais/${idMaterial}`,
          { method: "GET", credentials: "include" }
        );
        const data = await res.json();
        setFinalizado(data.material.finalizado);

        console.log(data);
        if (data.material.origem === "DOCUMENTO") {
          setDocumento(true);
        }
      } catch (err) {
        console.error("Erro ao carregar material:", err);
      }
    };

    fetchUser();
    fetchMaterial();
  }, [idMaterial]);

  // ------------------- Concluir material -------------------
  const Concluir = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/materiais/concluir/${idMaterial}`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        }
      );

      const data = await res.json();
      console.log(data);
      if (
        data.message ===
        "Material concluído! Você ganhou +20 XP por participação."
      ) {
        setConcluiu(true);
        router.push(`/home/materiais/${id}`);
      }
    } catch (err) {
      console.error("Erro ao concluir material:", err);
    }
  };

  const startTimeRef = useRef<number>(0);
  const [timeSpent, setTimeSpent] = useState(0);

  function formatTime(ms: number) {
    let totalSeconds = Math.floor(ms / 1000);

    const hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;

    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    const pad = (n: number) => String(n).padStart(2, "0");

    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  }

 useEffect(() => {
   startTimeRef.current = Date.now();
   console.log("✅ Entered material layout");

   return () => {
     // ✅ triggers ONLY when the user leaves this section
     const msSpent = Date.now() - startTimeRef.current;
     const formatted = formatTime(msSpent);
     console.log("⏳ Sending:", formatted);

     fetch(
       `${process.env.NEXT_PUBLIC_API_URL}/materiais/tempo-estudo/${idMaterial}`,
       {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify({ tempo: formatted }),
         credentials: "include",
         keepalive: true, // important for unload
       }
     )
       .then((r) => r.text())
       .then((t) => console.log("✅ Backend replied:", t))
       .catch((err) => console.log("❌ Failed:", err));
   };
 }, []);



  return (
    <>
      {/* ------------------- Modal de Conclusão ------------------- */}
      <AnimatePresence initial={false}>
        {concluiu && (
          <>
            <motion.div
              key="content"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 0.94 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="w-full h-full fixed top-0 left-0 flex justify-center items-center z-[1100]"
            >
              <div className="w-full h-full absolute"></div>

              <motion.div
                key="modal"
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 0.94 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="w-[790px] h-[300px] max-w-[90%] flex justify-center items-center rounded-[40px] z-[1100]"
              >
                <div className="w-full h-full rounded-[40px] bg-white shadow-md flex justify-center items-center relative overflow-hidden">
                  <div className="absolute top-[-40px] left-[-100px] w-[140%]">
                    <Image
                      width={300}
                      height={500}
                      src="/concluir.svg"
                      alt="Decoração"
                      className="w-full"
                    />
                  </div>

                  <div className="w-[80%] h-[85%] flex flex-col items-center gap-2 z-[900]">
                    <div className="flex flex-col justify-center items-center">
                      <img
                        src={`${user.foto}`}
                        alt="Foto de perfil"
                        className="rounded-full w-20 h-20"
                      />
                      <span className="font-medium text-[30px]">
                        {user.primeiroNome}
                      </span>
                    </div>

                    <h1 className="text-center text-[30px] font-medium">
                      Missão cumprida!
                    </h1>

                    <div className="w-[60%] flex justify-center mt-auto">
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => {
                          setConcluiu(false);
                          router.push(`/home/materiais/${id}`);
                        }}
                        className="w-[180px] rounded-[20px] text-[26px] text-white bg-[#9767F8] border border-[rgba(68,68,68,0.17)]"
                      >
                        Finalizar
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            <div className="w-full absolute flex justify-center items-center">
              <Backdrop3 onClick={() => {}} />
            </div>
          </>
        )}
      </AnimatePresence>

      {/* ------------------- Conteúdo principal ------------------- */}
      <div className="flex w-full h-full relative">
        <div className="flex flex-col w-full h-full relative gap-2">
          <div className="flex justify-between gap-2 overflow-x-scroll pb-1 scrollbar-hide">
            <div className="flex justify-between gap-2">
              {/* Tabs */}
              {/* {documento && (
                  <Link href={`/home/materiais/${id}/${idMaterial}/Material`}>
                    <h2
                      className={`text-[15px] lg:text-[20px] font-medium cursor-pointer relative flex justify-center ${
                        pathname ===
                        `/home/materiais/${id}/${idMaterial}/Material`
                          ? ""
                          : "text-[rgb(0,0,0,54%)]"
                      }`}
                    >
                      Material
                    </h2>
                  </Link>
                )} */}

              <Link href={`/home/materiais/${id}/${idMaterial}/Resumo`}>
                {(() => {
                  if (
                    pathname === `/home/materiais/${id}/${idMaterial}/Resumo`
                  ) {
                    return (
                      <>
                        <h2
                          className={`text-[15px] lg:text-[20px] font-medium cursor-pointer relative flex justify-center `}
                        >
                          Resumo
                        </h2>
                        <AnimatePresence>
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 1 }}
                            className={`origin-center -mb-1 rounded-3xl transition-all ease-in-out h-[5px] bg-[#A39CEC]`}
                          ></motion.div>
                        </AnimatePresence>
                      </>
                    );
                  }
                  return (
                    <h2
                      className={`text-[15px] lg:text-[20px] font-medium cursor-pointer relative flex justify-center text-[rgb(0,0,0,54%)]`}
                    >
                      Resumo
                    </h2>
                  );
                })()}
              </Link>

              <Link href={`/home/materiais/${id}/${idMaterial}/Flashcards`}>
                {(() => {
                  if (
                    pathname ===
                    `/home/materiais/${id}/${idMaterial}/Flashcards`
                  ) {
                    return (
                      <>
                        <h2
                          className={`text-[15px] lg:text-[20px] font-medium cursor-pointer relative flex justify-center `}
                        >
                          Flashcards
                        </h2>
                        <AnimatePresence>
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 1 }}
                            className={`origin-center -mb-1 rounded-3xl transition-all ease-in-out h-[5px] bg-[#A39CEC]`}
                          ></motion.div>
                        </AnimatePresence>
                      </>
                    );
                  }
                  return (
                    <h2
                      className={`text-[15px] lg:text-[20px] font-medium cursor-pointer relative flex justify-center text-[rgb(0,0,0,54%)]`}
                    >
                      Flashcards
                    </h2>
                  );
                })()}
              </Link>

              <Link href={`/home/materiais/${id}/${idMaterial}/Quizzes`}>
                {(() => {
                  if (
                    pathname === `/home/materiais/${id}/${idMaterial}/Quizzes`
                  ) {
                    return (
                      <>
                        <h2
                          className={`text-[15px] lg:text-[20px] font-medium cursor-pointer relative flex justify-center `}
                        >
                          Quizzes
                        </h2>
                        <AnimatePresence>
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 1 }}
                            className={`origin-center -mb-1 rounded-3xl transition-all ease-in-out h-[5px] bg-[#A39CEC]`}
                          ></motion.div>
                        </AnimatePresence>
                      </>
                    );
                  }
                  return (
                    <h2
                      className={`text-[15px] lg:text-[20px] font-medium cursor-pointer relative flex justify-center text-[rgb(0,0,0,54%)]`}
                    >
                      Quizzes
                    </h2>
                  );
                })()}
              </Link>
            </div>
            <AnimatePresence>
              <div className="flex gap-2">
                {!finalizado && (
                  <motion.button
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    whileTap={{ scale: 0.98 }}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => Concluir()}
                    className="flex bg-[#A39CEC] justify-center items-center text-white h-fit px-2 rounded-full text-[15px] lg:text-[20px] font-medium cursor-pointer relative"
                  >
                    Concluir
                  </motion.button>
                )}
                <Link href={`/home/materiais/${id}`}>
                  <motion.button
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    whileTap={{ scale: 0.98 }}
                    whileHover={{ scale: 1.02 }}
                    className="flex bg-[#A39CEC] justify-center items-center text-white h-fit px-2 rounded-full text-[15px] lg:text-[20px] font-medium cursor-pointer relative"
                  >
                    <Reply className="reply" /> Voltar
                  </motion.button>
                </Link>
                {/* <motion.button
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  whileTap={{ scale: 0.98 }}
                  whileHover={{ scale: 1.02 }}
                  className="flex bg-[#A39CEC] justify-center items-center text-white h-fit px-2 rounded-full text-[15px] lg:text-[20px] font-medium cursor-pointer relative"
                >
                  <Reply className="reply" /> Voltar
                </motion.button> */}
              </div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </>
  );
}
