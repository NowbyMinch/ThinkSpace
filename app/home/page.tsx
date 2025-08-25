"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Backdrop } from "./components/backdrop";
import { Backdrop2 } from "./components/backdrop";
import { CarouselLinks } from "./components/carousel";
import { motion, AnimatePresence } from "framer-motion";
import ErrorModal from '@/components/ui/ErrorModal';
import Loading from "@/app/home/components/loading";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import {
  CirclePlus, Heart, Globe, Monitor, CodeXml, HeartPulse,
  Minus, Divide, X, Plus, Search, ChevronRight, ChevronsLeft,
  ChevronsRight, ChevronLeft, AlarmClock, Bell, Book,
  Bookmark, Calendar, Check, Clipboard, Clock,
  Code, Cpu, Database, Download, Edit, Eye, File, Filter, Flag,
  Folder, GitBranch, Globe2, Grid, Hash, Headphones, HelpCircle,
  Home, Inbox, Info, Key, Layers, Layout, LifeBuoy, Lightbulb, List,
  Loader, Lock, LogIn, LogOut, Mail, Map, Menu, SquareX, 
  SquarePen, Flame, ArrowLeft, ArrowRight, Ellipsis
} from "lucide-react";
import * as Icons from "lucide-react";
import { avatar } from "@heroui/react";

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

export default function HomePage() {
  const [pop, setPop] = useState(false);
  const [pop2, setPop2] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  
  const cores = {
    ROXO: "#8B81F3",
    LILAS: "#CAC5FF",
    ROSA: "#FFA6F1",
    SALMAO: "#FFACA1",
  };
  const cor = [ "#8B81F3", "#CAC5FF", "#FFA6F1", "#FFACA1" ];


  function opening(){
    setPop(true);
  }
  
  function closing(){
    setTimeout(() => setPop(false), 10);
  }

  function opening2(){
    setPop2(true);
  }
  
  function closing2(){
    setTimeout(() => setPop2(false), 10);
  }
  
  type BannerData = {
    mensagem?: string;
    relatorio?: string;
    relatorioUrl?: string;
    // add other properties if needed
  };
  type UserData = {
    primeiroNome?: string;
    cargo?: string;
    foto?: string;
    // add other properties if needed
  };
  type DiaData = {
    diaNumero?: number;
    diaSemana?: number;
    // add other properties if needed
  };
  type CalendarioData = {
    mesAtual?: string;
    anoAtual?: number;
    dias?: DiaData[];
    diaAtual?: number;
    // add other properties if needed
  };
  type notificacaoData = {
    userId?: string;
    notificacoes?: Array<number>;
    message?: string;
    // add other properties if needed
  };
  type materiaItem = {
    id?: string;
    nome?: string;
    cor?: string;
    icone?: string;
    usuarioId?: string;
    materiais?: any[]; // or specify the correct type if known
    // add other properties if needed
  };
  type Sala = {
  id: string;
  nome: string;
  descricao: string;
  topicos: string[];
  banner: string;
  moderadorId: string;
  assuntoId: string | null;
  criadoEm: string;
  };
 
  const [ bannerData, setBannerData ] = useState<BannerData>({})
  const [ user, setUser ] = useState<UserData>({})
  const [ calendario, setCalendario ] = useState<CalendarioData>({})
  const [ salas, setSalas ] = useState<Sala[]>([])
  const [ notificacao, setNotificacao ] = useState<notificacaoData>({})
  const [ loading, setLoading ] = useState(true);
  const [ materias, setMaterias ] = useState<materiaItem[]>([]);
  const [ ofensiva, setOfensiva ] = useState();
  const [ ofensivaMensagem, setOfensivaMensagem ] = useState("");
  const [avatares, setAvatares] = useState<string[]>([]);
  const [ totalEstudantes, setTotalEstudantes ] = useState(0);
  
  useEffect(() => {
    console.log("Salas updated:", salas);
  }, [salas]);
  
  useEffect(() => {
    const materia = async () => {
        try{
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/materias`, {
                method: 'GET',
                credentials: 'include',
            });
            
            const data = await res.json();
            setMaterias(data);
        } catch (err) {
        console.error(err);
        } 
    }; materia();
    
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

    const calendario = async () => {
      try{
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/home/calendario`, {
          method: 'GET',
          credentials: 'include',
        });
        
        const data = await res.json();
        setCalendario(data)
      } catch (err) {
        setMessage("Erro ao carregar saudação.");
        console.error(err);
      }
    }; calendario();
    
    const salasDeEstudo = async () => {
      try{
        setLoading(true);
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/home/salas-estudo`, {
          method: 'GET',
          credentials: 'include',
        });
        
        const data = await res.json();

        console.log("/home/salas-estudo aqui", data);
        
        setAvatares(data.avataresUltimosUsuarios);
        setTotalEstudantes(data.totalEstudantes);
        setSalas(data.salasMembro);
        setLoading(false);
      } catch (err) {
        setMessage("Erro ao carregar salas de estudo.");
        console.error(err);
      }
    }; salasDeEstudo();

    const notificacao = async () => {
      try{
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/home/notificacoes`, {
          method: 'GET',
          credentials: 'include',
        });
        
        const data = await res.json();
        setLoading(false);
        setNotificacao(data);
      } catch (err) {
        setMessage("Erro ao carregar saudação.");
        console.error(err);
      }
    }; notificacao();

    const Ofensiva = async () => {
      try{

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/home/ofensiva`, {
          method: 'GET',
          credentials: 'include',
        });

        const data = await res.json();

        setOfensivaMensagem(data.mensagemOfensiva);
        setLoading(false);
        setOfensiva(data.status);

      } catch (err) {
        setMessage("Erro ao carregar a ofensiva.");
        console.error(err);
      }
      

    }; Ofensiva();

  }, []);

  useEffect(() =>{
    console.log("UseEffect ofensiva: ", ofensiva);
  }, [ofensiva]);
  if (loading ) return <Loading /> 

  return (
    <>
      {message && (
        <ErrorModal message={message} onClose={() => setMessage(null)} />
      )}
      <AnimatePresence initial={false}>
        {pop && (
          <Backdrop key={1}/>
        )}
        {pop2 && (
          <Backdrop2 key={2}/>
        )}
        
      </AnimatePresence>

      <div className=" w-[1580px] max-w-[90%] lg:max-w-[90%] mx-auto h-full  pb-8 max-h-full  ">
        <div className="h-[82px] mt-[15px] flex justify-between ">
          <div className="flex gap-[10px] ">

            <div id="pop" className=" relative w-[55px] h-[55px] rounded-full bg-[#D9D9D9] cursor-pointer flex justify-center items-center border border-[#00000031] shadow-md ">
              <div
                onMouseEnter={() => opening()}
                onMouseLeave={() => closing()}
                className="w-full h-full absolute rounded-full z-[150] group"
              >
                <div className=" relative w-full h-full group">
                  
                  <AnimatePresence initial={false}>
                    { pop && (
                      <div className="w-[70px] h-[100px]"></div>
                    )}
                    { pop && (
                      <motion.div 
                      key="content"
                      initial={{ opacity: 0.95, scale: 0.90}}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0.95, scale: 0.90 }}
                      transition={{ duration: 0.01, ease: "easeInOut" }}

                      className={`absolute pop1_box h-10 origin-top-left transition-all ease-in-out bg-white border border-[#00000031] shadow-md z-50 rounded-[25px] top-[85px] justify-center items-center overflow-hidden flex cursor-default
                      `}>
                        <div className=" w-[85%] h-[85%] overflow-hidden flex flex-col justify-between ">
                          <div className="h-full ">
                            <h1 className="w-fit text-[20px] font-medium leading-none cursor-text">
                              Sua ofensiva
                            </h1>
                            <h2 className="cursor-text font-medium text-[18px] w-fit text-[#121212] ">
                              {ofensivaMensagem}
                            </h2>
                          </div>

                          <div className="flex justify-between ">
                            {(() => {
                              if (ofensiva){
                                return (
                                  <>
                                    <div className="flex flex-col text-center ">
                                      <span className="text-[15px]">DOM</span>
                                      {(() => {
                                        if (ofensiva[0] === 0){
                                          return (
                                            <div className="diaOfensiva flex justify-center items-center rounded-[8px] border border-[#00000031] shadow-md bg-[#D9D9D9]">
                                            </div>
                                          )
                                        } else if (ofensiva[0] === 1 ){
                                          return (
                                            <div className="diaOfensiva flex justify-center items-center rounded-[8px] border border-[#00000031] shadow-md bg-[#EB9481]">
                                              <X className="text-[#C10000] stroke-3 size-7"/>
                                            </div>
                                          )
                                        }
                                        else {
                                          return(
                                            <div className="diaOfensiva flex justify-center items-center rounded-[8px] border border-[#00000031] shadow-md bg-[#A59EF0]">
                                              <Check className="text-white stroke-3 size-7"/>
                                            </div>
                                          )
                                        }
                                      })()}
                                    </div>

                                    <div className="flex flex-col text-center ">
                                      <span className="text-[15px]">SEG</span>
                                      {(() => {
                                        if (ofensiva[1] === 0){
                                          return (
                                            <div className=" flex justify-center items-center diaOfensiva rounded-[8px] border border-[#00000031] shadow-md bg-[#D9D9D9]">
                                            </div>
                                          )
                                        } else if (ofensiva[1] === 1 ){
                                          return (
                                            <div className=" flex justify-center items-center diaOfensiva rounded-[8px] border border-[#00000031] shadow-md bg-[#EB9481]">
                                              <X className="text-[#C10000] stroke-3 size-7"/>
                                            </div>
                                          )
                                        }
                                        else {
                                          return(
                                            <div className=" flex justify-center items-center diaOfensiva rounded-[8px] border border-[#00000031] shadow-md bg-[#A59EF0]">
                                              <Check className="text-white stroke-3 size-7 "/>
                                            </div>
                                          )
                                        }
                                      })()}
                                    </div>

                                    <div className="flex flex-col text-center ">
                                      <span className="text-[15px]">TER</span>
                                      {(() => {
                                        if (ofensiva[2] === 0){
                                          return (
                                            <div className=" flex justify-center items-center diaOfensiva rounded-[8px] border border-[#00000031] shadow-md bg-[#D9D9D9]">
                                            </div>
                                          )
                                        } else if (ofensiva[2] === 1 ){
                                          return (
                                            <div className=" flex justify-center items-center diaOfensiva rounded-[8px] border border-[#00000031] shadow-md bg-[#EB9481]">
                                              <X className="text-[#C10000] stroke-3 size-7"/>
                                            </div>
                                          )
                                        }
                                        else {
                                          return(
                                            <div className=" flex justify-center items-center diaOfensiva rounded-[8px] border border-[#00000031] shadow-md bg-[#A59EF0]">
                                              <Check className="text-white stroke-3 size-7 "/>
                                            </div>
                                          )
                                        }
                                      })()}
                                    </div>

                                    <div className="flex flex-col text-center ">
                                      <span className="text-[15px]">QUA</span>
                                      {(() => {
                                        if (ofensiva[3] === 0){
                                          return (
                                            <div className=" flex justify-center items-center diaOfensiva rounded-[8px] border border-[#00000031] shadow-md bg-[#D9D9D9]">
                                            </div>
                                          )
                                        } else if (ofensiva[3] === 1 ){
                                          return (
                                            <div className=" flex justify-center items-center diaOfensiva rounded-[8px] border border-[#00000031] shadow-md bg-[#EB9481]">
                                              <X className="text-[#C10000] stroke-3 size-7"/>
                                            </div>
                                          )
                                        }
                                        else {
                                          return(
                                            <div className=" flex justify-center items-center diaOfensiva rounded-[8px] border border-[#00000031] shadow-md bg-[#A59EF0]">
                                              <Check className="text-white stroke-3 size-7 "/>
                                            </div>
                                          )
                                        }
                                      })()}
                                    </div>
                                    
                                    <div className="flex flex-col text-center ">
                                      <span className="text-[15px]">QUI</span>
                                      {(() => {
                                        if (ofensiva[4] === 0){
                                          return (
                                            <div className=" flex justify-center items-center diaOfensiva rounded-[8px] border border-[#00000031] shadow-md bg-[#D9D9D9]">
                                            </div>
                                          )
                                        } else if (ofensiva[4] === 1 ){
                                          return (
                                            <div className=" flex justify-center items-center diaOfensiva rounded-[8px] border border-[#00000031] shadow-md bg-[#EB9481]">
                                              <X className="text-[#C10000] stroke-3 size-7"/>
                                            </div>
                                          )
                                        }
                                        else {
                                          return(
                                            <div className=" flex justify-center items-center diaOfensiva rounded-[8px] border border-[#00000031] shadow-md bg-[#A59EF0]">
                                              <Check className="text-white stroke-3 size-7 "/>
                                            </div>
                                          )
                                        }
                                      })()}
                                    </div>

                                    <div className="flex flex-col text-center ">
                                      <span className="text-[15px]">SEX</span>
                                      {(() => {
                                        if (ofensiva[5] === 0){
                                          return (
                                            <div className=" flex justify-center items-center diaOfensiva rounded-[8px] border border-[#00000031] shadow-md bg-[#D9D9D9]">
                                            </div>
                                          )
                                        } else if (ofensiva[5] === 1 ){
                                          return (
                                            <div className=" flex justify-center items-center diaOfensiva rounded-[8px] border border-[#00000031] shadow-md bg-[#EB9481]">
                                              <X className="text-[#C10000] stroke-3 size-7"/>
                                            </div>
                                          )
                                        }
                                        else {
                                          return(
                                            <div className=" flex justify-center items-center diaOfensiva rounded-[8px] border border-[#00000031] shadow-md bg-[#A59EF0]">
                                              <Check className="text-white stroke-3 size-7 "/>
                                            </div>
                                          )
                                        }
                                      })()}
                                    </div>
                                    
                                    <div className="flex flex-col text-center ">
                                      <span className="text-[15px]">SAB</span>
                                      {(() => {
                                        if (ofensiva[6] === 0){
                                          return (
                                            <div className=" flex justify-center items-center diaOfensiva rounded-[8px] border border-[#00000031] shadow-md bg-[#D9D9D9]">
                                            </div>
                                          )
                                        } else if (ofensiva[6] === 1 ){
                                          return (
                                            <div className=" flex justify-center items-center diaOfensiva rounded-[8px] border border-[#00000031] shadow-md bg-[#EB9481]">
                                              <X className="text-[#C10000] stroke-3 size-7"/>
                                            </div>
                                          )
                                        }
                                        else {
                                          return(
                                            <div className=" flex justify-center items-center diaOfensiva rounded-[8px] border border-[#00000031] shadow-md bg-[#A59EF0]">
                                              <Check className="text-white stroke-3 size-7 "/>
                                            </div>
                                          )
                                        }
                                      })()}
                                    </div>
                                  </>
                                )
                              } 
                              
                              // else {
                              //     return (
                              //       <>
                              //         <div className="flex flex-col text-center ">
                              //           <span className="text-[15px]">DOM</span>
                              //             <div className="diaOfensiva flex justify-center items-center rounded-[8px] border border-[#00000031] shadow-md bg-[#A59EF0]">
                              //               <Check className="text-white stroke-3 size-7"/>
                              //             </div>
                              //         </div>

                              //         <div className="flex flex-col text-center ">
                              //           <span className="text-[15px]">SEG</span>
                              //             <div className="diaOfensiva flex justify-center items-center rounded-[8px] border border-[#00000031] shadow-md bg-[#A59EF0]">
                              //               <Check className="text-white stroke-3 size-7"/>
                              //             </div>
                              //         </div>

                              //         <div className="flex flex-col text-center ">
                              //           <span className="text-[15px]">TER</span>
                              //             <div className="diaOfensiva flex justify-center items-center rounded-[8px] border border-[#00000031] shadow-md bg-[#A59EF0]">
                              //               <Check className="text-white stroke-3 size-7"/>
                              //             </div>
                              //         </div>

                              //         <div className="flex flex-col text-center ">
                              //           <span className="text-[15px]">QUA</span>
                              //             <div className="diaOfensiva flex justify-center items-center rounded-[8px] border border-[#00000031] shadow-md bg-[#A59EF0]">
                              //               <Check className="text-white stroke-3 size-7"/>
                              //             </div>
                              //         </div>

                              //         <div className="flex flex-col text-center ">
                              //           <span className="text-[15px]">QUI</span>
                              //             <div className="diaOfensiva flex justify-center items-center rounded-[8px] border border-[#00000031] shadow-md bg-[#A59EF0]">
                              //               <Check className="text-white stroke-3 size-7"/>
                              //             </div>
                              //         </div>

                              //         <div className="flex flex-col text-center ">
                              //           <span className="text-[15px]">SEX</span>
                              //             <div className="diaOfensiva flex justify-center items-center rounded-[8px] border border-[#00000031] shadow-md bg-[#A59EF0]">
                              //               <Check className="text-white stroke-3 size-7"/>
                              //             </div>
                              //         </div>

                              //         <div className="flex flex-col text-center ">
                              //           <span className="text-[15px]">SAB</span>
                              //             <div className="diaOfensiva flex justify-center items-center rounded-[8px] border border-[#00000031] shadow-md bg-[#A59EF0]">
                              //               <Check className="text-white stroke-3 size-7"/>
                              //             </div>
                              //         </div>

                                      
                              //       </>
                              //     )
                              // }

                            })()}
                            
                          </div>
                        </div>

                        <Image width={300} height={500}
                          src="/Vector.svg"
                          className="absolute right-[-50px] top-[-40px] z-[-10]"
                          alt="Decoração"
                        />
                      </motion.div>
                    )}

                  </AnimatePresence>
                </div>
              </div>

              <Flame className=" size-[30px] text-[#cc6b5f] fill-[#e19786]" />
            </div>

            <div id="pop2" className=" relative w-[55px] h-[55px] rounded-full bg-[#D9D9D9] cursor-pointer flex justify-center items-center border border-[#00000031] shadow-md ">
              <div
                onMouseEnter={() => opening2()}
                onMouseLeave={() => closing2()}
                className="w-full h-full absolute rounded-full z-[150] group"
              >
                <div className=" relative w-full h-full group cursor-pointer">

                  <AnimatePresence initial={false}>
                    { pop2 && (
                      <div className="w-[70px] h-[100px]"></div>
                    )}
                    { pop2 && (
                      <motion.div
                      key="content"
                      initial={{ opacity: 0.95, scale: 0.90}}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0.95, scale: 0.90 }}
                      transition={{ duration: 0.01, ease: "easeInOut" }}
                      className={`pop2_box absolute py-4  bg-white origin-top-left md:left-0 left-[-125%] h-fit transition-all ease-in-out border cursor-default border-[#00000031] shadow-md z-50 rounded-[25px] top-[85px] justify-center flex items-center overflow-hidden  `}>
                        <div className=" w-[85%] h-[95%] flex flex-col relative gap-[2%]">
                          <div className="">
                            <h1 className=" font-medium text-[20px] leading-none cursor-text">
                              Notificações
                            </h1>
                            <h2 className=" font-medium text-[18px] text-[#121212] cursor-text">
                              Fique em dia
                            </h2>
                          </div>

                          <div className="w-full h-fit max-h-[335px] py-1 bg-[rgb(217,217,217,57%)] rounded-[8px] flex items-center flex-col overflow-hidden z-100">
                            <div className=" w-full rounded-[20px] max-h-[335px] grid gap-1 pt-2 pb-2 pl-2 pr-2 overflow-auto ">
                              { notificacao.message === "Você não possui notificações no momento." && (
                                <>
                                  <div id="notificacao" className="w-full h-fit py-1 bg-[#A39CEC] rounded-[20px] items-center justify-center flex cursor-pointer">
                                    <div className=" overflow-hidden w-[90%] max-w-[400px]  flex gap-4 items-center justify-center">
                                      <div className="min-w-[70px] h-[70px] rounded-[15px] bg-[rgba(255,255,255,0.4)] flex justify-center items-center"><Info className="text-[#7D77BC] size-14"/></div>
                                      <div className="w-full max-w-[270px]">
                                        <h1 className="text-[20px] text-white">Não há notificações</h1>
                                        <h2 className="text-[18px] w-[100%] break-words">{notificacao.message}</h2>
                                      </div>
                                    </div>
                                  </div>
                                </>
                              )}
                            </div>
                          </div>
                        </div>

                        <Image width={300} height={500}
                          src="/Vector.svg"
                          className="absolute right-[-50px] top-[-40px]"
                          alt="Decoração"
                        />
                      </motion.div>
                    )}
                    
                  </AnimatePresence>
                </div>

              </div>
              <Bell className="size-[30px] text-[rgba(0,0,0,31%)]" />
            </div>
          </div>

          <div className="flex gap-2">
            <div className="text-end flex flex-col justify-center ">
              <h1 className="font-medium leading-none text-[clamp(1.35rem,3vw,1.875rem)]">
                {user.primeiroNome}
              </h1>
              <h2 className="font-medium text-[clamp(1.26rem,3vw,1.25rem)] text-[#828181]">
                {user.cargo}
              </h2>
            </div>

            <img
            src={`${user.foto}`}
            className="rounded-full cursor-pointer transition-all w-[55px] h-[55px] shadow-md bg-blue-200"
            alt="Foto de perfil"
            />
          </div>
        </div>

        <div className="w-full flex lg:flex-row flex-col mt-3 pb-3 gap-[30px] ">
          <div className="w-full lg:w-[60%]">
            <div className="w-full h-[230px] bg-[#CCB2FF] overflow-hidden shadow-md rounded-[35px] flex items-center relative border border-[#00000031] ">
              <div className="z-10 ml-[4%] w-[60%] h-[90%] flex justify-center items-center">
                <div className=" flex flex-col justify-between w-full h-[90%] ">
                    <h1 className="banner_title text-[22px] font-medium break-words">
                      {bannerData.mensagem} {bannerData.relatorio} 
                    </h1>

                    <a href={`/home/${bannerData.relatorioUrl}`} className=" rounded-full">
                      <button className="banner_button bg-[#1E2351] rounded-full text-white text-[18px] shadow-md leading-5">
                        Saiba mais!
                      </button>
                    </a>
                </div>
                
              </div>

              <Image width={300} height={500}
                  src="/meta.svg"
                  alt="Decoração"
                  className="banner h-full absolute  right-0 object-cover  "
                />
            </div>

            <h1 className="text-[30px] mt-4 mb-4">Seu progresso semanal:</h1>
            <div className="w-full ">
            { materias && materias.length === 0 && (

                <div className="w-full h-[230px] bg-[#CCB2FF] shadow-md rounded-[35px] flex items-center relative border border-[#00000031] ">
                    <div className="ml-10 w-[60%] h-[90%] flex justify-center items-center">
                        <div className=" flex flex-col py-2 justify-between w-full h-full  ">
                            <h1 className="text-[30px] h-fit font-medium line-clamp-3 break-words">
                                Nenhuma matéria criada ainda. Comece agora e organize seu caminho rumo ao sucesso!
                            </h1>

                            <Link href="/home/materiais" className=" rounded-full">
                              <button className="py-3 px-4 bg-[#1E2351] rounded-full text-white flex justify-center items-center gap-2 text-[18px] shadow-md leading-5 ">
                                  <Icons.CirclePlus className="size-8"/> Criar matéria
                              </button>
                            </Link>
                        </div>
                        
                    </div>
                    <Image width={300} height={500}
                        src="/semmateria.svg"
                        alt="Decoração"
                        className=" w-[310px] max-w-[40%] absolute h-[full] right-0 object-cover lg:flex hidden "
                        />
                </div>
            )}  
            
            { materias && materias.length > 0 && (
                <>
                  <Carousel className="w-full" opts={{ align: "start" }}>
                    <CarouselContent className="gap-4 min-h-[200px]">
                          {materias.map((material, index) => {
                              return (
                                  <CarouselItem
                                    key={index}
                                    className="basis-full sm:basis-[49%] lg:basis-[32.2%] cursor-pointer"
                                  >
                                    <Card
                                      style={{
                                        backgroundColor:
                                          material.cor && cores[material.cor as keyof typeof cores]
                                            ? cores[material.cor as keyof typeof cores]
                                            : "#FFFFFF",
                                      }}
                                      className="h-[200px] rounded-[25px] shadow-md border border-[#00000031] w-full"
                                    >
                                          <CardContent className="flex items-center justify-center h-full flex-col ">
                                              <Link href={`/home/materiais/${material.id}`} className=" mt-6 w-[98%]">
                                                  <div className=" flex gap-[6px] w-full items-center relative ">
                                                      <div className="w-[60px] h-[60px] rounded-full min-w-[60px] bg-white flex justify-center items-center ">
                                                      {(() => {
                                                          const IconComponent = icons.find(icon => icon.id.toLowerCase() === material.icone?.toLowerCase())?.Icon;
                                                          if (IconComponent) {
                                                              return <IconComponent className="size-[40px] text-[#757575]" />;
                                                          }
                                                          return null;
                                                      })()}
                                                      </div>
                      
                                                      <h1 className="text-[28px] overflow-hidden text-ellipsis line-clamp-2 break-words leading-8 font-medium ">
                                                      {material.nome}
                                                      </h1>
                                                  </div>
                      
                                                  <div className="w-full ">
                                                      <div className="w-full h-[7px] rounded-full bg-[rgb(30,35,81,14%)] text-[17px] font-medium mt-4">
                                                          <div className="w-[0%] h-[7px] rounded-full bg-[rgb(30,35,81,75%)] "></div>
                                                      </div>
                                                      <div className="flex justify-between ">
                                                          <span className="font-medium text-[17px]">
                                                          XP 
                                                          </span>
                                                          <span className="font-medium text-[17px]">0xp</span>
                                                      </div>
                                                  </div>
                      
                                              </Link>
                                              
                                          </CardContent>
                                      </Card>
                                  </CarouselItem>
                              )
                          })}
              
                      </CarouselContent>
                      {materias.length >3 &&(
                        <>
                          <CarouselPrevious />
                          <CarouselNext />
                        </>
                      )}
                  </Carousel>
                </>
            )} 
            </div>

            <h1 className="text-[30px] mt-4 mb-4">Links úteis:</h1>

            <div className="">
              <Carousel className="w-full" opts={{ align: "start" }}>
                  <CarouselContent className="gap-4 min-h-[200px]">
                    
                    <CarouselItem className="basis-full sm:basis-[49%] cursor-pointer" >
                      <Card className="h-[320px] rounded-[25px] bg-[#1E2351] shadow-md border border-[#00000031] w-full">
                        <CardContent className="flex items-center justify-center h-full flex-col p-0">
                            <div className="w-[92%] h-[95%] ">
                                <div className="w-full h-[70%] rounded-tl-[25px] rounded-tr-[25px] bg-[#EFE7FF] flex justify-center object-cover">
                                    <Image src="/trajetoria.svg" width={300} height={500} alt="Link Útil" className=" h-full w-full " />
                                </div>  
                                <p className="text-white text-[18px]">Como os grupos de estudo podem te ajudar na sua trajetória acadêmica?</p>
                            </div>

                        </CardContent>
                      </Card>
                    </CarouselItem>
                    
                    <CarouselItem className="basis-full sm:basis-[49%] cursor-pointer" >
                      <Card className="h-[320px] rounded-[25px] bg-[#1E2351] shadow-md border border-[#00000031] w-full">
                        <CardContent className="flex items-center justify-center h-full flex-col p-0">
                            <div className="w-[92%] h-[95%] ">
                                <div className="w-full h-[70%] rounded-tl-[25px] rounded-tr-[25px] bg-[#EFE7FF] flex justify-center object-cover">
                                    <Image src="/eficiente.svg" width={300} height={500} alt="Link Útil" className=" h-full w-full -mb-24" />
                                </div>  
                                <p className="text-white text-[18px]">Como os grupos de estudo podem te ajudar na sua trajetória acadêmica?</p>
                            </div>

                        </CardContent>
                      </Card>
                    </CarouselItem>
                    
                    <CarouselItem className="basis-full sm:basis-[49%] cursor-pointer" >
                      <Card className="h-[320px] rounded-[25px] bg-[#1E2351] shadow-md border border-[#00000031] w-full">
                        <CardContent className="flex items-center justify-center h-full flex-col p-0">
                            <div className="w-[92%] h-[95%] ">
                                <div className="w-full h-[70%] rounded-tl-[25px] rounded-tr-[25px] bg-[#EFE7FF] flex justify-center object-cover">
                                    <Image src="/trajetoria.svg" width={300} height={500} alt="Link Útil" className=" h-full w-full" />
                                </div>  
                                <p className="text-white text-[18px]">Como os grupos de estudo podem te ajudar na sua trajetória acadêmica?</p>
                            </div>

                        </CardContent>
                      </Card>
                    </CarouselItem>

                  </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>
          </div>

          <div className="lg:w-[40%] w-full overflow-hidden ">
            <div className=" bg-white h-[230px] flex flex-col justify-center items-center rounded-[35px] shadow-md bg border border-[#00000031]">
              <div className=" w-full flex h-[40%] text-center justify-center gap-20 items-center relative">
                <h1 className="text-[30px] font-bold ">{calendario.mesAtual} {calendario.anoAtual}</h1>
                <img src="/Vector.svg" alt="" className="absolute w-full rotate-[150deg] "/>
              </div>

              <div className=" w-[96%] flex flex-row justify-between h-[40%] text-center items-center">
                <div className="  flex justify-center">
                  <div className=" rounded-[15px]  justify-center  ">
                    <h2 className="text-[16px]">{calendario.dias?.[(calendario.diaAtual ?? 0) - 4]?.diaSemana}</h2>
                    <h1 className="font-bold text-[32px]">{calendario.dias?.[(calendario.diaAtual ?? 0) - 4]?.diaNumero}</h1>
                  </div>
                </div>

                <div className="  flex justify-center">
                  <div className=" rounded-[15px]  justify-center  ">
                    <h2 className="text-[16px]">{calendario.dias?.[(calendario.diaAtual ?? 0) - 3]?.diaSemana}</h2>
                    <h1 className="font-bold text-[32px]">{calendario.dias?.[(calendario.diaAtual ?? 0) - 3]?.diaNumero}</h1>
                  </div>
                </div>

                <div className="  flex justify-center">
                  <div className=" rounded-[15px]  justify-center  ">
                    <h2 className="text-[16px]">{calendario.dias?.[(calendario.diaAtual ?? 0) - 2]?.diaSemana}</h2>
                    <h1 className="font-bold text-[32px]">{calendario.dias?.[(calendario.diaAtual ?? 0) - 2]?.diaNumero}</h1>
                  </div>
                </div>

                <div className=" translate-y-[-10px] flex justify-center">
                  <div className="w-[60px] rounded-[15px] py-2 justify-center bg-[#CCB2FF] shadow-md">
                    <h2 className="text-[16px]">{calendario.dias?.[(calendario.diaAtual ?? 0) - 1]?.diaSemana}</h2>
                    <h1 className="font-bold text-[32px]">{calendario.dias?.[(calendario.diaAtual ?? 0) - 1]?.diaNumero}</h1>
                  </div>
                </div>

                <div className="  flex justify-center">
                  <div className=" rounded-[15px]  justify-center  ">
                    <h2 className="text-[16px]">{calendario.dias?.[(calendario.diaAtual ?? 0) + 1]?.diaSemana}</h2>
                    <h1 className="font-bold text-[32px]">{calendario.dias?.[(calendario.diaAtual ?? 0) ]?.diaNumero}</h1>
                  </div>
                </div>

                <div className="  flex justify-center">
                  <div className=" rounded-[15px]  justify-center  ">
                    <h2 className="text-[16px]">{calendario.dias?.[(calendario.diaAtual ?? 0) + 2]?.diaSemana}</h2>
                    <h1 className="font-bold text-[32px]">{calendario.dias?.[(calendario.diaAtual ?? 0) + 1]?.diaNumero}</h1>
                  </div>
                </div>

                <div className="  flex justify-center">
                  <div className=" rounded-[15px]  justify-center  ">
                    <h2 className="text-[16px]">{calendario.dias?.[(calendario.diaAtual ?? 0) + 3]?.diaSemana}</h2>
                    <h1 className="font-bold text-[32px]">{calendario.dias?.[(calendario.diaAtual ?? 0) + 2]?.diaNumero}</h1>
                  </div>
                </div>
              </div>
            </div>

            <h1 className="text-[30px] mt-4 mb-4 ">
              Salas de estudo recentes:
            </h1>
            <div id="scroll" className="max-h-[665px] overflow-y-auto pr-1 rounded-[25px] ">
              
              { salas.length === 0 && salas.length === 0 && (
                <div className="w-full h-[400px] bg-[#CCB2FF] py-4 rounded-[25px] flex  items-center flex-col shadow-md">
                  <div className="w-[90%] h-[35%]  flex justify-center items-center">
                      <h1 className="banner_title text-[22px] font-medium line-clamp-4 break-words">Entre em uma sala de estudos para acessar materiais diversos, tirar dúvidas e trocar ideias com outros estudantes.</h1>
                  </div>

                  <div className="flex relative w-[90%] h-[65%] ">
                    <div className="h-full absolute z-10 "><Image width={300} height={500}
                        src="/irparasalas.svg"
                        alt="Ir para Salas Decoration"
                        className="h-full w-full rounded-[25px]"
                      />
                    </div>

                    <div className=" z-20 ml-auto mr-[4%] w-[45%] h-[61px] ">
                      <a className=" cursor-pointer rounded-full">
                         <button className="banner_button bg-[#1E2351] rounded-full text-white text-[18px] shadow-md leading-5">
                          Ir para salas
                        </button>
                      </a>

                    </div>
                  </div>
                </div>
              )}
              { ( salas.length > 0 || salas.length > 0 ) &&  (
                <>
                  {salas.map((sala, index) =>{
                    return (
                      <div key={index} className="bg-white w-full h-[350px] rounded-[35px] shadow-md flex justify-center items-center mb-4 border border-[#00000031]">
                        <div className="w-[90%] h-[90%] flex flex-col justify-between ">
                          <div className="flex gap-[8px]">
                            {sala.topicos.map((topico, index) =>{
                              const randomColor = cor[Math.floor(Math.random() * cor.length)];
                              return (
                                <h2 key={index} style={{ backgroundColor: randomColor}} className="text-[18px] px-3 text-white rounded-full ">
                                  {topico}
                                </h2>
                              )
                            })}
                          </div>
                              
                          <div className="w-full leading-[55px]">
                            <h1 className="font-medium text-[30px]">{sala.nome}</h1>
                            <div className="h-[150px] w-full ">
                              <img 
                                src={sala.banner}
                                alt="Sala de Estudo"
                                className="w-full h-full object-cover rounded-[25px] shadow-md"
                              />
                            </div>
                            <div className="w-full h-[1px] bg-[#1E2351] mt-3 mb-3 "></div>
                          </div>

                          <div className="flex items-center ">
                            <div className="relative w-[160px] h-[50px] flex cursor-pointer">
                              <>
                                {avatares[3] && (
                                  <img 
                                    src={avatares[3]}
                                    className="diaOfensiva rounded-full absolute border-white border-[2px] left-[72px]"
                                    alt="Usuário"
                                  />
                                )}
                                {avatares[2] && (
                                  <img 
                                    src={avatares[2]}
                                    className="diaOfensiva rounded-full absolute border-white border-[2px] left-[48px]"
                                    alt="Usuário"
                                  />
                                )}
                                {avatares[1] && (
                                  <img 
                                    src={avatares[1]}
                                    className="diaOfensiva rounded-full absolute border-white border-[2px] left-[24px]"
                                    alt="Usuário"
                                  />
                                )}
                                {avatares[0] && (
                                  <img 
                                    src={avatares[0]}
                                    className="diaOfensiva rounded-full absolute border-white border-[2px]"
                                    alt="Usuário"
                                  />
                                )}
                              </>
                            </div>
                            <div className="flex justify-between  items-center h-[44px] w-full ">
                              <h2 className={`text-[18px] ${totalEstudantes > 4 ? "block": "hidden"} pl-1`}>+{totalEstudantes - 4} estudantes</h2>
                              {/* <button className="p-[5px_15px] h-full rounded-full bg-blue-950 text-white text-[18px] shadow-md">
                                Visitar
                              </button> */}
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}

                  {/* <div className="bg-white w-full h-[390px] rounded-[35px] shadow-md flex justify-center items-center mb-4 border border-[#00000031]">
                    <div className="w-[90%] ">
                      <div className="flex gap-[8px]">
                        <h2 className="text-[18px] pr-2 pl-2 text-white rounded-full bg-[#9767F8] ">
                          Idiomas
                        </h2>
                        <h2 className="text-[18px] pr-2 pl-2 text-white rounded-full bg-[#FF7664] ">
                          Português
                        </h2>
                      </div>

                      <div className="w-full leading-[55px]">
                        <h1 className="font-medium text-[40px]">Gramaticando</h1>
                        <Image width={300} height={500}
                          src="/gramaticando.svg"
                          alt="Sala de Estudo"
                          className="w-full rounded-[25px] shadow-md"
                        />
                        <div className="w-full h-[1px] bg-[#1E2351] mt-3 mb-3 "></div>
                      </div>

                      <div className="flex items-center ">
                        <div className="relative w-[160px] h-[50px] flex cursor-pointer">
                          <Image width={300} height={500}
                            src="/gramatiuser4.svg"
                            className="diaOfensiva rounded-full absolute border-white border-[2px] left-[72px]"
                            alt="Usuário"
                          />
                          <Image width={300} height={500}
                            src="/gramatiuser3.svg"
                            className="diaOfensiva rounded-full absolute border-white border-[2px] left-[48px]"
                            alt="Usuário"
                          />
                          <Image width={300} height={500}
                            src="/gramatiuser2.svg"
                            className="diaOfensiva rounded-full absolute border-white border-[2px] left-[24px]"
                            alt="Usuário"
                          />
                          <Image width={300} height={500}
                            src="/gramatiuser1.svg"
                            className="diaOfensiva rounded-full absolute border-white border-[2px]"
                            alt="Usuário"
                          />
                        </div>

                        <div className="flex justify-between  items-center h-[44px] w-full ">
                          <h2 className="text-[20px]">+50 estudantes</h2>
                          <button className="w-[120px] h-full rounded-full bg-blue-950 text-white text-[20px] shadow-md">
                            Visitar
                          </button>
                        </div>
                      </div>
                    </div>
                  </div> */}
                </>
              )}

            </div>
          </div>
        </div>
      </div>
    </>
  );
}
