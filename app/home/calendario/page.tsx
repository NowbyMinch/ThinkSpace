"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { Backdrop3 } from "../components/backdrop";
import ErrorModal from "@/components/ui/ErrorModal";
import Loading from "@/app/home/components/loading";
import {
  CirclePlus,
  Heart,
  Globe,
  Monitor,
  CodeXml,
  HeartPulse,
  Minus,
  Divide,
  X,
  Plus,
  Search,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  ChevronLeft,
  AlarmClock,
  Bell,
  Book,
  Bookmark,
  Calendar,
  Check,
  Clipboard,
  Clock,
  Code,
  Cpu,
  Database,
  Download,
  Edit,
  Eye,
  File,
  Filter,
  Flag,
  Folder,
  GitBranch,
  Globe2,
  Grid,
  Hash,
  Headphones,
  HelpCircle,
  Home,
  Inbox,
  Info,
  Key,
  Layers,
  Layout,
  LifeBuoy,
  Lightbulb,
  List,
  Loader,
  Lock,
  LogIn,
  LogOut,
  Mail,
  Map,
  Menu,
  SquareX,
  SquarePen,
  Ellipsis,
} from "lucide-react";
import { colors, icons, cor } from "@/app/home/components/icons";
import {
  startOfWeek,
  startOfMonth,
  endOfMonth,
  addDays,
  isSameDay,
  isSameMonth,
} from "date-fns";
import React from "react";
import { DatePicker2 } from "@/components/ui/datepicker";
import {
  CalendarioRepeticao,
  CalendarioDuracao,
  ComboboxDemoMateria,
} from "../components/dropdown";
import { IMask, IMaskInput } from "react-imask";

type UserData = {
  primeiroNome?: string;
  cargo?: string;
  foto?: string;
  // add other properties if needed
};

type CalendaioType = {
  data: string;
  horario: string;
  materiaId: string;
  cor: string;
  titulo: string;
  subtitulo: string;
  Duracaorecorrente: number;
  recorrente: boolean;
  anotacao: string;
};

export type UserXP = {
  maxXp: number;
  avatar: string;
  cargo: string;
  nivel: string;
  primeiroNome: string;
  progresso: number;
  xp: number;
};

type AnotacaoType = {
  id: string;
  titulo: string;
  descricao?: string | null;
  cor?: string | null;
  criadoEm: string; // ISO string
  dataInicio: string; // ISO string
  dataFim?: string | null; // ISO string
  dataTerminoRecorrencia?: string | null; // ISO string
  intervaloDias?: number | null;
  materiaId?: string | null;
  salaId?: string | null;
  tipo?: string | null;
  recorrente: boolean;
  notificar?: boolean;
  usuarioId?: string | null;
};

type DiaType = {
  dia: number;
  diaSemana: number;
  anotacoes: AnotacaoType[];
};

type LembreteInfoType = {
  dias?: DiaType[];
  mes: string;
  ano?: string;
};

export default function Materiais() {
  // Estados de controle de interface
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [editar, setEditar] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const [color, setColor] = useState<string | "">("");
  const [openPop, setOpenPop] = useState<number | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [openIndex2, setOpenIndex2] = useState<number | null>(null);
  const [pesquise, setPesquise] = useState("");
  const [duracao, setDuracao] = useState({
    repeticao: "",
    duracao: "",
  });

  /////////////////////////////////////

  const [DataFormatada, setDataFormatada] = useState<string>("");

  const [data, setData] = useState<string>("");
  const [horario, setHorario] = useState<string>("");
  const [cor, setCor] = useState<string>("");
  const [titulo, setTitulo] = useState<string>("");
  const [subtitulo, setSubtitulo] = useState<string>("");
  const [Duracaorecorrente, setDuracaorecorrente] = useState<string>("");
  const [recorrente, setRecorrente] = useState<string>("");
  const [anotacao, setAnotacao] = useState<string>();

  const [lembreteInfo, setLembreteInfo] = useState<LembreteInfoType | null>(
    null
  );
  const [lembreteInfo2, setLembreteInfo2] = useState<LembreteInfoType | null>(
    null
  );

  const setandoData = (val: string) => {
    const data = val;
    const monthName = new Date(
      0,
      Number(data.split("-")[1]) - 1
    ).toLocaleString("pt", { month: "long" });

    const dataTemp = data.split("-");

    if (data !== "--") {
      console.log(data, "data");
      setData(dataTemp.join("/"));
    }

    if (Number(data.split("-")[0])) {
      console.log("tem data", data);
      setDataFormatada(
        `${data.split("-")[2]} de ${monthName} de ${data.split("-")[0]}`
      );
    } else {
      console.log("Sem numero", data);
    }
  };

  const [calendarMonth, setCalendarMonth] = useState(new Date());

  // Dados do usuário
  const [user, setUser] = useState<UserData>({});
  // const [ perfil, setPerfil ] = useState<perfil | null []>({})

  // Referências de elementos
  const popoverRefs = useRef<(HTMLDivElement | null)[]>([]);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Constantes
  const cores = [
    { VERMELHO: "#F92A46" },
    { LARANJA: "#F6A423" },
    { AMARELO: "#FDE561" },
    { VERDECLARO: "#8AD273" },
    { VERDEESCURO: "#6CA559" },
    { AZULCLARO: "#86BEE1" },
    { AZULESCURO: "#1B8BD1" },
    { ROXO: "#8379E2" },
    { ROSA: "#E572B1" },
  ];

  const toggle = (index: number) => {
    setOpenIndex(index === openIndex ? null : index);
  };

  const toggle2 = (index: number) => {
    setOpenIndex2(index === openIndex2 ? null : index);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;

      if (
        openPop !== null &&
        popoverRefs.current[openPop] &&
        !popoverRefs.current[openPop]!.contains(target) &&
        buttonRefs.current[openPop] &&
        !buttonRefs.current[openPop]!.contains(target)
      ) {
        setOpenPop(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openPop]);

  useEffect(() => {
    setDuracaorecorrente(duracao.duracao);
    setRecorrente(duracao.repeticao);
  }, [duracao]);

  const [todasAnotacoes, setTodasAnotacoes] = useState<AnotacaoType[]>([]);

  useEffect(() => {
    if (!lembreteInfo?.dias) return;

    const all: AnotacaoType[] = lembreteInfo.dias.flatMap((dia) =>
      dia.anotacoes.map((anotacao) => ({
        ...anotacao,
        dia: dia.dia,
        diaSemana: dia.diaSemana,
      }))
    );

    setTodasAnotacoes(all);
  }, [lembreteInfo]);

  useEffect(() => {
    console.log(todasAnotacoes, "Todas");
  }, [todasAnotacoes]);

  useEffect(() => {
    try {
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
          console.log("complete");
        } catch (err) {
          setMessage("Erro ao carregar saudação.");
          console.error(err);
        }
      };
      user();
  
      const AnotacoesFunc = async () => {
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/calendario?mes=${new Date().getMonth() + 1}&ano=${new Date().getFullYear()}`,
            {
              method: "GET",
              credentials: "include",
            }
          );
  
          const data = await res.json();
          setLembreteInfo(data);
          console.log(data, "Data aqui");
  
          if (data.error) {
            console.log("deu erro");
          }
        } catch (err) {
          setMessage("Erro ao carregar anotações.");
          console.error(err);
        }
      };
      AnotacoesFunc();
  
      const Recentes = async () => {
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/calendario/recentes`,
            {
              method: "GET",
              credentials: "include",
            }
          );
  
          const data = await res.json();
          setLembreteInfo2(data);
          console.log(data, "Recentes");
  
          if (data.error) {
            console.log("deu erro");
          }
        } catch (err) {
          setMessage("Erro ao carregar anotações.");
          console.error(err);
        }
      };
      Recentes();

    } catch {

    } finally {
      setLoading(false);
    }

  }, []);

  function closing() {
    setOpen(false);
    setOpen2(false);
    setEditar(false);
    setSelected(null);
    setColor("");
    setDataFormatada("");
    setData("");
    setHorario("");
    setCor("");
    setTitulo("");
    setSubtitulo("");
    setDuracaorecorrente("");
    setRecorrente("");
    setAnotacao("");
  }

  type AccordionItem = {
    sala?: string;
    lembrete?: string;
    cor: string;
    data: string;
  };

  const generateCalendar = () => {
    const start = startOfWeek(startOfMonth(calendarMonth), { weekStartsOn: 0 });
    const end = endOfMonth(calendarMonth);
    const days: Date[] = [];

    let current = start;
    while (current <= end || days.length % 7 !== 0) {
      days.push(current);
      current = addDays(current, 1);
    }

    return days;
  };

  const CriarLembrete = async () => {
    const calendario = {
      data: data,
      horario: horario,
      cor: cor,
      titulo: titulo,
      subtitulo: subtitulo,
      Duracaorecorrente: Duracaorecorrente,
      recorrente: recorrente,
      anotacao: anotacao,
    };
    console.log(calendario);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/calendario`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(calendario),
        credentials: "include",
      });

      const data = await res.json();
      console.log(data, "Retorno da criação");

      if (!data.error) {
        closing();
      } else {
        setMessage(data.message);
      }
    } catch (err) {
      console.error(err);
    } finally {
      Lembrete();
    }
  };

  const Lembrete = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/calendario?mes=${new Date().getMonth() + 1}&ano=${new Date().getFullYear()}`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      const data = await res.json();
      setLembreteInfo(data);
      console.log(data, "Data aqui");

      if (data.error) {
        console.log("deu erro");
      }
    } catch (err) {
      setMessage("Erro ao carregar anotações.");
      console.error(err);
    }
  };
  

  const handleDateSelect = (date: Date) => {
    // console.log(date);
    setSelectedDate(date);
    // setCalendarMonth(date);
    setOpen2(true);
  };

  if (loading) return <Loading />;
  return (
    <>
      {message && (
        <ErrorModal message={message} onClose={() => setMessage(null)} />
      )}
      <AnimatePresence initial={false}>
        {open && (
          <>
            <motion.div
              key="content"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 0.94 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="w-full h-full fixed  flex justify-center overflow-hidden items-center z-[1100] "
            >
              <div
                className="w-full h-full absolute"
                onClick={() => closing()}
              ></div>

              <motion.div
                key="content"
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 0.94 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="w-[600px] max-h-[100vh] bg-white h-auto flex rounded-[40px] overflow-hidden z-[1100]"
              >
                <div
                  id="white-box"
                  className="p-4 gap-4 w-full  rounded-[40px] overflow-y-auto shadow-md flex flex-col items-center relative z-[1100]"
                >
                  <Image
                    width={300}
                    height={500}
                    src="/Vector.svg"
                    alt="Decoração"
                    className="absolute top-0 left-[-180px] rotate-90 w-[550px] -z-10"
                  />

                  <div className="w-full flex h-[25px] ">
                    {DataFormatada && (
                      <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        exit={{ scaleX: 0 }}
                        className="origin-left bg-[#A39CEC] text-white p-[2px] px-2 rounded-full min-w-[5px]"
                      >
                        {DataFormatada}
                      </motion.div>
                    )}

                    <motion.div
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.92 }}
                      onClick={closing}
                      className="ml-auto cursor-pointer z-1000 w-6 h-6"
                    >
                      <X className="w-full h-full" />
                    </motion.div>
                  </div>

                  <div className="min-h-[300px]  border-2 border-[rgba(163,156,236)] rounded-[20px] w-full h-fit">
                    <DatePicker2
                      onChange={(val) => {
                        setandoData(val);
                      }}
                    />
                  </div>

                  <div className="w-full flex flex-col gap-4">
                    <div className="flex gap-3 text-[18px]">
                      <div className="flex items-center gap-2">
                        <Clock className="size-8 stroke-1" />
                        <IMaskInput
                          mask="h:m"
                          blocks={{
                            h: {
                              mask: IMask.MaskedRange,
                              from: 0,
                              to: 23,
                              maxLength: 2,
                              placeholderChar: "00",
                            },
                            m: {
                              mask: IMask.MaskedRange,
                              from: 0,
                              to: 59,
                              maxLength: 2,
                              placeholderChar: "00",
                            },
                          }}
                          overwrite={true}
                          lazy={true}
                          eager={false}
                          onFocus={(e) => {
                            const input = e.target as HTMLInputElement;
                            // if caret is after mask, reset to beginning
                            requestAnimationFrame(() => {
                              if (input.selectionStart === input.value.length) {
                                input.setSelectionRange(0, 0);
                              }
                            });
                          }}
                          onAccept={(value: string) => {
                            setHorario(value);
                          }}
                          placeholder="00:00"
                          className="no-select p-3 text-[18px] w-fit rounded-[25px] h-[45px]
                    outline-[rgba(151,103,248,0.6)] 
                    border-2 border-[rgba(0,0,0,0.19)] 
                    "
                        />
                        {/* <input
                          type="text"
                          id="search_bar"
                          placeholder="00:00"
                          className="pl-5 text-[18px] w-full max-w-[500px] h-[45px] border-2 border-[rgba(0,0,0,0.19)] rounded-[20px] outline-[rgba(151,103,248,0.6)] "
                        /> */}
                      </div>

                      <div className="flex gap-2 items-center">
                        <motion.input
                          type="checkbox"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="w-5 h-5 accent-[#804EE5] cursor-pointer"
                        />
                        <span>Notificação</span>
                      </div>
                    </div>

                    <div className="w-full flex flex-col gap-2">
                      <input
                        type="text"
                        id="search_bar"
                        placeholder="Título"
                        onChange={(e) => setTitulo(e.target.value)}
                        className="pl-5 text-[18px] w-full max-w-[500px] h-[45px] border-2 border-[rgba(0,0,0,0.19)] rounded-[20px] outline-[rgba(151,103,248,0.6)] "
                      />
                      <input
                        type="text"
                        id="search_bar"
                        placeholder="Subtítulo"
                        onChange={(e) => setSubtitulo(e.target.value)}
                        className="pl-5 text-[18px] w-full max-w-[500px] h-[45px] border-2 border-[rgba(0,0,0,0.19)] rounded-[20px] outline-[rgba(151,103,248,0.6)] "
                      />
                    </div>

                    <div className="flex gap-2">
                      <div className="w-full">
                        <textarea
                          onChange={(e) => setAnotacao(e.target.value)}
                          className="w-[98%] pl-2 pt-2 h-[200px] text-[18px] border-2 border-[rgba(0,0,0,0.19)] shadow-md rounded-l-[25px] rounded-br-[25px] outline-[rgba(151,103,248,0.6)]"
                        ></textarea>
                      </div>
                      <div className="w-full max-w-[35%] h-full flex flex-col">
                        <h2 className="text-[25px]">Cores:</h2>
                        <div className="grid grid-cols-3 gap-2 mt-1 h-full w-full">
                          {cores.map((corI, index) => {
                            const [nome, valor] = Object.entries(corI)[0];
                            return (
                              <motion.div
                                whileTap={{ scale: 0.95 }}
                                whileHover={{ scale: 1.02 }}
                                key={index}
                                onClick={() => setCor(nome)}
                                className={`${cor === nome ? "border-3 border-purple-500 " : "border border-gray-300"} sm:w-11 sm:h-11 w-9 h-9 rounded-full shadow-sm cursor-pointer `}
                                style={{ backgroundColor: valor }}
                                title={nome}
                              />
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    <div className="w-full flex gap-2">
                      <CalendarioDuracao
                        value={duracao}
                        onChange={(value) => {
                          setDuracao(value);
                        }}
                      />
                    </div>

                    <div className="w-full flex justify-center py-2 min-h-[53px] ">
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        whileHover={{ scale: 1.02 }}
                        id="editar_conta"
                        onClick={CriarLembrete}
                        className="border border-[#1E2351] w-fit h-fit text-[18px] p-[4px_30px] rounded-full"
                      >
                        Salvar
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            <div className="w-full absolute flex justify-center items-center">
              <Backdrop3 onClick={() => closing()} />
            </div>
          </>
        )}

        {open2 && (
          <>
            <motion.div
              key="content"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 0.94 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="w-full h-full fixed  flex justify-center overflow-hidden items-center z-[1100] "
            >
              <div
                className="w-full h-full absolute"
                onClick={() => closing()}
              ></div>

              <motion.div
                key="content"
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 0.94 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="w-[500px] max-h-[100vh] bg-white h-auto flex rounded-[40px] overflow-hidden z-[1100]"
              >
                <div
                  id="white-box"
                  className="p-4 gap-4 w-full rounded-[40px] overflow-hidden shadow-md flex flex-col items-center relative z-[1100]"
                >
                  <Image
                    width={300}
                    height={500}
                    src="/Vector.svg"
                    alt="Decoração"
                    className="absolute top-0 left-[-180px] rotate-90 w-[550px] -z-10"
                  />

                  <div className="w-full flex h-fit text-[18px]">
                    <div className="w-full flex flex-col justify-center">
                      <div className="flex ">
                        <div className=" flex flex-col justify-center items-center w-full text-[35px]">
                          <span className="w-fit ">
                            {selectedDate?.toLocaleDateString("pt-BR", {
                              weekday: "short",
                            })}
                          </span>
                          <span className="w-fit ">
                            {selectedDate?.toLocaleDateString("pt-BR", {
                              day: "numeric",
                            })}
                          </span>
                        </div>
                        <div className=" w-fit">
                          <motion.div
                            whileHover={{ scale: 1.08 }}
                            whileTap={{ scale: 0.92 }}
                            onClick={closing}
                            className="ml-auto cursor-pointer z-1000 w-6 h-6"
                          >
                            <X className="w-full h-full" />
                          </motion.div>
                        </div>
                      </div>

                      <div className="w-full pb-[26px] max-h-[600px] overflow-y-auto overflow-x-hidden flex flex-col gap-2">
                        {todasAnotacoes
                          .filter((nota) => {
                            if (!selectedDate) return true; // show all if no date selected
                            return (
                              nota.dataInicio.split("T")[0] ===
                              selectedDate.toISOString().split("T")[0]
                            );
                          })
                          .map((nota, index) => (
                            <motion.div
                              id="perguntas"
                              key={nota.id}
                              whileTap={{ scale: 0.99 }}
                              whileHover={{ scale: 1.01 }}
                              transition={{ duration: 0.2, ease: "easeInOut" }}
                              className={`border w-full max-w-full min-h-[55px] border-[rgba(18,18,18,0.14)] rounded-[20px] overflow-hidden shadow-md`}
                            >
                              {/* Header */}
                              <button
                                onClick={() => toggle2(index)}
                                style={{ backgroundColor: nota.cor || "white" }}
                                className={`w-full min-h-[55px] flex justify-between transition-all ease-in-out dark items-center px-6 text-left text-[18px] text-white font-medium`}
                              >
                                {nota.titulo}

                                <span
                                  className={`text-[18px] text-[rgba(151,103,248,1)] transform transition-transform duration-300 flex justify-center items-center rounded-full 
                                  ${openIndex2 === index ? "-rotate-90" : ""}`}
                                >
                                  <ChevronLeft className="text-white" />
                                </span>
                              </button>

                              {/* Animated Content */}
                              <AnimatePresence initial={false}>
                                {openIndex2 === index && (
                                  <motion.div
                                    key="content"
                                    initial={{
                                      height: 0,
                                      opacity: 0,
                                      filter: "blur(1px)",
                                    }}
                                    animate={{
                                      height: "auto",
                                      opacity: 1,
                                      filter: "blur(0px)",
                                    }}
                                    exit={{
                                      height: 0,
                                      opacity: 0,
                                      filter: "blur(1px)",
                                    }}
                                    transition={{
                                      duration: 0.3,
                                      ease: "easeInOut",
                                    }}
                                  >
                                    <div
                                      style={{
                                        backgroundColor:
                                          `${nota.cor}33` || "white",
                                      }}
                                      className="w-full pr-1 pt-1 flex justify-end"
                                    >
                                      <span className="ml-auto text-[15px] font-medium text-[#1E2351]">
                                        {new Date(
                                          nota.dataInicio
                                        ).toLocaleDateString("pt-BR", {
                                          day: "numeric",
                                          month: "long",
                                          year: "numeric",
                                        })}
                                      </span>
                                    </div>
                                    <div
                                      style={{
                                        backgroundColor:
                                          `${nota.cor}33` || "white",
                                      }}
                                      className="px-6 pb-2 text-[15px] font-medium text-[#1E2351]"
                                    >
                                      {nota.descricao}
                                    </div>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </motion.div>
                          ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            <div className="w-full absolute flex justify-center items-center">
              <Backdrop3 onClick={() => closing()} />
            </div>
          </>
        )}
      </AnimatePresence>

      {/* h-[calc(100vh-24px)] */}
      <div className="w-full sm:h-[calc(100vh)] overflow-y-auto flex justify-center">
        <div className=" w-[1800px] max-w-[98%] py-2 sm:h-[1057px] gap-3 rounded-[35px] flex flex-row   ">
          <div className=" w-full overflow-hidden h-full flex sm:flex-row flex-col items-center gap-3">
            <div className=" flex w-full rounded-[35px] overflow-hidden bg-white h-full  flex-col items-center shadow-md border border-[#00000031]">
              <div className="w-full pt-4 px-4">
                <h1 className="text-[#1E2351] font-medium text-[30px] w-full pb-1">
                  {new Date()
                    .toLocaleDateString("pt-BR", { month: "long" })
                    .replace(/^./, (c) => c.toUpperCase())}{" "}
                  {new Date().toLocaleDateString("pt-BR", { year: "numeric" })}
                </h1>
              </div>
              <div className="flex w-full text-[18px] text-[#1E2351] font-medium gap-3 px-[2px]">
                <div className="w-full justify-center sm:flex hidden  text-center">
                  <span className="w-fit">Dom.</span>
                </div>
                <div className="w-full justify-center sm:flex hidden  text-center">
                  <span className="w-fit">Seg.</span>
                </div>
                <div className="w-full justify-center sm:flex hidden  text-center">
                  <span className="w-fit">Ter.</span>
                </div>
                <div className="w-full justify-center sm:flex hidden  text-center">
                  <span className="w-fit">Qua.</span>
                </div>
                <div className="w-full justify-center sm:flex hidden  text-center">
                  <span className="w-fit">Qui.</span>
                </div>
                <div className="w-full justify-center sm:flex hidden  text-center">
                  <span className="w-fit">Sex.</span>
                </div>
                <div className="w-full justify-center sm:flex hidden  text-center">
                  <span className="w-fit">Sáb.</span>
                </div>
              </div>

              <div className="grid grid-cols-7 text-sm w-full h-full  pb-[2px] ">
                {generateCalendar().map((day, i) => {
                  const today = new Date().toLocaleDateString();

                  const isSelected =
                    selectedDate && isSameDay(day, selectedDate);
                  const inCurrentMonth = isSameMonth(day, calendarMonth);
                  return (
                    <button
                      type="button"
                      key={i}
                      onClick={() => handleDateSelect(day)}
                      className={`rounded-lg p-2 m-[2px] flex justify-normal transition text-[18px] text-[#1E2351] ${today === day.toLocaleDateString() && "shadow-[0_5px_10px_rgba(86,50,157)]"} ${
                        inCurrentMonth
                          ? "hover:bg-[#9767f8] bg-[#F1F1F1] hover:bg-opacity-20"
                          : " bg-[#d9d8ee] F1F1F1"
                      }`}
                    >
                      <div className="h-full w-full flex flex-col gap-1 overflow-hidden">
                        {/* <span
                          className={`${today === day.toLocaleDateString() && "text-purple-500"}`}
                        >
                          {day
                            .toLocaleDateString("pt-BR", { weekday: "long" })
                            .replace("-feira", "")
                            .trim()
                            .replace(/^./, (c) => c.toUpperCase())}
                        </span> */}

                        <span
                          className={` text-start text-[15px] ${today === day.toLocaleDateString() && "text-purple-500"}`}
                        >
                          {" "}
                          {day.getDate()}{" "}
                        </span>

                        {todasAnotacoes
                          .filter(
                            (nota) =>
                              nota.dataInicio.split("T")[0] ===
                              day.toISOString().split("T")[0]
                          )
                          .map((nota) => (
                            <div
                              key={nota.id}
                              className={`text-start text-[13px] px-2 max-w-full w-fit rounded-[6px] text-white py-[2px]`}
                              style={{ backgroundColor: nota.cor || "#9767f8" }}
                            >
                              {nota.titulo}
                            </div>
                          ))}

                        {i === 30 && (
                          <div className="text-start text-[15px] px-2 max-w-full w-fit rounded-[6px] text-white py-[2px] bg-[#F92A46] overflow-hidden text-ellipsis whitespace-nowrap">
                            <span>Física</span>
                          </div>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="sm:flex sm:min-w-[20%] sm:w-min sm:max-w-[45%] w-full  sm:flex-col px-4 pt-4 gap-2 sm:max-h-full h-[550px] max-h-[550px] sm:h-full bg-white rounded-[35px] h0 shadow-md overflow-hidden border border-[#00000031] ">
              <div className="flex justify-between w-full">
                <h1 className="text-[#1E2351] font-medium text-[30px] h-fit ">
                  Lembretes
                </h1>

                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => setOpen(true)}
                  className="origin-center cursor-pointer w-8 h-8 flex justiy-center items-center"
                >
                  <Plus className=" w-full h-full p-1  rounded-full bg-[#A39CEC] text-white " />
                </motion.button>
              </div>

              <div className="relative w-full max-w-[480px] ">
                <input
                  type="text"
                  id="search_bar"
                  onChange={(e) => setPesquise(e.target.value)}
                  placeholder="Pesquise o lembrete"
                  className="w-full text-[15px] pl-5 py-[6px] border-2 border-[rgba(0,0,0,0.19)] shadow-md rounded-[25px] outline-[rgba(151,103,248,0.6)]"
                />
                <Search className="absolute right-[15px] text-black opacity-[36%] cursor-pointer top-[10px] size-[20px] " />
              </div>

              <div
                className={
                  lembreteInfo2
                    ? "flex flex-col gap-2 w-full sm:w-[415px] max-w-full min-h-[62px] h-full max-h-full overflow-y-auto overflow-x-hidden px-[2px] pt-3 pb-6"
                    : ""
                }
              >
                {todasAnotacoes
                  .filter(
                    (nota) =>
                      !pesquise ||
                      nota.titulo
                        ?.toLowerCase()
                        .includes(pesquise.toLowerCase()) ||
                      nota.descricao
                        ?.toLowerCase()
                        .includes(pesquise.toLowerCase())
                  )
                  .map((nota, index) => (
                    <motion.div
                      id="perguntas"
                      key={nota.id || index}
                      whileTap={{ scale: 0.99 }}
                      whileHover={{ scale: 1.01 }}
                      transition={{ duration: 0.2, ease: "easeInOut" }}
                      className={`border w-full sm:w-[415px] max-w-full min-h-[55px] border-[rgba(18,18,18,0.14)] rounded-[20px] overflow-hidden shadow-md`}
                    >
                      {/* Header */}
                      <button
                        onClick={() => toggle(index)}
                        style={{ backgroundColor: nota.cor || "#9767f8" }}
                        className={`w-full min-h-[55px] flex justify-between items-center px-6 text-left text-[18px] text-white font-medium transition-all ease-in-out`}
                      >
                        {nota.titulo}

                        <span
                          className={`text-[18px] text-[rgba(151,103,248,1)] transform transition-transform duration-300 flex justify-center items-center rounded-full 
            ${openIndex === index ? "-rotate-90" : ""}`}
                        >
                          <ChevronLeft className="text-white" />
                        </span>
                      </button>

                      {/* Animated Content */}
                      <AnimatePresence initial={false}>
                        {openIndex === index && (
                          <motion.div
                            key="content"
                            initial={{
                              height: 0,
                              opacity: 0,
                              filter: "blur(1px)",
                            }}
                            animate={{
                              height: "auto",
                              opacity: 1,
                              filter: "blur(0px)",
                            }}
                            exit={{
                              height: 0,
                              opacity: 0,
                              filter: "blur(1px)",
                            }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                          >
                            <div
                              style={{
                                backgroundColor: `${nota.cor}33` || "white",
                              }}
                              className="w-full pr-1 pt-1 flex justify-end"
                            >
                              <span className="ml-auto text-[15px] font-medium text-[#1E2351]">
                                {new Date(nota.dataInicio).toLocaleDateString(
                                  "pt-BR",
                                  {
                                    day: "numeric",
                                    month: "long",
                                    year: "numeric",
                                  }
                                )}
                              </span>
                            </div>
                            <div
                              style={{
                                backgroundColor: `${nota.cor}33` || "white",
                              }}
                              className="px-6 pb-2 text-[15px] font-medium text-[#1E2351]"
                            >
                              {nota.descricao || "Sem descrição"}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
              </div>
            </div>

            {/* <div className=" w-full rounded-[35px] overflow-hidden bg-white p-4 h-full max-h-fit flex flex-col items-center shadow-md border border-[#00000031] ">
              <h1 className="text-[#1E2351] font-medium text-[30px] w-full pb-1">
                {" "}
                Visão Geral{" "}
              </h1>
              <div className="w-full max-h-full pr-1 overflow-y-auto">
                {items.map((item: AccordionItem, index) => (
                  <div
                    key={index}
                    className={`w-full border-1 ${index !== 1 ? "border-b-[#1E2351] border-t-[#1E2351]" : ""} text-[#1E2351] py-1 flex text-[20px] items-center gap-2`}
                  >
                    <motion.div className="w-4 h-4 rounded-full border-2 border-[#9868F9]"></motion.div>
                    <div className="flex w-full justify-between items-center">
                      <span>{item?.sala}</span>

                      <span className="text-[18px]">
                        {index === 0 && "28 de Outubro de 2025"}
                        {index === 1 && "29 de Outubro de 2025"}
                        {index === 2 && "30 de Outubro de 2025"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
}
