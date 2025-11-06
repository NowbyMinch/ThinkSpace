"use client";

import {
  ChevronDown,
  HeartPulse,
  CodeXml,
  Cable,
  Plus,
  Minus,
  Divide,
  X,
  Earth,
  UserX,
} from "lucide-react";
import Image from "next/image";
import { ComboboxDemomMetricas } from "@/app/home/components/dropdown";
import Charting from "@/app/home/components/dropdown";
import { useEffect, useState } from "react";
import Link from "next/link";
import Loading from "@/app/home/components/loading";
import { motion, AnimatePresence } from "framer-motion";
import { LucideProps } from "lucide-react";
import { icons } from "@/app/home/components/icons";
import React from "react";
import { Fragment } from "react";

type UserXP = {
  maxXp: number;
  avatar: string;
  cargo: string;
  nivel: string;
  primeiroNome: string;
  progresso: number;
  xp: number;
};
type usuario = {
  email: string;
  foto: string;
  id: string;
  nomeCompleto: string;
  primeiroNome: string;
  sobrenome: string;
};
type Ranking = {
  nivel: string;
  progresso: number;
  rank: number;
  usuario: usuario;
  xp: number;
};
type userData = {
  primeiroNome?: string;
  cargo?: string;
  foto?: string;
  // add other properties if needed
};
type MelhorMateria = {
  nome: string;
  xp: number;
  cor: string;
  icone: string;
};
type MetricasUser = {
  acertos: number;
  erros: number;
  fimSemana: string;
  inicioSemana: string;
  melhoresMaterias: MelhorMateria[];
  percentualAcertos: number;
  percentualErros: number;
  questoesPorDia: QuestoesPorDia;
  rendimentoSemanal: number;
  totalQuestoes: number;
  xp: number;
};
type QuestoesPorDia = {
  [data: string]: number;
};

export default function Métricas() {
  const [user, setUser] = useState<userData>({});
  const [userXP, setUserXP] = useState<UserXP>();
  const [ranking, setRanking] = useState<Ranking[]>([]);
  const [loading, setLoading] = useState(true);
  const [userID, setUserID] = useState("");
  const [metricasUser, setMetricasUser] = useState<MetricasUser>();
  const [melhores, setMelhores] = useState();

  useEffect(() => {
    const fetchAll = async () => {
      try {
        // Run all requests in parallel
        const [userRes, userXPRes, rankingRes, userIDRes] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/home/identificacao`, {
            method: "GET",
            credentials: "include",
          }),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/materias/perfil`, {
            method: "GET",
            credentials: "include",
          }),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/metricas/ranking`, {
            method: "GET",
            credentials: "include",
          }),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/id`, {
            method: "GET",
            credentials: "include",
          }),
        ]);

        // Parse JSONs concurrently
        const [userData, userXPData, rankingData, userIDData] =
          await Promise.all([
            userRes.json(),
            userXPRes.json(),
            rankingRes.json(),
            userIDRes.json(),
          ]);

        // Apply state updates after all are done
        setUser(userData);
        setUserXP(userXPData);
        setRanking(rankingData);
        setUserID(userIDData.userId);

        console.log("All data loaded successfully:", {
          userData,
          userXPData,
          rankingData,
          userIDData,
        });
      } catch (err) {
        console.error("Erro ao carregar dados:", err);
      } finally {
        setLoading(false); // ✅ stop loading only when all 4 are done
      }
    };

    fetchAll();
  }, []);

  useEffect(() => {
    if (userID) {
      const metricasUser = async () => {
        if (userID) {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/metricas/${userID}`,
            {
              method: "GET",
              credentials: "include",
            }
          );

          const data = await res.json();
          setMetricasUser(data);
          setLoading(false);
        }
      };
      metricasUser();

      const metricas = async () => {
        try {
          setLoading(true);
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/metricas/${userID}/?weeksAgo=${0}`,
            {
              method: "GET",
              credentials: "include",
            }
          );

          const data = await res.json();
          // console.log("Metricas: ", data);
        } catch (err) {
          console.error(err);
        } finally {
          setLoading(false);
        }
      };
      metricas();

      const melhoresMaterias = async () => {
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/metricas/${userID}/melhores-materias`,
            {
              method: "GET",
              credentials: "include",
            }
          );

          const data = await res.json();
          setMelhores(data);
          console.log("IGNORE Melhores: ", data);
        } catch (err) {
          console.error(err);
        }
      };
      melhoresMaterias();
    }
  }, [userID]);

  useEffect(() => {
    console.log("USERXP", userXP);
  }, [userXP]);

  if (loading) return <Loading />;

  return (
    <>
      <div className="flex w-full justify-center overflow-hidden ">
        <div className=" mt-[12px] xl:h-[965px] w-[1580px] max-w-[98%] lg:max-w-[90%] flex flex-col gap-4 my-auto pb-4 overflow-y-auto">
          <div className=" flex xl:flex-row flex-col gap-4 min-h-[65%]">
            <div className="min-w-[55%] min-h-[580px] bg-white flex justify-center items-center rounded-[35px] shadow-md border border-[#00000031] ">
              <div className=" w-[90%] h-[90%] flex flex-col justify-between">
                <div className="">
                  <h1 className="text-[30px] font-medium leading-none">
                    Métricas
                  </h1>
                  <h2 className="text-[18px] leading-[28px] ">
                    Seu desempenho da semana está aqui! 💡
                  </h2>
                </div>

                {/* <div className="w-full grid grid-cols-[1fr_1fr_1fr] mt-5 ">
                                    <div className="flex justify-center">
                                        <div className="w-[80%] flex flex-col justify-between">
                                            <h2 className="text-[20px] leading-[25px]">Rendimento semanal</h2>
                                            <div className="">
                                                <div className="w-full h-[2px] mt-2 bg-[rgba(0,0,0,0.23)]"></div>
                                                <h1 className="text-[50px] leading-[60px] font-medium text-[#866ABF]">{metricasUser?.rendimentoSemanal}%</h1>
                                            </div>
                                        </div>
                                    </div>

                                    <div className=" flex justify-center ">
                                        <div className="w-[80%] flex flex-col justify-between">
                                            <h2 className="text-[20px] leading-[25px] flex justify-between items-center">Acertos
                                                <div className="bg-[#FF9F93] w-[25px] h-[25px] rounded-full flex justify-center items-center text-[18px] text-white ">{metricasUser?.acertos}</div>
                                            </h2>
                                            <div className="">
                                                <div className="w-full h-[2px] mt-2 bg-[rgba(0,0,0,0.23)]"></div>
                                                <h1 className="text-[50px] leading-[60px] font-medium text-[#866ABF]">{metricasUser?.percentualAcertos}%</h1>
                                            </div>
                                        </div>
                                    </div>

                                    <div className=" flex justify-end">
                                        <div className="w-[80%] flex flex-col justify-between">
                                            <h2 className="text-[20px] leading-[25px] flex justify-between items-center">Erros
                                                <div className="bg-[#9767F8] w-[25px] h-[25px] rounded-full flex justify-center items-center text-[18px] text-white ">{metricasUser?.erros}</div>
                                            </h2>
                                            <div className="">
                                                <div className="w-full h-[2px] mt-2 bg-[rgba(0,0,0,0.23)]"></div>
                                                <h1 className="text-[50px] leading-[60px] font-medium text-[#866ABF]">{metricasUser?.percentualErros}%</h1>
                                            </div>
                                        </div>
                                    </div>
                                </div> */}

                <Charting />
                {/* <div className="mt-2 flex flex-col justify-between gap-1 "> */}
                {/* </div> */}
              </div>
            </div>

            <div className="w-full flex flex-col md:flex-row xl:flex-col gap-4 ">
              <div className="w-full h-full min-h-[340px] md:min-h-[290px] bg-white rounded-[35px] shadow-md border border-[#00000031] flex justify-center items-center">
                <div className="w-[90%] h-[80%] flex flex-col justify-between ">
                  <div className="flex md:flex-row flex-col items-center gap-5 relative">
                    <div className="relative">
                      <div className="absolute w-[165.3px] h-[163px] bg-[#EB9481] rounded-full top-0 left-[-5px] z-0"></div>
                      <img
                        src={user.foto}
                        className="h-[163px] w-fit rounded-full cursor-pointer relative z-10"
                        alt="Profile picture"
                      />
                    </div>

                    <div className="">
                      <h1 className="text-[30px] font-medium leading-none ">
                        {user.primeiroNome}
                      </h1>
                      <h2 className="text-[#828181] font-medium text-[20px] leading-none">
                        {user.cargo}
                      </h2>
                    </div>
                  </div>

                  <div className="flex flex-col justify-center items-center">
                    <div className="w-full flex justify-between ">
                      {(() => {
                        const nivel = userXP?.nivel
                          ? userXP.nivel.charAt(0).toUpperCase() +
                            userXP.nivel.slice(1).toLowerCase()
                          : "";
                        return (
                          <h2 className="font-medium text-[22px] text-[#828181] w-full flex ">
                            {nivel}
                          </h2>
                        );
                      })()}
                    </div>

                    <div className="w-full h-[12px] rounded-[25px] bg-[#1e235138]">
                      <div
                        style={{ width: `${userXP?.progresso ?? 0}%` }}
                        className={` h-[12px] rounded-[25px] bg-purple-600 `}
                      ></div>
                    </div>

                    <div className="flex justify-between w-full">
                      <h2 className="font-medium text-[20px] text-[#A39CEC]">
                        {userXP?.xp} XP
                      </h2>
                      {(() => {
                        if (!userXP?.maxXp) {
                          return (
                            <h2 className="font-medium text-[20px] text-[#A39CEC]">
                              Máximo atingido!
                            </h2>
                          );
                        } else {
                          return (
                            <h2 className="font-medium text-[20px] text-[#A39CEC]">
                              {userXP?.maxXp} XP
                            </h2>
                          );
                        }
                      })()}
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full h-full min-h-[340px] md:min-h-[290px] bg-white rounded-[35px] shadow-md flex justify-center items-center border border-[#00000031]">
                <div className="w-[90%] h-[92%] flex flex-col gap-2">
                  <h1 className="leading-none font-medium flex justify-between items-end text-[30px]">
                    Ranking
                    <div className="flex gap-2">
                      {/* <div className="w-fit px-3 h-8 rounded-[30px] bg-[#D9D9D9] flex justify-center items-center text-[18px] text-black cursor-pointer">Geral</div> */}
                      <ComboboxDemomMetricas />
                      {/* <div className="w-fit px-3 h-8 rounded-[30px] bg-[#9767f85e] flex justify-center items-center text-[18px] text-black cursor-pointer">
                                                Sala de estudos
                                                <ChevronDown/>
                                            </div> */}
                    </div>
                  </h1>

                  {ranking.map(
                    (rank, index) =>
                      index < 3 && (
                        <React.Fragment key={index}>
                          <div
                            key={index}
                            className="mt-2 w-full h-14 flex items-center justify-between "
                          >
                            <div className="flex items-center gap-2 min-w-[194px]  ">
                              <img
                                width={300}
                                height={500}
                                src={rank.usuario.foto ?? ""}
                                alt="Perfil do usuário"
                                className="w-12 h-12 rounded-full"
                              />
                              <h2 className="text-[20px] font-bold whitespace-nowrap ">
                                {rank?.usuario?.nomeCompleto ?? ""}
                              </h2>
                            </div>
                            <div className="flex  items-center justify-end ">
                              {/* <h2>@GrandeDudinha</h2> */}
                              <h2 className="text-[20px] font-bold">
                                {rank?.xp ?? ""} XP
                              </h2>
                            </div>
                          </div>
                        </React.Fragment>
                      )
                  )}

                  {/* <div className=" w-full flex justify-end">
                                        <motion.button 
                                        whileHover={{scale: 1.01}}
                                        whileTap={{scale: 0.99}}
                                        onClick={() => setVerMais(true)}
                                        className='bg-[#d9d9d979] w-fit px-3 h-8 rounded-[30px] flex justify-center items-center'>
                                            Veja mais
                                            <ChevronDown/>
                                        </motion.button>
                                    </div> */}
                </div>
              </div>
            </div>
          </div>

          {metricasUser?.melhoresMaterias &&
            metricasUser?.melhoresMaterias.length === 0 && (
              <div className="w-full h-full bg-[#CCB2FF] min-h-[316px] shadow-md rounded-[35px] flex  items-center relative border border-[#00000031] ">
                <div className="ml-10 w-full h-[90%] flex justify-center items-center">
                  <div className=" flex flex-col justify-between min-h-[220px] min-w-[60%] h-full">
                    <h1 className="text-[18px] font-medium  break-words criar_material">
                      Ao criar seu primeiro material, você desbloqueia o
                      acompanhamento do seu progresso, com metas semanais,
                      conquistas e relatórios de desempenho.
                    </h1>
                    <Link
                      href="/home/materiais"
                      className="max-w-[40%] min-w-[40%] h-[25%] min-h-[25%] rounded-full"
                    >
                      <motion.button
                        whileHover={{ scale: 0.99 }}
                        whileTap={{ scale: 1.01 }}
                        className="p-[10px_20px] bg-[#1E2351] rounded-full whitespace-nowrap text-white text-[18px] shadow-md "
                      >
                        Criar material
                      </motion.button>
                    </Link>
                  </div>

                  <div className=" min-w-[40%]  min-h-[250px] h-fit flex overflow-hidden relative">
                    <Image
                      width={300}
                      height={500}
                      src="/metricaMaterial.svg"
                      alt="Decoração"
                      className=" w-[80%] absolute top-1 min-h-[250px] min-w-[300px] "
                    />
                  </div>
                </div>
              </div>
            )}

          {metricasUser?.melhoresMaterias &&
            metricasUser?.melhoresMaterias.length > 0 && (
              <>
                <div className="bg-[#C3A7FA] min-h-[316px] h-[470px] xl:h-full overflow-hidden rounded-[35px] flex justify-center items-center shadow-md border border-[#00000031]">
                  <div className=" flex xl:flex-row flex-col justify-between w-[95%] xl:h-[80%] h-[90%] gap-1">
                    <div className=" xl:max-w-[25%] flex flex-col xl:items-start items-center ">
                      <h1 className="font-medium text-[30px] xl:text-left text-center">
                        Matérias:
                      </h1>
                      <p className="text-[20px] break-words xl:max-w-full xl:w-full xl:text-left max-w-[90%] text-center ">
                        Veja a evolução das suas 5 principais matérias, com
                        atualização semanal para acompanhar seu desempenho. 🚀
                      </p>
                    </div>

                    <div className="flex w-full min-h-[50%] overflowx-auto overflow-y-hidden h-full justify-center xl:justify-normal items-end gap-2 py-2">
                      {metricasUser.melhoresMaterias.map((materia, index) => {
                        // tenta achar o ícone pelo id que vem do backend
                        const match = icons.find(
                          (i) =>
                            i.id.toLowerCase() === materia.icone.toLowerCase()
                        );
                        const IconComponent = match?.Icon;

                        return (
                          <div
                            key={index}
                            className="w-[20%] h-[85%] min-w-[145px] bg-[#FCFCFC] rounded-[25px] shadow-xl flex flex-col items-center border border-[#00000031] relative"
                          >
                            <div className="p-4 bg-[#F1F1F1] rounded-full absolute top-[-40px] flex justify-center items-center ">
                              <div className="flex gap-1 w-fit justify-center items-center">
                                {IconComponent ? (
                                  <IconComponent className="size-7 text-[#757575] stroke-2" />
                                ) : (
                                  // fallback caso não encontre o ícone
                                  <span className="text-xs text-gray-400">
                                    ?
                                  </span>
                                )}
                              </div>
                            </div>
                            <div className=" w-[85%] h-full flex flex-col justify-center ">
                              <div className="flex justify-center items-end text-center w-full h-[50%] overflow-hidden">
                                <h1 className="text-[25px] max-w-full font-medium leading-2 break-words overflow-hidden text-ellipsis line-clamp-2 ">
                                  {materia.nome}
                                </h1>
                              </div>
                              <h1 className="text-[35px] font-medium text-center text-[#866ABF] leading-none h-[50%] ">
                                {materia.xp > 0 ? (
                                  <span>+{materia.xp} XP</span>
                                ) : (
                                  <span>{materia.xp} XP</span>
                                )}
                              </h1>
                            </div>
                          </div>
                        );
                      })}

                      {/* <div className="w-[234px] h-[220px] bg-[#FCFCFC] rounded-[25px] shadow-xl flex flex-col gap-[15px] items-center border border-[#00000031] relative">

                                            <div className="w-[75px] h-[75px] bg-[#F1F1F1] rounded-full absolute top-[-40px] flex justify-center items-center ">
                                                <Earth className="size-[50px] text-[#757575] stroke-1"/>
                                            </div>

                                            <div className=" w-[80%] h-[100%] flex flex-col justify-center ">

                                                <div className="flex justify-center items-end text-center w-[100%] h-[50%]  overflow-hidden">
                                                    <h1 className='text-[33px] max-w-full font-medium leading-9 overflow-hidden text-ellipsis line-clamp-2 '>Geografia</h1>
                                                </div>

                                                <h1 className='text-[50px] font-medium text-center text-[#866ABF] leading-none h-[50%] '>+30XP</h1>

                                            </div>
                                        </div>
                                        
                                        <div className="w-[234px] h-[220px] bg-[#FCFCFC] rounded-[25px] shadow-xl flex flex-col gap-[15px] items-center border border-[#00000031] relative">

                                            <div className="w-[75px] h-[75px] bg-[#F1F1F1] rounded-full absolute top-[-40px] flex justify-center items-center ">
                                                <HeartPulse className="size-[50px] text-[#757575] stroke-1"/>
                                            </div>

                                            <div className=" w-[80%] h-[100%] flex flex-col justify-center ">

                                                <div className="flex justify-center items-end text-center w-[100%] h-[50%]  overflow-hidden">
                                                    <h1 className='text-[33px] max-w-full font-medium leading-9 overflow-hidden text-ellipsis line-clamp-2 '>Enfermagem</h1>
                                                </div>

                                                <h1 className='text-[50px] font-medium text-center text-[#866ABF] leading-none h-[50%] '>+25XP</h1>

                                            </div>
                                        </div>
                                        
                                        <div className="w-[234px] h-[220px] bg-[#FCFCFC] rounded-[25px] shadow-xl flex flex-col gap-[15px] items-center border border-[#00000031] relative">

                                            <div className="w-[75px] h-[75px] bg-[#F1F1F1] rounded-full absolute top-[-40px] flex justify-center items-center ">
                                                <CodeXml className="size-[50px] text-[#757575] stroke-1"/>
                                            </div>

                                            <div className=" w-[80%] h-[100%] flex flex-col justify-center ">

                                                <div className="flex justify-center items-end text-center w-[100%] h-[50%]  overflow-hidden">
                                                    <h1 className='text-[33px] max-w-full font-medium leading-9 overflow-hidden text-ellipsis line-clamp-2 '>Ciência da Computação</h1>
                                                </div>

                                                <h1 className='text-[50px] font-medium text-center text-[#866ABF] leading-none h-[50%] '>+20XP</h1>

                                            </div>
                                        </div>
                                        
                                        <div className="w-[234px] h-[220px] bg-[#FCFCFC] rounded-[25px] shadow-xl flex flex-col gap-[15px] items-center border border-[#00000031] relative">

                                            <div className="w-[75px] h-[75px] bg-[#F1F1F1] rounded-full absolute top-[-40px] flex justify-center items-center ">
                                                <Cable className="size-[50px] text-[#757575] stroke-1"/>
                                            </div>

                                            <div className=" w-[80%] h-[100%] flex flex-col justify-center ">

                                                <div className="flex justify-center items-end text-center w-[100%] h-[50%]  overflow-hidden">
                                                    <h1 className='text-[33px] max-w-full font-medium leading-9 overflow-hidden text-ellipsis line-clamp-2 '>Eng. da Computação</h1>
                                                </div>

                                                <h1 className='text-[50px] font-medium text-center text-[#866ABF] leading-none h-[50%] '>+20XP</h1>

                                            </div>
                                        </div> */}
                    </div>
                  </div>
                </div>
              </>
            )}
        </div>
      </div>
    </>
  );
}
