import Image from "next/image"
import { SendHorizonal } from "lucide-react"
import { motion } from "framer-motion"
import { useEffect, useState } from "react";

type UserData = {
    primeiroNome?: string;
    cargo?: string;
    foto?: string;
    // add other properties if needed
};

export const ChatMateriais = () => {
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
    
      }, []);

    return (
        <div className=" bg-white rounded-[35px] h-[100%] overflow-hidden flex flex-col items-center shadow-md border border-[#00000031] ">
            <div id="messages" className="w-[95%] max-w-[600px] flex flex-col gap-[18px] pr-1 h-[89%] overflow-y-auto mt-6 ">
                <div className=" flex gap-2 ml-auto justify-end">
                    <div className="bg-[#FF9F93] max-w-[75%] border border-[rgba(0,0,0,0.53)] p-3 rounded-[25px] rounded-tr-none flex justify-center items-center shadow-md">
                        <p className=" text-[20px] break-words text-white ">Olá. Você pode me explicar com um exemplo?</p>        
                    </div>

                    <div className="shadow-md h-min rounded-full w-[15%]">
                        <img alt="Profile Picture" src={user.foto} className="rounded-full w-full"  />
                    </div>
                </div>

                <div className=" flex gap-2 ml-auto ">
                    <div className="shadow-md h-min rounded-full w-[15%]">
                        <Image alt="Profile Picture" src="/IApicture.svg" className="rounded-full w-full" width={800} height={800} />
                    </div>

                    <div className="bg-[#A39CEC] max-w-[75%] border border-[rgba(0,0,0,0.53)] p-3 rounded-[25px] rounded-tl-none flex justify-center items-center shadow-md">
                        <p className=" text-[20px] break-words text-white ">A herança permite que uma classe reutilize atributos e métodos de outra. No exemplo, Cachorro herda de Animal, mantendo o atributo nome e sobrescrevendo o método fazerSom().!</p>        
                    </div>

                </div>

                <div className=" flex gap-2 ml-auto justify-end">
                    <div className="bg-[#FF9F93] max-w-[75%] border border-[rgba(0,0,0,0.53)] p-3 rounded-[25px] rounded-tr-none flex justify-center items-center shadow-md">
                        <p className=" text-[20px] break-words text-white ">Consegui entender, muito obrigado!</p>        
                    </div>

                    <div className="shadow-md h-min rounded-full w-[15%]">
                        <img alt="Profile Picture" src={user.foto} className="rounded-full w-full" />
                    </div>
                </div>

            </div>
            <div className="w-[95%] max-w-[600px] h-[6%] flex gap-2 justify-center items-center">
                <input type="text" placeholder="Pergunte a assistente IA" className="w-[80%] h-full rounded-full max-h-[74px] pl-5 text-[20px] border-2 border-[rgba(0,0,0,0.19)]  outline-[rgba(151,103,248,0.6)]"/>
                <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.92 }}
                
                className="w-[15%] h-[75px] max-h-[100%] bg-[#A39CEC] rounded-[27%] text-white flex justify-center items-center text-[20px] font-semibold shadow-md ">
                    <SendHorizonal className="size-7"/>
                </motion.button>
            </div>

        </div>
    )
}
