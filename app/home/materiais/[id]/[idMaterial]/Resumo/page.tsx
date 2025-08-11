"use client";
import {ChatMateriais} from "@/app/home/components/chat-materiais";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { marked } from 'marked';
import Loading from "@/app/home/components/loading";

// import { PageProps } from "../type";
// { params }: PageProps 


export default function MaterialClient() {
    const [ resumo, setResumo ] = useState("");
    const [ loading, setLoading ] = useState(true);
    const params = useParams();
    const idMaterial = params?.idMaterial as string;
    const html = resumo ? marked.parse(resumo) : '';


    useEffect(() => {
        const Resumo = async (id: string) => {
            try{
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/materiais/resumo-topicos/${id}`, {
                method: 'GET',
                credentials: 'include',
                });
                
                const data = await res.json();
                setResumo(data.resumoIA);
                console.log(data);
                setLoading(false);
               
            } catch (err) {
                console.error(err);
            }
            
        }; Resumo(idMaterial);
    
    }, []);

    if (!idMaterial) return null;
    if (loading) return <Loading />;

    return( 
        <>  
            <div className=" bg-white rounded-[35px] h-[100%] overflow-hidden flex flex-col items-center shadow-md border border-[#00000031] justify-center ">
                <div className=" w-[1150px] max-w-[95%] h-[95%] flex flex-col overflow-y-auto items-center ">
                    <div className=" w-[98%]">
                        <h1 className=" text-[25px] font-medium h-[4%]">Resumo <span className=" text-[#726BB6]">IA</span></h1>
                        <div className=" h-[96%] flex flex-col gap-8 ">
                            
                            <p className="text-[18px]" dangerouslySetInnerHTML={{ __html: html }} />

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
            </div>

            <ChatMateriais idMaterial={idMaterial} />
        </>
    );
};
