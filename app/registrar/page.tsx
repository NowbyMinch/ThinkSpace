"use client";

import { useRef, useEffect } from 'react';
import React from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import DatePicker from '@/components/ui/datepicker';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  
    // ✅ Initialize subStep state
  const [ subStep, setSubStep] = useState(1);
  
    // ✅ On first load: initialize history state
  useEffect(() => {
    if (typeof window !== 'undefined' && !history.state?.subStep) {
      history.replaceState({ subStep: 1 }, '');
    }
  }, []);

  // ✅ On subStep change: push new state into browser history
  useEffect(() => {
    if (typeof window !== 'undefined') {
      history.pushState({ subStep }, '', `?subStep=${subStep}`);
    }
  }, [subStep]);

  // ✅ Handle browser back/forward button
  useEffect(() => {
  if (typeof window !== 'undefined' && !history.state?.subStep) {
    history.replaceState({ subStep: 1 }, '');
  }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      history.pushState({ subStep }, '', `?subStep=${subStep}`);
    }
  }, [subStep]);

  useEffect(() => {
    const handlePopState = () => {
      setSubStep(1); // Always go to step 1 on browser back
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const [ purple, setPurple] = useState(false);
  const [ purple2, setPurple2] = useState(false);
  const [ categoria, setCategoria] = useState("");
  const [ finalizar, setFinalizar] = useState(false);
  const inputRefs = useRef<HTMLInputElement[]>([]);
  const categorias = (categoria: string) => {
    setSubStep(4);
    setCategoria(categoria);
  }

  const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    
    if (!Number.isInteger(value)) {
      e.preventDefault();
    };

    if (!/^[0-9]?$/.test(value)){
      value = ""; 
    }

    e.target.value = value;

    if (value && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }

  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !e.currentTarget.value && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }

  };

  function fade(p: React.Dispatch<React.SetStateAction<boolean>>){
    setTimeout(() => {
      p(true);
    }, 200);
  }

  function final(){
    setFinalizar(true);
    setTimeout(() => {
      setSubStep(5);
    }, 700);
  }

  return (
    <>
        <div className="w-[100%] h-[100vh] flex justify-center bg-[#A87CFF]">
            <div className="w-[1730px] h-full max-w-[90%] flex justify-center items-center ">
              <AnimatePresence >
                <div className="flex flex-col w-full items-center h-[900px] max-h-[90%] py-10 bg-white rounded-[35px] overflow-y-auto relative">
                  {(() => {
                    if (subStep < 5) {
                      return (
                        <>
                          <div className="flex items-center flex-col w-[45%]  max-w-[80%] ">
                            {(() => {
                              if (subStep === 2) {
                                return (
                                  <>
                                    <h1 className='text-[60px] font-bold text-[#EB7262] text-center'>Código de verificação</h1>
                                  </>
                                )
                              }
                              else if ( subStep === 4 && categoria === "restrito") {
                                return (
                                  <>
                                    <div className='text-[60px] font-bold text-[#EB7262] text-center'>Área do Administrador Geral </div>
                                  </>
                                )
                              }
                              else if (subStep < 5) {
                                return (
                                  <>
                                    <div className='text-[60px] font-bold text-[#EB7262]'>Primeiro acesso</div>
                                  </>
                                )
                              }
                            })()}
                            <h2 className='text-[25px] text-[rgba(55,71,79,0.84)] text-center'>Crie sua conta em poucos minutos e comece a explorar a plataforma rapidamente!</h2>
                          
                          </div>

                          <div className="w-[40%] h-14 mt-8 mb-10 flex justify-center items-center ">
                            <div className="bg-[#D9D9D9] w-full h-[4px] flex relative">

                              <div className={` ${subStep === 1 ? "w-[0%]" : subStep === 2 ? "w-[25%]" : subStep === 3 ? "w-[50%]" : subStep === 4 && !finalizar? "w-[75%]" : subStep === 4 && finalizar? "w-[100%]" : "" } transition-all ease-in-out duration-500 h-[4px] rounded-full bg-[#9767F8] relative`}>
                              </div>

                              <div className="w-12 h-12 bg-[#9767F8] rounded-full absolute top-[-20px] flex justify-center items-center text-white text-[25px]">1</div>

                              <div className={`${subStep > 2 ? fade(setPurple) : "bg-[#D9D9D9]"} ${purple ? "bg-[#9767F8]" : "bg-[#D9D9D9]"} transition-all ease-in-out duration-300 w-12 h-12 rounded-full absolute top-[-20px] left-[50%] translate-x-[-50%] flex justify-center items-center text-white text-[25px]`}>2</div>

                              <div className={`${finalizar ? fade(setPurple2) : "bg-[#D9D9D9]"} ${purple2 ? "bg-[#9767F8]" : "bg-[#D9D9D9]"} w-12 h-12 duration-300 rounded-full absolute top-[-20px] left-[100%] translate-x-[-100%] flex justify-center items-center text-white text-[25px]`}>3</div>
                            </div>
                          </div>

                          {(() => {
                            if (subStep === 1) {
                              return (
                                <div className="w-[70%] mb-16">
                                  <form onSubmit={(e) => { e.preventDefault(); setSubStep(subStep + 1)}} className='flex flex-col justify-center gap-20 h-[350px]'>
                                    <div className="flex justify-center items-center gap-20 h-full mt-24">
                                      <div className="w-[50%] flex flex-col gap-4">
                                        <div className="flex flex-col gap-1">
                                          <label htmlFor="" className='text-[26px] ml-3'>Primeiro nome</label>
                                          <input type="text" required placeholder='Digite seu nome' className='p-3 text-[20px] h-[60px] w-full rounded-[25px] outline-[rgba(151,103,248,0.6)] border-2 border-[rgba(10,8,9,0.6)]' />
                                        </div>

                                        <div className="flex flex-col gap-1">
                                          <label htmlFor="" className='text-[26px] ml-3'>Sobrenome</label>
                                          <input type="text" required placeholder='Digite seu Sobrenome' className='p-3 text-[20px] h-[60px] w-full rounded-[25px] outline-[rgba(151,103,248,0.6)] border-2 border-[rgba(10,8,9,0.6)]' />
                                        </div>

                                        <div className="flex flex-col gap-1">
                                          <label htmlFor="" className='text-[26px] ml-3'>Email</label>
                                          <input type="email" required placeholder='Digite seu email' className='p-3 text-[20px] h-[60px] w-full rounded-[25px] outline-[rgba(151,103,248,0.6)] border-2 border-[rgba(10,8,9,0.6)]' />
                                        </div>
                                      </div>

                                      <div className="w-[50%] flex flex-col gap-4">
                                        <div className="flex flex-col gap-1">
                                          <label htmlFor="" className='text-[26px] ml-3'>Data de nascimento</label>
                                          <DatePicker />
                                        </div>

                                        <div className="flex flex-col gap-1">
                                          <label htmlFor="" className='text-[26px] ml-3'>Senha</label>
                                          <input type="password" required placeholder='Digite seu senha' className='p-3 text-[20px] h-[60px] w-full rounded-[25px] outline-[rgba(151,103,248,0.6)] border-2 border-[rgba(10,8,9,0.6)]' />
                                        </div>

                                        <div className="flex flex-col gap-1">
                                          <label htmlFor="" className='text-[26px] ml-3'>Repita a senha</label>
                                          <input type="password" required placeholder='Digite a senha novamente' className='p-3 text-[20px] h-[60px] w-full rounded-[25px] outline-[rgba(151,103,248,0.6)] border-2 border-[rgba(10,8,9,0.6)]' />
                                        </div>
                                      </div>
                                    </div>

                                    <motion.div className=" flex justify-center items-center gap-10 relative w-[550px] max-w-[90%] mx-auto ">
                                      <div className="flex flex-col w-[200px] gap-10 max-w-[90%] ">
                                        <motion.button whileTap={{ scale: 0.99 }} whileHover={{ scale: 1.01 }} transition={{ duration: 0.2, ease: "easeInOut" }} 
                                        type='button'
                                        onClick={() => router.back()}
                                        className='bg-[#804EE5] py-[8px] text-white text-[25px] rounded-[25px] shadow-md'>Voltar</motion.button>
                                      </div>

                                      <div className="flex flex-col w-[200px] gap-10 max-w-[90%] ">
                                        <motion.button
                                          whileTap={{ scale: 0.99 }}
                                          whileHover={{ scale: 1.01 }}
                                          transition={{ duration: 0.2, ease: "easeInOut" }}
                                          type='submit'
                                          className='bg-[#804EE5] py-[8px] text-white text-[25px] rounded-[25px] shadow-md'>Próximo</motion.button>
                                      </div>
                                    </motion.div>
                                  </form>
                                </div>
                              );
                            }
                            else if (subStep === 2) {
                              return (
                                <div className="w-[70%] mb-16 flex gap-20 justify-center items-center flex-col">
                                  <form onSubmit={(e) => { e.preventDefault(); setSubStep(subStep + 1)}} className='flex flex-col justify-center items-center gap-20 '>
                                    <div className="w-[55%] flex flex-col gap-4 h-[350px] max-h-[90%] ">
                                      <div className="flex flex-col items-center gap-4 w-full h-full">
                                        <h2 className="text-gray-700 text-[25px]">Digite o seu código de verificação:</h2>
                                        <div className="flex gap-3  w-full h-full">
                                          {[...Array(5)].map((_, i) => (
                                            <input
                                              key={i}
                                              ref={(el) => { inputRefs.current[i] = el!; }}
                                              type="text"
                                              inputMode="numeric"
                                              required
                                              maxLength={1}
                                              onChange={(e) => handleChange(i, e)}
                                              onKeyDown={(e) => handleKeyDown(i, e)}
                                              className="w-full h-[200px] rounded-[10px] text-center text-[70px] transition-all ease-in-out duration-300 focus:bg-[#9767f834] font-semibold bg-[#d9d9d9c5] outline-[rgba(151,103,248,0.6)]"
                                            />
                                          ))}
                                        </div>
                                      </div>
                                    </div>
                                    <motion.div className=" flex justify-center items-center gap-10 relative w-[550px] max-w-[90%] mx-auto ">
                                        <div className="flex flex-col w-[200px] gap-10 max-w-[90%] ">
                                          <motion.button whileTap={{ scale: 0.99 }} whileHover={{ scale: 1.01 }} transition={{ duration: 0.2, ease: "easeInOut" }} onClick={() => setSubStep(subStep - 1)} className='bg-[#804EE5] py-[8px] text-white text-[25px] rounded-[25px] shadow-md'>Voltar</motion.button>
                                        </div>

                                        <div className="flex flex-col w-[200px] gap-10 max-w-[90%] ">
                                          <motion.button
                                            whileTap={{ scale: 0.99 }}
                                            whileHover={{ scale: 1.01 }}
                                            transition={{ duration: 0.2, ease: "easeInOut" }}
                                            type='submit'
                                            className='bg-[#804EE5] py-[8px] text-white text-[25px] rounded-[25px] shadow-md'>Próximo</motion.button>
                                        </div>
                                    </motion.div>
                                  </form>
                                </div>
                              )
                            }
                            else if (subStep === 3) {
                              return (
                                <div className="w-[70%] flex justify-center items-center flex-col gap-20 mb-16">
                                  <div className="w-[90%] flex flex-col gap-4 text-center h-[350px] max-h-[90%] ">
                                    <h2 className="text-gray-700 text-[25px]">Escolha sua categoria:</h2>
                                    <div className="flex gap-5 w-full h-full  flex-col justify-center items-center ">
                                      <AnimatePresence >
                                        <div className=" flex w-full h-full gap-9">
                                          <motion.button
                                            initial={{ y: 10 }}
                                            animate={{ y: 0 }}
                                            exit={{ y: 10 }}
                                            whileTap={{ scale: 1.03 }}
                                            whileHover="hovered"
                                            key="usuario"
                                            onClick={() => categorias("usuario")}
                                            className="h-full w-full flex items-end bg-[#9767F8] rounded-[20px] group overflow-hidden relative ">
                                            <motion.div
                                              variants={{
                                                hovered: { paddingLeft: "35px" }
                                              }}
                                              className=" w-full h-full pb-3 pl-5 rounded-[20px] flex text-[50px] font-semibold items-end text-white z-[10]">
                                              <div className='flex justify-center items-center'>
                                                <h1 className=''>Usuário</h1>
                                                <ChevronRight className='size-10' />
                                              </div>
                                            </motion.div>
                                            <motion.div
                                              className="w-full h-full absolute ">
                                              <div className="w-[290px] absolute right-[2%] top-[0%]">
                                                <Image alt='usuario background' width={300} height={500} src="/acessousuario.svg" className='w-full' />
                                              </div>
                                            </motion.div>
                                          </motion.button>

                                          <motion.button
                                            initial={{ y: 10 }}
                                            animate={{ y: 0 }}
                                            exit={{ y: 10 }}
                                            whileTap={{ scale: 1.03 }}
                                            whileHover="hovered"
                                            transition={{ duration: 0.3, ease: "easeInOut" }}
                                            key="restrito"
                                            onClick={() => categorias("restrito")}
                                            className="h-full w-full flex items-end bg-[#9767F8] rounded-[20px] group overflow-hidden relative ">
                                            <motion.div
                                              variants={{
                                                hovered: { paddingLeft: "35px" }
                                              }}
                                              className=" w-full h-full pb-3 pl-5 rounded-[20px] flex text-[50px] font-semibold items-end text-white z-[10]">
                                              <div className='flex justify-center items-center w-min leading-none'>
                                                <h1 className='w-min text-start'>Acesso Restrito</h1>
                                                <ChevronRight className='size-10' />
                                              </div>
                                            </motion.div>

                                            <motion.div
                                              className="w-full h-full absolute ">
                                              <div className="w-[275px] absolute right-[2%] top-[0%]">
                                                <Image alt='usuario background' width={300} height={500} src="/acessorestrito.svg" className='w-full' />
                                              </div>
                                            </motion.div>
                                          </motion.button>
                                        </div>
                                      </AnimatePresence>
                                    </div>
                                  </div>

                                  <motion.div className=" flex justify-center items-center gap-10 relative w-[550px] max-w-[90%] mx-auto">
                                    <div className="flex flex-col w-[200px] gap-10 max-w-[90%] ">
                                      <motion.button whileTap={{ scale: 0.99 }} whileHover={{ scale: 1.01 }} transition={{ duration: 0.2, ease: "easeInOut" }} onClick={() => setSubStep(subStep - 1)} className='bg-[#804EE5] py-[8px] text-white text-[25px] rounded-[25px] shadow-md'>Voltar</motion.button>
                                    </div>
                                  </motion.div>
                                </div>
                              )
                            }
                            else if (categoria === "usuario" && subStep === 4) {
                              return (
                                <div className="w-[70%] mb-16 ">
                                  <form onSubmit={(e) => {e.preventDefault(); final()}} className='flex flex-col justify-center items-center gap-20'>
                                    <div className="w-full h-[350px] flex gap-20 justify-center items-center max-h-[90%]">
                                      <div className="w-[50%] flex flex-col gap-6 ">

                                        <div className="flex flex-col gap-1">
                                          <label htmlFor="" className='text-[26px] ml-3'>Primeiro nome</label>
                                          <input type="text" required placeholder='Digite seu nome' className='p-3 text-[20px] h-[60px] w-full rounded-[25px] outline-[rgba(151,103,248,0.6)] border-2 border-[rgba(10,8,9,0.6)]' />
                                        </div>

                                        <div className="flex flex-col gap-1">
                                          <label htmlFor="" className='text-[26px] ml-3'>Email</label>
                                          <input type="email" required placeholder='Digite seu email' className='p-3 text-[20px] h-[60px] w-full rounded-[25px] outline-[rgba(151,103,248,0.6)] border-2 border-[rgba(10,8,9,0.6)]' />
                                        </div>
                                      </div>

                                      <div className="w-[50%] flex flex-col gap-6 ">
                                        <div className="flex flex-col gap-1">
                                          <label htmlFor="" className='text-[26px] ml-3'>Data de nascimento</label>
                                          <DatePicker />
                                        </div>

                                        <div className="flex flex-col gap-1">
                                          <label htmlFor="" className='text-[26px] ml-3'>Repita a senha</label>
                                          <input type="password" required placeholder='Digite a senha novamente' className='p-3 text-[20px] h-[60px] w-full rounded-[25px] outline-[rgba(151,103,248,0.6)] border-2 border-[rgba(10,8,9,0.6)]' />
                                        </div>
                                      </div>

                                    </div>

                                    <motion.div className=" flex justify-center items-center gap-10 relative w-[550px] max-w-[90%] mx-auto">
                                      <div className="flex flex-col w-[200px] gap-10 max-w-[90%] ">
                                        <motion.button whileTap={{ scale: 0.99 }} whileHover={{ scale: 1.01 }} transition={{ duration: 0.2, ease: "easeInOut" }} onClick={() => setSubStep(subStep - 1)} className='bg-[#804EE5] py-[8px] text-white text-[25px] rounded-[25px] shadow-md'>Voltar</motion.button>
                                      </div>

                                      <div className="flex flex-col w-[200px] gap-10 max-w-[90%] ">
                                        <motion.button
                                          whileTap={{ scale: 0.99 }}
                                          whileHover={{ scale: 1.01 }}
                                          transition={{ duration: 0.2, ease: "easeInOut" }}
                                          type='submit'
                                          className='bg-[#804EE5] py-[8px] text-white text-[25px] rounded-[25px] shadow-md'>Próximo</motion.button>
                                      </div>
                                    </motion.div>

                                  </form>
                                </div>
                              );
                            }

                            else if (categoria === "restrito" && subStep === 4) {
                              return (
                                <div className="w-[70%] mb-16 flex gap-20 justify-center items-center flex-col">
                                  <form onSubmit={(e) => { e.preventDefault(); final()}} className='flex flex-col justify-center items-center gap-[25px] '>
                                    <div className="w-[55%] flex flex-col  h-[350px] max-h-[90%] ">
                                      <div className="flex flex-col items-center gap-4 w-full h-full">
                                        <h2 className="text-gray-700 text-[25px]">Digite o seu código de administrador geral da plataforma:</h2>
                                        <div className="flex flex-col items-center gap-3 w-full h-full">
                                          <div className="flex gap-3">
                                            {[...Array(5)].map((_, i) => (
                                              <input
                                                key={i}
                                                ref={(el) => { inputRefs.current[i] = el!; }}
                                                type="text"
                                                inputMode="numeric"
                                                required
                                                maxLength={1}
                                                onChange={(e) => handleChange(i, e)}
                                                onKeyDown={(e) => handleKeyDown(i, e)}
                                                className="w-full h-[200px] rounded-[10px] text-center text-[70px] transition-all ease-in-out duration-300 focus:bg-[#9767f834] font-semibold bg-[#d9d9d9c5] outline-[rgba(151,103,248,0.6)]"
                                              />
                                            ))}

                                          </div>
                                          <a href='' className='underline text-[#3881AF] w-fit text-[18px]'>Não tem o seu código? Fale conosco</a>
                                        </div>
                                      </div>
                                      
                                    </div>

                                    <motion.div className=" flex justify-center items-center relative w-[550px] max-w-[90%] mx-auto  flex-col">
                                      <div className="h-[55px] flex justify-center items-center gap-2 overflow-hidden">
                                        <input type="checkbox" required className='size-4 accent-[#804EE5] cursor-pointer'/> 
                                        <h2 className='text-[20px]'>Li e concordo com os Termos de Uso e a Política de Privacidade.</h2>
                                      </div>
                                      <div className="flex gap-10">
                                        <div className="flex flex-col w-[200px]  max-w-[90%] ">
                                          <motion.button whileTap={{ scale: 0.99 }} whileHover={{ scale: 1.01 }} transition={{ duration: 0.2, ease: "easeInOut" }} onClick={() => setSubStep(subStep - 1)} className='bg-[#804EE5] py-[8px] text-white text-[25px] rounded-[25px] shadow-md'>Voltar</motion.button>
                                        </div>

                                        <div className="flex flex-col w-[200px]  max-w-[90%] ">
                                          <motion.button
                                            whileTap={{ scale: 0.99 }}
                                            whileHover={{ scale: 1.01 }}
                                            transition={{ duration: 0.2, ease: "easeInOut" }}
                                            type='submit'
                                            className='bg-[#804EE5] py-[8px] text-white text-[25px] rounded-[25px] shadow-md'>Próximo</motion.button>
                                        </div>

                                      </div>
                                    </motion.div>
                                  </form>
                                </div>
                                
                              );
                            }
                          })()}


                        </>
                      );
                    }
                    else{
                      return (
                        <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2, ease: "easeInOut" }}

                        className="w-[70%] mb-16 flex justify-center items-center">
                          <div className="w-[55%] flex flex-col gap-4 h-[350px] max-h-[90%] ">
                            <div className="flex flex-col items-center gap-4 w-full h-full">
                              <Image alt='Cadastro Concluído' width={200} height={200} src="/cadastroconcluido.svg" className='w-[650px] ' />
                              <h1 className='text-[55px] font-bold text-[#EB7262]'>Cadastro concluído!</h1>
                              <h2 className="text-gray-700 text-[22px] text-center">Agora é só fazer login com suas credenciais e aproveitar tudo o que o aplicativo tem a oferecer. Bem-vindo(a) à sua nova jornada de aprendizado! 🚀📚</h2>

                              <motion.button
                              whileHover={{ scale: 1.01 }}
                              whileTap={{ scale: 0.99 }}
                              className='bg-[#9767F8] w-[55%] py-2 rounded-full text-white text-[25px]'><a href="/login">Retornar ao login</a></motion.button>

                            </div>
                          </div>
                        </motion.div>
                      );
                    }
                  })()}
                    
                </div>
              </AnimatePresence>

              
            </div>
        </div>
    </>
  )
}

