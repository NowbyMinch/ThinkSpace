"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NotebookPen, User, ChartLine, CalendarDays, Cog, LogOut } from "lucide-react";
import Image from "next/image";
import React from "react";

import {Popover, PopoverTrigger, PopoverContent} from "@heroui/react";

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
                                    <div id="light-box" className=" w-16 h-[67px] mt-5 cursor-pointer relative">
                                        <Image src="/Light Bulb-off.png" width={300} height={500} alt="Logo" className="w-full absolute opacity-1"/>
                                        <Image src="/Light Bulb.png" width={300} height={500} alt="Logo" className=" z-10 w-full absolute opacity-1"/>
                                    </div>
                                )
                            }
                            return (
                                <div id="light-box" className=" w-16 h-[67px] mt-5 cursor-pointer relative">
                                    <Image src="/Light Bulb-off.png" width={300} height={500} alt="Logo" className="w-full absolute "/>
                                    <Image src="/Light Bulb.png" width={300} height={500} alt="Logo" id="on" className=" z-10 w-full opacity-0"/>
                                </div>
                            )
                            
                        })()}
                    </Link>

                    <div className="flex flex-col items-center gap-[45px]">
                        <Link href="/home/materiais" className="">
                            {(() => {
                                if (pathname == "/home/materiais") {
                                    return (
                                        <>
                                            <Popover showArrow offset={20} placement="bottom">
                                            <PopoverTrigger onMouseLeave={() => console.log("Mouse Left")}>
                                                <div className="relative p-[15px] rounded-full"> 
                                                    <div id="side_pop" className=" p-[15px] rounded-full bg-[#A39CEC] w-full h-full z-[-10] top-0 left-0 absolute"></div>
                                                    <NotebookPen className= "size-[45px] cursor-pointer text-white"/>
                                                </div>
                                            </PopoverTrigger>
                                            <PopoverContent>
                                                <div className="px-1 py-2">
                                                <div className="text-small font-bold">Popover Content</div>
                                                <div className="text-tiny">This is the popover content</div>
                                                </div>
                                            </PopoverContent>
                                            </Popover>
                                            
                                        </>
                                    )
                                }
                                return <div className=" p-[15px] rounded-full"><NotebookPen className= "size-[45px] cursor-pointer  text-black"/></div>
                            })()}

                        </Link>
                        <Link href="/home">
                            <User className= "size-[45px] cursor-pointer  text-black"/>
                        </Link>
                        <Link href="/home/metricas">
                            {(() => {
                                if (pathname == "/home/metricas") {
                                    return (
                                        <>
                                            <div className="relative p-[15px] rounded-full"> 
                                                <div id="side_pop" className=" p-[15px] rounded-full bg-[#A39CEC] w-full h-full z-[-10] top-0 left-0 absolute"></div>
                                                <ChartLine className= "size-[45px] cursor-pointer text-white"/>
                                            </div>
                                        </>
                                    )
                                }
                                return <div className=" p-[15px] rounded-full"><ChartLine className= "size-[45px] cursor-pointer text-black"/></div>
                            })()}
                        </Link>

                        <Link href="/home">
                            <CalendarDays className= "size-[45px] cursor-pointer  text-black"/>
                        </Link>

                        <Link href="/home/configuracoes/informacoes">
                            {(() => {
                                if (pathname == "/home/configuracoes/informacoes") {
                                    return (
                                        <>
                                            <div className="relative p-[15px] rounded-full"> 
                                                <div id="side_pop" className=" p-[15px] rounded-full bg-[#A39CEC] w-full h-full z-[-10] top-0 left-0 absolute"></div>
                                                <Cog className= "size-[45px] cursor-pointer text-white"/>
                                            </div>
                                        </>
                                    )
                                }
                                if (pathname == "/home/configuracoes/notificacao") {
                                    return (
                                        <>
                                            <div className="relative p-[15px] rounded-full"> 
                                                <div id="side_pop" className=" p-[15px] rounded-full bg-[#A39CEC] w-full h-full z-[-10] top-0 left-0 absolute"></div>
                                                <Cog className= "size-[45px] cursor-pointer text-white"/>
                                            </div>
                                        </>
                                    )
                                }
                                if (pathname == "/home/configuracoes/personalizacao") {
                                    return (
                                        <>
                                            <div className="relative p-[15px] rounded-full"> 
                                                <div id="side_pop" className=" p-[15px] rounded-full bg-[#A39CEC] w-full h-full z-[-10] top-0 left-0 absolute"></div>
                                                <Cog className= "size-[45px] cursor-pointer text-white"/>
                                            </div>
                                        </>
                                    )
                                }
                                if (pathname == "/home/configuracoes/conta") {
                                    return (
                                        <>
                                            <div className="relative p-[15px] rounded-full"> 
                                                <div id="side_pop" className=" p-[15px] rounded-full bg-[#A39CEC] w-full h-full z-[-10] top-0 left-0 absolute"></div>
                                                <Cog className= "size-[45px] cursor-pointer text-white"/>
                                            </div>
                                        </>
                                    )
                                }
                                return <div className=" p-[15px] rounded-full"><Cog className= "size-[45px] cursor-pointer text-black"/></div>
                            })()}
                        </Link>

                    </div>
                        
                    <Link href="/home">
                        <LogOut className= "size-[45px] cursor-pointer  text-black"/>
                    </Link>
                </div>
            </nav>
        </div>
    );
};
