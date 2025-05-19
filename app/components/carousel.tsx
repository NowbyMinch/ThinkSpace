import * as React from "react"
import {
    HeartPulse,
    MonitorCog,
    BrainCircuit,
    Check,
    X,
  } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

export function CarouselSpacing() {
  return (
    <Carousel className=" flex justify-center">
        <CarouselContent className=" gap-4 w-[960px] pr-1 pl-1 ">

            <CarouselItem className=" md:basis-[32%] lg:basis-[32%] max-w-[376px]">
                <Card className=" h-[200px] rounded-[25px] max-w-[376px] bg-[#CAC5FF] shadow-md border border-[#00000031] ">
                    <CardContent className="flex items-center justify-center h-full flex-col ">

                        <div className=" flex gap-[6px] w-full items-center relative ">
                            <div className="w-[60px] h-[60px] rounded-full min-w-[60px] bg-white flex justify-center items-center ">
                            <MonitorCog className="size-[40px] text-[#757575]" />
                            </div>

                            <h1 className="text-[28px] overflow-hidden text-ellipsis leading-8 font-medium ">
                            Rede de computadores
                            </h1>
                        </div>

                        <div className="w-full">
                            <div className="w-full h-[7px] rounded-full bg-[rgb(30,35,81,14%)] text-[17px] font-medium mt-4">
                                <div className="w-[23%] h-[7px] rounded-full bg-[rgb(30,35,81,75%)] "></div>
                                <div className="flex justify-between ">
                                    <span className="font-medium text-[17px]">
                                    XP acumulada
                                    </span>
                                    <span className="font-medium text-[17px]">500XP</span>
                                </div>
                            </div>
                        </div>
                        
                    </CardContent>
                </Card>
            </CarouselItem>

            <CarouselItem className=" md:basis-[32%] lg:basis-[32%] max-w-[376px]">
                <Card className=" h-[200px] rounded-[25px] max-w-[376px] bg-[#FFA6F1] shadow-md border border-[#00000031] ">
                    <CardContent className="flex items-center justify-center h-full flex-col ">

                        <div className=" flex gap-[6px] w-full items-center relative ">
                            <div className="w-[60px] h-[60px] rounded-full min-w-[60px] bg-white flex justify-center items-center ">
                            <BrainCircuit className="size-[40px] text-[#757575]" />
                            </div>

                            <h1 className="text-[28px] overflow-hidden text-ellipsis leading-8 font-medium ">
                            Ciência da computação 
                            </h1>
                        </div>

                        <div className="w-full">
                            <div className="w-full h-[7px] rounded-full bg-[rgb(30,35,81,14%)] text-[17px] font-medium mt-4">
                                <div className="w-[23%] h-[7px] rounded-full bg-[rgb(30,35,81,75%)] "></div>
                                <div className="flex justify-between ">
                                    <span className="font-medium text-[17px]">
                                    XP acumulada
                                    </span>
                                    <span className="font-medium text-[17px]">400XP</span>
                                </div>
                            </div>
                        </div>
                        
                    </CardContent>
                </Card>
            </CarouselItem>

            <CarouselItem className=" md:basis-[32%] lg:basis-[32%] max-w-[376px]">
                <Card className=" h-[200px] rounded-[25px] max-w-[376px] bg-[#FF9F93] shadow-md border border-[#00000031] ">
                    <CardContent className="flex items-center justify-center h-full flex-col ">

                        <div className=" flex gap-[6px] w-full items-center relative ">
                            <div className="w-[60px] h-[60px] rounded-full min-w-[60px] bg-white flex justify-center items-center ">
                            <HeartPulse className="size-[40px] text-[#757575]" />
                            </div>

                            <h1 className="text-[28px] overflow-hidden text-ellipsis leading-8 font-medium ">
                            Enfermagem
                            </h1>
                        </div>

                        <div className="w-full">
                            <div className="w-full h-[7px] rounded-full bg-[rgb(30,35,81,14%)] text-[17px] font-medium mt-4">
                                <div className="w-[23%] h-[7px] rounded-full bg-[rgb(30,35,81,75%)] "></div>
                                <div className="flex justify-between ">
                                    <span className="font-medium text-[17px]">
                                    XP acumulada
                                    </span>
                                    <span className="font-medium text-[17px]">350XP</span>
                                </div>
                            </div>
                        </div>
                        
                    </CardContent>
                </Card>
            </CarouselItem>

            <CarouselItem className=" md:basis-[32%] lg:basis-[32%] max-w-[376px]">
                <Card className=" h-[200px] rounded-[25px] max-w-[376px] bg-[#CAC5FF] shadow-md border border-[#00000031] ">
                    <CardContent className="flex items-center justify-center h-full flex-col ">

                        <div className=" flex gap-[6px] w-full items-center relative ">
                            <div className="w-[60px] h-[60px] rounded-full min-w-[60px] bg-white flex justify-center items-center ">
                            <MonitorCog className="size-[40px] text-[#757575]" />
                            </div>

                            <h1 className="text-[28px] overflow-hidden text-ellipsis leading-8 font-medium ">
                            Rede de computadores
                            </h1>
                        </div>

                        <div className="w-full">
                            <div className="w-full h-[7px] rounded-full bg-[rgb(30,35,81,14%)] text-[17px] font-medium mt-4">
                                <div className="w-[23%] h-[7px] rounded-full bg-[rgb(30,35,81,75%)] "></div>
                                <div className="flex justify-between ">
                                    <span className="font-medium text-[17px]">
                                    XP acumulada
                                    </span>
                                    <span className="font-medium text-[17px]">500XP</span>
                                </div>
                            </div>
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

export function CarouselLinks() {
  return (
    
    <Carousel className=" flex justify-center" opts={{ slidesToScroll: 2 }}>
        <CarouselContent className=" gap-4 w-[960px] pr-1 pl-1 ">

            <CarouselItem className=" md:basis-[50%] sm:basis-[40%] lg:basis-[49%] ">
                <Card className=" h-[390px] rounded-[25px]  bg-[#1E2351] shadow-md border border-[#00000031]  ">
                    <CardContent className="flex items-center justify-center h-full flex-col p-0">
                        <div className="w-[95%] h-[95%] ">
                            <div className="w-full h-[70%] rounded-tl-[25px] rounded-tr-[25px] bg-[#EFE7FF] flex justify-center ">
                                <img src="../../trajetoria.svg" alt="" className=" h-full" />
                            </div>  
                            <p className="text-white text-[25px]">Como os grupos de estudo podem te ajudar na sua trajetória acadêmica?</p>
                        </div>
                    </CardContent>
                </Card>
            </CarouselItem>

            <CarouselItem className=" md:basis-[32%] lg:basis-[49%] ">
                <Card className=" h-[390px] rounded-[25px] min-w-[440px] bg-[#1E2351] shadow-md border border-[#00000031]  ">
                    <CardContent className="flex items-center justify-center h-full flex-col p-0">
                        <div className="w-[95%] h-[95%] ">
                            <div className="w-full h-[70%] rounded-tl-[25px] rounded-tr-[25px] bg-[#EFE7FF] flex justify-center ">
                                <img src="../../eficiente.svg" alt="" className=" h-full" />
                            </div>  
                            <p className="text-white text-[25px]">Como os grupos de estudo podem te ajudar na sua trajetória acadêmica?</p>
                        </div>
                    </CardContent>
                </Card>
            </CarouselItem>

            <CarouselItem className=" md:basis-[32%] lg:basis-[49%] ">
                <Card className=" h-[390px] rounded-[25px] min-w-[440px] bg-[#1E2351] shadow-md border border-[#00000031]  ">
                    <CardContent className="flex items-center justify-center h-full flex-col p-0">
                        <div className="w-[95%] h-[95%] ">
                            <div className="w-full h-[70%] rounded-tl-[25px] rounded-tr-[25px] bg-[#EFE7FF] flex justify-center ">
                                <img src="../../trajetoria.svg" alt="" className=" h-full" />
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
