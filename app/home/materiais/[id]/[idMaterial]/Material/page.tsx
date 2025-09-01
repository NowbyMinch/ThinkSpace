"use client";
            
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { ChatMateriais } from "@/app/home/components/chat-materiais";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import Loading from "../loading";

export default function MaterialClient() {
  const params = useParams();
  const idMaterial = params?.idMaterial as string;
  const [ appear, setAppear ] = useState(false);

  if (!idMaterial) return null;

  return (
    <>    
      <div className="relative w-full rounded-[35px] bg-white h-full flex flex-col items-center shadow-md border border-[#00000031] ">
        <div className=" w-full rounded-[35px] overflow-hidden bg-white h-full flex flex-col items-center shadow-md border border-[#00000031]">

          <motion.button 
          whileHover={{scale: 1.04}}
          whileTap={{scale: 0.96}}
          onClick={() => setAppear(!appear)}
          className="absolute bottom-2 right-2 shadow-md h-min rounded-full w-[65px] ">
            <img alt="Profile Picture" src="/IApicture.svg" className="rounded-full w-full bg-white" width={800} height={800} />
          </motion.button>

        </div>

        <ChatMateriais appear={true} idMaterial={idMaterial} />
      
      </div>
    </>
  );
}
