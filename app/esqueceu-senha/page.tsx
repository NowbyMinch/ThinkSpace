"use client";

import React, { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X } from 'lucide-react';
// import { useState } from 'react';

export default function LoginPage() {
    const [ step, setStep ] = useState(1);
    const inputRefs = useRef<HTMLInputElement[]>([]);
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

    return (
        <>
            <div className="w-[100%] h-[100vh] flex justify-center bg-[#A87CFF] ">
                <div className="w-[1730px] h-full max-w-[90%] flex justify-center items-center ">
                <AnimatePresence >
                    <div className="flex flex-col w-full items-center h-[900px] max-h-[90%] py-10 bg-white overflow-y-hidden rounded-[35px] relative">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} transition={{ duration: 0.2, ease: "easeInOut" }} className="w-[70%] mb-16 flex justify-center h-full">

                        <div className="w-[55%] flex flex-col mt-10 items-center gap-4 max-h-[90%] overflow-hidden">
                            <div className="flex flex-col items-center gap-10 w-full max-w-[100%] h-full ">
                                <div className="flex flex-col justify-center items-center ">
                                    <h1 className='text-[60px] font-bold text-[#EB7262] text-center'>Esqueceu a senha?</h1>
                                    <h2 className="text-gray-700 text-[22px] text-center">
                                        {step === 1? "Insira o seu email e enviaremos um código de verificação para você voltar a acessar a sua conta.": 
                                        step === 2? "Um e-mail de confirmação foi enviado. Digite o código de verificação para redefinir sua senha com segurança." : 
                                        step === 3? "Crie uma nova senha com pelo menos 8 caracteres, incluindo letras, números e símbolos." : ""}
                                    </h2>
                                </div>
                                
                                {step === 1 && (
                                    <motion.form 
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    onSubmit={() => setStep(2)} className='flex flex-col gap-8 w-full max-w-[500px]'>
                                        <div className="flex flex-col gap-4 justify-center items-center">
                                            <input type="email" required placeholder='Digite seu email' className='p-3 text-[20px] h-[60px] w-full rounded-[25px] outline-[rgba(151,103,248,0.6)] border-2 border-[rgba(10,8,9,0.6)]'/>
                                        </div>
                                        
                                        <motion.button
                                        whileHover={{ scale: 1.01 }}
                                        whileTap={{ scale: 0.99 }}
                                        transition={{ duration: 0.2, ease: "easeInOut" }}
                                        type='submit'
                                        className='bg-[#9767F8] mx-auto w-full max-w-[450px] py-2 rounded-full text-white text-[25px]'>Enviar código</motion.button>
                                        <div className="flex justify-center items-center mt-[-15px] ">
                                            <div className="h-[1px] w-full bg-[rgba(0,0,0,0.50)] flex justify-center items-center"></div>
                                            <span className="px-4 flex justify-center items-center text-[18px]">Ou</span>
                                            <div className="h-[1px] w-full bg-[rgba(0,0,0,0.50)] flex justify-center items-center"></div>
                                        </div>

                                        <h2 className="text-[20px] w-full text-center flex gap-1 justify-center items-center mt-[-15px]">Volte ao
                                            <a href="/login" className="text-[#3881AF]">Login</a>
                                        </h2>
                                    </motion.form>
                                )}
                                
                                {step === 2 && (
                                    <motion.form 
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }} 
                                    onSubmit={() => setStep(3) }
                                    className='flex flex-col gap-8 w-full justify-center items-center h-[100%]'>
                                        <div className="w-full flex flex-col gap-4 h-full">
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
                                        
                                        <motion.button
                                        whileHover={{ scale: 1.01 }}
                                        whileTap={{ scale: 0.99 }}
                                        type='submit'
                                        className='bg-[#9767F8] mx-auto w-full max-w-[450px] py-2 rounded-full text-white text-[25px]'>Confirmar senha</motion.button>
                                    </motion.form>
                                )}
                                
                                {step === 3 && (
                                    <motion.form 
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }} 
                                    action="/login"
                                    className='flex flex-col gap-8 w-full max-w-[500px] justify-center items-center  h-[100%]'>
                                        <div className="w-full flex flex-col gap-4 h-full">
                                            <input type="password" required placeholder='Digite sua senha' className='p-3 text-[20px] h-[60px] w-full rounded-[25px] outline-[rgba(151,103,248,0.6)] border-2 border-[rgba(10,8,9,0.6)]'/>
                                            <input type="password" required placeholder='Confirme sua senha' className='p-3 text-[20px] h-[60px] w-full rounded-[25px] outline-[rgba(151,103,248,0.6)] border-2 border-[rgba(10,8,9,0.6)]'/>

                                            <div className={`h-[96px] overflow-hidden w-fit transition-all duration-300 ease-in-out min-w-10 min-h-2 `}>
                                                {/* modelo */}
                                                <h2 className={`text-[20px] h-[32px] text-[#068D3A] flex items-center gap-2`}><Check /> A senha deve conter no mínimo 8 caracteres</h2>
                                                <h2 className={`text-[20px] h-[32px] text-[#F92A46] flex items-center gap-2`}><X />A senha deve conter pelo menos um número</h2>
                                                <h2 className={`text-[20px] h-[32px] text-[#F92A46] flex items-center gap-2`}><X />A senha deve conter pelo menos um símbolo</h2>
                                            </div>
                                        </div>
                                        
                                        <motion.button
                                        whileHover={{ scale: 1.01 }}
                                        whileTap={{ scale: 0.99 }}
                                        type='submit'
                                        className='bg-[#9767F8] mx-auto mt-auto w-full py-2 rounded-full text-white text-[25px]'>Confirmar senha</motion.button>
                                    </motion.form>
                                )}


                            </div>
                        </div>

                    </motion.div>
                    
                    </div>
                </AnimatePresence>

                
                </div>
            </div>
        </>
    )
}

