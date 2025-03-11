"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NotebookPen, User, ChartLine, CalendarDays, Cog, LogOut } from "lucide-react";
import { useState, useEffect, Children } from "react";
// className={  pathname === "/products/1" ? "font-bold mr\-4" : "text-blue-500 mr-4"  }


export const Sidebar  = () => {
    const pathname = usePathname();
    const [open, setOpen] = useState(false)
    // {(() => {
    //     if (pathname == "/") {
    //         return <div className="bg-red-500 w-[100px] h-[100px] mt-5 flex justify-center items-center rounded-full "><img src="light Bulb.png" alt="" className=" w-[70%] h-[754%] cursor-pointer "/></div>    
    //     }
    //     <img src="light Bulb.png" alt="" className=" w-16 h-min mt-5  cursor-pointer "/>
    // })()}
   
    return (
        
        <div className=" min-w-[118px] h-[calc(100vh-24px)] min-h-fit flex flex-col items-center mt-[12px] ml-4 border rounded-[70px] ">
            <nav className="bg-white min-w-[118px] min-h-fit h-[calc(100vh-24px)] flex flex-col  items-center border border-[#00000031] shadow-md rounded-[70px] fixed ">
                
                <div className=" h-[92%] max-h-[1000px] flex flex-col justify-between items-center overflow-hidden">

                    <Link className="relative" href="/">
                        {(() => {
                            if (pathname == "/") {
                                return <img src="Light Bulb.png" alt="" className=" w-16 h-min mt-5  cursor-pointer "/>
                            }
                            return <img src="../../../Light Bulb-off.png" alt="" className=" w-16 h-min mt-5  cursor-pointer "/>
                            
                        })()}
                    </Link>

                    <div className="flex flex-col items-center gap-[45px]">
                        <Link href="/materiais" >
                            {(() => {
                                if (pathname == "/materiais") {
                                    return <div className="bg-[#A39CEC] p-[15px] rounded-full"><NotebookPen className= "size-[45px] cursor-pointer  text-white"/></div>
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
                                    return <div className="bg-[#A39CEC] p-[15px] rounded-full"><ChartLine className= "size-[45px] cursor-pointer text-white"/></div>
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
                                    return <div className="bg-[#A39CEC] p-[15px] rounded-full"><Cog className= "size-[45px] cursor-pointer text-white"/></div>
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
