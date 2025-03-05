"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NotebookPen } from "lucide-react";
import { User } from "lucide-react";
import { ChartLine } from "lucide-react";
import { CalendarDays } from "lucide-react";
import { Cog } from "lucide-react";
import { LogOut } from "lucide-react";
import { useState, useEffect, Children } from "react";
// className={  pathname === "/products/1" ? "font-bold mr-4" : "text-blue-500 mr-4"  }


export const Sidebar  = () => {
    const pathname = usePathname();
    const [open, setOpen] = useState(false)
    
    return (

        <nav className="bg-white min-w-[118px] h-[calc(100vh-24px)] min-h-fit pb- flex flex-col items-center mt-[12px] ml-4 border rounded-[70px] ">
            <Link className="relative" href="/">
                <img src="light Bulb.png" alt="" className=" w-16 h-min mt-5 mb-[150px] cursor-pointer "/>
                
            </Link>

            <div className="flex flex-col gap-[45px]">
                <Link href="/materiais">
                    <NotebookPen className= "size-[45px] cursor-pointer  text-black"/>
                </Link>
                <Link href="/">
                    <User className= "size-[45px] cursor-pointer  text-black"/>
                </Link>
                <Link href="/">
                    <ChartLine className= "size-[45px] cursor-pointer  text-black"/>
                </Link>
                <Link href="/">
                    <CalendarDays className= "size-[45px] cursor-pointer  text-black"/>
                </Link>
                <Link href="/">
                    <Cog className= "size-[45px] cursor-pointer  text-black"/>
                </Link>


                <Link href="/">
                    <LogOut className= "size-[45px] cursor-pointer mt-[150px] text-black"/>
                </Link>
            </div>
        </nav>
    );
};
