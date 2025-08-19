"use client";

import { X, Search, ChevronRight, BookOpenText, FileText, ScrollText, FileInput, SendHorizonal, Reply, ArrowLeft, Trash, ArrowRight } from "lucide-react";
import { useState, useRef, useEffect } from 'react';
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ComboboxDemoMateria, ComboboxDemoSettings } from "../../components/dropdown";
import ErrorModal from "@/components/ui/ErrorModal";
import Loading from "@/app/home/components/loading";
import { Backdrop3 } from "../../components/backdrop";
import { useRouter } from "next/navigation";
import { File } from "buffer";

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
type Material = {
    nomeDesignado: string,
    nomeMateria: string,
    topicos: string[],
    assuntoId: string,
    descricao: string,
    quantidadeQuestoes: number,
    quantidadeFlashcards: number
    // add other properties if needed
};
    
export default function MateriaisClient({ id }: { id: string; }) {
    const router = useRouter();
    // Estados de controle de interface
    const [open, setOpen] = useState(false);
    const [openVar, setOpenVar] = useState(false);
    const [openVar2, setOpenVar2] = useState(false);
    const [openVar3, setOpenVar3] = useState(false);
    const [ calendario, setCalendario ] = useState<CalendarioData>({})
    const [ materiaDesignada, setMateriaDesignada] = useState("");
    const [ deletar, setDeletar] = useState(false);
    
    // Inputs e referências
    const [input, setInput] = useState("");
    const [assuntoInput, setAssuntoInput] = useState("");
    const [topicoInput, setTopicoInput] = useState("");
    const documentInputRef = useRef<HTMLInputElement>(null);
    const [ topicos, setTopicos ] = useState<string []>([]);
    const [ loading, setLoading ] = useState(true);
    const [message, setMessage] = useState<string | null>(null);
    const [ materiaisNome, setMateriaisNome ] = useState<Array<{ id: string; titulo?: string; origem: string }>>([]);
    const [ deletarId, setDeletarId ] = useState("");
    const [ tipo, setTipo ] = useState("");
    const [ origem, setOrigem ] = useState("");
    const [ quantidadeQuestoes, setQuantidadeQuestoes] = useState(0);
    const [ quantidadeFlashcards, setQuantidadeFlashcards] = useState(0);
    const [value, setValue] = useState(10);
    const [value2, setValue2] = useState(10);

    // Dados do usuário
    const [user, setUser] = useState<UserData>({});

    // Query de busca
    const [query, setQuery] = useState("");

    // Dados de matérias
    const [materia, setMateria] = useState<materiaItem>();
    
    const handleDecrease = (number: number) => {
        if (number === 1){
            setValue((prev) => Math.max(1, prev - 1));
        } else{
            setValue2((prev) => Math.max(1, prev - 1));
        }
    };
    
    const handleIncrease = (number: number) => {
        if (number === 1){
            setValue((prev) => Math.max(1, prev + 1));
        } else{
            setValue2((prev) => Math.max(1, prev + 1));
        }
    };
    
    const handleChange = (e: any,number:number) => {
        if (number === 1){
            let num = parseInt(e.target.value, 10);
            if (isNaN(num)) num = 1;
            if (num < 1) num = 1;
            if (num > 25) num = 25;
            setValue(num);

        } else{
            let num = parseInt(e.target.value, 10);
            if (isNaN(num)) num = 1;
            if (num < 1) num = 1;
            if (num > 25) num = 25;
            setValue2(num);
        }
        console.log("Value1",value);
        console.log("Value2",value2);
    };

    // Criar Material
    
    const Tipo = async () => {

        try{
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/materiais/escolha-tipo-material`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ tipoMaterial: "COMPLETO" }),
                credentials: "include",
            });
            
            const data = await res.json();
            setTipo(data.tipoMaterial);
            
        } catch (err) {
        console.error(err);
        }
    };

    // Função para criar nova material
    const Origem = async (origemValor: string) => {
        try{
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/materiais/escolha-origem-material`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ origem: origemValor }),
                credentials: "include",
            });
            const data = await res.json();
            console.log("Data: ",data);
            console.log("origemValor: ",origemValor);
            setOrigem(origemValor);
            Tipo();

        } catch (err) {
        console.error(err);
        }
        // Tipo();
    };
    
    useEffect(() => {
        console.log("Origem: ", origem);
        
    }, [origem]);
    
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
                setMateria(data)
                setLoading(false);

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
                
                const materiaisFiltrados = data.materiais.filter(
                    (material: any) => material.materiaId === id
                );

                setMateriaisNome(materiaisFiltrados);
    
    
            } catch (err) {
                console.error(err);
            }
            
        }; materiais();
        
    }, []);
    
    const materiais = async () => {
        try{
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/materiais/`, {
            method: 'GET',
            credentials: 'include',
            });
            
            const data = await res.json();
            console.log(data)
            
            const materiaisFiltrados = data.materiais.filter(
                (material: any) => material.materiaId === id
            );

            setMateriaisNome(materiaisFiltrados);


        } catch (err) {
            console.error(err);
        }
        
    }; 

    const [file, setFile] = useState<globalThis.File | null>(null);

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];
        if (!selectedFile) return;
        setFile(selectedFile);
    };

    const criar = async () => {

        try {
            let res: Response;
            if (origem === "DOCUMENTO") {
                const formData = new FormData();
                formData.append("nomeDesignado", input);
                formData.append("nomeMateria", materiaDesignada);
                formData.append("topicos", JSON.stringify(topicos));
                formData.append("tipoMaterial", tipo);
                formData.append("descricao", "");
                formData.append("assunto", assuntoInput);
                formData.append("quantidadeQuestoes", value.toString());
                formData.append("quantidadeFlashcards", value2.toString());
                if (file) {
                    formData.append("file", file, file.name);
                }

                // 🔥 Debug: mostra tudo do FormData
                for (const [key, val] of formData.entries()) {
                    console.log(key, val);
                }

                // OU converte em objeto (sem arquivos)
                const formObj = Object.fromEntries(formData.entries());
                console.log("FormData como objeto:", formObj);

                res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/materiais/etapa-dados`, {
                    method: "POST",
                    body: formData, // ✅ Só FormData aqui
                    credentials: "include",
                });
            } else {
                const payload = {
                    nomeDesignado: input,
                    nomeMateria: materiaDesignada,
                    topicos: topicos,
                    tipoMaterial: tipo,
                    descricao: "",
                    assunto: assuntoInput,
                    quantidadeQuestoes: value,
                    quantidadeFlashcards: value2,
                };
                res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/materiais/etapa-dados`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload), // ✅ Só string aqui
                    credentials: "include",
                });
                console.log(payload);
            }

            const data = await res.json();
            console.log("DATA 1:", data);

            // Checar erros
            if (
                data.message === "Campos obrigatórios ausentes para criação por tópicos." ||
                data.message === "Campos obrigatórios ausentes para criação por assunto." ||
                data.message === "Campos obrigatórios ausentes para criação por documento." ||
                data.message === "Internal server error" ||
                data.message === "Nome designado, nome da matéria e tópicos são obrigatórios." ||
                data.message === "Nome designado e nome da matéria são obrigatórios." 
                ) {
            setMessage(data.message);
            return;
            }

            closing();
            console.log("Loading true")
            setLoading(true);

            // Processar materiais
            if (tipo === "COMPLETO") {
            let resumoEndpoint = "";
            let flashcardsEndpoint = "";
            let quizzesEndpoint = "";
            if (origem === "DOCUMENTO") {resumoEndpoint = "resumo-documento"; flashcardsEndpoint = "flashcards-pdf"; quizzesEndpoint = "quizzes-pdf"}
            if (origem === "TOPICOS") {resumoEndpoint = "resumo-topicos"; flashcardsEndpoint = "flashcards"; quizzesEndpoint = "quizzes"}
            if (origem === "ASSUNTO") {resumoEndpoint = "resumo-assunto"; flashcardsEndpoint = "flashcards"; quizzesEndpoint = "quizzes"}

            if (resumoEndpoint && flashcardsEndpoint && quizzesEndpoint) {
                console.log(data.material.id);
                
                const res2 = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/materiais/${resumoEndpoint}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: data.material.id }),
                credentials: "include",
                });
                const data2 = await res2.json();
                console.log("RESUMO:", data2);

                // Flashcards
                const res3 = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/materiais/${flashcardsEndpoint}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: data.material.id }),
                credentials: "include",
                });
                console.log("FLASHCARDS:", await res3.json());

                // Quizzes
                const res4 = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/materiais/${quizzesEndpoint}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: data.material.id }),
                credentials: "include",
                });
                console.log("QUIZZES:", await res4.json());
            }
            }

            setLoading(false);

            // 5️⃣ Redirecionar
            const redirectPath =
            origem === "DOCUMENTO"
                ? `/home/materiais/${id}/${data.material.id}/Material`
                : `/home/materiais/${id}/${data.material.id}/Resumo`;
            router.push(redirectPath);

        } catch (err) {
            console.error(err);
        }
    };

    
    const Deletar = async (id: string) => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/materiais/${id}`, {
                method: "DELETE",
                credentials: "include",
            });

            const data = await res.json();
            console.log(data);
            materiais();
        
        } catch (error) {
            console.error("Erro ao deletar o material.");
        }
    };
    
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
        setAssuntoInput("");
        // setInput3("");
        // setInput4("");
    }

    if (loading) return <Loading />;

    return( 
        <>
        {message && (
            <ErrorModal message={message} onClose={() => setMessage(null)} />
        )}
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
                                    <motion.button whileTap={{ scale: 0.95 }} whileHover={{ scale: 1.02 }} onClick={() => {setOpenVar(true); Origem("DOCUMENTO");}}  className={`w-[320px] h-[330px] flex flex-col items-center justify-center bg-[#A387DC] rounded-[25px] cursor-pointer ${ openVar || openVar2 || openVar3? "hidden": "block"}`}>
                                        <BookOpenText  className=" text-white size-[130px] stroke-1"/>
                                        <div  className="flex flex-col items-center ">
                                            <h1  className="text-[45px] font-medium text-white">Documentos</h1>
                                            <h2  className="text-[18px] font-medium">PDF, slides da aula, livros diversos</h2>
                                        </div>
                                    </motion.button>
                                    
                                    <motion.button whileTap={{ scale: 0.95 }} whileHover={{ scale: 1.02 }} onClick={() => {setOpenVar2(true); Origem("TOPICOS");}}  className={`w-[320px] h-[330px] flex flex-col items-center justify-center bg-[#A39CEC] rounded-[25px] cursor-pointer ${ openVar || openVar2 || openVar3? "hidden": "block"}`}>
                                        <FileText  className=" text-white size-[130px] stroke-1"/>
                                        <div  className="flex flex-col items-center ">
                                            <h1  className="text-[45px] font-medium text-white">Tópicos</h1>
                                            <h2  className="text-[18px] font-medium">Digite um tópico que deseja revisar</h2>
                                        </div>
                                    </motion.button>
                                    
                                    <motion.button whileTap={{ scale: 0.95 }} whileHover={{ scale: 1.02 }} onClick={() => {setOpenVar3(true); Origem("ASSUNTO");}}  className={`w-[320px] h-[330px] flex flex-col items-center justify-center bg-[#6871BB] rounded-[25px] cursor-pointer ${ openVar || openVar2 || openVar3? "hidden": "block"}`}>
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
                                                    <input ref={documentInputRef} type="file" onChange={handleFileChange} className="absolute right-[9999px]"/>
                                                    <h1 className="text-[30px] opacity-[75%]">Faça o upload do material</h1>
                                                </motion.button>
                                            </div>
                                        </div>

                                        <form onSubmit={(e) => {e.preventDefault(); } } encType="multipart/form-data" className="w-[45%] h-[90%] flex flex-col gap-5 ">
                                            <div className="">
                                                <h2 className="text-[28px] font-medium"> Nome do material</h2>
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
                                            
                                            <div className="w-full flex justify-between">
                                                <div className="">
                                                    <h2 className="text-[20px] font-medium"> Quantidade de questões</h2>
                                                    
                                                    <div className="flex w-full justify-between ">
                                                        <button
                                                        onClick={() => handleDecrease(1)}
                                                        className="p-2 bg-[#A387DC] rounded-full">
                                                            <ArrowLeft className="size-6 text-white rounded-full"/>
                                                        </button>
                                                        
                                                        <div className="w-full mx-2 rounded-[12px] border border-solid border-black ">
                                                            <input 
                                                            value={value}
                                                            onChange={(e) => handleChange(e,1)}
                                                            type="number" max={25} min={1} className="appearance-none text-[20px] w-full h-full text-center flex justify-center items-center rounded-[12px] bg-transparent"/>
                                                        </div>

                                                        <button 
                                                        onClick={() => handleIncrease(1)}
                                                        className="p-2 bg-[#A387DC] rounded-full">
                                                            <ArrowRight className="size-6 text-white"/>
                                                        </button>
                                                    
                                                    </div>
                                                </div> 
                                                
                                                <div className="">
                                                    <h2 className="text-[20px] font-medium"> Quantidade de flashcards</h2>
                                                    <div className="flex w-full justify-between ">
                                                        <button
                                                        onClick={() => handleDecrease(2)}
                                                        className="p-2 bg-[#A387DC] rounded-full">
                                                            <ArrowLeft className="size-6 text-white rounded-full"/>
                                                        </button>
                                                        
                                                        <div className="w-full mx-2 rounded-[12px] border border-solid border-black ">
                                                            <input 
                                                            value={value2}
                                                            onChange={(e) => handleChange(e,2)}
                                                            type="number" max={25} min={1} className="appearance-none text-[20px] w-full h-full text-center flex justify-center items-center rounded-[12px] bg-transparent"/>
                                                        </div>

                                                        <button 
                                                        onClick={() => handleIncrease(2)}
                                                        className="p-2 bg-[#A387DC] rounded-full">
                                                            <ArrowRight className="size-6 text-white"/>
                                                        </button>
                                                    </div>
                                                </div>
                                                
                                            </div>

                                            <motion.button whileTap={{ scale: 0.95 }} whileHover={{ scale: 1.02 }} id="editar_conta" type="submit" className="mt-auto border mb-4 border-[#1E2351] text-[22px] w-[150px] h-[40px] rounded-full flex justify-center items-center gap-2" onClick={() => {
                                                criar();
                                            }}>
                                                <FileText />
                                                Enviar
                                            </motion.button>
                                        
                                        </form>
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
                                                <input type="text" value={input} onChange={(e) => {setInput(e.target.value);}} placeholder="Nome do Material" className="pl-5 text-[20px] w-full h-[45px] border-2 border-[rgba(0,0,0,0.19)] rounded-[20px] outline-[rgba(151,103,248,0.6)]"/>
                                            </div>
                                            <div className="relative ">
                                                <h2 className="text-[28px] font-medium">Matéria designada:</h2>

                                                <ComboboxDemoMateria value={materiaDesignada} onChange={ value => {setMateriaDesignada(value);}} />
                                            </div>
                                            <motion.button
                                                whileTap={{ scale: 0.95 }}
                                                whileHover={{ scale: 1.02 }}
                                                id="editar_conta"
                                                className="mt-auto border mb-4 border-[#1E2351] text-[22px] w-[150px] h-[40px] rounded-full flex justify-center items-center gap-2"
                                                onClick={() => {
                                                    criar();
                                                }}>
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
                                            
                                            <motion.button whileTap={{ scale: 0.95 }} whileHover={{ scale: 1.02 }} id="editar_conta" className="mt-auto border mb-4 border-[#1E2351] text-[22px] w-[150px] h-[40px] rounded-full flex justify-center items-center gap-2" onClick={() => {
                                                criar();
                                            }}>
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
            {deletar && (
                <>
                    <motion.div 
                    key="content"
                    initial={{ opacity: 0, scale: 0.85}}
                    animate={{ opacity: 1, scale: 0.94 }}
                    exit={{ opacity: 0, scale: 0.90 }}
                    className={`w-full h-full fixed flex justify-center items-center opacity-1 z-[1100] `}>
                        
                        <div className="w-full h-full absolute" onClick={() => setDeletar(false)}></div>
                        <motion.div 
                        key="content"
                        initial={{ opacity: 0, scale: 0.85}}
                        animate={{ opacity: 1, scale: 0.94 }}
                        exit={{ opacity: 0, scale: 0.90 }}
                        className={`w-[700px] h-[380px] flex rounded-[40px] z-[1100]  opacity-1 `}>

                            <div id="white-box" className={` w-full h-full rounded-[40px] bg-white shadow-md flex justify-center items-center relative overflow-hidden z-[1100] left-[50%] translate-x-[-50%] top-[50%] translate-y-[-50%]`}>
                                
                                <Image width={300} height={500} src="/Vector.svg" alt="Decoração" className="absolute top-0 left-[-180px] rotate-90 w-[550px]"/>
                                <Image width={300} height={500} src="/Vector.svg" alt="Decoração" className="absolute bottom-[-40px] right-[-170px] -rotate-90 w-[550px]"/>

                                <div className="w-[80%] h-[85%] flex flex-col items-center gap-2 z-[900] ">
                                    <div className="flex flex-col justify-center items-center">
                                        <img src={`${user.foto}`} alt="Foto de perfil" className="rounded-full w-20 h-20"/>
                                        <span className="font-medium text-[30px]">{user.primeiroNome} </span>
                                        <span className="text-[20px]"></span>
                                    </div>

                                    <h1 className="text-center text-[35px] font-medium">Deseja mesmo deletar esse material?</h1>
                                    <div className="w-[60%] flex justify-between mt-auto">
                                        <motion.button 
                                        whileHover={{ scale: 1.03 }}
                                        whileTap={{ scale: 0.97 }}
                                        onClick={() => setDeletar(false)}
                                        className="w-[140px] rounded-[20px] text-[26px] bg-[#F1F1F1] border border-[rgba(68,68,68, 0.17)]">
                                            Voltar
                                        </motion.button>
                                        <motion.button 
                                        whileHover={{ scale: 1.03 }}
                                        whileTap={{ scale: 0.97 }}
                                        onClick={() => {setDeletar(false); Deletar(deletarId)}}
                                        className="w-[140px] rounded-[20px] text-[26px] text-white bg-[#9767F8] border border-[rgba(68,68,68, 0.17)]">
                                            Deletar
                                        </motion.button>
                                    </div>

                                </div>
                            </div>
                        </motion.div>
                        
                        
                    </motion.div>
                        
                        
                    <div className="w-full absolute flex justify-center items-center ">
                        <Backdrop3 onClick={() => setDeletar(false)}/>
                    </div>
                </>
            )} 
        </AnimatePresence>

        <div className={`w-full h-full fixed z-[1000] bg-[rgba(0,0,0,0.40)] ${ open? 'flex' : 'hidden'} justify-center items-center`} ></div>

        <div className=" grid grid-cols-[3fr_1fr] mt-[12px] h-[calc(100vh-25px)] min-h-fit w-full ml-[20px] mr-[20px] gap-[20px]">
            <div className="bg-white rounded-[35px] h-[100%] overflow-hidden flex flex-col items-center shadow-md border border-[#00000031]">
                <div className="w-[70%] h-full overflow-hidden max-w-[1000px] max-w- mt-4 ">
                    <div className="">
                        <h1 className="text-[30px] w-fit font-medium ">Materiais de Estudo</h1>
                        <h1 className="text-[18px] italic w-fit font-medium text-[#9767F8] ">{materia?.nome}</h1>
                    </div>

                    <div className="mt-[50px] overflow-hidden flex flex-row gap-4 justify-center px-1 py-1 ">
                        <div className=" h-[82px] w-full flex relative ">
                            <div className="w-[98%] rounded-[20px] mt-4 mr-auto h-[50px] bg-[#D9D9D9] absolute"></div>
                            <div className="relative w-full ">
                                <input type="text" id="search_bar" placeholder="Pesquise a matéria" className="w-full text-[18px] pl-5 h-[55px] border-2 border-[rgba(0,0,0,0.19)] shadow-md rounded-[25px] outline-[rgba(151,103,248,0.6)]" />
                                <Search className="absolute right-[20px] text-black opacity-[36%]cursor-pointer top-[12px] size-[30px] "/>
                            </div>
                        </div>
                        <motion.button whileTap={{ scale: 0.99 }} whileHover={{ scale: 1.01 }} onClick={() => setOpen(true)} className="bg-[#9B79E0] border border-[#716BAF] w-[20%] h-[58px] rounded-full text-white text-[18px] z-[900]">Criar novo</motion.button>
                    </div>


                    <div className="flex h-[700px] overflow-y-auto overflow-x-hidden flex-col items-center">
                        {materiaisNome.map((material, index) => (
                            <a key={index} href={`${material.origem === "DOCUMENTO" ? `/home/materiais/${id}/${material.id}/Material` : `/home/materiais/${id}/${material.id}/Resumo` }`} id="materiais" className=" grid grid-cols-[100px_1fr] px-2 py-1 w-full ml-[15px] mr-[15px] cursor-pointer rounded-[10px] hover:bg-[rgba(0,0,0,0.06)] ">
                                {(() => {
                                    if (index < 9){
                                        return (
                                            <h1 className="text-[90px] font-bold text-[#A78CDC] leading-[90px]">0{index + 1}</h1>
                                        )
                                    }
                                    else{
                                        return (
                                            <h1 className="text-[90px] font-bold text-[#A78CDC] leading-[90px]">{index + 1}</h1>
                                        )
                                    }
                                })()}

                                <motion.div 
                                whileHover="delete"
                                className="mt-[18px] flex justify-between items-center ">
                                    <div className="">
                                        <h2 className="text-[30px] font-medium leading-[30px]">{material.titulo}</h2>
                                        <h2 className="text-[20px] text-[#828181]">Tempo de estudo: 3 horas</h2>
                                    </div>
                                    <div className="flex items-center">
                                        <motion.div 
                                        initial={{ scale: 0}}
                                        variants={{
                                            delete: { scale:1}
                                        }} className="div" onClick={(e) => {e.preventDefault() ;setDeletar(true); setDeletarId(material.id); }}> 
                                            <Trash className="size-8 text-red-500"/>
                                        </motion.div>

                                        <ChevronRight className="size-12 "/>
                                    </div>
                                </motion.div>
                            </a>

                        ))}
                    </div>
                    
                    
                </div>
            </div>

            <div className="bg-white rounded-[35px] flex justify-center shadow-md border border-[#00000031]">
                
                <div className="w-[100%] flex ">
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

                        <div className="flex flex-col gap-5 ml-[15px]">
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
