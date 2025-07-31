"use client";

import React, { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import ErrorModal from '@/components/ui/ErrorModal';

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", senha: "" });
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
      credentials: "include",
    });

    const data = await res.json();
    console.log(form);
    if (data.message === "Login realizado com sucesso") {
      router.push("/home");
    } else {
      setMessage(data.message);
    }
    console.log(data);
  };
  return (
    <>
      {message && (
        <ErrorModal message={message} onClose={() => setMessage(null)} />
      )}
      
      <div className="w-[100%] h-[100vh] flex justify-center bg-white">
          <div className="logincontainer w-[1600px] py-5 m-auto max-w-[90%] mx-auto flex lg:flex-row flex-col justify-center items-center">
            <AnimatePresence >
              <motion.div 
              key="loginimage"
              initial={{ opacity: 0, y: 10 }}
              animate={{opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.9, ease: "easeInOut", type: "spring", bounce: 0.4}}
              className="loginimage min-w-[50%] max-w-[50%] flex items-center h-fit">
                <Image src="/loginimage.svg" alt="Login Image" className='w-full' width={300} height={500}/>
              </motion.div>

              <motion.div key="login" className="login  w-[90%] lg:max-w-[50%] flex justify-center items-center">
                <div className=" flex flex-col w-[500px] gap-[20px] max-w-[100%] h-full ">
                  <div className="">
                    <h1 className='entrar text-[30px] font-bold leading-none text-[#EB7262]'>Entrar</h1>
                    <h2 className='bemvindo text-[18px] '>Bem-vindo de volta! Pronto para mais um dia de aprendizado?</h2>
                  </div>
                  
                  <form onSubmit={handleSubmit} className='flex flex-col gap-[5%] ' >
                    <div className="flex flex-col gap-4 items-end">
                      <input type="email" required placeholder='Digite seu email' onChange={(e) => setForm({ ...form, email: e.target.value })} className='p-3 w-full rounded-[25px] outline-[rgba(151,103,248,0.6)] border-2 border-[rgba(10,8,9,0.6)]'/>
                      <input type="password" required placeholder='Digite sua senha' onChange={(e) => setForm({ ...form, senha: e.target.value })} className='p-3 w-full rounded-[25px] outline-[rgba(151,103,248,0.6)] border-2 border-[rgba(10,8,9,0.6)]'/>
                      <a href='/esqueceu-senha' className=' text-[#3881AF] w-fit text-[15px]'>Esqueceu a senha?</a>
                    </div>

                    <motion.button 
                    whileTap={{scale: 0.99}}
                    whileHover={{scale: 1.01}}
                    transition={{ duration: 0.2, ease: "easeInOut"}}
                    type='submit' className='loginbotao bg-[#804EE5] py-[10px] text-white text-[18px] rounded-[25px] shadow-md'>Entrar</motion.button>

                  </form>

                  <div className="flex flex-col gap-4 mt-10">
                    <div className="flex justify-center items-center mt-[-15px] ">
                      <div className="h-[1px] w-[33%] bg-[rgba(0,0,0,0.50)] flex justify-center items-center"></div>
                      <span className='w-[33%] flex justify-center items-center text-[15px] text-center'>Ou continue com</span>
                      <div className="h-[1px] w-[33%] bg-[rgba(0,0,0,0.50)] flex justify-center items-center"></div>
                    </div>
            
                    <div className=" flex justify-center gap-4 h-[50px] ">
                      <a className="flex p-2 bg-[#804EE5] rounded-full h-full cursor-pointer">
                        <Image src="/google.svg" alt="Google Logo" className='w-full' width={300} height={500}/>
                      </a>
                      
                      <a className=" h-full p-2 rounded-full bg-[#804EE5] cursor-pointer">
                        <svg viewBox="0 0 96.124 96.123" fill="white" className=''  height="100%" xmlns="http://www.w3.org/2000/svg">
                          <path d="M72.09 0.006H59.681C44.479 0.006 34.89 9.729 34.89 25.138v11.801H22.362c-1.104 0-2 .896-2 2v15.803c0 1.104.896 2 2 2H34.89v39.381c0 1.104.896 2 2 2h16.436c1.104 0 2-.896 2-2V56.743h14.711c1.104 0 2-.896 2-2l.006-15.803a2 2 0 00-2-2H53.326v-9.99c0-4.807 1.145-7.246 7.383-7.246l11.381-.005c1.104 0 2-.896 2-2V2.006a2 2 0 00-2-2z"/>
                        </svg>
                      </a>
            
                    </div>

                    <h2 className='text-[15px] w-full text-center'>Não tem uma conta? <a href="/registrar" className='text-[#3881AF]'> Registre-se</a></h2>
                  </div>
                </div>
          
              </motion.div>
              
            </AnimatePresence>
            
          </div>
      </div>
    </>
  )
}

