"use client";
import {ChatMateriais} from "@/app/home/components/chat-materiais";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { marked } from 'marked';
import Loading from "@/app/home/components/loading";
import { motion, AnimatePresence } from "framer-motion";

// import { PageProps } from "../type";
// { params }: PageProps 


export default function MaterialClient() {
    const [ resumo, setResumo ] = useState("");
    const [ origem, setOrigem ] = useState("");
    const [ loading, setLoading ] = useState(true);
    const [ appear, setAppear ] = useState(false);
    const params = useParams();
    const idMaterial = params?.idMaterial as string;
    const html = resumo ? marked.parse(resumo) : '';

    useEffect(() => {
        const Origem = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/materiais/${idMaterial}`, {
                    method: 'GET',
                    credentials: 'include',
                });
                const data = await res.json();
                setOrigem(data.material.origem);
            } catch (err) {
                console.error(err);
            }
        };

        Origem();
    }, [idMaterial]);
    useEffect(() => {
        const Resumo = async () => {
            if (!origem) return;

            try {
                let url = "";

                if (origem === "TOPICOS") {
                    console.log("Rodando topicos");
                    url = `${process.env.NEXT_PUBLIC_API_URL}/materiais/resumo-topicos/${idMaterial}`;
                } else if (origem === "ASSUNTO") {
                    console.log("Rodando Assunto");
                    url = `${process.env.NEXT_PUBLIC_API_URL}/materiais/resumo-assunto/${idMaterial}`;
                } else {
                    url = `${process.env.NEXT_PUBLIC_API_URL}/materiais/resumo-documento/${idMaterial}`;
                }

                const res = await fetch(url, {
                    method: 'GET',
                    credentials: 'include',
                });

                const data = await res.json();
                setResumo(data.resumoIA);
                console.log(data);
                
            } catch (err) {
                console.error(err);
            } 
        };

        Resumo();
    }, [origem, idMaterial]);
    useEffect(() => {
        if (resumo) {
            if (resumo.length > 0){
                setLoading(false);
            }
        }
    }, [resumo]);


    if (!idMaterial) return null;
    if (loading) return <Loading />;

    return( 
        <>  
            <div className="relative w-full rounded-[35px] bg-white h-full flex flex-col items-center shadow-md border border-[#00000031] ">
                <div className=" w-full rounded-[35px] overflow-hidden bg-white h-full flex flex-col items-center shadow-md border border-[#00000031]"> 
                    <div className="  max-w-[95%] h-full py-2 my-1 flex flex-col overflow-y-auto items-center ">
                        <div className=" w-[98%]">
                            <p className="text-[16px] text-[#C2C2C2] w-full max-w-full text-center" >Este conteúdo foi sintetizado por IA e busca facilitar sua compreensão. Em caso de dúvida, consulte fontes complementares.</p>    
                            <h1 className=" text-[25px] font-medium h-fit">Resumo <span className=" text-[#726BB6]">IA</span></h1>
                            <div className=" h-[96%] flex flex-col gap-8  ">
                                
                                <p className="text-[18px] resumo" dangerouslySetInnerHTML={{ __html: html }} />

                                {/* <div className=" flex flex-col gap-4">
                                    <h1 className=" text-[35px] font-semibold">Resumo sobre Programação Orientada a Objetos (POO):</h1>
                                    <h2 className=" text-[25px] font-semibold">Introdução à Programação Orientada a Objetos (POO)</h2>
                                </div>

                                <p className=" text-[24px] ">A Programação Orientada a Objetos (POO) é um paradigma de programação baseado na modelagem do mundo real por meio de objetos. Diferente da programação procedural, onde o foco está em funções e procedimentos, a POO organiza o código em torno de objetos, que são instâncias de classes. <br/> <br/> A POO surgiu para resolver problemas de modularidade, reutilização de código e manutenção de sistemas grandes, promovendo maior organização e eficiência no desenvolvimento de software.
                                </p>

                                <div className=" flex flex-col gap-8">
                                    <h2 className=" text-[24px] font-semibold">Introdução à Programação Orientada a Objetos (POO)</h2>
                                    <div className=" flex flex-col gap-8 text-[25px]">
                                        <p className=" ">A POO é baseada em quatro pilares fundamentais:</p>
                                        <ul className=" list-decimal pl-10 space-y-2">
                                            <li className=" ">Abstração
                                                <ul className=" list-disc pl-10">
                                                    <li>Consiste em representar entidades do mundo real como objetos no código, mantendo apenas os detalhes essenciais e ocultando implementações internas.</li>
                                                </ul>
                                            </li>

                                            <li className=" ">Abstração
                                                <ul className=" list-disc pl-10">
                                                    <li>Consiste em representar entidades do mundo real como objetos no código, mantendo apenas os detalhes essenciais e ocultando implementações internas.</li>
                                                </ul>
                                            </li>
                                            
                                            <li className=" ">Abstração
                                                <ul className=" list-disc pl-10">
                                                    <li>Consiste em representar entidades do mundo real como objetos no código, mantendo apenas os detalhes essenciais e ocultando implementações internas.</li>
                                                </ul>
                                            </li>

                                        </ul>
                                    </div>
                                </div> */}

                            </div>
                        </div>
                    </div>
                
                    <motion.button 
                    whileHover={{scale: 1.04}}
                    whileTap={{scale: 0.96}}
                    onClick={() => setAppear(!appear)}
                    className="absolute bottom-2 right-2 shadow-md h-min rounded-full w-[65px] ">
                        <img alt="Profile Picture" src="/IApicture.svg" className="rounded-full w-full bg-white" width={800} height={800} />
                    </motion.button>

                </div>
                
                <ChatMateriais appear={appear} idMaterial={idMaterial} />
            
            </div>
        </>
    );
};
