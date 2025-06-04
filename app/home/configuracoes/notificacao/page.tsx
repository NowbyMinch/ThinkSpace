"use client";
import { motion } from "framer-motion";
import { useState } from "react";

export default function Notificação() {
  const [ checked, setChecked ] = useState([false, false, false, false, false, false, false]);

  return (
    <>
      <div className="ml-10 mt-4 w-[95%] border-b border-[rgba(0,0,0,0.33)] pb-4">
        <div className="relative flex items-center w-[820px] gap-2">
          <div className="min-w-[602px] max-w-[602px]">
            <h1 className="font-medium text-[35px]">Comentários</h1>
            <h2 className="text-[25px]">
              Notificações para comentários em suas postagens e respostas para
              seus comentários.
            </h2>
          </div>

          <div className="flex flex-col gap-2 ">
            <div className="flex gap-2 ">
              <motion.label
              whileHover={{ scale:1.01 }}
              whileTap={{ scale:0.99 }}

              className=" w-[70px] h-[34px] rounded-full cursor-pointer relative flex items-center "
              >
                <input id="opcao" type="checkbox" checked={checked[0]} onChange={() => setChecked(prev => { const novo = [...prev]; novo[0] = !novo[0]; return novo; }) } 
                className="absolute appearance-none"/>

                <motion.div 
                animate={{ x: checked[0]? 35 : 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}

                className="bg-white ml-[5px] z-10 mr-[5px] w-[25px] h-[25px] rounded-full"></motion.div>

                <motion.div 
                animate={{ backgroundColor: checked[0]? '#9767F8' : '#D9D9D9' }}
                id="switch_color" className={` w-full h-full rounded-full absolute `}></motion.div>

              </motion.label>
              
              <h2 className="text-[26px] font-medium">Comentários</h2>
            </div>

            <div className="flex gap-2 ">
              <motion.label
              whileHover={{ scale:1.01 }}
              whileTap={{ scale:0.99 }}

              className=" w-[70px] h-[34px] rounded-full cursor-pointer relative flex items-center "
              >
                <input id="opcao" type="checkbox" checked={checked[1]} onChange={() => setChecked(prev => { const novo = [...prev]; novo[1] = !novo[1]; return novo; }) } 
                className="absolute appearance-none"/>

                <motion.div 
                animate={{ x: checked[1]? 35 : 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}

                className="bg-white ml-[5px] z-10 mr-[5px] w-[25px] h-[25px] rounded-full"></motion.div>

                <motion.div 
                animate={{ backgroundColor: checked[1]? '#9767F8' : '#D9D9D9' }}
                id="switch_color" className={` w-full h-full rounded-full absolute `}></motion.div>

              </motion.label>
              
              <h2 className="text-[26px] font-medium">Comentários</h2>
            </div>
          </div>
        </div>
      </div>

      <div className="ml-10 mt-4 w-[95%] border-b border-[rgba(0,0,0,0.33)] pb-4">
        <div className="relative flex items-center w-[820px] gap-2">
          <div className="min-w-[602px] max-w-[602px]">
            <h1 className="font-medium text-[35px]">Lembretes</h1>
            <h2 className="text-[25px]">
              Notificações para lembrar de atividades e estudos da semana.
            </h2>
          </div>

          <div className="flex flex-col gap-2 ">
            <div className="flex gap-2 ">
              <motion.label
              whileHover={{ scale:1.01 }}
              whileTap={{ scale:0.99 }}

              className=" w-[70px] h-[34px] rounded-full cursor-pointer relative flex items-center "
              >
                <input id="opcao" type="checkbox" checked={checked[2]} onChange={() => setChecked(prev => { const novo = [...prev]; novo[2] = !novo[2]; return novo; }) } 
                className="absolute appearance-none"/>

                <motion.div 
                animate={{ x: checked[2]? 35 : 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}

                className="bg-white ml-[5px] z-10 mr-[5px] w-[25px] h-[25px] rounded-full"></motion.div>

                <motion.div 
                animate={{ backgroundColor: checked[2]? '#9767F8' : '#D9D9D9' }}
                id="switch_color" className={` w-full h-full rounded-full absolute `}></motion.div>

              </motion.label>
              
              <h2 className="text-[26px] font-medium">Comentários</h2>
            </div>

            <div className="flex gap-2 ">
              <motion.label
              whileHover={{ scale:1.01 }}
              whileTap={{ scale:0.99 }}

              className=" w-[70px] h-[34px] rounded-full cursor-pointer relative flex items-center "
              >
                <input id="opcao" type="checkbox" checked={checked[3]} onChange={() => setChecked(prev => { const novo = [...prev]; novo[3] = !novo[3]; return novo; }) } 
                className="absolute appearance-none"/>

                <motion.div 
                animate={{ x: checked[3]? 35 : 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}

                className="bg-white ml-[5px] z-10 mr-[5px] w-[25px] h-[25px] rounded-full"></motion.div>

                <motion.div 
                animate={{ backgroundColor: checked[3]? '#9767F8' : '#D9D9D9' }}
                id="switch_color" className={` w-full h-full rounded-full absolute `}></motion.div>

              </motion.label>
              
              <h2 className="text-[26px] font-medium">Comentários</h2>
            </div>
          </div>

        </div>
      </div>

      <div className="ml-10 mt-4 w-[95%] border-b border-[rgba(0,0,0,0.33)] pb-4">
        <div className="relative flex items-center w-[820px] gap-2">
          <div className="min-w-[602px] max-w-[602px]">
            <h1 className="font-medium text-[35px]">Postagens</h1>
            <h2 className="text-[25px]">
              Notificações para novas postagens em salas de estudos seguidas e
              postagens destaque.
            </h2>
          </div>

          <div className="flex flex-col gap-2 ">
            <div className="flex gap-2 ">
              <motion.label
              whileHover={{ scale:1.01 }}
              whileTap={{ scale:0.99 }}

              className=" w-[70px] h-[34px] rounded-full cursor-pointer relative flex items-center "
              >
                <input id="opcao" type="checkbox" checked={checked[4]} onChange={() => setChecked(prev => { const novo = [...prev]; novo[4] = !novo[4]; return novo; }) } 
                className="absolute appearance-none"/>

                <motion.div 
                animate={{ x: checked[4]? 35 : 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}

                className="bg-white ml-[5px] z-10 mr-[5px] w-[25px] h-[25px] rounded-full"></motion.div>

                <motion.div 
                animate={{ backgroundColor: checked[4]? '#9767F8' : '#D9D9D9' }}
                id="switch_color" className={` w-full h-full rounded-full absolute `}></motion.div>

              </motion.label>
              
              <h2 className="text-[26px] font-medium">Comentários</h2>
            </div>

            <div className="flex gap-2 ">
              <motion.label
              whileHover={{ scale:1.01 }}
              whileTap={{ scale:0.99 }}

              className=" w-[70px] h-[34px] rounded-full cursor-pointer relative flex items-center "
              >
                <input id="opcao" type="checkbox" checked={checked[5]} onChange={() => setChecked(prev => { const novo = [...prev]; novo[5] = !novo[5]; return novo; }) } 
                className="absolute appearance-none"/>

                <motion.div 
                animate={{ x: checked[5]? 35 : 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}

                className="bg-white ml-[5px] z-10 mr-[5px] w-[25px] h-[25px] rounded-full"></motion.div>

                <motion.div 
                animate={{ backgroundColor: checked[5]? '#9767F8' : '#D9D9D9' }}
                id="switch_color" className={` w-full h-full rounded-full absolute `}></motion.div>

              </motion.label>
              
              <h2 className="text-[26px] font-medium">Comentários</h2>
            </div>
          </div>


        </div>
      </div>

      <div className="ml-10 mt-4 w-[95%] border-b border-[rgba(0,0,0,0.33)] pb-4">
        <div className="relative flex items-center w-[820px] gap-2">
          <div className="min-w-[602px] max-w-[602px]">
            <h1 className="font-medium text-[35px]">
              Mais atividades sobre você
            </h1>
            <h2 className="text-[25px]">Notificações de novos seguidores.</h2>
          </div>

          <div className="flex flex-col gap-2 ">
            <div className="flex gap-2 ">
              <motion.label
              whileHover={{ scale:1.01 }}
              whileTap={{ scale:0.99 }}

              className=" w-[70px] h-[34px] rounded-full cursor-pointer relative flex items-center "
              >
                <input id="opcao" type="checkbox" checked={checked[6]} onChange={() => setChecked(prev => { const novo = [...prev]; novo[6] = !novo[6]; return novo; }) } 
                className="absolute appearance-none"/>

                <motion.div 
                animate={{ x: checked[6]? 35 : 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}

                className="bg-white ml-[5px] z-10 mr-[5px] w-[25px] h-[25px] rounded-full"></motion.div>

                <motion.div 
                animate={{ backgroundColor: checked[6]? '#9767F8' : '#D9D9D9' }}
                id="switch_color" className={` w-full h-full rounded-full absolute `}></motion.div>

              </motion.label>
              
              <h2 className="text-[26px] font-medium">Comentários</h2>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
