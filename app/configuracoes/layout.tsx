"use client";
import { usePathname } from "next/navigation"
import Link from "next/link";

export default function Configurações({ children, }: { children: React.ReactNode}){
    const pathname = usePathname()
    return(
        <>
        <div className="w-full mr-[20px] ml-[20px] h-[calc(100vh-24px)] mt-[12px] mb-[12px] bg-white shadow-md rounded-[35px] border border-[#00000031] flex justify-center items-center">
            <div className="w-[96%] h-[94%] ">
                <h1 className="font-medium text-[45px]">Configurações</h1>
                <div className="w-full mt-5 ">
                    <div className="ml-10 flex justify-between w-[1085px] ">
                        <Link href="/configuracoes/informacoes">

                            {(() => {
                                if (pathname == "/configuracoes/informacoes") {
                                    return <h2 className="text-[25px] font-medium cursor-pointer relative flex justify-center">Informações básicas<div id="underline" className="bg-[#A39CEC] w-[120%] h-[3px] rounded-full absolute bottom-[-2px]"></div></h2>
                                }
                                return <h2 className="text-[25px] font-medium cursor-pointer relative flex justify-center text-[rgb(0,0,0,54%)]">Informações básicas</h2>
                                }
                            )()}

                        </Link>
                        
                        <Link href="/configuracoes/personalizacao">

                            {(() => {
                                if (pathname == "/configuracoes/personalizacao") {
                                    return <h2 className="text-[25px] font-medium cursor-pointer relative flex justify-center">Personalização<div id="underline2" className="bg-[#A39CEC] w-[120%] h-[3px] rounded-full absolute bottom-[-2px]"></div></h2>
                                }
                                return <h2 className="text-[25px] font-medium cursor-pointer relative flex justify-center text-[rgb(0,0,0,54%)]">Personalização</h2>
                                }
                            )()}

                        </Link>
                        
                        <Link href="/configuracoes/notificacao">

                            {(() => {
                                if (pathname == "/configuracoes/notificacao") {
                                    return <h2 className="text-[25px] font-medium cursor-pointer relative flex justify-center">Notificação<div id="underline3" className="bg-[#A39CEC] w-[120%] h-[3px] rounded-full absolute bottom-[-2px]"></div></h2>
                                }
                                return <h2 className="text-[25px] font-medium cursor-pointer relative flex justify-center text-[rgb(0,0,0,54%)]">Notificação</h2>
                                }
                            )()}

                        </Link>
                        
                        <Link href="/configuracoes/conta">

                            {(() => {
                                if (pathname == "/configuracoes/conta") {
                                    return <h2 className="text-[25px] font-medium cursor-pointer relative flex justify-center">Conta<div id="underline4" className="bg-[#A39CEC] w-[120%] h-[3px] rounded-full absolute bottom-[-2px]"></div></h2>
                                }
                                return <h2 className="text-[25px] font-medium cursor-pointer relative flex justify-center text-[rgb(0,0,0,54%)]">Conta</h2>
                                }
                            )()}

                        </Link>
                        
                    </div>
                    <div className="w-[calc(100%+4.1%)] ml-[-2.1%] h-[2px]  bg-[rgba(0,0,0,0.25)]"></div>
                </div>
                
                { children }
            </div>

        </div>
    </>
    
)
}