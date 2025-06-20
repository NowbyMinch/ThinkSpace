"use client";

import { ChevronDown, HeartPulse, CodeXml, Cable, Plus, Minus, Divide, X, Earth } from 'lucide-react';
import { Chart } from '@/app/home/components/chart';
import Image from 'next/image';
import { ComboboxDemo } from '@/app/home/components/dropdown';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Métricas() {

    type userData = {
        primeiroNome?: string;
        cargo?: string;
        foto?: string;
        // add other properties if needed
    };
    
    const [ user, setUser ] = useState<userData>({});

      useEffect(() => {

        const user = async () => {
          try{
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/home/identificacao`, {
              method: 'GET',
              credentials: 'include',
            });
            
            const data = await res.json();
            setUser(data)
            
          } catch (err) {
            console.error(err);
          }
        }; user();
     
      }, []);

    
    return(
        <>
            <div className="flex w-full justify-center overflow-hidden " >
                <div className=" mt-[12px] h-[965px] w-[1580px] grid grid-rows-[65%_1fr] gap-4 ml-[20px] mr-[20px]">
                    <div className=" grid grid-cols-[55%_1fr] gap-4 ">
                        
                        <div className=" bg-white flex justify-center items-center rounded-[35px] shadow-md border border-[#00000031] ">
                            <div className=" w-[90%] h-[90%] ">
                                <h1 className="text-[58px] font-medium leading-[60px]">Métricas</h1>
                                <h2 className="text-[22px] leading-[28px] ">Seu desempenho da semana está aqui! 💡</h2>

                                <div className="w-full grid grid-cols-[1fr_1fr_1fr] mt-5 ">
                                    <div className="">
                                        <div className="w-[80%] ">
                                            <h2 className="text-[24px] leading-[25px]">Rendimento semanal</h2>
                                            <div className="w-full h-[2px] mt-2 bg-[rgba(0,0,0,0.23)]"></div>
                                            <h1 className="text-[50px] leading-[60px] font-medium text-[#866ABF]">67%</h1>
                                        </div>
                                    </div>

                                    <div className=" flex justify-center ">
                                        <div className="w-[80%] ">
                                            <h2 className="text-[24px] leading-[25px] flex justify-between items-center">Acertos
                                                <div className="bg-[#FF9F93] w-[25px] h-[25px] rounded-full flex justify-center items-center text-[18px] text-white ">2</div>
                                            </h2>
                                            <div className="w-full h-[2px] mt-2 bg-[rgba(0,0,0,0.23)]"></div>
                                            <h1 className="text-[50px] leading-[60px] font-medium text-[#866ABF]">50%</h1>
                                        </div>
                                    </div>

                                    <div className=" flex justify-end">
                                        <div className="w-[80%] ">
                                            <h2 className="text-[24px] leading-[25px] flex justify-between items-center">Erros
                                                <div className="bg-[#9767F8] w-[25px] h-[25px] rounded-full flex justify-center items-center text-[18px] text-white ">2</div>
                                            </h2>
                                            <div className="w-full h-[2px] mt-2 bg-[rgba(0,0,0,0.23)]"></div>
                                            <h1 className="text-[50px] leading-[60px] font-medium text-[#866ABF]">50%</h1>
                                        </div>
                                    </div>
                                </div>

                                <h1 className="mt-2 font-medium flex items-end justify-between cursor-pointer">Atividades
                                    <ComboboxDemo />
                                </h1>
                                <Chart />

                            </div>
                        </div>

                        <div className=" grid grid-rows-[1fr_1fr] gap-4 ">
                            <div className="bg-white rounded-[35px] shadow-md border border-[#00000031] flex justify-center items-center">
                                <div className="w-[90%] h-[90%] flex flex-col gap-4">

                                    <div className="flex items-center gap-5 relative">
                                        <img src={`${user.foto}`} className="h-[163px] w-fit rounded-full cursor-pointer z-10" alt="Profile picture" />
                                        <div className="absolute w-[165.3px] h-[163px] bg-[#EB9481] rounded-full left-[-5px]"></div>
                                        <div className="">
                                            <h1 className="text-[40px] font-medium leading-none ">{user.primeiroNome}</h1>
                                            <h2 className="text-[#828181] font-medium text-[30px] leading-none">{user.cargo}</h2>
                                        </div>    
                                    </div>

                                    <div className="">
                                        <h2 className="font-medium text-[22px] text-[#828181]">XP</h2>
                                        <div className="w-full h-[12px] rounded-[25px] bg-[#1e235138]">
                                            <div className="w-[45%] h-[12px] rounded-[25px] bg-purple-600 "></div>
                                        </div>
                                        
                                        <div className="flex justify-between w-[full]">
                                            <h2 className="font-medium text-[20px] text-[#828181]">450px</h2>
                                            <h2 className="font-medium text-[20px] text-[#A39CEC]">1000xp</h2>
                                        </div>
                                    </div>
                                </div>    

                            </div>

                            <div className="bg-white rounded-[35px] shadow-md flex justify-center items-center border border-[#00000031]">
                                <div className="w-[90%] h-[92%] ">
                                    <h1 className='leading-[50px] font-medium flex justify-between items-end'>Ranking
                                        <div className="flex gap-2">
                                            <div className="w-fit px-3 h-8 rounded-[30px] bg-[#D9D9D9] flex justify-center items-center text-[18px] text-black cursor-pointer">Geral</div>
                                            {/* <div className="w-fit px-3 h-8 rounded-[30px] bg-[#9767f85e] flex justify-center items-center text-[18px] text-black cursor-pointer">
                                                Sala de estudos
                                                <ChevronDown/>
                                            </div> */}
                                        </div>
                                    </h1>
                                    <div className="mt-2 w-full h-14 flex items-center gap-[100px]">
                                        <div className="flex items-center gap-2 min-w-[194px]">
                                            <Image width={300} height={500} src="/rank1.svg" alt="Perfil do usuário" className='w-12 h-12'/> 
                                            <h2 className='text-[20px] font-bold'>Grande Dudinha</h2>
                                        </div>
                                        <div className="flex w-full items-center justify-between">
                                            <h2>@GrandeDudinha</h2>
                                            <h2 className='text-[20px] font-bold'>89%</h2>
                                        </div>
                                    </div>
                                    <div className="mt-2 w-full h-14 flex items-center gap-[100px]">
                                        <div className="flex items-center gap-2 min-w-[194px]">
                                            <Image width={300} height={500} src="/rank2.svg" alt="Perfil do usuário" className='w-12 h-12'/>
                                            <h2 className='text-[20px] font-bold'>CEO</h2>
                                        </div>
                                        <div className="flex w-full items-center justify-between">
                                            <h2>@CEOThinkSpace</h2>
                                            <h2 className='text-[20px] font-bold'>89%</h2>
                                        </div>
                                    </div>
                                    <div className="mt-2 w-full h-14 flex items-center gap-[100px]">
                                        <div className="flex items-center gap-2 min-w-[194px] ">
                                            <Image width={300} height={500} src="/rank3.svg" alt="Perfil do usuário" className='w-12 h-12'/>
                                            <h2 className='text-[20px] font-bold'>França</h2>
                                        </div>
                                        <div className="flex w-full items-center justify-between">
                                            <h2>@Omaior</h2>
                                            <h2 className='text-[20px] font-bold'>89%</h2>
                                        </div>
                                    </div>
                                    <div className=" w-full flex justify-end">
                                        <button className='bg-[#d9d9d979] w-fit px-3 h-8 rounded-[30px] flex justify-center items-center'>
                                            Veja mais
                                            <ChevronDown/>
                                        </button>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>

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

                    {/* MODELO CASO HAJA MATERIAS  */}
                    
                    {/* <div className="bg-[#C3A7FA] rounded-[35px] flex justify-center items-center shadow-md border border-[#00000031]">
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

                                <div className="w-[234px] h-[220px] bg-[#FCFCFC] rounded-[25px] shadow-xl flex flex-col gap-[15px] items-center border border-[#00000031] relative">

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
                                </div>

                            </div>

                        </div>
                    </div> */}
                </div>
            </div>
        </>
    );
}
