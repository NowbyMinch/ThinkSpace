"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";
import { redirect } from "next/navigation";
import { Backdrop3 } from "../../components/backdrop";

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
  const [ excluir, setExcluirPop ] = useState(false);
  const [ suspender, setSuspenderPop ] = useState(false);
  const [ user, setUser ] = useState<UserData>({})
  const [email, setEmail] = useState("");
  const [novoEmail, setNovoEmail] = useState({ novoEmail: "" });
  const [ senha, setSenha ] = useState({ novaSenha: ""});

  useEffect(() => {

    const user = async () => {
      try{
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/home/identificacao`, {
          method: 'GET',
          credentials: 'include',
        });
        
        const data = await res.json();
        setUser(data)
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

      } catch (err) {
        // setMessage("Erro ao carregar saudação.");
        console.error(err);
      }
    }; 
    e();

  }, []);


  const editarSenha = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/editar-senha`, {
        method: "PATCH",
        credentials: "include",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(senha),
      });

      const result = await res.json();
      console.log(result.message); // Matéria excluída com sucesso.
      
    } catch (error) {
      console.error("Erro ao editar a senha:");
    }
  };

  const editarEmail = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/editar-email`, {
        method: "PATCH",
        credentials: "include",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(novoEmail),
      });

      const result = await res.json();
      console.log(result.message); // Matéria excluída com sucesso.
      
    } catch (error) {
      console.error("Erro ao editar a senha:");
    }
  };

  return (
    <>
      <AnimatePresence initial={false}>
        {suspender && (
            <>
                <motion.div 
                key="content"
                initial={{ opacity: 0, scale: 0.85}}
                animate={{ opacity: 1, scale: 0.94 }}
                exit={{ opacity: 0, scale: 0.90 }}
                
                className={`w-full h-full fixed top-0 left-0 flex justify-center items-center  opacity-1 z-[1100] `}>
                    
                    <div className="w-full h-full absolute " onClick={() => setSuspenderPop(false)}></div>
                    <motion.div 
                    key="content"
                    initial={{ opacity: 0, scale: 0.85}}
                    animate={{ opacity: 1, scale: 0.94 }}
                    exit={{ opacity: 0, scale: 0.90 }}
                    className={`w-[700px] h-[400px] flex  rounded-[40px] z-[1100]  opacity-1 `}>

                        <div id="white-box" className={` w-full h-full rounded-[40px] bg-white shadow-md flex justify-center items-center relative overflow-hidden z-[1100] left-[50%] translate-x-[-50%] top-[50%] translate-y-[-50%]`}>
                            
                            <Image width={300} height={500} src="/Vector.svg" alt="Decoração" className="absolute top-0 left-[-180px] rotate-90 w-[550px]"/>
                            <Image width={300} height={500} src="/Vector.svg" alt="Decoração" className="absolute bottom-[-40px] right-[-170px] -rotate-90 w-[550px]"/>

                            <div className="w-[80%] h-[85%] flex flex-col items-center gap-2 z-[900] ">
                                <div className="flex flex-col justify-center items-center">
                                    <img src={`${user.foto}`} alt="Foto de perfil" className="rounded-full w-20 h-20"/>
                                    <span className="font-medium text-[30px]">{user.primeiroNome} </span>
                                    <span className="text-[20px]"></span>
                                </div>

                                <h1 className="text-center text-[35px] font-medium">Você deseja mesmo suspender sua conta do ThinkSpace?</h1>
                                <div className="w-[60%] flex justify-between mt-auto">
                                    <motion.button 
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.97 }}
                                    onClick={() => setSuspenderPop(false)}
                                    className="w-[140px] rounded-[20px] text-[26px] bg-[#F1F1F1] border border-[rgba(68,68,68, 0.17)]">
                                        Não
                                    </motion.button>
                                    <motion.button 
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.97 }}
                                    onClick={() => {setSuspenderPop(false); redirect("/")}}
                                    className="w-[140px] rounded-[20px] text-[26px] text-white bg-[#9767F8] border border-[rgba(68,68,68, 0.17)]">
                                        Sim
                                    </motion.button>
                                </div>

                            </div>
                        </div>
                    </motion.div>
                    
                    
                </motion.div>
                    
                    
                <div className="w-full absolute flex justify-center items-center bg-red-500">
                    <Backdrop3 onClick={() => setSuspenderPop(false)}/>
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
                
                className={`w-full h-full fixed top-0 left-0 flex justify-center items-center opacity-1 z-[1100] `}>
                    
                    <div className="w-full h-full absolute " onClick={() => setExcluirPop(false)}></div>
                    <motion.div 
                    key="content"
                    initial={{ opacity: 0, scale: 0.85}}
                    animate={{ opacity: 1, scale: 0.94 }}
                    exit={{ opacity: 0, scale: 0.90 }}
                    className={`w-[700px] h-[400px] flex  rounded-[40px] z-[1100]  opacity-1 `}>

                        <div id="white-box" className={` w-full h-full rounded-[40px] bg-white shadow-md flex justify-center items-center relative overflow-hidden z-[1100] left-[50%] translate-x-[-50%] top-[50%] translate-y-[-50%]`}>
                            
                            <Image width={300} height={500} src="/Vector.svg" alt="Decoração" className="absolute top-0 left-[-180px] rotate-90 w-[550px]"/>
                            <Image width={300} height={500} src="/Vector.svg" alt="Decoração" className="absolute bottom-[-40px] right-[-170px] -rotate-90 w-[550px]"/>

                            <div className="w-[80%] h-[85%] flex flex-col items-center gap-2 z-[900] ">
                                <div className="flex flex-col justify-center items-center">
                                    <img src={`${user.foto}`} alt="Foto de perfil" className="rounded-full w-20 h-20"/>
                                    <span className="font-medium text-[30px]">{user.primeiroNome} </span>
                                    <span className="text-[20px]"></span>
                                </div>

                                <h1 className="text-center text-[35px] font-medium">Você deseja mesmo excluir sua conta do ThinkSpace?</h1>
                                <div className="w-[60%] flex justify-between mt-auto">
                                    <motion.button 
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.97 }}
                                    onClick={() => setExcluirPop(false)}
                                    className="w-[140px] rounded-[20px] text-[26px] bg-[#F1F1F1] border border-[rgba(68,68,68, 0.17)]">
                                        Não
                                    </motion.button>
                                    <motion.button 
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.97 }}
                                    onClick={() => {setExcluirPop(false); redirect("/")}}
                                    className="w-[140px] rounded-[20px] text-[26px] text-white bg-[#9767F8] border border-[rgba(68,68,68, 0.17)]">
                                        Sim
                                    </motion.button>
                                </div>

                            </div>
                        </div>
                    </motion.div>
                    
                    
                </motion.div>
                    
                    
                <div className="w-full absolute flex justify-center items-center bg-red-500">
                    <Backdrop3 onClick={() => setExcluirPop(false)}/>
                </div>
            </>
        )}
      </AnimatePresence>
      {/* <div className={`  absolute left-0 top-0 w-full h-full `}>
      </div> */}
z

      <div className="ml-10 mt-4 flex flex-col gap-5">
        <div className="flex justify-between w-[1000px] items-center border-b pb-5 border-b-[rgb(0,0,0,30%)]">
          <div className="flex flex-col justify-between w-[400px] gap-4">
            <h1 className="font-medium text-[30px]">Endereço de Email</h1>
            <input
              type="text"
              defaultValue={email}
              onChange={(e) => setNovoEmail({ ...novoEmail, novoEmail: e.target.value })}
              className=" rounded-[20px] border-[2px] border-[#0d0f224e] pl-2 w-[100%] text-[25px] h-[60px] outline-[#9767F8]"
            ></input>
          </div>

          <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={editarEmail}
            id="editar_conta"
            className="font-medium border border-[#1E2351] rounded-[10px] w-[100px] h-[55px] text-[24px]"
          >
            Editar
          </motion.button>
        </div>

        <div className="flex justify-between w-[1000px] items-center border-b pb-5 border-b-[rgb(0,0,0,30%)]">
          <div className="flex flex-col justify-between w-[400px] gap-4">
            <h1 className="font-medium text-[30px]">Senha</h1>
            <input
            type="text"
              placeholder="************"
              onChange={(e) => setSenha({ ...senha, novaSenha: e.target.value })}
              className=" rounded-[20px] border-[2px] border-[#0d0f224e] pl-2 w-[100%] text-[25px] h-[60px] outline-[#9767F8]"
            ></input>
          </div>

          <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={editarSenha}
            id="editar_conta"
            className="font-medium border border-[#1E2351] rounded-[10px] w-[100px] h-[55px] text-[24px]"
          >
            Editar
          </motion.button>
        </div>

        <div className="flex justify-between w-[1000px] items-center ">
          <div className="w-[80%]">
            <h1 className="font-medium text-[30px]">Excluir sua conta</h1>
            <p className="text-[25px] ">
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
          className="font-medium border border-[#1E2351] rounded-[10px] w-[100px] h-[55px] text-[24px]"
          >
            Excluir
          </motion.button>
        </div>

        <div className="flex justify-between w-[1000px] items-center ">
          <div className="w-[80%]">
            <h1 className="font-medium text-[30px]">Suspender a conta</h1>
            <p className="text-[25px] ">
              Ao suspender sua conta, você não poderá acessar seus estudos nem
              fazer login em nossa plataforma. Caso a suspensão ultrapasse 3
              meses, sua conta será excluída.
            </p>
          </div>

          <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setSuspenderPop(true)}
          id="editar_conta"
          className="font-medium border border-[#1E2351] rounded-[10px] w-[120px] h-[55px] text-[24px]"
          >
            Suspender
          </motion.button>
        </div>
        {/* <motion.button
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        onClick={() => { if(novoEmail){ editarEmail(); } editarSenha();   }}
        id="editar_conta"
        className="mt-3 ml-1 w-[200px] h-[60px] rounded-[30px] text-[25px] font-medium border border-[#1E2351]"
        >
          Salvar
        </motion.button> */}
      </div>
    </>
  );
}
