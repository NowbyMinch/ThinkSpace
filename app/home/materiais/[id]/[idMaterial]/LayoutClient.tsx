"use client";

import Link from "next/link";
import { usePathname } from "next/navigation"

export default function LayoutClient({ id, idMaterial, }: { id: string; idMaterial: string;}) { 
    const pathname = usePathname();
    return (
        <>
            <div className="flex flex-col w-full h-full relative overflow-hidden ">
                <div className="flex gap-6">
                    <Link href={`/home/materiais/${id}/${idMaterial}/Material`} className="flex items-center">
                        {(() => {
                            if (pathname == `/home/materiais/${id}/${idMaterial}/Material`) {
                                return <h2 className="text-[25px] font-medium cursor-pointer relative flex justify-center">Material</h2>
                            }
                            return <h2 className="text-[25px] font-medium cursor-pointer relative flex justify-center text-[rgb(0,0,0,54%)]">Material</h2>
                            }
                        )()}
                        
                    </Link>    
                    <Link href={`/home/materiais/${id}/${idMaterial}/Resumo`} className="flex items-center">
                        {(() => {
                            if (pathname == `/home/materiais/${id}/${idMaterial}/Resumo`) {
                                return <h2 className="text-[25px] font-medium cursor-pointer relative flex justify-center">Resumo</h2>
                            }
                            return <h2 className="text-[25px] font-medium cursor-pointer relative flex justify-center text-[rgb(0,0,0,54%)]">Resumo</h2>
                            }
                        )()}
                        
                    </Link>    
                    <Link href={`/home/materiais/${id}/${idMaterial}/Flashcards`} className="flex items-center">
                        {(() => {
                            if (pathname == `/home/materiais/${id}/${idMaterial}/Flashcards`) {
                                return <h2 className="text-[25px] font-medium cursor-pointer relative flex justify-center">Flashcards</h2>
                            }
                            return <h2 className="text-[25px] font-medium cursor-pointer relative flex justify-center text-[rgb(0,0,0,54%)]">Flashcards</h2>
                            }
                        )()}
                        
                    </Link>     
                    <Link href={`/home/materiais/${id}/${idMaterial}/Quizzes`} className="flex items-center">
                        {(() => {
                            if (pathname == `/home/materiais/${id}/${idMaterial}/Quizzes`) {
                                return <h2 className="text-[25px] font-medium cursor-pointer relative flex justify-center">Quizzes</h2>
                            }
                            return <h2 className="text-[25px] font-medium cursor-pointer relative flex justify-center text-[rgb(0,0,0,54%)]">Quizzes</h2>
                            }
                        )()}
                    </Link>     
                </div>
                <div className={` ${pathname === `/home/materiais/${id}/${idMaterial}/Resumo` ? "ml-[106px] w-[78px]" : pathname === `/home/materiais/${id}/${idMaterial}/Flashcards` ? "ml-[209px] w-[104px]" : pathname === `/home/materiais/${id}/${idMaterial}/Quizzes` ? "ml-[336px] w-[75px]" : pathname === `/home/materiais/${id}/${idMaterial}/Material` ? "w-[83px]" : "" } transition-all ease-in-out duration-300 bg-[#A39CEC] h-[3px] rounded-full `}></div>
            </div>
        </>
    )
}