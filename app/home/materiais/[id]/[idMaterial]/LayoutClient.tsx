"use client";

import Link from "next/link";
import { usePathname, redirect, useParams } from "next/navigation"
import { Reply, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Backdrop3 } from "@/app/home/components/backdrop";
import Loading from "@/app/home/components/loading";
import { useRouter } from 'next/navigation'; 

type UserData = {
    primeiroNome?: string;
    cargo?: string;
    foto?: string;
    // add other properties if needed
};

export default function LayoutClient({ id, idMaterial, }: { id: string; idMaterial: string;}) { 
    const pathname = usePathname();
    const [ concluiu, setConcluiu ] = useState(false);
    // const [message, setMessage] = useState<string | null>(null);
    const [ user, setUser ] = useState<UserData>({})
    const [ documento, setDocumento ] = useState(false);
    const [ loading, setLoading ] = useState(true);



    useEffect(() => {
        const user = async () => {
            try{
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/home/identificacao`, {
                method: 'GET',
                credentials: 'include',
                });
                
                const data = await res.json();
                setUser(data)
            } catch (err) {
                // setMessage("Erro ao carregar saudação.");
                console.error(err);
            }
        }; user();
        
        const material = async () => {
            try{
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/materiais/${idMaterial}`, {
                method: 'GET',
                credentials: 'include',
                });
                
                const data = await res.json();

                if (data.material.origem === "DOCUMENTO"){
                    setDocumento(true);
                }
                setLoading(false);

            } catch (err) {
                console.error(err);
            }
            
        }; material();
        
    }, []);
    
    const Concluir = async () => {
        const router = useRouter();

        try{
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/materiais/concluir/${idMaterial}`, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            });
            
            const data = await res.json();
            console.log(data);
            if (data === 'Material concluído! Você ganhou +20 XP por participação.'){
                setConcluiu(true);
                router.push(`/home/materiais/${id}`)
                
            }

        } catch (err) {
            console.error(err);
        }
        
    }; 
    
    if (loading) return ;
    
    return (
        <>
            <AnimatePresence initial={false}>
                {concluiu && (
                    <>
                        <motion.div 
                        key="content"
                        initial={{ opacity: 0, scale: 0.85}}
                        animate={{ opacity: 1, scale: 0.94 }}
                        exit={{ opacity: 0, scale: 0.90 }}
                        className={`w-full h-full fixed top-0 left-0  flex justify-center items-center  opacity-1 z-[1100] `}>
                            
                            <div className="w-full h-full absolute" ></div>
                            <motion.div 
                            key="content"
                            initial={{ opacity: 0, scale: 0.85}}
                            animate={{ opacity: 1, scale: 0.94 }}
                            exit={{ opacity: 0, scale: 0.90 }}
                            className={`w-[790px] h-[300px] max-w-[90%] flex justify-center items-center rounded-[40px] z-[1100] opacity-1 `}>

                                <div id="white-box" className={` w-[100%] h-full rounded-[40px] bg-white shadow-md flex justify-center items-center relative overflow-hidden z-[1100] top-[50%] translate-y-[-50%]`}>
                                    
                                    <div className="absolute top-[-40px] left-[-100px] w-[140%]">
                                        <Image width={300} height={500} src="/concluir.svg"  alt="Decoração" className="w-full"/>
                                    </div>

                                    <div className="w-[80%] h-[85%] flex flex-col items-center gap-2 z-[900] ">
                                        <div className="flex flex-col justify-center items-center">
                                            <img src={`${user.foto}`} alt="Foto de perfil" className="rounded-full w-20 h-20"/>
                                            <span className="font-medium text-[30px]">{user.primeiroNome} </span>
                                            <span className="text-[20px]"></span>
                                        </div>

                                        <h1 className="text-center text-[30px] font-medium">Missão cumprida!</h1>
                                        {/* <div className="w-full h-2 rounded-full bg-[rgba(16,19,46,0.14)]">
                                            <div className="w-[20%] h-2 rounded-full bg-[#A39CEC]"></div>
                                        </div> */}
                                        {/* <div className="w-full flex justify-center items-center">
                                            <span className="min-w-max pr-2 text-[20px] font-medium"><span className="text-[rgba(249,42,70,0.6)]">150px</span> <span className="text-[#7BC396]">+ 22px</span>
                                            </span>

                                            <div className=" w-full h-[4px] bg-[rgb(150,150,150)] flex rounded-full justify-end items-center">
                                                <ChevronRight className="text-[rgb(150,150,150)] -mr-3 size-8"/>
                                            </div>           

                                            <span className="pl-2 text-[20px] text-[#7BC396]">170px </span>
                                        </div> */}

                                        <div className="w-[60%] flex justify-center mt-auto ">
                                            <motion.button 
                                            whileHover={{ scale: 1.03 }}
                                            whileTap={{ scale: 0.97 }}
                                            onClick={() => {setConcluiu(false); redirect(`/home/materiais/${id}`)} }
                                            className="w-[180px] rounded-[20px] text-[26px] text-white bg-[#9767F8] border border-[rgba(68,68,68, 0.17)]">
                                                Finalizar
                                            </motion.button>
                                        </div>

                                    </div>
                                </div>
                            </motion.div>
                                                    
                                                    
                        </motion.div>
                            
                        <div className="w-full absolute flex justify-center items-center ">
                            <Backdrop3 onClick={() => {}}/>
                        </div>
                    </>
                )}
            </AnimatePresence>

            <div className="flex w-full h-full relative ">
                <div className="flex flex-col w-full h-full relative  gap-2">
                    <div className="flex justify-between gap-2 overflow-x-scroll overflow-y-visible scrollbar-hide ">
                        <div className="flex justify-between gap-2">
                            {/* {documento && (
                                <>
                                    <Link href={`/home/materiais/${id}/${idMaterial}/Material`}>
                                        {(() => {
                                            if (pathname == `/home/materiais/${id}/${idMaterial}/Material`) {
                                                return (
                                                    <>
                                                        <h2 className="text-[15px] lg:text-[20px] font-medium cursor-pointer relative flex justify-center">
                                                        Material
                                                        <AnimatePresence>
                                                            <motion.div
                                                            initial={{ scaleX: 0 }}
                                                            animate={{ scaleX: 1 }}
                                                            exit={{ scaleX: 0 }}
                                                            className="absolute bottom-0 left-0 right-0 h-[4px] bg-[#A39CEC] origin-left rounded-3xl"
                                                            />
                                                        </AnimatePresence>
                                                        </h2>
                                                        
                                                    </>
                                                )
                                            }
                                            return <h2 className="text-[15px] lg:text-[20px] font-medium cursor-pointer relative flex justify-center text-[rgb(0,0,0,54%)]">Material</h2>
                                            }
                                        )()}

                                    </Link>
                                </>
                            )} */}
                            <Link href={`/home/materiais/${id}/${idMaterial}/Resumo`}>
                                {(() => {
                                    if (pathname == `/home/materiais/${id}/${idMaterial}/Resumo`) {
                                        return (
                                            <>
                                                <h2 className="text-[15px] lg:text-[20px] font-medium cursor-pointer relative flex justify-center">
                                                Resumo
                                                <AnimatePresence>
                                                    <motion.div
                                                    initial={{ scaleX: 0 }}
                                                    animate={{ scaleX: 1 }}
                                                    exit={{ scaleX: 0 }}
                                                    className="absolute bottom-0 left-0 right-0 h-[4px] bg-[#A39CEC] origin-left rounded-3xl"
                                                    />
                                                </AnimatePresence>
                                                </h2>

                                            </>
                                        )
                                    }
                                    return <h2 className="text-[15px] lg:text-[20px] font-medium cursor-pointer relative flex justify-center text-[rgb(0,0,0,54%)]">Resumo</h2>
                                    }
                                )()}

                            </Link>
                            
                            <Link href={`/home/materiais/${id}/${idMaterial}/Flashcards`}>
                                {(() => {
                                    if (pathname == `/home/materiais/${id}/${idMaterial}/Flashcards`) {
                                        return (
                                            <>
                                                <h2 className="text-[15px] lg:text-[20px] font-medium cursor-pointer relative flex justify-center">
                                                Flashcards
                                                <AnimatePresence>
                                                    <motion.div
                                                    initial={{ scaleX: 0 }}
                                                    animate={{ scaleX: 1 }}
                                                    exit={{ scaleX: 0 }}
                                                    className="absolute bottom-0 left-0 right-0 h-[4px] bg-[#A39CEC] origin-left rounded-3xl"
                                                    />
                                                </AnimatePresence>
                                                </h2>
                                            </>
                                        )
                                    }
                                    return <h2 className="text-[15px] lg:text-[20px] font-medium cursor-pointer relative flex justify-center text-[rgb(0,0,0,54%)]">Flashcards</h2>
                                    }
                                )()}

                            </Link>
                            
                            <Link href={`/home/materiais/${id}/${idMaterial}/Quizzes`}>
                                {(() => {
                                    if (pathname == `/home/materiais/${id}/${idMaterial}/Quizzes`) {
                                        return (
                                            <>
                                                <h2 className="text-[15px] lg:text-[20px] font-medium cursor-pointer relative flex justify-center">
                                                Quizzes
                                                <AnimatePresence>
                                                    <motion.div
                                                    initial={{ scaleX: 0 }}
                                                    animate={{ scaleX: 1 }}
                                                    exit={{ scaleX: 0 }}
                                                    className="absolute bottom-0 left-0 right-0 h-[4px] bg-[#A39CEC] origin-left rounded-3xl"
                                                    />
                                                </AnimatePresence>
                                                </h2>
                                            </>
                                        )
                                    }
                                    return <h2 className="text-[15px] lg:text-[20px] font-medium cursor-pointer relative flex justify-center text-[rgb(0,0,0,54%)]">Quizzes</h2>
                                    }
                                )()}

                            </Link>

                        </div>

                        <div className="flex gap-2">
                            <Link href={``} className="">
                                <motion.button 
                                whileTap={{ scale:0.98 }}
                                whileHover={{ scale:1.02 }}
                                onClick={() => Concluir()}
                                className="flex bg-[#A39CEC] justify-center items-center text-white h-fit px-2 rounded-full text-[15px] lg:text-[20px] font-medium cursor-pointer relative  ">
                                    Concluir 
                                </motion.button>
                            </Link>

                            <Link href={`/home/materiais/${id}`} className="">
                                
                                <motion.button 
                                whileTap={{ scale:0.98 }}
                                whileHover={{ scale:1.02 }}
                                className="flex bg-[#A39CEC] justify-center items-center text-white h-fit px-2 rounded-full text-[15px] lg:text-[20px] font-medium cursor-pointer relative ">
                                    <Reply className="reply"/> Voltar
                                </motion.button>
                            </Link>

                        </div>


                    </div>
                    {/* <div className={` ${pathname === `/home/materiais/${id}/${idMaterial}/Resumo` ? "ml-[106px] w-[78px]" : pathname === `/home/materiais/${id}/${idMaterial}/Flashcards` ? "ml-[209px] w-[104px]" : pathname === `/home/materiais/${id}/${idMaterial}/Quizzes` ? "ml-[336px] w-[75px]" : pathname === `/home/materiais/${id}/${idMaterial}/Material` ? "w-[83px]" : "" } transition-all ease-in-out duration-300 bg-[#A39CEC] h-[3px] rounded-full `}></div> */}
                </div>

                
            
            </div>
        </>
    )
}