"use client";
import FloatingImages from "@/app/components/FloatingImages";
import {motion, AnimatePresence} from "framer-motion";


export default function Custom404() {
  return (
    <>
        <div id="back" className="w-full h-screen flex justify-center items-center relative">

            <div className="flex leading-[420px]">
                <div className="relative">
                    <h1 id="conf" className=" text-[#9767F8] text-[550px] ">4</h1>
                </div>
                <div className="relative">
                    <h1 id="conf" className=" text-[#9767F8] text-[550px] ">0</h1>
                    {/* <img src="/book2.svg" alt="asd" className="absolute w-[200px] left-[10%] bottom-[35%] rotate-[25deg] " /> */}
                </div>
                <div className="relative">
                    <h1 id="conf" className=" text-[#9767F8] text-[550px] ">4</h1>
                    {/* <img src="/book3.svg" alt="asd" className="absolute w-[200px] left-[0%] bottom-[15%] rotate-[85deg]" /> */}
                </div>
            </div>
        </div>
    </>
  );
}
