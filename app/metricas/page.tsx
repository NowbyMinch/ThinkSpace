import { ChevronDown, HeartPulse, CodeXml, Cable, Plus, Minus, Divide, X, Star, Earth } from 'lucide-react';

export default function Metricas() {
    return(
        <>
            <div className="flex w-full justify-center overflow-hidden">
                <div className=" mt-[12px] h-[965px] w-[1580px] grid grid-rows-[65%_1fr] gap-4 ml-[20px] mr-[20px]">
                    <div className=" grid grid-cols-[55%_1fr] gap-4 ">
                        
                        <div className=" bg-white flex justify-center items-center rounded-[35px] shadow-md border border-[#00000031] ">
                            <div className=" w-[90%] h-[90%]">
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
                                    <div className="w-40 h-12 rounded-[40px] bg-[#ffa6f280] border-[#f867a671] border-[2px] flex justify-center items-center text-[20px]">
                                        25-01 JAN  <ChevronDown className='ml-1 '/>
                                    </div>
                                </h1>
                            </div>
                        </div>

                        <div className=" grid grid-rows-[1fr_1fr] gap-4 ">
                            <div className="bg-white rounded-[35px] shadow-md border border-[#00000031] flex justify-center items-center">
                                <div className="w-[90%] h-[90%] flex flex-col ">
                                    <h1 className='text-[35px] font-medium '>Habilidades adquiridas</h1>

                                    <div className="">
                                        <h2 className='text-[20px]'>Raciocínio Lógico</h2>
                                        <div className="flex items-center gap-3">
                                            <div className="w-full h-[7px] rounded-full bg-[rgb(30,35,81,14%)]">
                                                <div className="w-[60%] h-[7px] rounded-full bg-[rgb(30,35,81,75%)]"></div>
                                            </div>
                                            <div className="flex gap-[1px]">
                                                <Star className='fill-[#1E2351]'/>
                                                <Star className='fill-[#1E2351]'/>
                                                <Star className='fill-[#1E2351]'/>
                                                <Star />
                                                <Star />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="">
                                        <h2 className='text-[20px]'>Interpretação de texto</h2>
                                        <div className="flex items-center gap-3">
                                            <div className="w-full h-[7px] rounded-full bg-[rgb(30,35,81,14%)]">
                                                <div className="w-[27%] h-[7px] rounded-full bg-[rgb(30,35,81,75%)]"></div>
                                            </div>
                                            <div className="flex gap-[1px]">
                                                <Star className='fill-[#1E2351]'/>
                                                <Star className='fill-[#1E2351]'/>
                                                <Star />
                                                <Star />
                                                <Star />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="">
                                        <h2 className='text-[20px]'>Planejamento estratégico</h2>
                                        <div className="flex items-center gap-3">
                                            <div className="w-full h-[7px] rounded-full bg-[rgb(30,35,81,14%)]">
                                                <div className="w-[75%] h-[7px] rounded-full bg-[rgb(30,35,81,75%)]"></div>
                                            </div>
                                            <div className="flex gap-[1px]">
                                                <Star className='fill-[#1E2351]'/>
                                                <Star className='fill-[#1E2351]'/>
                                                <Star className='fill-[#1E2351]'/>
                                                <Star className='fill-[#1E2351]'/>
                                                <Star />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="">
                                        <h2 className='text-[20px]'>Design thinking</h2>
                                        <div className="flex items-center gap-3">
                                            <div className="w-full h-[7px] rounded-full bg-[rgb(30,35,81,14%)]">
                                                <div className="w-[35%] h-[7px] rounded-full bg-[rgb(30,35,81,75%)]"></div>
                                            </div>
                                            <div className="flex gap-[1px]">
                                                <Star className='fill-[#1E2351]'/>
                                                <Star className='fill-[#1E2351]'/>
                                                <Star className='fill-[#1E2351]'/>
                                                <Star />
                                                <Star />
                                            </div>
                                        </div>
                                    </div>

                                </div>    

                            </div>

                            <div className="bg-white rounded-[35px] shadow-md flex justify-center items-center border border-[#00000031]">
                                <div className="w-[90%] h-[92%] ">
                                    <h1 className='leading-[50px] font-medium flex justify-between items-end'>Ranking
                                        <div className="flex gap-2">
                                            <div className="w-20 h-8 rounded-[30px] bg-[#D9D9D9] flex justify-center items-center text-[20px] text-black">Geral</div>
                                            <div className="w-40 h-8 rounded-[30px] bg-[#9767f85e] flex justify-center items-center text-[20px] text-black">Sala de estudos</div>
                                        </div>
                                    </h1>
                                    <div className="mt-2 w-full h-14 flex items-center gap-[100px]">
                                        <div className="flex items-center gap-2 min-w-[194px]">
                                            <img src="rank1.svg" alt="" /> 
                                            <h2 className='text-[20px] font-bold'>Grande Dudinha</h2>
                                        </div>
                                        <div className="flex w-full items-center justify-between">
                                            <h2>@GrandeDudinha</h2>
                                            <h2 className='text-[20px] font-bold'>89%</h2>
                                        </div>
                                    </div>
                                    <div className="mt-2 w-full h-14 flex items-center gap-[100px]">
                                        <div className="flex items-center gap-2 min-w-[194px]">
                                            <img src="rank2.svg" alt="" />
                                            <h2 className='text-[20px] font-bold'>CEO</h2>
                                        </div>
                                        <div className="flex w-full items-center justify-between">
                                            <h2>@CEOThinkSpace</h2>
                                            <h2 className='text-[20px] font-bold'>89%</h2>
                                        </div>
                                    </div>
                                    <div className="mt-2 w-full h-14 flex items-center gap-[100px]">
                                        <div className="flex items-center gap-2 min-w-[194px] ">
                                            <img src="rank3.svg" alt="" />
                                            <h2 className='text-[20px] font-bold'>França</h2>
                                        </div>
                                        <div className="flex w-full items-center justify-between">
                                            <h2>@Omaior</h2>
                                            <h2 className='text-[20px] font-bold'>89%</h2>
                                        </div>
                                    </div>

                                    <button className='bg-[#d9d9d979] w-28 h-7 mt-2 rounded-[30px] flex justify-center items-center'>Veja mais
                                        <ChevronDown/>
                                    </button>
                                </div>
                            </div>

                        </div>

                    </div>

                    <div className="bg-[#C3A7FA] rounded-[35px] flex justify-center items-center shadow-md border border-[#00000031]">
                        <div className=" grid grid-cols-[1fr_4fr] gap-4 w-[95%] h-[80%]">
                            <div className=" ">
                                <h1 className='font-medium '>Matérias:</h1>
                                <p className='text-[20px] '>Veja a evolução das suas 5 principais matérias, com atualização semanal para acompanhar seu desempenho. 🚀</p>
                            </div>
                            
                            <div className="grid grid-flow-col gap-5 items-end ">
                                <div className="w-[234px] h-[220px] bg-[#FCFCFC] rounded-[25px] shadow-xl flex flex-col gap-[15px] items-center border border-[#00000031]">

                                    <div className="w-[75px] h-[75px] bg-[#F1F1F1] rounded-full mt-[-40px] flex justify-center items-center">
                                        <div className=" grid grid-cols-2 gap-1 w-fit justify-center items-center">
                                            <Plus className="size-[25px] text-[#757575] "/>
                                            <Minus className="size-[25px] text-[#757575] "/>
                                            <Divide className="size-[25px] text-[#757575] "/>
                                            <X className="size-[25px] text-[#757575] "/>
                                        </div>
                                    </div>

                                    <div className=" w-[80%] h-[65%] grid grid-rows-[1fr_1fr] ">

                                        <div className="flex justify-center items-center text-center w-[100%] overflow-hidden ">
                                            <h1 className='text-[32px] max-w-full font-medium leading-9  overflow-hidden text-ellipsis line-clamp-2'>Matemática</h1>
                                        </div>

                                        <h1 className='text-[35px] font-medium text-center text-[#757575]'>+5%</h1>

                                    </div>
                                </div>
                                
                                <div className="w-[234px] h-[220px] bg-[#FCFCFC] rounded-[25px] shadow-xl flex flex-col gap-[15px] items-center border border-[#00000031]">
                                    <div className="w-[75px] h-[75px] bg-[#F1F1F1] rounded-full mt-[-40px] flex justify-center items-center"> <Earth className='size-[50px] text-[#757575]'/> </div>
                                    <div className=" w-[80%] h-[65%] grid grid-rows-[1fr_1fr] ">

                                        <div className="flex justify-center items-center text-center w-[100%] overflow-hidden ">
                                            <h1 className='text-[32px] max-w-full font-medium leading-9  overflow-hidden text-ellipsis line-clamp-2'>Geografia</h1>
                                        </div>

                                        <h1 className='text-[35px] font-medium text-center text-[#757575]'>-7%</h1>

                                    </div>
                                </div>
                                
                                <div className="w-[234px] h-[220px] bg-[#FCFCFC] rounded-[25px] shadow-xl flex flex-col gap-[15px] items-center border border-[#00000031]">
                                    <div className="w-[75px] h-[75px] bg-[#F1F1F1] rounded-full mt-[-40px] flex justify-center items-center"> <HeartPulse className='size-[50px] text-[#757575]'/></div>
                                    <div className=" w-[80%] h-[65%] grid grid-rows-[1fr_1fr] ">

                                        <div className="flex justify-center items-center text-center w-[100%] overflow-hidden ">
                                            <h1 className='text-[32px] max-w-full font-medium leading-9  overflow-hidden text-ellipsis line-clamp-2'>Enfermagem</h1>
                                        </div>

                                        <h1 className='text-[35px] font-medium text-center text-[#757575]'>+10%</h1>

                                    </div>
                                </div>
                                
                                <div className="w-[234px] h-[220px] bg-[#FCFCFC] rounded-[25px] shadow-xl flex flex-col gap-[15px] items-center border border-[#00000031]">
                                    <div className="w-[75px] h-[75px] bg-[#F1F1F1] rounded-full mt-[-40px] flex justify-center items-center"> <CodeXml className='size-[50px] text-[#757575]'/></div>
                                    <div className=" w-[80%] h-[65%] grid grid-rows-[1fr_1fr] ">

                                        <div className="flex justify-center items-center text-center w-[100%] overflow-hidden">
                                            <h1 className='text-[32px] max-w-full font-medium leading-9  overflow-hidden text-ellipsis line-clamp-2'>Ciência da Computação</h1>
                                        </div>

                                        <h1 className='text-[35px] font-medium text-center text-[#757575]'>+12%</h1>

                                    </div>
                                </div>
                                
                                <div className="w-[234px] h-[220px] bg-[#FCFCFC] rounded-[25px] shadow-xl flex flex-col gap-[15px] items-center border border-[#00000031]">
                                    <div className="w-[75px] h-[75px] bg-[#F1F1F1] rounded-full mt-[-40px] flex justify-center items-center"> <Cable className='size-[50px] 
                                     text-[#757575]'/></div>
                                    <div className=" w-[80%] h-[65%] grid grid-rows-[1fr_1fr] ">

                                        <div className="flex justify-center items-center text-center w-[100%] overflow-hidden ">
                                            <h1 className='text-[32px] max-w-full  font-medium leading-9 overflow-hidden text-ellipsis line-clamp-2'>Engenharia da computação</h1>
                                        </div>

                                        <h1 className='text-[35px] font-medium text-center text-[#757575]'>-9%</h1>

                                    </div>
                                    
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
