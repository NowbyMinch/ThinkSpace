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
    anoAtual?: string;
    dias?: DiaData[];
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
  type SalasResponse = {
    salasMembro: Sala[];
    salasModerador: Sala[];
  };

  const [ bannerData, setBannerData ] = useState<BannerData>({})
  const [ user, setUser ] = useState<UserData>({})
  const [ calendario, setCalendario ] = useState<CalendarioData>({})
  const [ salas, setSalas ] = useState<Sala[]>([])
  const [ notificacao, setNotificacao ] = useState<notificacaoData>({})
  const [ loading, setLoading ] = useState(true);
  const [ materias, setMaterias ] = useState<materiaItem[]>([]);
  
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
        setLoading(false);
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
        setLoading(false);
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
        setLoading(false);
        setCalendario(data)
      } catch (err) {
        setMessage("Erro ao carregar saudação.");
        console.error(err);
      }
    }; calendario();
    
    const salasDeEstudo = async () => {
      try{
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/home/salas-estudo`, {
          method: 'GET',
          credentials: 'include',
        });
        
        const data: SalasResponse = await res.json();
        const todasSalas = [...data.salasMembro, ...data.salasModerador];

        setSalas(todasSalas);
      
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

    // const ofensiva = async () => {
    //   try{
    //     const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/home/ofensiva`, {
    //       method: 'GET',
    //       credentials: 'include',
    //     });
        
    //     const data = await res.json();
        // setLoading(false);
    //     console.log(data);
    //   } catch (err) {
    //     setMessage("Erro ao carregar saudação.");
    //     console.error(err);
    //   }
    // }; ofensiva();

  }, []);

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

      <div className=" w-[1580px] max-w-[85%] mx-auto h-full pb-8 max-h-full  ">
        <div className="h-[82px] mt-[15px] flex justify-between ">
          <div className="flex gap-[20px] ">

            <div id="pop" className=" relative w-[72px] h-[72px] rounded-full bg-[#D9D9D9] cursor-pointer flex justify-center items-center border border-[#00000031] shadow-md ">
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

                  </AnimatePresence>
                  <AnimatePresence initial={false}>
                    { pop && (
                      
                      <motion.div 
                      key="content"
                      initial={{ opacity: 0.95, scale: 0.90}}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0.95, scale: 0.90 }}
                      transition={{ duration: 0.01, ease: "easeInOut" }}

                      className={`absolute w-[530px] h-[250px] origin-top-left transition-all ease-in-out bg-white border border-[#00000031] shadow-md z-50 rounded-[25px] top-[85px] justify-center items-center overflow-hidden flex cursor-default
                      `}>
                        <div className=" w-[85%] h-[75%] flex flex-col gap-6">
                          <div className="">
                            <h1 className="w-fit font-medium leading-[40px] cursor-text">
                              Sua ofensiva
                            </h1>
                            <h2 className="cursor-text font-medium text-[22px] w-fit text-[#121212] ">
                              Sua ofensiva atual é de 1 dia
                            </h2>
                          </div>

                          <div className="flex justify-between">

                            <div className="flex flex-col text-center ">
                              <span className="text-[20px]">DOM</span>
                              <div className=" flex justify-center items-center w-[50px] h-[50px] rounded-[8px] border border-[#00000031] shadow-md bg-[#D9D9D9]"></div>
                            </div>

                            <div className="flex flex-col text-center ">
                              <span className="text-[20px]">SEG</span>
                              <div className=" flex justify-center items-center w-[50px] h-[50px] rounded-[8px] border border-[#00000031] shadow-md bg-[#D9D9D9]"></div>
                            </div>

                            <div className="flex flex-col text-center ">
                              <span className="text-[20px]">TER</span>
                              <div className=" flex justify-center items-center w-[50px] h-[50px] rounded-[8px] border border-[#00000031] shadow-md bg-[#D9D9D9]"></div>
                            </div>

                            <div className="flex flex-col text-center ">
                              <span className="text-[20px]">QUA</span>
                              <div className=" flex justify-center items-center w-[50px] h-[50px] rounded-[8px] border border-[#00000031] shadow-md bg-[#D9D9D9]"></div>
                            </div>
                            
                            <div className="flex flex-col text-center ">
                              <span className="text-[20px]">QUI</span>
                              <div className=" flex justify-center items-center w-[50px] h-[50px] rounded-[8px] border border-[#00000031] shadow-md bg-[#D9D9D9]"></div>
                            </div>

                            <div className="flex flex-col text-center ">
                              <span className="text-[20px]">SEX</span>
                              <div className=" flex justify-center items-center w-[50px] h-[50px] rounded-[8px] border border-[#00000031] shadow-md bg-[#D9D9D9]"></div>
                            </div>
                            <div className="flex flex-col text-center ">
                              <span className="text-[20px]">SAB</span>
                              <div className=" flex justify-center items-center w-[50px] h-[50px] rounded-[8px] border border-[#00000031] shadow-md bg-[#D9D9D9]"></div>
                            </div>
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
              <Flame className=" size-[45px] text-[#cc6b5f] fill-[#e19786]" />
            </div>

            <div id="pop2" className=" relative w-[72px] h-[72px] rounded-full bg-[#D9D9D9] cursor-pointer flex justify-center items-center border border-[#00000031] shadow-md ">
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

                  </AnimatePresence>
                  
                  <AnimatePresence initial={false}>
                    { pop2 && (
                      <motion.div
                      key="content"
                      initial={{ opacity: 0.95, scale: 0.90}}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0.95, scale: 0.90 }}
                      transition={{ duration: 0.01, ease: "easeInOut" }}
                      className={`absolute w-[490px] h-fit py-4 max-h-[470px] bg-white origin-top-left transition-all ease-in-out border cursor-default border-[#00000031] shadow-md z-50 rounded-[25px] top-[85px] justify-center flex items-center overflow-hidden  `}>
                        <div className=" w-[85%] h-[87.5%] flex flex-col relative">
                          <div className="">
                            <h1 className=" font-medium leading-[40px] cursor-text">
                              Notificações
                            </h1>
                            <h2 className=" font-medium text-[22px] text-[#121212] cursor-text">
                              Fique em dia
                            </h2>
                          </div>

                          <div className="w-full h-fit max-h-[335px] py-1 bg-[rgb(217,217,217,57%)] rounded-[8px] flex items-center flex-col overflow-hidden mt-4 z-100">
                            <div className=" w-full rounded-[20px] max-h-[335px] grid gap-2 pt-2 pb-2 pl-2 pr-2 overflow-auto ">
                              { notificacao.message === "Você não possui notificações no momento." && (
                                <>
                                  <div id="notificacao" className="w-full h-fit py-1 bg-[#A39CEC] rounded-[20px] items-center justify-center flex cursor-pointer">
                                    <div className=" overflow-hidden w-[90%] max-w-[400px]  flex gap-4 items-center justify-center">
                                      <div className="min-w-[70px] h-[70px] rounded-[15px] bg-[rgba(255,255,255,0.4)] flex justify-center items-center"><Info className="text-[#7D77BC] size-14"/></div>
                                      <div className="w-full max-w-[270px]">
                                        <h1 className="text-[28px] text-white">Não há notificações</h1>
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
              <Bell className="size-[45px] text-[rgba(0,0,0,31%)]" />
            </div>
          </div>

          <div className="flex gap-2">
            <div className="text-end flex flex-col justify-center">
              <h1 className="font-medium leading-[40px] text-[35px]">
                {user.primeiroNome}
              </h1>
              <h2 className="font-medium text-[22px] text-[#828181]">
                {user.cargo}
              </h2>
            </div>
            <img
            src={`${user.foto}`}
            className="rounded-full cursor-pointer transition-all w-[75px] h-[75px] shadow-md"
            alt="Foto de perfil"
            />
          </div>
        </div>

        <div className=" grid grid-cols-[62%_1fr] mt-3 pb-3 gap-[30px] ">
          <div className=" ">
            <div className="w-full h-[230px] bg-[#CCB2FF] shadow-md rounded-[35px] flex  items-center relative border border-[#00000031] ">
              <div className="ml-10 w-[60%] h-[90%] flex justify-center items-center">
                <div className=" flex flex-col justify-center gap-[25%] w-full h-full  ">
                    <h1 className="text-[26px] font-medium line-clamp-3 break-words">
                      {bannerData.mensagem} {bannerData.relatorio} 
                    </h1>

                    <a href={`/home/${bannerData.relatorioUrl}`} className=" rounded-full">
                      <button className=" px-4 min-h-[56px] bg-[#1E2351] rounded-full text-white text-[18px] shadow-md leading-5">
                        Saiba mais!
                      </button>
                    </a>
                </div>
                
              </div>
              <Image width={300} height={500}
                  src="/meta.svg"
                  alt="Decoração"
                  className=" w-[350px] max-w-[40%] absolute h-full right-0 object-cover  "
                />
            </div>

            <h1 className="text-[32px] mt-4 mb-4">Seu progresso semanal:</h1>
            <div className=" ">
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
                        className=" w-[310px] max-w-[40%] absolute h-[full] right-0 object-cover  "
                        />
                </div>
            )}  
            
            { materias && materias.length > 0 && (
                <>
                  <Carousel className=" flex justify-center ">
                      <CarouselContent className=" gap-4 min-h-[200px] w-[960px] pr-1 pl-1 ">
                          {materias.map((material, index) => {
                              return (
                                  <CarouselItem key={index} className=" md:basis-[32%] lg:basis-[32%] max-w-[376px] cursor-pointer">
                                      <Card style={{ backgroundColor: material.cor && cores[material.cor as keyof typeof cores] ? cores[material.cor as keyof typeof cores] : "#FFFFFF" }} className=" h-[200px] rounded-[25px] max-w-[376px] shadow-md border border-[#00000031] ">
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
                      
                                                      <h1 className="text-[28px] overflow-hidden text-ellipsis leading-8 font-medium ">
                                                      {material.nome}
                                                      </h1>
                                                  </div>
                      
                                                  <div className="w-full ">
                                                      <div className="w-full h-[7px] rounded-full bg-[rgb(30,35,81,14%)] text-[17px] font-medium mt-4">
                                                          <div className="w-[0%] h-[7px] rounded-full bg-[rgb(30,35,81,75%)] "></div>
                                                      </div>
                                                      <div className="flex justify-between ">
                                                          <span className="font-medium text-[17px]">
                                                          XP acumulada
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

            <h1 className="text-[32px] mt-4 mb-4">Links úteis:</h1>

            <div className="">
              <CarouselLinks />
            </div>
          </div>

          <div className=" overflow-hidden ">
            <div className=" bg-white h-[230px] rounded-[35px] shadow-md bg border border-[#00000031]">
              <div className=" w-full flex h-[50%] text-center justify-center gap-20 items-center ">
                <div className="flex justify-center items-center">
                  <ArrowLeft className="p-2 size-[70px] rounded-full cursor-pointer border border-[#1E2351] " />
                </div>

                <h1 className="text-[42px] font-bold ">{calendario.mesAtual} {calendario.anoAtual}</h1>

                <div className="flex justify-center items-center">
                  <ArrowRight className="p-2 size-[70px] rounded-full cursor-pointer border border-[#1E2351]" />
                </div>
              </div>

              <div className=" w-full grid grid-flow-col h-[50%] text-center items-center">
                <div className="  flex justify-center">
                  <div className="w-[65px] rounded-[15px]  justify-center  ">
                    <h2 className="text-[16px]">{calendario.dias?.[12]?.diaSemana}.</h2>
                    <h1 className="font-bold text-[44px]">{calendario.dias?.[12]?.diaNumero}</h1>
                  </div>
                </div>

                <div className="  flex justify-center">
                  <div className="w-[65px] rounded-[15px]  justify-center  ">
                    <h2 className="text-[16px]">{calendario.dias?.[13]?.diaSemana}.</h2>
                    <h1 className="font-bold text-[44px]">{calendario.dias?.[13]?.diaNumero}</h1>
                  </div>
                </div>

                <div className="  flex justify-center">
                  <div className="w-[65px] rounded-[15px]  justify-center  ">
                    <h2 className="text-[16px]">{calendario.dias?.[14]?.diaSemana}.</h2>
                    <h1 className="font-bold text-[44px]">{calendario.dias?.[14]?.diaNumero}</h1>
                  </div>
                </div>

                <div className=" translate-y-[-10px] flex justify-center">
                  <div className="w-[65px] rounded-[15px] py-2 justify-center bg-[#CCB2FF] shadow-md">
                    <h2 className="text-[16px]">{calendario.dias?.[15]?.diaSemana}.</h2>
                    <h1 className="font-bold text-[44px]">{calendario.dias?.[15]?.diaNumero}</h1>
                  </div>
                </div>

                <div className="  flex justify-center">
                  <div className="w-[65px] rounded-[15px]  justify-center  ">
                    <h2 className="text-[16px]">{calendario.dias?.[16]?.diaSemana}.</h2>
                    <h1 className="font-bold text-[44px]">{calendario.dias?.[16]?.diaNumero}</h1>
                  </div>
                </div>

                <div className="  flex justify-center">
                  <div className="w-[65px] rounded-[15px]  justify-center  ">
                    <h2 className="text-[16px]">{calendario.dias?.[17]?.diaSemana}.</h2>
                    <h1 className="font-bold text-[44px]">{calendario.dias?.[17]?.diaNumero}</h1>
                  </div>
                </div>

                <div className="  flex justify-center">
                  <div className="w-[65px] rounded-[15px]  justify-center  ">
                    <h2 className="text-[16px]">{calendario.dias?.[18]?.diaSemana}.</h2>
                    <h1 className="font-bold text-[44px]">{calendario.dias?.[18]?.diaNumero}</h1>
                  </div>
                </div>
              </div>
            </div>

            <h1 className="text-[32px] mt-4 mb-4 ">
              Salas de estudo recentes:
            </h1>
            <div id="scroll" className="h-[665px] overflow-y-auto pr-1 rounded-[25px] ">
              
              { salas.length === 0 && salas.length === 0 && (
                <div className="w-full h-[500px] bg-[#CCB2FF] py-4 rounded-[25px] flex  items-center flex-col shadow-md">
                  <div className="w-[90%] h-[35%]  flex justify-center items-center">
                      <h1 className="text-[32px] font-medium line-clamp-3 break-words">Entre em uma sala de estudos para acessar materiais diversos, tirar dúvidas e trocar ideias com outros estudantes.</h1>
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
                        <button className="w-full h-full bg-[#1E2351] rounded-full text-white text-[22px] shadow-md leading-5">
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
                      <div key={index} className="bg-white w-full h-[390px] rounded-[35px] shadow-md flex justify-center items-center mb-4 border border-[#00000031]">
                        <div className="w-[90%] ">
                          <div className="flex gap-[8px]">
                            {sala.topicos.map((topico, index) =>{
                              const randomColor = cor[Math.floor(Math.random() * cor.length)];
                              return (
                                <h2 key={index} style={{ backgroundColor: randomColor}} className="text-[18px] px-3 text-white rounded-full ">
                                  {topico}
                                </h2>
                              )
                            })}
                            {/* <h2 className="text-[18px] pr-2 pl-2 text-white rounded-full bg-[#FF7664] ">
                              Espanhol
                            </h2> */}
                          </div>

                          <div className="w-full leading-[55px]">
                            <h1 className="font-medium text-[40px]">{sala.nome}</h1>
                            <div className="h-[150px] w-full ">
                              <Image width={300} height={500}
                                src={sala.banner}
                                alt="Sala de Estudo"
                                className="w-full h-full object-cover rounded-[25px] shadow-md"
                              />
                            </div>
                            <div className="w-full h-[1px] bg-[#1E2351] mt-3 mb-3 "></div>
                          </div>

                          <div className="flex items-center ">
                            <div className="relative w-[160px] h-[50px] flex cursor-pointer">
                              <Image width={300} height={500}
                                src="/imaginuser4.svg"
                                className="w-[50px] h-[50px] rounded-full absolute border-white border-[2px] left-[72px]"
                                alt="Usuário"
                              />
                              <Image width={300} height={500}
                                src="/imaginuser3.svg"
                                className="w-[50px] h-[50px] rounded-full absolute border-white border-[2px] left-[48px]"
                                alt="Usuário"
                              />
                              <Image width={300} height={500}
                                src="/imaginuser2.svg"
                                className="w-[50px] h-[50px] rounded-full absolute border-white border-[2px] left-[24px]"
                                alt="Usuário"
                              />
                              <Image width={300} height={500}
                                src="/imaginuser1.svg"
                                className="w-[50px] h-[50px] rounded-full absolute border-white border-[2px]"
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
                            className="w-[50px] h-[50px] rounded-full absolute border-white border-[2px] left-[72px]"
                            alt="Usuário"
                          />
                          <Image width={300} height={500}
                            src="/gramatiuser3.svg"
                            className="w-[50px] h-[50px] rounded-full absolute border-white border-[2px] left-[48px]"
                            alt="Usuário"
                          />
                          <Image width={300} height={500}
                            src="/gramatiuser2.svg"
                            className="w-[50px] h-[50px] rounded-full absolute border-white border-[2px] left-[24px]"
                            alt="Usuário"
                          />
                          <Image width={300} height={500}
                            src="/gramatiuser1.svg"
                            className="w-[50px] h-[50px] rounded-full absolute border-white border-[2px]"
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
