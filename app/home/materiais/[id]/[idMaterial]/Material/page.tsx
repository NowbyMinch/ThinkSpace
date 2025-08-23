"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import dynamic from "next/dynamic";
import { ChatMateriais } from "@/app/home/components/chat-materiais";

// Dynamic imports for SSR-safe components
const Document = dynamic(() => import("react-pdf").then(mod => mod.Document), { ssr: false });
const Page = dynamic(() => import("react-pdf").then(mod => mod.Page), { ssr: false });

export default function MaterialClient() {
  const params = useParams();
  const idMaterial = params?.idMaterial as string;
  const [file, setFile] = useState<File | null>(null);

  if (!idMaterial) return null;

  return (
    <>
      <div className=" bg-white rounded-[35px] h-[100%] overflow-hidden flex flex-col items-center shadow-md border border-[#00000031] justify-center ">
          
      </div>

      <ChatMateriais idMaterial={idMaterial} />
    </>
  );
}
