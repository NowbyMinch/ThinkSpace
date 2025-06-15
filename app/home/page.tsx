"use client";
import Image from "next/image";
import {
  Flame,
  Bell,
  ArrowLeft,
  ArrowRight,
  Check,
  X,
  Info,
  TriangleAlert
} from "lucide-react";
import { useEffect, useState } from "react";
import { Backdrop } from "./components/backdrop";
import { Backdrop2 } from "./components/backdrop";
import { CarouselLinks, CarouselSpacing } from "./components/carousel";
import { motion, AnimatePresence } from "framer-motion";
import ErrorModal from '@/components/ui/ErrorModal';

export default function Home() {
  const [pop, setPop] = useState(false);
  const [pop2, setPop2] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  

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

  type salasData = {
    salasMembro?: string;
    salasModerador?: string;
    // add other properties if needed
  };

  type notificacaoData = {
    userId?: string;
    notificacoes?: Array<any>;
    message?: string;
    // add other properties if needed
  };
  
  const [ bannerData, setBannerData ] = useState<BannerData>({})
  const [ user, setUser ] = useState<UserData>({})
  const [ calendario, setCalendario ] = useState<CalendarioData>({})
  const [ salas, setSalas ] = useState<salasData>({})
  const [ notificacao, setNotificacao ] = useState<notificacaoData>({})

  useEffect(() => {
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
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/home/salas-estudo`, {
          method: 'GET',
          credentials: 'include',
        });
        
        const data = await res.json();
        console.log(data)
      } catch (err) {
        setMessage("Erro ao carregar saudação.");
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
        console.log(data);
        setNotificacao(data);
      } catch (err) {
        setMessage("Erro ao carregar saudação.");
        console.error(err);
      }
    }; notificacao();
    
  }, []);

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
                      className={`absolute w-[490px] h-[470px] bg-white origin-top-left transition-all ease-in-out border cursor-default border-[#00000031] shadow-md z-50 rounded-[25px] top-[85px] justify-center flex items-center overflow-hidden  `}>
                        <div className=" w-[85%] h-[87.5%] flex flex-col relative">
                          <div className="">
                            <h1 className=" font-medium leading-[40px] cursor-text">
                              Notificações
                            </h1>
                            <h2 className=" font-medium text-[22px] text-[#121212] cursor-text">
                              Fique em dia
                            </h2>
                          </div>

                          <div className="w-full  h-[75%] bg-[rgb(217,217,217,57%)] rounded-[8px] flex items-center flex-col overflow-hidden mt-4 z-100">
                            <div className=" w-full rounded-[20px] grid gap-2 pt-2 pb-2 pl-2 pr-2 overflow-auto ">
                              
                              ( )
                              {/* <div id="notificacao" className="w-full h-[89px] bg-[#A39CEC] rounded-[20px] flex items-center justify-center gap-2 cursor-pointer">
                                <div className="w-[70px] h-[70px] rounded-[15px] bg-[rgba(255,255,255,0.4)] flex justify-center items-center"><Info className="text-[#7D77BC] size-14"/> </div>
                                <div className="">
                                  <h1 className="text-[28px] text-white">Notificação de atenção</h1>
                                  <h2 className="text-[18px]">Descrição da notificação de comunidade</h2>
                                </div>
                              </div>

                              <div id="notificacao" className="w-full h-[89px] bg-[#EB9481] rounded-[20px] flex items-center justify-center gap-2 cursor-pointer">
                                <div className="w-[70px] h-[70px] rounded-[15px] bg-[rgba(255,255,255,0.4)] flex justify-center items-center"><TriangleAlert className="text-[#994533] size-14"/> </div>
                                <div className="">
                                  <h1 className="text-[28px] text-white">Notificação de denúncia</h1>
                                  <h2 className="text-[18px] text-[#7f3a2a]">Descrição da notificação de comunidade</h2>
                                </div>
                              </div> */}

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
            <img width={300} height={500}
            src={`${user.foto}`}
            className="rounded-full cursor-pointer transition-all w-[75px] h-[75px] shadow-md"
            alt="Foto de perfil"
            />
          </div>
        </div>

        <div className=" grid grid-cols-[62%_1fr] mt-3 pb-3 gap-[30px] ">
          <div className=" ">
            <div className="w-full h-[230px] bg-[#CCB2FF] shadow-md rounded-[35px] flex  items-center relative border border-[#00000031] ">
              <div className="ml-10 w-[60%]  h-[90%] flex justify-center items-center">
                <div className=" flex flex-col justify-center gap-[25%] w-full h-full  ">
                    <h1 className="text-[32px]  font-medium line-clamp-2 break-words">
                      {bannerData.mensagem} {bannerData.relatorio} 
                    </h1>

                    <a href={`/home/${bannerData.relatorioUrl}`} className="w-[40%] min-w-[40%] h-[30%] min-h-[30%] rounded-full">
                      <button className="w-full h-full bg-[#1E2351] rounded-full text-white text-[22px] shadow-md leading-5">
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
              <CarouselSpacing />
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
              
              {/* { salas && salas.length === 0 && (
                <div className="w-full h-[500px] bg-[#CCB2FF] rounded-[25px] flex  items-center flex-col shadow-md">
                  <div className="w-[90%] h-[35%]  flex justify-center items-center">
                      <h1 className="text-[32px] font-medium">Entre em uma sala de estudos para acessar materiais diversos, tirar dúvidas e trocar ideias com outros estudantes.</h1>
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
              { salas && salas.length > 0 &&  (
                <>
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
                        <h1 className="font-medium text-[40px]">ImaginAccíon</h1>
                        <Image width={300} height={500}
                          src="/Imaginaccion.svg"
                          alt="Sala de Estudo"
                          className="w-full rounded-[25px] shadow-md"
                        />
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

                  <div className="bg-white w-full h-[390px] rounded-[35px] shadow-md flex justify-center items-center mb-4 border border-[#00000031]">
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
                  </div>
                </>
              )} */}

            </div>
          </div>
        </div>
      </div>
    </>
  );
}
