"use client";
import { ChatMateriais } from "@/app/home/components/chat-materiais";
import Loading from "@/app/home/components/loading";
import { color, motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Plus } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import ErrorModal from "@/components/ui/ErrorModal";


// import { PageProps } from "../type";
// { params }: PageProps 

type quizz = {
    alternativas: string[];
    correta: string;
    pergunta: string;
};
type Final = {
    finalizado: boolean;
    mensagem: string;
    respondidas: number;
    respostasQuiz: [];
    totalQuestoes: number;
};
type Xp = {
    mensagem: string;
    nivel: string;
    progresso: string;
    xp: number;
    xpAnterior: number;
    xpFinal: number;
};

const letraPorIndice = ["A", "B", "C", "D"];

export default function MaterialClient() {
    const params = useParams();
    const idMaterial = params?.idMaterial as string;
    const [message, setMessage] = useState<string | null>(null);
    const [questaoIndex, setQuestaoIndex] = useState(0);
    const [quizzes, setQuizzes] = useState<quizz[]>([]);
    const barlength = (questaoIndex / (quizzes.length - 1) ) * 100;
    const [ loading, setLoading ] = useState(true);
    const [selected, setSelected] = useState<string | null>(null);
    const [disabled, setDisabled] = useState(false);
    const [ xp, setXP ] = useState<Xp>();
    const [ origem, setOrigem ] = useState("");
    
    let acertou = 0;

    const [ estado, setEstado ] = useState<Final>();

    // setTopicos(prev => [...prev, topicoInput]);
    const [ finalizado, setFinalizado ] = useState(false);
    const [ finalizadoPop, setFinalizadoPop ] = useState(false);

    
    const final = async () => {
        try{
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/materiais/respostas-quiz/${idMaterial}`, {
            method: 'GET',
            credentials: 'include',
            });
            
            const data = await res.json();
            setEstado(data);

        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        const material = async (id:string) => {
            try{
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/materiais/${id}`, {
                method: 'GET',
                credentials: 'include',
                });
                
                const data = await res.json();
                setOrigem(data.material.origem);

            } catch (err) {
                console.error(err);
            }; 
            
        }; material(idMaterial);
        
    }, []);

    useEffect(() => {
        const quizzes = async (id:string) => {
            try{
                if (origem === "DOCUMENTO"){
                    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/materiais/quizzes-pdf/${id}`, {
                        method: 'GET',
                        credentials: 'include',
                    });

                    const data = await res.json();
                    console.log(data);
                    setQuizzes(data.quizzes);

                } else{
                    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/materiais/quizzes/${id}`, {
                        method: 'GET',
                        credentials: 'include',
                    });

                    const data = await res.json();
                    console.log(data)
                    setQuizzes(data.quizzes);
                }
                    

            } catch (err) {
                console.error(err);
            }; 
            
        }; quizzes(idMaterial);
        
    }, []);

    useEffect(() => {
        if (quizzes.length > 0){
            setLoading(false);
        }
    }, [quizzes]);
 
    useEffect(() => {
        final();
    }, []);

    const xpQuiz = async (totalQuestoes: number, certas: number) => {
        try{
            console.log(totalQuestoes, certas);
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/materiais/calcular-xp-quiz/${idMaterial}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify( {totalQuestoes: totalQuestoes, certas: certas} ),
                credentials: "include",
            });
                
            const data = await res.json();
            setXP(data);
            console.log("XPPPPPPP", data);

        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        if (estado?.finalizado === true){
            setFinalizado(true);
            setDisabled(true);
                  
            // console.log("Total, acertou: ", estado?.totalQuestoes, acertou);
            // xpQuiz(estado?.totalQuestoes, acertou);
        }

        else{
            if (estado?.respondidas! > 0){
                
                setQuestaoIndex(estado?.respondidas!);
            }
        }

    }, [estado]);

    useEffect(() => {
        if (finalizado) {
            setDisabled(true);
        }
    }, [finalizado]);

    const questao = async (indice: number) => {
        const letra = letraPorIndice[indice];
        try{
            const resposta = {questaoIndex: questaoIndex, resposta: letra};
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/materiais/responder-questao/${idMaterial}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify( resposta ),
                credentials: "include",
            });
                
            const data = await res.json();
            console.log("QUESTAO", data);
            final()

        } catch (err) {
        console.error(err);

        }
    };

    const handleClick = (indice: number) => {
        if (disabled) return;

        if ((estado?.respondidas! + 1) === (estado?.totalQuestoes!)) {
            for (let i = 0; i < estado?.totalQuestoes!; i ++){
                if (estado?.respostasQuiz[i] === quizzes[i]?.correta){
                    acertou ++;
                };
            };
            xpQuiz(estado?.totalQuestoes!,acertou);
            setFinalizadoPop(true);
            setTimeout(() =>{
                setFinalizadoPop(false);
            }, 3000);

        };

        final();
        const letra = letraPorIndice[indice];
        setSelected(letra);
        setDisabled(true);

        setTimeout(() => {
            setSelected(null);
            if (!finalizado) setDisabled(false);
            questao(indice);
        }, 1200);
    };

    const getBackgroundColor = (indice: number) => {
        const letra = letraPorIndice[indice];
        if (!finalizado){
            if (!selected) return "white";
            if (letra === quizzes[questaoIndex]?.correta) {
            return selected === letra ? "#7BC396" : "#FFF"; // verde para o certo se selecionado
            } else {
            return selected === letra ? "#CF848E" : "white"; // vermelho para errado se selecionado
            }
        }
        else{
            const marcada = estado?.respostasQuiz[questaoIndex];
            const correta = quizzes[questaoIndex]?.correta;

            if (marcada === correta){
                return letra === correta ? "#7BC396" : "white";
            }
            else{
                if (letra === marcada) return "#CF848E";
                if (letra === correta) return "#7BC396";
                return "white";
            }
        }
    };

    const getColor = (indice: number) => {
        const letra = letraPorIndice[indice];
        if (!finalizado){
            if (!selected) return "black";
            const letra = letraPorIndice[indice];
            if (letra === quizzes[questaoIndex]?.correta) {
                return selected === letra ? "white" : "black";
            } 
            else {
                return selected === letra ? "white" : "black";
            } 
        }
        else{
            const marcada = estado?.respostasQuiz[questaoIndex];
            const correta = quizzes[questaoIndex]?.correta;

            if (marcada === correta) {
                // Acertou → correta branca
                return letra === correta ? "white" : "black";
            } else {
                // Errou → marcada e correta brancas
                if (letra === marcada || letra === correta) return "white";
                return "black";
            }
        }

        
    };

    if (!idMaterial) return null;
    if (loading) return <Loading />;

    return( 
        <>  
            {message && (
                <ErrorModal message={message} onClose={() => setMessage(null)} />
            )}
            <div className=" w-full rounded-[35px] overflow-x-hidden overflow-y-auto bg-white h-full flex flex-col items-center shadow-md border border-[#00000031]">
                <div className="w-[1200px] max-w-[90%] h-[850px] max-h-[95%] my-auto relative flex flex-col justify-center items-center gap-1">
                    <div className="w-full h-[10px] rounded-full bg-[rgba(16,19,46,0.14)] absolute top-0 ">
                        <div style={{ width: `${barlength}%` }} className="transition-all ease-in-out duration-300 h-full rounded-full bg-[rgba(30,35,81,0.75)]"></div>
                    </div>

                    {(() =>{
                        if (questaoIndex == 10){
                            return <h2 className="mr-auto text-[15px] bg-[#A39CEC] py-1 px-2 rounded-[10px] text-white">Questão {questaoIndex }/{quizzes.length}</h2>
                        }
                        else{
                            return <h2 className="mr-auto text-[15px] bg-[#A39CEC] py-1 px-2 rounded-[10px] text-white">Questão {questaoIndex + 1}/{quizzes.length}</h2>
                        }
                    })()}

                    <div className="w-full h-[85%] bg-[#F7F7FF] rounded-[25px] border-[2px] shadow-md border-[rgba(60,49,91,0.24)] flex justify-center items-center relative overflow-y-auto overflow-x-hidden ">

                        <div className="w-[85%] max-w-[90%] h-[90%] flex justify-center items-center relative "> 
                            
                            <div className="w-full h-full flex flex-col items-center relative gap-2">
                                <h1 className="quizz_title text-[20px] min-h-fit text-center line-clamp-7 break-words ">{quizzes[questaoIndex]?.pergunta}</h1>

                                <div className="w-full flex flex-col justify-center items-center gap-1 my-auto ">
                                    <div className="flex max-w-full justify-between w-[700px] min-h-[100px] max-h-[280px] options">
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
                                            backgroundColor: { duration: 0.2, ease: "easeInOut" },
                                            }}
                                            onClick={() => handleClick(i)}
                                            disabled={disabled}
                                            style={{ backgroundColor: getBackgroundColor(i), color: getColor(i)} }
                                            className=" text-left border-[2px] w-[49%] max-w-[49%] h-full rounded-[20px] border-[#726BB6] shadow-md flex items-center font-medium singleOption"
                                        >
                                            <span className="p-4 w-full line-clamp-5 h-fit break-words quizzOption_text">
                                            {quizzes[questaoIndex]?.alternativas[i]}
                                            </span>
                                        </motion.button>
                                        ))}
                                    </div>

                                    <div className="flex max-w-full justify-between w-[700px] min-h-[100px] max-h-[280px] options">
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
                                            backgroundColor: { duration: 0.2, ease: "easeInOut" },
                                            }}
                                            onClick={() => handleClick(i)}
                                            disabled={disabled}
                                            style={{ backgroundColor: getBackgroundColor(i), color: getColor(i) }}
                                            className="text-left border-[2px] w-[49%] max-w-[49%] h-full rounded-[20px] border-[#726BB6] shadow-md flex items-center font-medium singleOption">
                                            <span className="p-4 w-full line-clamp-5 h-fit break-words quizzOption_text">
                                                {quizzes[questaoIndex]?.alternativas[i]}
                                            </span>
                                        </motion.button>
                                        ))}
                                    </div>
                                </div>
                                
                                <AnimatePresence>
                                    {finalizadoPop && (
                                        <>
                                            <motion.div 
                                            initial={{ scale: 0.5, opacity: 0, y: 10}}
                                            animate={{ scale: 1, opacity: 1, y: 0}}
                                            exit={{ opacity:0, scale: 0.9, transition: {duration: 0.15, ease: "easeInOut"} }}
                                            className="absolute w-full h-full z-[1000] bg-[#B9B4F0] rounded-[25px] flex items-center justify-center text-xl font-semibold ">
                                                <div className="w-[95%] h-[90%] flex justify-center items-center relative rounded-[25px] bg-white overflow-hidden">
                                                    <div className="w-[110%] left-[-90px] top-[-100px] absolute rounded-[25px]">
                                                        <img width={300} height={500} src="/concluiu-flashcards.svg" className="w-full " alt="Logo"/>
                                                    </div>
                                                    <div className="w-[70%] h-[80%] flex flex-col justify-center items-center ">
                                                        <h1 className="text-[35px] text-center">Parabéns! Você completou o quizz e ganhou mais {xp?.xp}XP. Revise suas respostas e continue subindo no ranking.</h1>
                                                    </div>

                                                </div>
                                            </motion.div>
                                        
                                        </>
                                        
                                    )}
                                </AnimatePresence>
                            </div>
                            
                        </div>

                        
                    </div>

                    {finalizado && (
                        <>
                            <motion.div 
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97}}
                            transition={{ duration: 0.3, ease: "easeInOut"}}
                            onClick={() => {if (questaoIndex !== 0){ setQuestaoIndex(questaoIndex - 1); console.log(questaoIndex)} else {return} }}
                            className="bg-white rounded-full p-2 border-[1px] border-[rgba(0,0,0,0.3)] cursor-pointer absolute bottom-14 left-2">
                                <ArrowLeft className="size-8 "/>
                            </motion.div>

                            <motion.div 
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97}}
                            transition={{ duration: 0.3, ease: "easeInOut"}}
                            onClick={() => {if (questaoIndex !== quizzes.length - 1){ setQuestaoIndex(questaoIndex + 1); console.log(questaoIndex)} else {return} }}
                            className="bg-white rounded-full p-2 border-[1px] border-[rgba(0,0,0,0.3)] cursor-pointer absolute bottom-14 right-2">
                                <ArrowRight className="size-8 "/>
                            </motion.div>
                        </>

                    )}

                </div>
            </div>

            <ChatMateriais idMaterial={idMaterial}/>
        </>
    );
};
