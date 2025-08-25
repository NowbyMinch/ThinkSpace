import React from "react";
import { SendHorizonal } from "lucide-react"
import { motion } from "framer-motion"
import { useEffect, useState } from "react";
import Loading from "./loading";
import LoadingMessage from "./LoadingMessage";

type UserData = {
    primeiroNome?: string;
    cargo?: string;
    foto?: string;
    // add other properties if needed
};
type ChatMateriaisProps = {
  idMaterial: string;
};
type Historico = {
    autorId: string;
    criadoEm: string;
    mensaghorarioMensagemem: string;
    id: string;
    materialId: string;
    mensagemIa: string;
    mensagemUsuario: string;
};

export const ChatMateriais = ({ idMaterial }: ChatMateriaisProps) => {
    const [ user, setUser ] = useState<UserData>({})
    const [ mensagem, setMensagem ] = useState("");
    const [ historicoUsuario, setHistoricoUsuario ] = useState<Historico[]>([]);
    const [ historicoBot, setHistoricoBot ] = useState<Historico[]>([]);
    const [ loading, setLoading ] = useState(true);
    const [ insideLoading, setInsideLoading ] = useState(false);

    const ReceberMensagem = async () => {
        try{
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/materiais/chatbox/mensagens-usuario/${idMaterial}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
                credentials: "include",
            });
            
            const data = await res.json();
            setHistoricoUsuario(data.mensagensUsuario);

            setInsideLoading(true);
            const res2 = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/materiais/chatbox/mensagens-IA/${idMaterial}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
                credentials: "include",
            });
            
            const data2 = await res2.json();
            setHistoricoBot(data2.mensagensIa);
            setLoading(false);
            setInsideLoading(false);

        } catch (err) {
        console.error(err);
        }
    };
    
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
        
        ReceberMensagem();
    }, []);

    const Mensagem = async () => {
        try{
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/materiais/chatbox/${idMaterial}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify( { mensagem } ),
                credentials: "include",
            });
            
            const data = await res.json();
            console.log("Enviando ",data)
            ReceberMensagem();
            
        } catch (err) {
        console.error(err);
        }
    };


    return (
        <div className=" 2xl:flex hidden flex-col right_panel bg-white rounded-[35px] h-full justify-center items-center shadow-md border border-[#00000031] overflow-y-auto overflow-x-hidden ">
            <p className="text-[16px] text-[#C2C2C2] max-[95%] w-[95%] max-w-full text-center " >Para manter a experiência leve e segura, suas conversas ficam salvas por até 30 dias.</p>
            <div id="messages" className="w-[95%] max-w-[600px] flex flex-col gap-[18px] pr-1 h-[89%] overflow-y-auto mt-6 pb-4 rounded-lg ">

                {historicoUsuario.map((mensagem, index) => (
                    <React.Fragment key={index}>

                        <div className="flex gap-2 ml-auto justify-end">
                        <div className="bg-[#FF9F93] max-w-[75%] border border-[rgba(0,0,0,0.53)] p-3 rounded-[25px] rounded-tr-none flex justify-center items-center shadow-md">
                            <p className="text-[20px] break-words text-white">{mensagem.mensagemUsuario}</p>
                        </div>
                        <div className="shadow-md h-min rounded-full w-[65px]">
                            <img alt="Profile Picture" src={user.foto} className="rounded-full w-full" />
                        </div>
                        </div>

                        <div className="flex gap-2 mr-auto">
                            <div className="shadow-md h-min rounded-full w-[65px]">
                                <img alt="Profile Picture" src="/IApicture.svg" className="rounded-full w-full" width={800} height={800} />
                            </div>
                            <div className="bg-[#A39CEC] max-w-[75%] border border-[rgba(0,0,0,0.53)] p-3 rounded-[25px] rounded-tl-none flex justify-center items-center shadow-md">
                                <p className="text-[20px] break-words text-white">{historicoBot[index]?.mensagemIa }</p>
                            </div>
                        </div>

                    </React.Fragment>
                ))}

                {insideLoading && <LoadingMessage />}

            </div>
            <form onSubmit={(e) => {e.preventDefault(); Mensagem(); setMensagem("");}} className="w-[95%] max-w-[600px] h-[6%] flex gap-2 justify-center items-center w-[95%] max-w-[600px] h-[6%] flex gap-2 justify-center items-center mb-2">
                <input value={mensagem} onChange={(e) => {setMensagem(e.target.value); }} type="text" placeholder="Pergunte a assistente IA" className="w-[80%] pr-3 h-full break-words whitespace-nowrap overflow-hidden overflow-ellipsis rounded-full max-h-[74px] pl-4 text-[20px] border-2 border-[rgba(0,0,0,0.19)] outline-[rgba(151,103,248,0.6)]"/>
                <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.92 }}
                type="submit"
                className="p-[10px] max-h-[100%] bg-[#A39CEC] rounded-[20px] text-white flex justify-center items-center text-[20px] font-semibold shadow-md ">
                    <SendHorizonal className="size-8 max-w-[60%] max-h-[60%] "/>
                </motion.button>
            </form>
        </div>
    )
}
