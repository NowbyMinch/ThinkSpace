"use client";

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

type UserData = {
  primeiroNome?: string;
  cargo?: string;
  foto?: string;
  // add other properties if needed
};

export default function Informações() {
  const [ user, setUser ] = useState<UserData>({})

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
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/configuracoes`, {
          method: 'GET',
          credentials: 'include',
        });
        
        const data = await res.json();
        console.log(data)
      } catch (err) {
        // setMessage("Erro ao carregar saudação.");
        console.error(err);
      }
    }; 
    e();      

  }, []);

  return (
    <>
      <form className="mt-4 ml-10 flex flex-col gap-3 overflow-hidden">
        <div className="flex flex-col justify-between  w-[1000px]">
          <h1 className="text-[30px] font-medium">Primeiro nome</h1>
          <input
            type="text"
            defaultValue=""
            className=" rounded-[20px] border-[2px] border-[#0d0f224e] pl-2 w-[60%] text-[25px] h-[60px] outline-[#9767F8]"
          ></input>
        </div>
        <div className="flex flex-col justify-between  w-[1000px]">
          <h1 className="text-[30px] font-medium">Sobrenome</h1>
          <input
            type="text"
            defaultValue=""
            className=" rounded-[20px] border-[2px] border-[#0d0f224e] pl-2 w-[60%] text-[25px] h-[60px] outline-[#9767F8]"
          ></input>
        </div>

        <div className="flex flex-col justify-between w-[1000px] ">
          <h1 className="text-[30px] font-medium">Data de Nascimento</h1>
          <input
            type="text"
            defaultValue=""
            className=" rounded-[20px] border-[2px] border-[#0d0f224e] pl-2 w-[60%] text-[25px] h-[60px] outline-[#9767F8]"
          ></input>
        </div>

        <div className="flex flex-col justify-between w-[1000px] ">
          <h1 className="text-[30px] font-medium">Instituição</h1>
          <input
            type="text"
            defaultValue=""
            className=" rounded-[20px] border-[2px] border-[#0d0f224e] pl-2 w-[60%] text-[25px] h-[60px] outline-[#9767F8]"
          ></input>
        </div>

        <div className="flex flex-col justify-between w-[1000px] ">
          <h1 className="text-[30px] font-medium">
            Cargo ou Posição / Nível de escolaridade
          </h1>
          <input
            type="text"
            defaultValue=""
            className=" rounded-[20px] border-[2px] border-[#0d0f224e] pl-2 w-[60%] text-[25px] h-[60px] outline-[#9767F8]"
          ></input>
        </div>

        <motion.button
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        type='submit'
        id="editar_conta"
        className="mt-3 ml-1 w-[200px] h-[60px] rounded-[30px] text-[25px] font-medium border border-[#1E2351]"
        >
          Salvar
        </motion.button>
      </form>
    </>
  );
}
