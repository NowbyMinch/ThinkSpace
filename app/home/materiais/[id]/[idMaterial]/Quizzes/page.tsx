"use client";
import { ChatMateriais } from "@/app/home/components/chat-materiais";
import Loading from "@/app/home/components/loading";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Plus } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

// import { PageProps } from "../type";
// { params }: PageProps 

type quizz = {
    alternativas: string[];
    correta: string;
    pergunta: string;
};

export default function MaterialClient() {
    const params = useParams();
    const idMaterial = params?.idMaterial as string;
    const [questaoIndex, setQuestaoIndex] = useState(0);
    const [quizzes, setQuizzes] = useState<quizz[]>([]);
    const barlength = (questaoIndex / (quizzes.length - 1) ) * 100;
    const [ loading, setLoading ] = useState(true);

    useEffect(() => {
        const quizzes = async (id:string) => {
            try{
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/materiais/quizzes/${id}`, {
                method: 'GET',
                credentials: 'include',
                });
                
                const data = await res.json();
                console.log(data)
                setQuizzes(data.quizzes);
                setLoading(false);
                
            } catch (err) {
                console.error(err);
            }; 
            
        }; quizzes(idMaterial);
        
    }, []);
    
    if (loading) return <Loading />;

    return( 
        <>  
            <div className="bg-white rounded-[35px] h-[100%] overflow-hidden flex flex-col items-center  shadow-md border border-[#00000031]">
                <div className="w-[1200px] max-w-[90%] h-[850px] max-h-[92%] mt-[35px] mb-[35px] relative flex justify-center items-center">
                    <div className="w-full h-[10px] rounded-full bg-[rgba(16,19,46,0.14)] absolute top-0">
                        <div style={{ width: `${barlength}%` }} className="transition-all ease-in-out duration-300 h-full rounded-full bg-[rgba(30,35,81,0.75)]"></div>
                    </div>

                    <div className="w-full h-[75%] bg-[#F7F7FF] rounded-[25px] border-[2px] shadow-md border-[rgba(60,49,91,0.24)] flex justify-center items-center">
                        <div className="w-[95%] h-[90%] relative flex justify-center items-center">
                            <h2 className="absolute top-0 left-0 text-[22px] bg-[#A39CEC] py-1 px-2 rounded-[10px] text-white">Questão {questaoIndex + 1}/{quizzes.length}</h2>
                            <h2 className="absolute top-0 right-0 text-[22px] bg-[#A39CEC] py-1 px-2 rounded-[10px] text-white">Quiz</h2>

                            <div className="w-[85%] h-[80%] flex flex-col gap-[5%] justify-center items-center ">
                                <h1 className="text-[30px] text-center line-clamp-2 break-words ">{quizzes[questaoIndex]?.pergunta}</h1>
                                <div className="w-full  flex flex-col gap-[5%]">
                                    <div className="flex max-w-[100%]  gap-[5%]">
                                        <motion.button 
                                        whileTap={{ scale: 0.99 }}
                                        whileHover={{ scale: 1.01, backgroundColor: "#A39CEC", color: "#FFFFFF"}}
                                        transition={{ 
                                            backgroundColor: { duration: 0.15, ease: "easeInOut" }
                                        }}  
                                        onClick={() => {if (questaoIndex !== quizzes.length - 1){ setQuestaoIndex(questaoIndex + 1); console.log(questaoIndex)} else {return} }}
                                        className=" bg-white text-left overflow-hidden border-[2px] w-[50%] max-w-[50%] h-fit min-h-[100px] max-h-[95%] rounded-[20px] border-[#726BB6] shadow-md flex items-center text-[25px] font-medium ">
                                            <span className="p-3 w-full line-clamp-3 h-full break-words">{quizzes[questaoIndex]?.alternativas[0]} </span>
                                        </motion.button>
                                        
                                        <motion.button 
                                        whileTap={{ scale: 0.99 }}
                                        whileHover={{ scale: 1.01, backgroundColor: "#A39CEC", color: "#FFFFFF"}}
                                        transition={{ 
                                            backgroundColor: { duration: 0.15, ease: "easeInOut" }
                                        }}  
                                        onClick={() => {if (questaoIndex !== quizzes.length - 1){ setQuestaoIndex(questaoIndex + 1); console.log(questaoIndex)} else {return} }}
                                        className=" bg-white border-[2px] w-[50%] max-w-[50%] h-fit min-h-[100px] max-h-[95%] text-left rounded-[20px] border-[#726BB6] shadow-md flex items-center text-[25px] font-medium">
                                            <span className="p-3 break-words">{quizzes[questaoIndex]?.alternativas[1]}</span>
                                        </motion.button>
                                    </div>

                                    <div className="flex max-w-[100%]  gap-[5%]">
                                        <motion.button 
                                        whileTap={{ scale: 0.99 }}
                                        whileHover={{ scale: 1.01, backgroundColor: "#A39CEC", color: "#FFFFFF"}}
                                        transition={{ 
                                            backgroundColor: { duration: 0.15, ease: "easeInOut" }
                                        }}  
                                        onClick={() => {if (questaoIndex !== quizzes.length - 1){ setQuestaoIndex(questaoIndex + 1); console.log(questaoIndex)} else {return} }}
                                        className=" bg-white border-[2px] w-[50%] max-w-[50%] h-fit min-h-[100px] max-h-[95%] text-left rounded-[20px] border-[#726BB6] shadow-md flex items-center text-[25px] font-medium ">
                                            <span className="p-3 break-words">{quizzes[questaoIndex]?.alternativas[2]}</span>
                                        </motion.button>
                                        
                                        <motion.button 
                                        whileTap={{ scale: 0.99 }}
                                        whileHover={{ scale: 1.01, backgroundColor: "#A39CEC", color: "#FFFFFF"}}
                                        transition={{ 
                                            backgroundColor: { duration: 0.15, ease: "easeInOut" }
                                        }}  
                                        onClick={() => {if (questaoIndex !== quizzes.length - 1){ setQuestaoIndex(questaoIndex + 1); console.log(questaoIndex)} else {return} }}
                                        className=" bg-white border-[2px] w-[50%] max-w-[50%] h-fit min-h-[100px] max-h-[95%] text-left rounded-[20px] border-[#726BB6] shadow-md flex items-center text-[25px] font-medium">
                                            <span className="p-3 break-words">{quizzes[questaoIndex]?.alternativas[3]}</span>
                                        </motion.button>
                                    </div>
                                </div>

                            </div>

                            <motion.div 
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97}}
                            transition={{ duration: 0.3, ease: "easeInOut"}}
                            onClick={() => {if (questaoIndex !== 0){ setQuestaoIndex(questaoIndex - 1); console.log(questaoIndex)} else {return} }}
                            className="bg-white rounded-full p-5 border-[1px] border-[rgba(0,0,0,0.3)] cursor-pointer absolute bottom-0 left-0">
                                <ArrowLeft className=""/>
                            </motion.div>

                            <motion.div 
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97}}
                            transition={{ duration: 0.3, ease: "easeInOut"}}
                            onClick={() => {if (questaoIndex !== quizzes.length - 1){ setQuestaoIndex(questaoIndex + 1); console.log(questaoIndex)} else {return} }}
                            className="bg-white rounded-full p-5 border-[1px] border-[rgba(0,0,0,0.3)] cursor-pointer absolute bottom-0 right-0">
                                <ArrowRight className=""/>
                            </motion.div>

                        </div>
                    </div>

                </div>
            </div>

            <ChatMateriais />
        </>
    );
};
