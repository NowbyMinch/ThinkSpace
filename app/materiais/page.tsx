import {  CirclePlus, Heart, Globe, Monitor, CodeXml, HeartPulse, Minus, Divide, X, Plus, Search  } from "lucide-react";
import {  useEffect, useState  } from 'react';

// blue_text = 1E2351;



export default function() {
    return( 
        <>
        <div className="grid grid-cols-[3fr_1fr] mt-[12px] h-[calc(100vh-25px)] min-h-fit w-full ml-[20px] mr-[20px] gap-[20px] ">
            
            <div className="bg-white rounded-[35px] h-[100%] overflow-hidden flex flex-col items-center shadow-md border border-[#00000031] ">
                
                <div className="w-[1200px] mt-4 ">
                    <div className="">
                        <h1 className="text-[#1E2351] font-medium text-[50px] "> Olá, Maria </h1>
                        <h1 className="font-medium text-[30px] text-[#A19797] "> Qual matéria será revisada hoje? </h1>
                    </div>

                    <div className="mt-[25px] ml-[30px] overflow-hidden flex flex-col items-center ">

                        <div className="w-full h-[82px] mt-16 flex justify-center relative" >
                            
                            <div className="w-[980px] rounded-[20px] mt-4 mr-11 h-[50px] bg-[#D9D9D9] absolute "></div>

                            <div className="relative mr-[30px] ">
                                <input type="text" id="search_bar" placeholder="Pesquise a matéria" className="w-[1000px] text-[25px] pl-5 h-[55px] border-2 border-[rgba(0,0,0,0.19)] shadow-md rounded-[25px] outline-[#9767F8]" />
                                <Search className="absolute right-[20px] text-black opacity-[36%] cursor-pointer top-[12px] size-[30px] "/>
                            </div>
                        </div>
                        
                    </div>

                </div>

                <div className="flex justify-center overflow-y-auto pr-1 mt-5 ">
                    <div className="w-[1100px] grid grid-cols-[1fr_1fr] gap-[20px] h-fit pb-6">

                        <div className="bg-[#D8D8D8] border-[3px] border-[rgb(0,0,0,22%)] h-[280px] rounded-[28px] cursor-pointer flex justify-center items-center flex-col ">
                            <CirclePlus className="text-[rgb(165,165,165)] size-[70px]"/>
                            <h2 className="text-[35px] text-[rgb(48,38,42,87%)] font-medium">Criar um material</h2>
                        </div>

                        <div className="bg-[#CAC5FF] h-[280px] rounded-[28px] cursor-pointer flex justify-center items-center flex-row gap-5 shadow-md border border-[#00000031]">
                                
                            <div className="max-w-[80%] h-[50%] overflow-hidden">
                                <h2 className="text-[35px] leading-[40px] text-[rgb(48,38,42,87%)] font-medium w-fit ">Geografia</h2>
                                <h2 className="text-[22px] text-[#7A74B9] font-medium w-fit ">Materiais de estudo: 24</h2>
                                <h2 className="text-[22px] text-[#7A74B9] font-medium w-fit ">Tempo ativo: 40 horas</h2>
                                <h2 className="text-[22px] text-[#7A74B9] font-medium w-fit ">Última revisão: 15/01</h2>
                            </div>

                            <Globe className="size-[110px] opacity-[22%] stroke-1"/>

                        </div>

                        <div className="bg-[#8B81F3] h-[280px] rounded-[28px] cursor-pointer flex justify-center items-center flex-row gap-5 shadow-md border border-[#00000031]">
                                
                            <div className="max-w-[80%] h-[78%] overflow-hidden">
                                <h2 className="text-[35px] w-min leading-[40px] text-[rgb(48,38,42,87%)] font-medium ">Rede de Computadores</h2>
                                <h2 className="text-[22px] text-[#454178] opacity-[70%] font-medium w-fit ">Materiais de estudo: 24</h2>
                                <h2 className="text-[22px] text-[#454178] opacity-[70%] font-medium w-fit ">Tempo ativo: 40 horas</h2>
                                <h2 className="text-[22px] text-[#454178] opacity-[70%] font-medium w-fit ">Última revisão: 15/01</h2>
                            </div>

                            <Monitor className="size-[110px] opacity-[22%] stroke-1"/>

                        </div>

                        <div className="bg-[#FFA6F1] h-[280px] rounded-[28px] cursor-pointer flex justify-center items-center flex-row gap-5 shadow-md border border-[#00000031]">
                                
                            <div className="max-w-[80%] h-[78%] overflow-hidden">
                                <h2 className="text-[35px] w-min leading-[40px] text-[rgb(48,38,42,87%)] font-medium ">Ciência da computação</h2>
                                <h2 className="text-[22px] text-[#81244C] opacity-[61%] font-medium w-fit ">Materiais de estudo: 24</h2>
                                <h2 className="text-[22px] text-[#81244C] opacity-[61%] font-medium w-fit ">Tempo ativo: 40 horas</h2>
                                <h2 className="text-[22px] text-[#81244C] opacity-[61%] font-medium w-fit ">Última revisão: 15/01</h2>
                            </div>

                            <CodeXml className="size-[110px] opacity-[22%] stroke-1"/>

                        </div>

                        <div className="bg-[#FF9F93] h-[280px] rounded-[28px] cursor-pointer flex justify-center items-center flex-row gap-5 shadow-md border border-[#00000031]">
                                
                            <div className="max-w-[80%] h-[50%] overflow-hidden">
                                <h2 className="text-[35px] w-min leading-[40px] text-[rgb(48,38,42,87%)] font-medium ">Enfermagem</h2>
                                <h2 className="text-[22px] text-[#844F48] opacity-[70%] font-medium w-fit ">Materiais de estudo: 24</h2>
                                <h2 className="text-[22px] text-[#844F48] opacity-[70%] font-medium w-fit ">Tempo ativo: 40 horas</h2>
                                <h2 className="text-[22px] text-[#844F48] opacity-[70%] font-medium w-fit ">Última revisão: 15/01</h2>
                            </div>

                            <HeartPulse className="size-[110px] opacity-[22%] stroke-1"/>

                        </div>
                        
                        <div className="bg-[#FFE89B] h-[280px] rounded-[28px] cursor-pointer flex justify-center items-center flex-row gap-5 shadow-md border border-[#00000031]">
                                
                            <div className="max-w-[80%] h-[50%] overflow-hidden">
                                <h2 className="text-[35px] w-min leading-[40px] text-[rgb(4,38,42,87%)] font-medium ">Matemática</h2>
                                <h2 className="text-[22px] text-black opacity-[36%] font-medium w-fit ">Materiais de estudo: 24</h2>
                                <h2 className="text-[22px] text-black opacity-[36%] font-medium w-fit ">Tempo ativo: 40 horas</h2>
                                <h2 className="text-[22px] text-black opacity-[36%] font-medium w-fit ">Última revisão: 15/01</h2>
                            </div>

                            <div className=" grid grid-cols-2 gap-3">
                                <Plus className="size-[50px] opacity-[36%] stroke-1"/>
                                <Minus className="size-[50px] opacity-[36%] stroke-1"/>
                                <Divide className="size-[50px] opacity-[36%] stroke-1"/>
                                <X className="size-[50px] opacity-[36%] stroke-1"/>

                            </div>

                        </div>
                        
                    </div>
                </div>

            </div>

            <div className="bg-white rounded-[35px] flex justify-center shadow-md border border-[#00000031] ">
                
                <div className="w-[100%] ">
                    <div className="w-full ml-[10px] ">

                        <div className="grid grid-cols-[100px_1fr] ml-[15px] mt-[30px] gap-[15px] ">
                            
                            <img src="Profile.png" className="h-[100px] rounded-full cursor-pointer" alt="Profile picture" />

                            <div className="">
                                <h1 className="text-[30px] font-medium ">Maria Eduarda</h1>
                                <h2 className="text-[#828181] font-medium text-[25px]">Estudante</h2>
                                <div className="w-[220px] h-2 rounded-[25px] bg-[#1e235138]">
                                    <div className="w-[15%] h-2 rounded-[25px] bg-purple-600 "></div>
                                </div>
                                <div className="flex justify-between w-[220px]">
                                    <h2 className="font-medium text-[18px] text-[#828181]">Iniciante</h2>
                                    <h2 className="font-medium text-[18px] text-[#828181]">150xp</h2>
                                </div>
                            </div>

                        </div>
                        
                        <div className="ml-[15px] mt-[30px]">
                            <h1 className="text-[34px] w-fit font-medium leading-6">Materiais de Estudo</h1>
                            <h1 className="text-[26px] italic w-fit font-medium text-[#9767F8] ">Ciência da computação</h1>
                        </div>

                        <div className="grid grid-cols-[100px_1fr] ml-[15px] mt-[20px] gap-[15px]">

                            <h1 className="text-[90px] font-bold text-[#A78CDC] leading-[90px]">01</h1>

                            <div className="mt-[18px]">
                                <h2 className="text-[35px] font-medium leading-[30px]">POO I</h2>
                                <h2 className="text-[20px] text-[#828181]">Tempo de estudo: 45 minutos</h2>
                            </div>

                        </div>

                        <div className="grid grid-cols-[100px_1fr] ml-[15px] mt-[20px] gap-[15px]">

                            <h1 className="text-[90px] font-bold text-[#A78CDC] leading-[90px]">02</h1>

                            <div className="mt-[18px]">
                                <h2 className="text-[35px] font-medium leading-[30px]">POO II</h2>
                                <h2 className="text-[20px] text-[#828181]">Tempo de estudo: 1 hora</h2>
                            </div>

                        </div>

                        <div className="grid grid-cols-[100px_1fr] ml-[15px] mt-[20px] gap-[15px]">

                            <h1 className="text-[90px] font-bold text-[#A78CDC] leading-[90px]">03</h1>

                            <div className="mt-[18px]">
                                <h2 className="text-[35px] font-medium leading-[30px]">Eng. Comp</h2>
                                <h2 className="text-[20px] text-[#828181]">Tempo de estudo: 20 minutos</h2>
                            </div>

                        </div>

                        <div className="grid grid-cols-[100px_1fr] ml-[15px] mt-[20px] gap-[15px]">

                            <h1 className="text-[90px] font-bold text-[#A78CDC] leading-[90px]">04</h1>

                            <div className="mt-[18px]">
                                <h2 className="text-[35px] font-medium leading-[30px]">Eng. Comp II</h2>
                                <h2 className="text-[20px] text-[#828181]">Tempo de estudo: 3 horas</h2>
                            </div>

                        </div>

                        <div className="w-full h-full flex mt-[20px] mb-[20px] ">
                            <div className=" w-[380px] h-[250px] border border-black rounded-[26px] overflow-hidden ml-4">

                                <div className="m-3 flex flex-col ">
                                    <p className="text-[21px] leading-8 mb-[5px]">Você já viu todos os resumos disponíveis!🎉</p>

                                    <p className="text-[21px] leading-8">Que tal enriquecer ainda mais seu aprendizado? Adicione novos materiais e fortaleça seu conhecimento.</p>
                                    
                                    <div className=" flex justify-center">
                                        <button className="flex justify-center gap-1 items-center border border-black rounded-[50px] w-[310px] full pt-[5px] pb-[5px] mt-[14px] bg-[#9B79E0] text-white text-[20px]" > <Plus className=""/> Adicionar novo material</button>

                                    </div>
                                </div>

                            </div>

                        </div>

                    </div>
                </div>

            </div>

            
        </div>

        </>
    );
};
