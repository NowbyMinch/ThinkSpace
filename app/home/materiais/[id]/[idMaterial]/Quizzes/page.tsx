"use client";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Plus } from "lucide-react";

// import { PageProps } from "../type";
// { params }: PageProps 

export default function MaterialClient() {
    return( 
        <>  
            <div className="bg-white rounded-[35px] h-[100%] overflow-hidden flex flex-col items-center  shadow-md border border-[#00000031]">
                <div className="w-[1200px] max-w-[90%] h-[850px] max-h-[92%] mt-[35px] mb-[35px] relative flex justify-center items-center">
                    <div className="w-full h-[10px] rounded-full bg-[rgba(16,19,46,0.14)] absolute top-0">
                        <div className="w-[20%] h-full rounded-full bg-[rgba(30,35,81,0.75)]"></div>
                    </div>

                    <div className="w-full h-[75%] bg-[#F7F7FF] rounded-[25px] border-[2px] shadow-md border-[rgba(60,49,91,0.24)] flex justify-center items-center">
                        <div className="w-[95%] h-[90%] relative flex justify-center items-center">
                            <h2 className="absolute top-0 left-0 text-[22px] bg-[#A39CEC] py-1 px-2 rounded-[10px] text-white">Questão 1/5</h2>
                            <h2 className="absolute top-0 right-0 text-[22px] bg-[#A39CEC] py-1 px-2 rounded-[10px] text-white">Quiz</h2>

                            <div className="w-[85%] h-[80%] flex flex-col gap-[5%] justify-center items-center ">
                                <h1 className="text-[35px] text-center line-clamp-2 break-words ">Qual conceito da POO permite reutilizar atributos e métodos de outra classe?</h1>
                                <div className="w-full  flex flex-col gap-[5%]">
                                    <div className="flex max-w-[100%] overflow-hidden gap-[5%]">
                                        <motion.button 
                                        whileTap={{ scale: 0.99 }}
                                        whileHover={{ scale: 1.01, backgroundColor: "#A39CEC", color: "#FFFFFF"}}
                                        transition={{ 
                                            backgroundColor: { duration: 0.15, ease: "easeInOut" }
                                        }}  

                                        className=" bg-white border-[2px] w-[50%] max-w-[50%] h-[100px] max-h-[95%] rounded-[20px] border-[#726BB6] shadow-md flex justify-center items-center text-[30px] font-medium ">
                                            <span className="line-clamp-1 break-words">Encapsulamento</span>
                                        </motion.button>
                                        
                                        <motion.button 
                                        whileTap={{ scale: 0.99 }}
                                        whileHover={{ scale: 1.01, backgroundColor: "#A39CEC", color: "#FFFFFF"}}
                                        transition={{ 
                                            backgroundColor: { duration: 0.15, ease: "easeInOut" }
                                        }}  

                                        className=" bg-white border-[2px] w-[50%] max-w-[50%]  h-[100px] max-h-[95%] rounded-[20px] border-[#726BB6] shadow-md flex justify-center items-center text-[30px] font-medium">
                                            <span className="line-clamp-1 break-words">Herança</span>
                                        </motion.button>
                                    </div>

                                    <div className="flex max-w-[100%] overflow-hidden gap-[5%]">
                                        <motion.button 
                                        whileTap={{ scale: 0.99 }}
                                        whileHover={{ scale: 1.01, backgroundColor: "#A39CEC", color: "#FFFFFF"}}
                                        transition={{ 
                                            backgroundColor: { duration: 0.15, ease: "easeInOut" }
                                        }}  

                                        className=" bg-white border-[2px] w-[50%] max-w-[50%] h-[100px] max-h-[95%] rounded-[20px] border-[#726BB6] shadow-md flex justify-center items-center text-[30px] font-medium ">
                                            <span className="line-clamp-1 break-words">Encapsulamento</span>
                                        </motion.button>
                                        
                                        <motion.button 
                                        whileTap={{ scale: 0.99 }}
                                        whileHover={{ scale: 1.01, backgroundColor: "#A39CEC", color: "#FFFFFF"}}
                                        transition={{ 
                                            backgroundColor: { duration: 0.15, ease: "easeInOut" }
                                        }}  

                                        className=" bg-white border-[2px] w-[50%] max-w-[50%]  h-[100px] max-h-[95%] rounded-[20px] border-[#726BB6] shadow-md flex justify-center items-center text-[30px] font-medium">
                                            <span className="line-clamp-1 break-words">Herança</span>
                                        </motion.button>
                                    </div>
                                </div>

                            </div>

                            <motion.div 
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97}}
                            transition={{ duration: 0.3, ease: "easeInOut"}}
                            className="bg-white rounded-full p-5 border-[1px] border-[rgba(0,0,0,0.3)] cursor-pointer absolute bottom-0 left-0">
                                <ArrowLeft className=""/>
                            </motion.div>

                            <motion.div 
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97}}
                            transition={{ duration: 0.3, ease: "easeInOut"}}
                            className="bg-white rounded-full p-5 border-[1px] border-[rgba(0,0,0,0.3)] cursor-pointer absolute bottom-0 right-0">
                                <ArrowRight className=""/>
                            </motion.div>

                        </div>
                    </div>

                </div>
            </div>

            <div className="bg-white rounded-[35px] flex justify-center shadow-md border border-[#00000031] items-center">
                <div className="w-[90%] h-[95%] max-h-[900px] flex flex-col gap-4 items-center">
                    <h1 className="w-[430px] max-w-[90%]">Seus quizzes</h1>

                    <div className="flex flex-col gap-1 items-center w-[430px] max-w-[90%] h-[100%] relative  overflow-hidden">

                        <div className=" flex items-center gap-4 px-2 w-full ml-[15px] mr-[15px] cursor-pointer rounded-[10px] hover:bg-[rgba(0,0,0,0.06)] ">
                            <h1 className="text-[65px] font-bold text-[#A78CDC] leading-[70px]">01</h1>
                            <h2 className="w-full text-[30px] font-medium leading-[30px]">Bloco de revisão 1</h2>
                        </div>
                        <div className=" flex items-center gap-4 px-2 w-full ml-[15px] mr-[15px] cursor-pointer rounded-[10px] hover:bg-[rgba(0,0,0,0.06)] ">
                            <h1 className="text-[65px] font-bold text-[#A78CDC] leading-[70px]">02</h1>
                            <h2 className="w-full text-[30px] font-medium leading-[30px]">Bloco de revisão 2</h2>
                        </div>
                        <div className=" flex items-center gap-4 px-2 w-full ml-[15px] mr-[15px] cursor-pointer rounded-[10px] hover:bg-[rgba(0,0,0,0.06)] ">
                            <h1 className="text-[65px] font-bold text-[#A78CDC] leading-[70px]">03</h1>
                            <h2 className="w-full text-[30px] font-medium leading-[30px]">Bloco de revisão 3</h2>
                        </div>
                        <div className=" flex items-center gap-4 px-2 w-full ml-[15px] mr-[15px] cursor-pointer rounded-[10px] hover:bg-[rgba(0,0,0,0.06)] ">
                            <h1 className="text-[65px] font-bold text-[#A78CDC] leading-[70px]">04</h1>
                            <h2 className="w-full text-[30px] font-medium leading-[30px]">Bloco de revisão 4</h2>
                        </div>
                        <div className=" flex items-center gap-4 px-2 w-full ml-[15px] mr-[15px] cursor-pointer rounded-[10px] hover:bg-[rgba(0,0,0,0.06)] ">
                            <h1 className="text-[65px] font-bold text-[#A78CDC] leading-[70px]">05</h1>
                            <h2 className="w-full text-[30px] font-medium leading-[30px]">Bloco de revisão 5</h2>
                        </div>

                        <motion.button 
                        whileTap={{ scale: 0.99 }} 
                        whileHover={{ scale: 1.01, backgroundColor: "#A78CDC", color: "#fff" }} 
                        transition={{ 
                            backgroundColor: { duration: 0.15, ease: "easeInOut" }
                        }}  
                        className="flex gap-2 h-[60px] items-center justify-center border border-[#1E2351] mt-5 text-[22px] w-[380px] max-w-[95%] rounded-[20px] absolute bottom-0 shadow-md">
                            Criar novo bloco de revisão <Plus className="size-7"/>
                        </motion.button>

                    </div>
                </div>
            </div>
        </>
    );
};
