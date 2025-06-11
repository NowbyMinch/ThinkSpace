"use client";

import { ChatMateriais } from "@/app/home/components/chat-materiais";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";

// import { PageProps } from "../type";
// { params }: PageProps 

const questoes = [
    {questao: "Questão 1", resposta: "Resposta 1"},
    {questao: "Questão 2", resposta: "Resposta 2"},
    {questao: "Questão 3", resposta: "Resposta 3"},
    {questao: "Questão 4", resposta: "Resposta 4"},
    {questao: "Questão 5", resposta: "Resposta 5"},
    {questao: "Questão 6", resposta: "Resposta 6"},
    {questao: "Questão 7", resposta: "Resposta 7"},
]

export default function MaterialClient() {
    const [flipped, setFlipped] = useState(false);
    const [ cardstate, setCardstate ] = useState<number[]>(Array(questoes.length).fill(0));
    const acertos = cardstate.filter(v => v === 1).length;
    const erros = cardstate.filter(v => v === 2).length;
    const revisar = cardstate.filter(v => v === 3).length;
    const [questaoIndex, setQuestaoIndex] = useState(0);
    const [ falta, setFalta ] = useState(true);
    // Log cardstate changes for debugging
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        let count: number = 0;
        cardstate.forEach((state) => {
            if (state == 0){
                count = count + 1;
            }
        });
        if (count == 0){
            setFalta(false);
        }   

    }, [cardstate]);

    useEffect(() => {
        if (falta == false){
            setTimeout(() =>{
                setFalta(true);
                setQuestaoIndex(0);
                setCardstate(Array(questoes.length).fill(0))
            },3000)
        }
    }, [falta]);

    return( 
        <>  
            <div className="bg-white rounded-[35px] h-[100%] overflow-hidden flex flex-col items-center shadow-md border border-[#00000031]  ">
                <div className="mt-[25px] mb-[25px] overflow-hidden w-[1200px] max-w-[90%] h-[950px] max-h-[95%] flex flex-col justify-center gap-4 items-center ">
                    <div className="w-[420px] max-w-[90%] h-[80px] bg-[#A39CEC] border-[2px] border-[#726BB6] rounded-[25px] flex justify-center items-center">
                        <div className="w-[85%] h-[80%] text-white font-medium overflow-ellipsis flex justify-between items-center ">
                            <h1 className="text-[25px] line-clamp-1">Acertos: {acertos}</h1> 
                            <h1 className="text-[25px] line-clamp-1">Erros: {erros}</h1>  
                            <h1 className="text-[25px] line-clamp-1">Revisar: {revisar}</h1>  
                        </div>
                    </div>
                    
                    <div
                    className="w-full gap-5 h-[80%] bg-[#f0f0fb] rounded-[25px] border-[2px] shadow-md border-[rgba(60,49,91,0.24)] flex justify-center items-center perspective relative"
                    >
                        <motion.div 
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97}}
                        transition={{ duration: 0.3, ease: "easeInOut"}}
                        onClick={() => {if (questaoIndex !== 0){ setQuestaoIndex(questaoIndex - 1);} else {return} }}
                        className="bg-white rounded-full p-5 border-[1px] border-[rgba(0,0,0,0.3)] cursor-pointer">
                            <ArrowLeft className=""/>
                        </motion.div>
                        <div className="relative w-[80%] h-[85%] gap-1 cursor-pointer flex flex-col justify-center items-center ">
                            <motion.div className="w-full h-full cursor-pointer "
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.99}}
                                animate={{ rotateY: flipped ? 180 : 0 }}
                                transition={{
                                    rotateY: { duration: 0.6, ease: "easeInOut" }, 
                                    duration: 0.3, ease: "easeInOut" 
                                }}
                                style={{ transformStyle: "preserve-3d" }}
                                onClick={() => { if (falta) {setFlipped(!flipped)}} }
                            >
                                {/* Front side */}
                                <AnimatePresence>
                                    {!falta && (
                                        <motion.div 
                                        initial={{ scale: 0.5, opacity: 0, y: 10}}
                                        animate={{ scale: 1, opacity: 1, y: 0}}
                                        exit={{ opacity:0, scale: 0.9, transition: {duration: 0.15, ease: "easeInOut"} }}
                                        className="absolute w-full h-full backface-hidden z-[1000] bg-[#B9B4F0] rounded-[25px] flex items-center justify-center text-xl font-semibold ">
                                            <div className="w-[95%] h-[90%] flex justify-center items-center relative rounded-[25px] bg-white overflow-hidden">
                                                <div className="w-[110%] left-[-90px] top-[-100px] absolute rounded-[25px]">
                                                    <Image width={300} height={500} src="/concluiu-flashcards.svg" className="w-full " alt="Logo"/>
                                                </div>
                                                <div className="w-[70%] h-[80%] flex flex-col justify-end items-center ">
                                                    <h1 className="text-[35px] text-center">Parabéns! Você completou os flashcards e ganhou mais 5XP pela dedicação!</h1>
                                                    <div className="w-[170px]">
                                                        <Image width={300} height={500} src="/concluiu-medalha.svg" className="w-full " alt="Logo"/>
                                                    </div>
                                                </div>

                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                <div className="absolute w-full h-full backface-hidden bg-white rounded-[25px] flex items-center justify-center p-6 text-xl font-semibold shadow-lg">
                                    {questoes[questaoIndex]?.questao}
                                </div>

                                <div className="absolute w-full h-full backface-hidden bg-white rounded-[25px] flex items-center justify-center p-6 text-xl font-medium shadow-md"
                                    style={{ transform: "rotateY(180deg)" }}
                                    >
                                    {questoes[questaoIndex]?.resposta}
                                </div>

                            </motion.div>

                            <h1 className="">{questaoIndex + 1}/{questoes.length}</h1>

                        </div>

                        <motion.div 
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97}}
                        transition={{ duration: 0.3, ease: "easeInOut"}}
                        onClick={() => {if (questaoIndex + 1 !== questoes.length){ setQuestaoIndex(questaoIndex + 1); } else {return} }}
                        className="bg-white rounded-full p-5 border-[1px] border-[rgba(0,0,0,0.3)] cursor-pointer">
                            <ArrowRight className=""/>
                        </motion.div>


                    </div>

                    <div className="w-full h-[15%] flex overflow-visible justify-center items-center ">

                        <div className="w-[78%] h-full flex justify-center items-center ">
                            <div className="flex gap-4 max-w-[95%] h-[100px] max-h-[90%] justify-center items-center ">
                                <motion.button 
                                whileTap={{ scale: 0.98 }}
                                whileHover={{ scale: 1.02, backgroundColor: "#A39CEC", color: "#FFFFFF"}}
                                transition={{ 
                                    backgroundColor: { duration: 0.15, ease: "easeInOut" }
                                }} 
                                onClick={() => {setCardstate(prev => {
                                    const novo = [...prev];
                                    novo[questaoIndex] = 1; // 1 = acertei
                                    return novo;
                                }); if (questaoIndex !== questoes.length - 1){ setQuestaoIndex(questaoIndex + 1); } else {return}}}
                                className="w-[250px] border-[2px] max-w-[30%] h-[100px] max-h-[95%]  rounded-[20px] border-[#726BB6] shadow-md flex justify-center items-center text-[30px] font-medium">
                                    <span className="line-clamp-1 break-words">Acertei</span>
                                </motion.button>

                                <motion.button 
                                whileTap={{ scale: 0.98 }}
                                whileHover={{ scale: 1.02, backgroundColor: "#A39CEC", color: "#FFFFFF"}}
                                transition={{ 
                                    backgroundColor: { duration: 0.15, ease: "easeInOut" }
                                }} 
                                onClick={() => 
                                    {setCardstate(prev => {
                                    const novo = [...prev];
                                    novo[questaoIndex] = 2; // 1 = errei
                                    return novo;
                                }); if (questaoIndex !== questoes.length - 1){ setQuestaoIndex(questaoIndex + 1); } else {return}}}
                                className="w-[250px] border-[2px] max-w-[30%] h-[100px] max-h-[95%] rounded-[20px] border-[#726BB6] shadow-md flex justify-center items-center text-[30px] font-medium">
                                    <span className="line-clamp-1 break-words">Errei</span>
                                </motion.button>

                                <motion.button 
                                whileTap={{ scale: 0.98 }}
                                whileHover={{ scale: 1.02, backgroundColor: "#A39CEC", color: "#FFFFFF", transition: { duration: 0.2 }}}
                                transition={{ 
                                    backgroundColor: { duration: 0.15, ease: "easeInOut" }
                                }} 
                                onClick={() => {setCardstate(prev => {
                                    const novo = [...prev];
                                    novo[questaoIndex] = 3; // 1 = revisar
                                    return novo;
                                }); if (questaoIndex !== questoes.length - 1){ setQuestaoIndex(questaoIndex + 1); } else {return}}}
                                className="w-[250px] border-[2px] max-w-[30%] h-[100px] max-h-[95%] rounded-[20px] border-[#726BB6] shadow-md flex justify-center items-center text-[30px] font-medium">
                                    <span className="line-clamp-1 break-words">Revisar</span>
                                </motion.button>
                            </div>

                        </div>

                    </div>
                </div>
            </div>

            <ChatMateriais />
        </>
    );
};
