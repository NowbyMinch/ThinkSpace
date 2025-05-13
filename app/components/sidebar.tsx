"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NotebookPen, User, ChartLine, CalendarDays, Cog, LogOut } from "lucide-react";
import { useState, useEffect, Children } from "react";


export const Sidebar  = () => {
    const pathname = usePathname();
    const [open, setOpen] = useState(false)

    return (
        
        <div className=" min-w-[118px] h-[calc(100vh-24px)] min-h-fit flex flex-col items-center mt-[12px] ml-4 border rounded-[70px] ">
            <nav className="bg-white min-w-[118px] min-h-fit h-[calc(100vh-24px)] flex flex-col  items-center border border-[#00000031] shadow-md rounded-[70px] fixed ">
                
                <div className=" h-[92%] max-h-[1000px] flex flex-col justify-between items-center overflow-hidden">

                    <Link className="relative" href="/">
                        {(() => {
                            if (pathname == "/") {
                                return (
                                    <div id="light-box" className=" w-16 h-[67px] mt-5 cursor-pointer relative">
                                        <img src="../../../Light Bulb-off.png" alt="" className="w-full absolute "/>
                                        <img src="../../../Light Bulb.png" alt="" className=" z-10 w-full absolute "/>
                                    </div>
                                )
                            }
                            return (
                                <div id="light-box" className=" w-16 h-[67px] mt-5 cursor-pointer relative">
                                    <img src="../../../Light Bulb-off.png" alt="" className="w-full absolute"/>
                                    <img id="on" src="../../../Light Bulb.png" alt="" className=" z-10 w-full absolute "/>
                                </div>
                            )
                            
                        })()}
                    </Link>

                    <div className="flex flex-col items-center gap-[45px]">
                        <Link href="/materiais" className="">
                            {(() => {
                                if (pathname == "/materiais") {
                                    return (
                                        <>
                                            <div className="relative p-[15px] rounded-full"> 
                                                <div id="side_pop" className=" p-[15px] rounded-full bg-[#A39CEC] w-full h-full z-[-10] top-0 left-0 absolute"></div>
                                                <NotebookPen className= "size-[45px] cursor-pointer text-white"/>
                                            </div>
                                        </>
                                    )
                                }
                                return <div className=" p-[15px] rounded-full"><NotebookPen className= "size-[45px] cursor-pointer  text-black"/></div>
                            })()}

                        </Link>
                        <Link href="/">
                            <User className= "size-[45px] cursor-pointer  text-black"/>
                        </Link>
                        <Link href="/metricas">
                            {(() => {
                                if (pathname == "/metricas") {
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

                        <Link href="/">
                            <CalendarDays className= "size-[45px] cursor-pointer  text-black"/>
                        </Link>

                        <Link href="/configuracoes/informacoes">
                            {(() => {
                                if (pathname == "/configuracoes/informacoes") {
                                    return (
                                        <>
                                            <div className="relative p-[15px] rounded-full"> 
                                                <div id="side_pop" className=" p-[15px] rounded-full bg-[#A39CEC] w-full h-full z-[-10] top-0 left-0 absolute"></div>
                                                <Cog className= "size-[45px] cursor-pointer text-white"/>
                                            </div>
                                        </>
                                    )
                                }
                                if (pathname == "/configuracoes/notificacao") {
                                    return (
                                        <>
                                            <div className="relative p-[15px] rounded-full"> 
                                                <div id="side_pop" className=" p-[15px] rounded-full bg-[#A39CEC] w-full h-full z-[-10] top-0 left-0 absolute"></div>
                                                <Cog className= "size-[45px] cursor-pointer text-white"/>
                                            </div>
                                        </>
                                    )
                                }
                                if (pathname == "/configuracoes/personalizacao") {
                                    return (
                                        <>
                                            <div className="relative p-[15px] rounded-full"> 
                                                <div id="side_pop" className=" p-[15px] rounded-full bg-[#A39CEC] w-full h-full z-[-10] top-0 left-0 absolute"></div>
                                                <Cog className= "size-[45px] cursor-pointer text-white"/>
                                            </div>
                                        </>
                                    )
                                }
                                if (pathname == "/configuracoes/conta") {
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
                        
                    <Link href="/">
                        <LogOut className= "size-[45px] cursor-pointer  text-black"/>
                    </Link>
                </div>
            </nav>
        </div>
    );
};
