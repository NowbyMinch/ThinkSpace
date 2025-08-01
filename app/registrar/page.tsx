"use client";

import { useRef } from 'react';
import React from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import DatePicker from '@/components/ui/datepicker';
import { useRouter } from 'next/navigation';
import { ComboboxDemo2, ComboboxDemo3 } from '../home/components/dropdown';
import ErrorModal from '@/components/ui/ErrorModal';

export default function RegisterPage() {
  const router = useRouter();
  const [ subStep, setSubStep] = useState(5);
  const [ purple, setPurple] = useState(false);
  const [ purple2, setPurple2] = useState(false);
  const [ categoria, setCategoria] = useState("");
  const [ finalizar, setFinalizar] = useState(false);
  const inputRefs = useRef<HTMLInputElement[]>([]);
  const [selectedEscolaridade, setSelectedEscolaridade] = useState("");
  const [selectedObjetivo, setSelectedObjetivo] = useState("");
  const [ code, setCode ] = useState<number[]>([]);
  const [message, setMessage] = useState<string | null>(null);

  const [form, setForm] = useState({ primeiroNome: "", sobrenome: "", email: "", senha: "", confirmarSenha: "", dataNascimento: ""});
  const [formFunc, setFormFunc] = useState({ email: form.email, funcao: ""})
  const [form2, setForm2] = useState({ email: form.email, escolaridade: selectedEscolaridade, objetivoNaPlataforma: selectedObjetivo, areaDeInteresse: "", instituicaoNome: ""});
  const [form3, setForm3] = useState({ email: form.email, code: ""});
  
  function final(){
    setFinalizar(true);
    setTimeout(() => {
      setSubStep(5);
    }, 700);
  }

  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const handleScrollToTop = () => {
    scrollContainerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
};

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/registrar`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    console.log(form)
    if (data.message === "Dados iniciais recebidos. Escolha a função (administrador ou usuário comum)."){
      setSubStep(2)
      setForm2({ ...form2, email: form.email })
      handleScrollToTop();
    }
    else{
      setMessage(data.message)
    }
    console.log(data); 
  };
  
  const handleSubmit2 = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/completar-cadastro`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form2),
    });

    const data = await res.json();
    if (data.message === "Código de verificação enviado para o e-mail."){
      setSubStep(4)
    }
    else{
      setMessage(data.message)
    }
    console.log(data); 
  };

  const handleFuncao = async (e: React.FormEvent) => {
    e.preventDefault();

    const funcao = categoria === "usuario" ? "ESTUDANTE" : "ADMIN";
    const funcObj = { email: form.email, funcao };

    setFormFunc(funcObj);
    
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/escolher-funcao`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(funcObj),
    });
    
    const data = await res.json();
    if (data.message === "Função definida. Complete o cadastro."){
      setSubStep(3)
      handleScrollToTop();
    }
    else{
      setMessage(data.message)
    }
    console.log(formFunc)
    console.log(funcObj)
    console.log(data); 

  };

  const handleSubmit3 = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const codeString = code.join("");
    const newForm3 = { ...form3, code: codeString, email: form.email };

    setForm3(newForm3);

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/verificar-codigo`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newForm3), // use the new object directly
    });

    const data = await res.json();
    console.log(newForm3);
    if (data.message === "E-mail verificado e cadastro concluído.") {
      final();
      handleScrollToTop();
    }
    else{
      setMessage(data.message)
    }
    console.log(data);

  };
  
  const reenviar = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/reenviar-codigo`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    
    console.log(form)
    const data = await res.json();
    if (data.message !== "Novo código enviado para o e-mail."){
        setMessage(data.message)
    }

    console.log(data); 
  };

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

    // Update code state here
    const values = inputRefs.current.map(input => input?.value ? Number(input.value) : 0);
    setCode(values);
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

  return (
    <>
      {message && (
        <ErrorModal message={message} onClose={() => setMessage(null)} />
      )}
      
      <div className="w-[100%] h-[100vh] flex justify-center bg-[#A87CFF]">
          <div className="w-[1730px] h-full max-w-[90%] flex justify-center items-center ">
            <AnimatePresence >
              <div ref={scrollContainerRef} className=" flex flex-col w-full items-center h-[900px] max-h-[90%] py-10 bg-white rounded-[35px] overflow-y-auto relative">
                {(() => {
                  if (subStep < 5) {
                    return (
                      <>
                        <div className="max-w-[90%] flex justify-center items-center">
                          <div className="flex items-center flex-col w-[90%] ">
                            {(() => {
                              if (subStep === 4) {
                                return (
                                  <>
                                    <h1 className='text-[30px] font-bold text-[#EB7262] text-center'>Código de verificação</h1>
                                  </>
                                )
                              }
                              else if ( subStep === 3 && categoria === "restrito") {
                                return (
                                  <>
                                    <div className='text-[30px] font-bold text-[#EB7262] text-center'>Área do Administrador Geral </div>
                                  </>
                                )
                              }
                              else if (subStep < 5) {
                                return (
                                  <>
                                    <div className=' text-center text-[30px] font-bold text-[#EB7262]'>Primeiro acesso</div>
                                  </>
                                )
                              }
                            })()}
                            <h2 className='text-[18px] text-[rgba(55,71,79,0.84)] text-center '>Crie sua conta em poucos minutos e comece a explorar a plataforma rapidamente!</h2>
                          
                          </div>
                        </div>

                        <div className="max-w-[80%] w-[700px] h-14 mt-8 mb-8 flex justify-center items-center ">
                          <div className="bg-[#D9D9D9] w-full h-[4px] flex relative">

                            <div className={` ${subStep === 1 ? "w-[0%]" : subStep === 2 ? "w-[25%]" : subStep === 3 ? "w-[50%]" : subStep === 4 && !finalizar? "w-[75%]" : subStep === 4 && finalizar? "w-[100%]" : "" } transition-all ease-in-out duration-500 h-[4px] rounded-full bg-[#9767F8] relative`}>
                            </div>

                            <div className="
                            w-9 
                            h-9
                            bg-[#9767F8] rounded-full absolute top-[-20px] left-[-2px] flex justify-center items-center text-white text-[22px]">1</div>

                            <div className={`${subStep > 2 ? fade(setPurple) : "bg-[#D9D9D9]"} ${purple ? "bg-[#9767F8]" : "bg-[#D9D9D9]"} transition-all ease-in-out duration-300 w-9
                            h-9
                            rounded-full absolute top-[-20px] left-[50%] translate-x-[-50%] flex justify-center items-center text-white text-[22px]`}>2</div>

                            <div className={`${finalizar ? fade(setPurple2) : "bg-[#D9D9D9]"} ${purple2 ? "bg-[#9767F8]" : "bg-[#D9D9D9]"} 
                            w-9
                            h-9
                            duration-300 rounded-full absolute top-[-20px] left-[101%] translate-x-[-100%] flex justify-center items-center text-white text-[22px]`}>3</div>
                          </div>
                        </div>

                        {(() => {
                          if (subStep === 1) {
                            return (
                              <div className=" w-full max-w-[90%] flex justify-center items-center ">
                                <div className="w-[90%]">
                                  <form onSubmit={handleSubmit} 
                                    method='POST'
                                    className='flex flex-col justify-center gap-10 h-fit'>
                                    <div className=" block lg:flex justify-center items-center gap-20 h-full ">
                                      <div className="mx-auto lg:w-[50%] max-w-[550px] flex flex-col gap-2 ">
                                        <div className="flex flex-col gap-1">
                                          <label htmlFor="" className=' text-[20px]'>Primeiro nome</label>
                                          <input type="text" onChange={e => setForm({ ...form, primeiroNome: e.target.value })} required placeholder='Digite seu primeiro nome' className='p-3 text-[20px] w-full rounded-[25px] outline-[rgba(151,103,248,0.6)] border-2 border-[rgba(10,8,9,0.6)]' />
                                        </div>

                                        <div className="flex flex-col gap-1">
                                          <label htmlFor="" className='text-[20px] '>Sobrenome</label>
                                          <input type="text" onChange={e => setForm({ ...form, sobrenome: e.target.value })} required placeholder='Digite seu sobrenome' className='p-3 text-[20px] w-full rounded-[25px] outline-[rgba(151,103,248,0.6)] border-2 border-[rgba(10,8,9,0.6)]' />
                                        </div>

                                        <div className="flex flex-col gap-1">
                                          <label htmlFor="" className='text-[20px] '>Email</label>
                                          <input type="email" onChange={e => setForm({ ...form, email: e.target.value })} required placeholder='Digite seu email' className='p-3 text-[20px] w-full rounded-[25px] outline-[rgba(151,103,248,0.6)] border-2 border-[rgba(10,8,9,0.6)]' />
                                        </div>
                                      </div>

                                      <div className="mx-auto lg:w-[50%] max-w-[550px] mt-4 lg:mt-0 flex flex-col gap-2 ">
                                        <div className="flex flex-col gap-1">
                                          <label htmlFor="" className='text-[20px]'>Data de nascimento</label>
                                          <DatePicker onChange={(val) => {setForm({ ...form, dataNascimento: val })}} />
                                        </div>

                                        <div className="flex flex-col gap-1">
                                          <label htmlFor="" className='text-[20px]'>Senha</label>
                                          <input type="password" onChange={e => setForm({ ...form, senha: e.target.value })} required placeholder='Digite seu senha' className='p-3 text-[20px] w-full rounded-[25px] outline-[rgba(151,103,248,0.6)] border-2 border-[rgba(10,8,9,0.6)]' />
                                        </div>

                                        <div className="flex flex-col gap-1">
                                          <label htmlFor="" className='text-[20px]'>Repita a senha</label>
                                          <input type="password" onChange={e => setForm({ ...form, confirmarSenha: e.target.value })} required placeholder='Digite a senha novamente' className='p-3 text-[20px] w-full rounded-[25px] outline-[rgba(151,103,248,0.6)] border-2 border-[rgba(10,8,9,0.6)]' />
                                        </div>
                                      </div>
                                    </div>

                                    <motion.div className=" flex justify-center items-center gap-[7%] relative w-[550px] max-w-[90%] mx-auto ">
                                      <div className="flex flex-col w-[200px] gap-10 max-w-[95%] ">
                                        <motion.button whileTap={{ scale: 0.99 }} whileHover={{ scale: 1.01 }} transition={{ duration: 0.2, ease: "easeInOut" }} 
                                        type='button'
                                        onClick={() => router.back()}
                                        className='bg-[#804EE5] py-[8px] text-white text-[20px] rounded-[25px] shadow-md'>Voltar</motion.button>
                                      </div>

                                      <div className="flex flex-col w-[200px] gap-10 max-w-[95%] ">
                                        <motion.button
                                          whileTap={{ scale: 0.99 }}
                                          whileHover={{ scale: 1.01 }}
                                          transition={{ duration: 0.2, ease: "easeInOut" }}
                                          type='submit'
                                          className='bg-[#804EE5] py-[8px] text-white text-[20px] rounded-[25px] shadow-md'>Próximo</motion.button>
                                      </div>
                                    </motion.div>
                                  </form>
                                </div>

                              </div>
                            );
                          }
                          else if (subStep === 2) {
                            return (
                              <div className="min-w-[75%] max-w-[90%] flex justify-center h-fit items-center flex-col gap-[51px] mb-10">
                                <div className="w-full max-w-[1000px] flex flex-col gap-4 text-center h-full lg:h-[280px]  max-h-[90%] ">
                                  <h2 className="text-gray-700 text-[18px]">Escolha sua categoria:</h2>
                                  <div className="flex gap-5 w-full h-full flex-col justify-center items-center ">
                                    <AnimatePresence >
                                      <form onSubmit={handleFuncao} 
                                        method="POST" className=" block lg:flex w-full h-full gap-9">
                                        <motion.button
                                          initial={{ y: 10 }}
                                          animate={{ y: 0 }}
                                          exit={{ y: 10 }}
                                          whileTap={{ scale: 1.03 }}
                                          whileHover="hovered"
                                          key="usuario"
                                          onClick={() => setCategoria("usuario")}
                                          type='submit'
                                          className=" w-full max-lg:h-[230px] flex items-end bg-[#9767F8] rounded-[20px] group overflow-hidden relative ">
                                          <motion.div
                                            variants={{
                                              hovered: { paddingLeft: "35px" }
                                            }}
                                            className=" w-full h-full pb-3 pl-5 rounded-[20px] flex text-[50px] font-semibold items-end text-white z-[10]">
                                            <div className='flex justify-center items-center'>
                                              <h1 className='text-[40px]'>Usuário</h1>
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
                                          type='submit'
                                          onClick={() => setCategoria("restrito")}
                                          className=" w-full max-lg:h-[230px] flex items-end bg-[#9767F8] mt-9 lg:mt-0 rounded-[20px] group overflow-hidden relative ">
                                          <motion.div
                                            variants={{
                                              hovered: { paddingLeft: "35px" }
                                            }}
                                            className="h-[50%] w-full pb-3 pl-5 rounded-[20px] flex text-[50px] font-semibold items-end text-white z-[10]">
                                            <div className='flex justify-center items-center w-min leading-none'>
                                              <h1 className='w-min text-start text-[40px]'>Acesso Restrito</h1>
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
                                      </form>
                                    </AnimatePresence>
                                  </div>
                                </div>

                                <motion.div className=" flex justify-center items-center gap-10 relative w-[550px] max-w-[90%] mx-auto">
                                  <div className="flex flex-col w-[200px] gap-10 max-w-[90%] ">
                                    <motion.button whileTap={{ scale: 0.99 }} whileHover={{ scale: 1.01 }} transition={{ duration: 0.2, ease: "easeInOut" }} onClick={() => setSubStep(subStep - 1)} className='bg-[#804EE5] py-[8px] text-white text-[20px] rounded-[25px] shadow-md'>Voltar</motion.button>
                                  </div>
                                </motion.div>
                              </div>
                            )
                          }
                          else if (categoria === "usuario" && subStep === 3) {
                            return (
                              <div className="w-[90%] mb-10">
                                <form onSubmit={handleSubmit2} className='flex flex-col justify-center items-center gap-19 '>
                                  <div className="w-[90%] mb-7 gap-20 lg:flex justify-center  items-center max-h-[90%]">
                                    <div className="max-w-[550px] lg:w-[50%] flex flex-col gap-6 lg:mx-0 mx-auto">

                                      <div className="flex flex-col gap-1">
                                        <label htmlFor="" className='text-[20px]'>Nível de escolaridade</label>
                                        <ComboboxDemo2 value={selectedEscolaridade} onChange={value => {
                                          setSelectedEscolaridade(value);
                                          setForm2(prev => ({
                                            ...prev,
                                            escolaridade: value
                                          }));
                                        }}/>
                                      </div>

                                      <div className="flex flex-col gap-1">
                                        <label htmlFor="" className='text-[20px]'>Área de interesse</label>
                                        <input type="text" onChange={e => setForm2({ ...form2, areaDeInteresse: e.target.value })} required placeholder='Digite a sua área de interesse' className='p-3 text-[20px] h-[58px] w-full rounded-[25px] outline-[rgba(151,103,248,0.6)] border-2 border-[rgba(10,8,9,0.6)]' />
                                      </div>
                                    </div>

                                    <div className="max-w-[550px] lg:w-[50%] flex flex-col gap-6 max-lg:mt-6 lg:mx-0 mx-auto">
                                      <div className="flex flex-col gap-1 ">
                                        <label htmlFor="" className='text-[20px] '>Objetivo na plataforma</label>
                                        <ComboboxDemo3 value={selectedObjetivo} onChange={value => {
                                          setSelectedObjetivo(value);
                                          setForm2(prev => ({
                                            ...prev,
                                            objetivoNaPlataforma: value
                                          }));
                                        }}/>
                                      </div>

                                      <div className="flex flex-col gap-1">
                                        <label htmlFor="" className='text-[20px]'>Instituição de ensino</label>
                                        <input type="text" onChange={e => setForm2({ ...form2, instituicaoNome: e.target.value })} required placeholder='Digite o nome da sua instituição' className='p-3 text-[20px] h-[58px] w-full rounded-[25px] outline-[rgba(151,103,248,0.6)] border-2 border-[rgba(10,8,9,0.6)]' />
                                      </div>
                                    </div>

                                  </div>

                                  <motion.div className=" flex justify-center items-center relative w-[550px] max-w-[90%] mx-auto flex-col gap-9">
                                    <div className="h-fit flex justify-center items-center gap-2 overflow-hidden">
                                      <input type="checkbox" required className='size-4 accent-[#804EE5] cursor-pointer'/> 
                                      <h2 className='text-[18px]'>Li e concordo com os <a className=' cursor-pointer text-[#3881AF] w-fit text-[18px] -mt-36'>Termos de uso</a> e a <a className=' cursor-pointer text-[#3881AF] w-fit text-[18px] -mt-36'>Política de Privacidade</a>.</h2>
                                    </div>

                                    <motion.div className=" flex justify-center items-center gap-[7%] relative w-[550px] max-w-[90%] mx-auto ">
                                      <div className="flex flex-col w-[200px] gap-10 max-w-[95%] ">
                                        <motion.button whileTap={{ scale: 0.99 }} whileHover={{ scale: 1.01 }} transition={{ duration: 0.2, ease: "easeInOut" }} 
                                        type='button'
                                        onClick={() => setSubStep(subStep - 1)}
                                        className='bg-[#804EE5] py-[8px] text-white text-[18px] rounded-[25px] shadow-md'>Voltar</motion.button>
                                      </div>

                                      <div className="flex flex-col w-[200px] gap-10 max-w-[95%] ">
                                        <motion.button
                                          whileTap={{ scale: 0.99 }}
                                          whileHover={{ scale: 1.01 }}
                                          transition={{ duration: 0.2, ease: "easeInOut" }}
                                          type='submit'
                                          className='bg-[#804EE5] py-[8px] text-white text-[18px] rounded-[25px] shadow-md'>Próximo</motion.button>
                                      </div>
                                    </motion.div>
                                    
                                    {/* <div className="flex gap-10">
                                      <div className="flex flex-col w-[200px]  max-w-[90%] ">
                                        <motion.button whileTap={{ scale: 0.99 }} whileHover={{ scale: 1.01 }} transition={{ duration: 0.2, ease: "easeInOut" }} onClick={() => setSubStep(subStep - 1)} className='bg-[#804EE5] py-[8px] text-white text-[25px] rounded-[25px] shadow-md'>Voltar</motion.button>
                                      </div>

                                      <div className="flex flex-col w-[200px] max-w-[90%] ">
                                        <motion.button
                                          whileTap={{ scale: 0.99 }}
                                          whileHover={{ scale: 1.01 }}
                                          transition={{ duration: 0.2, ease: "easeInOut" }}
                                          type='submit'
                                          className='bg-[#804EE5] py-[8px] text-white text-[25px] rounded-[25px] shadow-md'>Próximo</motion.button>
                                      </div>

                                    </div> */}
                                  </motion.div>

                                </form>
                              </div>
                            );
                          }

                          else if (categoria === "restrito" && subStep === 3) {
                            return (
                              <div className="max-w-[90%] mb-10 flex gap-20 justify-center items-center flex-col ">
                                <form onSubmit={(e) => { e.preventDefault()}} method="POST" className='max-w-[90%] flex flex-col justify-center items-center gap-7 '>
                                  <div className="fourthbox flex flex-col gap-4 h-[300px] max-h-[90%] ">
                                    <div className="flex flex-col items-center gap-4 w-full h-full ">
                                      <h2 className="text-gray-700 break-words text-center text-[18px]">Digite o seu código de administrador geral da plataforma:</h2>
                                      <div className="flex gap-1 max-w-[765px] h-full ">
                                        {[...Array(5)].map((_, i) => (
                                          <input
                                            key={i}
                                            ref={(el) => { inputRefs.current[i] = el!; }}
                                            type="text"
                                            inputMode="numeric"
                                            required
                                            maxLength={1}
                                            onChange={(e) => {handleChange(i, e);}}
                                            onKeyDown={e => {
                                                handleKeyDown(i, e);
                                                if (e.key === "Enter") {
                                                e.preventDefault();
                                                }
                                            }}
                                            className="codigo h-[200px] w-full rounded-[10px] text-center text-[70px] transition-all ease-in-out duration-300 focus:bg-[#9767f834] font-semibold bg-[#d9d9d9c5] outline-[rgba(151,103,248,0.6)]"
                                          />
                                        ))}
                                      </div>
                                    </div>
                                  </div> 
                                  <a className='underline text-[#3881AF] w-fit text-[18px] tex'>Não tem o seu código? Fale conosco</a>

                                  <motion.div className=" flex justify-center items-center relative w-[550px] max-w-[90%] mx-auto flex-col gap-9">
                                    <div className="h-fit flex justify-center items-center gap-2 overflow-hidden">
                                      <input type="checkbox" required className='size-4 accent-[#804EE5] cursor-pointer'/> 
                                      <h2 className='text-[18px]'>Li e concordo com os <a className=' cursor-pointer text-[#3881AF] w-fit text-[18px] -mt-36'>Termos de uso</a> e a <a className=' cursor-pointer text-[#3881AF] w-fit text-[18px] -mt-36'>Política de Privacidade</a>.</h2>
                                    </div>

                                    <motion.div className=" flex justify-center items-center gap-[7%] relative w-[550px] max-w-[90%] mx-auto ">
                                      <div className="flex flex-col w-[200px] gap-10 max-w-[95%] ">
                                        <motion.button whileTap={{ scale: 0.99 }} whileHover={{ scale: 1.01 }} transition={{ duration: 0.2, ease: "easeInOut" }} 
                                        type='button'
                                        onClick={() => setSubStep(subStep - 1)}
                                        className='bg-[#804EE5] py-[8px] text-white text-[18px] rounded-[25px] shadow-md'>Voltar</motion.button>
                                      </div>

                                      <div className="flex flex-col w-[200px] gap-10 max-w-[95%] ">
                                        <motion.button
                                          whileTap={{ scale: 0.99 }}
                                          whileHover={{ scale: 1.01 }}
                                          transition={{ duration: 0.2, ease: "easeInOut" }}
                                          type='submit'
                                          className='bg-[#804EE5] py-[8px] text-white text-[18px] rounded-[25px] shadow-md'>Próximo</motion.button>
                                      </div>
                                    </motion.div>
                                  </motion.div>

                                </form>
                              </div>
                            );
                          }
                          else if (subStep === 4) {
                            return (
                                <div className="max-w-[90%] mb-10 flex gap-20 justify-center items-center flex-col ">
                                <form onSubmit={handleSubmit3} method="POST" className='max-w-[90%] flex flex-col justify-center items-center gap-7 '>
                                  <div className="fourthbox flex flex-col gap-4 h-[300px] max-h-[90%] ">
                                    <div className="flex flex-col items-center gap-4 w-full h-full ">
                                      <h2 className="text-gray-700 break-words text-center text-[18px]">Digite o seu código de verificação:</h2>
                                      <div className="flex gap-1 max-w-[765px] h-full ">
                                        {[...Array(5)].map((_, i) => (
                                          <input
                                            key={i}
                                            ref={(el) => { inputRefs.current[i] = el!; }}
                                            type="text"
                                            inputMode="numeric"
                                            required
                                            maxLength={1}
                                            onChange={(e) => {handleChange(i, e);}}
                                            onKeyDown={e => {
                                                handleKeyDown(i, e);
                                                if (e.key === "Enter") {
                                                e.preventDefault();
                                                }
                                            }}
                                            className="codigo h-[200px] w-full rounded-[10px] text-center text-[70px] transition-all ease-in-out duration-300 focus:bg-[#9767f834] font-semibold bg-[#d9d9d9c5] outline-[rgba(151,103,248,0.6)]"
                                          />
                                        ))}
                                      </div>
                                      <button onClick={reenviar} className=' text-[#3881AF] w-fit text-[18px]  cursor-pointer'>Reenviar Código</button>
                                    </div>
                                  </div> 


                                  <motion.div className=" flex justify-center items-center gap-10 relative w-[550px] max-w-[90%] mx-auto ">
                                      <div className="flex flex-col w-[200px] gap-10 max-w-[90%] ">
                                        <motion.button whileTap={{ scale: 0.99 }} whileHover={{ scale: 1.01 }} transition={{ duration: 0.2, ease: "easeInOut" }} onClick={() => setSubStep(subStep - 1)} className='bg-[#804EE5] py-[8px] text-white text-[18px] rounded-[25px] shadow-md'>Voltar</motion.button>
                                      </div>

                                      <div className="flex flex-col w-[200px] gap-10 max-w-[90%] ">
                                        <motion.button
                                          whileTap={{ scale: 0.99 }}
                                          whileHover={{ scale: 1.01 }}
                                          transition={{ duration: 0.2, ease: "easeInOut" }}
                                          type='submit'
                                          className='bg-[#804EE5] py-[8px] text-white text-[18px] rounded-[25px] shadow-md'>Próximo</motion.button>
                                      </div>
                                  </motion.div>
                                </form>
                              </div>
                            )
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

                      className="min-w-[54%] max-w-[90%] flex flex-col justify-center items-center m-auto ">
                        <div className="w-[50%] ">
                          <Image alt='Cadastro Concluído' width={200} height={200} src="/cadastroconcluido.svg" className='w-[650px] ' />
                        </div>

                        <div className="flex flex-col items-center gap-5 max-w-[500px] h-full ">
                          <h1 className='text-[40px] leading-none text-center font-bold text-[#EB7262]'>Cadastro concluído!</h1>
                          <h2 className="text-gray-700 text-[18px] text-center">Agora é só fazer login com suas credenciais e aproveitar tudo o que o aplicativo tem a oferecer. Bem-vindo(a) à sua nova jornada de aprendizado! 🚀📚</h2>

                          <motion.button
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                          className='bg-[#9767F8] w-[55%] py-2 rounded-full text-white text-[18px]'><a href="/login">Retornar ao login</a></motion.button>

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

