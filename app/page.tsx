import Image from "next/image";
import {  Search  } from "lucide-react";
import { Flame } from 'lucide-react';
import { CircleHelp } from 'lucide-react';
import { Bell } from 'lucide-react';
import { ArrowLeft } from 'lucide-react';
import { ArrowRight } from 'lucide-react';
import { Ellipsis } from 'lucide-react';

export default function Home() {
    return(
        <>
            <div className=" w-[90%] mx-auto">

                <div className="h-[82px] mt-[15px] flex justify-between ">

                    <div className="w-[55%] h-fit relative rounded-[60px]">
                        <input type="text" id="search_bar" className=" w-full z-10 text-[25px] pl-5 h-[65px] border-2 border-[rgba(0,0,0,0.19)] rounded-[60px] outline-[#9767F8]" />
                        <Search className="absolute right-[20px] text-black opacity-[36%] cursor-pointer top-[25%] size-[30px] z-20"/>
                    </div>
                    
                    <div className="flex gap-[40px]">
                        
                        <div className="w-[75px] h-[75px] rounded-full bg-[#D9D9D9] cursor-pointer flex justify-center items-center"> <Flame className="size-[45px] text-[#C8837A] fill-[#E9B28B]"/> </div>
                        <div className="w-[75px] h-[75px] rounded-full bg-[#D9D9D9] cursor-pointer flex justify-center items-center"> <CircleHelp className="size-[45px] text-[rgba(0,0,0,31%)]"/> </div>
                        <div className="w-[75px] h-[75px] rounded-full bg-[#D9D9D9] cursor-pointer flex justify-center items-center"> <Bell className="size-[45px] text-[rgba(0,0,0,31%)]"/> </div>
                        <img src="Profile.png" className="rounded-full cursor-pointer transition-all w-[75px] h-[75px]" alt="" />

                    </div>
                </div>

                <div className=" grid grid-cols-[54%_1fr] gap-[30px] justify-between mt-6">

                    <div className="">
                        <div className="w-[100%] h-[240px] bg-[#CCB2FF] shadow-md rounded-[35px] flex justify-center items-center ">
                            <div className=" w-[90%] h-[80%] flex justify-between">

                                <div className=" flex flex-col justify-between w-[65%]">
                                    <h1 className="text-[34px]  font-medium">Bom dia, Maria! Veja o relatório das
                                    suas metas de estudo semanais</h1>

                                    <button className="w-[250px] h-[60px] bg-[#1E2351] rounded-full text-white text-[24px]">Saiba mais!</button>
                                </div>
            
                                <div className="flex justify-center items-center w-[250px] h-[200px]">
                                    Image
                                </div>
                            </div>
                        </div>

                        <h1 className="text-[38px] mt-[20px]">Seu progresso semanal:</h1>
                        <div className="w-full grid grid-cols-[1fr_1fr_1fr] gap-[10px]">
                            
                            <div className="h-[200px] bg-[#CAC5FF] rounded-[25px] flex justify-center items-center">

                                <div className="grid grid-rows-[1fr_1fr] w-[85%] h-[80%]">

                                    <div className=" flex gap-[6px] items-center relative">
                                        <Ellipsis className="absolute top-0 right-0 cursor-pointer"/>
                                        <div className="w-[60px] h-[60px] rounded-full bg-white"></div>
                                        <h1 className="text-[28px] w-min leading-7 font-medium">Rede de computadores</h1>
                                    </div>

                                    <div className="">

                                        <div className="w-full h-[7px] rounded-full bg-[rgb(30,35,81,14%)] text-[17px] font-medium mt-4">
                                            <div className="w-[23%] h-[7px] rounded-full bg-[rgb(30,35,81,75%)]"></div>
                                            <div className="flex justify-between">
                                                <span className="font-medium text-[17px]">Progresso semanal</span>
                                                <span className="font-medium text-[17px]">23%</span>
                                            </div>

                                        </div>
                                    </div>
                                
                                </div>

                            </div>
                            
                            <div className="h-[200px] bg-[#FFA6F1] rounded-[25px] flex justify-center items-center">

                                <div className="grid grid-rows-[1fr_1fr] w-[85%] h-[80%]">

                                    <div className=" flex gap-[6px] items-center relative">
                                        <Ellipsis className="absolute top-0 right-0 cursor-pointer"/>
                                        <div className="w-[60px] h-[60px] rounded-full bg-white"></div>
                                        <h1 className="text-[28px] w-min leading-7 font-medium">Ciência da computação </h1>
                                    </div>

                                    <div className="">

                                        <div className="w-full h-[7px] rounded-full bg-[rgb(30,35,81,14%)] text-[17px] font-medium mt-4">
                                            <div className="w-[82%] h-[7px] rounded-full bg-[rgb(30,35,81,75%)]"></div>
                                            <div className="flex justify-between">
                                                <span className="font-medium text-[17px]">Progresso semanal</span>
                                                <span className="font-medium text-[17px]">82%</span>
                                            </div>

                                        </div>
                                    </div>
                                
                                </div>

                            </div>
                            
                            <div className="h-[200px] bg-[#FF9F93] rounded-[25px] flex justify-center items-center">

                                <div className="grid grid-rows-[1fr_1fr] w-[85%] h-[80%]">

                                    <div className=" flex gap-[6px] items-center relative">
                                        <Ellipsis className="absolute top-0 right-0 cursor-pointer"/>
                                        <div className="w-[60px] h-[60px] rounded-full bg-white"></div>
                                        <h1 className="text-[28px] w-min leading-7 font-medium">Enfermagem</h1>
                                    </div>

                                    <div className="">

                                        <div className="w-full h-[7px] rounded-full bg-[rgb(30,35,81,14%)] text-[17px] font-medium mt-4">
                                            <div className="w-[48%] h-[7px] rounded-full bg-[rgb(30,35,81,75%)]"></div>
                                            <div className="flex justify-between">
                                                <span className="font-medium text-[17px]">Progresso semanal</span>
                                                <span className="font-medium text-[17px]">48%</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="">

                        <div className="bg-white h-[240px] rounded-[35px] shadow-md">
                            
                            <div className=" w-full grid grid-cols-[1fr_1fr_1fr] h-[50%] text-center items-center">
                                
                                <div className="flex justify-center items-center">
                                    <ArrowLeft className="p-3 size-[75px] rounded-full cursor-pointer border border-[#1E2351] "/>

                                </div>

                                <h1 className="text-[45px] font-bold ">FEV 2025</h1>
                                
                                <div className="flex justify-center items-center">
                                    <ArrowRight className="p-3 size-[75px] rounded-full cursor-pointer border border-[#1E2351]" />
                                </div>

                            </div>

                            <div className=" w-full grid grid-flow-col h-[50%] text-center items-center">
                                
                                <div className="  flex justify-center">
                                    <div className="w-[65px] rounded-[15px]  justify-center  ">
                                        <h2 className="text-[18px]">DOM.</h2>
                                        <h1 className="font-bold text-[45px]">22</h1>
                                    </div>
                                </div>
                                
                                <div className="  flex justify-center">
                                    <div className="w-[65px] rounded-[15px]  justify-center  ">
                                        <h2 className="text-[18px]">DOM.</h2>
                                        <h1 className="font-bold text-[45px]">22</h1>
                                    </div>
                                </div>
                                
                                <div className="  flex justify-center">
                                    <div className="w-[65px] rounded-[15px]  justify-center  ">
                                        <h2 className="text-[18px]">DOM.</h2>
                                        <h1 className="font-bold text-[45px]">22</h1>
                                    </div>
                                </div>
                                
                                <div className=" translate-y-[-10px] flex justify-center">
                                    <div className="w-[65px] rounded-[15px] py-2 justify-center bg-[#CCB2FF] shadow-md">
                                        <h2 className="text-[18px]">DOM.</h2>
                                        <h1 className="font-bold text-[45px]">22</h1>
                                    </div>
                                </div>
                                
                                <div className="  flex justify-center">
                                    <div className="w-[65px] rounded-[15px]  justify-center  ">
                                        <h2 className="text-[18px]">DOM.</h2>
                                        <h1 className="font-bold text-[45px]">22</h1>
                                    </div>
                                </div>
                                
                                <div className="  flex justify-center">
                                    <div className="w-[65px] rounded-[15px]  justify-center  ">
                                        <h2 className="text-[18px]">DOM.</h2>
                                        <h1 className="font-bold text-[45px]">22</h1>
                                    </div>
                                </div>
                                
                                <div className="  flex justify-center">
                                    <div className="w-[65px] rounded-[15px]  justify-center  ">
                                        <h2 className="text-[18px]">DOM.</h2>
                                        <h1 className="font-bold text-[45px]">22</h1>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <h1>BRUH</h1>
                    </div>


                </div>
        
            </div>

        </>
    );
};
