"use client";
import { usePathname } from "next/navigation"
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

export default function Configurações({ children, }: { children: React.ReactNode}){
    const pathname = usePathname()
    return(
        <>
  

            <div className=" w-full mx-[20px] h-[calc(100vh-24px)] my-auto bg-white shadow-md rounded-[35px] border border-[#00000031] flex justify-center items-center overflow-hidden">
                <div className="w-[96%] h-[94%] overflow-hidden flex flex-col">
                    <div className=" h-[120px] ">
                        <h1 className="font-medium text-[30px]">Configurações</h1>
                        <div className="w-full mt-5 ">
                            <div className="ml-10 flex justify-between w-[70%] ">
                                <Link href="/home/configuracoes/informacoes">

                                    {(() => {
                                        if (pathname == "/home/configuracoes/informacoes") {
                                            return (
                                                <>
                                                    <h2 className="text-[20px] font-medium cursor-pointer relative flex justify-center">Informações básicas</h2>
                                                    <AnimatePresence>
                                                        <motion.div 
                                                        initial={{scale: 0 }}
                                                        animate={{scale: 1}}
                                                        exit={{scale: 1}}
                                                        className={`w-[170px] origin-center -mb-1 rounded-3xl transition-all ease-in-out h-[3px] bg-[#A39CEC]`}></motion.div> 
                                                    </AnimatePresence>
                                                </>
                                            )
                                        }
                                        return <h2 className="text-[20px] font-medium cursor-pointer relative flex justify-center text-[rgb(0,0,0,54%)]">Informações básicas</h2>
                                        }
                                    )()}

                                </Link>
                                
                                <Link href="/home/configuracoes/personalizacao">

                                    {(() => {
                                        if (pathname == "/home/configuracoes/personalizacao") {
                                            return (
                                                <>
                                                    <h2 className="text-[20px] font-medium cursor-pointer relative flex justify-center">Personalização</h2>
                                                    <AnimatePresence>
                                                        <motion.div 
                                                        initial={{scale: 0 }}
                                                        animate={{scale: 1}}
                                                        exit={{scale: 1}}
                                                        className={`w-[126px] origin-center -mb-1 rounded-3xl transition-all ease-in-out h-[3px] bg-[#A39CEC]`}></motion.div> 
                                                    </AnimatePresence>
                                                </>
                                            )
                                            
                                        }
                                        return <h2 className="text-[20px] font-medium cursor-pointer relative flex justify-center text-[rgb(0,0,0,54%)]">Personalização</h2>
                                        }
                                    )()}

                                </Link>
                                
                                <Link href="/home/configuracoes/notificacao">

                                    {(() => {
                                        if (pathname == "/home/configuracoes/notificacao") {
                                            return (

                                                <>
                                                    <h2 className="text-[20px] font-medium cursor-pointer relative flex justify-center">Notificação</h2>
                                                    <AnimatePresence>
                                                        <motion.div 
                                                        initial={{scale: 0 }}
                                                        animate={{scale: 1}}
                                                        exit={{scale: 1}}
                                                        className={`w-[91px] origin-center -mb-1 rounded-3xl transition-all ease-in-out h-[3px] bg-[#A39CEC]`}></motion.div> 
                                                    </AnimatePresence>
                                                </>
                                            )
                                        }
                                        return <h2 className="text-[20px] font-medium cursor-pointer relative flex justify-center text-[rgb(0,0,0,54%)]">Notificação</h2>
                                        }
                                    )()}

                                </Link>
                                
                                <Link href="/home/configuracoes/conta">

                                    {(() => {
                                        if (pathname == "/home/configuracoes/conta") {
                                            return (
                                                <>
                                                    <h2 className="text-[20px] font-medium cursor-pointer relative flex justify-center">Conta</h2>
                                                    <AnimatePresence>
                                                        <motion.div 
                                                        initial={{scale: 0 }}
                                                        animate={{scale: 1}}
                                                        exit={{scale: 1}}
                                                        className={`w-[56px] origin-center -mb-1 rounded-3xl transition-all ease-in-out h-[3px] bg-[#A39CEC]`}></motion.div> 
                                                    </AnimatePresence>
                                                </>
                                            )
                                        }
                                        return <h2 className="text-[20px] font-medium cursor-pointer relative flex justify-center text-[rgb(0,0,0,54%)]">Conta</h2>
                                        }
                                    )()}

                                </Link>
                            </div>
                            <div className="w-[calc(100%+4.1%)] ml-[-2.1%] h-[2px]  bg-[rgba(0,0,0,0.25)]">
                               
                            </div>
                        </div>
                    </div>

                    <div className="h-[calc(100%-120px)]  pt-1 overflow-y-auto">
                        { children }

                    </div>
                </div>

            </div>
        </>
    
)
}
