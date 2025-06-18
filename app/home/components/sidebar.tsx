"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NotebookPen, User, ChartLine, CalendarDays, Cog, LogOut } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import {Tooltip} from "@heroui/react";
import { AnimatePresence, motion } from "framer-motion";
import { Backdrop3 } from "./backdrop";
import { useRouter } from "next/navigation";
import ErrorModal from "@/components/ui/ErrorModal";

type UserData = {
    primeiroNome?: string;
    cargo?: string;
    foto?: string;
    // add other properties if needed
};

export const Sidebar = () => {
    const router = useRouter();
    const pathname = usePathname();
    const [message, setMessage] = useState("");
    const [ logoutPop, setLogoutPop ] = useState(false);
    const [ user, setUser ] = useState<UserData>({})
    
    const handleLogout = async () => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
            method: "POST",
            credentials: "include",
        });

        const data = await res.json();
        if (data.message === "Logout realizado com sucesso"){
            router.push('/');
        }
        console.log(data); 
    };

    type BannerData = {
        relatorioUrl?: string;
        // add other properties if needed
      };
      
      const [ bannerData, setBannerData ] = useState<BannerData>({})
    
      useEffect(() => {
        const banner = async () => {
          try{
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/home/banner`, {
              method: 'GET',
              credentials: 'include',
            });
            
            const data = await res.json();
            setBannerData(data)
          } catch (err) {
            setMessage("Erro ao carregar saudação.");
            console.error(err);
          }
        }; banner();

        const user = async () => {
            try{
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/home/identificacao`, {
                method: 'GET',
                credentials: 'include',
                });
                
                const data = await res.json();
                setUser(data)
            } catch (err) {
                setMessage("Erro ao carregar saudação.");
                console.error(err);
            }
        }; user();

      }, []);
      
    return (
        <>
            {message && (
                <ErrorModal message="" onClose={() => {setMessage("")}}/>
            )}
            <AnimatePresence initial={false}>
                {logoutPop && (
                    <>
                        <motion.div 
                        key="content"
                        initial={{ opacity: 0, scale: 0.85}}
                        animate={{ opacity: 1, scale: 0.94 }}
                        exit={{ opacity: 0, scale: 0.90 }}
                        className={`w-full h-full fixed flex justify-center items-center  opacity-1 z-[1100] `}>
                            
                            <div className="w-full h-full absolute" onClick={() => setLogoutPop(false)}></div>
                            <motion.div 
                            key="content"
                            initial={{ opacity: 0, scale: 0.85}}
                            animate={{ opacity: 1, scale: 0.94 }}
                            exit={{ opacity: 0, scale: 0.90 }}
                            className={`w-[700px] h-[380px] flex rounded-[40px] z-[1100]  opacity-1 `}>

                                <div id="white-box" className={` w-full h-full rounded-[40px] bg-white shadow-md flex justify-center items-center relative overflow-hidden z-[1100] left-[50%] translate-x-[-50%] top-[50%] translate-y-[-50%]`}>
                                    
                                    <Image width={300} height={500} src="/Vector.svg" alt="Decoração" className="absolute top-0 left-[-180px] rotate-90 w-[550px]"/>
                                    <Image width={300} height={500} src="/Vector.svg" alt="Decoração" className="absolute bottom-[-40px] right-[-170px] -rotate-90 w-[550px]"/>

                                    <div className="w-[80%] h-[85%] flex flex-col items-center gap-2 z-[900] ">
                                        <div className="flex flex-col justify-center items-center">
                                            <img src={`${user.foto}`} alt="Foto de perfil" className="rounded-full w-20 h-20"/>
                                            <span className="font-medium text-[30px]">{user.primeiroNome} </span>
                                            <span className="text-[20px]"></span>
                                        </div>

                                        <h1 className="text-center text-[35px] font-medium">Saindo da conta. Até a próxima sessão!</h1>
                                        <div className="w-[60%] flex justify-between mt-auto">
                                            <motion.button 
                                            whileHover={{ scale: 1.03 }}
                                            whileTap={{ scale: 0.97 }}
                                            onClick={() => setLogoutPop(false)}
                                            className="w-[140px] rounded-[20px] text-[26px] bg-[#F1F1F1] border border-[rgba(68,68,68, 0.17)]">
                                                Voltar
                                            </motion.button>
                                            <motion.button 
                                            whileHover={{ scale: 1.03 }}
                                            whileTap={{ scale: 0.97 }}
                                            onClick={() => {setLogoutPop(false); handleLogout()}}
                                            className="w-[140px] rounded-[20px] text-[26px] text-white bg-[#9767F8] border border-[rgba(68,68,68, 0.17)]">
                                                Sair
                                            </motion.button>
                                        </div>

                                    </div>
                                </div>
                            </motion.div>
                            
                            
                        </motion.div>
                            
                            
                        <div className="w-full absolute flex justify-center items-center bg-red-500">
                            <Backdrop3 onClick={() => setLogoutPop(false)}/>
                        </div>
                    </>
                )}
            </AnimatePresence>

            <div className=" min-w-[118px] h-[calc(100vh-24px)] min-h-fit flex flex-col items-center mt-[12px] ml-4 z-[100]">
                <nav className="bg-white min-w-[118px] min-h-fit h-[calc(100vh-24px)] flex flex-col  items-center border border-[#00000031] shadow-md rounded-[70px] fixed ">
                    
                    <div className=" h-[92%] max-h-[1000px] px-1 flex flex-col justify-between items-center overflow-hidden ">

                        <Link className="relative" href="/home">
                            <Tooltip closeDelay={0} content="Menu Principal" placement="right" className="w-fit text-[18px]" showArrow={true}>
                                <motion.div
                                    initial={{ scale: 1 }}
                                    whileHover="hovered"
                                    whileTap={{ scale: 0.95 }}
                                    variants={{
                                        hovered: { scale: 1.05}
                                    }}
                                    className="w-16 h-[67px] mt-5 cursor-pointer relative"
                                >
                                    {/* Show only the correct icon */}
                                    {pathname === "/home" ? (
                                        <>
                                            <motion.img
                                                src="/Light Bulb.png"
                                                width={300}
                                                height={500}
                                                alt="Logo"
                                                className="z-10 w-full absolute"
                                                variants={{
                                                    hovered: { scale: 1.1}
                                                }}
                                                initial={{ opacity: 1 }}
                                                animate={{ opacity: 1 }}
                                                />
                                            <motion.img 
                                            src="/Light Bulb-off.png" width={300} height={500} alt="Logo" className=" w-full "/>
                                        </>
                                    
                                    ) : (
                                        <>
                                            <motion.img
                                                src="/Light Bulb-off.png"
                                                width={300}
                                                height={500}
                                                alt="Logo"
                                                className="z-10 w-full absolute"
                                                initial={{ scale: 1 }}
                                                animate={{ opacity: 1 }}
                                            />
                                            <motion.img src="/Light Bulb.png" width={300} height={500} 
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 0 }}
                                            variants={{
                                                hovered: {scale: 1}
                                            }}
                                            alt="Logo" className=" scale-100 w-full absolute opacity-1 "/>
                                        </>
                                    )}
                                </motion.div>
                            </Tooltip>
                        </Link>

                        <div className="flex flex-col items-center gap-[45px]">
                            <Link href="/home/materiais" className="">
                                {(() => {
                                    if (pathname == "/home/materiais") {
                                        return (
                                            <>
                                                <AnimatePresence>
                                                    <Tooltip closeDelay={0} content="Materiais" placement="right" className="w-fit text-[18px]" showArrow={true}>
                                                        <motion.button 
                                                        initial={{ backgroundColor: "#A39CEC", scale: 0.8 }}
                                                        animate={{ scale: 1 }}
                                                        whileHover={{ scale: 1.05}}
                                                        whileTap={{ scale: 0.95}}
                                                        transition={{ duration: 0.2, ease: "easeInOut" }}
                                                        className="relative p-[15px] rounded-full bg-[#A39CEC]"> 
                                                            <NotebookPen className= "size-[45px] cursor-pointer text-white "/>
                                                        </motion.button>

                                                    </Tooltip>
                                                </AnimatePresence>
                                            </>
                                        )
                                    }
                                    return (
                                        <Tooltip closeDelay={0} content="Materiais" placement="right" className="w-fit text-[18px]" showArrow={true}>
                                            <motion.button 
                                            whileHover={{ scale: 1.05}}
                                            whileTap={{ scale: 0.95}}
                                            id="side_pop" className="relative p-[15px] rounded-full "> 
                                                <NotebookPen className= "size-[45px] cursor-pointer text-black "/>
                                            </motion.button>
                                        </Tooltip>
                                    )
                                })()}
                            </Link>
                            
                            <Link href="/home">
                                <Tooltip closeDelay={0} content="Comunidades" placement="right" className="w-fit text-[18px]" showArrow={true}>
                                    <motion.button 
                                    whileHover={{ scale: 1.05}}
                                    whileTap={{ scale: 0.95}}
                                    id="side_pop" className="relative p-[15px] rounded-full "> 
                                        <User className= "size-[45px] cursor-pointer text-black "/>
                                    </motion.button>
                                </Tooltip>
                            </Link>

                            <Link href={`/home/${bannerData.relatorioUrl}`}>
                                {(() => {
                                    if (pathname.endsWith("/metrica") && pathname.startsWith("/home/users/")) {
                                        return (
                                            <>
                                                <AnimatePresence>
                                                    <Tooltip closeDelay={0} content="Métricas" placement="right" className="w-fit text-[18px]" showArrow={true}>

                                                        <motion.button 
                                                        whileHover={{ scale: 1.05}}
                                                        whileTap={{ scale: 0.95}}
                                                        initial={{ backgroundColor: "#A39CEC", scale: 0.8 }}
                                                        animate={{ scale: 1 }}
                                                        transition={{ duration: 0.2, ease: "easeInOut" }}
                                                        id="side_pop" className="relative p-[15px] rounded-full bg-[#A39CEC]"> 
                                                            <ChartLine className= "size-[45px] cursor-pointer text-white "/>
                                                        </motion.button>

                                                    </Tooltip>
                                                </AnimatePresence>
                                            </>
                                        )
                                    }
                                    return (
                                        <Tooltip closeDelay={0}  content="Métricas" placement="right" className="w-fit text-[18px]" showArrow={true}>
                                            <motion.button 
                                            whileHover={{ scale: 1.05}}
                                            whileTap={{ scale: 0.95}} 
                                            id="side_pop" onMouseDown={() => {console.log(pathname)}} className="relative p-[15px] rounded-full "> 
                                                <ChartLine className= "size-[45px] cursor-pointer text-black "/>
                                            </motion.button>
                                        </Tooltip>
                                    )
                                })()}
                            </Link>

                            <Link href="/home">
                                <Tooltip closeDelay={0} content="Calendário" placement="right" className="w-fit text-[18px]" showArrow={true}>
                                    <motion.button 
                                    whileHover={{ scale: 1.05}}
                                    whileTap={{ scale: 0.95}}
                                    id="side_pop" className="relative p-[15px] rounded-full "> 
                                        <CalendarDays className= "size-[45px] cursor-pointer text-black "/>
                                    </motion.button>
                                </Tooltip>
                            </Link>

                            <Link href="/home/configuracoes/informacoes">
                                {(() => {
                                    if (pathname == "/home/configuracoes/informacoes" || pathname == "/home/configuracoes/notificacao" || pathname == "/home/configuracoes/personalizacao" || pathname == "/home/configuracoes/conta") {
                                        return (
                                            <>
                                                <AnimatePresence>
                                                    <Tooltip closeDelay={0} content="Configuração" placement="right" className="w-fit text-[18px]" showArrow={true}>
                                                            <motion.button 
                                                            whileHover={{ scale: 1.05}}
                                                            whileTap={{ scale: 0.95}}
                                                            initial={{ backgroundColor: "#A39CEC", scale: 0.8 }}
                                                            animate={{ scale: 1 }}
                                                            transition={{ duration: 0.2, ease: "easeInOut" }}
                                                            id="side_pop" className="relative p-[15px] rounded-full bg-[#A39CEC]"> 

                                                                <Cog className= "size-[45px] cursor-pointer text-white "/>
                                                                
                                                            </motion.button>
                                                    </Tooltip>

                                                </AnimatePresence>
                                            </>
                                        )
                                    }
                                    
                                    return (
                                        <Tooltip closeDelay={0} content="Configuração" placement="right" className="w-fit text-[18px]" showArrow={true}>
                                            <motion.button 
                                            whileHover={{ scale: 1.05}}
                                            whileTap={{ scale: 0.95}}
                                            id="side_pop" className="relative p-[15px] rounded-full "> 
                                                <Cog className= "size-[45px] cursor-pointer text-black "/>
                                            </motion.button>
                                        </Tooltip>
                                    )
                                })()}
                            </Link>

                        </div>
                            
                        <Tooltip closeDelay={0} content="Sair" placement="right" className="w-fit text-[18px]" showArrow={true}>
                            <motion.button 
                            whileHover={{ scale: 1.05}}
                            whileTap={{ scale: 0.95}}
                            onClick={ () => setLogoutPop(true)} id="side_pop" className="relative p-[15px] rounded-full "> 
                                <LogOut className= "size-[45px] cursor-pointer text-black "/>
                            </motion.button>
                        </Tooltip>
                    </div>
                </nav>
            </div>
        </>
    );
};
