"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import dynamic from "next/dynamic";
import { ChatMateriais } from "@/app/home/components/chat-materiais";
import Loading from "../loading";

// Dynamic imports for SSR-safe components
const Document = dynamic(() => import("react-pdf").then(mod => mod.Document), { ssr: false });
const Page = dynamic(() => import("react-pdf").then(mod => mod.Page), { ssr: false });

export default function MaterialClient() {
  const params = useParams();
  const idMaterial = params?.idMaterial as string;
  const [file, setFile] = useState<File | null>(null);
  const [ loading, setLoading] = useState(true); 

  if (!idMaterial) return null;

  if (loading) return <Loading />;
  return (
    <>
      <div className=" w-full rounded-[35px] overflow-hidden bg-white h-full flex flex-col items-center shadow-md border border-[#00000031]">
          
      </div>

      <ChatMateriais idMaterial={idMaterial} />
    </>
  );
}
