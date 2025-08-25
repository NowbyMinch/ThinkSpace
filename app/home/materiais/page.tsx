"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {  useState, useEffect, useRef } from 'react';
import { Backdrop3 } from "../components/backdrop";
import ErrorModal from "@/components/ui/ErrorModal";
import Loading from "@/app/home/components/loading";
import {
  CirclePlus, Heart, Globe, Monitor, CodeXml, HeartPulse,
  Minus, Divide, X, Plus, Search, ChevronRight, ChevronsLeft,
  ChevronsRight, ChevronLeft, AlarmClock, Bell, Book,
  Bookmark, Calendar, Check, Clipboard, Clock,
  Code, Cpu, Database, Download, Edit, Eye, File, Filter, Flag,
  Folder, GitBranch, Globe2, Grid, Hash, Headphones, HelpCircle,
  Home, Inbox, Info, Key, Layers, Layout, LifeBuoy, Lightbulb, List,
  Loader, Lock, LogIn, LogOut, Mail, Map, Menu, SquareX, 
  SquarePen,
  Ellipsis
} from "lucide-react";
import { colors, icons, cor } from "@/app/home/components/icons";

type materiaItem = {
    id?: string;
    nome?: string;
    cor?: string;
    icone?: string;
    usuarioId?: string;
    materiais?: any[]; // or specify the correct type if known
    // add other properties if needed
};

type criar = {
    nome?: string;
    cor?: string;
    icone?: string;
    // add other properties if needed
};

type editar = {
    id?: string;
    nome?: string;
    cor?: string;
    icone?: string;
    // add other properties if needed
};

type UserData = {
    primeiroNome?: string;
    cargo?: string;
    foto?: string;
    // add other properties if needed
};
type RecenteData = {
    indice?: number;
    nome?: string;
    id?: string;
    cor?: string;
    icone?: string;
    ultimaRevisao?: number;
    tempoAtivo?: number;
};
export type UserXP = {
    maxXp: number;
    avatar: string;
    cargo: string;
    nivel: string;
    primeiroNome: string;
    progresso: number;
    xp: number;
};

export default function Materiais() {
    // Estados de controle de interface
    const [open, setOpen] = useState(false);
    const [editar, setEditar] = useState(false);
    const [selected, setSelected] = useState<string | null>(null);
    const [color, setColor] = useState<string | "">("");
    const [openPop, setOpenPop] = useState<number | null>(null);
    const [message, setMessage] = useState<string | null>(null);
    const [deletarPop, setDeletarPop] = useState(false);
    const [deletar, setDeletar] = useState("");
    const [ loading, setLoading ] = useState(true);
    const [ recente, setRecente ] = useState<RecenteData[]>([])

    // Dados do usuário
    const [user, setUser] = useState<UserData>({});
    // const [ perfil, setPerfil ] = useState<perfil | null []>({})

    // Referências de elementos
    const popoverRefs = useRef<(HTMLDivElement | null)[]>([]);
    const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

    // Dados de matérias
    const [materias, setMaterias] = useState<materiaItem[]>([]);
    const [criarMateria, setCriarMateria] = useState<criar>({});
    const [temp, setTemp] = useState<editar[]>([]);
    const [userXP, setUserXP] = useState<UserXP>();
    // const [recentes, setRecentes] = useState<recentesData[]>([]);

    // Constantes
    const cores = {
    ROXO: "#8B81F3",
    LILAS: "#CAC5FF",
    ROSA: "#FFA6F1",
    SALMAO: "#FFACA1",
    };

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            const target = event.target as Node;

            if (
            openPop !== null &&
            popoverRefs.current[openPop] &&
            !popoverRefs.current[openPop]!.contains(target) &&
            buttonRefs.current[openPop] &&
            !buttonRefs.current[openPop]!.contains(target)
            ) {
            setOpenPop(null);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
        document.removeEventListener("mousedown", handleClickOutside);

    };}, [openPop]);

    useEffect(() => {
        
        const materia = async () => {
            try{
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/materias`, {
                    method: 'GET',
                    credentials: 'include',
                });
                
                const data = await res.json();
                setMaterias(data)
            } catch (err) {
                console.error(err);
            }
            
        }; materia();

        const user = async () => {
            try{
                setLoading(true);
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/home/identificacao`, {
                    method: 'GET',
                    credentials: 'include',
                });
                
                const data = await res.json();
                console.log("User: ", data)
                setUser(data)
                console.log("complete");
                setLoading(false);
                
            } catch (err) {
                setMessage("Erro ao carregar saudação.");
                console.error(err);
            }
        }; user();

        const recentes = async () => {
            try{
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/materias/recentes`, {
                method: 'GET',
                credentials: 'include',
                });
                
                const data = await res.json();

                if (data.materiasRecentes){
                    setRecente(data.materiasRecentes);
                }

            } catch (err) {
                console.error(err);
            }
            
        }; recentes();
        
        const ranking = async () => {
          try{
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/materias/perfil`, {
              method: 'GET',
              credentials: 'include',
            });
            
            const data = await res.json();
            setUserXP(data);
            console.log(data);
            setLoading(false);

          } catch (err) {
            console.error(err);
          }
1        }; ranking();

    }, []);

    useEffect(() => {
        console.log("UserXP: ", userXP);
    }, [userXP]);

    useEffect(() => {
        setTemp([{ nome: criarMateria.nome, cor: criarMateria.cor, icone: criarMateria.cor }]);
    }, []);
    
    // Função para buscar matérias
    const materia = async () => {
        try{
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/materias`, {
                method: 'GET',
                credentials: 'include',
            });
            
            const data = await res.json();
            setMaterias(data)
        } catch (err) {
        console.error(err);
        }
    };

    // Função para criar nova matéria
    const criar = async () => {
        console.log(criarMateria)

        try{
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/materias`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(criarMateria),
                credentials: "include",
            });
            
            const data = await res.json();
            console.log(data)
            if (data.message === "Matéria criada com sucesso."){
                closing()
                
            }
            else{
                setMessage(data.message)
            }
        } catch (err) {
        console.error(err);
        }
        materia();
    };

    // Função para criar nova matéria
    const deletarMateria = async (id: string) => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/materias/${id}`, {
                method: "DELETE",
                credentials: "include",
            });

            const result = await res.json();
            console.log(result.message); // Matéria excluída com sucesso.

            materia(); 

        } catch (error) {
            console.error("Erro ao deletar matéria:");
        }
    };

    // Função para criar nova matéria
    const editarMateria = async (id: string, body: { nome?: string; cor?: string; icone?: string }) => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/materias/${id}`, {
                method: "PATCH",
                credentials: "include",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(criarMateria),
            });

            const result = await res.json();
            console.log(result.message); // Matéria excluída com sucesso.
            
            materia(); 
            closing();

        } catch (error) {
            console.error("Erro ao deletar matéria:");
        }
    };
    function closing(){
        setOpen(false);
        setEditar(false);
        setSelected(null);
        setColor("");
        setCriarMateria({ nome: "", cor: "", icone: "" })
    }
    if (loading) return <Loading />;
    return( 
        <>
        {message && (
            <ErrorModal message={message} onClose={() => setMessage(null)} />
        )}
        <AnimatePresence initial={false}>
            {open && (
                <motion.div 
                key="content"
                initial={{ opacity: 0, scale: 0.85}}
                animate={{ opacity: 1, scale: 0.94 }}
                exit={{ opacity: 0, scale: 0.90 }}
                
                className={`w-full h-full absolute opacity-1 z-[1100] `}>
                    <div className="w-full h-full absolute" onClick={() => closing()}></div>

                    <div id="white-box" className={`w-[1250px] max-w-[95%] min-h-[95%] lg:min-h-[650px] h-[650px] max-h-[95%] rounded-[50px] z-[1100] left-[50%] translate-x-[-50%] top-[50%] translate-y-[-50%] bg-white shadow-md flex justify-center items-center relative overflow-hidden `}>
                        
                        <X className="absolute top-5 right-8 size-6 cursor-pointer" onClick={() => closing()}/>
                        <Image width={300} height={500} src="/Vector.svg" alt="Decoração" className="absolute top-0 left-[-140px] rotate-90 w-[550px]"/>
                        <Image width={300} height={500} src="/Vector.svg" alt="Decoração" className="absolute bottom-[-40px] right-[-130px] -rotate-90 w-[550px]"/>

                        <div className=" w-[90%] h-[90%] lg:w-[80%] lg:h-[92%] mt-auto lg:mb-4 flex flex-col items-center gap-10 z-[900] overflow-y-auto pr-2 pb-4">
                            <h1 className="text-center text-[30px] font-medium">Como você deseja criar a matéria?</h1>
                            <div className="w-full flex lg:flex-row flex-col justify-between lg:gap-0 gap-4">
                                <div className=" w-full lg:w-[47%] flex flex-col gap-2">
                                    <div className="">
                                        <h2 className="text-[18px] font-medium ">Nome da matéria:</h2>
                                        <input type="text" id="nome_materia" onChange={(e) => {setCriarMateria({...criarMateria, nome: e.target.value }); console.log(criarMateria)}} placeholder="Nome da matéria" className="pl-5 text-[18px] w-full py-2 border-2 border-[rgba(0,0,0,0.19)] rounded-[20px] outline-[rgba(151,103,248,0.6)]"/>

                                    </div>

                                    <div className="">
                                        <h2 className="text-[18px] font-medium">Cores:</h2>
                                        <div className="flex gap-1">
                                            {colors.map((color) => (
                                                <motion.button 
                                                whileTap={{ scale: 0.95 }} 
                                                whileHover={{ scale: 1.02 }}
                                                key={color} style={{backgroundColor: color}} onClick={() => {setCriarMateria({...criarMateria, cor: cor[color as keyof typeof cor] }); setColor(color); } } className={`w-[30px] h-[30px] rounded-full cursor-pointer`}></motion.button>
                                            ))}
                                        </div>
                                        <div/>
                                    </div>

                                    <div className="">
                                        <h2 className="text-[18px] font-medium">Ícone desejado:</h2>
                                        <div className="w-full h-[140px] border-2 border-[rgba(0,0,0,0.19)] rounded-[25px] flex justify-center items-center ">
                                            <div className=" max-w-[92%] overflow-y-auto h-[85%] flex flex-wrap gap-2 overflow-x-hidden items-center pb-1">
                                                {icons.map(({ id, Icon }) => (
                                                    <motion.button
                                                        whileTap={{ scale: 0.95 }}
                                                        whileHover={{ scale: 1.02 }}
                                                        id="icone"
                                                        key={id}
                                                        onClick={() => {setCriarMateria({...criarMateria, icone: id }); setSelected(id) }}
                                                    >
                                                        <Icon className="size-5" />
                                                    </motion.button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className=" w-[438px] max-w-full lg:w-[47%] lg:mx-0 mx-auto">
                                    <div className=" w-full h-[320px] lg:h-full max-h-[320px] rounded-[25px] bg-[#EFEFEF] flex flex-col items-center justify-center">
                                        <h2 className="w-[85%] h-[60px] flex font-medium text-[25px]">Pré-visualização:</h2>
                                        <div style={{backgroundColor: color || "white"}} className="w-[85%] h-[70%] max-h-[220px] rounded-[25px] flex justify-center items-center">
                                            <div className="w-[85%] h-[85%] flex items-center">
                                                <div className={`${selected ? "w-[54%]": "w-full" } flex flex-col gap-4`}  >
                                                    <h1 className="w-[210px] line-clamp-2 break-words material_title leading-none font-medium ">{ criarMateria.nome?.trim() !== "" ? criarMateria.nome : "Nome da matéria"}</h1>
                                                    <div className="text-[18px]">
                                                        <h2 className="material_text leading-none">Materiais de estudo: 0</h2>
                                                        <h2 className="material_text leading-none">Tempo ativo: Sem dados</h2>
                                                        <h2 className="material_text leading-none">Última revisão: Sem dados</h2>
                                                    </div>
                                                </div>

                                                <div className="w-full flex justify-center items-center">
                                                    {selected && (
                                                        <>
                                                            {(() => {
                                                                const SelectedIcon = icons.find((icon) => icon.id === selected)?.Icon;
                                                                return SelectedIcon? <SelectedIcon className=" size-[100px] lg:size-[130px] opacity-[22%] stroke-1"/> : null;
                                                            })()}
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <motion.button whileTap={{ scale: 0.95 }} whileHover={{ scale: 1.02 }} id="editar_conta" className=" border border-[#1E2351] text-[18px] p-[5px_30px] rounded-full" onClick={() => criar()}>Criar nova matéria</motion.button>

                        </div>
                    </div>
                </motion.div>
            )}

            {editar && (
                <motion.div 
                key="content"
                initial={{ opacity: 0, scale: 0.85}}
                animate={{ opacity: 1, scale: 0.94 }}
                exit={{ opacity: 0, scale: 0.90 }}
                
                className={`w-full h-full absolute opacity-1 z-[1100] `}>
                    <div className="w-full h-full absolute" onClick={() => closing()}></div>

                    <div id="white-box" className={`w-[1250px] max-w-[95%] min-h-[95%] lg:min-h-[650px] h-[650px] max-h-[95%] rounded-[50px] z-[1100] left-[50%] translate-x-[-50%] top-[50%] translate-y-[-50%] bg-white shadow-md flex justify-center items-center relative overflow-hidden `}>
                        
                        <X className="absolute top-5 right-8 size-6 cursor-pointer" onClick={() => closing()}/>
                        <Image width={300} height={500} src="/Vector.svg" alt="Decoração" className="absolute top-0 left-[-140px] rotate-90 w-[550px]"/>
                        <Image width={300} height={500} src="/Vector.svg" alt="Decoração" className="absolute bottom-[-40px] right-[-130px] -rotate-90 w-[550px]"/>

                        <div className=" w-[90%] h-[90%] lg:w-[80%] lg:h-[92%] mt-auto lg:mb-4 flex flex-col items-center gap-10 z-[900] overflow-y-auto pr-2 pb-4">
                            <h1 className="text-center text-[30px] font-medium">Editar matéria</h1>
                            <div className="w-full flex lg:flex-row flex-col justify-between lg:gap-0 gap-4">
                                <div className=" w-full lg:w-[47%] flex flex-col gap-2">
                                    <div className="">
                                        <h2 className="text-[18px] font-medium ">Nome da matéria:</h2>
                                        <input type="text" id="nome_materia" onChange={(e) => {setCriarMateria({...criarMateria, nome: e.target.value }); console.log(criarMateria)}} placeholder="Nome da matéria" className="pl-5 text-[18px] w-full py-2 border-2 border-[rgba(0,0,0,0.19)] rounded-[20px] outline-[rgba(151,103,248,0.6)]"/>

                                    </div>

                                    <div className="">
                                        <h2 className="text-[18px] font-medium">Cores:</h2>
                                        <div className="flex gap-1">
                                            {colors.map((color) => (
                                                <motion.button 
                                                whileTap={{ scale: 0.95 }} 
                                                whileHover={{ scale: 1.02 }}
                                                key={color} style={{backgroundColor: color}} onClick={() => {setCriarMateria({...criarMateria, cor: cor[color as keyof typeof cor] }); setColor(color); } } className={`w-[30px] h-[30px] rounded-full cursor-pointer`}></motion.button>
                                            ))}
                                        </div>
                                        <div/>
                                    </div>

                                    <div className="">
                                        <h2 className="text-[18px] font-medium">Ícone desejado:</h2>
                                        <div className="w-full h-[140px] border-2 border-[rgba(0,0,0,0.19)] rounded-[25px] flex justify-center items-center ">
                                            <div className=" max-w-[92%] overflow-y-auto h-[85%] flex flex-wrap gap-2 overflow-x-hidden items-center pb-1">
                                                {icons.map(({ id, Icon }) => (
                                                    <motion.button
                                                        whileTap={{ scale: 0.95 }}
                                                        whileHover={{ scale: 1.02 }}
                                                        id="icone"
                                                        key={id}
                                                        onClick={() => {setCriarMateria({...criarMateria, icone: id }); setSelected(id) }}
                                                    >
                                                        <Icon className="size-5" />
                                                    </motion.button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className=" w-[438px] max-w-full lg:w-[47%] lg:mx-0 mx-auto">
                                    <div className=" w-full h-[320px] lg:h-full max-h-[320px] rounded-[25px] bg-[#EFEFEF] flex flex-col items-center justify-center">
                                        <h2 className="w-[85%] h-[60px] flex font-medium text-[25px]">Pré-visualização:</h2>
                                        <div style={{ backgroundColor: criarMateria.cor && cores[criarMateria.cor as keyof typeof cores] ? cores[criarMateria.cor as keyof typeof cores] : cores[temp[0].cor as keyof typeof cores] }} className="w-[85%] h-[70%] max-h-[220px] rounded-[25px] flex justify-center items-center">
                                            <div className="w-[85%] h-[85%] flex items-center">
                                                <div className={`w-[54%] flex flex-col gap-4`}  >
                                                    <h1 className="w-[210px] line-clamp-2 break-words material_title leading-none font-medium ">{ criarMateria.nome? criarMateria.nome : temp[0]?.nome }</h1>
                                                    <div className="text-[18px]">
                                                        <h2 className="material_text leading-none">Materiais de estudo: 0</h2>
                                                        <h2 className="material_text leading-none">Tempo ativo: Sem dados</h2>
                                                        <h2 className="material_text leading-none">Última revisão: Sem dados</h2>
                                                    </div>
                                                </div>

                                                <div className="w-full flex justify-center items-center">
                                                    {(() => {
                                                        if (criarMateria.icone){
                                                            const IconComponent = icons.find(icon => icon.id.toLowerCase() === criarMateria.icone?.toLowerCase())?.Icon;
                                                            if (IconComponent) {
                                                                return <IconComponent className=" size-[100px] lg:size-[130px] opacity-[22%] stroke-1"/>;
                                                            }
                                                            return null;
                                                        }
                                                        else{
                                                            const IconComponent = icons.find(icon => icon.id.toLowerCase() === temp[0]?.icone?.toLowerCase())?.Icon;
                                                            if (IconComponent) {
                                                                return <IconComponent className=" size-[100px] lg:size-[130px] opacity-[22%] stroke-1"/> 
                                                            }
                                                            return null;
                                                        }
                                                    })()}
                                                    {/* {selected && (
                                                        <>
                                                            {(() => {
                                                                const SelectedIcon = icons.find((icon) => icon.id === selected)?.Icon;
                                                                return SelectedIcon? <SelectedIcon className=" size-[100px] lg:size-[130px] opacity-[22%] stroke-1"/> : null;
                                                            })()}
                                                        </>
                                                    )} */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <motion.button whileTap={{ scale: 0.95 }} whileHover={{ scale: 1.02 }} id="editar_conta" className=" border border-[#1E2351] text-[18px] p-[5px_30px] rounded-full" onClick={() => { if (temp[0]?.id) editarMateria(temp[0].id, criarMateria); }}>Salvar edição</motion.button>

                        </div>
                    </div>
                </motion.div>
                
            )}
            
            {deletarPop && (
                <>
                    <motion.div 
                    key="content"
                    initial={{ opacity: 0, scale: 0.85}}
                    animate={{ opacity: 1, scale: 0.94 }}
                    exit={{ opacity: 0, scale: 0.90 }}
                    className={`w-full h-full fixed flex justify-center items-center  opacity-1 z-[1100] `}>
                        
                        <div className="w-full h-full absolute" onClick={() => setDeletarPop(false)}></div>
                        <motion.div 
                        key="content"
                        initial={{ opacity: 0, scale: 0.85}}
                        animate={{ opacity: 1, scale: 0.94 }}
                        exit={{ opacity: 0, scale: 0.90 }}
                        className={`w-[700px] h-[320px] flex rounded-[40px] z-[1100]  opacity-1 `}>

                            <div id="white-box" className={` w-full h-full rounded-[40px] bg-white shadow-md flex justify-center items-center relative overflow-hidden z-[1100] left-[50%] translate-x-[-50%] top-[50%] translate-y-[-50%]`}>
                                
                                <Image width={300} height={500} src="/Vector.svg" alt="Decoração" className="absolute top-0 left-[-180px] rotate-90 w-[550px]"/>
                                <Image width={300} height={500} src="/Vector.svg" alt="Decoração" className="absolute bottom-[-40px] right-[-170px] -rotate-90 w-[550px]"/>

                                <div className="w-[80%] h-[85%] flex flex-col items-center gap-2 z-[900] ">
                                    <div className="flex flex-col justify-center items-center">
                                        <img src={`${user.foto}`} alt="Foto de perfil" className="rounded-full w-20 h-20"/>
                                        <span className="font-medium text-[30px]">{user.primeiroNome} </span>
                                        <span className="text-[20px]"></span>
                                    </div>

                                    <h1 className="text-center text-[20px] font-medium">Você deseja mesmo deletar essa matéria?</h1>
                                    <div className="w-full flex justify-center gap-4 mt-auto">
                                        <motion.button 
                                        whileHover={{ scale: 1.03 }}
                                        whileTap={{ scale: 0.97 }}
                                        onClick={() => setDeletarPop(false)}
                                        className="p-[10px_15px] min-w-[70px] rounded-[20px] text-[18px] bg-[#F1F1F1] border border-[rgba(68,68,68, 0.17)]">
                                            Voltar
                                        </motion.button>
                                        <motion.button 
                                        whileHover={{ scale: 1.03 }}
                                        whileTap={{ scale: 0.97 }}
                                        onClick={() => {setDeletarPop(false); deletarMateria(deletar)}}
                                        className="p-[10px_15px] min-w-[65px] rounded-[20px] text-[18px] text-white bg-[#9767F8] border border-[rgba(68,68,68, 0.17)]">
                                            Deletar
                                        </motion.button>
                                    </div>

                                </div>
                            </div>
                        </motion.div>
                        
                        
                    </motion.div>
                        
                        
                    <div className="w-full absolute flex justify-center items-center ">
                        <Backdrop3 onClick={() => setDeletarPop(false)}/>
                    </div>
                </>
            )}

        </AnimatePresence>

        {open && (
            <Backdrop3 onClick={() => closing()}/>
        )}

        { editar && (
            <Backdrop3 onClick={() => closing()}/>
        )}
        
        <div className=" w-[1800px] max-w-[98%] lg:max-w-[90%] mx-auto mt-[12px] mb-[12px] h-[calc(100vh-24px)] lg:my-auto gap-3 rounded-[35px] flex justify-center items-center ">
            <div className=" w-full rounded-[35px] overflow-hidden bg-white h-full flex flex-col items-center shadow-md border border-[#00000031]">
                <div className="w-[95%] max-w-[95%] mt-4 ">
                    <div className="w-full mx-auto">
                        <h1 className="text-[#1E2351] font-medium text-[30px]"> Olá, {user.primeiroNome} </h1>
                        <h1 className="font-medium text-[18px] text-[#A19797] "> Qual matéria será revisada hoje? </h1>
                    </div>

                    <div className=" mt-[25px] overflow-hidden flex flex-col items-center ">
  
                        <div className="w-full h-[82px] mt-10 flex justify-center relative ">
                            
                            <div className="w-[82%] max-w-[82%] rounded-[20px] mt-4 mr-5 h-[45px] bg-[#D9D9D9] absolute "></div>

                            <div className="relative w-[84%] max-w-[90%]">
                                <input type="text" id="search_bar" placeholder="Pesquise a matéria" className="w-full text-[18px] pl-5 py-2 border-2 border-[rgba(0,0,0,0.19)] shadow-md rounded-[25px] outline-[rgba(151,103,248,0.6)]" />
                                <Search className="absolute right-[20px] text-black opacity-[36%] cursor-pointer top-[12px] size-[25px] "/>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={`w-[95%] max-w-[95%] ${materias && materias.length === 0 ? "": "grid-cols-[1fr_1fr]"} grid gap-[10px] max-h-[900px] pt-1 pb-3 overflow-y-auto px-2`}>
                    { materias && materias.length === 0 && (
                        <div className=" h-[230px] bg-[#CCB2FF] shadow-md rounded-[35px] flex items-center relative border border-[#00000031] ">
                            <div className="ml-10 w-[60%] h-[90%] flex justify-center items-center">
                                <div className=" flex flex-col justify-center gap-[10%] w-full h-full  ">
                                    <h1 className="text-[22px] font-medium line-clamp-3 break-words">
                                        Nenhuma matéria criada ainda. Comece agora e organize seu caminho rumo ao sucesso!
                                    </h1>

                                    <Link href="/home/materiais" className="w-[40%] min-w-[40%] h-[30%] min-h-[30%] rounded-full">
                                    <button onClick={() => setOpen(true)} className="p-[10px_12px] bg-[#1E2351] rounded-full text-white flex justify-center items-center gap-2 text-[20px] shadow-md leading-5 ">
                                        <CirclePlus className="w-6 h-6" /> Criar matéria
                                    </button>
                                    </Link>
                                </div>
                                
                            </div>
                            <Image width={300} height={500}
                                src="/semmateria.svg"
                                alt="Decoração"
                                className=" w-[310px] max-w-[40%] absolute h-full right-0 object-cover  "
                                />
                        </div>
                    )} 
                    { materias && materias.length > 0 && (
                        <>
                            <motion.div 
                            whileHover={{ scale:1.01 }}
                            whileTap={{ scale:0.99 }}
                            transition={{ duration: 0.25, ease: "easeInOut" }}

                            id="materias" onClick={() => setOpen(true)} className="material bg-[#D8D8D8] border-[3px] border-[rgb(0,0,0,22%)] rounded-[28px] cursor-pointer flex justify-center items-center flex-col ">
                                <CirclePlus className="text-[rgb(165,165,165)] size-[50px]"/>
                                <h2 className="text-[25px] text-[rgb(48,38,42,87%)] leading-none font-medium text-center material_title">Criar matéria</h2>
                            </motion.div>

                            {materias.map((material, index) => {
                                return (
                                    <div key={index}>
                                        <motion.div 
                                        whileHover={{ scale:1.01 }}
                                        whileTap={{ scale:0.99 }}
                                        transition={{ duration: 0.25, ease: "easeInOut" }}
                                        id="materias" className="material rounded-[28px] cursor-pointer flex justify-center items-center flex-row gap-5 shadow-md border border-[#00000031]" style={{ backgroundColor: material.cor && cores[material.cor as keyof typeof cores] ? cores[material.cor as keyof typeof cores] : "#FFFFFF" }}>
                                            <div className="absolute top-1 right-3 z-10 flex flex-col items-end ">
                                                <div className="">
                                                    <AnimatePresence initial={false}>
                                                        <button ref={(el) => { buttonRefs.current[index] = el; }}
                                                        onClick={() => { if (openPop === index) {setOpenPop(null);} else { setOpenPop(index)} }} 
                                                        key={0} className="p-1 flex justify-start items-end" ><Ellipsis className="opacity-[80%] size-6"/>
                                                        </button>

                                                        { openPop === index &&(
                                                            <motion.div 
                                                            initial={{ scale: 0, opacity: 0}}
                                                            animate={{ scale: 1, opacity: 1 }}
                                                            exit={{ scale: 0, opacity: 0, transition:{ duration: 0.15, ease: "easeInOut"} }}
                                                            
                                                            ref={(el) => {popoverRefs.current[index] = el}} className="origin-top-left relative mr-[-11px] z-1000">
                                                                <div className="absolute right-0 top-full mt-2 w-[160px] rounded-2xl bg-white shadow-md border-[1px] border-[rgba(0,0,0,0.26)]">

                                                                    <div className="absolute -top-2 right-4 w-5 h-5 rounded-sm bg-white rotate-45 border-[1px] border-[rgba(0,0,0,0.26)] shadow -z-10"></div>

                                                                    <div className="flex flex-col w-full gap-1 text-base ">
                                                                        <button className="mx-2 text-[#726BB6] text-[20px] px-2 w-[98%] py-2 items-center flex gap-2" onClick={() => {setEditar(true); 
                                                                        setTemp([{ id: material.id, nome: material.nome, cor: material.cor, icone: material.icone }] );}} >
                                                                            <SquarePen className="icon-3"/> Editar
                                                                        </button>
                                                                        <hr className="border-t-[2px] border-[#D7DDEA] mx-4" />
                                                                        <button onClick={() => {setDeletarPop(true); setDeletar(material.id!); setOpenPop(null)}} className="mx-2 text-[#726BB6] text-[20px] px-2 w-[95%] py-2 flex gap-2 items-center" >
                                                                            <SquareX className="icon-3"/> Excluir</button>
                                                                    </div>
                                                                </div>
                                                            </motion.div>
                                                        )}
                                                    </AnimatePresence>
                                                </div>
                                            </div>
                                            <Link href={`/home/materiais/${material.id}`} className="w-full h-full flex justify-center rounded-[28px]" >
                                                <div className="w-[90%] max-w-[90%] h-full flex rounded-[28px] gap-[4%] justify-center items-center">
                                                    <div className="max-w-[100%] xl:max-w-[85%] max-h-[80%] overflow-hidden ">
                                                        <div className="flex justify-between">
                                                            <h2 className="  material_title 
                                                            text-[25px] 
                                                            w-[95px]
                                                            max-w-[80%] 
                                                            line-clamp-2
                                                            break-words 
                                                            leading-none 
                                                            text-[rgb(48,38,42,87%)] 
                                                            font-medium">{material.nome}</h2>
                                                            
                                                            {(() => {
                                                                const IconComponent = icons.find(icon => icon.id.toLowerCase() === material.icone?.toLowerCase())?.Icon;
                                                                if (IconComponent) {
                                                                    return <IconComponent className="md:hidden flex size-[30px] opacity-[50%] stroke-1" />;
                                                                }
                                                                return null;
                                                            })()}

                                                        </div>
                                                        <h2 className="material_text break-words leading-none text-[18px] opacity-[75%] font-medium w-fit ">Materiais de estudo: { material.materiais?.length === 0 ? "0" : material.materiais}</h2>
                                                        <h2 className="material_text break-words leading-none text-[18px] opacity-[75%] font-medium w-fit ">Tempo ativo: 0 horas</h2>
                                                        <h2 className="material_text break-words leading-none text-[18px] opacity-[75%] font-medium w-fit ">Última revisão: 0</h2>
                                                    </div>
                                                    
                                                    {(() => {
                                                        const IconComponent = icons.find(icon => icon.id.toLowerCase() === material.icone?.toLowerCase())?.Icon;
                                                        if (IconComponent) {
                                                            return <IconComponent className="size-[130px] hidden md:flex max-w-[45%] opacity-[22%] stroke-1" />;
                                                        }
                                                        return null;
                                                    })()}
                                                </div>
                                            </Link>

                                        </motion.div>
                                    </div>
                                )
                            })}
                            
                        </>
                    )} 
                </div>
                {/* <div className=" flex justify-center overflow-y-auto mt-5 max-h-[80%] w-[95%] max-w-[90%] ">
                </div> */}

                {/* <div className="min-w-max max-w-[94%] h-[94px] flex justify-center items-center" id="paginacao">
                    <ChevronsLeft/>
                    <ChevronLeft/>
                    <a href="" className="bg-[#9767F8] rounded-full text-white">1</a>
                    <a href="" >2</a>
                    <a href="" >3</a>
                    <ChevronRight/>
                    <ChevronsRight/>
                </div> */}
            </div>

            <div className="xl:flex hidden right_panel bg-white rounded-[35px] h-full  justify-center shadow-md border border-[#00000031] ">
                 
                <div className="w-full h-full flex justify-center ">   
                    <div className="w-[95%] h-[95%] flex flex-col items-center mt-4 pb-2">
                        
                        <div className="flex gap-[15px] justify-center items-center w-[95%] max-w-[95%] max-h-[110px]">
                            
                            <img src={`${user.foto}`} className="w-[28%] max-w-[380px] rounded-full cursor-pointer" alt="Profile picture" />

                            <div className="w-[70%] ">
                                <h1 className="text-[30px] font-medium ">{user.primeiroNome}</h1>
                                <h2 className="text-[#828181] font-medium text-[18px]">{user.cargo}</h2>
                                <div className=" h-2 rounded-[18px] bg-[#1e235138]">
                                    <div style={{ width: `${userXP?.progresso ?? 0}%`}} className={` h-2 rounded-[25px] bg-purple-600 `}></div>
                                </div>
                                <div className="flex justify-between ">
                                    {(() =>{
                                        const nivel = userXP?.nivel ? userXP.nivel.charAt(0).toUpperCase() + userXP.nivel.slice(1).toLowerCase() : "";
                                        return <h2 className="font-medium text-[18px] text-[#828181]">{nivel}</h2>
                                    })()}

                                    <h2 className="font-medium text-[18px] text-[#A39CEC]">{userXP?.xp} XP</h2>
                                </div>
                            </div>

                        </div>
                        
                        <div className="ml-[15px] mt-[30px]  w-[95%] max-w-[95%]">
                            <h1 className="text-[30px] w-fit font-medium leading-6">Matérias recentes</h1>
                            {/* <h1 className="text-[18px] italic w-fit font-medium text-[#9767F8] " >{recente[0]?.nome}</h1> */}
                        </div>
                        
                        <div className="flex flex-col gap-1 mt-2 items-center relative w-full overflow-y-auto overflow-x-hidden pb-2 ">
                            {recente.map((materia, index) => {
                                return(
                                    <Link key={index} href={`/home/materiais/${materia.id}`} className="px-1 flex gap-3 py-1 w-full rounded-[15px] ml-[15px] mr-[15px] cursor-pointer hover:bg-[rgba(0,0,0,0.06)] ">

                                        <h1 className="text-[85px] font-bold text-[#A78CDC] leading-[90px]">{index + 1 < 10 ? `0${index + 1}`: `${index + 1}` }</h1>

                                        <div className="flex items-center w-full ">
                                            <div className="recentes  ">
                                                <h2 className="
                                                w-full
                                                break-words 
                                                text-[25px] 
                                                max-w-[250px] line-clamp-2 breake-words  font-medium leading-none">{materia.nome}</h2>
                                                <h2 className="text-[18px] text-[#828181]">Tempo de estudo: 0 horas</h2>
                                            </div>

                                            <ChevronRight className="size-12 "/>
                                        </div>
                                    </Link>

                                )
                            })}
                            {/* <motion.button whileTap={{ scale: 0.99 }} whileHover={{ scale: 1.01 }}  id="editar_conta" className="border border-[#1E2351] mt-auto mb-[5px] text-[22px] w-[380px] max-w-[95%] min-h-[50px] rounded-full ">Ver mais matérias</motion.button> */}

                        </div>

                    </div>
                </div> 
            </div>
        </div>

        
        </>
    );
};
