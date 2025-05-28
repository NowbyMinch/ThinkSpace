"use client";

import React from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

export default function LoginPage() {
  const [ step, setStep] = useState(2);
  const [ subStep, setSubStep] = useState(1);
  const [ purple, setPurple] = useState(false);
  const [ purple2, setPurple2] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validation and auth logic here
    // If success:
    setStep(2);
  };

  function fade(p: React.Dispatch<React.SetStateAction<boolean>>){
    setTimeout(() => {
      p(true);
    }, 200);

  }

  return (
    <>
        <div className="w-[100%] h-[100vh] flex justify-center bg-white">
            <div className="w-[1600px] h-full max-w-[90%] flex ">
              
              <AnimatePresence >
                { step === 1 && (
                  <>
                    <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.9, ease: "easeInOut", type: "spring", bounce: 0.4}}

                    className="w-[50%] flex items-center h-fit">
                      <Image src="/loginimage.svg" alt="Login Image" className='w-full' width={300} height={500}/>
                    </motion.div>

                    <motion.div 

                    className="w-[50%] flex justify-center items-center">
                      <div className="flex flex-col w-[500px] gap-10 max-w-[90%] h-[700px] max-h-[90%]">
                        <div className="">
                          <h1 className='text-[60px] font-bold text-[#EB7262]'>Entrar</h1>
                          <h2 className='text-[26px]'>Bem-vindo de volta! Pronto para mais um dia de aprendizado?</h2>
                        </div>
                
                        <form onSubmit={handleSubmit} className='flex flex-col gap-10 ' method='POST'>
                          <div className="flex flex-col gap-4 items-end">
                            <input type="email" required placeholder='Digite seu email' className='p-3 text-[20px] h-[60px] w-full rounded-[25px] outline-[rgba(151,103,248,0.6)] border-2 border-[rgba(10,8,9,0.6)]'/>
                            <input type="password" required placeholder='Digite seu email' className='p-3 text-[20px] h-[60px] w-full rounded-[25px] outline-[rgba(151,103,248,0.6)] border-2 border-[rgba(10,8,9,0.6)]'/>
                            <a href='' className='underline text-[#3881AF] w-fit text-[18px]'>Esqueceu a senha?</a>
                          </div>

                          <motion.button 
                          whileTap={{scale: 0.99}}
                          whileHover={{scale: 1.01}}
                          transition={{ duration: 0.2, ease: "easeInOut"}}
                          type='submit' className='bg-[#804EE5] py-[10px] text-white text-[25px] rounded-[25px]'>Entrar</motion.button>

                        </form>
                
                        <div className="flex justify-center items-center mt-[-15px]">
                          <div className="h-[1px] w-[33%] bg-[rgba(0,0,0,0.50)] flex justify-center items-center"></div>
                          <span className='w-[33%] flex justify-center items-center text-[18px]'>Ou continue com</span>
                          <div className="h-[1px] w-[33%] bg-[rgba(0,0,0,0.50)] flex justify-center items-center"></div>
                        </div>
                
                        <div className=" flex justify-center gap-4 h-[60px]">
                          <a className="flex p-2 bg-[#804EE5] rounded-full h-full cursor-pointer">
                            <Image src="/google.svg" alt="Google Logo" className='w-full' width={300} height={500}/>
                          </a>
                          
                          <a className=" h-full p-2 rounded-full bg-[#804EE5] cursor-pointer">
                            <svg viewBox="0 0 96.124 96.123" fill="white" className=''  height="100%" xmlns="http://www.w3.org/2000/svg">
                              <path d="M72.09 0.006H59.681C44.479 0.006 34.89 9.729 34.89 25.138v11.801H22.362c-1.104 0-2 .896-2 2v15.803c0 1.104.896 2 2 2H34.89v39.381c0 1.104.896 2 2 2h16.436c1.104 0 2-.896 2-2V56.743h14.711c1.104 0 2-.896 2-2l.006-15.803a2 2 0 00-2-2H53.326v-9.99c0-4.807 1.145-7.246 7.383-7.246l11.381-.005c1.104 0 2-.896 2-2V2.006a2 2 0 00-2-2z"/>
                            </svg>
                          </a>
                
                        </div>
                      </div>
                
                    </motion.div>
                  </>
                ) }

                { step === 2 && (
                  <>
                    <div className="flex flex-col w-full items-center ">
                      
                      <div className="flex items-center flex-col w-[650px] mt-16 max-w-[42%] ">
                        {(() => {
                          if (subStep === 2) {
                            return <h1 className='text-[60px] font-bold text-[#EB7262]'>Código de verificação</h1>
                          } else {
                            return <h1 className='text-[60px] font-bold text-[#EB7262]'>Primeiro acesso</h1>
                          } 
                        })()}
                        <h2 className='text-[25px] text-[rgba(55,71,79,0.84)] text-center'>Crie sua conta em poucos minutos e comece a explorar a plataforma rapidamente!</h2>
                      </div>

                      <div className="w-[40%] h-14 mt-8 mb-10 flex justify-center items-center ">
                        <div className="bg-[#D9D9D9] w-full h-[4px] flex relative">

                          <div className={` ${ subStep === 1? "w-[0%]" : subStep === 2? "w-[25%]" : subStep === 3? "w-[50%]" : subStep === 4? "w-[75%]" : subStep > 4? 
                          "w-[100%]" : ""} transition-all ease-in-out duration-500 h-[4px] rounded-full bg-[#9767F8] relative`}>
                          </div>

                          <div className="w-12 h-12 bg-[#9767F8] rounded-full absolute top-[-20px] flex justify-center items-center text-white text-[25px]">1</div>

                          <div className={`${subStep > 2? fade(setPurple) : "bg-[#D9D9D9]"} ${ purple? "bg-[#9767F8]" : "bg-[#D9D9D9]" } transition-all ease-in-out duration-300 w-12 h-12 rounded-full absolute top-[-20px] left-[50%] translate-x-[-50%] flex justify-center items-center text-white text-[25px]`}>2</div>

                          <div className={`${subStep > 4? fade(setPurple2) : "bg-[#D9D9D9]"} ${ purple2? "bg-[#9767F8]" : "bg-[#D9D9D9]" } w-12 h-12 duration-300 rounded-full absolute top-[-20px] left-[100%] translate-x-[-100%] flex justify-center items-center text-white text-[25px]`}>3</div>
                        </div>
                      </div>

                      <div className="w-[70%] mb-16">
                        <form action="" className='flex justify-center items-center gap-20'>
                          <div className="w-[50%] flex flex-col gap-4">
                            <div className="flex flex-col gap-1">
                              <label htmlFor="" className='text-[24px] ml-3'>Primeiro nome</label>
                              <input type="text" placeholder='Digite seu nome' className='p-3 text-[20px] h-[60px] w-full rounded-[25px] outline-[rgba(151,103,248,0.6)] border-2 border-[rgba(10,8,9,0.6)]'/>
                            </div>

                            <div className="flex flex-col gap-1">
                              <label htmlFor="" className='text-[24px] ml-3'>Sobrenome</label>
                              <input type="text" placeholder='Digite seu Sobrenome' className='p-3 text-[20px] h-[60px] w-full rounded-[25px] outline-[rgba(151,103,248,0.6)] border-2 border-[rgba(10,8,9,0.6)]'/>
                            </div>

                            <div className="flex flex-col gap-1">
                              <label htmlFor="" className='text-[24px] ml-3'>Email</label>
                              <input type="text" placeholder='Digite seu email' className='p-3 text-[20px] h-[60px] w-full rounded-[25px] outline-[rgba(151,103,248,0.6)] border-2 border-[rgba(10,8,9,0.6)]'/>
                            </div>
                          </div>

                          <div className="w-[50%] flex flex-col gap-4">
                            <div className="flex flex-col gap-1">
                              <label htmlFor="" className='text-[24px] ml-3'>Data de nascimento</label>
                              <input type="text" placeholder='Digite sua data de nascimento' className='p-3 text-[20px] h-[60px] w-full rounded-[25px] outline-[rgba(151,103,248,0.6)] border-2 border-[rgba(10,8,9,0.6)]'/>
                            </div>

                            <div className="flex flex-col gap-1">
                              <label htmlFor="" className='text-[24px] ml-3'>Senha</label>
                              <input type="text" placeholder='Digite seu senha' className='p-3 text-[20px] h-[60px] w-full rounded-[25px] outline-[rgba(151,103,248,0.6)] border-2 border-[rgba(10,8,9,0.6)]'/>
                            </div>

                            <div className="flex flex-col gap-1">
                              <label htmlFor="" className='text-[24px] ml-3'>Repita a senha</label>
                              <input type="text" placeholder='Digite a senha novamente' className='p-3 text-[20px] h-[60px] w-full rounded-[25px] outline-[rgba(151,103,248,0.6)] border-2 border-[rgba(10,8,9,0.6)]'/>
                            </div>
                          </div>
                        </form>
                      </div>

                      <motion.div 
                      className=" flex justify-center items-center gap-10">
                        <div className="flex flex-col w-[200px] gap-10 max-w-[90%] max-h-[90%]">
                          <motion.button 
                          whileTap={{scale: 0.99}}
                          whileHover={{scale: 1.01}}
                          transition={{ duration: 0.2, ease: "easeInOut"}}
                          onClick={() => setSubStep(subStep + 1)}
                          className='bg-[#804EE5] py-[8px] text-white text-[25px] rounded-[25px]'>Entrar</motion.button>
                        </div>

                        <div className="flex flex-col w-[200px] gap-10 max-w-[90%] max-h-[90%]">
                          <motion.button 
                          whileTap={{scale: 0.99}}
                          whileHover={{scale: 1.01}}
                          transition={{ duration: 0.2, ease: "easeInOut"}}
                          onClick={() => setSubStep(subStep + 1)}
                          className='bg-[#804EE5] py-[8px] text-white text-[25px] rounded-[25px]'>Entrar</motion.button>
                        </div>
                      </motion.div>
                    </div>

                  </>
                ) }
                                              
              </AnimatePresence>

              
            </div>
        </div>
    </>
  )
}

