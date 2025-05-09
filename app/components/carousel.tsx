import * as React from "react"
import {
    Flame,
    CircleHelp,
    Bell,
    ArrowLeft,
    ArrowRight,
    Ellipsis,
    ChevronRight,
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
    <Carousel className="">
      <CarouselContent className="ml-[20px]">
        <CarouselItem  className=" md:basis-1/2 lg:basis-1/3 ">
            <div className=" ">
                <Card className=" h-[200px] w-[300px] rounded-[25px] bg-[#CAC5FF] shadow-md border border-[#00000031]">
                    <CardContent className="flex items-center justify-center h-full flex-col ">

                        <div className=" flex gap-[6px] items-center relative ">
                                <div className="w-[60px] h-[60px] rounded-full min-w-[60px] bg-white flex justify-center items-center ">
                                <MonitorCog className="size-[40px] text-[#757575]" />
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
                                        <span className="font-medium text-[17px]">500XP</span>
                                    </div>
                                </div>
                            </div>
                        
                    </CardContent>
                </Card>
            </div>
        </CarouselItem>

        <CarouselItem  className=" md:basis-1/2 lg:basis-1/3 ">
            <div className=" ">
                <Card className=" h-[200px] w-[300px] rounded-[25px] bg-[#FFA6F1] shadow-md border border-[#00000031]">
                    <CardContent className="flex items-center justify-center h-full flex-col ">

                        <div className=" flex gap-[6px] items-center relative ">
                                <div className="w-[60px] h-[60px] rounded-full min-w-[60px] bg-white flex justify-center items-center ">
                                <BrainCircuit className="size-[40px] text-[#757575]" />
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
                                        <span className="font-medium text-[17px]">500XP</span>
                                    </div>
                                </div>
                            </div>
                        
                    </CardContent>
                </Card>
            </div>
        </CarouselItem>

        <CarouselItem  className=" md:basis-1/2 lg:basis-1/3 ">
            <div className=" ">
                <Card className=" h-[200px] w-[300px] rounded-[25px] bg-[#FF9F93] shadow-md border border-[#00000031]">
                    <CardContent className="flex items-center justify-center h-full flex-col ">

                        <div className=" flex gap-[6px] items-center relative ">
                                <div className="w-[60px] h-[60px] rounded-full min-w-[60px] bg-white flex justify-center items-center ">
                                <HeartPulse className="size-[40px] text-[#757575]" />
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
            </div>
        </CarouselItem>
        <CarouselItem  className=" md:basis-1/2 lg:basis-1/3 ">
            <div className=" ">
                <Card className=" h-[200px] w-[300px] rounded-[25px] bg-[#CAC5FF] shadow-md border border-[#00000031]">
                    <CardContent className="flex items-center justify-center h-full flex-col ">

                        <div className=" flex gap-[6px] items-center relative ">
                                <div className="w-[60px] h-[60px] rounded-full min-w-[60px] bg-white flex justify-center items-center ">
                                <MonitorCog className="size-[40px] text-[#757575]" />
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
                                        <span className="font-medium text-[17px]">500XP</span>
                                    </div>
                                </div>
                            </div>
                        
                    </CardContent>
                </Card>
            </div>
        </CarouselItem>

        <CarouselItem  className=" md:basis-1/2 lg:basis-1/3 ">
            <div className=" ">
                <Card className=" h-[200px] w-[300px] rounded-[25px] bg-[#FFA6F1] shadow-md border border-[#00000031]">
                    <CardContent className="flex items-center justify-center h-full flex-col ">

                        <div className=" flex gap-[6px] items-center relative ">
                                <div className="w-[60px] h-[60px] rounded-full min-w-[60px] bg-white flex justify-center items-center ">
                                <BrainCircuit className="size-[40px] text-[#757575]" />
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
                                        <span className="font-medium text-[17px]">500XP</span>
                                    </div>
                                </div>
                            </div>
                        
                    </CardContent>
                </Card>
            </div>
        </CarouselItem>

        <CarouselItem  className=" md:basis-1/2 lg:basis-1/3 ">
            <div className=" ">
                <Card className=" h-[200px] w-[300px] rounded-[25px] bg-[#FF9F93] shadow-md border border-[#00000031]">
                    <CardContent className="flex items-center justify-center h-full flex-col ">

                        <div className=" flex gap-[6px] items-center relative ">
                                <div className="w-[60px] h-[60px] rounded-full min-w-[60px] bg-white flex justify-center items-center ">
                                <HeartPulse className="size-[40px] text-[#757575]" />
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
            </div>
        </CarouselItem>

        
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>

    

  )
}
