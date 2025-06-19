import * as React from "react"
import Image from "next/image";
// import { useState, useEffect } from "react";
// import Link from "next/link";
// import {
//   CirclePlus, Heart, Globe, Monitor, CodeXml, HeartPulse,
//   Minus, Divide, X, Plus, Search, ChevronRight, ChevronsLeft,
//   ChevronsRight, ChevronLeft, AlarmClock, Bell, Book,
//   Bookmark, Calendar, Check, Clipboard, Clock,
//   Code, Cpu, Database, Download, Edit, Eye, File, Filter, Flag,
//   Folder, GitBranch, Globe2, Grid, Hash, Headphones, HelpCircle,
//   Home, Inbox, Info, Key, Layers, Layout, LifeBuoy, Lightbulb, List,
//   Loader, Lock, LogIn, LogOut, Mail, Map, Menu, SquareX, 
//   SquarePen,
//   Ellipsis
// } from "lucide-react";
// import * as Icons from "lucide-react";
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

// const icons = [
//   // Educação e aprendizado
//   { id: "book", Icon: Book }, { id: "bookmark", Icon: Bookmark },
//   { id: "clipboard", Icon: Clipboard }, { id: "file", Icon: File }, { id: "folder", Icon: Folder },
//   { id: "calendar", Icon: Calendar }, { id: "clock", Icon: Clock }, { id: "alarmClock", Icon: AlarmClock },
//   { id: "edit", Icon: Edit }, { id: "download", Icon: Download }, { id: "eye", Icon: Eye },
//   { id: "check", Icon: Check }, { id: "search", Icon: Search }, { id: "filter", Icon: Filter },
//   { id: "helpCircle", Icon: HelpCircle }, { id: "info", Icon: Info }, { id: "lightbulb", Icon: Lightbulb },

//   // Programação e lógica
//   { id: "code", Icon: Code }, { id: "codeXml", Icon: CodeXml }, { id: "cpu", Icon: Cpu }, { id: "database", Icon: Database },
//   { id: "gitBranch", Icon: GitBranch }, { id: "hash", Icon: Hash }, { id: "Monitor", Icon: Monitor },

//   // Matemática
//   { id: "plus", Icon: Plus }, { id: "minus", Icon: Minus }, { id: "x", Icon: X }, { id: "divide", Icon: Divide },

//   // Interface e organização de conhecimento
//   { id: "layers", Icon: Layers }, { id: "layout", Icon: Layout }, { id: "grid", Icon: Grid }, { id: "list", Icon: List },
//   { id: "menu", Icon: Menu }, { id: "loader", Icon: Loader },

//   // Comunicação e interações
//   { id: "mail", Icon: Mail }, { id: "inbox", Icon: Inbox }, { id: "bell", Icon: Bell }, { id: "headphones", Icon: Headphones },

//   // Identidade e acesso (login/logout para ambientes de estudo)
//   { id: "logIn", Icon: LogIn }, { id: "logOut", Icon: LogOut }, { id: "lock", Icon: Lock }, { id: "key", Icon: Key },

//   // Contexto global e navegação de conteúdo
//   { id: "globe", Icon: Globe }, { id: "globe2", Icon: Globe2 }, { id: "map", Icon: Map }, { id: "home", Icon: Home },
//   { id: "chevronRight", Icon: ChevronRight }, { id: "chevronLeft", Icon: ChevronLeft },
//   { id: "chevronsRight", Icon: ChevronsRight }, { id: "chevronsLeft", Icon: ChevronsLeft },

//   // Extras úteis
//   { id: "flag", Icon: Flag }, { id: "lifeBuoy", Icon: LifeBuoy }, { id: "circlePlus", Icon: CirclePlus },
//   { id: "heart", Icon: Heart }, { id: "heartPulse", Icon: HeartPulse }, { id: "squareX", Icon: SquareX },
//   { id: "squarePen", Icon: SquarePen }
// ];

type materiaItem = {
    id?: string;
    nome?: string;
    cor?: string;
    icone?: string;
    usuarioId?: string;
    materiais?: any[]; // or specify the correct type if known
    // add other properties if needed
};

// const cores = {
//     ROXO: "#8B81F3",
//     LILAS: "#CAC5FF",
//     ROSA: "#FFA6F1",
//     SALMAO: "#FFACA1",
// };


// export function CarouselSpacing({ Loading }: { Loading: (value: boolean) => void }) {
//     const [ materias, setMaterias ] = useState<materiaItem[]>([]);
//     useEffect(() => {

//         const materia = async () => {
//             try{
//                 const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/materias`, {
//                     method: 'GET',
//                     credentials: 'include',
//                 });
                
//                 const data = await res.json();
//                 setMaterias(data);
//                 console.log(materias)
//             } catch (err) {
//             console.error(err);
//             } finally {
//                 Loading(true); // ✅ tell parent that CarouselSpacing has finished
//                 console.log(Loading)
//             }
//         }; 
//         materia();

//     },[])

//     return (
//         <>
        
//             { materias && materias.length === 0 && (

//                 <div className="w-full h-[230px] bg-[#CCB2FF] shadow-md rounded-[35px] flex  items-center relative border border-[#00000031] ">
//                     <div className="ml-10 w-[60%]  h-[90%] flex justify-center items-center">
//                         <div className=" flex flex-col justify-center gap-[25%] w-full h-full  ">
//                             <h1 className="text-[32px]  font-medium line-clamp-2 break-words">
//                                 Nenhuma matéria criada ainda. Comece agora e organize seu caminho rumo ao sucesso!
//                             </h1>

//                             <Link href="/home/materiais" className="w-[40%] min-w-[40%] h-[30%] min-h-[30%] rounded-full">
//                             <button className="w-full h-full bg-[#1E2351] rounded-full text-white flex justify-center items-center gap-2 text-[22px] shadow-md leading-5 ">
//                                 <Icons.CirclePlus className="size-8"/> Criar matéria
//                             </button>
//                             </Link>
//                         </div>
                        
//                     </div>
//                     <Image width={300} height={500}
//                         src="/semmateria.svg"
//                         alt="Decoração"
//                         className=" w-[310px] max-w-[40%] absolute h-[full] right-0 object-cover  "
//                         />
//                 </div>
//             )}  
            
//             { materias && materias.length > 0 && (
//                 <>
//                     <Carousel className=" flex justify-center ">
//                         <CarouselContent className=" gap-4 min-h-[200px] w-[960px] pr-1 pl-1 ">
//                             {materias.map((material, index) => {
//                                 return (
//                                     <CarouselItem key={index} className=" md:basis-[32%] lg:basis-[32%] max-w-[376px] cursor-pointer">
//                                         <Card style={{ backgroundColor: material.cor && cores[material.cor as keyof typeof cores] ? cores[material.cor as keyof typeof cores] : "#FFFFFF" }} className=" h-[200px] rounded-[25px] max-w-[376px] shadow-md border border-[#00000031] ">
//                                             <CardContent className="flex items-center justify-center h-full flex-col ">
//                                                 <Link href="/home/materiais/Rede de computadores" className=" mt-6 w-[98%]">
//                                                     <div className=" flex gap-[6px] w-full items-center relative ">
//                                                         <div className="w-[60px] h-[60px] rounded-full min-w-[60px] bg-white flex justify-center items-center ">
//                                                         {(() => {
//                                                             const IconComponent = icons.find(icon => icon.id.toLowerCase() === material.icone?.toLowerCase())?.Icon;
//                                                             if (IconComponent) {
//                                                                 return <IconComponent className="size-[40px] text-[#757575]" />;
//                                                             }
//                                                             return null;
//                                                         })()}
//                                                         </div>
                        
//                                                         <h1 className="text-[28px] overflow-hidden text-ellipsis leading-8 font-medium ">
//                                                         {material.nome}
//                                                         </h1>
//                                                     </div>
                        
//                                                     <div className="w-full ">
//                                                         <div className="w-full h-[7px] rounded-full bg-[rgb(30,35,81,14%)] text-[17px] font-medium mt-4">
//                                                             <div className="w-[0%] h-[7px] rounded-full bg-[rgb(30,35,81,75%)] "></div>
//                                                         </div>
//                                                         <div className="flex justify-between ">
//                                                             <span className="font-medium text-[17px]">
//                                                             XP acumulada
//                                                             </span>
//                                                             <span className="font-medium text-[17px]">0xp</span>
//                                                         </div>
//                                                     </div>
                        
//                                                 </Link>
                                                
//                                             </CardContent>
//                                         </Card>
//                                     </CarouselItem>
//                                 )
//                             })}
                
//                         </CarouselContent>
//                         <CarouselPrevious />
//                         <CarouselNext />
//                     </Carousel>
//                 </>
//             )} 
//         </>
//     )
// }

export function CarouselLinks() {
    
    return (
        <Carousel className=" flex justify-center" opts={{ slidesToScroll: 2 }}>
            <CarouselContent className=" gap-4 w-[960px] pr-1 pl-1 ">

                <CarouselItem className=" md:basis-[50%] sm:basis-[40%] lg:basis-[49%] cursor-pointer">
                    <Card className=" h-[390px] rounded-[25px]  bg-[#1E2351] shadow-md border border-[#00000031]  ">
                        <CardContent className="flex items-center justify-center h-full flex-col p-0">
                            <div className="w-[95%] h-[95%] ">
                                <div className="w-full h-[70%] rounded-tl-[25px] rounded-tr-[25px] bg-[#EFE7FF] flex justify-center ">
                                    <Image src="/trajetoria.svg" width={300} height={500} alt="Link Útil" className=" h-full" />
                                </div>  
                                <p className="text-white text-[25px]">Como os grupos de estudo podem te ajudar na sua trajetória acadêmica?</p>
                            </div>
                        </CardContent>
                    </Card>
                </CarouselItem>

                <CarouselItem className=" md:basis-[32%] lg:basis-[49%] cursor-pointer">
                    <Card className=" h-[390px] rounded-[25px] min-w-[440px] bg-[#1E2351] shadow-md border border-[#00000031]  ">
                        <CardContent className="flex items-center justify-center h-full flex-col p-0">
                            <div className="w-[95%] h-[95%] ">
                                <div className="w-full h-[70%] rounded-tl-[25px] rounded-tr-[25px] bg-[#EFE7FF] flex justify-center ">
                                    <Image src="/eficiente.svg" alt="Link Útil" width={300} height={500} className=" h-full" />
                                </div>  
                                <p className="text-white text-[25px]">Como os grupos de estudo podem te ajudar na sua trajetória acadêmica?</p>
                            </div>
                        </CardContent>
                    </Card>
                </CarouselItem>

                <CarouselItem className=" md:basis-[32%] lg:basis-[49%] cursor-pointer">
                    <Card className=" h-[390px] rounded-[25px] min-w-[440px] bg-[#1E2351] shadow-md border border-[#00000031]  ">
                        <CardContent className="flex items-center justify-center h-full flex-col p-0">
                            <div className="w-[95%] h-[95%] ">
                                <div className="w-full h-[70%] rounded-tl-[25px] rounded-tr-[25px] bg-[#EFE7FF] flex justify-center ">
                                    <Image src="/trajetoria.svg" width={300} height={500} alt="Link Útil" className=" h-full" />
                                </div>  
                                <p className="text-white text-[25px]">Como os grupos de estudo podem te ajudar na sua trajetória acadêmica?</p>
                            </div>
                        </CardContent>
                    </Card>
                </CarouselItem>
            </CarouselContent>

        <CarouselPrevious />
        <CarouselNext />
        </Carousel>

    )
}

export function CarouselLanding() {
  return (
    <Carousel className=" flex justify-center " opts={{ slidesToScroll: 2 }}>
        <CarouselContent className=" w-[1150px] pr-1 pl-1 max-h-[350px] ">
            <CarouselItem className=" md:basis-[25%] flex justify-center w-[25%] max-w-[25%] cursor-pointer">
                <div className="flex justify-center flex-col items-center w-[80%] overflow-hidden gap-2">
                    <Image src="/landingpage/materiais-img1.svg" className="w-full" width={300} height={500} alt="Alt"/>
                    <h1 id="estudantes-tit" className="w-full text-center flex justify-center items-center leading-8 h-[64px]">Pré-universitários</h1>
                    <h2 id="estudantes-subtit">Professora de ciências</h2>
                </div>  
            </CarouselItem>

            <CarouselItem className=" md:basis-[25%] flex justify-center w-[25%] max-w-[25%] cursor-pointer">
                <div className="flex justify-center flex-col items-center w-[80%] overflow-hidden gap-2">
                    <Image src="/landingpage/materiais-img2.svg" className="w-full" width={300} height={500} alt="Alt"/>
                    <h1 id="estudantes-tit" className="w-full text-center leading-8 h-[64px]">Estudantes  Universitários</h1>
                    <h2 id="estudantes-subtit">Professora de desenho</h2>
                </div>  
            </CarouselItem>

            <CarouselItem className=" md:basis-[25%] flex justify-center w-[25%] max-w-[25%] cursor-pointer">
                <div className="flex justify-center flex-col items-center w-[80%] overflow-hidden gap-2">
                    <Image src="/landingpage/materiais-img3.svg" className="w-full" width={300} height={500} alt="Alt"/>
                    <h1 id="estudantes-tit" className="w-full text-center flex justify-center items-center leading-8 h-[64px]">Estudantes  Universitários</h1>
                    <h2 id="estudantes-subtit">Professor de matemática</h2>
                </div>  
            </CarouselItem>

            <CarouselItem className=" md:basis-[25%] flex justify-center w-[25%] max-w-[25%] cursor-pointer">
                <div className="flex justify-center flex-col items-center w-[80%] overflow-hidden gap-2">
                    <Image src="/landingpage/materiais-img4.svg" className="w-full" width={300} height={500} alt="Alt"/>
                    <h1 id="estudantes-tit" className="w-full text-center flex justify-center items-center leading-8 h-[64px]">Estudantes  Universitários</h1>
                    <h2 id="estudantes-subtit">Professora de leitura</h2>
                </div>  
            </CarouselItem>

            <CarouselItem className=" md:basis-[25%] flex justify-center w-[25%] max-w-[25%] cursor-pointer">
                <div className="flex justify-center flex-col items-center w-[80%] overflow-hidden gap-2">
                    <Image src="/landingpage/materiais-img1.svg" className="w-full" width={300} height={500} alt="Alt"/>
                    <h1 id="estudantes-tit" className="w-full text-center flex justify-center items-center leading-8 h-[64px]">Estudantes  Universitários</h1>
                    <h2 id="estudantes-subtit">Professora de ciências</h2>
                </div>  
            </CarouselItem>

        </CarouselContent>

      <CarouselPrevious />
      <CarouselNext />
    </Carousel>

  )
}