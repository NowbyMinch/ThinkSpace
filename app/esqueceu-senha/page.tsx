"use client";

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X } from 'lucide-react';
// import { useState } from 'react';

export default function LoginPage() {

    return (
        <>
            <div className="w-[100%] h-[100vh] flex justify-center bg-[#A87CFF] ">
                <div className="w-[1730px] h-full max-w-[90%] flex justify-center items-center ">
                <AnimatePresence >
                    <div className="flex flex-col w-full items-center h-[900px] max-h-[90%] py-10 bg-white rounded-[35px] overflow-y-auto relative">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} transition={{ duration: 0.2, ease: "easeInOut" }} className="w-[70%] mb-16 flex justify-center h-full">

                        <div className="w-[50%] flex flex-col  items-center gap-4 max-h-[90%] ">
                            <div className="flex flex-col items-center gap-10 w-[500px] max-w-[100%] ">
                                <div className="flex flex-col justify-center items-center ">
                                    <h1 className='text-[60px] font-bold text-[#EB7262] text-center'>Esqueceu a senha?</h1>
                                    <h2 className="text-gray-700 text-[22px] text-center">Crie uma nova senha com pelo menos 8 caracteres, incluindo letras, números e símbolos.</h2>
                                </div>

                                <form action="/login" className='flex flex-col gap-8 w-full '>
                                    <div className="flex flex-col gap-4 justify-center items-center">
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
                                    className='bg-[#9767F8] mx-auto w-full py-2 rounded-full text-white text-[25px]'>Confirmar senha</motion.button>
                                </form>


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

