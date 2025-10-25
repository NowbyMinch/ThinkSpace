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
import { ComboboxDemoMateria } from "../components/dropdown";

type UserData = {
  primeiroNome?: string;
  cargo?: string;
  foto?: string;
  // add other properties if needed
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

export default function Materiais() {
  // Estados de controle de interface
  const [open, setOpen] = useState(false);
  const [editar, setEditar] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const [color, setColor] = useState<string | "">("");
  const [openPop, setOpenPop] = useState<number | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [DataFormatada, setDataFormatada] = useState<string>("");
  const [materiaDesignada, setMateriaDesignada] = useState<string>("");

  const setandoData = (val: string) => {
    const data = val;
    const monthName = new Date(
      0,
      Number(data.split("-")[1]) - 1
    ).toLocaleString("pt", { month: "long" });

    console.log(data, "Acontecendo", monthName, data.split("-")[1]);

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
    { AZUL: "#1B8BD1" },
    { ROXO: "#8379E2" },
    { ROSA: "#E572B1" },
  ];

  const toggle = (index: number) => {
    setOpenIndex(index === openIndex ? null : index);
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
        console.log("User: ", data);
        setUser(data);
        console.log("complete");
      } catch (err) {
        setMessage("Erro ao carregar saudação.");
        console.error(err);
      }
    };
    user();
  }, []);

  function closing() {
    setOpen(false);
    setEditar(false);
    setSelected(null);
    setColor("");
    setDataFormatada("");
  }

  type AccordionItem = {
    sala?: string;
    lembrete?: string;
    cor: string;
  };

  const items: AccordionItem[] = [
    {
      sala: "Física",
      lembrete: "Estudar cinemática.",
      cor: "#F92A46",
    },
    {
      sala: "Biologia",
      lembrete: "Estudar a estrutura e funções.",
      cor: "#A554C5",
    },
    {
      sala: "Química",
      lembrete:
        "Estudar estrutura atômica, funções inorgânicas, estequiometria e soluções e termoquímica.",
      cor: "#3F9DD8",
    },
  ];

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
                    <div className="flex gap-5 text-[18px]">
                      <div className="flex items-center gap-1">
                        <input
                          type="time"
                          className="w-full pl-2 text-[18px] border-2 border-[rgba(0,0,0,0.19)] shadow-md rounded-[25px] outline-[rgba(151,103,248,0.6)]"
                        />
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

                    <ComboboxDemoMateria
                      value={materiaDesignada}
                      onChange={(value) => {
                        setMateriaDesignada(value);
                      }}
                    />

                    <div className="flex gap-2">
                      <div className="w-full">
                        <ComboboxDemoMateria
                          value={materiaDesignada}
                          onChange={(value) => {
                            setMateriaDesignada(value);
                          }}
                        />
                      </div>
                      <div className="w-full max-w-[35%]">
                        <ComboboxDemoMateria
                          value={materiaDesignada}
                          onChange={(value) => {
                            setMateriaDesignada(value);
                          }}
                        />
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <div className="w-full">
                        <textarea className="w-[98%] pl-2 pt-2 h-[200px] text-[18px] border-2 border-[rgba(0,0,0,0.19)] shadow-md rounded-l-[25px] rounded-br-[25px] outline-[rgba(151,103,248,0.6)]"></textarea>
                      </div>
                      <div className="w-full max-w-[35%] h-full flex flex-col">
                        <h2 className="text-[25px]">Cores:</h2>
                        <div className="grid grid-cols-3 gap-2 mt-1 h-full w-full">
                          {cores.map((cor, index) => {
                            const [nome, valor] = Object.entries(cor)[0];
                            return (
                              <motion.div
                                whileTap={{ scale: 0.95 }}
                                whileHover={{ scale: 1.02 }}
                                key={index}
                                className="sm:w-11 sm:h-11 w-9 h-9 rounded-full border border-gray-300 shadow-sm cursor-pointer"
                                style={{ backgroundColor: valor }}
                                title={nome}
                              />
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    <div className="w-full flex justify-center py-2">
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        whileHover={{ scale: 1.02 }}
                        id="editar_conta"
                        onClick={closing}
                        className="border border-[#1E2351] w-fit h-fit text-[18px] p-[4px_30px]   rounded-full"
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
      </AnimatePresence>

      {/* h-[calc(100vh-24px)] */}
      <div className=" w-[1800px] max-w-[98%] lg:max-w-[90%] mx-auto py-2 h-[1057px] lg:my-auto gap-3 rounded-[35px] flex justify-center items-center ">
        <div className=" w-full overflow-hidden h-full flex flex-col items-center gap-3">
          <div className=" w-full rounded-[35px] overflow-hidden bg-white p-4 h-full max-h-fit flex flex-col items-center shadow-md border border-[#00000031] ">
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

                    <span className="text-[18px]">03 de Fevereiro de 2025</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 w-full rounded-[35px] overflow-hidden bg-white min-h-fit h-full flex flex-col items-center shadow-md border border-[#00000031]">
            <div className="w-full">
              <h1 className="text-[#1E2351] font-medium text-[30px] w-full pb-1">
                {new Date()
                  .toLocaleDateString("pt-BR", { month: "long" })
                  .replace(/^./, (c) => c.toUpperCase())}{" "}
                {new Date().toLocaleDateString("pt-BR", { year: "numeric" })}
              </h1>
            </div>
            <div className="flex w-full text-[20px] text-[#1E2351] font-medium gap-3">
              <span className="w-full sm:flex hidden">Domingo</span>
              <span className="w-full sm:flex hidden">Segunda</span>
              <span className="w-full sm:flex hidden">Terça</span>
              <span className="w-full sm:flex hidden">Quarta</span>
              <span className="w-full sm:flex hidden">Quinta</span>
              <span className="w-full sm:flex hidden">Sexta</span>
              <span className="w-full sm:flex hidden">Sábado</span>

              <span className="w-full sm:hidden flex">Dom.</span>
              <span className="w-full sm:hidden flex">Seg.</span>
              <span className="w-full sm:hidden flex">Ter.</span>
              <span className="w-full sm:hidden flex">Qua.</span>
              <span className="w-full sm:hidden flex">Qui.</span>
              <span className="w-full sm:hidden flex">Sex.</span>
              <span className="w-full sm:hidden flex">Sáb.</span>
            </div>
            <div className="grid grid-cols-7 text-sm w-full h-full ">
              {generateCalendar().map((day, i) => {
                const today = new Date().toLocaleDateString();

                const isSelected = selectedDate && isSameDay(day, selectedDate);
                const inCurrentMonth = isSameMonth(day, calendarMonth);
                return (
                  <button
                    type="button"
                    key={i}
                    className={`rounded-lg p-2 m-1 flex justify-normal transition text-[18px] text-[#1E2351] ${today === day.toLocaleDateString() && "shadow-[0_5px_10px_rgba(86,50,157)]"} ${
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
                        className={` text-start ${today === day.toLocaleDateString() && "text-purple-500"}`}
                      >
                        {" "}
                        {day.getDate()}{" "}
                      </span>
                      <div className="text-start px-2 max-w-full w-fit rounded-[4px] text-white py-1 bg-[#A554C5] overflow-hidden text-ellipsis whitespace-nowrap">
                        <span>Biologia</span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="xl:flex hidden right_panel flex-col p-4  bg-white rounded-[35px] h-full shadow-md border border-[#00000031] ">
          <div className="flex justify-between w-full">
            <h1 className="text-[#1E2351] font-medium text-[30px] h-fit ">
              Anotações
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

          <div className="flex flex-col gap-2 w-full justify-center">
            {items.map((item: AccordionItem, index) => (
              <motion.div
                id="perguntas"
                key={index}
                whileTap={{ scale: 0.99 }}
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
                className={`border w-[420px] max-w-full min-h-[62px] border-[rgba(18,18,18,0.14)] rounded-[20px]  overflow-hidden shadow-md `}
              >
                {/* Header */}
                <button
                  onClick={() => toggle(index)}
                  style={{ backgroundColor: item?.cor || "white" }}
                  className={`w-full min-h-[62px] flex justify-between transition-all ease-in-out dark items-center px-6 py-4 text-left text-[18px] text-white font-medium `}
                >
                  {item?.sala}

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
                      initial={{ height: 0, opacity: 0, filter: "blur(1px)" }}
                      animate={{
                        height: "auto",
                        opacity: 1,
                        filter: "blur(0px)",
                      }}
                      exit={{ height: 0, opacity: 0, filter: "blur(1px)" }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div
                        style={{ backgroundColor: `${item?.cor}33` || "white" }}
                        className={`px-6 py-2 text-[18px] font-medium text-[#1E2351] `}
                      >
                        {item?.lembrete}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
