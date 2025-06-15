"use client";


import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
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

const icons = [
  // Educação e aprendizado
  { id: "book", Icon: Book }, { id: "bookmark", Icon: Bookmark },
  { id: "clipboard", Icon: Clipboard }, { id: "file", Icon: File }, { id: "folder", Icon: Folder },
  { id: "calendar", Icon: Calendar }, { id: "clock", Icon: Clock }, { id: "alarmClock", Icon: AlarmClock },
  { id: "edit", Icon: Edit }, { id: "download", Icon: Download }, { id: "eye", Icon: Eye },
  { id: "check", Icon: Check }, { id: "search", Icon: Search }, { id: "filter", Icon: Filter },
  { id: "helpCircle", Icon: HelpCircle }, { id: "info", Icon: Info }, { id: "lightbulb", Icon: Lightbulb },

  // Programação e lógica
  { id: "code", Icon: Code }, { id: "codeXml", Icon: CodeXml }, { id: "cpu", Icon: Cpu }, { id: "database", Icon: Database },
  { id: "gitBranch", Icon: GitBranch }, { id: "hash", Icon: Hash }, { id: "Monitor", Icon: Monitor },

  // Matemática
  { id: "plus", Icon: Plus }, { id: "minus", Icon: Minus }, { id: "x", Icon: X }, { id: "divide", Icon: Divide },

  // Interface e organização de conhecimento
  { id: "layers", Icon: Layers }, { id: "layout", Icon: Layout }, { id: "grid", Icon: Grid }, { id: "list", Icon: List },
  { id: "menu", Icon: Menu }, { id: "loader", Icon: Loader },

  // Comunicação e interações
  { id: "mail", Icon: Mail }, { id: "inbox", Icon: Inbox }, { id: "bell", Icon: Bell }, { id: "headphones", Icon: Headphones },

  // Identidade e acesso (login/logout para ambientes de estudo)
  { id: "logIn", Icon: LogIn }, { id: "logOut", Icon: LogOut }, { id: "lock", Icon: Lock }, { id: "key", Icon: Key },

  // Contexto global e navegação de conteúdo
  { id: "globe", Icon: Globe }, { id: "globe2", Icon: Globe2 }, { id: "map", Icon: Map }, { id: "home", Icon: Home },
  { id: "chevronRight", Icon: ChevronRight }, { id: "chevronLeft", Icon: ChevronLeft },
  { id: "chevronsRight", Icon: ChevronsRight }, { id: "chevronsLeft", Icon: ChevronsLeft },

  // Extras úteis
  { id: "flag", Icon: Flag }, { id: "lifeBuoy", Icon: LifeBuoy }, { id: "circlePlus", Icon: CirclePlus },
  { id: "heart", Icon: Heart }, { id: "heartPulse", Icon: HeartPulse }, { id: "squareX", Icon: SquareX },
  { id: "squarePen", Icon: SquarePen }
];
import {  useState, useEffect, useRef } from 'react';
import { Backdrop3 } from "../components/backdrop";

const colors = ["#8B81F3", "#CAC5FF", "#FFA6F1", "#FFACA1"];

type Material = {
    nome: string;
    color: string;
    materiais: number;
    tempo: number;
    ultima: string;
    icon: string;
};

export default function Materiais() {
    const [materiais, setMateriais] = useState<Material[]>([
        {nome: "Geografia", color: "#8B81F3", materiais: 24, tempo: 2, ultima: "15/01", icon: "Globe" },
        {nome: "Rede de Computadores", color: "#CAC5FF", materiais: 9, tempo: 1, ultima: "10/01", icon: "Monitor" },
        {nome: "Ciência da Computação", color: "#FFA6F1", materiais: 24, tempo: 2, ultima: "18/01", icon: "CodeXml" },
        {nome: "Enfermagem", color: "#FFACA1", materiais: 24, tempo: 2, ultima: "21/01", icon: "HeartPulse" },
        {nome: "Matemática", color: "#8B81F3", materiais: 24, tempo: 2, ultima: "19/01", icon: "Plus" },
    ]);

    const [open, setOpen] = useState(false);
    const [editar, setEditar] = useState(false);
    const [selected, setSelected] = useState<string | null>(null);
    const [color, setColor] = useState<string | "">("");
    const [titulo, setTitulo] = useState("");
    const [openPop, setOpenPop] = useState<number | null>(null);
    const [materiaIndex, setMateriaIndex] = useState<number | null>(null);
    const popoverRefs = useRef<(HTMLDivElement | null)[]>([]);
    const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

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

        const materias = async () => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/materias`, {
                method: 'GET',
                credentials: 'include',
            });
            
            const data = await res.json();
            console.log(data); 
        }; materias();

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
        document.removeEventListener("mousedown", handleClickOutside);
    };
    }, [openPop]);
    
    function closing(){
        setOpen(false);
        setEditar(false);
        setMateriaIndex(null);
        setSelected(null);
        setColor("");
        setTitulo("")
    }
    
    function add(){
        if (!color || !selected) return;
        const novoMaterial: Material = {
            nome: titulo,
            color: color,
            materiais: 0,
            tempo: 0,
            ultima: "09/06",
            icon: selected,
        }
        setMateriais([...materiais, novoMaterial])
        setOpen(false);
        setSelected(null);
        setColor("");
        setTitulo("")
    }

    return( 
        <>
        <AnimatePresence initial={false}>
        {open && (
            <motion.div 
            key="content"
            initial={{ opacity: 0, scale: 0.85}}
            animate={{ opacity: 1, scale: 0.94 }}
            exit={{ opacity: 0, scale: 0.90 }}
            
            className={`w-full h-full absolute opacity-1 z-[1100] `}>
                <div className="w-full h-full absolute" onClick={() => closing()}></div>

                <div id="white-box" className={` w-[1250px] h-[650px] rounded-[50px] z-[1100] left-[50%] translate-x-[-50%] top-[50%] translate-y-[-50%] bg-white shadow-md flex justify-center items-center relative overflow-hidden `}>
                    
                    <X className="absolute top-10 right-10 size-10 cursor-pointer" onClick={() => closing()}/>
                    <Image width={300} height={500} src="/Vector.svg" alt="Decoração" className="absolute top-0 left-[-140px] rotate-90 w-[550px]"/>
                    <Image width={300} height={500} src="/Vector.svg" alt="Decoração" className="absolute bottom-[-40px] right-[-130px] -rotate-90 w-[550px]"/>

                    <div className="w-[80%] h-[85%] flex flex-col items-center gap-10 z-[900]">
                        <h1 className="text-center text-[45px] font-medium">Como você deseja criar a matéria?</h1>
                        <div className="w-full flex justify-between ">
                            <div className="w-[47%] flex flex-col gap-2">
                                <div className="">
                                    <h2 className="text-[28px] font-medium ">Nome da matéria:</h2>
                                    <input type="text" id="nome_materia" value={titulo} onChange={(e) => setTitulo(e.target.value)} placeholder="Nome da matéria" className="pl-5 text-[20px] w-full h-[45px] border-2 border-[rgba(0,0,0,0.19)] rounded-[20px] outline-[rgba(151,103,248,0.6)]"/>

                                </div>

                                <div className="">
                                    <h2 className="text-[28px] font-medium">Cores:</h2>
                                    <div className="flex gap-1">
                                        {colors.map((color) => (
                                            <motion.button 
                                            whileTap={{ scale: 0.95 }} 
                                            whileHover={{ scale: 1.02 }}

                                            key={color} style={{backgroundColor: color}} onClick={() => setColor(color) } className={`w-[30px] h-[30px] rounded-full cursor-pointer`}></motion.button>
                                        ))}
                                    </div>
                                    <div/>
                                </div>

                                <div className="">
                                    <h2 className="text-[28px] font-medium">Ícone desejado:</h2>
                                    <div className="w-full h-[140px] border-2 border-[rgba(0,0,0,0.19)] rounded-[25px] flex justify-center items-center ">
                                        <div className=" w-[92%] overflow-y-auto h-[85%] grid grid-cols-[repeat(14,1fr)] grid-rows-[repeat(4,40px)] items-center pb-1">
                                            {icons.map(({id, Icon}) => (
                                                <motion.button 
                                                whileTap={{ scale: 0.95 }} 
                                                whileHover={{ scale: 1.02 }}
                                                id="icone" key={id} onClick={() => setSelected(id)}>
                                                    <Icon />
                                                </motion.button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className=" w-[47%] ">
                                <div className="w-full h-[100%] rounded-[25px] bg-[#EFEFEF] flex flex-col items-center justify-center">
                                    <h2 className="w-[85%] h-[60px] flex font-medium text-[25px]">Pré-visualização:</h2>
                                    <div style={{backgroundColor: color || "white"}} className="w-[85%] h-[70%] rounded-[25px] flex justify-center items-center">

                                    <div className="w-[85%] h-[85%] flex items-center">
                                        <div className="w-[65%] flex flex-col gap-4 ">
                                            <h1 className="w-[210px] line-clamp-2 break-words text-[35px] leading-[40px] font-medium">{titulo.trim() !== "" ? titulo : "Nome da matéria"}</h1>
                                            <div className="">
                                                <h2>Materiais de estudo: 0</h2>
                                                <h2>Tempo ativo: Sem dados</h2>
                                                <h2>Última revisão: Sem dados</h2>
                                            </div>
                                        </div>

                                        <div className="w-[50%] flex justify-center items-center">
                                            {selected && (
                                                <>
                                                    {(() => {
                                                        const SelectedIcon = icons.find((icon) => icon.id === selected)?.Icon;
                                                        return SelectedIcon? <SelectedIcon className="size-[150px] opacity-[22%] stroke-1"/> : null;
                                                    })()}
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                </div>
                            </div>
                        </div>

                        <motion.button whileTap={{ scale: 0.95 }} whileHover={{ scale: 1.02 }} id="editar_conta" className=" border border-[#1E2351] text-[22px] p-[5px_30px] rounded-full" onClick={() => add()}>Criar nova matéria</motion.button>

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

                <div id="white-box" className={` w-[1250px] h-[650px] rounded-[50px] z-[1100] left-[50%] translate-x-[-50%] top-[50%] translate-y-[-50%] bg-white shadow-md flex justify-center items-center relative overflow-hidden ${editar? 'opacity-1 scale-1'  : 'opacity-0 scale-95'} `}>
                    
                    <X className="absolute top-10 right-10 size-10 cursor-pointer" onClick={() => closing()}/>
                    <Image width={300} height={500} src="/Vector.svg" alt="Decoração" className="absolute top-0 left-[-140px] rotate-90 w-[550px]"/>
                    <Image width={300} height={500} src="/Vector.svg" alt="Decoração" className="absolute bottom-[-40px] right-[-130px] -rotate-90 w-[550px]"/>

                    <div className="w-[80%] h-[85%] flex flex-col items-center gap-10 z-[900]">
                        <h1 className="text-center text-[45px] font-medium">Editar matéria</h1>
                        <div className="w-full flex justify-between ">
                            <div className="w-[47%] flex flex-col gap-2">
                                <div className="">
                                    <h2 className="text-[28px] font-medium ">Nome da matéria:</h2>
                                    <input type="text" id="nome_materia" value={titulo} onChange={(e) => setTitulo(e.target.value)} placeholder="Nome da matéria" className="pl-5 text-[20px] w-full h-[45px] border-2 border-[rgba(0,0,0,0.19)] rounded-[20px] outline-[rgba(151,103,248,0.6)]"/>

                                </div>

                                <div className="">
                                    <h2 className="text-[28px] font-medium">Cores:</h2>
                                    <div className="flex gap-1">
                                        {colors.map((color) => (
                                            <motion.button 
                                            whileTap={{ scale: 0.95 }} 
                                            whileHover={{ scale: 1.02 }}

                                            key={color} style={{backgroundColor: color}} onClick={() => setColor(color) } className={`w-[30px] h-[30px] rounded-full cursor-pointer`}></motion.button>
                                        ))}
                                    </div>
                                    <div/>
                                </div>

                                <div className="">
                                    <h2 className="text-[28px] font-medium">Ícone desejado:</h2>
                                    <div className="w-full h-[140px] border-2 border-[rgba(0,0,0,0.19)] rounded-[25px] flex justify-center items-center ">
                                        <div className=" w-[92%] overflow-y-auto h-[85%] grid grid-cols-[repeat(14,1fr)] grid-rows-[repeat(5,40px)] items-center pb-1">
                                            {icons.map(({id, Icon}) => (
                                                <motion.button 
                                                whileTap={{ scale: 0.95 }} 
                                                whileHover={{ scale: 1.02 }}
                                                id="icone" key={id} onClick={() => setSelected(id)}>
                                                    <Icon />
                                                </motion.button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className=" w-[47%] ">
                                <div className="w-full h-[100%] rounded-[25px] bg-[#EFEFEF] flex flex-col items-center justify-center">
                                    <h2 className="w-[85%] h-[60px] flex font-medium text-[25px]">Pré-visualização:</h2>
                                    <div
                                        className={`w-[85%] h-[70%] rounded-[25px] flex justify-center items-center`}
                                        style={{
                                            backgroundColor:
                                                color == "" && materiaIndex !== null && materiais[materiaIndex]
                                                    ? materiais[materiaIndex].color
                                                    : color
                                        }}
                                    >

                                    <div className="w-[85%] h-[85%] flex items-center">
                                        <div className="w-[65%] flex flex-col gap-4 ">
                                            <h1 className="w-[210px] line-clamp-2 break-words text-[35px] leading-[40px] font-medium">{titulo.trim() !== "" ? titulo : (materiaIndex !== null && materiais[materiaIndex] ? materiais[materiaIndex].nome : "Nome da matéria")}</h1>
                                            <div className="">
                                                <h2>Materiais de estudo: {materiaIndex !== null && materiais[materiaIndex] ? materiais[materiaIndex].materiais : 0}</h2>
                                                <h2>Tempo ativo: {materiaIndex !== null && materiais[materiaIndex] ? materiais[materiaIndex].tempo : 0}</h2>
                                                <h2>Última revisão: {materiaIndex !== null && materiais[materiaIndex] ? materiais[materiaIndex].ultima : 0}</h2>
                                            </div>
                                        </div>

                                        <div className="w-[50%] flex justify-center items-center">
                                            {selected && (
                                                <>
                                                    {(() => {
                                                        const SelectedIcon = icons.find((icon) => icon.id === selected)?.Icon;
                                                        return SelectedIcon? <SelectedIcon className="size-[150px] opacity-[22%] stroke-1"/> : null;
                                                    })()}
                                                </>
                                            )}
                                            {!selected && (
                                                <>
                                                    {(() => {
                                                        if (materiaIndex !== null && materiais[materiaIndex]) {
                                                            const iconId = materiais[materiaIndex].icon;
                                                            const SelectedIcon = icons.find((icon) => icon.id.toLowerCase() === iconId.toLowerCase())?.Icon;
                                                            return SelectedIcon ? <SelectedIcon className="size-[150px] opacity-[22%] stroke-1"/> : null;
                                                        }
                                                        return null;
                                                    })()}
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                </div>
                            </div>
                        </div>

                        <motion.button whileTap={{ scale: 0.95 }} whileHover={{ scale: 1.02 }} id="editar_conta" className=" border border-[#1E2351] text-[22px] p-[5px_30px] rounded-full" onClick={() => closing()}>Editar matéria</motion.button>

                    </div>
                </div>
            </motion.div>
        )}

        </AnimatePresence>

        {open && (
            <Backdrop3 onClick={() => closing()}/>
        )}

        { editar && (
            <Backdrop3 onClick={() => closing()}/>
        )}

        <div className="flex mt-[12px] mb-[12px] h-[calc(100vh-25px)] min-h-fit w-full ml-[20px] mr-[20px] gap-[20px] ">
            
            <div className=" rounded-[35px] w-[75%] h-[100%] overflow-hidden bg-white flex flex-col items-center shadow-md border border-[#00000031]">
                <div className="w-[1200px] max-w-[95%] mt-4 ">
                    <div className="w-[92%] mx-auto">
                        <h1 className="text-[#1E2351] font-medium text-[50px]"> Olá, Maria </h1>
                        <h1 className="font-medium text-[30px] text-[#A19797] "> Qual matéria será revisada hoje? </h1>
                    </div>

                    <div className=" mt-[25px] overflow-hidden flex flex-col items-center ">
  
                        <div className="w-full h-[82px] mt-10 flex justify-center relative ">
                            
                            <div className="w-[980px] max-w-[82%] rounded-[20px] mt-4 mr-5 h-[50px] bg-[#D9D9D9] absolute "></div>

                            <div className="relative w-[84%] max-w-[90%]">
                                <input type="text" id="search_bar" placeholder="Pesquise a matéria" className="w-full  text-[25px] pl-5 h-[55px] border-2 border-[rgba(0,0,0,0.19)] shadow-md rounded-[25px] outline-[rgba(151,103,248,0.6)]" />
                                <Search className="absolute right-[20px] text-black opacity-[36%] cursor-pointer top-[12px] size-[30px] "/>
                            </div>
                        </div>
                    </div>
                </div>

                <div className=" flex justify-center overflow-y-auto mt-5 h-[590px] max-h-[80%] w-[1100px]  max-w-[95%] ">
                    <div className="w-[99%] grid grid-cols-[1fr_1fr] gap-[20px] h-fit pt-1 pb-1  ">
                        
                        <motion.div 
                        whileHover={{ scale:1.01 }}
                        whileTap={{ scale:0.99 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}

                        id="materias" onClick={() => setOpen(true)} className="bg-[#D8D8D8] border-[3px] border-[rgb(0,0,0,22%)]  h-[280px] rounded-[28px] cursor-pointer flex justify-center items-center flex-col ">
                            <CirclePlus className="text-[rgb(165,165,165)] size-[70px]"/>
                            <h2 className="text-[35px] text-[rgb(48,38,42,87%)] font-medium">Criar matéria</h2>
                        </motion.div>
                        {materiais.map((material, index) => {
                            const IconComponent = icons.find(icon => icon.id.toLowerCase() === material.icon.toLowerCase())?.Icon;
                            return (
                                <div key={material.nome + index}>
                                    <motion.div 
                                    whileHover={{ scale:1.01 }}
                                    whileTap={{ scale:0.99 }}
                                    transition={{ duration: 0.25, ease: "easeInOut" }}
                                    id="materias" className="h-[280px] rounded-[28px] cursor-pointer flex justify-center items-center flex-row gap-5 shadow-md border border-[#00000031]" style={{ backgroundColor: material.color }}>
                                        <div className="absolute top-3 right-4 z-10 flex flex-col items-end ">
                                            <div className="">
                                                <AnimatePresence initial={false}>
                                                    <button ref={(el) => { buttonRefs.current[index] = el; }}
                                                    onClick={() => { if (openPop === index) {setOpenPop(null);} else { setOpenPop(index)} }} 
                                                    key={0} className=" " ><Ellipsis className="opacity-[80%] size-8"/>
                                                    </button>

                                                    { openPop === index &&(
                                                        <motion.div 
                                                        initial={{ scale: 0, opacity: 0}}
                                                        animate={{ scale: 1, opacity: 1 }}
                                                        exit={{ scale: 0, opacity: 0, transition:{ duration: 0.15, ease: "easeInOut"} }}

                                                        ref={(el) => {popoverRefs.current[index] = el}} className="origin-top-left relative mr-[-11px]">
                                                            <div className="absolute right-0 top-full mt-2 w-48 rounded-2xl bg-white shadow-md border-[1px] border-[rgba(0,0,0,0.26)]">
                                                                <div className="absolute -top-2 right-4 w-5 h-5 rounded-sm bg-white rotate-45 border-[1px] border-[rgba(0,0,0,0.26)] shadow -z-10"></div>
                                                                <div className="flex flex-col w-full gap-1 text-base ">
                                                                    <button className="mx-2 text-[#726BB6] text-[25px] px-2 w-[98%] py-3 items-center flex gap-2" onClick={() => {setEditar(true); setMateriaIndex(index); console.log(index);}}>
                                                                        <SquarePen/> Editar
                                                                    </button>
                                                                    <hr className="border-t-[2px] border-[#D7DDEA] mx-4" />
                                                                    <button className="mx-2 text-[#726BB6] text-[25px] px-2 w-[95%] py-3 flex gap-2 items-center" ><SquareX/> Excluir</button>
                                                                </div>
                                                            </div>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </div>
                                            {/* <div className="w-[170px] rounded-[15px] h-[110px] bg-white"></div> */}
                                        </div>
                                        <Link href={`/home/materiais/${material.nome}`} className="w-full h-full flex justify-center rounded-[28px]" >
                                            <div className="w-[90%] max-w-[90%]  h-full flex rounded-[28px] gap-[2%] justify-center items-center">
                                                <div className="max-w-[85%] max-h-[80%] overflow-hidden ">
                                                    <h2 className="text-[35px]  w-min leading-[40px] text-[rgb(48,38,42,87%)] font-medium ">{material.nome}</h2>
                                                    <h2 className="text-[22px] opacity-[75%] font-medium w-fit ">Materiais de estudo: {material.materiais}</h2>
                                                    <h2 className="text-[22px] opacity-[75%] font-medium w-fit ">Tempo ativo: {material.tempo} horas</h2>
                                                    <h2 className="text-[22px] opacity-[75%] font-medium w-fit ">Última revisão: {material.ultima}</h2>
                                                </div>
                                                {IconComponent && <IconComponent className="size-[160px] max-w-[45%] opacity-[22%] stroke-1" />}
                                            </div>
                                        </Link>

                                    </motion.div>
                                </div>
                            );
                        })}
                        
                    </div>
                </div>

                <div className="min-w-max max-w-[94%] h-[94px] flex justify-center items-center" id="paginacao">
                    <ChevronsLeft/>
                    <ChevronLeft/>
                    <a href="" className="bg-[#9767F8] rounded-full text-white">1</a>
                    <a href="" >2</a>
                    <a href="" >3</a>
                    <ChevronRight/>
                    <ChevronsRight/>
                </div>
            </div>

            <div className="bg-white rounded-[35px] w-[25%] flex justify-center shadow-md border border-[#00000031] ">
                 
                <div className="w-full  h-full flex justify-center items-center">   
                    <div className="w-[95%] h-[95%] flex items-center flex-col">
                        
                        <div className="flex gap-[15px] justify-center items-center w-[380px] max-w-[95%] overflow-hidden max-h-[110px]">
                            
                            <Image width={300} height={500} src="/Profile.png" className="w-[28%] max-w-[380px] rounded-full cursor-pointer" alt="Profile picture" />

                            <div className="w-[70%] ">
                                <h1 className="text-[30px] font-medium ">Maria Eduarda</h1>
                                <h2 className="text-[#828181] font-medium text-[25px]">Estudante</h2>
                                <div className="w-[220px] h-2 rounded-[25px] bg-[#1e235138]">
                                    <div className="w-[45%] h-2 rounded-[25px] bg-purple-600 "></div>
                                </div>
                                <div className="flex justify-between w-[220px]">
                                    <h2 className="font-medium text-[18px] text-[#828181]">Iniciante</h2>
                                    <h2 className="font-medium text-[18px] text-[#828181]">450px</h2>
                                </div>
                            </div>

                        </div>
                        
                        <div className="ml-[15px] mt-[30px] w-[380px] max-w-[95%]">
                            <h1 className="text-[34px] w-fit font-medium leading-6">Materiais recentes</h1>
                            <h1 className="text-[26px] italic w-fit font-medium text-[#9767F8] ">Ciência da computação</h1>
                        </div>

                        <div className="flex flex-col gap-1 items-center h-[685px] relative w-[380px] max-w-[95%]  overflow-hidden">
                            <Link href="/home/materiais/Ciência da Computação/Eng. 20Comp 20 II/Material" className=" flex gap-3 px-2 py-1 w-full ml-[15px] mr-[15px] cursor-pointer hover:bg-[rgba(0,0,0,0.06)] ">

                                <h1 className="text-[85px] font-bold text-[#A78CDC] leading-[90px]">01</h1>

                                <div className="flex justify-between items-center w-full">
                                    <div className=" ">
                                        <h2 className="text-[28px] font-medium leading-[30px]">Eng. Comp II</h2>
                                        <h2 className="text-[20px] text-[#828181]">Tempo de estudo: 3 horas</h2>
                                    </div>

                                    <ChevronRight className="size-12 "/>
                                </div>
                            </Link>

  
                            <motion.button whileTap={{ scale: 0.99 }} whileHover={{ scale: 1.01 }}  id="editar_conta" className="border border-[#1E2351] mt-5 text-[22px] w-[380px] max-w-[95%] h-[50px] rounded-full absolute bottom-0">Ver mais materiais</motion.button>
                        </div>
                    </div>
                </div> 
            </div>
        </div>
        </>
    );
};
