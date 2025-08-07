"use client";
import { usePathname } from "next/navigation"
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

export default function Configurações({ children, }: { children: React.ReactNode}){
    const pathname = usePathname()
    return(
        <>
            <div className=" w-full mx-[10px] lg:mx-[20px] h-[calc(100vh-24px)] my-[10px] bg-white shadow-md rounded-[35px] border border-[#00000031] flex justify-center items-center overflow-hidden">
                <div className="w-[96%] h-[94%] overflow-hidden flex flex-col">
                    <div className=" h-[120px] ">
                        <h1 className="flex font-medium text-[30px]">Configurações</h1>
                        <div className="w-full mt-5 overflow-x-auto scrollbar-hide ">
                            <div className=" flex justify-between min-w-[400px] lg:w-[70%] items-end ">
                                <Link href="/home/configuracoes/informacoes">

                                    {(() => {
                                        if (pathname == "/home/configuracoes/informacoes") {
                                            return (
                                                <>
                                                    <h2 className=" text-[15px] lg:text-[20px] font-medium cursor-pointer relative flex justify-center">Informações básicas</h2>
                                                    <AnimatePresence>
                                                        <motion.div 
                                                        initial={{scale: 0 }}
                                                        animate={{scale: 1}}
                                                        exit={{scale: 1}}
                                                        className={`origin-center -mb-1 rounded-3xl transition-all ease-in-out h-[5px] bg-[#A39CEC]`}></motion.div> 
                                                    </AnimatePresence>
                                                </>
                                            )
                                        }
                                        return <h2 className="text-[15px] lg:text-[20px] font-medium cursor-pointer relative flex justify-center text-[rgb(0,0,0,54%)]">Informações básicas</h2>
                                        }
                                    )()}

                                </Link>
                                
                                <Link href="/home/configuracoes/personalizacao">

                                    {(() => {
                                        if (pathname == "/home/configuracoes/personalizacao") {
                                            return (
                                                <>
                                                    <h2 className=" text-[15px] lg:text-[20px] font-medium cursor-pointer relative flex justify-center">Personalização</h2>
                                                    <AnimatePresence>
                                                        <motion.div 
                                                        initial={{scale: 0 }}
                                                        animate={{scale: 1}}
                                                        exit={{scale: 1}}
                                                        className={` origin-center -mb-1 rounded-3xl transition-all ease-in-out h-[5px] bg-[#A39CEC]`}></motion.div> 
                                                    </AnimatePresence>
                                                </>
                                            )
                                            
                                        }
                                        return <h2 className="text-[15px] lg:text-[20px] font-medium cursor-pointer relative flex justify-center text-[rgb(0,0,0,54%)]">Personalização</h2>
                                        }
                                    )()}

                                </Link>
                                
                                <Link href="/home/configuracoes/notificacao">

                                    {(() => {
                                        if (pathname == "/home/configuracoes/notificacao") {
                                            return (

                                                <>
                                                    <h2 className="text-[15px] lg:text-[20px] font-medium cursor-pointer relative flex justify-center">Notificação</h2>
                                                    <AnimatePresence>
                                                        <motion.div 
                                                        initial={{scale: 0 }}
                                                        animate={{scale: 1}}
                                                        exit={{scale: 1}}
                                                        className={` origin-center -mb-1 rounded-3xl transition-all ease-in-out h-[5px] bg-[#A39CEC]`}></motion.div> 
                                                    </AnimatePresence>
                                                </>
                                            )
                                        }
                                        return <h2 className="text-[15px] lg:text-[20px] font-medium cursor-pointer relative flex justify-center text-[rgb(0,0,0,54%)]">Notificação</h2>
                                        }
                                    )()}

                                </Link>
                                
                                <Link href="/home/configuracoes/conta">

                                    {(() => {
                                        if (pathname == "/home/configuracoes/conta") {
                                            return (
                                                <>
                                                    <h2 className="text-[15px] lg:text-[20px] font-medium cursor-pointer relative flex justify-center">Conta</h2>
                                                    <AnimatePresence>
                                                        <motion.div 
                                                        initial={{scale: 0 }}
                                                        animate={{scale: 1}}
                                                        exit={{scale: 1}}
                                                        className={` origin-center -mb-1 rounded-3xl transition-all ease-in-out h-[5px] bg-[#A39CEC]`}></motion.div> 
                                                    </AnimatePresence>
                                                </>
                                            )
                                        }
                                        return <h2 className="text-[15px] lg:text-[20px] font-medium cursor-pointer relative flex justify-center text-[rgb(0,0,0,54%)]">Conta</h2>
                                        }
                                    )()}

                                </Link>
                            </div>
                            <div className="w-[calc(100%+4.1%)] min-w-[407px] ml-[-2.1%] h-[2px]  bg-[rgba(0,0,0,0.25)]">
                               
                            </div>
                        </div>
                    </div>

                    <div className="h-full overflow-y-auto lg:pr-0 pr-1">
                        { children }

                    </div>
                </div>

            </div>
        </>
    
)
}
