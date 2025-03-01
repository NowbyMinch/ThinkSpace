import {  CirclePlus, Heart  } from "lucide-react";
import {  Globe  } from "lucide-react";
import {  Monitor  } from "lucide-react";
import {  CodeXml  } from "lucide-react";
import {  HeartPulse  } from "lucide-react";
import {  Minus  } from "lucide-react";
import {  Divide  } from "lucide-react";
import {  X  } from "lucide-react";
import {  Plus  } from "lucide-react";
import {  Search  } from "lucide-react";
import {  useEffect, useState  } from 'react';

// blue_text = 1E2351;



export default function() {
    return( 
        <>

        <div className="grid grid-cols-[1fr_415px] mt-[12px] h-[calc(100vh-24px)] w-full ml-[20px] mr-[20px] gap-[20px] overflow-hidden">
            
            <div className="bg-white border rounded-[40px] h-[100%] overflow-y-auto">
                
                <div className="mt-[25px] ml-[30px] overflow-hidden">

                    <h1 className="text-[#1E2351] font-medium text-[50px] ">Olá, Maria</h1>
                    <h1 className="font-medium text-[30px] text-[#A19797] ">Qual matéria será revisada hoje? </h1>
                    <div className="w-full h-[82px] mt-12 flex justify-center relative" >
                        <input type="text" id="search_bar" className="w-[85%] z-10 text-[25px] pl-5 h-[55px] border-2 border-[rgba(0,0,0,0.19)]  rounded-[25px] outline-[#9767F8]" />
                        <Search className="absolute right-[116px] text-black opacity-[36%] cursor-pointer top-[12px] size-[30px] z-20"/>
                        <div className="w-[83%] rounded-[20px] mt-5 mr-6 h-[50px] bg-[#D9D9D9] absolute"></div>
                    </div>
                </div>
                
                <div className="flex justify-center w-full mt-12">

                    <div className="w-[1190px] grid grid-cols-[1fr_1fr_1fr] gap-[20px] ">

                        <div className="bg-[#D8D8D8] border-[3px] border-[rgb(0,0,0,22%)] h-[280px] rounded-[28px] cursor-pointer flex justify-center items-center flex-col">
                            <CirclePlus className="text-[rgb(165,165,165)] size-[70px]"/>
                            <h2 className="text-[35px] text-[rgb(48,38,42,87%)] font-medium">Criar um material</h2>
                        </div>

                        <div className="bg-[#CAC5FF] h-[280px] rounded-[28px] cursor-pointer flex justify-center items-center flex-row gap-5">
                                
                            <div className="max-w-[80%] h-[50%] overflow-hidden">
                                <h2 className="text-[35px] leading-[40px] text-[rgb(48,38,42,87%)] font-medium w-fit ">Geografia</h2>
                                <h2 className="text-[22px] text-[#7A74B9] font-medium w-fit ">Materiais de estudo: 24</h2>
                                <h2 className="text-[22px] text-[#7A74B9] font-medium w-fit ">Tempo ativo: 40 horas</h2>
                                <h2 className="text-[22px] text-[#7A74B9] font-medium w-fit ">Última revisão: 15/01</h2>
                            </div>

                            <Globe className="size-[110px] opacity-[22%] stroke-1"/>

                        </div>

                        <div className="bg-[#8B81F3] h-[280px] rounded-[28px] cursor-pointer flex justify-center items-center flex-row gap-5">
                                
                            <div className="max-w-[80%] h-[78%] overflow-hidden">
                                <h2 className="text-[35px] w-min leading-[40px] text-[rgb(48,38,42,87%)] font-medium ">Rede de Computadores</h2>
                                <h2 className="text-[22px] text-[#454178] opacity-[70%] font-medium w-fit ">Materiais de estudo: 24</h2>
                                <h2 className="text-[22px] text-[#454178] opacity-[70%] font-medium w-fit ">Tempo ativo: 40 horas</h2>
                                <h2 className="text-[22px] text-[#454178] opacity-[70%] font-medium w-fit ">Última revisão: 15/01</h2>
                            </div>

                            <Monitor className="size-[110px] opacity-[22%] stroke-1"/>

                        </div>

                        <div className="bg-[#FFA6F1] h-[280px] rounded-[28px] cursor-pointer flex justify-center items-center flex-row gap-5">
                                
                            <div className="max-w-[80%] h-[78%] overflow-hidden">
                                <h2 className="text-[35px] w-min leading-[40px] text-[rgb(48,38,42,87%)] font-medium ">Ciência da computação</h2>
                                <h2 className="text-[22px] text-[#81244C] opacity-[61%] font-medium w-fit ">Materiais de estudo: 24</h2>
                                <h2 className="text-[22px] text-[#81244C] opacity-[61%] font-medium w-fit ">Tempo ativo: 40 horas</h2>
                                <h2 className="text-[22px] text-[#81244C] opacity-[61%] font-medium w-fit ">Última revisão: 15/01</h2>
                            </div>

                            <CodeXml className="size-[110px] opacity-[22%] stroke-1"/>

                        </div>

                        <div className="bg-[#FF9F93] h-[280px] rounded-[28px] cursor-pointer flex justify-center items-center flex-row gap-5">
                                
                            <div className="max-w-[80%] h-[50%] overflow-hidden">
                                <h2 className="text-[35px] w-min leading-[40px] text-[rgb(48,38,42,87%)] font-medium ">Enfermagem</h2>
                                <h2 className="text-[22px] text-[#844F48] opacity-[70%] font-medium w-fit ">Materiais de estudo: 24</h2>
                                <h2 className="text-[22px] text-[#844F48] opacity-[70%] font-medium w-fit ">Tempo ativo: 40 horas</h2>
                                <h2 className="text-[22px] text-[#844F48] opacity-[70%] font-medium w-fit ">Última revisão: 15/01</h2>
                            </div>

                            <HeartPulse className="size-[110px] opacity-[22%] stroke-1"/>

                        </div>
                        
                        <div className="bg-[#FFE89B] h-[280px] rounded-[28px] cursor-pointer flex justify-center items-center flex-row gap-5">
                                
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

            <div className="bg-white border rounded-[40px]">

                <div className="w-full">

                    <div className="grid grid-cols-[100px_1fr] ml-[15px] mt-[30px] gap-[15px]">
                        
                        <img src="Profile.png" className="h-[100px] rounded-full cursor-pointer" alt="Profile picture" />

                        <div className="">
                            <h1 className="text-[28px] font-medium ">Maria Eduarda</h1>
                            <h2 className="text-[#828181] font-medium text-[25px]">Estudante</h2>
                            <div className="w-[220px] h-2 rounded-[25px] bg-[#1e235138]">
                                <div className="w-[35%] h-2 rounded-[25px] bg-purple-600 "></div>
                            </div>
                            <div className="flex justify-between w-[220px]">
                                <h2 className="font-medium text-[18px] text-[#828181]">Iniciante</h2>
                                <h2 className="font-medium text-[18px] text-[#828181]">150xp</h2>
                            </div>
                            
                        </div>

                    </div>
                    
                    <div className="ml-[15px] mt-[30px]">
                        <h1 className="text-[34px] w-fit font-medium leading-6">Materiais de Estudo</h1>
                        <h1 className="text-[26px] italic w-fit font-medium text-[#7B7A7C] opacity-[72%]">Ciência da computação</h1>
                    </div>

                    <div className="grid grid-cols-[100px_1fr] ml-[15px] mt-[20px] gap-[15px]">

                        <h1 className="text-[100px] font-bold text-[#A78CDC] leading-[90px]">01</h1>

                        <div className="mt-[18px]">
                            <h2 className="text-[35px] font-medium leading-[30px]">POO I</h2>
                            <h2 className="text-[20px] text-[#828181]">Tempo de estudo: 45 minutos</h2>
                        </div>

                    </div>

                    <div className="grid grid-cols-[100px_1fr] ml-[15px] mt-[20px] gap-[15px]">

                        <h1 className="text-[100px] font-bold text-[#A78CDC] leading-[90px]">02</h1>

                        <div className="mt-[18px]">
                            <h2 className="text-[35px] font-medium leading-[30px]">POO I</h2>
                            <h2 className="text-[20px] text-[#828181]">Tempo de estudo: 45 minutos</h2>
                        </div>

                    </div>

                    <div className="grid grid-cols-[100px_1fr] ml-[15px] mt-[20px] gap-[15px]">

                        <h1 className="text-[100px] font-bold text-[#A78CDC] leading-[90px]">03</h1>

                        <div className="mt-[18px]">
                            <h2 className="text-[35px] font-medium leading-[30px]">POO I</h2>
                            <h2 className="text-[20px] text-[#828181]">Tempo de estudo: 45 minutos</h2>
                        </div>

                    </div>

                    <div className="grid grid-cols-[100px_1fr] ml-[15px] mt-[20px] gap-[15px]">

                        <h1 className="text-[100px] font-bold text-[#A78CDC] leading-[90px]">04</h1>

                        <div className="mt-[18px]">
                            <h2 className="text-[35px] font-medium leading-[30px]">POO I</h2>
                            <h2 className="text-[20px] text-[#828181]">Tempo de estudo: 45 minutos</h2>
                        </div>

                    </div>

                    <div className="w-full h-full flex justify-center mt-[20px]">
                        <div className=" w-[355px] h-[250px] border border-black rounded-[26px]">

                            <div className="m-3">
                                <p className="text-[21px] leading-8 mb-[5px]">Você já viu todos os resumos disponíveis!🎉</p>

                                <p className="text-[21px] leading-8">Que tal enriquecer ainda mais seu aprendizado? Adicione novos materiais e fortaleça seu conhecimento.</p>
                                
                                <button className="flex justify-center gap-1 items-center border border-black rounded-[50px] w-full pt-[5px] pb-[5px] mt-[14px] bg-[#9B79E0] text-white text-[20px]" > <Plus className=""/> Adicionar novo material</button>
                            </div>

                        </div>

                    </div>

                </div>

            </div>

            
        </div>

        </>
    );
};
