"use client";

import { ChatMateriais } from "@/app/home/components/chat-materiais";
import {  motion } from "framer-motion";

// import { PageProps } from "../type";
// { params }: PageProps 

export default function MaterialClient() {
    return( 
        <>  
            <div className="bg-white rounded-[35px] h-[100%] overflow-hidden flex flex-col items-center shadow-md border border-[#00000031]  ">
                <div className="mt-[25px] mb-[25px] overflow-hidden w-[1200px] max-w-[90%] h-[850px] max-h-[95%] flex flex-col justify-center gap-4 items-center ">
                    <div className="w-[420px] max-w-[90%] h-[80px] bg-[#A39CEC] border-[2px] border-[#726BB6] rounded-[25px] flex justify-center items-center">
                        <div className="w-[85%] h-[80%] text-white font-medium overflow-ellipsis flex justify-between items-center ">
                            <h1 className="text-[25px] line-clamp-1">Acertos: 15</h1> 
                            <h1 className="text-[25px] line-clamp-1">Erros: 4</h1>  
                            <h1 className="text-[25px] line-clamp-1">Revisar: 1</h1>  
                        </div>
                    </div>
                    
                    <div className="w-full h-[72%] bg-[#F7F7FF] rounded-[25px] border-[2px] shadow-md border-[rgba(60,49,91,0.24)] flex justify-center items-center">
                        <div className="w-[95%] h-[95%] ">

                        </div>
                    </div>

                    <div className="w-full h-[15%] flex overflow-visible justify-center items-center ">

                        <div className="w-[78%] h-full flex justify-center items-center ">
                            <div className="flex gap-4 max-w-[95%] h-[100px] max-h-[90%] justify-center items-center ">
                                <motion.button 
                                whileTap={{ scale: 0.98 }}
                                whileHover={{ scale: 1.02, backgroundColor: "#A39CEC", color: "#FFFFFF", transition: { duration: 0.2 }}}

                                className="w-[250px] border-[2px] max-w-[30%] h-[100px] max-h-[95%]  rounded-[20px] border-[#726BB6] shadow-md flex justify-center items-center text-[30px] font-medium">
                                    <span className="line-clamp-1 break-words">Acertei</span>
                                </motion.button>

                                <motion.button 
                                whileTap={{ scale: 0.98 }}
                                whileHover={{ scale: 1.02, backgroundColor: "#A39CEC", color: "#FFFFFF", transition: { duration: 0.2 }}}

                                className="w-[250px] border-[2px] max-w-[30%] h-[100px] max-h-[95%]  rounded-[20px] border-[#726BB6] shadow-md flex justify-center items-center text-[30px] font-medium">
                                    <span className="line-clamp-1 break-words">Errei</span>
                                </motion.button>

                                <motion.button 
                                whileTap={{ scale: 0.98 }}
                                whileHover={{ scale: 1.02, backgroundColor: "#A39CEC", color: "#FFFFFF", transition: { duration: 0.2 }}}

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
