import * as React from "react"
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import * as Icons from "lucide-react";
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

export function CarouselSpacing() {


    // const [ materiais, setMateriais ] = useState();
    const materiais = useState() 

    const materias = async () => {
        try{
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/home/materias`, {
            method: 'GET',
            credentials: 'include',
        });
        
        const data = await res.json();
        console.log(data)
        } catch (err) {
        console.error(err);
        }
    }; materias();

  return (
    <>
      { !materiais && (
          <div className="w-full h-[230px] bg-[#CCB2FF] shadow-md rounded-[35px] flex  items-center relative border border-[#00000031] ">
            <div className="ml-10 w-[60%]  h-[90%] flex justify-center items-center">
                <div className=" flex flex-col justify-center gap-[25%] w-full h-full  ">
                    <h1 className="text-[32px]  font-medium line-clamp-2 break-words">
                        Nenhuma matéria criada ainda. Comece agora e organize seu caminho rumo ao sucesso!
                    </h1>

                    <Link href="/home/materiais" className="w-[40%] min-w-[40%] h-[30%] min-h-[30%] rounded-full">
                    <button className="w-full h-full bg-[#1E2351] rounded-full text-white flex justify-center items-center gap-2 text-[22px] shadow-md leading-5 ">
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

      { materiais && (
        <Carousel className=" flex justify-center ">
             <CarouselContent className=" gap-4 min-h-[200px] w-[960px] pr-1 pl-1 ">
                 
                 <CarouselItem className=" md:basis-[32%] lg:basis-[32%] max-w-[376px] cursor-pointer">
                     <Card className=" h-[200px] rounded-[25px] max-w-[376px] bg-[#CAC5FF] shadow-md border border-[#00000031] ">
                         <CardContent className="flex items-center justify-center h-full flex-col ">
                             <Link href="/home/materiais/Rede de computadores" className=" mt-6 w-[98%]">
                                 <div className=" flex gap-[6px] w-full items-center relative ">
                                     <div className="w-[60px] h-[60px] rounded-full min-w-[60px] bg-white flex justify-center items-center ">
                                     <Icons.MonitorCog className="size-[40px] text-[#757575]" />
                                     </div>
     
                                     <h1 className="text-[28px] overflow-hidden text-ellipsis leading-8 font-medium ">
                                     Rede de computadores
                                     </h1>
                                 </div>
     
                                 <div className="w-full ">
                                     <div className="w-full h-[7px] rounded-full bg-[rgb(30,35,81,14%)] text-[17px] font-medium mt-4">
                                         <div className="w-[23%] h-[7px] rounded-full bg-[rgb(30,35,81,75%)] "></div>
                                     </div>
                                     <div className="flex justify-between ">
                                         <span className="font-medium text-[17px]">
                                         XP acumulada
                                         </span>
                                         <span className="font-medium text-[17px]">500XP</span>
                                     </div>
                                 </div>
     
                             </Link>
                             
                         </CardContent>
                     </Card>
                 </CarouselItem>
     
                 <CarouselItem className=" md:basis-[32%] lg:basis-[32%] max-w-[376px] cursor-pointer">
                     <Card className=" h-[200px] rounded-[25px] max-w-[376px] bg-[#CAC5FF] shadow-md border border-[#00000031] ">
                         <CardContent className="flex items-center justify-center h-full flex-col ">
                             <Link href="/home/materiais/Rede de computadores" className=" mt-6 w-[98%]">
                                 <div className=" flex gap-[6px] w-full items-center relative ">
                                     <div className="w-[60px] h-[60px] rounded-full min-w-[60px] bg-white flex justify-center items-center ">
                                     <Icons.MonitorCog className="size-[40px] text-[#757575]" />
                                     </div>
     
                                     <h1 className="text-[28px] overflow-hidden text-ellipsis leading-8 font-medium ">
                                     Rede de computadores
                                     </h1>
                                 </div>
     
                                 <div className="w-full ">
                                     <div className="w-full h-[7px] rounded-full bg-[rgb(30,35,81,14%)] text-[17px] font-medium mt-4">
                                         <div className="w-[23%] h-[7px] rounded-full bg-[rgb(30,35,81,75%)] "></div>
                                     </div>
                                     <div className="flex justify-between ">
                                         <span className="font-medium text-[17px]">
                                         XP acumulada
                                         </span>
                                         <span className="font-medium text-[17px]">500XP</span>
                                     </div>
                                 </div>
     
                             </Link>
                             
                         </CardContent>
                     </Card>
                 </CarouselItem>
     
                 <CarouselItem className=" md:basis-[32%] lg:basis-[32%] max-w-[376px] cursor-pointer">
                     <Card className=" h-[200px] rounded-[25px] max-w-[376px] bg-[#CAC5FF] shadow-md border border-[#00000031] ">
                         <CardContent className="flex items-center justify-center h-full flex-col ">
                             <Link href="/home/materiais/Rede de computadores" className=" mt-6 w-[98%]">
                                 <div className=" flex gap-[6px] w-full items-center relative ">
                                     <div className="w-[60px] h-[60px] rounded-full min-w-[60px] bg-white flex justify-center items-center ">
                                     <Icons.MonitorCog className="size-[40px] text-[#757575]" />
                                     </div>
     
                                     <h1 className="text-[28px] overflow-hidden text-ellipsis leading-8 font-medium ">
                                     Rede de computadores
                                     </h1>
                                 </div>
     
                                 <div className="w-full ">
                                     <div className="w-full h-[7px] rounded-full bg-[rgb(30,35,81,14%)] text-[17px] font-medium mt-4">
                                         <div className="w-[23%] h-[7px] rounded-full bg-[rgb(30,35,81,75%)] "></div>
                                     </div>
                                     <div className="flex justify-between ">
                                         <span className="font-medium text-[17px]">
                                         XP acumulada
                                         </span>
                                         <span className="font-medium text-[17px]">500XP</span>
                                     </div>
                                 </div>
     
                             </Link>
                             
                         </CardContent>
                     </Card>
                 </CarouselItem>
     
                 <CarouselItem className=" md:basis-[32%] lg:basis-[32%] max-w-[376px] cursor-pointer">
                     <Card className=" h-[200px] rounded-[25px] max-w-[376px] bg-[#CAC5FF] shadow-md border border-[#00000031] ">
                         <CardContent className="flex items-center justify-center h-full flex-col ">
                             <Link href="/home/materiais/Rede de computadores" className=" mt-6 w-[98%]">
                                 <div className=" flex gap-[6px] w-full items-center relative ">
                                     <div className="w-[60px] h-[60px] rounded-full min-w-[60px] bg-white flex justify-center items-center ">
                                     <Icons.MonitorCog className="size-[40px] text-[#757575]" />
                                     </div>
     
                                     <h1 className="text-[28px] overflow-hidden text-ellipsis leading-8 font-medium ">
                                     Rede de computadores
                                     </h1>
                                 </div>
     
                                 <div className="w-full ">
                                     <div className="w-full h-[7px] rounded-full bg-[rgb(30,35,81,14%)] text-[17px] font-medium mt-4">
                                         <div className="w-[23%] h-[7px] rounded-full bg-[rgb(30,35,81,75%)] "></div>
                                     </div>
                                     <div className="flex justify-between ">
                                         <span className="font-medium text-[17px]">
                                         XP acumulada
                                         </span>
                                         <span className="font-medium text-[17px]">500XP</span>
                                     </div>
                                 </div>
     
                             </Link>
                             
                         </CardContent>
                     </Card>
                 </CarouselItem>
     
             </CarouselContent>
     
           <CarouselPrevious />
           <CarouselNext />
        </Carousel> 
      )}

    </>
  )
}

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