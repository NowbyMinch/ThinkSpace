import {  CirclePlus, Heart, Globe, Monitor, CodeXml, HeartPulse, Minus, Divide, X, Plus, Search, ChevronRight, ChevronsLeft, ChevronsRight, ChevronLeft } from "lucide-react";
import {  useEffect, useState  } from 'react';

// blue_text = 1E2351;


export default function MaterialId({ params }: {params: { id: string }} ) {
    return( 
        <>
            <div className="grid grid-cols-[3fr_1fr] mt-[12px] h-[calc(100vh-25px)] min-h-fit w-full ml-[20px] mr-[20px] gap-[20px]">
                <div className="bg-white rounded-[35px] h-[100%] overflow-hidden flex flex-col items-center shadow-md border border-[#00000031]">
                    <div className="w-[1200px] mt-4 ">

                        <div className="ml-[15px] mt-[40px] ">
                            <h1 className="text-[45px] w-fit font-medium leading-6">Materiais de Estudo</h1>
                            <h1 className="text-[35px] italic w-fit font-medium text-[#9767F8] ">Ciência da computação</h1>
                        </div>

                        <div className="mt-[50px] ml-[30px] overflow-hidden flex flex-row gap-5">
                            <div className=" h-[82px] flex justify-center relative ">
                                <div className="w-[980px] rounded-[20px] mt-4 mr-4 h-[50px] bg-[#D9D9D9] absolute"></div>
                                <div className="relative  ">
                                    <input type="text" id="search_bar" placeholder="Pesquise a matéria" className="w-[1000px] text-[25px] pl-5 h-[55px] border-2 border-[rgba(0,0,0,0.19)] shadow-md rounded-[25px] outline-[#9767F8]" />
                                    <Search className="absolute right-[20px] text-black opacity-[36%] cursor-pointer top-[12px] size-[30px] "/>
                                </div>
                            </div>
                            
                            <button className="bg-[#9B79E0] border border-[#716BAF] w-[15%] h-[60px] rounded-full text-white text-[24px]">Criar novo</button>
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
