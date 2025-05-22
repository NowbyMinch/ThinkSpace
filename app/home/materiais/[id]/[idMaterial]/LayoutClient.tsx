"use client";

import Link from "next/link";
import { usePathname } from "next/navigation"

export default function LayoutClient({ id, idMaterial, }: { id: string; idMaterial: string;}) { 
    const pathname = usePathname();
    return (
        <>
            <Link href="/home/materiais/Ciência da Computação/Eng. Comp II/Material" className="flex items-center">
                {(() => {
                    if (pathname == `/materiais/${id}/${idMaterial}/Material`) {
                        return <h2 className="text-[25px] font-medium cursor-pointer relative flex justify-center">Material<div id="underline" className="bg-[#A39CEC] w-[120%] h-[3px] rounded-full absolute bottom-[-2px]"></div></h2>
                    }
                    return <h2 className="text-[25px] font-medium cursor-pointer relative flex justify-center text-[rgb(0,0,0,54%)]">Material</h2>
                    }
                )()}
                
            </Link>    
            <Link href="/home/materiais/Ciência da Computação/Eng. Comp II/Resumo" className="flex items-center">
                {(() => {
                    if (pathname == `/materiais/${id}/${idMaterial}/Resumo`) {
                        return <h2 className="text-[25px] font-medium cursor-pointer relative flex justify-center">Resumo<div id="underline" className="bg-[#A39CEC] w-[120%] h-[3px] rounded-full absolute bottom-[-2px]"></div></h2>
                    }
                    return <h2 className="text-[25px] font-medium cursor-pointer relative flex justify-center text-[rgb(0,0,0,54%)]">Resumo</h2>
                    }
                )()}
                
            </Link>    
            <Link href="/home/materiais/Ciência da Computação/Eng. Comp II/Flashcards" className="flex items-center">
                {(() => {
                    if (pathname == `/materiais/${id}/${idMaterial}/Flashcards`) {
                        return <h2 className="text-[25px] font-medium cursor-pointer relative flex justify-center">Flashcards<div id="underline" className="bg-[#A39CEC] w-[120%] h-[3px] rounded-full absolute bottom-[-2px]"></div></h2>
                    }
                    return <h2 className="text-[25px] font-medium cursor-pointer relative flex justify-center text-[rgb(0,0,0,54%)]">Flashcards</h2>
                    }
                )()}
                
            </Link>     
            <Link href="/home/materiais/Ciência da Computação/Eng. Comp II/Quizzes" className="flex items-center">
                {(() => {
                    if (pathname == `/materiais/${id}/${idMaterial}/Quizzes`) {
                        return <h2 className="text-[25px] font-medium cursor-pointer relative flex justify-center">Quizzes<div id="underline" className="bg-[#A39CEC] w-[120%] h-[3px] rounded-full absolute bottom-[-2px]"></div></h2>
                    }
                    return <h2 className="text-[25px] font-medium cursor-pointer relative flex justify-center text-[rgb(0,0,0,54%)]">Quizzes</h2>
                    }
                )()}
                
            </Link>         
        </>
    )
}