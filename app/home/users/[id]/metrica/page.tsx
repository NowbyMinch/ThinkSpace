"use client";

import { ChevronDown, HeartPulse, CodeXml, Cable, Plus, Minus, Divide, X, Earth } from 'lucide-react';
import { Chart } from '@/app/home/components/chart';
import Image from 'next/image';
import { ComboboxDemo, ComboboxDemomMetricas } from '@/app/home/components/dropdown';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Loading from '@/app/home/components/loading';
import { motion, AnimatePresence } from "framer-motion";
import { Backdrop3 } from '@/app/home/components/backdrop';
import { colors, cor, icons } from '@/app/home/materiais/page';


type UserXP = {
    maxXP: number;
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
}
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
type QuestoesPorDia = {
  [data: string]: number;
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

export default function Métricas() {
    
    const [ user, setUser ] = useState<userData>({});
    const [ userXP, setUserXP ] = useState<UserXP>();
    const [ ranking, setRanking ] = useState<Ranking []>([]);
    const [ loading, setLoading ] = useState(true);
    const [ userID, setUserID ] = useState("");
    const [ metricasUser, setMetricasUser ] = useState<MetricasUser>();
    const [ verMais, setVerMais ] = useState(false);
    
    useEffect(() => {
        const user = async () => {
            try{
                setLoading(true);
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/home/identificacao`, {
                method: 'GET',
                credentials: 'include',
                });
                
                const data = await res.json();
                setUser(data);


            } catch (err) {
                console.error(err);
            }
        }; user();
        
        const UserXP = async () => {
            try{
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/materias/perfil`, {
                method: 'GET',
                credentials: 'include',
                });
                
                const data = await res.json();
                setUserXP(data);
                console.log("This is USERXP: ", data);


            } catch (err) {
                console.error(err);
            }
        }; UserXP();
        
        const ranking = async () => {
            try{
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/metricas/ranking`, {
                method: 'GET',
                credentials: 'include',
                });
                
                const data = await res.json();
                console.log("Rank", data);
                setRanking(data);

            } catch (err) {
                console.error(err);
            }
        }; ranking();
        
        const UserID = async () => {
            try{
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/id`, {
                method: 'GET',
                credentials: 'include',
                });
                
                const data = await res.json();
                console.log("UserID: ", data);
                setUserID(data.userId);

            } catch (err) {
                console.error(err);
            }
        }; UserID();
    }, []);

    useEffect(() => {
        if (userID){
            const metricasUser = async () => {
                if (userID){
                    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/metricas/${userID}`, {
                        method: 'GET',
                        credentials: 'include',
                    });
                    
                    const data = await res.json();
                    console.log(data);
                    setMetricasUser(data);
                     setLoading(false);
                }
            }; metricasUser();
        }
    }, [userID])
    
    if (loading) return <Loading />;

    return(
        <>
        <AnimatePresence initial={false}>

            {verMais && (
                <>
                    <motion.div 
                    key="content"
                    initial={{ opacity: 0, scale: 0.85}}
                    animate={{ opacity: 1, scale: 0.94 }}
                    exit={{ opacity: 0, scale: 0.90 }}
                    className={`w-full h-full fixed flex justify-center items-center  opacity-1 z-[1100] `}>
                        
                        <div className="w-full h-full absolute" onClick={() => setVerMais(false)}></div>
                        <motion.div 
                        key="content"
                        initial={{ opacity: 0, scale: 0.85}}
                        animate={{ opacity: 1, scale: 0.94 }}
                        exit={{ opacity: 0, scale: 0.90 }}
                        className={`w-[550px] h-[550px] flex rounded-[40px] z-[1100]  opacity-1 `}>

                            <div id="white-box" className={` w-full h-full rounded-[40px] bg-white shadow-md flex justify-center items-center relative overflow-hidden z-[1100] left-[50%] translate-x-[-50%] top-[50%] translate-y-[-50%]`}>
                                
                                <Image width={300} height={500} src="/Vector.svg" alt="Decoração" className="absolute top-0 left-[-180px] rotate-90 w-[550px]"/>
                                <Image width={300} height={500} src="/Vector.svg" alt="Decoração" className="absolute bottom-[-40px] right-[-170px] -rotate-90 w-[550px]"/>

                                <div className="w-[80%] h-[85%] flex flex-col items-center gap-2 z-[900] ">
                                    <div className="flex flex-col justify-center items-center">
                                        <img src={`${user.foto}`} alt="Foto de perfil" className="rounded-full w-20 h-20"/>
                                        <span className="font-medium text-[30px]">{user.primeiroNome} </span>
                                        <span className="text-[20px]"></span>
                                    </div>

                                    <h1 className="text-center text-[20px] font-medium">Você deseja mesmo deletar essa matéria?</h1>
                                    <div className="w-[60%] flex justify-between mt-auto">
                                        <motion.button 
                                        whileHover={{ scale: 1.03 }}
                                        whileTap={{ scale: 0.97 }}
                                        onClick={() => setVerMais(false)}
                                        className="p-[10px_12px] rounded-[20px] text-[18px] bg-[#F1F1F1] border border-[rgba(68,68,68, 0.17)]">
                                            Voltar
                                        </motion.button>
                                        <motion.button 
                                        whileHover={{ scale: 1.03 }}
                                        whileTap={{ scale: 0.97 }}
                                        onClick={() => {setVerMais(false); }}
                                        className="p-[10px_12px] rounded-[20px] text-[18px] text-white bg-[#9767F8] border border-[rgba(68,68,68, 0.17)]">
                                            Deletar
                                        </motion.button>
                                    </div>

                                </div>
                            </div>
                        </motion.div>
                        
                    </motion.div>
                        
                    <div className="w-full absolute flex justify-center items-center ">
                        <Backdrop3 onClick={() => setVerMais(false)}/>
                    </div>
                </>
            )}

        </AnimatePresence>




            <div className="flex w-full justify-center overflow-hidden " >
                <div className=" mt-[12px] h-[965px] w-[1580px] grid grid-rows-[65%_1fr] gap-4 ml-[20px] mr-[20px]">
                    <div className=" grid grid-cols-[55%_1fr] gap-4 ">
                        
                        <div className=" bg-white flex justify-center items-center rounded-[35px] shadow-md border border-[#00000031] ">
                            <div className=" w-[90%] h-[90%] ">
                                <h1 className="text-[30px] font-medium leading-none">Métricas</h1>
                                <h2 className="text-[18px] leading-[28px] ">Seu desempenho da semana está aqui! 💡</h2>

                                <div className="w-full grid grid-cols-[1fr_1fr_1fr] mt-5 ">
                                    <div className="">
                                        <div className="w-[80%] ">
                                            <h2 className="text-[20px] leading-[25px]">Rendimento semanal</h2>
                                            <div className="w-full h-[2px] mt-2 bg-[rgba(0,0,0,0.23)]"></div>
                                            <h1 className="text-[50px] leading-[60px] font-medium text-[#866ABF]">{metricasUser?.rendimentoSemanal}%</h1>
                                        </div>
                                    </div>

                                    <div className=" flex justify-center ">
                                        <div className="w-[80%] ">
                                            <h2 className="text-[20px] leading-[25px] flex justify-between items-center">Acertos
                                                <div className="bg-[#FF9F93] w-[25px] h-[25px] rounded-full flex justify-center items-center text-[18px] text-white ">{metricasUser?.acertos}</div>
                                            </h2>
                                            <div className="w-full h-[2px] mt-2 bg-[rgba(0,0,0,0.23)]"></div>
                                            <h1 className="text-[50px] leading-[60px] font-medium text-[#866ABF]">{metricasUser?.percentualAcertos}%</h1>
                                        </div>
                                    </div>

                                    <div className=" flex justify-end">
                                        <div className="w-[80%] ">
                                            <h2 className="text-[20px] leading-[25px] flex justify-between items-center">Erros
                                                <div className="bg-[#9767F8] w-[25px] h-[25px] rounded-full flex justify-center items-center text-[18px] text-white ">{metricasUser?.erros}</div>
                                            </h2>
                                            <div className="w-full h-[2px] mt-2 bg-[rgba(0,0,0,0.23)]"></div>
                                            <h1 className="text-[50px] leading-[60px] font-medium text-[#866ABF]">{metricasUser?.percentualErros}%</h1>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-2 flex flex-col justify-between gap-1bg-red-500 ">
                                    <h1 className="w-full font-medium flex items-end justify-between cursor-pointer text-[30px]">
                                        Atividades
                                        <ComboboxDemo />
                                    </h1>

                                    <Chart />
                                </div>

                            </div>
                        </div>

                        <div className=" grid grid-rows-[1fr_1fr] gap-4 ">
                            <div className="bg-white rounded-[35px] shadow-md border border-[#00000031] flex justify-center items-center">
                                <div className="w-[90%] h-[80%] flex flex-col justify-between ">

                                    <div className="flex items-center gap-5 relative">
                                        
                                        
                                        <img src={user.foto} className="h-[163px] w-fit rounded-full cursor-pointer z-10" alt="Profile picture" />
                                        <div className="absolute w-[165.3px] h-[163px] bg-[#EB9481] rounded-full left-[-5px]"></div>
                                        <div className="">
                                            <h1 className="text-[40px] font-medium leading-none ">{user.primeiroNome}</h1>
                                            <h2 className="text-[#828181] font-medium text-[30px] leading-none">{user.cargo}</h2>
                                        </div>    
                                    </div>

                                    <div className="flex flex-col  justify-c    enter items-center">
                                        <h2 className="font-medium text-[22px] text-[#828181] w-full flex justify-end" >{} XP</h2>
                                        <div className="w-full h-[12px] rounded-[25px] bg-[#1e235138]">
        








                                            <div style={{ width: `${ranking[2]?.progresso ?? 0}%` }} className={` h-[12px] rounded-[25px] bg-purple-600 `}>
                                            </div>
                                        </div>
                                        
                                        <div className="flex justify-between w-full">
                                            <h2 className="font-medium text-[20px] text-[#828181]">{userXP?.xp} XP</h2>
                                            {/* <h2 className="font-medium text-[20px] text-[#A39CEC]">1000xp</h2> */}

                                        </div>
                                    </div>
                                </div>    

                            </div>

                            <div className="bg-white rounded-[35px] shadow-md flex justify-center items-center border border-[#00000031]">
                                <div className="w-[90%] h-[92%] flex flex-col justify-between ">
                                    <h1 className='leading-none font-medium flex justify-between items-end text-[30px]'>Ranking
                                        <div className="flex gap-2">
                                            {/* <div className="w-fit px-3 h-8 rounded-[30px] bg-[#D9D9D9] flex justify-center items-center text-[18px] text-black cursor-pointer">Geral</div> */}
                                            <ComboboxDemomMetricas />
                                            {/* <div className="w-fit px-3 h-8 rounded-[30px] bg-[#9767f85e] flex justify-center items-center text-[18px] text-black cursor-pointer">
                                                Sala de estudos
                                                <ChevronDown/>
                                            </div> */}
                                        </div>
                                    </h1>
                                    {(() =>{
                                        if (ranking) {
                                            return (
                                                <>
                                                    <div className="mt-2 w-full  h-14 flex items-center justify-between">
                                                        <div className="flex items-center gap-2 min-w-[194px]  ">
                                                            <Image width={300} height={500} src={ranking[0]?.usuario.foto ?? null} alt="Perfil do usuário" className='w-12 h-12 rounded-full'/> 
                                                            <h2 className='text-[20px] font-bold whitespace-nowrap '>{ ranking[0]?.usuario?.nomeCompleto ?? "" }</h2>
                                                        </div>
                                                        <div className="flex  items-center justify-end ">
                                                            {/* <h2>@GrandeDudinha</h2> */}
                                                            <h2 className='text-[20px] font-bold'>{ ranking[0]?.xp ?? "" } XP</h2>
                                                        </div>
                                                    </div>
                                                    <div className="mt-2 w-full  h-14 flex items-center justify-between">
                                                        <div className="flex items-center gap-2 min-w-[194px]  ">
                                                            <Image width={300} height={500} src={ranking[1]?.usuario.foto ?? null} alt="Perfil do usuário" className='w-12 h-12 rounded-full'/> 
                                                            <h2 className='text-[20px] font-bold whitespace-nowrap '>{ ranking[1]?.usuario?.nomeCompleto ?? "" }</h2>
                                                        </div>
                                                        <div className="flex  items-center justify-end ">
                                                            {/* <h2>@GrandeDudinha</h2> */}
                                                            <h2 className='text-[20px] font-bold'>{ ranking[1]?.xp ?? "" } XP</h2>
                                                        </div>
                                                    </div>
                                                    <div className="mt-2 w-full  h-14 flex items-center justify-between">
                                                        <div className="flex items-center gap-2 min-w-[194px]  ">
                                                            <Image width={300} height={500} src={ranking[2]?.usuario.foto ?? null} alt="Perfil do usuário" className='w-12 h-12 rounded-full'/> 
                                                            <h2 className='text-[20px] font-bold whitespace-nowrap '>{ ranking[2]?.usuario?.nomeCompleto ?? "" }</h2>
                                                        </div>
                                                        <div className="flex  items-center justify-end ">
                                                            {/* <h2>@GrandeDudinha</h2> */}
                                                            <h2 className='text-[20px] font-bold'>{ ranking[2]?.xp ?? "" } XP</h2>
                                                        </div>
                                                    </div>
                                                </>
                                            )
                                        }
                                    })()}
                                    

                                    <div className=" w-full flex justify-end">
                                        <motion.button 
                                        whileHover={{scale: 1.01}}
                                        whileTap={{scale: 0.99}}
                                        onClick={() => setVerMais(true)}
                                        className='bg-[#d9d9d979] w-fit px-3 h-8 rounded-[30px] flex justify-center items-center'>
                                            Veja mais
                                            <ChevronDown/>
                                        </motion.button>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>

                    { metricasUser?.melhoresMaterias && metricasUser?.melhoresMaterias.length === 0 && (

                        <div className="w-full h-full bg-[#CCB2FF] shadow-md rounded-[35px] flex  items-center relative border border-[#00000031] ">
                            <div className="ml-10 w-full h-[90%] flex justify-center items-center">
                                <div className=" flex flex-col justify-center gap-[25%] min-w-[60%] h-full ">
                                    <h1 className="text-[32px] font-medium line-clamp-3 break-words">
                                        Ao criar seu primeiro material, você desbloqueia o acompanhamento do seu progresso, com metas semanais, conquistas e relatórios de desempenho.
                                    </h1>
                                    <Link href='/home/materiais' className="w-[40%] min-w-[40%] h-[25%] min-h-[25%] rounded-full">
                                        <button className="w-full h-full bg-[#1E2351] rounded-full text-white text-[22px] shadow-md leading-5">
                                        Criar material
                                        </button>
                                    </Link>
                                </div>

                                <div className=" w-full h-full flex justify-center items-center overflow-hidden relative">
                                    <Image width={300} height={500}
                                        src="/metricaMaterial.svg"
                                        alt="Decoração"
                                        className=" w-[94%] absolute top-0"
                                    />
                                </div>
                            </div>
                            
                        </div>
                    )}  
                    
                    { metricasUser?.melhoresMaterias && metricasUser?.melhoresMaterias.length > 0 && (
                        <>
                            <div className="bg-[#C3A7FA] rounded-[35px] flex justify-center items-center shadow-md border border-[#00000031]">
                                <div className=" grid grid-cols-[1fr_4fr] gap-4 w-[95%] h-[80%]">
                                    <div className=" ">
                                        <h1 className='font-medium '>Matérias:</h1>
                                        <p className='text-[20px] '>Veja a evolução das suas 5 principais matérias, com atualização semanal para acompanhar seu desempenho. 🚀</p>
                                    </div>
                                    
                                    <div className="grid grid-flow-col gap-5 items-end ">
                                        <div className="w-[234px] h-[220px] bg-[#FCFCFC] rounded-[25px] shadow-xl flex flex-col gap-[15px] items-center border border-[#00000031] relative">

                                            <div className="w-[75px] h-[75px] bg-[#F1F1F1] rounded-full absolute top-[-40px] flex justify-center items-center ">
                                                <div className=" grid grid-cols-2 gap-1 w-fit justify-center items-center">
                                                    <Plus className="size-[25px] text-[#757575] stroke-2"/>
                                                    <Minus className="size-[25px] text-[#757575] "/>
                                                    <Divide className="size-[25px] text-[#757575] "/>
                                                    <X className="size-[25px] text-[#757575] "/>
                                                </div>
                                            </div>

                                            <div className=" w-[80%] h-[100%] flex flex-col justify-center ">

                                                <div className="flex justify-center items-end text-center w-[100%] h-[50%]  overflow-hidden">
                                                    <h1 className='text-[33px] max-w-full font-medium leading-9 overflow-hidden text-ellipsis line-clamp-2 '>Matemática</h1>
                                                </div>

                                                <h1 className='text-[50px] font-medium text-center text-[#866ABF] leading-none h-[50%] '>+35XP</h1>

                                            </div>
                                        </div>



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
