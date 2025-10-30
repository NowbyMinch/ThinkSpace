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
  Trash,
} from "lucide-react";
import { colors, icons, cor } from "@/app/home/components/icons";
import MonthYearSelector from "@/components/ui/MonthYearSelector";
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

type CalendarioType = {
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
  subtitulo?: string;
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
  usuarioId: string;
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
  const [notificar, setNotificar] = useState(false);

  const [lembreteInfo, setLembreteInfo] = useState<LembreteInfoType | null>(
    null
  );
  const [lembreteInfo2, setLembreteInfo2] = useState<AnotacaoType | null>(null);

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
  const [user, setUser] = useState("");
  // const [ perfil, setPerfil ] = useState<perfil | null []>({})

  // Referências de elementos
  const popoverRefs = useRef<(HTMLDivElement | null)[]>([]);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const [selectedMonthYear, setSelectedMonthYear] = useState(new Date());

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
        usuarioId: user,
      }))
    );

    setTodasAnotacoes(all);
  }, [lembreteInfo]);

  useEffect(() => {
    console.log(lembreteInfo2, "lembrete aqui");
  }, [lembreteInfo2]);

  useEffect(() => {
    console.log(user);
  }, [user]);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        setLoading(true);

        // 1️⃣ Fetch user first — we need the ID for the others
        const resUser = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/users/id`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        const userData = await resUser.json();
        setUser(userData.userId);

        // 2️⃣ Then run both requests that depend on userId in parallel
        const [anotacoesRes, recentesRes] = await Promise.all([
          fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/calendario?mes=${
              new Date().getMonth() + 1
            }&ano=${new Date().getFullYear()}&usuarioId=${userData.userId}`,
            { method: "GET", credentials: "include" }
          ),
          fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/calendario/recentes?usuarioId=${userData.userId}`,
            { method: "GET", credentials: "include" }
          ),
        ]);

        const [anotacoesData, recentesData] = await Promise.all([
          anotacoesRes.json(),
          recentesRes.json(),
        ]);

        setLembreteInfo(anotacoesData);
        console.log(anotacoesData, "Info1");
        setLembreteInfo2(recentesData);
        console.log(recentesData, "Info2");

        if (anotacoesData.error || recentesData.error) {
          setMessage(anotacoesData.message || recentesData.message);
        }
      } catch (err) {
        setMessage("Erro ao carregar dados.");
        console.error(err);
      } finally {
        // 3️⃣ Only stop loading when all 3 fetches have finished
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

  useEffect(() => {
    const fetchAnotacoes = async () => {
      try {
        if (!user) return;

        const mes = selectedMonthYear.getMonth() + 1;
        const ano = selectedMonthYear.getFullYear();

        // calculate previous and next months
        const prevMonthDate = new Date(ano, mes - 2); // JS Date months are 0-indexed
        const nextMonthDate = new Date(ano, mes); // next month
        const monthsToFetch = [
          {
            mes: prevMonthDate.getMonth() + 1,
            ano: prevMonthDate.getFullYear(),
          },
          { mes, ano },
          {
            mes: nextMonthDate.getMonth() + 1,
            ano: nextMonthDate.getFullYear(),
          },
        ];

        // fetch all three months in parallel
        const fetches = monthsToFetch.map(({ mes, ano }) =>
          fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/calendario?mes=${mes}&ano=${ano}&usuarioId=${user}`,
            { method: "GET", credentials: "include" }
          ).then((res) => res.json())
        );

        const results = await Promise.all(fetches);
        console.log(results, "RESULTS!!")

        // combine all days into one array
        const allDias: DiaType[] = results.flatMap(
          (data: LembreteInfoType) => data.dias || []
        );

        // flatten into AnotacaoType[]
        const allAnotacoes: AnotacaoType[] = allDias.flatMap((dia) =>
          dia.anotacoes.map((anotacao) => ({
            ...anotacao,
            dia: dia.dia,
            diaSemana: dia.diaSemana,
            usuarioId: user,
          }))
        );

        setTodasAnotacoes(allAnotacoes);
        console.log(
          allAnotacoes,
          "Todas as anotações (incluindo 6 dias extras)"
        );
      } catch (err) {
        console.error("Erro ao buscar anotações:", err);
        setMessage("Erro ao carregar anotações.");
      }
    };

    fetchAnotacoes();
  }, [selectedMonthYear, user]);

  
  useEffect(() => {
    console.log(todasAnotacoes, "Todas");
  }, [todasAnotacoes]);



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
    setDuracao({
      repeticao: "",
      duracao: "",
    });
  }

  type AccordionItem = {
    sala?: string;
    lembrete?: string;
    cor: string;
    data: string;
  };

  const generateCalendar = () => {
    const start = startOfWeek(startOfMonth(selectedMonthYear), {
      weekStartsOn: 0,
    });
    const end = endOfMonth(selectedMonthYear);
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
      notificar: notificar,
      usuarioId: user,
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
      await Lembrete(selectedMonthYear);;
    }
  };

  const Lembrete = async (date: Date = selectedMonthYear) => {
    try {
      if (!user) return;

      const mesAtual = date.getMonth() + 1;
      const anoAtual = date.getFullYear();

      // Previous and next months
      const prevMonthDate = new Date(anoAtual, mesAtual - 2); // JS months are 0-indexed
      const nextMonthDate = new Date(anoAtual, mesAtual);

      const mesesParaBuscar = [
        { mes: prevMonthDate.getMonth() + 1, ano: prevMonthDate.getFullYear() },
        { mes: mesAtual, ano: anoAtual },
        { mes: nextMonthDate.getMonth() + 1, ano: nextMonthDate.getFullYear() },
      ];

      // Fetch all three months in parallel
      const fetches = mesesParaBuscar.map(({ mes, ano }) =>
        fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/calendario?mes=${mes}&ano=${ano}&usuarioId=${user}`,
          { method: "GET", credentials: "include" }
        ).then((res) => res.json())
      );

      const results = await Promise.all(fetches);

      // Merge dias from all months
      const allDias: DiaType[] = results.flatMap(
        (data: LembreteInfoType) => data.dias || []
      );

      // Flatten into AnotacaoType[]
      const allAnotacoes: AnotacaoType[] = allDias.flatMap((dia) =>
        dia.anotacoes.map((anotacao) => ({
          ...anotacao,
          dia: dia.dia,
          diaSemana: dia.diaSemana,
          usuarioId: user,
        }))
      );

      setLembreteInfo({
        dias: allDias,
        mes: mesAtual.toString(),
        ano: anoAtual.toString(),
      });
      setTodasAnotacoes(allAnotacoes);

      console.log(
        allAnotacoes,
        "Lembretes atualizados incluindo meses adjacentes"
      );
    } catch (err) {
      setMessage("Erro ao carregar anotações.");
      console.error(err);
    }
  };


  const Deletar = async (id: string) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/calendario/${id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      const data = await res.json();
      console.log(data, "Data deletar");

      if (data.error) {
        setMessage(data.message);
      } else {
        await Lembrete(selectedMonthYear);
      }
    } catch (err) {
      setMessage("Erro ao carregar anotações.");
      console.error(err);
    } finally {
      setOpenIndex(null)
      setOpenIndex2(null);
    }
  };

  const handleDateSelect = (date: Date) => {
    // console.log(date);
    setSelectedDate(date);
    // setCalendarMonth(date);
    setOpen2(true);
  };

  const [cellHeights, setCellHeights] = useState<number[]>([]);

  // store multiple refs (one for each cell)
  const cellRefs = useRef<(HTMLDivElement | null)[]>([]);

  const measureHeights = () => {
    const newHeights = cellRefs.current.map((el) => el?.offsetHeight ?? 0);
    setCellHeights(newHeights);
  };

  // ✅ Measure after render and on resize
  useEffect(() => {
    measureHeights(); // after first paint

    window.addEventListener("resize", measureHeights);
    return () => window.removeEventListener("resize", measureHeights);
  }, [todasAnotacoes, selectedMonthYear]);

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
                  className="p-4 gap-4 w-full  rounded-[40px] overflow-y-auto overflow-x-hidden shadow-md flex flex-col items-center relative z-[1100]"
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

                  <div className="w-full flex flex-col gap-4 ">
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
                          onChange={() => setNotificar(!notificar)}
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

                  <div className="w-full flex flex-col justify-center h-full">
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

                    <div className="w-full pb-[20px] max-h-[600px]  overflow-y-auto overflow-x-hidden px-1 flex flex-col gap-2">
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
                            className={`border w-full max-w-full min-h-[55px] border-[rgba(18,18,18,0.14)] rounded-[20px] overflow-hidden shadow-md `}
                          >
                            {/* Header */}
                            <button
                              onClick={() => toggle2(index)}
                              style={{
                                backgroundColor: nota.cor || "#9767f8",
                              }}
                              className="w-full min-h-[55px] flex justify-between px-6 text-left text-[18px] text-white font-medium transition-all ease-in-out bg-red-500 items-center"
                            >
                              <span className="flex-1 min-w-0 break-all leading-none whitespace-normal pr-4 ">
                                {nota.titulo}
                              </span>

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
                                    <span className="ml-auto text-[15px] flex gap-1 font-medium text-[#1E2351]">
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
                                    className="px-6  text-[15px] font-medium text-[#1E2351]"
                                  >
                                    <div className="flex gap-1 items-center text-wrap ">
                                      <div
                                        style={{
                                          borderColor: nota.cor || "#9767f8",
                                        }}
                                        className={`min-w-4 min-h-4 border-2 rounded-full`}
                                      ></div>
                                      <span className=" break-words whitespace-normal max-w-[90%]">
                                        {nota.subtitulo}
                                      </span>
                                    </div>
                                    <span className="break-words whitespace-normal max-w-[90%]">
                                      {nota.descricao}
                                    </span>
                                  </div>
                                  <div
                                    style={{
                                      backgroundColor:
                                        `${nota.cor}33` || "white",
                                    }}
                                    className="pb-2 pr-1 font-medium text-[#1E2351]"
                                  >
                                    <motion.div
                                      whileHover={{ scale: 1.05 }}
                                      whileTap={{ scale: 0.95 }}
                                      onClick={() => Deletar(nota.id)}
                                      className="ml-auto w-5 h-5 cursor-pointer"
                                    >
                                      <Trash className=" w-full h-full " />
                                    </motion.div>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </motion.div>
                        ))}
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
      <div className="w-full sm:h-screen max-h-[1057px] flex justify-center items-start overflow-hidden">
        <div className="w-[1800px] max-w-[98%] py-2 h-full gap-3 rounded-[35px] flex flex-row">
          <div className="w-full overflow-hidden h-full flex sm:flex-row flex-col items-center gap-3">
            <div className="flex w-full px-1 rounded-[35px] overflow-hidden bg-white h-full flex-col items-center shadow-md border border-[#00000031]">
              <div className="w-full pt-4 px-4 flex justify-between">
                <h1 className="text-[#1E2351] font-medium text-[30px] w-full pb-1 leading-none">
                  {selectedMonthYear
                    .toLocaleDateString("pt-BR", { month: "long" })
                    .replace(/^./, (c) => c.toUpperCase())}{" "}
                  {selectedMonthYear.getFullYear()}
                </h1>

                <div className="flex flex-col items-center gap-6 w-fit">
                  <MonthYearSelector
                    selectedDate={selectedMonthYear}
                    onChange={setSelectedMonthYear}
                  />
                </div>
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

              <div className="grid grid-cols-7 text-sm w-full h-full pb-[2px] my-1 mx-1 gap-1 auto-rows-fr">
                {generateCalendar().map((day, i) => {
                  const today = new Date();
                  const isToday = isSameDay(day, today);
                  const inCurrentMonth = isSameMonth(day, selectedMonthYear);
                  const height = cellRefs.current[i]?.offsetHeight ?? 0;

                  return (
                    // 4
                    <div
                      ref={(el) => {
                        cellRefs.current[i] = el;
                      }}
                      key={i}
                      onClick={() => handleDateSelect(day)}
                      className={`cursor-pointer rounded-lg sm:p-2 p-1 flex flex-col justify-start transition text-[18px] text-[#1E2351] overflow-hidden h-full
                      ${isToday ? "shadow-[0_5px_10px_rgba(86,50,157)]" : ""}
                      ${inCurrentMonth ? "hover:bg-[#9767f8] bg-[#F1F1F1] hover:bg-opacity-20" : "bg-[#d9d8ee] text-[#9a9a9a]"}`}
                    >
                      {/* 20 */}
                      <span
                        className={`cursor-pointer text-start sm:text-[15px] h-fit text-[12px] ${isToday ? "text-purple-500" : ""}`}
                      >
                        {day.getDate()}
                      </span>

                      <div className="w-full flex flex-col gap-[2px]">
                        {(() => {
                          const notasDoDia = todasAnotacoes.filter(
                            (nota) =>
                              nota.dataInicio.split("T")[0] ===
                              day.toISOString().split("T")[0]
                          );

                          // Calculate how many can fit based on cell height
                          const semiHeight = (notasDoDia.length - 1) * 2;
                          const calc = Math.round(
                            (height - 16 - semiHeight) / 20 - 2
                          );

                          // Slice only the notes that fit
                          const visibleNotas = notasDoDia.slice(0, calc);

                          return (
                            <>
                              {visibleNotas.map((nota) => (
                                <div
                                  key={nota.id}
                                  className="cursor-pointer text-start sm:text-[12px] h-[20px] text-[12px] sm:px-2 px-1 max-w-full w-fit rounded-[6px] text-white truncate line-clamp-2"
                                  style={{
                                    backgroundColor: nota.cor || "#9767f8",
                                  }}
                                >
                                  {nota.titulo}
                                </div>
                              ))}

                              {/* Only one "ver mais..." if there are hidden notes */}
                              {notasDoDia.length > visibleNotas.length && (
                                <div className="cursor-pointer sm:text-[13px] h-[16px] text-[12px] text-start overflow-hidden text-ellipsis line-clamp-1 leading-none text-gray-600">
                                  ver mais...
                                </div>
                              )}
                            </>
                          );
                        })()}
                      </div>
                    </div>
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
                        className="w-full min-h-[55px] flex justify-between px-6 text-left text-[18px] text-white font-medium transition-all ease-in-out bg-red-500 items-center"
                      >
                        <span className="flex-1 min-w-0 break-all leading-none whitespace-normal pr-4 ">
                          {nota.titulo}
                        </span>

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
                              <span className="ml-auto text-[15px] flex gap-1 font-medium text-[#1E2351]">
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
                              className="px-6  text-[15px] font-medium text-[#1E2351]"
                            >
                              <div className="flex gap-1 items-center text-wrap ">
                                <div
                                  style={{ borderColor: nota.cor || "#9767f8" }}
                                  className={`min-w-4 min-h-4 border-2 rounded-full`}
                                ></div>
                                <span className=" break-words whitespace-normal max-w-[90%]">
                                  {nota.subtitulo}
                                </span>
                              </div>
                              <span className="break-words whitespace-normal max-w-[90%]">
                                {nota.descricao}
                              </span>
                            </div>
                            <div
                              style={{
                                backgroundColor: `${nota.cor}33` || "white",
                              }}
                              className="pb-2 pr-1 font-medium text-[#1E2351]"
                            >
                              <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => Deletar(nota.id)}
                                className="ml-auto w-5 h-5 cursor-pointer"
                              >
                                <Trash className=" w-full h-full " />
                              </motion.div>
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
      </div>
    </>
  );
}
