"use client";

import { X, Search, ChevronRight, BookOpenText, FileText, ScrollText, FileInput, SendHorizonal, Reply, ArrowLeft } from "lucide-react";
import { useState, useRef, useEffect } from 'react';
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ComboboxDemoMateria, ComboboxDemoSettings } from "../../components/dropdown";

export const materia = [
  {label: "Ciência da Computação", key: "cienciadacomputacao"},
  {label: "Enfermagem", key: "enfermagem"},
  {label: "Geografia", key: "geografia"},
  {label: "Matemática", key: "matematica"},
];

type materiaItem = {
    id?: string;
    nome?: string;
    cor?: string;
    icone?: string;
    usuarioId?: string;
    materiais?: any[]; // or specify the correct type if known
    // add other properties if needed
};

type UserData = {
  primeiroNome?: string;
  cargo?: string;
  foto?: string;
  // add other properties if needed
};
type DiaData = {
    diaNumero?: number;
    diaSemana?: number;
    // add other properties if needed
};
type CalendarioData = {
    mesAtual?: string;
    anoAtual?: string;
    dias?: DiaData[];
    // add other properties if needed
};
type RecenteData = {
    indice?: number;
    nome: string;
    id?: string;
    cor?: string;
    icone?: string;
    ultimaRevisao?: number;
    tempoAtivo?: number;
};

export default function MateriaisClient({ id }: { id: string; }) {
    // Estados de controle de interface
    const [open, setOpen] = useState(false);
    const [openVar, setOpenVar] = useState(false);
    const [openVar2, setOpenVar2] = useState(false);
    const [openVar3, setOpenVar3] = useState(false);
    const [ calendario, setCalendario ] = useState<CalendarioData>({})
    const [ materiaDesignada, setMateriaDesignada] = useState("");
    let topico: string;
    
    // Inputs e referências
    const [input, setInput] = useState("");
    const [assuntoInput, setAssuntoInput] = useState("");
    const [topicoInput, setTopicoInput] = useState("");
    const documentInputRef = useRef<HTMLInputElement>(null);
    const [ topicos, setTopicos ] = useState<string []>([]);
    const [ assunto, setAssunto ] = useState("");
    const [ recente, setRecente ] = useState<RecenteData[]>([])


    // Dados do usuário
    const [user, setUser] = useState<UserData>({});

    // Query de busca
    const [query, setQuery] = useState("");

    // Dados de matérias
    const [materia, setMateria] = useState<materiaItem>();

    // USEFULL STRUCTURE ---- Filtros de matérias
    // const filtered = materias.filter((item) =>
    // item.nome?.toLowerCase().includes(query.toLowerCase())
    // );
    // const isExactMatch = materias.some(
    // (item) => item.nome?.toLowerCase() === query.toLowerCase()
    // );

    // Outros
    const decodedId = decodeURIComponent(id);
    
    useEffect(() => {
        const materia = async (id: string) => {
            try{
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/materias/${id}`, {
                    method: 'GET',
                    credentials: 'include',
                });
                
                const data = await res.json();
                console.log(data)
                setMateria(data)
            } catch (err) {
            console.error(err);
            }
        }; materia(decodedId);
        
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

        const calendario = async () => {
            try{
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/home/calendario`, {
                method: 'GET',
                credentials: 'include',
                });
                
                const data = await res.json();
                setCalendario(data)
            } catch (err) {
                console.error(err);
            }
        }; calendario();

        const materiais = async () => {
            try{
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/materiais/`, {
                method: 'GET',
                credentials: 'include',
                });
                
                const data = await res.json();
                console.log(data)

            } catch (err) {
                console.error(err);
            }
            
        }; materiais();

    }, []);
    
    function closing(){
        setOpen(false);
        setOpenVar(false);
        setOpenVar2(false);
        setOpenVar3(false);
        setInput("");
        setQuery("");
        setMateriaDesignada("");
        setTopicoInput("");
        setTopicos([]);
        setAssunto("");
        setAssuntoInput("");
        // setInput3("");
        // setInput4("");
    }
    function voltar(){
        setOpenVar(false);
        setOpenVar2(false);
        setOpenVar3(false);
        setInput("");
        setQuery("");
        setMateriaDesignada("");
        setTopicoInput("");
        setTopicos([]);
        setAssunto("");
        setAssuntoInput("");
        // setInput3("");
        // setInput4("");
    }

    return( 
        <>
            <AnimatePresence initial={false} >
                {open && (
                    <motion.div 
                        key="content"
                        initial={{ opacity: 0, scale: 0.85}}
                        animate={{ opacity: 1, scale: 0.94 }}
                        exit={{ opacity: 0, scale: 0.90 }}
                        className={`w-full h-full absolute ${ open? ' opacity-1 z-[1100]' : 'z-[-100] opacity-0'}`}>
                            <div className="w-full h-full absolute" onClick={() => closing()}></div>
                            <div id="white-box" className={` w-[1250px] h-[600px] rounded-[50px] z-[1100] left-[50%] translate-x-[-50%] top-[50%] translate-y-[-50%] bg-white shadow-md flex justify-center items-center relative overflow-hidden ${open? 'opacity-1 scale-1'  : 'opacity-0 scale-95'} ${openVar || openVar2 || openVar3? 'h-[650px]' : 'h-[600px]'} `}>

                                <div className="absolute w-[95%] top-10 flex justify-between gap-2 z-[1100]">
                                    <motion.button 
                                    whileTap={{ scale:0.95 }}
                                    whileHover={{ scale:1.05 }}
                                    onClick={voltar}
                                    className={`flex cursor-pointer justify-center items-center text-white h-fit text-[20px] rounded-full  ${ openVar || openVar2 || openVar3? "block": "hidden"}`}>
                                        <ArrowLeft className="size-10 text-black"/> 
                                    </motion.button>
                                    <motion.button 
                                    whileTap={{ scale:0.95 }}
                                    whileHover={{ scale:1.05 }}
                                    onClick={closing}
                                    className={`flex cursor-pointer justify-center ml-auto items-center text-white h-fit text-[20px] rounded-full `}>
                                        <X className="size-10 text-black"/> 
                                    </motion.button>
                                </div>
                
                                <div className="w-[80%] h-[85%] flex flex-col gap-14 z-[1000]">
                                    <h1 className={`text-center text-[45px] font-medium ${ openVar || openVar2 || openVar3? "hidden": "block"}`}>Como você deseja criar a matéria?</h1>
                                    <div className="flex w-[100%] h-[100%] justify-between ">
                                        <motion.button whileTap={{ scale: 0.95 }} whileHover={{ scale: 1.02 }} onClick={() => setOpenVar(true)}  className={`w-[320px] h-[330px] flex flex-col items-center justify-center bg-[#A387DC] rounded-[25px] cursor-pointer ${ openVar || openVar2 || openVar3? "hidden": "block"}`}>
                                            <BookOpenText  className=" text-white size-[130px] stroke-1"/>
                                            <div  className="flex flex-col items-center ">
                                                <h1  className="text-[45px] font-medium text-white">Documentos</h1>
                                                <h2  className="text-[18px] font-medium">PDF, slides da aula, livros diversos</h2>
                                            </div>
                                        </motion.button>
                                        
                                        <motion.button whileTap={{ scale: 0.95 }} whileHover={{ scale: 1.02 }} onClick={() => setOpenVar2(true)}  className={`w-[320px] h-[330px] flex flex-col items-center justify-center bg-[#A39CEC] rounded-[25px] cursor-pointer ${ openVar || openVar2 || openVar3? "hidden": "block"}`}>
                                            <FileText  className=" text-white size-[130px] stroke-1"/>
                                            <div  className="flex flex-col items-center ">
                                                <h1  className="text-[45px] font-medium text-white">Tópicos</h1>
                                                <h2  className="text-[18px] font-medium">Digite um tópico que deseja revisar</h2>
                                            </div>
                                        </motion.button>
                                        
                                        <motion.button whileTap={{ scale: 0.95 }} whileHover={{ scale: 1.02 }} onClick={() => setOpenVar3(true)}  className={`w-[320px] h-[330px] flex flex-col items-center justify-center bg-[#6871BB] rounded-[25px] cursor-pointer ${ openVar || openVar2 || openVar3? "hidden": "block"}`}>
                                            <ScrollText  className=" text-white size-[130px] stroke-1"/>
                                            <div  className="flex flex-col items-center ">
                                                <h1  className="text-[45px] font-medium text-white">Assuntos</h1>
                                                <h2  className="text-[18px] font-medium">Digite assuntos gerais para revisar</h2>
                                            </div>
                                        </motion.button>

                                        <div className={`w-full h-full flex gap-12 items-center  ${ openVar? "block": "hidden"}`}>
                                            <div className="w-[50%] h-[85%] bg-[#A39CEC] rounded-[25px] flex justify-center items-center">
                                                <div className="w-[85%] h-[85%] flex flex-col gap-2">
                                                    <div className="">
                                                        <h1 className="text-white text-[40px]">Documento</h1>
                                                        <h2 className="text-white text-[20px]">1 {calendario.mesAtual} {calendario.anoAtual}</h2>
                                                    </div>
                                                    <motion.button
                                                    whileTap={{ scale: 0.99 }}
                                                    whileHover={{ scale: 1.01 }}
                                                    transition={{ duration: 0.2, ease: "easeInOut" }}
                                                    onClick={() => documentInputRef.current?.click()}
                                                    className=" w-full h-full bg-white rounded-[25px] flex flex-col justify-center items-center cursor-pointer">
                                                        <FileInput className="size-[110px] stroke-1 opacity-[75%]"/>
                                                        <input ref={documentInputRef} type="file" className="absolute right-[9999px]"/>
                                                        <h1 className="text-[30px] opacity-[75%]">Faça o upload do material</h1>
                                                    </motion.button>
                                                </div>
                                            </div>

                                            <div className="w-[45%] h-[90%] flex flex-col gap-5 ">
                                                <div className="">
                                                    <h2 className="text-[28px] font-medium">Nome do Material</h2>
                                                    <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Nome do Material" className="pl-5 text-[20px] w-full h-[45px] border-2 border-[rgba(0,0,0,0.19)] rounded-[20px] outline-[rgba(151,103,248,0.6)]"/>
                                                </div>
                                                
                                                <div className="relative">
                                                    <h2 className="text-[28px] font-medium">Matéria designada:</h2>
                                                    
                                                    <ComboboxDemoMateria value={materiaDesignada} onChange={ value => {setMateriaDesignada(value);}} />

                                                    {/* USEFULL STRUCTURE  */}

                                                    {/* <div className=" w-full relative">
                                                        <input
                                                        type="text"
                                                        value={query}
                                                        onChange={(e) => setQuery(e.target.value)}
                                                        onFocus={() => setIsFocused(true)}
                                                        onBlur={() => setTimeout(() => setIsFocused(false), 150)}
                                                        placeholder="Pesquisar por materia"
                                                        className="w-full border-2 border-[rgba(0,0,0,0.19)] h-[45px] rounded-[20px] pl-5 text-[20px] outline-[rgba(151,103,248,0.6)] "
                                                        />
                                                        {query.length > 0 && !isExactMatch && isFocused && (
                                                        <ul id="label-box" className="absolute z-10 mt-1 w-full max-h-60 overflow-y-auto bg-white border border-gray-200 rounded-[10px] shadow-md">
                                                            {filtered.length === 0 && (
                                                                <li className="px-4 py-2 text-sm text-gray-500">No results found</li>
                                                            )}

                                                            {filtered.map((materias) => (
                                                                <li
                                                                    key={materias.id}
                                                                    
                                                                    className="cursor-pointer px-4 py-2 text-sm hover:bg-[rgba(151,103,248,0.1)]"
                                                                    onClick={() => {
                                                                    setQuery(materias.nome ?? "");
                                                                    }}
                                                                >
                                                                    <div className="font-medium">{materias.nome}</div>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                        )}
                                                    </div> */}

                                                </div>
                                                
                                                <motion.button whileTap={{ scale: 0.95 }} whileHover={{ scale: 1.02 }} id="editar_conta" className="mt-auto border mb-4 border-[#1E2351] text-[22px] w-[150px] h-[40px] rounded-full flex justify-center items-center gap-2" onClick={() => closing()}>
                                                    <FileText />
                                                    Enviar
                                                </motion.button>
                                            
                                            </div>
                                        </div>




                                        <div className={`w-full h-full flex gap-12 items-center  ${ openVar2? "block": "hidden"}`}>
                                            <div className="w-[50%] h-[97.95%] flex flex-col gap-4 ">
                                                <div className="h-fit flex flex-col gap-1">
                                                    <h1 className="font-medium text-[50px] leading-[60px] ">Tópicos</h1>
                                                    <div className=" max-w-[600px] h-fit flex gap-1 justify-center items-end ">
                                                        <input type="text" value={topicoInput}
                                                        onChange={e => setTopicoInput(e.target.value)} onKeyDown={e => {
                                                            if (e.key === "Enter" && topicoInput && !topicos.includes(topicoInput)) {
                                                            setTopicos(prev => [...prev, topicoInput]);
                                                            setTopicoInput("");
                                                            }
                                                        }}
                                                        placeholder="Adicionar um tópico" className="pl-5 text-[20px] w-full h-[45px] border-2 border-[rgba(0,0,0,0.19)] rounded-[20px] outline-[rgba(151,103,248,0.6)]"/>

                                                        <motion.button 
                                                        whileHover={{ scale: 1.02 }}
                                                        whileTap={{ scale: 0.92 }}
                                                        onClick={() => { if (topicoInput && !topicos.includes(topicoInput)) {
                                                            setTopicos(prev => [...prev, topicoInput]);
                                                            setTopicoInput(""); 
                                                        }}}

                                                        className="w-[12%] h-[45px]  bg-[#A39CEC] rounded-[27%] text-white flex justify-center items-center text-[20px] font-semibold shadow-md ">
                                                            <SendHorizonal className="size-6"/>
                                                        </motion.button>
                                                    </div>
                                                </div>

                                                <div className="w-full h-[69.9%] rounded-[25px] flex justify-center border-2 border-[rgba(0,0,0,0.19)]">
                                                    <div className="w-[95%] px-2 py-2 h-min max-h-[95%] mt-2  flex flex-wrap gap-2 overflow-auto">
                                                        <AnimatePresence>
                                                            {topicos.map((topico, index) => (
                                                                <motion.div 
                                                                key={topico + index}
                                                                initial={{ scale:0 }} 
                                                                animate={{ scale: 1}} 
                                                                whileHover={{ scale: 1.02 }}
                                                                whileTap={{ scale: 0.98 }}
                                                                id="topicos"
                                                                className="flex w-fit h-fit py-1 px-2 gap-2 text-white bg-[#A387DC] rounded-[8px] max-w-full cursor-pointer">
                                                                    
                                                                    <X onClick={() => {
                                                                        setTopicos(prev => prev.filter((_, i) => i !== index ))
                                                                    }} className="text-[rgba(0,0,0,0.34)]"/>

                                                                    <span className=" w-full block text-ellipsis overflow-hidden break-words ">
                                                                        {topico}
                                                                    </span>
                                                                
                                                                </motion.div>
                                                            ))}
                                                            

                                                        </AnimatePresence>

                                                    </div>

                                                </div>
                                            </div>

                                            <div className="w-[45%] h-[90%] flex flex-col gap-5 ">
                                                <div className="h-[87px] ">
                                                    <h2 className="text-[28px] font-medium">Nome do Material</h2>
                                                    <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Nome do Material" className="pl-5 text-[20px] w-full h-[45px] border-2 border-[rgba(0,0,0,0.19)] rounded-[20px] outline-[rgba(151,103,248,0.6)]"/>
                                                </div>
                                                
                                                <div className="relative ">
                                                    <h2 className="text-[28px] font-medium">Matéria designada:</h2>

                                                    <ComboboxDemoMateria value={materiaDesignada} onChange={ value => {setMateriaDesignada(value);}} />

                                                </div>
                                                
                                                <motion.button whileTap={{ scale: 0.95 }} whileHover={{ scale: 1.02 }} id="editar_conta" className="mt-auto border mb-4 border-[#1E2351] text-[22px] w-[150px] h-[40px] rounded-full flex justify-center items-center gap-2" onClick={() => closing()}>
                                                    <FileText />
                                                    Enviar
                                                </motion.button>
                                            
                                            </div>
                                        </div>




                                        <div className={`w-full h-full flex gap-12 items-center ${ openVar3? "block": "hidden"}`}>
                                            <div className="w-[50%] h-[97.95%] flex flex-col gap-4 ">
                                                <div className="h-fit flex flex-col gap-1">
                                                    <h1 className="font-medium text-[50px] leading-[60px] ">Assunto:</h1>
                                                    <div className=" max-w-[600px] h-fit flex gap-1 justify-center items-end ">
                                                        <input type="text" value={assuntoInput} onChange={e => setAssuntoInput(e.target.value)}  placeholder="Diga o assunto" className="pl-5 text-[20px] w-full h-[45px] border-2 border-[rgba(0,0,0,0.19)] rounded-[20px] outline-[rgba(151,103,248,0.6)]"
                                                        />

                                                    </div>
                                                </div>

                                                <div className="h-fit flex flex-col gap-1">
                                                    <h2 className="text-[28px] font-medium">Tópicos:</h2>
                                                    <div className=" max-w-[600px] h-fit flex gap-1 justify-center items-end ">
                                                        <input type="text" value={topicoInput}
                                                        onChange={e => setTopicoInput(e.target.value)} onKeyDown={e => {
                                                            if (e.key === "Enter" && topicoInput && !topicos.includes(topicoInput)) {
                                                            setTopicos(prev => [...prev, topicoInput]);
                                                            setTopicoInput("");
                                                            }
                                                        }}
                                                        placeholder="Pergunte a assistente IA" className="pl-5 text-[20px] w-full h-[45px] border-2 border-[rgba(0,0,0,0.19)] rounded-[20px] outline-[rgba(151,103,248,0.6)]"
                                                        />

                                                        <motion.button 
                                                        whileHover={{ scale: 1.02 }}
                                                        whileTap={{ scale: 0.92 }}
                                                        onClick={() => { if (topicoInput && !topicos.includes(topicoInput)) {
                                                            setTopicos(prev => [...prev, topicoInput]);
                                                            setTopicoInput(""); 
                                                        }}}

                                                        className="w-[12%] h-[45px]  bg-[#A39CEC] rounded-[27%] text-white flex justify-center items-center text-[20px] font-semibold shadow-md ">
                                                            <SendHorizonal className="size-6"/>
                                                        </motion.button>
                                                    </div>
                                                </div>

                                                <div className="w-full h-[50.12%] rounded-[25px] flex justify-center border-2 border-[rgba(0,0,0,0.19)]">
                                                    <div className="w-[95%] px-2 py-2 h-min max-h-[95%] mt-2  flex flex-wrap gap-2 overflow-auto">
                                                        <AnimatePresence>
                                                            {topicos.map((topico, index) => (
                                                                <motion.div 
                                                                key={topico + index}
                                                                initial={{ scale:0 }} 
                                                                animate={{ scale: 1}} 
                                                                whileHover={{ scale: 1.02 }}
                                                                whileTap={{ scale: 0.98 }}
                                                                id="topicos"
                                                                className="flex w-fit h-fit py-1 px-2 gap-2 text-white bg-[#A387DC] rounded-[8px] max-w-full cursor-pointer">
                                                                    
                                                                    <X onClick={() => {
                                                                        setTopicos(prev => prev.filter((_, i) => i !== index ))
                                                                    }} className="text-[rgba(0,0,0,0.34)]"/>

                                                                    <span className=" w-full block text-ellipsis overflow-hidden break-words ">
                                                                        {topico}
                                                                    </span>
                                                                
                                                                </motion.div>
                                                            ))}
                                                            

                                                        </AnimatePresence>

                                                    </div>

                                                </div>

                                            </div>

                                            <div className="w-[45%] h-[90%] flex flex-col gap-5 ">
                                                <div className="h-[87px] ">
                                                    <h2 className="text-[28px] font-medium">Nome do Material</h2>
                                                    <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Nome do Material" className="pl-5 text-[20px] w-full h-[45px] border-2 border-[rgba(0,0,0,0.19)] rounded-[20px] outline-[rgba(151,103,248,0.6)]"/>
                                                </div>
                                                
                                                <div className="relative ">
                                                    <h2 className="text-[28px] font-medium">Matéria designada:</h2>

                                                    <ComboboxDemoMateria value={materiaDesignada} onChange={ value => {setMateriaDesignada(value);}} />

                                                </div>
                                                
                                                <motion.button whileTap={{ scale: 0.95 }} whileHover={{ scale: 1.02 }} id="editar_conta" className="mt-auto border mb-4 border-[#1E2351] text-[22px] w-[150px] h-[40px] rounded-full flex justify-center items-center gap-2" onClick={() => closing()}>
                                                    <FileText />
                                                    Enviar
                                                </motion.button>
                                            
                                            </div>
                                        </div>

                                    </div>
                
                                </div>
                                <Image width={300} height={500} src="/Vector.svg" id="vector" alt="Decoração" className={`absolute top-[350px] right-[-130px] -rotate-90 w-[550px] `}/>
                            </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className={`w-full h-full fixed z-[1000] bg-[rgba(0,0,0,0.40)] ${ open? 'flex' : 'hidden'} justify-center items-center`} ></div>

            <div className="grid grid-cols-[3fr_1fr] mt-[12px] h-[calc(100vh-25px)] min-h-fit w-full ml-[20px] mr-[20px] gap-[20px]">
                <div className="bg-white rounded-[35px] h-[100%] overflow-hidden flex flex-col items-center shadow-md border border-[#00000031]">
                    <div className="w-[1200px] mt-4 max-w-[95%]">
                        <div className="">
                            <h1 className="text-[45px] w-fit font-medium ">Materiais de Estudo</h1>
                            <h1 className="text-[35px] italic w-fit font-medium text-[#9767F8] ">{materia?.nome}</h1>
                        </div>

                        <div className="mt-[50px] overflow-hidden flex flex-row gap-5 justify-center">
                            <div className=" h-[82px] flex justify-center relative ">
                                <div className="w-[980px] rounded-[20px] mt-4 mr-4 h-[50px] bg-[#D9D9D9] absolute"></div>
                                <div className="relative">
                                    <input type="text" id="search_bar" placeholder="Pesquise a matéria" className="w-[1000px] text-[25px] pl-5 h-[55px] border-2 border-[rgba(0,0,0,0.19)] shadow-md rounded-[25px] outline-[rgba(151,103,248,0.6)]" />
                                    <Search className="absolute right-[20px] text-black opacity-[36%] cursor-pointer top-[12px] size-[30px] "/>
                                </div>
                            </div>
                            
                            <motion.button whileTap={{ scale: 0.99 }} whileHover={{ scale: 1.01 }} onClick={() => setOpen(true)} className="bg-[#9B79E0] border border-[#716BAF] w-[14%] h-[60px] rounded-full text-white text-[24px] z-[900]">Criar novo</motion.button>
                        </div>

                        

                        {/* <div className="flex h-[700px] overflow-y-auto overflow-x-hidden flex-col items-center">
                            <a href={`/home/materiais/${id}/Eng. Comp II/Material`} id="materiais" className=" grid grid-cols-[100px_1fr] px-2 py-1 w-full ml-[15px] mr-[15px] cursor-pointer rounded-[10px] hover:bg-[rgba(0,0,0,0.06)] ">
                                <h1 className="text-[90px] font-bold text-[#A78CDC] leading-[90px]">01</h1>

                                <div className="mt-[18px] flex justify-between items-center ">
                                    <div className="">
                                        <h2 className="text-[30px] font-medium leading-[30px]">Eng. Comp II</h2>
                                        <h2 className="text-[20px] text-[#828181]">Tempo de estudo: 3 horas</h2>
                                    </div>

                                    <ChevronRight className="size-12 "/>
                                </div>
                            </a>

                        </div> */}
                    </div>
                </div>

                <div className="bg-white rounded-[35px] flex justify-center shadow-md border border-[#00000031]">
                    
                    <div className="w-[100%] flex justify-center ">
                        <div className=" ml-[10px] mr-[10px] w-[390px] flex flex-col gap-10">

                            <div className="flex ml-[15px] mt-[30px] gap-[15px] ">
                                <div className="w-[28%] ">
                                    <img src={`${user.foto}`} className="h-auto w-full rounded-full cursor-pointer " alt="Profile picture" />
                                </div>

                                <div className="w-[68%]">
                                    <h1 className="text-[30px] font-medium ">{user.primeiroNome}</h1>
                                    <h2 className="text-[#828181] font-medium text-[25px]">{user.cargo}</h2>
                                    <div className="w-[220px] max-w-[220px] h-2 rounded-[25px] bg-[#1e235138]">
                                        <div className="w-[0%] h-2 rounded-[25px] bg-purple-600 "></div>
                                    </div>
                                    <div className="flex justify-between w-[220px] max-w-[220px]">
                                        <h2 className="font-medium text-[18px] text-[#828181]">Iniciante</h2>
                                        <h2 className="font-medium text-[18px] text-[#828181]">0px</h2>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col gap-5">
                                <div className="w-full flex flex-col gap-2 text-[22px]">
                                    <h1 className="text-[40px] font-medium border border-b-[rgba(0,0,0,0.28)] ">Filtro</h1>

                                    <div className="flex gap-2 items-center ">
                                        <input type="checkbox" className="cursor-pointer size-4 accent-[#804EE5]" />
                                        Mais recentes
                                    </div>

                                    <div className="flex gap-2 items-center ">
                                        <input type="checkbox" className="cursor-pointer size-4 accent-[#804EE5]" />
                                        Mais antigos
                                    </div>

                                    <div className="flex gap-2 items-center ">
                                        <input type="checkbox" className="cursor-pointer size-4 accent-[#804EE5]" />
                                        Maior tempo de estudo
                                    </div>

                                    <div className="flex gap-2 items-center ">
                                        <input type="checkbox" className="cursor-pointer size-4 accent-[#804EE5]" />
                                        Menor tempo de estudo
                                    </div>
                                </div>

                                <div className="w-full flex flex-col gap-2 text-[25px]">
                                    <h1 className="text-[40px] font-medium border border-b-[rgba(0,0,0,0.28)] ">POO I</h1>

                                    <h2>Criado em 01/02</h2>
                                    <h2>Tempo de estudo: 45 min</h2>
                                    <h2>Flashcards: 12</h2>
                                    <div className="flex flex-col gap-2">
                                        <h2>Status da atividade:</h2>
                                        <div className="flex gap-2 items-center text-[20px]">
                                            <h3 className="bg-[#9767F8] px-5 rounded-[25px] text-white">Completa</h3>
                                            <h3 className="bg-[#C7C7C7] px-5 rounded-[25px] text-white">Incompleta</h3>
                                        </div>
                                    </div>

                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
