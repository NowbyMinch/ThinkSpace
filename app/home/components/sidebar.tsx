"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NotebookPen, User, ChartLine, CalendarDays, Cog, LogOut } from "lucide-react";
import Image from "next/image";
import React from "react";
import {Tooltip} from "@heroui/react";


export const Sidebar = () => {
    const pathname = usePathname();

    return (
        
        <div className=" min-w-[118px] h-[calc(100vh-24px)] min-h-fit flex flex-col items-center mt-[12px] ml-4 z-[100]">
            <nav className="bg-white min-w-[118px] min-h-fit h-[calc(100vh-24px)] flex flex-col  items-center border border-[#00000031] shadow-md rounded-[70px] fixed ">
                
                <div className=" h-[92%] max-h-[1000px] flex flex-col justify-between items-center overflow-hidden">

                    <Link className="relative" href="/home">
                        {(() => {
                            if (pathname == "/home") {
                                return (
                                    <Tooltip closeDelay={0} content="Menu Principal" placement="right" className="w-fit text-[18px]" showArrow={true}>
                                        <div id="light-box" className=" w-16 h-[67px] mt-5 cursor-pointer relative">
                                            <Image src="/Light Bulb-off.png" width={300} height={500} alt="Logo" className="w-full absolute opacity-1"/>
                                            <Image src="/Light Bulb.png" width={300} height={500} alt="Logo" className=" z-10 w-full absolute opacity-1"/>
                                        </div>
                                    </Tooltip>
                                )
                            }
                            return (
                                <Tooltip closeDelay={0} content="Menu Principal" placement="right" className="w-fit text-[18px]" showArrow={true}>
                                    <div id="light-box" className=" w-16 h-[67px] mt-5 cursor-pointer relative">
                                        <Image src="/Light Bulb-off.png" width={300} height={500} alt="Logo" className="w-full absolute "/>
                                        <Image src="/Light Bulb.png" width={300} height={500} alt="Logo" id="on" className=" z-10 w-full opacity-0"/>
                                    </div>
                                </Tooltip>
                            )
                            
                        })()}
                    </Link>

                    <div className="flex flex-col items-center gap-[45px]">
                        <Link href="/home/materiais" className="">
                            {(() => {
                                if (pathname == "/home/materiais") {
                                    return (
                                        <>
                                            <Tooltip closeDelay={0} content="Materiais" placement="right" className="w-fit text-[18px]" showArrow={true}>
                                                <button id="side_pop" className="relative p-[15px] rounded-full bg-[#A39CEC]"> 
                                                    <NotebookPen className= "size-[45px] cursor-pointer text-white "/>
                                                </button>
                                            </Tooltip>
                                        </>
                                    )
                                }
                                return (
                                    <Tooltip closeDelay={0} content="Materiais" placement="right" className="w-fit text-[18px]" showArrow={true}>
                                        <button id="side_pop" className="relative p-[15px] rounded-full "> 
                                            <NotebookPen className= "size-[45px] cursor-pointer text-black "/>
                                        </button>
                                    </Tooltip>
                                )
                            })()}
                        </Link>
                        
                        <Link href="/home">
                            <Tooltip closeDelay={0} content="Comunidades" placement="right" className="w-fit text-[18px]" showArrow={true}>
                                <button id="side_pop" className="relative p-[15px] rounded-full "> 
                                    <User className= "size-[45px] cursor-pointer text-black "/>
                                </button>
                            </Tooltip>
                        </Link>

                        {/* <Link href="/home">
                            <User className= "size-[45px] cursor-pointer  text-black"/>
                        </Link> */}

                        <Link href="/home/metricas">
                            {(() => {
                                if (pathname == "/home/metricas") {
                                    return (
                                        <>
                                            <Tooltip closeDelay={0} content="Materiais" placement="right" className="w-fit text-[18px]" showArrow={true}>
                                                <button id="side_pop" className="relative p-[15px] rounded-full bg-[#A39CEC]"> 
                                                    <ChartLine className= "size-[45px] cursor-pointer text-white "/>
                                                </button>
                                            </Tooltip>
                                        </>
                                    )
                                }
                                return (
                                    <Tooltip closeDelay={0} content="Materiais" placement="right" className="w-fit text-[18px]" showArrow={true}>
                                        <button id="side_pop" className="relative p-[15px] rounded-full "> 
                                            <NotebookPen className= "size-[45px] cursor-pointer text-black "/>
                                        </button>
                                    </Tooltip>
                                )
                            })()}
                        </Link>

                        <Link href="/home">
                            <Tooltip closeDelay={0} content="Calendário" placement="right" className="w-fit text-[18px]" showArrow={true}>
                                <button id="side_pop" className="relative p-[15px] rounded-full "> 
                                    <CalendarDays className= "size-[45px] cursor-pointer text-black "/>
                                </button>
                            </Tooltip>
                        </Link>

                        <Link href="/home/configuracoes/informacoes">
                            {(() => {
                                if (pathname == "/home/configuracoes/informacoes" || pathname == "/home/configuracoes/notificacao" || pathname == "/home/configuracoes/personalizacao" || pathname == "/home/configuracoes/conta") {
                                    return (
                                        <>
                                            <Tooltip closeDelay={0} content="Configuração" placement="right" className="w-fit text-[18px]" showArrow={true}>
                                                <button id="side_pop" className="relative p-[15px] rounded-full bg-[#A39CEC]"> 
                                                    <Cog className= "size-[45px] cursor-pointer text-white "/>
                                                </button>
                                            </Tooltip>
                                        </>
                                    )
                                }
                                // if (pathname == "/home/configuracoes/notificacao") {
                                //     return (
                                //         <>
                                //             <div className="relative p-[15px] rounded-full"> 
                                //                 <div id="side_pop" className=" p-[15px] rounded-full bg-[#A39CEC] w-full h-full z-[-10] top-0 left-0 absolute"></div>
                                //                 <Cog className= "size-[45px] cursor-pointer text-white"/>
                                //             </div>
                                //         </>
                                //     )
                                // }
                                // if (pathname == "/home/configuracoes/personalizacao") {
                                //     return (
                                //         <>
                                //             <div className="relative p-[15px] rounded-full"> 
                                //                 <div id="side_pop" className=" p-[15px] rounded-full bg-[#A39CEC] w-full h-full z-[-10] top-0 left-0 absolute"></div>
                                //                 <Cog className= "size-[45px] cursor-pointer text-white"/>
                                //             </div>
                                //         </>
                                //     )
                                // }
                                // if (pathname == "/home/configuracoes/conta") {
                                //     return (
                                //         <>
                                //             <div className="relative p-[15px] rounded-full"> 
                                //                 <div id="side_pop" className=" p-[15px] rounded-full bg-[#A39CEC] w-full h-full z-[-10] top-0 left-0 absolute"></div>
                                //                 <Cog className= "size-[45px] cursor-pointer text-white"/>
                                //             </div>
                                //         </>
                                //     )
                                // }
                                return (
                                    <Tooltip closeDelay={0} content="Configuração"  placement="right" className="w-fit text-[18px]" showArrow={true}>
                                        <button id="side_pop" className="relative p-[15px] rounded-full "> 
                                            <Cog className= "size-[45px] cursor-pointer text-black "/>
                                        </button>
                                    </Tooltip>
                                )
                            })()}
                        </Link>

                    </div>
                        
                    <Link href="/home">
                        <Tooltip closeDelay={0} content="Sair" placement="right" className="w-fit text-[18px]" showArrow={true}>
                            <button id="side_pop" className="relative p-[15px] rounded-full "> 
                                <LogOut className= "size-[45px] cursor-pointer text-black "/>
                            </button>
                        </Tooltip>
                    </Link>
                </div>
            </nav>
        </div>
    );
};
