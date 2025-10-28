"use client";

import {
  X,
  Search,
  ChevronRight,
  BookOpenText,
  FileText,
  ScrollText,
  FileInput,
  SendHorizonal,
  Reply,
  ArrowLeft,
  Trash,
  ArrowRight,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ComboboxDemoMateria,
  ComboboxDemoSettings,
} from "../../components/dropdown";
import ErrorModal from "@/components/ui/ErrorModal";
import Loading from "@/app/home/components/loading";
import { Backdrop3 } from "../../components/backdrop";
import { useRouter } from "next/navigation";
import { File } from "buffer";
import { UserXP } from "../page";

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
  nomeDesignado: string;
  nomeMateria: string;
  topicos: string[];
  assuntoId: string;
  descricao: string;
  quantidadeQuestoes: number;
  quantidadeFlashcards: number;
  // add other properties if needed
};

export default function MateriaisClient({ id }: { id: string }) {
  const router = useRouter();
  // Estados de controle de interface
  const [open, setOpen] = useState(false);
  const [openVar, setOpenVar] = useState(false);
  const [openVar2, setOpenVar2] = useState(false);
  const [openVar3, setOpenVar3] = useState(false);
  const [calendario, setCalendario] = useState<CalendarioData>({});
  const [materiaDesignada, setMateriaDesignada] = useState("");
  const [deletar, setDeletar] = useState(false);
  const [pesquise, setPesquise] = useState("");

  // Inputs e referências
  const [input, setInput] = useState("");
  const [assuntoInput, setAssuntoInput] = useState("");
  const [topicoInput, setTopicoInput] = useState("");
  const documentInputRef = useRef<HTMLInputElement>(null);
  const [topicos, setTopicos] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<string | null>(null);
  const [materiaisNome, setMateriaisNome] = useState<
    Array<{ id: string; titulo?: string; origem: string }>
  >([]);
  const [deletarId, setDeletarId] = useState("");
  const [tipo, setTipo] = useState("");
  const [origem, setOrigem] = useState("");
  const [value, setValue] = useState(10);
  const [value2, setValue2] = useState(10);
  const [userXP, setUserXP] = useState<UserXP>();
  const [selectedFiltro, setSelectedFiltro] = useState<string | null>(null);
  const [terminado, setTerminado] = useState(false);

  const handleCheck = async (value: string) => {
    if (selectedFiltro === value) {
      setSelectedFiltro(null); // desmarca se clicar de novo
    } else {
      setSelectedFiltro(value);
      await materiaisFiltro(value); // chama a função que já existe
    }
  };

  // Dados do usuário
  const [user, setUser] = useState<UserData>({});

  // Query de busca
  const [query, setQuery] = useState("");

  // Dados de matérias
  const [materia, setMateria] = useState<materiaItem>();

  const handleDecrease = (number: number) => {
    if (number === 1) {
      setValue((prev) => Math.max(1, prev - 1));
    } else {
      setValue2((prev) => Math.max(1, prev - 1));
    }
  };

  const handleIncrease = (number: number) => {
    if (number === 1) {
      setValue((prev) => Math.max(1, prev + 1));
    } else {
      setValue2((prev) => Math.max(1, prev + 1));
    }
  };

  const handleChange = (e: any, number: number) => {
    if (number === 1) {
      let num = parseInt(e.target.value, 10);
      if (isNaN(num)) num = 1;
      if (num < 1) num = 1;
      if (num > 25) num = 25;
      setValue(num);
    } else {
      let num = parseInt(e.target.value, 10);
      if (isNaN(num)) num = 1;
      if (num < 1) num = 1;
      if (num > 25) num = 25;
      setValue2(num);
    }
    console.log("Value1", value);
    console.log("Value2", value2);
  };

  // Criar Material

  const Tipo = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/materiais/escolha-tipo-material`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ tipoMaterial: "COMPLETO" }),
          credentials: "include",
        }
      );

      const data = await res.json();
      setTipo(data.tipoMaterial);
    } catch (err) {
      console.error(err);
    }
  };

  // Função para criar nova material
  const Origem = async (origemValor: string) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/materiais/escolha-origem-material`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ origem: origemValor }),
          credentials: "include",
        }
      );
      const data = await res.json();
      console.log("Data: ", data);
      console.log("origemValor: ", origemValor);
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

  // Outros ----------------------------------
  const decodedId = decodeURIComponent(id);

  useEffect(() => {
    setLoading(true);

    const materia = async (id: string) => {
      try {
        setLoading(true);
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/materias/${id}`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        const data = await res.json();
        setMateria(data);
      } catch (err) {
        console.error(err);
      }
    };
    materia(decodedId);

    const user = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/home/identificacao`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        const data = await res.json();
        setUser(data);
      } catch (err) {
        // setMessage("Erro ao carregar saudação.");
        console.error(err);
      }
    };
    user();

    const calendario = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/home/calendario`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        const data = await res.json();
        setCalendario(data);
      } catch (err) {
        console.error(err);
      }
    };
    calendario();

    const materiais = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/materiais/`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        const data = await res.json();
        console.log(data);

        const materiaisFiltrados = data.materiais.filter(
          (material: any) => material.materiaId === id
        );
        console.log("materiaisFiltrados", materiaisFiltrados);

        setMateriaisNome(materiaisFiltrados);
      } catch (err) {
        console.error(err);
      }
    };
    materiais();

    const ranking = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/materias/perfil`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        const data = await res.json();
        setUserXP(data);
        console.log(data);
      } catch (err) {
        console.error(err);
      }
    };
    ranking();
  }, []);

  useEffect(() => {
    if (user.foto) {
      setLoading(false);
    }
  }, [user]);

  const materiais = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/materiais/`, {
        method: "GET",
        credentials: "include",
      });

      const data = await res.json();
      console.log(data);

      const materiaisFiltrados = data.materiais.filter(
        (material: any) => material.materiaId === id
      );

      setMateriaisNome(materiaisFiltrados);
    } catch (err) {
      console.error(err);
    }
  };

  const materiaisFiltro = async (filtro: string) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/materiais/?filtro=${filtro}`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      const data = await res.json();
      console.log(data);

      const materiaisFiltrados = data.materiais.filter(
        (material: any) => material.materiaId === id
      );

      setMateriaisNome(materiaisFiltrados);
    } catch (err) {
      console.error(err);
    }
  };

  const [file, setFile] = useState<globalThis.File | null>(null);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile) return;
    setFile(selectedFile);
  };

  const criarTopicos = async () => {
    let createdMaterialId: string | null = null;
    try {
      let materialRes;
      let data;

      // --- ASSUNTO/TÓPICO: usa JSON normal ---
      materialRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/materiais/etapa-dados`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            nomeDesignado: input,
            nomeMateria: materiaDesignada,
            topicos,
            tipoMaterial: tipo,
            quantidadeQuestoes: value,
            quantidadeFlashcards: value2,
          }),
          credentials: "include",
        }
      );

      data = await materialRes.json();
      console.log(" MATERIAL CRIADO:", data);

      if (data.message !== "Dados básicos recebidos. Material criado.") {
        setMessage(data.message);
        return;
      }
      setLoading(true);
      if (data?.material?.id) {
        createdMaterialId = data.material.id;
      } else if (data?.dados?.materialId) {
        createdMaterialId = data.dados.materialId;
      } else {
        console.error("Nenhum ID de material retornado!", data);
      }

      if (!data.material?.id) {
        console.error(" Nenhum ID de material retornado!");
        return;
      }

      const materialId = data.material.id;

      // --- CHAMADAS EM SEQUÊNCIA ---
      const resumoRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/materiais/resumo-topicos`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: materialId }),
          credentials: "include",
        }
      );
      console.log("RESUMO:", await resumoRes.json());

      const flashcardsRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/materiais/flashcards`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: materialId }),
          credentials: "include",
        }
      );
      console.log("FLASHCARDS:", await flashcardsRes.json());

      const quizzesRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/materiais/quizzes`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: materialId }),
          credentials: "include",
        }
      );
      console.log("QUIZZES:", await quizzesRes.json());

      // --- atualizar lista no estado ---
      setMateriaisNome((prev: any) => [...prev, data.material]);
      // router.push(`/home/materiais/${id}/${materialId}/resumo`);
    } catch (err) {
      setLoading(false);
      console.error(" Erro no criar():", err);
    } finally {
      if (createdMaterialId) {
        closing();
        router.push(`/home/materiais/${id}/${createdMaterialId}/Resumo`);
      }
    }
  };

  const criarDocumento = async () => {
    let createdMaterialId: string | null = null;
    try {
      setLoading(true);
      console.log("Tentando documento");

      let materialRes;
      let data;

      // --- DOCUMENTO: usa FormData + File ---
      const formData = new FormData();
      if (file) {
        formData.append("file", file, file.name);
      }
      formData.append("nomeDesignado", input);
      formData.append("nomeMateria", materiaDesignada);
      formData.append("topicos", JSON.stringify(topicos));
      formData.append("tipoMaterial", tipo);
      formData.append("quantidadeQuestoes", value.toString());
      formData.append("quantidadeFlashcards", value2.toString());

      console.log("vai agora documento", formData);
      materialRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/materiais/etapa-dados`,
        {
          method: "POST",
          body: formData,
          credentials: "include",
        }
      );

      data = await materialRes.json();
      console.log(" MATERIAL CRIADO:", data);
      if (data.message !== "Dados básicos recebidos. Material criado.") {
        setMessage(data.message);
        return;
      }
      if (data?.material?.id) {
        createdMaterialId = data.material.id;
      } else if (data?.dados?.materialId) {
        createdMaterialId = data.dados.materialId;
      } else {
        console.error("Nenhum ID de material retornado!", data);
      }

      if (!data.material?.id) {
        console.error(" Nenhum ID de material retornado!");
        return;
      }

      const materialId = data.material.id;

      // --- CHAMADAS EM SEQUÊNCIA ---
      const resumoRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/materiais/resumo-documento`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: materialId }),
          credentials: "include",
        }
      );
      console.log("RESUMO:", await resumoRes.json());

      const flashcardsRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/materiais/flashcards-pdf`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: materialId }),
          credentials: "include",
        }
      );
      console.log("FLASHCARDS:", await flashcardsRes.json());

      const quizzesRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/materiais/quizzes-pdf`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: materialId }),
          credentials: "include",
        }
      );
      console.log("QUIZZES:", await quizzesRes.json());

      // --- atualizar lista no estado ---
      setMateriaisNome((prev: any) => [...prev, data.material]);
      // router.push(`/home/materiais/${id}/${materialId}/resumo`);
    } catch (err) {
      console.error(" Erro no criar():", err);
    } finally {
      if (createdMaterialId) {
        setTerminado(true);
        closing();
        router.push(`/home/materiais/${id}/${createdMaterialId}/Resumo`);
      }
    }
  };

  const criarAssunto = async () => {
    let createdMaterialId: string | null = null;
    try {
      let materialRes;
      let data;

      // --- ASSUNTO/TÓPICO: usa JSON normal ---
      materialRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/materiais/etapa-dados`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            assunto: assuntoInput,
            nomeDesignado: input,
            nomeMateria: materiaDesignada,
            topicos,
            tipoMaterial: tipo,
            quantidadeQuestoes: value,
            quantidadeFlashcards: value2,
          }),
          credentials: "include",
        }
      );

      data = await materialRes.json();
      console.log(" MATERIAL CRIADO:", data);
      if (data.message !== "Dados básicos recebidos. Material criado.") {
        setMessage(data.message);
        return;
      }
      setLoading(true);
      if (data?.material?.id) {
        createdMaterialId = data.material.id;
      } else if (data?.dados?.materialId) {
        createdMaterialId = data.dados.materialId;
      } else {
        console.error("Nenhum ID de material retornado!", data);
      }

      if (!data.material?.id) {
        console.error(" Nenhum ID de material retornado!");
        return;
      }

      const materialId = data.material.id;

      // --- CHAMADAS EM SEQUÊNCIA ---
      const resumoRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/materiais/resumo-assunto`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: materialId }),
          credentials: "include",
        }
      );
      console.log("RESUMO:", await resumoRes.json());

      const flashcardsRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/materiais/flashcards`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: materialId }),
          credentials: "include",
        }
      );
      console.log("FLASHCARDS:", await flashcardsRes.json());

      const quizzesRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/materiais/quizzes`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: materialId }),
          credentials: "include",
        }
      );
      console.log("QUIZZES:", await quizzesRes.json());

      // --- atualizar lista no estado ---
      setMateriaisNome((prev: any) => [...prev, data.material]);
      // router.push(`/home/materiais/${id}/${materialId}/resumo`);
    } catch (err) {
      console.error(" Erro no criar():", err);
    } finally {
      if (createdMaterialId) {
        closing();
        router.push(`/home/materiais/${id}/${createdMaterialId}/Resumo`);
      }
    }
  };

  const Deletar = async (id: string) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/materiais/${id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      const data = await res.json();
      console.log(data);
      materiais();
    } catch (error) {
      console.error("Erro ao deletar o material.");
    }
  };

  function closing() {
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
  function voltar() {
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

  return (
    <>
      {message && (
        <ErrorModal message={message} onClose={() => setMessage(null)} />
      )}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 0.94 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className={`w-full h-full absolute opacity-1 z-[1100] ${open ? " opacity-1 z-[1100]" : "z-[-100] opacity-0"}`}
          >
            <div
              className="w-full h-full absolute"
              onClick={() => closing()}
            ></div>
            <div
              id="white-box"
              className={`w-[1250px] max-w-[95%] min-h-[95%] lg:min-h-[650px] h-[650px] max-h-[95%] rounded-[50px] z-[1100] left-[50%] translate-x-[-50%] top-[50%] translate-y-[-50%] bg-white shadow-md flex justify-center items-center relative overflow-hidden ${open ? "opacity-1 scale-1" : "opacity-0 scale-95"} ${openVar || openVar2 || openVar3 ? "h-[650px]" : "h-[600px]"}`}
            >
              <ArrowLeft
                onClick={voltar}
                className={`size-6 text-black flex cursor-pointer h-fit absolute top-5 left-8 z-10 ${openVar || openVar2 || openVar3 ? "block" : "hidden"}`}
              />
              <X
                className="absolute top-5 right-8 size-6 cursor-pointer"
                onClick={() => closing()}
              />
              <Image
                width={300}
                height={500}
                src="/Vector.svg"
                alt="Decoração"
                className="absolute top-0 left-[-140px] rotate-90 w-[550px]"
              />
              <Image
                width={300}
                height={500}
                src="/Vector.svg"
                alt="Decoração"
                className="absolute bottom-[-40px] right-[-130px] -rotate-90 w-[550px]"
              />

              <div className="w-[90%] h-[85%] lg:w-[80%] lg:h-[92%] lg:mb-4 flex flex-col items-center gap-10 z-[900] overflow-y-auto pr-2 pb-4">
                <h1
                  className={`text-center text-[30px] font-medium ${openVar || openVar2 || openVar3 ? "hidden" : "block"}`}
                >
                  Como você deseja criar a matéria?
                </h1>
                <div className="flex w-full h-full flex-col md:flex-row lg:justify-between items-center gap-2 ">
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => {
                      setOpenVar(true);
                      Origem("DOCUMENTO");
                    }}
                    className={` w-[400px] max-w-full h-full min-h-[200px] md:w-full md:h-[320px] flex flex-col items-center justify-center bg-[#A387DC] rounded-[30px] cursor-pointer ${openVar || openVar2 || openVar3 ? "hidden" : "block"}`}
                  >
                    <BookOpenText className=" text-white size-[100px] stroke-1" />
                    <div className="flex flex-col items-center w-[90%]">
                      <h1 className="banner_title font-medium text-white">
                        Documentos
                      </h1>
                      <h2 className="text-[18px] font-medium material_text">
                        PDF, slides da aula, livros diversos
                      </h2>
                    </div>
                  </motion.button>

                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => {
                      setOpenVar2(true);
                      Origem("TOPICOS");
                    }}
                    className={` w-[400px] max-w-full h-full min-h-[200px] md:w-full md:h-[320px] flex flex-col items-center justify-center bg-[#A39CEC] rounded-[30px] cursor-pointer ${openVar || openVar2 || openVar3 ? "hidden" : "block"}`}
                  >
                    <FileText className=" text-white size-[100px] stroke-1" />
                    <div className="flex flex-col items-center w-[90%]">
                      <h1 className="banner_title font-medium text-white">
                        Tópicos
                      </h1>
                      <h2 className="text-[18px] font-medium material_text">
                        Digite um tópico que deseja revisar
                      </h2>
                    </div>
                  </motion.button>

                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => {
                      setOpenVar3(true);
                      Origem("ASSUNTO");
                    }}
                    className={` w-[400px] max-w-full h-full min-h-[200px] md:w-full md:h-[320px] flex flex-col items-center justify-center bg-[#6871BB] rounded-[30px] cursor-pointer ${openVar || openVar2 || openVar3 ? "hidden" : "block"}`}
                  >
                    <ScrollText className=" text-white size-[100px] stroke-1" />
                    <div className="flex flex-col items-center w-[90%]">
                      <h1 className="banner_title font-medium text-white">
                        Assuntos
                      </h1>
                      <h2 className="text-[18px] font-medium material_text">
                        Digite assuntos gerais para revisar
                      </h2>
                    </div>
                  </motion.button>

                  <div
                    className={`w-full h-full flex lg:flex-row flex-col gap-10 items-center mt-4 ${openVar ? "block" : "hidden"}`}
                  >
                    <div className="w-[500px] max-w-full min-h-[220px] lg:w-[105%] lg:h-[85%] bg-[#A39CEC] rounded-[25px] flex justify-center items-center">
                      <div className="w-[85%] h-[85%] flex flex-col justify-between">
                        <h1 className="text-white banner_title">Documento</h1>
                        {/* <div className="">
                                                    <h2 className="text-white material_text">1 {calendario.mesAtual} {calendario.anoAtual}</h2>
                                                </div> */}
                        <motion.button
                          whileTap={{ scale: 0.99 }}
                          whileHover={{ scale: 1.01 }}
                          transition={{ duration: 0.2, ease: "easeInOut" }}
                          onClick={() => documentInputRef.current?.click()}
                          className=" w-full h-full bg-white rounded-[25px] flex flex-col justify-center items-center cursor-pointer"
                        >
                          <FileInput className="size-[100px] stroke-1 opacity-[75%]" />
                          <input
                            ref={documentInputRef}
                            type="file"
                            onChange={handleFileChange}
                            className="absolute right-[9999px]"
                          />
                          <h1 className=" w-[90%] banner_title opacity-[75%]">
                            Faça o upload do material
                          </h1>
                        </motion.button>
                      </div>
                    </div>

                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                      }}
                      encType="multipart/form-data"
                      className="w-full lg:h-[90%] flex flex-col gap-5 "
                    >
                      <div className=" flex flex-col gap-1">
                        <h2 className="text-[20px] font-medium">
                          {" "}
                          Nome do material
                        </h2>
                        <input
                          type="text"
                          value={input}
                          onChange={(e) => setInput(e.target.value)}
                          placeholder="Nome do Material"
                          className="pl-5 text-[18px] w-full max-w-[500px] h-[45px] border-2 border-[rgba(0,0,0,0.19)] rounded-[20px] outline-[rgba(151,103,248,0.6)]"
                        />
                      </div>

                      <div className="relative flex flex-col gap-1">
                        <h2 className="text-[20px] font-medium">
                          Matéria designada:
                        </h2>

                        <ComboboxDemoMateria
                          value={materiaDesignada}
                          onChange={(value) => {
                            setMateriaDesignada(value);
                          }}
                        />
                      </div>

                      <div className="flex w-[220px] flex-col max-w-full gap-3">
                        <div className="">
                          <h2 className="text-[20px] font-medium">
                            {" "}
                            Quantidade de questões
                          </h2>

                          <div className="flex w-full justify-between ">
                            <button
                              onClick={() => handleDecrease(1)}
                              className="p-2 bg-[#A387DC] rounded-full"
                            >
                              <ArrowLeft className="size-6 text-white rounded-full" />
                            </button>

                            <div className="w-full mx-2 rounded-[12px] border border-solid border-black ">
                              <input
                                value={value}
                                onChange={(e) => handleChange(e, 1)}
                                type="number"
                                max={25}
                                min={1}
                                className="appearance-none text-[20px] w-full h-full text-center flex justify-center items-center rounded-[12px] bg-transparent"
                              />
                            </div>

                            <button
                              onClick={() => handleIncrease(1)}
                              className="p-2 bg-[#A387DC] rounded-full"
                            >
                              <ArrowRight className="size-6 text-white" />
                            </button>
                          </div>
                        </div>

                        <div className="">
                          <h2 className="text-[20px] font-medium">
                            {" "}
                            Quantidade de flashcards
                          </h2>
                          <div className="flex w-full justify-between ">
                            <button
                              onClick={() => handleDecrease(2)}
                              className="p-2 bg-[#A387DC] rounded-full"
                            >
                              <ArrowLeft className="size-6 text-white rounded-full" />
                            </button>

                            <div className="w-full mx-2 rounded-[12px] border border-solid border-black ">
                              <input
                                value={value2}
                                onChange={(e) => handleChange(e, 2)}
                                type="number"
                                max={25}
                                min={1}
                                className="appearance-none text-[20px] w-full h-full text-center flex justify-center items-center rounded-[12px] bg-transparent"
                              />
                            </div>

                            <button
                              onClick={() => handleIncrease(2)}
                              className="p-2 bg-[#A387DC] rounded-full"
                            >
                              <ArrowRight className="size-6 text-white" />
                            </button>
                          </div>
                        </div>
                      </div>

                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        whileHover={{ scale: 1.02 }}
                        id="editar_conta"
                        type="submit"
                        className="mt-auto border mb-4 border-[#1E2351] text-[18px] w-fit p-[10px_25px] rounded-full flex justify-center items-center gap-2"
                        onClick={() => {
                          if (origem === "DOCUMENTO") {
                            criarDocumento();
                          } else {
                            console.log(origem);
                            console.log("não é documento"); // <- now it will actually show something
                          }
                        }}
                      >
                        <FileText />
                        Enviar
                      </motion.button>
                    </form>
                  </div>

                  <div
                    className={`w-full h-full flex lg:flex-row flex-col lg:gap-12 gap-6 lg:items-center  ${openVar2 ? "block" : "hidden"}`}
                  >
                    {/* --------------------------------------------------------------------------------------------------------------------------------------------------------------------- */}

                    <div className="w-full max-w-full min-h-[220px] lg:w-[105%] lg:h-[85%] flex flex-col gap-5 ">
                      <div className=" lg:w-full w-[500px] max-w-full h-fit flex flex-col gap-1">
                        <h1 className="font-medium text-[20px] leading-[20px] ">
                          Tópicos
                        </h1>
                        <div className=" max-w-[600px] h-fit flex gap-1 justify-center items-end ">
                          <input
                            type="text"
                            value={topicoInput}
                            onChange={(e) => setTopicoInput(e.target.value)}
                            onKeyDown={(e) => {
                              if (
                                e.key === "Enter" &&
                                topicoInput &&
                                !topicos.includes(topicoInput)
                              ) {
                                setTopicos((prev) => [...prev, topicoInput]);
                                setTopicoInput("");
                              }
                            }}
                            placeholder="Adicionar um tópico"
                            className="pl-5 text-[20px] w-full h-[45px] border-2 border-[rgba(0,0,0,0.19)] rounded-[20px] outline-[rgba(151,103,248,0.6)]"
                          />

                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.92 }}
                            onClick={() => {
                              if (
                                topicoInput &&
                                !topicos.includes(topicoInput)
                              ) {
                                setTopicos((prev) => [...prev, topicoInput]);
                                setTopicoInput("");
                              }
                            }}
                            className="p-[10px] bg-[#A39CEC] rounded-[27%] text-white flex justify-center items-center text-[20px] font-semibold shadow-md "
                          >
                            <SendHorizonal className="size-6" />
                          </motion.button>
                        </div>
                      </div>

                      <div className="lg:w-full w-[500px] max-w-full h-full rounded-[25px] flex justify-center border-2 border-[rgba(0,0,0,0.19)]">
                        <div className="w-[95%] px-2 py-2 h-min max-h-[95%] mt-2 flex flex-wrap gap-2 overflow-auto">
                          <AnimatePresence>
                            {topicos.map((topico, index) => (
                              <motion.div
                                key={topico + index}
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                id="topicos"
                                className="flex w-fit h-fit py-1 px-2 gap-2 text-white bg-[#A387DC] rounded-[8px] max-w-full cursor-pointer"
                              >
                                <X
                                  onClick={() => {
                                    setTopicos((prev) =>
                                      prev.filter((_, i) => i !== index)
                                    );
                                  }}
                                  className="text-[rgba(0,0,0,0.34)]"
                                />

                                <span className=" w-full block text-ellipsis overflow-hidden break-words ">
                                  {topico}
                                </span>
                              </motion.div>
                            ))}
                          </AnimatePresence>
                        </div>
                      </div>
                    </div>

                    {/* --------------------------------------------------------------------------------------------------------------------------------------------------------------------- */}

                    <div className="w-full lg:h-[85%] flex flex-col gap-5  ">
                      <div className="flex flex-col gap-1">
                        <h2 className="text-[20px] font-medium leading-[20px]">
                          {" "}
                          Nome do material
                        </h2>
                        <input
                          type="text"
                          value={input}
                          onChange={(e) => setInput(e.target.value)}
                          placeholder="Nome do Material"
                          className="pl-5 text-[18px] w-full max-w-[500px] h-[45px] border-2 border-[rgba(0,0,0,0.19)] rounded-[20px] outline-[rgba(151,103,248,0.6)]"
                        />
                      </div>

                      <div className="relative flex flex-col gap-1">
                        <h2 className="text-[20px] font-medium leading-[20px]">
                          Matéria designada:
                        </h2>
                        <ComboboxDemoMateria
                          value={materiaDesignada}
                          onChange={(value) => {
                            setMateriaDesignada(value);
                          }}
                        />
                      </div>

                      <div className="flex w-[220px] flex-col max-w-full gap-3">
                        <div className="">
                          <h2 className="text-[20px] font-medium">
                            {" "}
                            Quantidade de questões
                          </h2>

                          <div className="flex w-full justify-between ">
                            <button
                              onClick={() => handleDecrease(1)}
                              className="p-2 bg-[#A387DC] rounded-full"
                            >
                              <ArrowLeft className="size-6 text-white rounded-full" />
                            </button>

                            <div className="w-full mx-2 rounded-[12px] border border-solid border-black ">
                              <input
                                value={value}
                                onChange={(e) => handleChange(e, 1)}
                                type="number"
                                max={25}
                                min={1}
                                className="appearance-none text-[20px] w-full h-full text-center flex justify-center items-center rounded-[12px] bg-transparent"
                              />
                            </div>

                            <button
                              onClick={() => handleIncrease(1)}
                              className="p-2 bg-[#A387DC] rounded-full"
                            >
                              <ArrowRight className="size-6 text-white" />
                            </button>
                          </div>
                        </div>

                        <div className="">
                          <h2 className="text-[20px] font-medium">
                            {" "}
                            Quantidade de flashcards
                          </h2>
                          <div className="flex w-full justify-between ">
                            <button
                              onClick={() => handleDecrease(2)}
                              className="p-2 bg-[#A387DC] rounded-full"
                            >
                              <ArrowLeft className="size-6 text-white rounded-full" />
                            </button>

                            <div className="w-full mx-2 rounded-[12px] border border-solid border-black ">
                              <input
                                value={value2}
                                onChange={(e) => handleChange(e, 2)}
                                type="number"
                                max={25}
                                min={1}
                                className="appearance-none text-[20px] w-full h-full text-center flex justify-center items-center rounded-[12px] bg-transparent"
                              />
                            </div>

                            <button
                              onClick={() => handleIncrease(2)}
                              className="p-2 bg-[#A387DC] rounded-full"
                            >
                              <ArrowRight className="size-6 text-white" />
                            </button>
                          </div>
                        </div>
                      </div>

                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        whileHover={{ scale: 1.02 }}
                        id="editar_conta"
                        type="submit"
                        className="mt-auto border  border-[#1E2351] text-[18px] w-fit p-[8px_25px] rounded-full flex justify-center items-center gap-2"
                        onClick={() => {
                          if (origem === "TOPICOS") {
                            criarTopicos();
                          } else {
                            console.log("não é topicos"); // <- now it will actually show something
                          }
                        }}
                      >
                        <FileText />
                        Enviar
                      </motion.button>
                    </div>

                    {/* --------------------------------------------------------------------------------------------------------------------------------------------------------------------- */}
                  </div>

                  <div
                    className={`w-full h-full flex lg:flex-row flex-col lg:gap-12 gap-6 lg:items-center ${openVar3 ? "block" : "hidden"}`}
                  >
                    <div className="w-full max-w-full min-h-[220px] lg:w-[105%] lg:h-[85%] flex flex-col gap-5 ">
                      <div className="h-fit flex flex-col gap-1">
                        <h1 className="font-medium text-[20px] leading-[20px] ">
                          Assunto:
                        </h1>
                        <div className=" max-w-[600px] h-fit flex gap-1  ">
                          <input
                            type="text"
                            value={assuntoInput}
                            onChange={(e) => setAssuntoInput(e.target.value)}
                            placeholder="Diga o assunto"
                            className="pl-5 text-[18px] w-full max-w-[500px] h-[45px] border-2 border-[rgba(0,0,0,0.19)] rounded-[20px] outline-[rgba(151,103,248,0.6)]"
                          />
                        </div>
                      </div>
                      <div className=" lg:w-full w-[500px] max-w-full h-fit flex flex-col gap-1">
                        <h1 className="font-medium text-[20px] leading-[20px] ">
                          Tópicos
                        </h1>
                        <div className=" max-w-[600px] h-fit flex gap-1 justify-center items-end ">
                          <input
                            type="text"
                            value={topicoInput}
                            onChange={(e) => setTopicoInput(e.target.value)}
                            onKeyDown={(e) => {
                              if (
                                e.key === "Enter" &&
                                topicoInput &&
                                !topicos.includes(topicoInput)
                              ) {
                                setTopicos((prev) => [...prev, topicoInput]);
                                setTopicoInput("");
                              }
                            }}
                            placeholder="Adicionar um tópico"
                            className="pl-5 text-[20px] w-full h-[45px] border-2 border-[rgba(0,0,0,0.19)] rounded-[20px] outline-[rgba(151,103,248,0.6)]"
                          />

                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.92 }}
                            onClick={() => {
                              if (
                                topicoInput &&
                                !topicos.includes(topicoInput)
                              ) {
                                setTopicos((prev) => [...prev, topicoInput]);
                                setTopicoInput("");
                              }
                            }}
                            className="p-[10px] bg-[#A39CEC] rounded-[27%] text-white flex justify-center items-center text-[20px] font-semibold shadow-md "
                          >
                            <SendHorizonal className="size-6" />
                          </motion.button>
                        </div>
                      </div>

                      <div className="lg:w-full w-[500px] max-w-full min-h-[124px] h-full rounded-[25px] flex justify-center border-2 border-[rgba(0,0,0,0.19)]">
                        <div className="w-[95%] px-2 py-2 h-min max-h-[95%] mt-2 flex flex-wrap gap-2 overflow-auto">
                          <AnimatePresence>
                            {topicos.map((topico, index) => (
                              <motion.div
                                key={topico + index}
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                id="topicos"
                                className="flex w-fit h-fit py-1 px-2 gap-2 text-white bg-[#A387DC] rounded-[8px] max-w-full cursor-pointer"
                              >
                                <X
                                  onClick={() => {
                                    setTopicos((prev) =>
                                      prev.filter((_, i) => i !== index)
                                    );
                                  }}
                                  className="text-[rgba(0,0,0,0.34)]"
                                />

                                <span className=" w-full block text-ellipsis overflow-hidden break-words ">
                                  {topico}
                                </span>
                              </motion.div>
                            ))}
                          </AnimatePresence>
                        </div>
                      </div>
                    </div>

                    <div className="w-full lg:h-[85%] flex flex-col gap-5  ">
                      <div className="flex flex-col gap-1">
                        <h2 className="text-[20px] font-medium leading-[20px]">
                          {" "}
                          Nome do material
                        </h2>
                        <input
                          type="text"
                          value={input}
                          onChange={(e) => setInput(e.target.value)}
                          placeholder="Nome do Material"
                          className="pl-5 text-[18px] w-full max-w-[500px] h-[45px] border-2 border-[rgba(0,0,0,0.19)] rounded-[20px] outline-[rgba(151,103,248,0.6)]"
                        />
                      </div>

                      <div className="relative flex flex-col gap-1">
                        <h2 className="text-[20px] font-medium leading-[20px]">
                          Matéria designada:
                        </h2>
                        <ComboboxDemoMateria
                          value={materiaDesignada}
                          onChange={(value) => {
                            setMateriaDesignada(value);
                          }}
                        />
                      </div>

                      <div className="flex w-[220px] flex-col max-w-full gap-3">
                        <div className="">
                          <h2 className="text-[20px] font-medium">
                            {" "}
                            Quantidade de questões
                          </h2>

                          <div className="flex w-full justify-between ">
                            <button
                              onClick={() => handleDecrease(1)}
                              className="p-2 bg-[#A387DC] rounded-full"
                            >
                              <ArrowLeft className="size-6 text-white rounded-full" />
                            </button>

                            <div className="w-full mx-2 rounded-[12px] border border-solid border-black ">
                              <input
                                value={value}
                                onChange={(e) => handleChange(e, 1)}
                                type="number"
                                max={25}
                                min={1}
                                className="appearance-none text-[20px] w-full h-full text-center flex justify-center items-center rounded-[12px] bg-transparent"
                              />
                            </div>

                            <button
                              onClick={() => handleIncrease(1)}
                              className="p-2 bg-[#A387DC] rounded-full"
                            >
                              <ArrowRight className="size-6 text-white" />
                            </button>
                          </div>
                        </div>

                        <div className="">
                          <h2 className="text-[20px] font-medium">
                            {" "}
                            Quantidade de flashcards
                          </h2>
                          <div className="flex w-full justify-between ">
                            <button
                              onClick={() => handleDecrease(2)}
                              className="p-2 bg-[#A387DC] rounded-full"
                            >
                              <ArrowLeft className="size-6 text-white rounded-full" />
                            </button>

                            <div className="w-full mx-2 rounded-[12px] border border-solid border-black ">
                              <input
                                value={value2}
                                onChange={(e) => handleChange(e, 2)}
                                type="number"
                                max={25}
                                min={1}
                                className="appearance-none text-[20px] w-full h-full text-center flex justify-center items-center rounded-[12px] bg-transparent"
                              />
                            </div>

                            <button
                              onClick={() => handleIncrease(2)}
                              className="p-2 bg-[#A387DC] rounded-full"
                            >
                              <ArrowRight className="size-6 text-white" />
                            </button>
                          </div>
                        </div>
                      </div>

                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        whileHover={{ scale: 1.02 }}
                        id="editar_conta"
                        type="submit"
                        className="mt-auto border  border-[#1E2351] text-[18px] w-fit p-[8px_25px] rounded-full flex justify-center items-center gap-2"
                        onClick={() => {
                          if (origem === "ASSUNTO") {
                            criarAssunto();
                          } else {
                            console.log("não é assunto"); // <- now it will actually show something
                          }
                        }}
                      >
                        <FileText />
                        Enviar
                      </motion.button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
        {deletar && (
          <>
            <motion.div
              key="content"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 0.94 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className={`w-full h-full fixed flex justify-center items-center opacity-1 z-[1100] `}
            >
              <div
                className="w-full h-full absolute"
                onClick={() => setDeletar(false)}
              ></div>
              <motion.div
                key="content"
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 0.94 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className={`w-[700px] h-[320px] flex rounded-[40px] z-[1100]  opacity-1 `}
              >
                <div
                  id="white-box"
                  className={` w-full h-full rounded-[40px] bg-white shadow-md flex justify-center items-center relative overflow-hidden z-[1100] left-[50%] translate-x-[-50%] top-[50%] translate-y-[-50%]`}
                >
                  <Image
                    width={300}
                    height={500}
                    src="/Vector.svg"
                    alt="Decoração"
                    className="absolute top-0 left-[-180px] rotate-90 w-[550px]"
                  />
                  <Image
                    width={300}
                    height={500}
                    src="/Vector.svg"
                    alt="Decoração"
                    className="absolute bottom-[-40px] right-[-170px] -rotate-90 w-[550px]"
                  />

                  <div className="w-[80%] h-[85%] flex flex-col items-center gap-2 z-[900] ">
                    <div className="flex flex-col justify-center items-center">
                      <img
                        src={`${user.foto}`}
                        alt="Foto de perfil"
                        className="rounded-full w-20 h-20"
                      />
                      <span className="font-medium text-[30px]">
                        {user.primeiroNome}{" "}
                      </span>
                      <span className="text-[20px]"></span>
                    </div>

                    <h1 className="text-center text-[20px] font-medium">
                      Você deseja mesmo deletar esse material?
                    </h1>
                    <div className="w-full flex gap-4 mt-auto justify-center ">
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => setDeletar(false)}
                        className="p-[10px_12px] rounded-[20px] text-[18px] bg-[#F1F1F1] border border-[rgba(68,68,68, 0.17)]"
                      >
                        Voltar
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => {
                          setDeletar(false);
                          Deletar(deletarId);
                        }}
                        className="p-[10px_12px] rounded-[20px] text-[18px] text-white bg-[#9767F8] border border-[rgba(68,68,68, 0.17)]"
                      >
                        Deletar
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            <div className="w-full absolute flex justify-center items-center ">
              <Backdrop3 onClick={() => setDeletar(false)} />
            </div>
          </>
        )}
      </AnimatePresence>

      <div
        className={`w-full h-full fixed z-[1000] bg-[rgba(0,0,0,0.40)] ${open ? "flex" : "hidden"} justify-center items-center`}
      ></div>
      <div className=" w-[1800px] max-w-[98%] lg:max-w-[90%] mx-auto mt-[12px] mb-[12px] h-[calc(100vh-24px)] lg:my-auto gap-3 rounded-[35px] flex justify-center items-center ">
        <div className="  w-full rounded-[35px] overflow-hidden bg-white h-full flex flex-col items-center shadow-md border border-[#00000031]">
          <div className="w-[95%] max-w-[95%] ">
            <div className="w-full mx-auto">
              <h1 className="text-[#1E2351] font-medium text-[30px]">
                {" "}
                Materiais de Estudo{" "}
              </h1>
              <h1 className="font-medium text-[18px] text-[#9767F8] ">
                {" "}
                {materia?.nome}{" "}
              </h1>
            </div>

            <div className=" mx-auto w-[1030px] max-w-full mt-[25px] flex items-center justify-between">
              <div className="w-full mr-[2%] h-[82px] mt-10 flex justify-center relative ">
                <div className="w-[98%] rounded-[20px] mt-4 mr-3 h-[45px] bg-[#D9D9D9] absolute "></div>

                <div className="relative w-full">
                  <input
                    type="text"
                    id="search_bar"
                    onChange={(e) => setPesquise(e.target.value)}
                    placeholder="Pesquise a matéria"
                    className="w-full text-[18px] pl-5 py-2 border-2 border-[rgba(0,0,0,0.19)] shadow-md rounded-[25px] outline-[rgba(151,103,248,0.6)]"
                  />
                  <Search className="absolute right-[20px] text-black opacity-[36%] cursor-pointer top-[12px] size-[25px] " />
                </div>
              </div>

              <motion.button
                whileTap={{ scale: 0.99 }}
                whileHover={{ scale: 1.01 }}
                onClick={() => setOpen(true)}
                className="min-w-fit h-fit bg-[#9B79E0] border border-[#716BAF] py-2 px-2 whitespace-nowrap rounded-full text-white text-[18px] z-[900]"
              >
                Criar novo
              </motion.button>
            </div>
          </div>

          {/*  ${materias && materias.length === 0 ? "": "grid-cols-[1fr_1fr]"} grid gap-[10px] max-h-[900px] pt-1 pb-3 overflow-y-auto px-2 */}
          <div className="w-[95%] max-w-[95%] h-full overflow-y-auto">
            <div className="w-full h-full flex overflow-y-auto overflow-x-hidden flex-col items-center">
              {materiaisNome
                .filter(
                  (material) =>
                    !pesquise ||
                    material.titulo
                      ?.toLowerCase()
                      .includes(pesquise.toLowerCase())
                )
                .map((material, index) => {
                  return (
                    <motion.a
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      key={material.id}
                      href={`/home/materiais/${id}/${material.id}/Resumo`}
                      id="materiais"
                      className="grid grid-cols-[100px_1fr] px-2 py-1 w-full ml-[15px] mr-[15px] cursor-pointer rounded-[10px] hover:bg-[rgba(0,0,0,0.06)]"
                    >
                      {index < 9 ? (
                        <h1 className="text-[85px] font-bold text-[#A78CDC] leading-[90px]">
                          0{index + 1}
                        </h1>
                      ) : (
                        <h1 className="text-[85px] font-bold text-[#A78CDC] leading-[90px]">
                          {index + 1}
                        </h1>
                      )}

                      <motion.div
                        whileHover="delete"
                        className="mt-[18px] flex justify-between items-center "
                      >
                        <div>
                          <h2 className="text-[25px] font-medium leading-[30px] recentes2 overflow-hidden ">
                            {material.titulo}
                          </h2>
                          <h2 className="text-[18px] text-[#828181]">
                            Tempo de estudo: 0 horas
                          </h2>
                        </div>
                        <div className="flex items-center">
                          <motion.div
                            initial={{ scale: 0 }}
                            variants={{
                              delete: { scale: 1 },
                            }}
                            className="div"
                            onClick={(e) => {
                              e.preventDefault();
                              setDeletar(true);
                              setDeletarId(material.id);
                            }}
                          >
                            <Trash className="size-8 text-red-500" />
                          </motion.div>

                          <ChevronRight className="size-12 " />
                        </div>
                      </motion.div>
                    </motion.a>
                  );
                })}
            </div>
          </div>
        </div>

        <div className="xl:flex hidden right_panel w-[30%] bg-white rounded-[35px] h-full  justify-center shadow-md border border-[#00000031]  ">
          <div className="w-full h-full flex justify-center ">
            <div className="w-[95%] h-[95%] flex flex-col items-center mt-4">
              <div className="flex gap-[15px] justify-center items-center w-[95%] max-w-[95%] max-h-[110px]">
                <img
                  src={`${user.foto}`}
                  className="w-[28%] max-w-[380px] rounded-full cursor-pointer"
                  alt="Profile picture"
                />

                <div className="w-[70%] ">
                  <h1 className="text-[30px] font-medium ">
                    {user.primeiroNome}
                  </h1>
                  <h2 className="text-[#828181] font-medium text-[18px]">
                    {user.cargo}
                  </h2>
                  <div className=" h-2 rounded-[18px] bg-[#1e235138]">
                    <div
                      style={{ width: `${userXP?.progresso ?? 0}%` }}
                      className={` h-2 rounded-[25px] bg-purple-600 `}
                    ></div>
                  </div>
                  <div className="flex justify-between ">
                    {(() => {
                      const nivel = userXP?.nivel
                        ? userXP.nivel.charAt(0).toUpperCase() +
                          userXP.nivel.slice(1).toLowerCase()
                        : "";
                      return (
                        <h2 className="font-medium text-[18px] text-[#828181]">
                          {nivel}
                        </h2>
                      );
                    })()}

                    <h2 className="font-medium text-[18px] text-[#A39CEC]">
                      {userXP?.xp} XP
                    </h2>
                  </div>
                </div>
              </div>

              <div className=" mt-[30px] w-full max-w-[95%]">
                <h1 className="text-[30px] w-fit font-medium leading-6">
                  Matérias recentes
                </h1>
                {/* <h1 className="text-[18px] italic w-fit font-medium text-[#9767F8] " >{recente[0]?.nome}</h1> */}
              </div>

              <div className="flex flex-col gap-1 mb-[5px] mt-2 items-center relative max-w-[95%] w-full">
                <div className="w-full flex flex-col gap-2 ">
                  <h1 className="text-[25px] font-medium border border-b-[rgba(0,0,0,0.28)] ">
                    Filtro
                  </h1>

                  <div className="flex gap-2 items-center text-[18px]">
                    <input
                      type="checkbox"
                      className="cursor-pointer size-4 accent-[#804EE5]"
                      checked={selectedFiltro === "maisRecentes"}
                      onChange={() => handleCheck("maisRecentes")}
                    />
                    Mais recentes
                  </div>

                  <div className="flex gap-2 items-center text-[18px]">
                    <input
                      type="checkbox"
                      className="cursor-pointer size-4 accent-[#804EE5]"
                      checked={selectedFiltro === "maisAntigos"}
                      onChange={() => handleCheck("maisAntigos")}
                    />
                    Mais antigos
                  </div>

                  <div className="flex gap-2 items-center text-[18px]">
                    <input
                      type="checkbox"
                      className="cursor-pointer size-4 accent-[#804EE5]"
                      checked={selectedFiltro === "maiorTempoEstudo"}
                      onChange={() => handleCheck("maiorTempoEstudo")}
                    />
                    Maior tempo de estudo
                  </div>

                  <div className="flex gap-2 items-center text-[18px]">
                    <input
                      type="checkbox"
                      className="cursor-pointer size-4 accent-[#804EE5]"
                      checked={selectedFiltro === "menorTempoEstudo"}
                      onChange={() => handleCheck("menorTempoEstudo")}
                    />
                    Menor tempo de estudo
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="xl:flex hidden right_panel bg-white rounded-[35px] h-full  justify-center shadow-md border border-[#00000031] overflow-y-auto overflow-x-hidden">
                
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

                    </div>
                </div>
            </div> */}
      </div>
    </>
  );
}
