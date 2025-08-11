"use client";

import { ChatMateriais } from "@/app/home/components/chat-materiais";
import Image from "next/image";
import { useParams } from "next/navigation";
// import { PageProps } from "../type";
// { params }: PageProps 

{/* <img src="../../Vector.svg" alt="" className="absolute bottom-[-40px] right-[-130px] -rotate-90 w-[550px]"/> */}

export default function MaterialClient() {
    const params = useParams();
    const idMaterial = params?.idMaterial as string;
    
    if (!idMaterial) return null;

    return( 
        <>  
            <div className="bg-white rounded-[35px] h-[100%] overflow-hidden flex flex-col items-center shadow-md border border-[#00000031]">
                <Image width={970} height={500} src="/material.png" className="h-[970px] w-auto max-h-[104%]" alt="Material" />
            </div>

            <ChatMateriais idMaterial={idMaterial}/>
        </>
    );
};
