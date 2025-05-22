"use client";

import Image from "next/image";
import Link from "next/link";
import {
  CirclePlus, Heart, Globe, Monitor, CodeXml, HeartPulse,
  Minus, Divide, X, Plus, Search, ChevronRight, ChevronsLeft,
  ChevronsRight, ChevronLeft, AlarmClock, Archive, Bell, Book,
  Bookmark, Calendar, Camera, Check, Clipboard, Clock,
  Code, Cpu, Database, Download, Edit, Eye, File, Filter, Flag,
  Folder, Gift, GitBranch, Globe2, Grid, Hash, Headphones, HelpCircle,
  Home, Inbox, Info, Key, Layers, Layout, LifeBuoy, Lightbulb,
List, Loader, Lock, LogIn, LogOut, Mail, Map, Menu
} from "lucide-react";
const icons = [
    { id: "circlePlus", Icon: CirclePlus }, { id: "heart", Icon: Heart }, { id: "heartPulse", Icon: HeartPulse },
    { id: "minus", Icon: Minus }, { id: "divide", Icon: Divide }, { id: "x", Icon: X }, { id: "plus", Icon: Plus },
    { id: "check", Icon: Check }, { id: "search", Icon: Search }, { id: "download", Icon: Download }, { id: "edit", Icon: Edit },
    { id: "filter", Icon: Filter }, { id: "code", Icon: Code }, { id: "codeXml", Icon: CodeXml }, { id: "gift", Icon: Gift },
    { id: "chevronRight", Icon: ChevronRight }, { id: "chevronLeft", Icon: ChevronLeft },
    { id: "chevronsRight", Icon: ChevronsRight }, { id: "chevronsLeft", Icon: ChevronsLeft },
    { id: "menu", Icon: Menu }, { id: "list", Icon: List }, { id: "grid", Icon: Grid },
    { id: "monitor", Icon: Monitor }, { id: "cpu", Icon: Cpu }, { id: "database", Icon: Database },
    { id: "layers", Icon: Layers }, { id: "layout", Icon: Layout }, { id: "loader", Icon: Loader },
    { id: "eye", Icon: Eye }, { id: "clipboard", Icon: Clipboard }, { id: "flag", Icon: Flag }, { id: "file", Icon: File },
    { id: "folder", Icon: Folder }, { id: "archive", Icon: Archive }, { id: "calendar", Icon: Calendar },
    { id: "camera", Icon: Camera }, { id: "headphones", Icon: Headphones },
    { id: "bell", Icon: Bell }, { id: "mail", Icon: Mail }, { id: "inbox", Icon: Inbox }, { id: "helpCircle", Icon: HelpCircle },
    { id: "key", Icon: Key }, { id: "lock", Icon: Lock }, { id: "logIn", Icon: LogIn }, { id: "logOut", Icon: LogOut },
    { id: "map", Icon: Map }, { id: "globe", Icon: Globe }, { id: "globe2", Icon: Globe2 }, { id: "hash", Icon: Hash },
    { id: "clock", Icon: Clock }, { id: "alarmClock", Icon: AlarmClock },
    { id: "book", Icon: Book }, { id: "bookmark", Icon: Bookmark },
    { id: "info", Icon: Info }, { id: "lifeBuoy", Icon: LifeBuoy }, { id: "lightbulb", Icon: Lightbulb },
    { id: "gitBranch", Icon: GitBranch }, { id: "home", Icon: Home }
];
import {  useState  } from 'react';

const colors = ["#8B81F3", "#CAC5FF", "#FFA6F1", "#FFACA1"];

export default function Materiais() {
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState<string | null>(null);
    const [color, setColor] = useState<string | null>(null);
    const [titulo, setTitulo] = useState("");

    function closing(){
        setOpen(false);
        setSelected(null);
        setColor(null);
        setTitulo("")
    }

    return( 
        <>
        <div className={`w-full h-full absolute ${ open? ' opacity-1 z-[1100]' : 'z-[-100] opacity-0'}`}>
            <div className="w-full h-full absolute" onClick={() => closing()}></div>

            <div id="white-box" className={` w-[1250px] h-[650px] rounded-[50px] z-[1100] left-[50%] translate-x-[-50%] top-[50%] translate-y-[-50%] bg-white shadow-md flex justify-center items-center relative overflow-hidden 
                ${open? 'opacity-1 scale-1'  : 'opacity-0 scale-95'}`}>
                
                <X className="absolute top-10 right-10 size-10 cursor-pointer" onClick={() => closing()}/>
                <Image width={300} height={500} src="/Vector.svg" alt="Decoração" className="absolute top-0 left-[-140px] rotate-90 w-[550px]"/>
                <Image width={300} height={500} src="/Vector.svg" alt="Decoração" className="absolute bottom-[-40px] right-[-130px] -rotate-90 w-[550px]"/>

                <div className="w-[80%] h-[85%] flex flex-col gap-10 z-[900]">
                    <h1 className="text-center text-[45px] font-medium">Como você deseja criar a matéria?</h1>
                    <div className="w-full flex justify-between ">
                        <div className="w-[47%] flex flex-col gap-2">
                            <div className="">
                                <h2 className="text-[28px] font-medium">Nome da matéria:</h2>
                                <input type="text" id="nome_materia" value={titulo} onChange={(e) => setTitulo(e.target.value)} placeholder="Nome da matéria" className="pl-5 text-[20px] w-full h-[45px] border-2 border-[rgba(0,0,0,0.19)] rounded-[20px] outline-[#9767F8]"/>

                            </div>

                            <div className="">
                                <h2 className="text-[28px] font-medium">Cores:</h2>
                                <div className="flex gap-1">
                                    {colors.map((color) => (
                                        <button key={color} style={{backgroundColor: color}} onClick={() => setColor(color) } className={`w-[30px] h-[30px] rounded-full cursor-pointer`}></button>
                                    ))}
                                </div>
                                <div/>
                            </div>

                            <div className="">
                                <h2 className="text-[28px] font-medium">Ícone desejado:</h2>
                                <div className="w-full h-[140px] border-2 border-[rgba(0,0,0,0.19)] rounded-[25px] flex justify-center items-center ">
                                    <div className=" w-[90%] overflow-y-auto h-[85%] grid grid-cols-[repeat(14,1fr)] grid-rows-[repeat(5,40px)] items-center pb-1">
                                        {icons.map(({id, Icon}) => (
                                            <button id="icone" key={id} onClick={() => setSelected(id)}>
                                                <Icon />
                                            </button>
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
                                        <h1 className="w-[210px] line-clamp-2 break-words leading-12 font-medium">{titulo.trim() !== "" ? titulo : "Nome da matéria"}</h1>
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
                    <button id="editar_conta" className="border m-auto border-[#1E2351] text-[22px] w-[220px] h-[40px] rounded-full" onClick={() => closing()}>Criar nova matéria</button>

                </div>
            </div>

        </div>
        <div className={`w-full h-full fixed z-[1000] bg-[rgba(0,0,0,0.40)] ${ open? 'flex' : 'hidden'} justify-center items-center`} onClick={() => closing()}></div>

        <div className="flex mt-[12px] mb-[12px] h-[calc(100vh-25px)] min-h-fit w-full ml-[20px] mr-[20px] gap-[20px] ">
            
            <div className="bg-white rounded-[35px] w-[75%] h-[100%] overflow-hidden flex flex-col items-center shadow-md border border-[#00000031]">
                <div className="w-[1200px] max-w-[94%] mt-4 ">
                    <div className="">
                        <h1 className="text-[#1E2351] font-medium text-[50px]"> Olá, Maria </h1>
                        <h1 className="font-medium text-[30px] text-[#A19797] "> Qual matéria será revisada hoje? </h1>
                    </div>

                    <div className="mt-[25px] overflow-hidden flex flex-col items-center ">
  
                        <div className="w-full h-[82px] mt-10 flex justify-center relative ">
                            
                            <div className="w-[980px] max-w-[82%] rounded-[20px] mt-4 mr-5 h-[50px] bg-[#D9D9D9] absolute "></div>

                            <div className="relative w-[84%] max-w-[90%]">
                                <input type="text" id="search_bar" placeholder="Pesquise a matéria" className="w-full  text-[25px] pl-5 h-[55px] border-2 border-[rgba(0,0,0,0.19)] shadow-md rounded-[25px] outline-[#9767F8]" />
                                <Search className="absolute right-[20px] text-black opacity-[36%] cursor-pointer top-[12px] size-[30px] "/>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-center overflow-y-auto mt-5 h-[580px] max-h-[80%]  w-[1030px] max-w-[80%] ">
                    <div className="w-[99%] grid grid-cols-[1fr_1fr] gap-[20px] h-fit  500 ">
                        
                        <div id="materias" onClick={() => setOpen(true)} className="bg-[#D8D8D8] border-[3px] border-[rgb(0,0,0,22%)]  h-[280px] rounded-[28px] cursor-pointer flex justify-center items-center flex-col ">
                            <CirclePlus className="text-[rgb(165,165,165)] size-[70px]"/>
                            <h2 className="text-[35px] text-[rgb(48,38,42,87%)] font-medium">Criar um material</h2>
                        </div>
                        
                        <Link href="">
                            <div id="materias" className="bg-[#CAC5FF] h-[280px] rounded-[28px] cursor-pointer flex justify-center items-center flex-row gap-5 shadow-md border border-[#00000031]">
                                <div className="max-w-[80%] h-[50%] overflow-hidden">
                                    <h2 className="text-[35px] leading-[40px] text-[rgb(48,38,42,87%)] font-medium w-fit ">Geografia</h2>
                                    <h2 className="text-[22px] text-[#7A74B9] font-medium w-fit ">Materiais de estudo: 24</h2>
                                    <h2 className="text-[22px] text-[#7A74B9] font-medium w-fit ">Tempo ativo: 40 horas</h2>
                                    <h2 className="text-[22px] text-[#7A74B9] font-medium w-fit ">Última revisão: 15/01</h2>
                                </div>

                                <Globe className="size-[110px] opacity-[22%] stroke-1"/>

                            </div>
                        </Link>
                        
                        <Link href="">
                            <div id="materias"className="bg-[#8B81F3] h-[280px] rounded-[28px] cursor-pointer flex justify-center items-center flex-row gap-5 shadow-md border border-[#00000031]">
                                    
                                <div className="max-w-[80%] h-[78%] overflow-hidden flex flex-col justify-center ">  
                                    <h2 className="text-[35px] w-min leading-[40px] text-[rgb(48,38,42,87%)] font-medium ">Rede de Computadores</h2>
                                    <h2 className="text-[22px] text-[#454178] opacity-[70%] font-medium w-fit ">Materiais de estudo: 24</h2>
                                    <h2 className="text-[22px] text-[#454178] opacity-[70%] font-medium w-fit ">Tempo ativo: 40 horas</h2>
                                    <h2 className="text-[22px] text-[#454178] opacity-[70%] font-medium w-fit ">Última revisão: 15/01</h2>
                                </div>

                                <Monitor className="size-[110px] opacity-[22%] stroke-1"/>
                            </div>
                        </Link>
                        
                        <Link href="/home/materiais/Ciência da Computação">
                            <div id="materias" className="bg-[#FFA6F1] h-[280px] rounded-[28px] cursor-pointer flex justify-center items-center flex-row gap-5 shadow-md border border-[#00000031]">
                                    
                                <div className="max-w-[80%] h-[78%] overflow-hidden">
                                    <h2 className="text-[35px] w-min leading-[40px] text-[rgb(48,38,42,87%)] font-medium ">Ciência da computação</h2>
                                    <h2 className="text-[22px] text-[#81244C] opacity-[61%] font-medium w-fit ">Materiais de estudo: 24</h2>
                                    <h2 className="text-[22px] text-[#81244C] opacity-[61%] font-medium w-fit ">Tempo ativo: 40 horas</h2>
                                    <h2 className="text-[22px] text-[#81244C] opacity-[61%] font-medium w-fit ">Última revisão: 15/01</h2>
                                </div>

                                <CodeXml className="size-[110px] opacity-[22%] stroke-1"/>
                            </div>
                        </Link>
                        
                        <Link href="">
                            <div id="materias" className="bg-[#FF9F93]  h-[280px] rounded-[28px] cursor-pointer flex justify-center items-center flex-row gap-5 shadow-md border border-[#00000031]">
                                    
                                <div className="max-w-[80%] h-[50%] overflow-hidden">
                                    <h2 className="text-[35px] w-min leading-[40px] text-[rgb(48,38,42,87%)] font-medium ">Enfermagem</h2>
                                    <h2 className="text-[22px] text-[#844F48] opacity-[70%] font-medium w-fit ">Materiais de estudo: 24</h2>
                                    <h2 className="text-[22px] text-[#844F48] opacity-[70%] font-medium w-fit ">Tempo ativo: 40 horas</h2>
                                    <h2 className="text-[22px] text-[#844F48] opacity-[70%] font-medium w-fit ">Última revisão: 15/01</h2>
                                </div>

                                <HeartPulse className="size-[110px] opacity-[22%] stroke-1"/>

                            </div>

                        </Link>
                                            
                        <Link href="">
                            <div id="materias" className="bg-[#FFE89B]  h-[280px] rounded-[28px] cursor-pointer flex justify-center items-center flex-row gap-5 shadow-md border border-[#00000031]">
                                    
                                <div className="max-w-[80%] h-[50%] overflow-hidden">
                                    <h2 className="text-[35px] w-min leading-[40px] text-[rgb(4,38,42,87%)] font-medium ">Matemática</h2>
                                    <h2 className="text-[22px] text-black opacity-[36%] font-medium w-fit ">Materiais de estudo: 24</h2>
                                    <h2 className="text-[22px] text-black opacity-[36%] font-medium w-fit ">Tempo ativo: 40 horas</h2>
                                    <h2 className="text-[22px] text-black opacity-[36%] font-medium w-fit ">Última revisão: 15/01</h2>
                                </div>

                                <div className=" grid grid-cols-2 gap-3">
                                    <Plus className="size-[50px] opacity-[36%] stroke-1"/>
                                    <Minus className="size-[50px] opacity-[36%] stroke-1"/>

                                    <Divide className="size-[50px] opacity-[36%] stroke-1"/>
                                    <X className="size-[50px] opacity-[36%] stroke-1"/>

                                </div>
                            </div>
                        </Link>
                        
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
                 
                <div className="w-full overflow-hidden h-full flex justify-center items-center">   
                    <div className="w-[95%] h-[95%] flex items-center flex-col">
                        
                        <div className="flex w-[95%] overflow-hidden gap-[15px] bg-blue-500">
                            
                            <Image width={300} height={500} src="/Profile.png" className="w-[30%] h-auto rounded-full cursor-pointer" alt="Profile picture" />

                            <div className="w-[70%] bg-red-500">
                                {/* <h1 className="text-[30px] font-medium ">Maria Eduarda</h1>
                                <h2 className="text-[#828181] font-medium text-[25px]">Estudante</h2>
                                <div className="w-[220px] h-2 rounded-[25px] bg-[#1e235138]">
                                    <div className="w-[45%] h-2 rounded-[25px] bg-purple-600 "></div>
                                </div>
                                <div className="flex justify-between w-[220px]">
                                    <h2 className="font-medium text-[18px] text-[#828181]">Iniciante</h2>
                                    <h2 className="font-medium text-[18px] text-[#828181]">450px</h2>
                                </div> */}
                            </div>

                        </div>
{/*                         
                        <div className="ml-[15px] mt-[30px] ">
                            <h1 className="text-[34px] w-fit font-medium leading-6">Materiais recentes</h1>
                            <h1 className="text-[26px] italic w-fit font-medium text-[#9767F8] ">Ciência da computação</h1>
                        </div>

                        <div className="flex flex-col gap-1 items-center h-[685px] relative">
                            <div id="" className=" grid grid-cols-[100px_1fr]  px-2 py-1 w-[380px] ml-[15px] mr-[15px] gap-[5px] cursor-pointer rounded-[10px] hover:bg-[rgba(0,0,0,0.06)] ">

                                <h1 className="text-[90px] font-bold text-[#A78CDC] leading-[90px]">01</h1>

                                <div className="mt-[18px] flex justify-between items-center ">
                                    <div className="">
                                        <h2 className="text-[30px] font-medium leading-[30px]">Eng. Comp II</h2>
                                        <h2 className="text-[20px] text-[#828181]">Tempo de estudo: 3 horas</h2>
                                    </div>

                                    <ChevronRight className="size-12 "/>
                                </div>
                            </div>

                            <div id="" className=" grid grid-cols-[100px_1fr]  px-2 py-1 w-[380px] ml-[15px] mr-[15px] gap-[5px] cursor-pointer rounded-[10px] hover:bg-[rgba(0,0,0,0.06)] ">

                                <h1 className="text-[90px] font-bold text-[#A78CDC] leading-[90px]">02</h1>

                                <div className="mt-[18px] flex justify-between items-center ">
                                    <div className="">
                                        <h2 className="text-[30px] font-medium leading-[30px]">Eng. Comp II</h2>
                                        <h2 className="text-[20px] text-[#828181]">Tempo de estudo: 3 horas</h2>
                                    </div>

                                    <ChevronRight className="size-12 "/>
                                </div>
                            </div>
                            <div id="" className=" grid grid-cols-[100px_1fr]  px-2 py-1 w-[380px] ml-[15px] mr-[15px] gap-[5px] cursor-pointer rounded-[10px] hover:bg-[rgba(0,0,0,0.06)] ">

                                <h1 className="text-[90px] font-bold text-[#A78CDC] leading-[90px]">03</h1>

                                <div className="mt-[18px] flex justify-between items-center ">
                                    <div className="">
                                        <h2 className="text-[30px] font-medium leading-[30px]">Eng. Comp II</h2>
                                        <h2 className="text-[20px] text-[#828181]">Tempo de estudo: 3 horas</h2>
                                    </div>

                                    <ChevronRight className="size-12 "/>
                                </div>
                            </div>

                            <div id="" className=" grid grid-cols-[100px_1fr]  px-2 py-1 w-[380px] ml-[15px] mr-[15px] gap-[5px] cursor-pointer rounded-[10px] hover:bg-[rgba(0,0,0,0.06)] ">

                                <h1 className="text-[90px] font-bold text-[#A78CDC] leading-[90px]">04</h1>

                                <div className="mt-[18px] flex justify-between items-center ">
                                    <div className="">
                                        <h2 className="text-[30px] font-medium leading-[30px]">Eng. Comp II</h2>
                                        <h2 className="text-[20px] text-[#828181]">Tempo de estudo: 3 horas</h2>
                                    </div>

                                    <ChevronRight className="size-12 "/>
                                </div>
                            </div>

                            <div id="" className=" grid grid-cols-[100px_1fr]  px-2 py-1 w-[380px] ml-[15px] mr-[15px] gap-[5px] cursor-pointer rounded-[10px] hover:bg-[rgba(0,0,0,0.06)] ">

                                <h1 className="text-[90px] font-bold text-[#A78CDC] leading-[90px]">05</h1>

                                <div className="mt-[18px] flex justify-between items-center ">
                                    <div className="">
                                        <h2 className="text-[30px] font-medium leading-[30px]">Eng. Comp II</h2>
                                        <h2 className="text-[20px] text-[#828181]">Tempo de estudo: 3 horas</h2>
                                    </div>

                                    <ChevronRight className="size-12 "/>
                                </div>
                            </div>

                            <div id="" className=" grid grid-cols-[100px_1fr] px-2 py-1 w-[380px] ml-[15px] mr-[15px] gap-[5px] cursor-pointer rounded-[10px] hover:bg-[rgba(0,0,0,0.06)] ">

                                <h1 className="text-[90px] font-bold text-[#A78CDC] leading-[90px]">06</h1>

                                <div className="mt-[18px] flex justify-between items-center ">
                                    <div className="">
                                        <h2 className="text-[30px] font-medium leading-[30px]">Eng. Comp II</h2>
                                        <h2 className="text-[20px] text-[#828181]">Tempo de estudo: 3 horas</h2>
                                    </div>

                                    <ChevronRight className="size-12"/>
                                </div>
                            </div>

                            <button id="editar_conta" className="border border-[#1E2351] mt-5 text-[22px] w-[380px] h-[50px] rounded-full absolute bottom-0">Ver mais materiais</button>
                        </div> */}
                    </div>
                </div> 
            </div>
        </div>
        </>
    );
};
