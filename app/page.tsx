"use client";
import Image from "next/image";
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
import { useEffect, useState } from "react";
import { Backdrop } from "./components/backdrop";

export default function Home() {
  const [pop, setPop] = useState(false);
  const [pop2, setPop2] = useState(false);

  return (
    <>
      {(() => {
        if (pop == true) {
          return (
          <div id="backdrop" className="absolute w-full h-full">
            <Backdrop />
          </div>
          );
          
        }
        if (pop2 == true) {
          return (
          <div id="backdrop" className="absolute w-full h-full">
              <Backdrop />
          </div>
          );
        }
      })()}

      <div className=" w-[1580px] mx-auto h-full pb-8 max-h-full overflow-hidden ">
        <div className="h-[82px] mt-[15px] flex justify-between ">
          <div className="flex gap-[20px]">
            <div id="pop" className=" relative w-[72px] h-[72px] rounded-full bg-[#D9D9D9] cursor-pointer flex justify-center items-center border border-[#00000031] shadow-md ">
              <div
                onMouseEnter={() => setPop(true)}
                onMouseLeave={() => setPop(false)}
                className="w-full h-full absolute rounded-full z-10 group"
              >
                <div className=" relative w-full h-full group">
                  <div className="absolute w-[530px] h-[250px] bg-white border border-[#00000031] shadow-md z-50 rounded-[25px] top-[85px] hidden justify-center items-center overflow-hidden group-hover:flex">
                    <div className=" w-[85%] h-[75%] flex flex-col gap-6">
                      <div className="">
                        <h1 className=" font-medium leading-[40px] ">
                          Sua ofensiva
                        </h1>
                        <h2 className=" font-medium text-[22px] text-[#121212]">
                          Sua ofensiva atual é de 1 dia
                        </h2>
                      </div>

                      <div className="flex justify-between">
                        <div className="flex flex-col text-center ">
                          <span className="text-[20px]">DOM</span>
                          <div className=" flex justify-center items-center w-[50px] h-[50px] rounded-[8px] border border-[#00000031] shadow-md bg-[#A59EF0]">
                            <Check className="text-white" />
                          </div>
                        </div>

                        <div className="flex flex-col text-center ">
                          <span className="text-[20px]">DOM</span>
                          <div className=" flex justify-center items-center w-[50px] h-[50px] rounded-[8px] border border-[#00000031] shadow-md bg-[#A59EF0]">
                            <Check className="text-white" />
                          </div>
                        </div>
                        <div className="flex flex-col text-center ">
                          <span className="text-[20px]">TER</span>
                          <div className=" flex justify-center items-center w-[50px] h-[50px] rounded-[8px] border border-[#00000031] shadow-md bg-[#EB9481]">
                            <X className="text-[#C10000]" />
                          </div>
                        </div>

                        <div className="flex flex-col text-center ">
                          <span className="text-[20px] font-medium text-[#726BB6]">
                            QUA
                          </span>
                          <div className=" flex justify-center items-center w-[50px] h-[50px] rounded-[8px] border-[3px] border-[#726BB6] shadow-md bg-[#A59EF0]">
                            <Check className="text-white" />
                          </div>
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

                    <img
                      src="Vector.svg"
                      className="absolute right-[-50px] top-[-40px]"
                      alt=""
                    />
                  </div>
                </div>
              </div>
              <Flame className=" size-[45px] text-[#cc6b5f] fill-[#e19786]" />
            </div>
            <div className="w-[72px] h-[72px] rounded-full bg-[#D9D9D9] cursor-pointer flex justify-center items-center border border-[#00000031] shadow-md">
              
              <CircleHelp className="size-[45px] text-[rgba(0,0,0,31%)]" />
            </div>
            
            <div id="pop2" className=" relative w-[72px] h-[72px] rounded-full bg-[#D9D9D9] cursor-pointer flex justify-center items-center border border-[#00000031] shadow-md ">
              <div
                onMouseEnter={() => setPop2(true)}
                onMouseLeave={() => setPop2(false)}
                className="w-full h-full absolute rounded-full z-10 group"
              >
                <div className=" relative w-full h-full group">
                  <div className="absolute w-[450px] h-[450px] bg-white border border-[#00000031] shadow-md z-50 rounded-[25px] top-[85px] flex justify-center items-center overflow-hidden group-hover:flex">
                    <div className=" w-[85%] h-[87%] flex flex-col gap-5">
                      <div className="">
                        <h1 className=" font-medium leading-[40px] ">
                          Notificações
                        </h1>
                        <h2 className=" font-medium text-[22px] text-[#121212]">
                          Fique em dia
                        </h2>
                      </div>

                      <div className="w-full h-full bg-[rgb(217,217,217,57%)] rounded-[20px] flex items-center justify-center flex-col">
                        <div className=" h-[95%] w-[95%] rounded-[20px] flex flex-col gap-2">
                          <div className="w-full h-[89px] bg-[#A39CEC] rounded-[20px] "></div>
                          <div className="w-full h-[89px] bg-[#EB9481] rounded-[20px] "></div>
                          <div className="w-full h-[89px] bg-[#A39CEC] rounded-[20px] "></div>
                        </div>
                
                      </div>

                    </div>

                    <img
                      src="Vector.svg"
                      className="absolute right-[-50px] top-[-40px]"
                      alt=""
                    />
                  </div>
                </div>

              </div>
              <Bell className="size-[45px] text-[rgba(0,0,0,31%)]" />
            </div>
          </div>

          <div className="flex gap-2">
            <div className="text-end flex flex-col justify-center">
              <h1 className="font-medium leading-[40px] text-[35px]">
                Maria Eduarda
              </h1>
              <h2 className="font-medium text-[22px] text-[#828181]">
                Estudante
              </h2>
            </div>
            <img
              src="Profile.png"
              className="rounded-full cursor-pointer transition-all w-[75px] h-[75px] shadow-md"
              alt=""
            />
          </div>
        </div>

        <div className=" grid grid-cols-[62%_1fr] gap-[30px] justify-between mt-3 pb-3 overflow-hidden ">
          <div className="">
            <div className="w-[100%] h-[230px] bg-[#CCB2FF] shadow-md rounded-[35px] flex justify-center items-center relative border border-[#00000031]">
              <div className=" w-[90%] h-[80%] flex justify-between">
                <div className=" flex flex-col justify-between w-[65%]">
                  <h1 className="text-[32px] font-medium line-clamp-2 overflow-hidden text-ellipsis">
                    Bom dia, Maria! Veja o relatório das suas metas de estudo
                    semanais
                  </h1>

                  <button className="w-[250px] h-[55px] bg-[#1E2351] rounded-full text-white text-[22px] shadow-md">
                    Saiba mais!
                  </button>
                </div>
              </div>
              <img
                src="meta.svg"
                alt=""
                className=" absolute w-[350px] h-[230px] object-cover right-5 "
              />
            </div>

            <h1 className="text-[32px] mt-4 mb-4">Seu progresso semanal:</h1>

            <div className="w-full grid grid-cols-[1fr_1fr_1fr] gap-[10px] relative ">
              <div className="h-[200px] bg-[#CAC5FF] rounded-[25px] flex justify-center items-center overflow-ellipsis relative shadow-md border border-[#00000031]">
                <Ellipsis className="absolute top-1 right-3 cursor-pointer" />

                <div className="flex flex-col w-[85%] h-[60%] relative ">
                  <div className=" flex gap-[6px] items-center relative ">
                    <div className="w-[60px] h-[60px] rounded-full min-w-[60px] bg-white flex justify-center items-center ">
                      <MonitorCog className="size-[40px] text-[#757575]" />
                    </div>

                    <h1 className="text-[28px] overflow-hidden text-ellipsis leading-8 font-medium ">
                      Rede de computadores
                    </h1>
                  </div>

                  <div className="">
                    <div className="w-full h-[7px] rounded-full bg-[rgb(30,35,81,14%)] text-[17px] font-medium mt-4">
                      <div className="w-[23%] h-[7px] rounded-full bg-[rgb(30,35,81,75%)]"></div>
                      <div className="flex justify-between">
                        <span className="font-medium text-[17px]">
                          Progresso semanal
                        </span>
                        <span className="font-medium text-[17px]">23%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="h-[200px] bg-[#FFA6F1] rounded-[25px] flex justify-center items-center relative shadow-md border border-[#00000031]">
                <Ellipsis className="absolute top-1 right-3 cursor-pointer" />

                <div className="flex flex-col w-[85%] h-[60%] overflow-ellipsis">
                  <div className=" flex gap-[6px] items-center relative">
                    <div className="w-[60px] h-[60px] rounded-full min-w-[60px] bg-white flex justify-center items-center ">
                      <BrainCircuit className="size-[40px] text-[#757575]" />
                    </div>
                    <h1 className="text-[28px] overflow-hidden text-ellipsis leading-8 font-medium">
                      Ciência da computação
                    </h1>
                  </div>

                  <div className="">
                    <div className="w-full h-[7px] rounded-full bg-[rgb(30,35,81,14%)] text-[17px] font-medium mt-4">
                      <div className="w-[82%] h-[7px] rounded-full bg-[rgb(30,35,81,75%)]"></div>
                      <div className="flex justify-between">
                        <span className="font-medium text-[17px]">
                          Progresso semanal
                        </span>
                        <span className="font-medium text-[17px]">82%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="h-[200px] bg-[#FF9F93] rounded-[25px] flex justify-center items-center relative shadow-md border border-[#00000031]">
                <Ellipsis className="absolute top-1 right-3 cursor-pointer" />

                <div className="flex flex-col w-[85%] h-[60%] overflow-ellipsis">
                  <div className=" flex gap-[6px] items-center relative ">
                    <div className="w-[60px] h-[60px] rounded-full bg-white flex justify-center items-center ">
                      <HeartPulse className="size-[40px] text-[#757575]" />
                    </div>
                    <h1 className="text-[28px] overflow-hidden text-ellipsis leading-8 font-medium">
                      Enfermagem
                    </h1>
                  </div>

                  <div className="">
                    <div className="w-full h-[7px] rounded-full bg-[rgb(30,35,81,14%)] text-[17px] font-medium mt-4">
                      <div className="w-[48%] h-[7px] rounded-full bg-[rgb(30,35,81,75%)]"></div>
                      <div className="flex justify-between">
                        <span className="font-medium text-[17px]">
                          Progresso semanal
                        </span>
                        <span className="font-medium text-[17px]">48%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-[50px] h-[50px] rounded-full bg-[#1E2351] shadow-md absolute right-[-25px] top-[38%] flex justify-center items-center cursor-pointer">
                <ChevronRight className="text-white" />
              </div>
            </div>

            <h1 className="text-[32px] mt-4 mb-4">Links úteis:</h1>

            <div className="grid grid-cols-[1fr_1fr] h-[350px] gap-[20px] ">
              <div className="bg-[#1E2351] max-w-[100%] rounded-[25px] flex flex-col items-center shadow-md border border-[#00000031]">
                <div className=" w-[96%] h-[65%] bg-[#EFE7FF] rounded-tl-[15px] rounded-tr-[15px] mt-[8px] flex justify-center">
                  <div className=" w-fit h-[100%]">
                    <img src="trajetoria.svg" alt="" className="h-full " />
                  </div>
                </div>

                <p className=" w-[96%] h-[25%] text-[25px] text-white overflow-hidden text-ellipsis line-clamp-2 leading-8 mt-2 flex items-center ">
                  Como os grupos de estudo podem te ajudar na sua trajetória
                  acadêmica?
                </p>
              </div>

              <div className="bg-[#1E2351] max-w-[100%] rounded-[25px] flex flex-col items-center shadow-md border border-[#00000031]">
                <div className=" w-[96%] h-[65%] bg-[#EFE7FF] rounded-tl-[15px] rounded-tr-[15px] mt-[8px] flex justify-center">
                  <div className=" w-fit h-[100%]">
                    <img src="eficiente.svg" alt="" className="h-full " />
                  </div>
                </div>

                <p className=" w-[96%] h-[25%] text-[25px] text-white overflow-hidden text-ellipsis leading-8 mt-2 flex items-center">
                  Como posso estudar de forma eficiente?
                </p>
              </div>
            </div>
          </div>

          <div className=" ">
            <div className="bg-white h-[230px] rounded-[35px] shadow-md bg border border-[#00000031]">
              <div className=" w-full grid grid-cols-[1fr_1fr_1fr] h-[50%] text-center items-center ">
                <div className="flex justify-center items-center">
                  <ArrowLeft className="p-2 size-[70px] rounded-full cursor-pointer border border-[#1E2351] " />
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
                    <h1 className="font-bold text-[44px]">19</h1>
                  </div>
                </div>

                <div className="  flex justify-center">
                  <div className="w-[65px] rounded-[15px]  justify-center  ">
                    <h2 className="text-[16px]">DOM.</h2>
                    <h1 className="font-bold text-[44px]">20</h1>
                  </div>
                </div>

                <div className="  flex justify-center">
                  <div className="w-[65px] rounded-[15px]  justify-center  ">
                    <h2 className="text-[16px]">DOM.</h2>
                    <h1 className="font-bold text-[44px]">21</h1>
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
                    <h1 className="font-bold text-[44px]">23</h1>
                  </div>
                </div>

                <div className="  flex justify-center">
                  <div className="w-[65px] rounded-[15px]  justify-center  ">
                    <h2 className="text-[16px]">DOM.</h2>
                    <h1 className="font-bold text-[44px]">24</h1>
                  </div>
                </div>

                <div className="  flex justify-center">
                  <div className="w-[65px] rounded-[15px]  justify-center  ">
                    <h2 className="text-[16px]">DOM.</h2>
                    <h1 className="font-bold text-[44px]">25</h1>
                  </div>
                </div>
              </div>
            </div>

            <h1 className="text-[32px] mt-4 mb-4 ">
              Salas de estudo recentes:
            </h1>

            <div id="scroll" className=" h-[630px] overflow-y-auto pr-1 ">
              <div className="bg-white w-full h-[390px] rounded-[35px] shadow-md flex justify-center items-center mb-4 border border-[#00000031]">
                <div className="w-[90%] ">
                  <div className="flex gap-[8px]">
                    <h2 className="text-[18px] pr-2 pl-2 text-white rounded-full bg-[#9767F8] ">
                      Idiomas
                    </h2>
                    <h2 className="text-[18px] pr-2 pl-2 text-white rounded-full bg-[#FF7664] ">
                      Espanhol
                    </h2>
                  </div>

                  <div className="w-full leading-[55px] ">
                    <h1 className="font-medium text-[40px]">ImaginAcción</h1>
                    <img
                      src="imaginaccion.svg"
                      alt=""
                      className="w-full rounded-[25px] shadow-md"
                    />
                    <div className="w-full h-[1px] bg-[#1E2351] mt-3 mb-3 "></div>
                  </div>

                  <div className="flex items-center">
                    <div className="relative w-[160px] h-[50px] flex cursor-pointer">
                      <img
                        src="imaginuser4.svg"
                        className="w-[50px] h-[50px] rounded-full absolute border-white border-[2px] left-[72px]"
                      ></img>
                      <img
                        src="imaginuser3.svg"
                        className="w-[50px] h-[50px] rounded-full absolute border-white border-[2px] left-[48px]"
                      ></img>
                      <img
                        src="imaginuser2.svg"
                        className="w-[50px] h-[50px] rounded-full absolute border-white border-[2px] left-[24px]"
                      ></img>
                      <img
                        src="imaginuser1.svg"
                        className="w-[50px] h-[50px] rounded-full absolute border-white border-[2px] "
                      ></img>
                    </div>

                    <div className="flex justify-between  items-center h-[44px] w-full  ">
                      <h2 className="text-[20px]">+50 estudantes</h2>
                      <button className="w-[120px] h-full rounded-full bg-blue-950 text-white text-[20px] shadow-md">
                        Visitar
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white w-full h-[390px] rounded-[35px] shadow-md flex justify-center items-center mb-4 border border-[#00000031]">
                <div className="w-[90%] ">
                  <div className="flex gap-[8px]">
                    <h2 className="text-[18px] pr-2 pl-2 text-white rounded-full bg-[#9767F8] ">
                      Idiomas
                    </h2>
                    <h2 className="text-[18px] pr-2 pl-2 text-white rounded-full bg-[#FF7664] ">
                      Espanhol
                    </h2>
                  </div>

                  <div className="w-full leading-[55px]">
                    <h1 className="font-medium text-[40px]">Gramaticando</h1>
                    <img
                      src="gramaticando.svg"
                      alt=""
                      className="w-full rounded-[25px] shadow-md"
                    />
                    <div className="w-full h-[1px] bg-[#1E2351] mt-3 mb-3 "></div>
                  </div>

                  <div className="flex items-center ">
                    <div className="relative w-[160px] h-[50px] flex cursor-pointer">
                      <img
                        src="gramatiuser4.svg"
                        className="w-[50px] h-[50px] rounded-full absolute border-white border-[2px] left-[72px]"
                      ></img>
                      <img
                        src="gramatiuser3.svg"
                        className="w-[50px] h-[50px] rounded-full absolute border-white border-[2px] left-[48px]"
                      ></img>
                      <img
                        src="gramatiuser2.svg"
                        className="w-[50px] h-[50px] rounded-full absolute border-white border-[2px] left-[24px]"
                      ></img>
                      <img
                        src="gramatiuser1.svg"
                        className="w-[50px] h-[50px] rounded-full absolute border-white border-[2px] "
                      ></img>
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
