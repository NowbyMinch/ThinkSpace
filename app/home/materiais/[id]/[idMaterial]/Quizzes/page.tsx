"use client";
import { ChatMateriais } from "@/app/home/components/chat-materiais";
import Loading from "@/app/home/components/loading";
import { color, motion } from "framer-motion";
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
const letraPorIndice = ["A", "B", "C", "D"];

export default function MaterialClient() {
    const params = useParams();
    const idMaterial = params?.idMaterial as string;
    const [questaoIndex, setQuestaoIndex] = useState(0);
    const [quizzes, setQuizzes] = useState<quizz[]>([]);
    const barlength = (questaoIndex / (quizzes.length - 1) ) * 100;
    const [ loading, setLoading ] = useState(true);
    const [ questoesFeitas, setQuestoesFeitas ] = useState<string[]>([]); 
    const [ acertou, setAcertou ] = useState<string[]>([]); 
    const [selected, setSelected] = useState<string | null>(null);
    const [disabled, setDisabled] = useState(false);

    
    const handleClick = (indice: number) => {
        if (disabled) return;

        const letra = letraPorIndice[indice];
        setSelected(letra);
        setDisabled(true);

        if (quizzes[questaoIndex].correta === letra) {
        setAcertou((prev) => [...prev, "1"]);
        }
        setQuestoesFeitas((prev) => [...prev, "1"]);

        setTimeout(() => {
        if (questaoIndex !== quizzes.length - 1) {
            setQuestaoIndex((prev) => prev + 1);
        }
        setSelected(null);
        setDisabled(false);
        }, 1200);
    };

    const getBackgroundColor = (indice: number) => {
        if (!selected) return "white";
        const letra = letraPorIndice[indice];
        if (letra === quizzes[questaoIndex].correta) {
        return selected === letra ? "#7BC396" : "white"; // verde para o certo se selecionado
        } else {
        return selected === letra ? "#CF848E" : "white"; // vermelho para errado se selecionado
        }
    };

    const getColor = (indice: number) => {
        console.log(selected)
        if (!selected) return "black";
        const letra = letraPorIndice[indice];
        if (letra === quizzes[questaoIndex].correta) {
            return selected === letra ? "white" : "black";
        } 
        else {
            return selected === letra ? "white" : "black";
        } 
        
    };

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
    
    if (!idMaterial) return null;
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
                                <div className="w-full flex flex-col gap-[5%]">
                                    <div className="flex max-w-[100%] gap-[5%]">
                                        {[0, 1].map((i) => (
                                        <motion.button
                                            key={i}
                                            whileTap={{ scale: 0.99 }}
                                            whileHover={{
                                            scale: disabled ? 1 : 1.01,
                                            backgroundColor: disabled
                                                ? getBackgroundColor(i)
                                                : "#A39CEC",
                                            color: disabled ? getColor(i) : "#FFFFFF",  
                                            }}
                                            transition={{
                                            backgroundColor: { duration: 0.4, ease: "easeInOut" },
                                            }}
                                            onClick={() => handleClick(i)}
                                            disabled={disabled}
                                            style={{ backgroundColor: getBackgroundColor(i), color: getColor(i) }}
                                            className=" text-left overflow-hidden border-[2px] w-[50%] max-w-[50%] min-h-[100px] max-h-[180px] rounded-[20px] border-[#726BB6] shadow-md flex items-center text-[25px] font-medium"
                                        >
                                            <span className="p-4 w-full line-clamp-3 h-full break-words">
                                            {quizzes[questaoIndex]?.alternativas[i]}
                                            </span>
                                        </motion.button>
                                        ))}
                                    </div>

                                    <div className="flex max-w-[100%] gap-[5%]">
                                        {[2, 3].map((i) => (
                                        <motion.button
                                            key={i}
                                            whileTap={{ scale: 0.99 }}
                                            whileHover={{
                                            scale: disabled ? 1 : 1.01,
                                            backgroundColor: disabled
                                                ? getBackgroundColor(i)
                                                : "#A39CEC",
                                            color: disabled ? getColor(i) : "#FFFFFF",  
                                            }}
                                            transition={{
                                            backgroundColor: { duration: 0.4, ease: "easeInOut" },
                                            }}
                                            onClick={() => handleClick(i)}
                                            disabled={disabled}
                                            style={{ backgroundColor: getBackgroundColor(i), color: getColor(i) }}
                                            className="text-left border-[2px] w-[50%] max-w-[50%] min-h-[100px] max-h-[180px] rounded-[20px] border-[#726BB6] shadow-md flex items-center text-[25px] font-medium"
                                        >
                                            <span className="p-4 w-full line-clamp-3 h-full break-words">
                                            {quizzes[questaoIndex]?.alternativas[i]}
                                            </span>
                                        </motion.button>
                                        ))}
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

            <ChatMateriais idMaterial={idMaterial}/>
        </>
    );
};
