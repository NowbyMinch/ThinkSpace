"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { redirect, useRouter } from "next/navigation";
import { Backdrop3 } from "../../components/backdrop";
import { ArrowLeft, X } from "lucide-react";
import React from "react";
import ErrorModal from "@/components/ui/ErrorModal";

type UserData = {
  primeiroNome?: string;
  cargo?: string;
  foto?: string;
  // add other properties if needed
};
type UsuarioData = {
  primeiroNome?: string;
  cargo?: string;
  foto?: string;
  areaDeInteresse?: string;
  atualizadoEm?: string;
  codigoExpiracao?: string;
  codigoVerificado?: string;
  criadoEm?: string;
  dataNascimento?: string;
  email?: string;
  emailVerificado?: boolean;
  escolaridade?: string;
  funca?: string; 
  id?: string;
  instituicaoId?: string;
  nomeCompleto?: string;
  objetivoNaPlataforma?: string;
  senha?: string;
  sobrenome?: string;
  ultimoLogin?: string;
};

export default function Conta() {
  const router = useRouter();
  const [message, setMessage] = useState<string | null>(null);

  const [ excluir, setExcluirPop ] = useState(false);
  const [ suspender, setSuspenderPop ] = useState(false);
  const [ user, setUser ] = useState<UserData>({})
  const inputRefs = useRef<HTMLInputElement[]>([]);
  const [ loading, setLoading ] = useState(true);
  const [ code, setCode ] = useState<number[]>([]);
  
  // SENHA ------------------------------------------------------------------------------------------
  const [ stepSenha, setStepSenha] = useState(1);
  const [ emailSenha, setEmailSenha] = useState({ emailSenha: ""});
  const [ editarSenhaPop, setEditarSenhaPop] = useState(false);
  const [ novaSenha, setNovaSenha] = useState({ novaSenha: "" });
  const [ confirmarNovaSenha, setConfirmarNovaSenha] = useState({ confirmarNovaSenha: "" });
  
  // SENHA ------------------------------------------------------------------------------------------
  const [ senhaDeletar, setSenhaDeletar] = useState({ senhaDeletar: "" });
  const [ senhaSuspender, setSenhaSuspender] = useState({ senhaSuspender: "" });
  
  // EMAIL ------------------------------------------------------------------------------------------
  const [ step, setStep] = useState(1);
  const [ email, setEmail] = useState("");
  const [ novoEmail, setNovoEmail] = useState({ novoEmail: "" });
  const [ editarEmailPop, setEditarEmailPop] = useState(false);

  useEffect(() => {

    const user = async () => {
      try{
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/home/identificacao`, {
          method: 'GET',
          credentials: 'include',
        });
        
        const data = await res.json();
        setUser(data)
        setLoading(false);
      } catch (err) {
        // setMessage("Erro ao carregar saudação.");
        console.error(err);
      }
    }; user();

    const e = async () => {
      try{
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/email`, {
          method: 'GET',
          credentials: 'include',
        });
        
        const data = await res.json();
        setEmail(data.email);
        console.log(data);
        setLoading(false);
      } catch (err) {
        // setMessage("Erro ao carregar saudação.");
        console.error(err);
      }
    }; 
    e();

  }, []);

  const deletarConta = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/configuracoes/excluir-conta`, {
        method: "DELETE",
        credentials: "include",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ senhaAtual: senhaDeletar.senhaDeletar }),
      });

      const result = await res.json();
      console.log(result); // Conta excluída com sucesso.
      
      if (result.message === "Conta excluída com sucesso."){
        setExcluirPop(false);
      }
      
    } catch (error) {
      console.error("Erro ao excluir conta");
    } finally {
      router.push('/');
    }
  };

  const suspenderConta = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/configuracoes/suspender-conta`, {
        method: "PATCH",
        credentials: "include",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ senhaAtual: senhaSuspender.senhaSuspender }),
      });

        const result = await res.json();
        console.log(result); // Conta excluída com sucesso.
      if (result.message === "Conta excluída com sucesso."){
        setSuspenderPop(false);
        router.push('/');
      }
      
    } catch (error) {
      console.error("Erro ao excluir conta");
    }
  };

  const closing = async () => {
    setNovoEmail({novoEmail: ""});
    setNovaSenha({novaSenha: ""});
    setEditarEmailPop(false);
    setEditarSenhaPop(false);
    setStep(1);
  };
  const Step = async () => {
    if (step === 1){
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/configuracoes/email/solicitar`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: novoEmail.novoEmail}),
        credentials: "include",
      });
  
      const data = await res.json();
      console.log("NovoEmail: ", novoEmail);
      console.log("data: ", data);
      
      const res2 = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/configuracoes/email/enviar-codigo`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: "include",
      });

      const data2 = await res2.json();
      console.log("data: ", data2);

      
      if (data.message === "Email para troca enviado com sucesso." || data.message === "Solicitação de troca de email registrada. Siga as instruções enviadas."){
        setStep(2);
      }

      else {
        setMessage(data.message);
      }

    } 
    
    else if (step === 2){
      const codeString = code.join("");
      const codigo = { code: codeString };

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/configuracoes/email/verificar-codigo`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ codigo: codigo.code.toString()}),
        credentials: "include",
      });
  
      const data = await res.json();
      console.log("Codigo verificado: ", codigo.code.toString());
      console.log("data: ", data);
  
      if (data.message === "Código verificado com sucesso." ){
        setStep(3);
      }
      else {
        setMessage(data.message);
      }
    }
    
    else if (step === 3){
      const codeString = code.join("");
      const codigo = { code: codeString };

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/configuracoes/email/confirmar`, {
        method: "PATCH",
        credentials: "include",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ novoEmail: novoEmail.novoEmail, codigo: codigo.code.toString()}),
      });
  
      const data = await res.json();
      console.log("Codigo verificado: ", novoEmail.novoEmail, codigo.code.toString());
      console.log("data: ", data);
  
      if (data.message === "Email alterado com sucesso." || data.message === "Email alterado com sucesso e registros atualizados."){
        setStep(1);
        closing();
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
              method: "POST",
              credentials: "include",
          });
  
          const data = await res.json();
          if (data.message === "Logout realizado com sucesso"){
              router.push('/');
          }
          console.log(data); 
          router.push('/login');
        }
      else {
        setMessage(data.message);
      }
    }
    
  };
  const StepSenha = async () => {
    if (stepSenha === 1){
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/configuracoes/senha/solicitar`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: emailSenha.emailSenha}),
        credentials: "include",
      });
  
      const data = await res.json();
      console.log("NovoEmail: ", novaSenha);
      console.log("data: ", data);
      
      const res2 = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/configuracoes/senha/enviar-codigo`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: "include",
      });

      const data2 = await res2.json();
      console.log("data: ", data2);

      
      if (data.message === "Solicitação de troca de senha registrada. Siga as instruções enviadas." ){
        setStepSenha(2);
      }

      else {
        setMessage(data.message);
      }

    } 
    else if (stepSenha === 2){
      const codeString = code.join("");
      const codigo = { code: codeString };

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/configuracoes/senha/verificar-codigo`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ codigo: codigo.code.toString()}),
        credentials: "include",
      });
  
      const data = await res.json();
      console.log("Codigo verificado: ", codigo.code.toString());
      console.log("data: ", data);
  
      if (data.message === "Código verificado com sucesso." ){
        setStepSenha(3);
      }
      else {
        setMessage(data.message);
      }
    }
    else if (stepSenha === 3){
      const codeString = code.join("");
      const codigo = { code: codeString };

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/configuracoes/senha/confirmar`, {
        method: "PATCH",
        credentials: "include",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ novaSenha: novaSenha.novaSenha, confirmarSenha: confirmarNovaSenha.confirmarNovaSenha,codigo: codigo.code.toString()}),
      });
  
      const data = await res.json();
      console.log("Codigo verificado: ", novaSenha.novaSenha, codigo.code.toString());
      console.log("data: ", data);
  
      if (data.message === "Senha alterada com sucesso." ){
        closing();
        setStepSenha(1);
        
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
          method: "POST",
          credentials: "include",
        });
        
        const data = await res.json();
        
        if (data.message === "Logout realizado com sucesso") {
          console.log(data);
          router.push("/login"); // redireciona para login
        } else {
          setMessage(data.message);
        }
      }
      else {
        setMessage(data.message);
      }
    }
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
  if (loading) return (
    <div className="flex justify-center items-center w-full h-full">
      <div className="animate-spin w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full" />
    </div>
  );

  return (
    <>
      {message && (
        <ErrorModal message={message} onClose={() => setMessage(null)} />
      )}
        
      <AnimatePresence initial={false}>
        {editarEmailPop && (
          <>
            <motion.div 
            key="content"
            initial={{ opacity: 0, scale: 0.85}}
            animate={{ opacity: 1, scale: 0.94 }}
            exit={{ opacity: 0, scale: 0.90 }}
            className={`w-full h-full fixed top-0 left-0 flex justify-center items-center  opacity-1 z-[1100]`}>

              <div className="w-full h-full absolute" onClick={() => closing()}></div>

              <div id="white-box" className={`w-[1200px] max-w-[95%] min-h-[95%] lg:min-h-[600px] h-[600px] max-h-[95%] rounded-[50px] z-[1100] bg-white shadow-md flex justify-center items-center relative overflow-hidden `}>

                <ArrowLeft onClick={() => {setStep(step - 1)}} className={`size-6 text-black flex cursor-pointer h-fit absolute top-5 left-8 z-10 ${step > 1 ? "flex": "hidden"}`} /> 
                <X className="absolute top-5 right-8 size-6 cursor-pointer" onClick={() => closing()}/>
                <Image width={300} height={500} src="/Vector.svg" alt="Decoração" className="absolute top-0 left-[-140px] rotate-90 w-[550px]"/>
                <Image width={300} height={500} src="/Vector.svg" alt="Decoração" className="absolute bottom-[-40px] right-[-130px] -rotate-90 w-[550px]"/>

                <form onSubmit={(e) => {e.preventDefault(); Step()}} className={`w-[90%] h-[85%] lg:w-[80%] lg:h-[85%] lg:mb-4 flex flex-col items-center ${step === 1 || step === 3 ? "gap-10" : "gap-0"} z-[900] overflow-y-auto pr-2 pb-4`}>
                  <div className="h-fit w-full flex flex-col justify-center items-center">
                    <h1 className={`text-center text-[30px] font-medium text-[#EB7262]`}>Deseja editar seu email?</h1>
                    <h2 className={`text-center text-[25px] w-[700px] max-w-full font-medium break-words ${step === 1 ? "flex" : "hidden"}`}>Insira o seu email e enviaremos um código de verificação para você editar sua conta.</h2>
                    <h2 className={`text-center text-[25px] w-[700px] max-w-full font-medium break-words ${step === 2 ? "flex" : "hidden"}`}>Um e-mail de confirmação foi enviado. Digite o código de verificação para redefinir sua conta com segurança.</h2>
                    <h2 className={`text-center text-[25px] w-[700px] max-w-full font-medium break-words ${step === 3 ? "flex" : "hidden"}`}>Para atualizar sua conta, digite o novo e-mail que deseja utilizar. Esse será o endereço principal para acessar a plataforma e receber as nossas notificações.</h2>
                  </div>  

                  {(() => {
                    if (step === 1) {
                      return (
                        <>
                          <input type="email" onChange={(e) => {
                              setNovoEmail({ novoEmail: e.target.value });
                              console.log(novoEmail);
                            }} 
                            placeholder="Digite seu email"
                            className="rounded-[20px] border-[2px] border-[#0d0f224e] pl-2 w-full max-w-[450px] text-[18px] h-[58px] outline-[#9767F8]"
                          />
      
                          <motion.button 
                          whileTap={{scale: 0.99}}
                          whileHover={{scale: 1.01}}
                          transition={{ duration: 0.2, ease: "easeInOut"}}
                          type='submit' className='w-full max-w-[300px] bg-[#804EE5] py-[10px] text-white text-[18px] rounded-[25px] shadow-md'>Enviar código</motion.button>
                        </>
                      )
                    } else if (step === 2){
                      return (
                        <>
                          <div onSubmit={(e) => { e.preventDefault()}} className='max-w-[90%] flex flex-col justify-center items-center gap-7 '>
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
                              </div>
                            </div> 
                          </div>
                          <motion.button 
                          whileTap={{scale: 0.99}}
                          whileHover={{scale: 1.01}}
                          transition={{ duration: 0.2, ease: "easeInOut"}}
                          type='submit' className='w-full max-w-[300px] bg-[#804EE5] py-[10px] text-white text-[18px] rounded-[25px] shadow-md'>Confirmar código</motion.button>

                        </>
                      )
                    }
                    else {
                      return (
                        <>
                          <input type="email" onChange={(e) => {
                              setNovoEmail({ novoEmail: e.target.value });
                              console.log(novoEmail);
                            }} 
                            placeholder="Digite o novo email"
                            className="rounded-[20px] border-[2px] border-[#0d0f224e] pl-2 w-full max-w-[450px] text-[18px] h-[58px] outline-[#9767F8]"
                          />
      
                          <motion.button 
                          whileTap={{scale: 0.99}}
                          whileHover={{scale: 1.01}}
                          transition={{ duration: 0.2, ease: "easeInOut"}}
                          type='submit' className='w-full max-w-[300px] bg-[#804EE5] py-[10px] text-white text-[18px] rounded-[25px] shadow-md'>Enviar código</motion.button>
                        </>
                      )
                    }
                  })()}

                </form>
              </div>
            </motion.div>

            <div className="w-full absolute flex justify-center items-center ">
                <Backdrop3 onClick={() => setEditarEmailPop(false)}/>
            </div>
          
          </>
        )}
        
        {editarSenhaPop && (
          <>
            <motion.div 
            key="content"
            initial={{ opacity: 0, scale: 0.85}}
            animate={{ opacity: 1, scale: 0.94 }}
            exit={{ opacity: 0, scale: 0.90 }}
            className={`w-full h-full fixed top-0 left-0 flex justify-center items-center  opacity-1 z-[1100]`}>

              <div className="w-full h-full absolute" onClick={() => closing()}></div>

              <div id="white-box" className={`w-[1200px] max-w-[95%] min-h-[95%] lg:min-h-[600px] h-[600px] max-h-[95%] rounded-[50px] z-[1100] bg-white shadow-md flex justify-center items-center relative overflow-hidden `}>

                <ArrowLeft onClick={() => {setStep(step - 1)}} className={`size-6 text-black flex cursor-pointer h-fit absolute top-5 left-8 z-10 ${stepSenha > 1 ? "flex": "hidden"}`} /> 
                <X className="absolute top-5 right-8 size-6 cursor-pointer" onClick={() => closing()}/>
                <Image width={300} height={500} src="/Vector.svg" alt="Decoração" className="absolute top-0 left-[-140px] rotate-90 w-[550px]"/>
                <Image width={300} height={500} src="/Vector.svg" alt="Decoração" className="absolute bottom-[-40px] right-[-130px] -rotate-90 w-[550px]"/>

                <form onSubmit={(e) => {e.preventDefault(); StepSenha()}} className={`w-[90%] h-[85%] lg:w-[80%] lg:h-[85%] lg:mb-4 flex flex-col items-center ${stepSenha === 1 || stepSenha === 3 ? "gap-10" : "gap-0"} z-[900] overflow-y-auto pr-2 pb-4`}>
                  <div className="h-fit w-full flex flex-col justify-center items-center ">
                    <h1 className={`text-center text-[30px] font-medium text-[#EB7262]`}>Deseja editar a senha?</h1>
                    <h2 className={`text-center text-[25px] w-[700px] max-w-full font-medium break-words ${stepSenha === 1 ? "flex" : "hidden"}`}>Insira o seu email e enviaremos um código de verificação para você editar sua conta.</h2>
                    <h2 className={`text-center text-[25px] w-[700px] max-w-full font-medium break-words ${stepSenha === 2 ? "flex" : "hidden"}`}>Um e-mail de confirmação foi enviado. Digite o código de verificação para redefinir sua conta com segurança.</h2>
                    <h2 className={`text-center text-[25px] w-[700px] max-w-full font-medium break-words ${stepSenha === 3 ? "flex" : "hidden"}`}>Crie uma nova senha com pelo menos 8 caracteres, incluindo letras, números e símbolos.</h2>
                  </div>  

                  {(() => {
                    if (stepSenha === 1) {
                      return (
                        <>
                          <input type="email" onChange={(e) => {
                              setEmailSenha({ emailSenha: e.target.value });
                              console.log(emailSenha);
                            }} 
                            placeholder="Digite seu email"
                            className="rounded-[20px] border-[2px] border-[#0d0f224e] pl-2 w-full max-w-[450px] text-[18px] h-[58px] outline-[#9767F8]"
                          />
      
                          <motion.button 
                          whileTap={{scale: 0.99}}
                          whileHover={{scale: 1.01}}
                          transition={{ duration: 0.2, ease: "easeInOut"}}
                          type='submit' className='w-full max-w-[300px] bg-[#804EE5] py-[10px] text-white text-[18px] rounded-[25px] shadow-md'>Enviar código</motion.button>
                        </>
                      )
                    } else if (stepSenha === 2){
                      return (
                        <>
                          <div onSubmit={(e) => { e.preventDefault()}} className='max-w-[90%] flex flex-col justify-center items-center gap-7 '>
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
                              </div>
                            </div> 
                          </div>
                          <motion.button 
                          whileTap={{scale: 0.99}}
                          whileHover={{scale: 1.01}}
                          transition={{ duration: 0.2, ease: "easeInOut"}}
                          type='submit' className='w-full max-w-[300px] bg-[#804EE5] py-[10px] text-white text-[18px] rounded-[25px] shadow-md'>Confirmar código</motion.button>

                        </>
                      )
                    }
                    else {
                      return (
                        <>
                          <input type="password" onChange={(e) => {
                              setNovaSenha({ novaSenha: e.target.value });
                              console.log(novaSenha);
                            }} 
                            placeholder="Digite sua senha"
                            className="rounded-[20px] border-[2px] border-[#0d0f224e] pl-2 w-full max-w-[450px] text-[18px] h-[58px] outline-[#9767F8]"
                          />
                          <input type="password" onChange={(e) => {
                              setConfirmarNovaSenha({ confirmarNovaSenha: e.target.value });
                              console.log(novaSenha);
                            }} 
                            placeholder="Confirme sua senha"
                            className="rounded-[20px] border-[2px] border-[#0d0f224e] pl-2 w-full max-w-[450px] text-[18px] h-[58px] outline-[#9767F8]"
                          />

                          <motion.button 
                          whileTap={{scale: 0.99}}
                          whileHover={{scale: 1.01}}
                          transition={{ duration: 0.2, ease: "easeInOut"}}
                          type='submit' className='w-full max-w-[300px] bg-[#804EE5] py-[10px] text-white text-[18px] rounded-[25px] shadow-md'>Redefinir senha</motion.button>
                        </>
                      )
                    }
                  })()}

                </form>
              </div>
            </motion.div>

            <div className="w-full absolute flex justify-center items-center ">
                <Backdrop3 onClick={() => setEditarSenhaPop(false)}/>
            </div>
          
          </>
        )}

        {excluir && (
          <>
              <motion.div 
                key="content"
                initial={{ opacity: 0, scale: 0.85}}
                animate={{ opacity: 1, scale: 0.94 }}
                exit={{ opacity: 0, scale: 0.90 }}
                className={`w-full h-full fixed top-0 left-0 flex justify-center items-center  opacity-1 z-[1100]`}>
                    
                    <div className="w-full h-full absolute" onClick={() => setExcluirPop(false)}></div>
                    <motion.div 
                    key="content"
                    initial={{ opacity: 0, scale: 0.85}}
                    animate={{ opacity: 1, scale: 0.94 }}
                    exit={{ opacity: 0, scale: 0.90 }}
                    className={`w-[700px] h-[400px] flex rounded-[40px] z-[1100]  opacity-1 `}>

                      <div id="white-box" className={` w-full h-full rounded-[40px] bg-white shadow-md flex justify-center items-center relative overflow-hidden z-[1100] left-[50%] translate-x-[-50%] top-[50%] translate-y-[-50%]`}>
                          
                          <Image width={300} height={500} src="/Vector.svg" alt="Decoração" className="absolute top-0 left-[-180px] rotate-90 w-[550px]"/>
                          <Image width={300} height={500} src="/Vector.svg" alt="Decoração" className="absolute bottom-[-40px] right-[-170px] -rotate-90 w-[550px]"/>

                          <div className="w-[80%] h-[85%] flex flex-col items-center gap-2 z-[900] ">
                            <div className="flex flex-col justify-center items-center">
                                <img src={`${user.foto}`} alt="Foto de perfil" className="rounded-full w-20 h-20"/>
                                <span className="font-medium text-[30px]">{user.primeiroNome} </span>
                                <span className="text-[20px]"></span>
                            </div>

                            <h1 className="text-center text-[20px] font-medium">Você deseja mesmo deletar sua conta?</h1>
                            <input type="password" onChange={(e) => {
                                setSenhaDeletar({ senhaDeletar: e.target.value });
                                console.log(senhaDeletar);
                              }} 
                              placeholder="Digite sua senha"
                              className="rounded-[20px] border-[2px] border-[#0d0f224e] pl-2 w-full max-w-[450px] text-[18px] h-[58px] outline-[#9767F8]"
                            />

                            <div className="w-full flex justify-center gap-4 mt-auto">
                                <motion.button 
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                onClick={() => setExcluirPop(false)}
                                className="p-[10px_15px] min-w-[70px] rounded-[20px] text-[18px] bg-[#F1F1F1] border border-[rgba(68,68,68, 0.17)]">
                                  Voltar
                                </motion.button>
                                <motion.button 
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                onClick={() => {deletarConta()}}
                                className="p-[10px_15px] min-w-[65px] rounded-[20px] text-[18px] text-white bg-[#9767F8] border border-[rgba(68,68,68, 0.17)]">
                                  Deletar
                                </motion.button>
                            </div>

                          </div>
                      </div>
                    </motion.div>
                    
                    
                </motion.div>
                  
                  
              <div className="w-full absolute flex justify-center items-center ">
                  <Backdrop3 onClick={() => setExcluirPop(false)}/>
              </div>
          </>
        )}  

        {suspender && (
          <>
              <motion.div 
                key="content"
                initial={{ opacity: 0, scale: 0.85}}
                animate={{ opacity: 1, scale: 0.94 }}
                exit={{ opacity: 0, scale: 0.90 }}
                className={`w-full h-full fixed top-0 left-0 flex justify-center items-center  opacity-1 z-[1100]`}>
                    
                    <div className="w-full h-full absolute" onClick={() => setSuspenderPop(false)}></div>
                    <motion.div 
                    key="content"
                    initial={{ opacity: 0, scale: 0.85}}
                    animate={{ opacity: 1, scale: 0.94 }}
                    exit={{ opacity: 0, scale: 0.90 }}
                    className={`w-[700px] h-[400px] flex rounded-[40px] z-[1100]  opacity-1 `}>

                        <div id="white-box" className={` w-full h-full rounded-[40px] bg-white shadow-md flex justify-center items-center relative overflow-hidden z-[1100] left-[50%] translate-x-[-50%] top-[50%] translate-y-[-50%]`}>
                            
                            <Image width={300} height={500} src="/Vector.svg" alt="Decoração" className="absolute top-0 left-[-180px] rotate-90 w-[550px]"/>
                            <Image width={300} height={500} src="/Vector.svg" alt="Decoração" className="absolute bottom-[-40px] right-[-170px] -rotate-90 w-[550px]"/>

                            <div className="w-[80%] h-[85%] flex flex-col items-center gap-2 z-[900] ">
                              <div className="flex flex-col justify-center items-center">
                                  <img src={`${user.foto}`} alt="Foto de perfil" className="rounded-full w-20 h-20"/>
                                  <span className="font-medium text-[30px]">{user.primeiroNome} </span>
                                  <span className="text-[20px]"></span>
                              </div>

                              <h1 className="text-center text-[20px] font-medium">Você deseja mesmo suspender sua conta?</h1>
                              <input type="password" onChange={(e) => {
                                  setSenhaSuspender({ senhaSuspender: e.target.value });
                                  console.log(senhaSuspender);
                                }} 
                                placeholder="Digite sua senha"
                                className="rounded-[20px] border-[2px] border-[#0d0f224e] pl-2 w-full max-w-[450px] text-[18px] h-[58px] outline-[#9767F8]"
                              />

                              <div className="w-full flex justify-center gap-4 mt-auto">
                                  <motion.button 
                                  whileHover={{ scale: 1.03 }}
                                  whileTap={{ scale: 0.97 }}
                                  onClick={() => setSuspenderPop(false)}
                                  className="p-[10px_15px] min-w-[70px] rounded-[20px] text-[18px] bg-[#F1F1F1] border border-[rgba(68,68,68, 0.17)]">
                                    Voltar
                                  </motion.button>
                                  <motion.button 
                                  whileHover={{ scale: 1.03 }}
                                  whileTap={{ scale: 0.97 }}
                                  onClick={() => {suspenderConta()}}
                                  className="p-[10px_15px] min-w-[65px] rounded-[20px] text-[18px] text-white bg-[#9767F8] border border-[rgba(68,68,68, 0.17)]">
                                    Suspender 
                                  </motion.button>
                              </div>

                            </div>
                        </div>
                    </motion.div>
                    
                    
                </motion.div>
                  
                  
              <div className="w-full absolute flex justify-center items-center ">
                  <Backdrop3 onClick={() => setSuspenderPop(false)}/>
              </div>
          </>
        )}  


      </AnimatePresence>

      <div className=" mt-4 flex flex-col gap-5 ">
        <div className="flex gap-2 w-full items-end border-b pb-5 border-b-[rgb(0,0,0,30%)]">
          <div className="flex flex-col justify-between lg:min-w-[650px] lg:max-w-[650px] w-full gap-4">
            <h1 className="font-medium text-[25px]">Endereço de Email</h1>
            <h2 className="text-[18px]">{email}</h2>
            {/* <input
              type="text"
              defaultValue={email}
              onChange={(e) => setNovoEmail({ ...novoEmail, novoEmail: e.target.value })}
              className=" rounded-[20px] border-[2px] border-[#0d0f224e] pl-2 w-full max-w-[400px] text-[18px] h-[58px] outline-[#9767F8]"
            ></input> */}
          </div>

          <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setEditarEmailPop(true)}
            id="editar_conta"
            className="font-medium border border-[#1E2351] rounded-[15px] px-4 py-2 text-[18px]"
          >
            Editar
          </motion.button>

        </div>

        <div className="flex gap-2 w-full items-end border-b pb-5 border-b-[rgb(0,0,0,30%)]">
          <div className="flex flex-col justify-between lg:min-w-[650px] lg:max-w-[650px] w-full gap-4">
            <h1 className="font-medium text-[20px]">Senha</h1>
            <h2 className="text-[18px]">**************</h2>
            {/* <input
            type="text"
              onChange={(e) => setSenha({ ...senha, novaSenha: e.target.value })}
              className=" rounded-[20px] border-[2px] border-[#0d0f224e] pl-2 w-full max-w-[400px] text-[18px] h-[58px] outline-[#9767F8]"
            ></input> */}
          </div>

          <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setEditarSenhaPop(true)}
          id="editar_conta"
          className="font-medium border border-[#1E2351] rounded-[15px] px-4 py-2 text-[18px]"
          >
            Editar
          </motion.button>

        </div>

        <div className="flex gap-2 w-full items-center ">
          <div className="flex flex-col justify-between lg:min-w-[650px] lg:max-w-[650px] w-full gap-4">
            <h1 className="font-medium text-[20px]">Excluir sua conta</h1>
            <p className="text-[18px] ">
              Ao excluir a sua conta, você não poderá mais acessar os seus
              estudos ou fazer login em nossa plataforma. Sua conta no
              ThinkSpace foi criada em 10:00, 10 de jan. de 2025.
            </p>
          </div>

          <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setExcluirPop(true)}
          id="editar_conta"
          className="font-medium border  border-[#1E2351] rounded-[15px] px-4 py-2 text-[18px]"
          >
            Excluir
          </motion.button>

        </div>

        <div className="flex gap-2 w-full items-center ">
          <div className="flex flex-col justify-between lg:min-w-[650px] lg:max-w-[650px] w-full gap-4">
            <h1 className="font-medium text-[20px]">Suspender a conta</h1>
            <p className="text-[18px] ">
              Sua conta será suspensa, mas você poderá reativá-la a qualquer momento fazendo login novamente. Se nenhum acesso for feito dentro de 30 dias, a conta será excluída permanentemente.
            </p>
          </div>

          <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setSuspenderPop(true)}
          id="editar_conta"
          className="font-medium border border-[#1E2351] rounded-[15px] px-4 py-2 text-[18px]"
          >
            Suspender
          </motion.button>
        </div>
        {/* <motion.button
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        onClick={() => { if(novoEmail){ editarEmail(); } editarSenha();   }}
        id="editar_conta"
        className="mt-3 ml-1 w-[200px] h-[58px] rounded-[30px] text-[18px] font-medium border border-[#1E2351]"
        >
          Salvar
        </motion.button> */}
      </div>
    </>
  );
}
