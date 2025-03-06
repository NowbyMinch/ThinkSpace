import Image from "next/image";
import {  Search  } from "lucide-react";
import { Flame } from 'lucide-react';
import { CircleHelp } from 'lucide-react';
import { Bell } from 'lucide-react';
import { ArrowLeft } from 'lucide-react';
import { ArrowRight } from 'lucide-react';
import { Ellipsis } from 'lucide-react';
import { ChevronRight } from 'lucide-react';

export default function Home() {
    return(
        <>
            <div className=" w-[1580px] mx-auto h-full pb-8 max-h-full overflow-hidden">

                <div className="h-[82px] mt-[15px] flex justify-between ">

                    <div className="w-[55%] h-fit relative rounded-[60px]">
                        <input type="text" id="search_bar" className=" w-full z-10 text-[25px] pl-5 h-[65px] border-2 border-[rgba(0,0,0,0.19)] rounded-[60px] outline-[#9767F8]" />
                        <Search className="absolute right-[20px] text-black opacity-[36%] cursor-pointer top-[25%] size-[30px] z-20"/>
                    </div>
                    
                    <div className="flex gap-[40px]">
                        
                        <div className="w-[75px] h-[75px] rounded-full bg-[#D9D9D9] cursor-pointer flex justify-center items-center"> <Flame className="size-[45px] text-[#C8837A] fill-[#E9B28B]"/> </div>
                        <div className="w-[75px] h-[75px] rounded-full bg-[#D9D9D9] cursor-pointer flex justify-center items-center"> <CircleHelp className="size-[45px] text-[rgba(0,0,0,31%)]"/> </div>
                        <div className="w-[75px] h-[75px] rounded-full bg-[#D9D9D9] cursor-pointer flex justify-center items-center"> <Bell className="size-[45px] text-[rgba(0,0,0,31%)]"/> </div>
                        <img src="Profile.png" className="rounded-full cursor-pointer transition-all w-[75px] h-[75px]" alt="" />

                    </div>
                </div>

                <div className=" grid grid-cols-[62%_1fr] gap-[30px] justify-between mt-3 l overflow-hidden ">

                    <div className="">
                        <div className="w-[100%] h-[230px] bg-[#CCB2FF] shadow-md rounded-[35px] flex justify-center items-center relative">
                            <div className=" w-[90%] h-[80%] flex justify-between">

                                <div className=" flex flex-col justify-between w-[65%]">
                                    <h1 className="text-[32px] font-medium line-clamp-2 overflow-hidden text-ellipsis">Bom dia, Maria! Veja o relatório das
                                    suas metas de estudo semanais</h1>

                                    <button className="w-[250px] h-[55px] bg-[#1E2351] rounded-full text-white text-[22px]">Saiba mais!</button>
                                </div>
                                
                            </div>

                            <img src="meta.svg" alt="" className=" absolute w-[350px] h-[230px] object-cover right-5 "/>

                        </div>

                        <h1 className="text-[32px] mt-4 mb-4">Seu progresso semanal:</h1>
                        
                        <div className="w-full grid grid-cols-[1fr_1fr_1fr] gap-[10px] relative ">
                             
                            <div className="h-[200px] bg-[#CAC5FF] rounded-[25px] flex justify-center items-center overflow-ellipsis relative shadow-md">
                                <Ellipsis className="absolute top-1 right-3 cursor-pointer"/>

                                <div className="flex flex-col w-[85%] h-[60%] relative ">

                                    <div className=" flex gap-[6px] items-center relative ">
                                        <div className="w-[60px] h-[60px] rounded-full min-w-[60px] bg-white"></div>
                                        <h1 className="text-[28px] overflow-hidden text-ellipsis leading-8 font-medium ">Rede de computadores</h1>
                                    </div>

                                    <div className="">

                                        <div className="w-full h-[7px] rounded-full bg-[rgb(30,35,81,14%)] text-[17px] font-medium mt-4">
                                            <div className="w-[23%] h-[7px] rounded-full bg-[rgb(30,35,81,75%)]"></div>
                                            <div className="flex justify-between">
                                                <span className="font-medium text-[17px]">Progresso semanal</span>
                                                <span className="font-medium text-[17px]">23%</span>
                                            </div>

                                        </div>
                                    </div>
                                
                                </div>

                            </div>
                            
                            <div className="h-[200px] bg-[#FFA6F1] rounded-[25px] flex justify-center items-center relative shadow-md">
                                <Ellipsis className="absolute top-1 right-3 cursor-pointer"/>

                                <div className="flex flex-col w-[85%] h-[60%] overflow-ellipsis">

                                    <div className=" flex gap-[6px] items-center relative">
                                        <div className="w-[60px] h-[60px] rounded-full min-w-[60px] bg-white"></div>
                                        <h1 className="text-[28px] overflow-hidden text-ellipsis leading-8 font-medium">Ciência da computação </h1>
                                    </div>

                                    <div className="">

                                        <div className="w-full h-[7px] rounded-full bg-[rgb(30,35,81,14%)] text-[17px] font-medium mt-4">
                                            <div className="w-[82%] h-[7px] rounded-full bg-[rgb(30,35,81,75%)]"></div>
                                            <div className="flex justify-between">
                                                <span className="font-medium text-[17px]">Progresso semanal</span>
                                                <span className="font-medium text-[17px]">82%</span>
                                            </div>

                                        </div>
                                    </div>
                                
                                </div>

                            </div>
                            
                            <div className="h-[200px] bg-[#FF9F93] rounded-[25px] flex justify-center items-center relative shadow-md">
                                <Ellipsis className="absolute top-1 right-3 cursor-pointer"/>

                                <div className="flex flex-col w-[85%] h-[60%] overflow-ellipsis">

                                    <div className=" flex gap-[6px] items-center relative ">
                                        <div className="w-[60px] h-[60px] rounded-full bg-white"></div>
                                        <h1 className="text-[28px] overflow-hidden text-ellipsis leading-8 font-medium">Enfermagem</h1>
                                    </div>

                                    <div className="">

                                        <div className="w-full h-[7px] rounded-full bg-[rgb(30,35,81,14%)] text-[17px] font-medium mt-4">
                                            <div className="w-[48%] h-[7px] rounded-full bg-[rgb(30,35,81,75%)]"></div>
                                            <div className="flex justify-between">
                                                <span className="font-medium text-[17px]">Progresso semanal</span>
                                                <span className="font-medium text-[17px]">48%</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="w-[50px] h-[50px] rounded-full bg-[#1E2351] shadow-md absolute right-[-25px] top-[38%] flex justify-center items-center cursor-pointer">
                            <ChevronRight className="text-white"/>
                            </div>

                        </div>

                        <h1 className="text-[32px] mt-4 mb-4">Links úteis:</h1>
                        
                        <div className="grid grid-cols-[1fr_1fr] h-[350px] gap-[20px] ">

                            <div className="bg-[#1E2351] max-w-[100%] rounded-[25px] flex flex-col items-center shadow-md ">
                                
                                <div className=" w-[96%] h-[65%] bg-[#EFE7FF] rounded-tl-[25px] rounded-tr-[25px] mt-[8px] flex justify-center">
                                    <div className=" w-fit h-[100%]">
                                        <img src="trajetoria.svg" alt="" className="h-full "/>
                                    </div>
                                </div>

                                <h2 className=" w-[96%] h-[25%] text-[25px] text-white overflow-hidden text-ellipsis line-clamp-2 leading-8 mt-2 flex items-center ">Como os grupos de estudo podem te ajudar na sua trajetória acadêmica? </h2>

                            </div>

                            <div className="bg-[#1E2351] max-w-[100%] rounded-[25px] flex flex-col items-center shadow-md">
                                
                                <div className=" w-[96%] h-[65%] bg-[#EFE7FF] rounded-tl-[25px] rounded-tr-[25px] mt-[8px] flex justify-center">
                                    <div className=" w-fit h-[100%]">
                                        <img src="eficiente.svg" alt="" className="h-full "/>
                                    </div>
                                </div>

                                <h2 className=" w-[96%] h-[25%] text-[25px] text-white overflow-hidden text-ellipsis leading-8 mt-2 flex items-center">Como posso estudar de forma eficiente? </h2>

                            </div>
                            
                            

                        </div>

                    </div>


                    <div className=" ">

                        <div className="bg-white h-[230px] rounded-[35px] shadow-md ">
                            
                            <div className=" w-full grid grid-cols-[1fr_1fr_1fr] h-[50%] text-center items-center">
                                
                                <div className="flex justify-center items-center">
                                    <ArrowLeft className="p-2 size-[70px] rounded-full cursor-pointer border border-[#1E2351] "/>

                                </div>

                                <h1 className="text-[42px] font-bold ">FEV 2025</h1>
                                
                                <div className="flex justify-center items-center">
                                    <ArrowRight className="p-2 size-[70px] rounded-full cursor-pointer border border-[#1E2351]" />
                                </div>

                            </div>

                            <div className=" w-full grid grid-flow-col h-[50%] text-center items-center">
                                
                                <div className="  flex justify-center">
                                    <div className="w-[65px] rounded-[15px]  justify-center  ">
                                        <h2 className="text-[16px]">DOM.</h2>
                                        <h1 className="font-bold text-[44px]">22</h1>
                                    </div>
                                </div>
                                
                                <div className="  flex justify-center">
                                    <div className="w-[65px] rounded-[15px]  justify-center  ">
                                        <h2 className="text-[16px]">DOM.</h2>
                                        <h1 className="font-bold text-[44px]">22</h1>
                                    </div>
                                </div>
                                
                                <div className="  flex justify-center">
                                    <div className="w-[65px] rounded-[15px]  justify-center  ">
                                        <h2 className="text-[16px]">DOM.</h2>
                                        <h1 className="font-bold text-[44px]">22</h1>
                                    </div>
                                </div>
                                
                                <div className=" translate-y-[-10px] flex justify-center">
                                    <div className="w-[65px] rounded-[15px] py-2 justify-center bg-[#CCB2FF] shadow-md">
                                        <h2 className="text-[16px]">DOM.</h2>
                                        <h1 className="font-bold text-[44px]">22</h1>
                                    </div>
                                </div>
                                
                                <div className="  flex justify-center">
                                    <div className="w-[65px] rounded-[15px]  justify-center  ">
                                        <h2 className="text-[16px]">DOM.</h2>
                                        <h1 className="font-bold text-[44px]">22</h1>
                                    </div>
                                </div>
                                
                                <div className="  flex justify-center">
                                    <div className="w-[65px] rounded-[15px]  justify-center  ">
                                        <h2 className="text-[16px]">DOM.</h2>
                                        <h1 className="font-bold text-[44px]">22</h1>
                                    </div>
                                </div>
                                
                                <div className="  flex justify-center">
                                    <div className="w-[65px] rounded-[15px]  justify-center  ">
                                        <h2 className="text-[16px]">DOM.</h2>
                                        <h1 className="font-bold text-[44px]">22</h1>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <h1 className="text-[32px] mt-4 mb-4 ">Salas de estudo recentes:</h1>

                        <div className=" h-[630px] overflow-y-scroll ">
                            
                            <div className="bg-white w-full h-[390px] rounded-[35px] shadow-md flex justify-center items-center mb-4 ">

                                <div className="w-[90%] ">
                                    <div className="flex gap-[8px]">
                                        <h2 className="text-[18px] pr-2 pl-2 text-white rounded-full bg-[#9767F8] ">Idiomas</h2>
                                        <h2 className="text-[18px] pr-2 pl-2 text-white rounded-full bg-[#FF7664] ">Espanhol</h2>
                                    </div>
                                    
                                    <div className="w-full leading-[55px] ">
                                        <h1 className="font-medium text-[40px]"  >ImaginAcción</h1>
                                        <img src="imaginaccion.svg" alt="" className="w-full rounded-[25px] shadow-md"/>
                                        <div className="w-full h-[1px] bg-[#1E2351] mt-3 mb-3 "></div>
                                    </div>

                                    <div className="flex items-center">
                                        <div className="relative w-[160px] h-[50px] flex cursor-pointer">
                                            <img src="imaginuser4.svg" className="w-[50px] h-[50px] rounded-full absolute border-white border-[2px] left-[72px]"></img>
                                            <img src="imaginuser3.svg" className="w-[50px] h-[50px] rounded-full absolute border-white border-[2px] left-[48px]"></img>
                                            <img src="imaginuser2.svg" className="w-[50px] h-[50px] rounded-full absolute border-white border-[2px] left-[24px]"></img>
                                            <img src="imaginuser1.svg" className="w-[50px] h-[50px] rounded-full absolute border-white border-[2px] "></img>
                                        </div>
                                        
                                        <div className="flex justify-between  items-center h-[44px] w-full  ">
                                            <h2 className="text-[20px]">+50 estudantes</h2>
                                            <button className="w-[120px] h-full rounded-full bg-blue-950 text-white text-[20px] shadow-md">Visitar</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white w-full h-[390px] rounded-[35px] shadow-md flex justify-center items-center mb-4 ">

                                <div className="w-[90%] ">
                                    <div className="flex gap-[8px]">
                                        <h2 className="text-[18px] pr-2 pl-2 text-white rounded-full bg-[#9767F8] ">Idiomas</h2>
                                        <h2 className="text-[18px] pr-2 pl-2 text-white rounded-full bg-[#FF7664] ">Espanhol</h2>
                                    </div>
                                    
                                    <div className="w-full leading-[55px]">
                                        <h1 className="font-medium text-[40px]">Gramaticando</h1>
                                        <img src="gramaticando.svg" alt="" className="w-full rounded-[25px] shadow-md"/>
                                        <div className="w-full h-[1px] bg-[#1E2351] mt-3 mb-3 "></div>
                                    </div>

                                    <div className="flex items-center ">
                                        <div className="relative w-[160px] h-[50px] flex cursor-pointer">
                                            <img src="gramatiuser4.svg" className="w-[50px] h-[50px] rounded-full absolute border-white border-[2px] left-[72px]"></img>
                                            <img src="gramatiuser3.svg" className="w-[50px] h-[50px] rounded-full absolute border-white border-[2px] left-[48px]"></img>
                                            <img src="gramatiuser2.svg" className="w-[50px] h-[50px] rounded-full absolute border-white border-[2px] left-[24px]"></img>
                                            <img src="gramatiuser1.svg" className="w-[50px] h-[50px] rounded-full absolute border-white border-[2px] "></img>
                                        </div>
                                        
                                        <div className="flex justify-between  items-center h-[44px] w-full ">
                                            <h2 className="text-[20px]">+50 estudantes</h2>
                                            <button className="w-[120px] h-full rounded-full bg-blue-950 text-white text-[20px] shadow-md">Visitar</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            
                        </div>


                    </div>


                </div>
        
            </div>

        </>
    );
};
