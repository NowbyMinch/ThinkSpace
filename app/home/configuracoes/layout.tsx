"use client";
import { usePathname } from "next/navigation"
import Link from "next/link";

export default function Configurações({ children, }: { children: React.ReactNode}){
    const pathname = usePathname()
    return(
        <>
  

            <div className="w-full mr-[20px] ml-[20px] h-[calc(100vh-24px)] mt-[12px] mb-[12px] bg-white shadow-md rounded-[35px] border border-[#00000031] flex justify-center items-center overflow-hidden">
                <div className="w-[96%] h-[94%] overflow-hidden flex flex-col gap-2">
                    <div className=" h-[120px] ">
                        <h1 className="font-medium text-[45px]">Configurações</h1>
                        <div className="w-full mt-5 ">
                            <div className="ml-10 flex justify-between w-[1085px] ">
                                <Link href="/home/configuracoes/informacoes">

                                    {(() => {
                                        if (pathname == "/home/configuracoes/informacoes") {
                                            return <h2 className="text-[25px] font-medium cursor-pointer relative flex justify-center">Informações básicas</h2>
                                        }
                                        return <h2 className="text-[25px] font-medium cursor-pointer relative flex justify-center text-[rgb(0,0,0,54%)]">Informações básicas</h2>
                                        }
                                    )()}

                                </Link>
                                
                                <Link href="/home/configuracoes/personalizacao">

                                    {(() => {
                                        if (pathname == "/home/configuracoes/personalizacao") {
                                            return <h2 className="text-[25px] font-medium cursor-pointer relative flex justify-center">Personalização</h2>
                                        }
                                        return <h2 className="text-[25px] font-medium cursor-pointer relative flex justify-center text-[rgb(0,0,0,54%)]">Personalização</h2>
                                        }
                                    )()}

                                </Link>
                                
                                <Link href="/home/configuracoes/notificacao">

                                    {(() => {
                                        if (pathname == "/home/configuracoes/notificacao") {
                                            return <h2 className="text-[25px] font-medium cursor-pointer relative flex justify-center">Notificação</h2>
                                        }
                                        return <h2 className="text-[25px] font-medium cursor-pointer relative flex justify-center text-[rgb(0,0,0,54%)]">Notificação</h2>
                                        }
                                    )()}

                                </Link>
                                
                                <Link href="/home/configuracoes/conta">

                                    {(() => {
                                        if (pathname == "/home/configuracoes/conta") {
                                            return <h2 className="text-[25px] font-medium cursor-pointer relative flex justify-center">Conta</h2>
                                        }
                                        return <h2 className="text-[25px] font-medium cursor-pointer relative flex justify-center text-[rgb(0,0,0,54%)]">Conta</h2>
                                        }
                                    )()}

                                </Link>
                            </div>
                            <div className="w-[calc(100%+4.1%)] ml-[-2.1%] h-[2px]  bg-[rgba(0,0,0,0.25)]">
                                <div 
                                className={`${ pathname === "/home/configuracoes/conta"?  "w-[74px] ml-[1092px]": pathname === "/home/configuracoes/personalizacao"?  "w-[180px] ml-[447px]" : pathname === "/home/configuracoes/informacoes"?  "w-[242px] ml-[55px]" : pathname === "/home/configuracoes/notificacao"?  "w-[140px] ml-[785px]" : "" } transition-all ease-in-out duration-300  h-[3px] bg-[#A39CEC]`}></div> 
                            </div>
                        </div>
                    </div>

                    <div className="h-[calc(100%-120px)] pt-1 overflow-y-auto">
                        { children }

                    </div>
                </div>

            </div>
        </>
    
)
}
