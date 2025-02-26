"use client";
import Link from "next/link";
import {  usePathname  } from "next/navigation";
import { NotebookPen } from "lucide-react";
import { User } from "lucide-react";
import { ChartLine } from "lucide-react";
import { CalendarDays } from "lucide-react";
import { Cog } from "lucide-react";
import { LogOut } from "lucide-react";
// className={  pathname === "/products/1" ? "font-bold mr-4" : "text-blue-500 mr-4"  }

export const Sidebar  = () => {
    const pathname = usePathname();

    
    return (

        <nav className="bg-white min-w-[120px] h-[97vh] flex flex-col items-center mt-[12px] ml-4 border rounded-[70px]">
            <img src="light Bulb.png" alt="" className=" w-16 h-min mt-5 mb-[150px] cursor-pointer "/>

            <Link href="/materiais">
                <NotebookPen className= "size-[50px] cursor-pointer mb-[40px] text-black"/>
            </Link>
            <Link href="/">
                <User className= "size-[50px] cursor-pointer mb-[40px] text-black"/>
            </Link>
            <Link href="/">
                <ChartLine className= "size-[50px] cursor-pointer mb-[40px] text-black"/>
            </Link>
            <Link href="/">
                <CalendarDays className= "size-[50px] cursor-pointer mb-[40px] text-black"/>
            </Link>
            <Link href="/">
                <Cog className= "size-[50px] cursor-pointer mb-[40px text-black"/>
            </Link>
            <Link href="/">
                <LogOut className= "size-[50px] cursor-pointer mt-[140px] text-black"/>
            </Link>
        </nav>
        
    );
};