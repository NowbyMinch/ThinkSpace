"use client";
import { motion } from "framer-motion";
import { useState } from "react";

export default function Notificação() {
  const [ checked, setChecked ] = useState<boolean[]>(Array(7).fill(false));

  return (
    <>
      <div className=" mt-4 w-[100%] border-b border-[rgba(0,0,0,0.33)] pb-4 ">
        <div className="relative flex items-center gap-2 justify-between lg:justify-normal">
          <div className="lg:min-w-[650px] lg:max-w-[650px] max-w-[70%] ">
            <h1 className="font-medium text-[25px]">Comentários</h1>
            <h2 className="text-[18px] ">
              Notificações para comentários em suas postagens e respostas para
              seus comentários.
            </h2>
          </div>

          <div className="flex flex-col gap-2 w-fit ">
            <div className="flex gap-1 ">
              <motion.label
              whileHover={{ scale:1.01 }}
              whileTap={{ scale:0.99 }}

              className=" w-[55px] h-[25px] rounded-full cursor-pointer relative flex items-center "
              >
                <input id="opcao" type="checkbox" checked={checked[0]} onChange={() => setChecked(prev => { const novo = [...prev]; novo[0] = !novo[0]; return novo; }) } 
                className="absolute appearance-none"/>

                <motion.div 
                animate={{ x: checked[0]? 26 : 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}

                className="bg-white ml-[5px] z-10 mr-[5px] w-[20px] h-[20px] rounded-full"></motion.div>

                <motion.div 
                animate={{ backgroundColor: checked[0]? '#9767F8' : '#D9D9D9' }}
                id="switch_color" className={` w-full h-full rounded-full absolute `}></motion.div>

              </motion.label>
              
              <h2 className="text-[18px] w-[92px] font-medium">Comentários</h2>
            </div>

            <div className="flex gap-1 ">
              <motion.label
              whileHover={{ scale:1.01 }}
              whileTap={{ scale:0.99 }}

              className=" w-[55px] h-[25px] rounded-full cursor-pointer relative flex items-center "
              >
                <input id="opcao" type="checkbox" checked={checked[1]} onChange={() => setChecked(prev => { const novo = [...prev]; novo[1] = !novo[1]; return novo; }) } 
                className="absolute appearance-none"/>

                <motion.div 
                animate={{ x: checked[1]? 26 : 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}

                className="bg-white ml-[5px] z-10 mr-[5px] w-[20px] h-[20px] rounded-full"></motion.div>

                <motion.div 
                animate={{ backgroundColor: checked[1]? '#9767F8' : '#D9D9D9' }}
                id="switch_color" className={` w-full h-full rounded-full absolute `}></motion.div>

              </motion.label>
              
              <h2 className="text-[18px] font-medium w-[92px]">Respostas</h2>
            </div>
          </div>

        </div>
      </div>

      <div className=" mt-4 w-[100%] border-b border-[rgba(0,0,0,0.33)] pb-4">
        <div className="relative flex items-center gap-2 justify-between lg:justify-normal">
          <div className="lg:min-w-[650px] lg:max-w-[650px] max-w-[70%] ">
            <h1 className="font-medium text-[25px]">Lembretes</h1>
            <h2 className="text-[18px]">
              Notificações para lembrar de atividades e estudos da semana.
            </h2>
          </div>

          <div className="flex flex-col gap-2 ">
            <div className="flex gap-1 ">
              <motion.label
              whileHover={{ scale:1.01 }}
              whileTap={{ scale:0.99 }}

              className=" w-[55px] h-[25px] rounded-full cursor-pointer relative flex items-center "
              >
                <input id="opcao" type="checkbox" checked={checked[2]} onChange={() => setChecked(prev => { const novo = [...prev]; novo[2] = !novo[2]; return novo; }) } 
                className="absolute appearance-none"/>

                <motion.div 
                animate={{ x: checked[2]? 26: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}

                className="bg-white ml-[5px] z-10 mr-[5px] w-[20px] h-[20px] rounded-full"></motion.div>

                <motion.div 
                animate={{ backgroundColor: checked[2]? '#9767F8' : '#D9D9D9' }}
                id="switch_color" className={` w-full h-full rounded-full absolute `}></motion.div>

              </motion.label>
              
              <h2 className="text-[18px] font-medium w-[92px]">Atividades</h2>
            </div>

            <div className="flex gap-1 ">
              <motion.label
              whileHover={{ scale:1.01 }}
              whileTap={{ scale:0.99 }}

              className=" w-[55px] h-[25px] rounded-full cursor-pointer relative flex items-center "
              >
                <input id="opcao" type="checkbox" checked={checked[3]} onChange={() => setChecked(prev => { const novo = [...prev]; novo[3] = !novo[3]; return novo; }) } 
                className="absolute appearance-none"/>

                <motion.div 
                animate={{ x: checked[3]? 26: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}

                className="bg-white ml-[5px] z-10 mr-[5px] w-[20px] h-[20px] rounded-full"></motion.div>

                <motion.div 
                animate={{ backgroundColor: checked[3]? '#9767F8' : '#D9D9D9' }}
                id="switch_color" className={` w-full h-full rounded-full absolute `}></motion.div>

              </motion.label>
              
              <h2 className="text-[18px] font-medium w-[92px]">Estudos</h2>
            </div>
          </div>

        </div>
      </div>

      <div className=" mt-4 w-[100%] border-b border-[rgba(0,0,0,0.33)] pb-4">
        <div className="relative flex items-center gap-2 justify-between lg:justify-normal">
          <div className="lg:min-w-[650px] lg:max-w-[650px] max-w-[70%]">
            <h1 className="font-medium text-[25px] ">Postagens</h1>
            <h2 className="text-[18px]">
              Notificações para novas postagens em salas de estudos seguidas e
              postagens destaque.
            </h2>
          </div>

          <div className="flex flex-col gap-2 ">
            <div className="flex gap-1 ">
              <motion.label
              whileHover={{ scale:1.01 }}
              whileTap={{ scale:0.99 }}

              className=" w-[55px] h-[25px] rounded-full cursor-pointer relative flex items-center "
              >
                <input id="opcao" type="checkbox" checked={checked[4]} onChange={() => setChecked(prev => { const novo = [...prev]; novo[4] = !novo[4]; return novo; }) } 
                className="absolute appearance-none"/>

                <motion.div 
                animate={{ x: checked[4]? 26 : 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}

                className="bg-white ml-[5px] z-10 mr-[5px] w-[20px] h-[20px] rounded-full"></motion.div>

                <motion.div 
                animate={{ backgroundColor: checked[4]? '#9767F8' : '#D9D9D9' }}
                id="switch_color" className={` w-full h-full rounded-full absolute `}></motion.div>

              </motion.label>
              
              <h2 className="text-[18px] font-medium w-[92px]">Postagens</h2>
            </div>

            <div className="flex gap-1 ">
              <motion.label
              whileHover={{ scale:1.01 }}
              whileTap={{ scale:0.99 }}

              className=" w-[55px] h-[25px] rounded-full cursor-pointer relative flex items-center "
              >
                <input id="opcao" type="checkbox" checked={checked[5]} onChange={() => setChecked(prev => { const novo = [...prev]; novo[5] = !novo[5]; return novo; }) } 
                className="absolute appearance-none"/>

                <motion.div 
                animate={{ x: checked[5]? 26: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}

                className="bg-white ml-[5px] z-10 mr-[5px] w-[20px] h-[20px] rounded-full"></motion.div>

                <motion.div 
                animate={{ backgroundColor: checked[5]? '#9767F8' : '#D9D9D9' }}
                id="switch_color" className={` w-full h-full rounded-full absolute `}></motion.div>

              </motion.label>
              
              <h2 className="text-[18px] font-medium w-[92px]">Destaques</h2>
            </div>
          </div>


        </div>
      </div>

      <div className=" mt-4 w-[100%] border-b border-[rgba(0,0,0,0.33)] pb-4">
        <div className="relative flex items-center gap-2 justify-between lg:justify-normal">
          <div className="lg:min-w-[650px] lg:max-w-[650px] max-w-[70%]">
            <h1 className="font-medium text-[25px]">
              Mais atividades sobre você
            </h1>
            <h2 className="text-[18px]">Notificações de novos seguidores.</h2>
          </div>

          <div className="flex flex-col gap-2 ">
            <div className="flex gap-1 ">
              <motion.label
              whileHover={{ scale:1.01 }}
              whileTap={{ scale:0.99 }}

              className=" w-[55px] h-[25px] rounded-full cursor-pointer relative flex items-center "
              >
                <input id="opcao" type="checkbox" checked={checked[6]} onChange={() => setChecked(prev => { const novo = [...prev]; novo[6] = !novo[6]; return novo; }) } 
                className="absolute appearance-none"/>

                <motion.div 
                animate={{ x: checked[6]? 26: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}

                className="bg-white ml-[5px] z-10 mr-[5px] w-[20px] h-[20px] rounded-full"></motion.div>

                <motion.div 
                animate={{ backgroundColor: checked[6]? '#9767F8' : '#D9D9D9' }}
                id="switch_color" className={` w-full h-full rounded-full absolute `}></motion.div>

              </motion.label>
              
              <h2 className="text-[18px] font-medium w-[92px]">Seguidores</h2>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
