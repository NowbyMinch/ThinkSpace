"use client";

import {  CirclePlus, Heart, Globe, Monitor, CodeXml, HeartPulse, Minus, Divide, X, Plus, Search, ChevronRight, ChevronsLeft, ChevronsRight, ChevronLeft, ChevronDown, BookOpenText, FileText, FileInput, ScrollText } from "lucide-react";
import {  useEffect, useState  } from 'react';

{/* <img src="../../Vector.svg" alt="" className="absolute bottom-[-40px] right-[-130px] -rotate-90 w-[550px]"/> */}


export default function MaterialId({ params }: {params: { id: string }} ) {
    const [open, setOpen] = useState(false);
    const [openVar, setOpenVar] = useState(false);
    
    function closing(){
        setOpen(false);
        setOpenVar(false);
    }
    // bg-[#A39CEC]
    // bg-[#6871BB]
    return( 
        <>
            <div className={`w-full h-full ${ open? 'absolute' : 'hidden'}`}>
                <div id="white-box" className={` w-[1250px] h-[600px] rounded-[50px] z-[1100] left-[50%] translate-x-[-50%] top-[50%] translate-y-[-50%] bg-white shadow-md flex justify-center items-center relative overflow-hidden ${open? 'absolute' : 'hidden'} ${openVar? 'h-[650px]' : 'h-[600px]'} `}>
                    
                    <X className="absolute top-10 right-10 size-10 cursor-pointer" onClick={() => closing()}/>
    
                    <div className="w-[80%] h-[85%] flex flex-col gap-14 z-[1000]">
                        <h1 className={`text-center text-[45px] font-medium ${ openVar? "hidden": "block"}`}>Como você deseja criar a matéria?</h1>
                        <div className="flex w-[100%] h-[100%] justify-between ">
                            <button onClick={() => setOpenVar(true)} id="botoes-dta" className={`w-[320px] h-[330px] flex flex-col items-center justify-center bg-[#A387DC] rounded-[25px] cursor-pointer ${ openVar? "hidden": "block"}`}>
                                <BookOpenText id="cobaias" className=" text-white size-[130px] stroke-1"/>
                                <div id="cobaias" className="flex flex-col items-center ">
                                    <h1 id="cobaias" className="text-[45px] font-medium text-white">Documentos</h1>
                                    <h2 id="cobaias" className="text-[18px] font-medium">PDF, slides da aula, livros diversos</h2>
                                </div>
                            </button>

                            <button id="botoes-dta" className={`w-[320px] h-[330px] flex flex-col items-center justify-center bg-[#A39CEC] rounded-[25px] cursor-pointer ${ openVar? "hidden": "block"}`}>
                                <BookOpenText id="cobaias" className=" text-white size-[130px] stroke-1"/>
                                <div id="cobaias" className="flex flex-col items-center ">
                                    <h1 id="cobaias" className="text-[45px] font-medium text-white">Tópicos</h1>
                                    <h2 id="cobaias" className="text-[18px] font-medium">Digite um tópico que deseja revisar</h2>
                                </div>
                            </button>
                            <button id="botoes-dta" className={`w-[320px] h-[330px] flex flex-col items-center justify-center bg-[#6871BB] rounded-[25px] cursor-pointer ${ openVar? "hidden": "block"}`}>
                                <BookOpenText id="cobaias" className=" text-white size-[130px] stroke-1"/>
                                <div id="cobaias" className="flex flex-col items-center ">
                                    <h1 id="cobaias" className="text-[45px] font-medium text-white">Assuntos</h1>
                                    <h2 id="cobaias" className="text-[18px] font-medium">Digite assuntos gerais para revisar</h2>
                                </div>
                            </button>

                            <div className={`w-full h-full flex gap-12 items-center  ${ openVar? "block": "hidden"}`}>
                                <div className="w-[50%] h-[85%] bg-[#A39CEC] rounded-[25px] flex justify-center items-center">
                                    <div className="w-[85%] h-[85%] flex flex-col gap-2">
                                        <div className="">
                                            <h1 className="text-white text-[40px]">Documento</h1>
                                            <h2 className="text-white text-[20px]">1 Fevereiro 2025</h2>
                                        </div>
                                        <div className=" w-full h-full bg-white rounded-[25px] flex flex-col justify-center items-center cursor-pointer">
                                            <FileInput className="size-[110px] stroke-1 opacity-[75%]"/>
                                            <h1 className="text-[30px] opacity-[75%]">Faça o upload do material</h1>
                                        </div>
                                    </div>
                                </div>

                                <div className="w-[45%] h-[90%] flex flex-col gap-5 ">
                                    <div className="">
                                        <h2 className="text-[28px] font-medium">Nome do Material</h2>
                                        <input type="text"  placeholder="Nome do Material" className="pl-5 text-[20px] w-full h-[45px] border-2 border-[rgba(0,0,0,0.19)] rounded-[20px] outline-[#9767F8]"/>
                                    </div>
                                    
                                    <div className="relative">
                                        <h2 className="text-[28px] font-medium">Matéria designada:</h2>
                                        <input type="text"  placeholder="Nome do Material" className="pl-5 text-[20px] w-full h-[45px] border-2 border-[rgba(0,0,0,0.19)] rounded-[20px] outline-[#9767F8]"/>
                                        <ChevronDown className="absolute bottom-2 right-3 cursor-pointer"/>
                                    </div>
                                    
                                    <div className="relative">
                                        <h2 className="text-[28px] font-medium">Tópicos:</h2>
                                        <input type="text"  className="pl-5 text-[20px] w-full h-[45px] border-2 border-[rgba(0,0,0,0.19)] rounded-[20px] outline-[#9767F8]"/>
                                        <div className="absolute w-[100px] h-[30px] rounded-[10px] bg-[#A387DC] bottom-2 left-3 text-white flex justify-center items-center gap-1"> <X className="size-5 text-black opacity-[34%] cursor-pointer"/> Python</div>
                                    </div>
                                    
                                    <div className="relative">
                                        <h2 className="text-[28px] font-medium">Palavras-chave:</h2>
                                        <input type="text"  className="pl-5 text-[20px] w-full h-[45px] border-2 border-[rgba(0,0,0,0.19)] rounded-[20px] outline-[#9767F8]"/>
                                        <div className="absolute w-[100px] h-[30px] rounded-[10px] bg-[#A387DC] bottom-2 left-3 text-white flex justify-center items-center gap-1"> <X className="size-5 text-black opacity-[34%] cursor-pointer"/> Python</div>
                                    </div>
                                    
                                    <button id="editar_conta" className="border my-auto border-[#1E2351] text-[22px] w-[150px] h-[40px] rounded-full flex justify-center items-center gap-2" onClick={() => closing()}>
                                        <FileText />
                                        Enviar
                                    </button>
                                
                                </div>
                            </div>

                        </div>
    
                    </div>
                </div>
            </div>
            <div className={`w-full h-full fixed z-[1000] bg-[rgba(0,0,0,0.40)] ${ open? 'flex' : 'hidden'} justify-center items-center`} onClick={() => closing()}></div>

            <div className="grid grid-cols-[3fr_1fr] mt-[12px] h-[calc(100vh-25px)] min-h-fit w-full ml-[20px] mr-[20px] gap-[20px]">
                <div className="bg-white rounded-[35px] h-[100%] overflow-hidden flex flex-col items-center shadow-md border border-[#00000031]">
                    <div className="w-[1200px] mt-4 ">

                        <div className="ml-[15px] mt-[40px] ">
                            <h1 className="text-[45px] w-fit font-medium leading-6">Materiais de Estudo</h1>
                            <h1 className="text-[35px] italic w-fit font-medium text-[#9767F8] ">Ciência da computação</h1>
                        </div>

                        <div className="mt-[50px] overflow-hidden flex flex-row gap-5 justify-center">
                            <div className=" h-[82px] flex justify-center relative ">
                                <div className="w-[980px] rounded-[20px] mt-4 mr-4 h-[50px] bg-[#D9D9D9] absolute"></div>
                                <div className="relative">
                                    <input type="text" id="search_bar" placeholder="Pesquise a matéria" className="w-[1000px] text-[25px] pl-5 h-[55px] border-2 border-[rgba(0,0,0,0.19)] shadow-md rounded-[25px] outline-[#9767F8]" />
                                    <Search className="absolute right-[20px] text-black opacity-[36%] cursor-pointer top-[12px] size-[30px] "/>
                                </div>
                            </div>
                            
                            <button onClick={() => setOpen(true)} className="bg-[#9B79E0] border border-[#716BAF] w-[14%] h-[60px] rounded-full text-white text-[24px]">Criar novo</button>
                        </div>

                        <div className="flex h-[670px]  overflow-y-auto overflow-x-hidden flex-col items-center">
                            <div id="materiais" className=" grid grid-cols-[100px_1fr] px-2 py-1 w-full ml-[15px] mr-[15px] cursor-pointer rounded-[10px] hover:bg-[rgba(0,0,0,0.06)] ">
                                <h1 className="text-[90px] font-bold text-[#A78CDC] leading-[90px]">01</h1>

                                <div className="mt-[18px] flex justify-between items-center ">
                                    <div className="">
                                        <h2 className="text-[30px] font-medium leading-[30px]">Eng. Comp II</h2>
                                        <h2 className="text-[20px] text-[#828181]">Tempo de estudo: 3 horas</h2>
                                    </div>

                                    <ChevronRight className="size-12 "/>
                                </div>
                            </div>

                            <div id="materiais" className=" grid grid-cols-[100px_1fr] px-2 py-1 w-full ml-[15px] mr-[15px] cursor-pointer rounded-[10px] hover:bg-[rgba(0,0,0,0.06)] ">
                                <h1 className="text-[90px] font-bold text-[#A78CDC] leading-[90px]">02</h1>

                                <div className="mt-[18px] flex justify-between items-center ">
                                    <div className="">
                                        <h2 className="text-[30px] font-medium leading-[30px]">Eng. Comp II</h2>
                                        <h2 className="text-[20px] text-[#828181]">Tempo de estudo: 3 horas</h2>
                                    </div>

                                    <ChevronRight className="size-12 "/>
                                </div>
                            </div>

                            <div id="materiais" className=" grid grid-cols-[100px_1fr] px-2 py-1 w-full ml-[15px] mr-[15px] cursor-pointer rounded-[10px] hover:bg-[rgba(0,0,0,0.06)] ">
                                <h1 className="text-[90px] font-bold text-[#A78CDC] leading-[90px]">02</h1>

                                <div className="mt-[18px] flex justify-between items-center ">
                                    <div className="">
                                        <h2 className="text-[30px] font-medium leading-[30px]">Eng. Comp II</h2>
                                        <h2 className="text-[20px] text-[#828181]">Tempo de estudo: 3 horas</h2>
                                    </div>

                                    <ChevronRight className="size-12 "/>
                                </div>
                            </div>

                            <div id="materiais" className=" grid grid-cols-[100px_1fr] px-2 py-1 w-full ml-[15px] mr-[15px] cursor-pointer rounded-[10px] hover:bg-[rgba(0,0,0,0.06)] ">
                                <h1 className="text-[90px] font-bold text-[#A78CDC] leading-[90px]">03</h1>

                                <div className="mt-[18px] flex justify-between items-center ">
                                    <div className="">
                                        <h2 className="text-[30px] font-medium leading-[30px]">Eng. Comp II</h2>
                                        <h2 className="text-[20px] text-[#828181]">Tempo de estudo: 3 horas</h2>
                                    </div>

                                    <ChevronRight className="size-12 "/>
                                </div>
                            </div>

                            <div id="materiais" className=" grid grid-cols-[100px_1fr] px-2 py-1 w-full ml-[15px] mr-[15px] cursor-pointer rounded-[10px] hover:bg-[rgba(0,0,0,0.06)] ">
                                <h1 className="text-[90px] font-bold text-[#A78CDC] leading-[90px]">04</h1>

                                <div className="mt-[18px] flex justify-between items-center ">
                                    <div className="">
                                        <h2 className="text-[30px] font-medium leading-[30px]">Eng. Comp II</h2>
                                        <h2 className="text-[20px] text-[#828181]">Tempo de estudo: 3 horas</h2>
                                    </div>

                                    <ChevronRight className="size-12 "/>
                                </div>
                            </div>

                            <div id="materiais" className=" grid grid-cols-[100px_1fr] px-2 py-1 w-full ml-[15px] mr-[15px] cursor-pointer rounded-[10px] hover:bg-[rgba(0,0,0,0.06)] ">
                                <h1 className="text-[90px] font-bold text-[#A78CDC] leading-[90px]">05</h1>

                                <div className="mt-[18px] flex justify-between items-center ">
                                    <div className="">
                                        <h2 className="text-[30px] font-medium leading-[30px]">Eng. Comp II</h2>
                                        <h2 className="text-[20px] text-[#828181]">Tempo de estudo: 3 horas</h2>
                                    </div>

                                    <ChevronRight className="size-12 "/>
                                </div>
                            </div>

                            <div id="materiais" className=" grid grid-cols-[100px_1fr] px-2 py-1 w-full ml-[15px] mr-[15px] cursor-pointer rounded-[10px] hover:bg-[rgba(0,0,0,0.06)] ">
                                <h1 className="text-[90px] font-bold text-[#A78CDC] leading-[90px]">06</h1>

                                <div className="mt-[18px] flex justify-between items-center ">
                                    <div className="">
                                        <h2 className="text-[30px] font-medium leading-[30px]">Eng. Comp II</h2>
                                        <h2 className="text-[20px] text-[#828181]">Tempo de estudo: 3 horas</h2>
                                    </div>

                                    <ChevronRight className="size-12 "/>
                                </div>
                            </div>

                            <div id="materiais" className=" grid grid-cols-[100px_1fr] px-2 py-1 w-full ml-[15px] mr-[15px] cursor-pointer rounded-[10px] hover:bg-[rgba(0,0,0,0.06)] ">
                                <h1 className="text-[90px] font-bold text-[#A78CDC] leading-[90px]">07</h1>

                                <div className="mt-[18px] flex justify-between items-center ">
                                    <div className="">
                                        <h2 className="text-[30px] font-medium leading-[30px]">Eng. Comp II</h2>
                                        <h2 className="text-[20px] text-[#828181]">Tempo de estudo: 3 horas</h2>
                                    </div>

                                    <ChevronRight className="size-12 "/>
                                </div>
                            </div>

                            <div id="materiais" className=" grid grid-cols-[100px_1fr] px-2 py-1 w-full ml-[15px] mr-[15px] cursor-pointer rounded-[10px] hover:bg-[rgba(0,0,0,0.06)] ">
                                <h1 className="text-[90px] font-bold text-[#A78CDC] leading-[90px]">08</h1>

                                <div className="mt-[18px] flex justify-between items-center ">
                                    <div className="">
                                        <h2 className="text-[30px] font-medium leading-[30px]">Eng. Comp II</h2>
                                        <h2 className="text-[20px] text-[#828181]">Tempo de estudo: 3 horas</h2>
                                    </div>

                                    <ChevronRight className="size-12 "/>
                                </div>
                            </div>

                            <div id="materiais" className=" grid grid-cols-[100px_1fr] px-2 py-1 w-full ml-[15px] mr-[15px] cursor-pointer rounded-[10px] hover:bg-[rgba(0,0,0,0.06)] ">
                                <h1 className="text-[90px] font-bold text-[#A78CDC] leading-[90px]">09</h1>

                                <div className="mt-[18px] flex justify-between items-center ">
                                    <div className="">
                                        <h2 className="text-[30px] font-medium leading-[30px]">Eng. Comp II</h2>
                                        <h2 className="text-[20px] text-[#828181]">Tempo de estudo: 3 horas</h2>
                                    </div>

                                    <ChevronRight className="size-12 "/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-[35px] flex justify-center shadow-md border border-[#00000031]">
                    
                    <div className="w-[100%]">
                        <div className=" ml-[10px] mr-[10px] w-[409px] ">

                            <div className="grid grid-cols-[100px_1fr] ml-[15px] mt-[30px] gap-[15px] ">
                                
                                <img src="../Profile.png" className="h-[100px] rounded-full cursor-pointer " alt="Profile picture" />

                                <div className="">
                                    <h1 className="text-[30px] font-medium ">Maria Eduarda</h1>
                                    <h2 className="text-[#828181] font-medium text-[25px]">Estudante</h2>
                                    <div className="w-[220px] h-2 rounded-[25px] bg-[#1e235138]">
                                        <div className="w-[45%] h-2 rounded-[25px] bg-purple-600 "></div>
                                    </div>
                                    <div className="flex justify-between w-[220px]">
                                        <h2 className="font-medium text-[18px] text-[#828181]">Iniciante</h2>
                                        <h2 className="font-medium text-[18px] text-[#828181]">450px</h2>
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
