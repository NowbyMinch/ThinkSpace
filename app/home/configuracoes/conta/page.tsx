"use client";

import { motion } from "framer-motion";

export default function Conta() {
  return (
    <>
      <div className="ml-10 mt-4 flex flex-col gap-10">
        <div className="flex justify-between w-[1000px] items-center border-b pb-5 border-b-[rgb(0,0,0,30%)]">
          <div className="">
            <h1 className="font-medium text-[30px]">Endereço de Email</h1>
            <h2 className="text-[25px]">marimachado@gmail.com</h2>
          </div>

          <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
            id="editar_conta"
            className="font-medium border border-[#1E2351] rounded-[10px] w-[100px] h-[55px] text-[24px]"
          >
            Editar
          </motion.button>
        </div>

        <div className="flex justify-between w-[1000px] items-center border-b pb-5 border-b-[rgb(0,0,0,30%)]">
          <div className="">
            <h1 className="font-medium text-[30px]">Senha</h1>
            <h2 className="text-[25px]">***********</h2>
          </div>

          <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
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
            id="editar_conta"
            className="font-medium border border-[#1E2351] rounded-[10px] w-[120px] h-[55px] text-[24px]"
          >
            Suspender
          </motion.button>
        </div>
      </div>
    </>
  );
}
