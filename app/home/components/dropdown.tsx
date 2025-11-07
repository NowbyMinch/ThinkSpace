"use client";

import { createContext, useContext, useEffect, useState } from "react";
import {
  Check,
  ChevronDown,
  ChevronsLeftRightEllipsis,
  ChevronsUpDown,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { motion, AnimatePresence } from "framer-motion";
import type { TooltipProps } from "recharts";

const frameworks = [
  {
    value: "0",
    label: "Esta semana",
  },
  {
    value: "1",
    label: "Há 1 semana",
  },
  {
    value: "2",
    label: "Há 2 semanas",
  },
  {
    value: "3",
    label: "Há 3 semanas",
  },
];

const frameworks2 = [
  {
    value: "FUNDAMENTAL_INCOMPLETO",
    label: "Fundamental incompleto",
  },
  {
    value: "FUNDAMENTAL_COMPLETO",
    label: "Fundamental completo",
  },
  {
    value: "MEDIO_INCOMPLETO",
    label: "Médio incompleto",
  },
  {
    value: "MEDIO_COMPLETO",
    label: "Médio completo",
  },
  {
    value: "SUPERIOR_INCOMPLETO",
    label: "Superior incompleto",
  },
  {
    value: "SUPERIOR_COMPLETO",
    label: "Superior completo",
  },
  {
    value: "POS_GRADUACAO",
    label: "Pós-graduação",
  },
  {
    value: "MESTRADO",
    label: "Mestrado",
  },
  {
    value: "DOUTORADO",
    label: "Doutorado",
  },
  {
    value: "PREFIRO_NAO_INFORMAR",
    label: "Prefiro não informar",
  },
];

const frameworks3 = [
  {
    value: "PREPARACAO_PARA_VESTIBULAR",
    label: "Preparação para vestibular",
  },
  {
    value: "APRENDIZADO_CONTINUO",
    label: "Aprendizado contínuo",
  },
  {
    value: "REFORÇO_ESCOLAR",
    label: "Reforço escolar",
  },
  {
    value: "PREFIRO_NAO_INFORMAR",
    label: "Prefiro não informar",
  },
  {
    value: "OUTRO",
    label: "Outro",
  },
];

const frameworks4 = [
  {
    value: "Estudante",
    label: "Estudante",
  },
  {
    value: "Admin",
    label: "Admin",
  },
];

interface Material {
  nomeDesignado: string;
  // add other fields if needed
}


type MelhorMateria = {
  nome: string;
  xp: number;
  cor: string;
  icone: string;
};
type MetricasUser = {
  acertos: number;
  erros: number;
  fimSemana: string;
  inicioSemana: string;
  melhoresMaterias: MelhorMateria[];
  percentualAcertos: number;
  percentualErros: number;
  questoesPorDia: QuestoesPorDia;
  rendimentoSemanal: number;
  totalQuestoes: number;
  xp: number;
};
type QuestoesPorDia = {
  [data: string]: number;
};
interface QuestoesPorDiaItem {
  dia: string; // "Dia 1", "Dia 2", ...
  atividades: number; // how many activities
}
type QuestoesPorDiaLista = QuestoesPorDiaItem[];
function buildQuestoesPorDiaLista(
  questoesPorDia: QuestoesPorDia
): QuestoesPorDiaLista {
  const dates = Object.keys(questoesPorDia);

  const lista: QuestoesPorDiaLista = Array.from({ length: 7 }, (_, i) => ({
    dia: `Dia ${i + 1}`,
    atividades: 0,
  }));

  dates.forEach((date, idx) => {
    if (idx < 7) {
      lista[idx].atividades = questoesPorDia[date] ?? 0;
    }
  });

  return lista; // <-- 🔴 make sure you actually return
}

export function ComboboxDemo({
  onChange,
}: {
  onChange: (value: number) => void;
}) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<number | null>(0);

  const handleSelect = (currentValue: string) => {
    const newValue = Number(currentValue);
    setValue(newValue);
    onChange(newValue); // 🔑 send value back to parent
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-fit min-w-[180px] flex gap-4 justify-center rounded-[10px]"
        >
          <span>
            {value === 0
              ? "Esta semana"
              : frameworks.find((f) => Number(f.value) === value)?.label}
          </span>

          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0 rounded-[10px]">
        <Command className="rounded-[10px]">
          <CommandList>
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {frameworks.map((f) => (
                <CommandItem
                  key={f.value}
                  value={f.value}
                  onSelect={handleSelect}
                >
                  {f.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

const CustomTooltip = ({ active, payload }: TooltipProps<number, string>) => {
  if (!active || !payload || payload.length === 0) return null;

  const atividades = payload[0].value;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ scale: 0.5 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.5 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        className="bg-white rounded-xl shadow p-3 text-center origin-top-left"
      >
        <p className="text-xl font-bold">{atividades}</p>
        <p className="text-base ">Questões feitas</p>
      </motion.div>
    </AnimatePresence>
  );
};

export const Chart = ({ selectedWeek }: { selectedWeek: number }) => {
  const [metricasUser, setMetricasUser] = useState<MetricasUser>();
  const [isClient, setIsClient] = useState(false);

  const [userID, setUserID] = useState("");

  useEffect(() => {
    const UserID = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/id`, {
          method: "GET",
          credentials: "include",
        });

        const data = await res.json();
        // console.log("UserID: ", data);
        setUserID(data.userId);
      } catch (err) {
        console.error(err);
      }
    };
    UserID();
  }, []);

  useEffect(() => {
    if (!userID) return;

    const fetchMetricas = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/metricas/${userID}?weeksAgo=${selectedWeek}`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        const data = await res.json();
        console.log("Metricas:", data);
        setMetricasUser(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchMetricas();
  }, [userID, selectedWeek]);

  const [questoesPorDiaLista, setQuestoesPorDiaLista] =
    useState<QuestoesPorDiaLista>([]);

  useEffect(() => {
    if (metricasUser) {
      const data = buildQuestoesPorDiaLista(metricasUser.questoesPorDia);
      setQuestoesPorDiaLista(data); // ✅ now works
      console.log("Questões por dia lista:", data);
    }
  }, [metricasUser]);

  // ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <>
      <div className="w-[770px] max-w-full overflow-hidden">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            height={300}
            data={questoesPorDiaLista}
            margin={{ top: 12, left: -35, bottom: 0, right: 0 }}
          >
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <XAxis stroke="#666" dataKey="dia" />
            <YAxis
              dataKey="atividades"
              domain={[0, "auto"]} // ensures 0 is at bottom
              allowDecimals={false}
            />
            <Line
              type="monotone"
              dataKey="atividades"
              strokeWidth={4}
              stroke="#9767F8"
            />
            <Tooltip content={CustomTooltip} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default function Charting() {
  const [selectedWeek, setSelectedWeek] = useState<number>(0);
  const [metricasUser, setMetricasUser] = useState<MetricasUser>();

  const [userID, setUserID] = useState("");

  useEffect(() => {
    const UserID = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/id`, {
          method: "GET",
          credentials: "include",
        });

        const data = await res.json();
        // console.log("UserID: ", data);
        setUserID(data.userId);
      } catch (err) {
        console.error(err);
      }
    };
    UserID();
  }, []);

  useEffect(() => {
    if (!userID) return;

    const fetchMetricas = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/metricas/${userID}?weeksAgo=${selectedWeek}`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        const data = await res.json();
        console.log("Metricas:", data);
        setMetricasUser(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchMetricas();
  }, [userID, selectedWeek]);

  return (
    <>
      <div className="w-full grid grid-cols-[1fr_1fr_1fr] mt-5 ">
        <div className="flex justify-center">
          <div className="w-[80%] flex flex-col justify-between">
            <h2 className="text-[20px] leading-[25px]">Rendimento semanal</h2>
            <div className="">
              <div className="w-full h-[2px] mt-2 bg-[rgba(0,0,0,0.23)]"></div>
              <h1 className="text-[50px] leading-[60px] font-medium text-[#866ABF]">
                {metricasUser?.rendimentoSemanal}%
              </h1>
            </div>
          </div>
        </div>

        <div className=" flex justify-center ">
          <div className="w-[80%] flex flex-col justify-between">
            <h2 className="text-[20px] leading-[25px] flex justify-between items-center">
              Acertos
              <div className="bg-[#FF9F93] w-[25px] h-[25px] rounded-full flex justify-center items-center text-[18px] text-white ">
                {metricasUser?.acertos}
              </div>
            </h2>
            <div className="">
              <div className="w-full h-[2px] mt-2 bg-[rgba(0,0,0,0.23)]"></div>
              <h1 className="text-[50px] leading-[60px] font-medium text-[#866ABF]">
                {metricasUser?.percentualAcertos}%
              </h1>
            </div>
          </div>
        </div>

        <div className=" flex justify-end">
          <div className="w-[80%] flex flex-col justify-between">
            <h2 className="text-[20px] leading-[25px] flex justify-between items-center">
              Erros
              <div className="bg-[#9767F8] w-[25px] h-[25px] rounded-full flex justify-center items-center text-[18px] text-white ">
                {metricasUser?.erros}
              </div>
            </h2>
            <div className="">
              <div className="w-full h-[2px] mt-2 bg-[rgba(0,0,0,0.23)]"></div>
              <h1 className="text-[50px] leading-[60px] font-medium text-[#866ABF]">
                {metricasUser?.percentualErros}%
              </h1>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-2 flex flex-col justify-between gap-1 ">
        <h1 className="w-full font-medium flex items-end justify-between text-[30px] ">
          Atividades
          <ComboboxDemo onChange={setSelectedWeek} />
        </h1>
        {/* Combobox "returns" its value via onChange callback */}

        {/* Chart can now use it */}
        <Chart selectedWeek={selectedWeek} />
      </div>
    </>
  );
}

export function Metrica() {
  const [selectedWeek, setSelectedWeek] = useState<number>(0);
  const [metricasUser, setMetricasUser] = useState<MetricasUser>();

  const [userID, setUserID] = useState("");

  useEffect(() => {
    const UserID = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/id`, {
          method: "GET",
          credentials: "include",
        });

        const data = await res.json();
        // console.log("UserID: ", data);
        setUserID(data.userId);
      } catch (err) {
        console.error(err);
      }
    };
    UserID();
  }, []);

  useEffect(() => {
    if (!userID) return;

    const fetchMetricas = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/metricas/${userID}?weeksAgo=${selectedWeek}`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        const data = await res.json();
        console.log("Metricas:", data);
        setMetricasUser(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchMetricas();
  }, [userID, selectedWeek]);

  return <></>;
}

type Sala = {
  id: string;
  nome: string;
  descricao: string;
  topicos: string[];
  banner: string;
  moderadorId: string;
  assuntoId: string | null;
  criadoEm: string;
};


interface ComboboxDemoPropsMetricas {
  value: string;
  onChange: (value: string) => void;
}

export function ComboboxDemomMetricas({ value, onChange }: ComboboxDemoPropsMetricas) {
  const [open, setOpen] = useState(false);
  const [salas, setSalas] = useState<Sala[]>([]);

  useEffect(() => {
    const salasDeEstudo = async () => {
      const userIDRes1 = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/id`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      const userIDdata1 = await userIDRes1.json(); // parse the response
      // setUserID(userIDdata1.userId); // set the state

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/sala-estudo/usuario/${userIDdata1.userId}/salas-participando`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        const data = await res.json();
        setSalas(data);

        console.log("DATA HAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHA", data);
      } catch (err) {
        console.error(err);
      }
    };
    salasDeEstudo();
  }, []);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-fit min-w-[180px] flex gap-4 justify-center rounded-[10px]"
        >
          <span>
            {value
              ? salas.find((framework) => framework.nome === value)?.nome
              : "Selecione a sala de estudo"}
          </span>

          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0 rounded-[10px]">
        <Command className="rounded-[10px]">
          <CommandList>
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {salas
                ? salas.map((framework) => (
                    <CommandItem
                      key={framework.id}
                      value={framework.nome}
                      className="text-[18px]"
                      onSelect={(currentValue) => {
                        onChange(currentValue === value ? "" : currentValue);
                        setOpen(false);
                      }}
                    >
                      {framework.nome}
                      <Check
                        className={cn(
                          "ml-auto",
                          value === framework.nome ? "opacity-100" : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))
                : ""}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

interface ComboboxDemoProps {
  value: string;
  onChange: (value: string) => void;
}

export function ComboboxDemo2({ value, onChange }: ComboboxDemoProps) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild className="">
        <Button
          variant="outline"
          role="combobox"
          className={`${value ? "" : "text-[rgba(0,0,0,0.6)]"} font-normal text-[18px] h-[58px] w-full rounded-[25px] outline-[rgba(151,103,248,0.6)] border-2 border-[rgba(10,8,9,0.6)] hover:bg-white `}
        >
          <span className="block w-full truncate text-left">
            {value
              ? frameworks2.find((framework) => framework.value === value)
                  ?.label
              : "Selecione o nível de escolaridade"}
          </span>
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-[500px] p-0 rounded-[25px] ">
        <Command>
          <CommandList className="rounded-[25px]">
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup className="">
              {frameworks2.map((framework) => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  className="text-[18px]"
                  onSelect={(currentValue) => {
                    onChange(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  {framework.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === framework.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export function ComboboxDemo3({ value, onChange }: ComboboxDemoProps) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild className="">
        <Button
          variant="outline"
          role="combobox"
          className={`${value ? "" : "text-[rgba(0,0,0,0.6)]"} font-normal text-[18px] h-[58px] w-full rounded-[25px] outline-[rgba(151,103,248,0.6)] border-2 border-[rgba(10,8,9,0.6)] hover:bg-white `}
        >
          <span className="block w-full truncate text-left">
            {value
              ? frameworks3.find((framework) => framework.value === value)
                  ?.label
              : "Selecione o seu objetivo na plataforma"}
          </span>
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-[500px] p-0 rounded-[25px] ">
        <Command>
          <CommandList className="rounded-[25px]">
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup className="">
              {frameworks3.map((framework) => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  className="text-[18px]"
                  onSelect={(currentValue) => {
                    onChange(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  {framework.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === framework.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export function ComboboxDemoSettings2({ value, onChange }: ComboboxDemoProps) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild className="">
        <Button
          variant="outline"
          role="combobox"
          className={`font-normal rounded-[20px] border-[2px] border-[#0d0f224e] pl-2 w-full max-w-[400px] text-[18px] h-[58px] outline-[#9767F8] `}
        >
          <span className="w-full flex rounded-[25px]">
            {value
              ? frameworks2.find(
                  (framework) => framework.value === value.toUpperCase()
                )?.label
              : "Selecione o nível de escolaridade"}
          </span>
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-[500px] p-0 rounded-[25px] ">
        <Command>
          <CommandList className="rounded-[25px]">
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup className="">
              {frameworks2.map((framework) => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  className="text-[18px]"
                  onSelect={(currentValue) => {
                    onChange(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  {framework.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === framework.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export function ComboboxDemoSettings({ value, onChange }: ComboboxDemoProps) {
  const [open, setOpen] = useState(false);
  // const [ user, setUser ] = useState<UserData>({});
  // const [ escola, setEscola ] = useState("");
  // let escolaridade = "";

  //   useEffect(() => {
  //     const user = async () => {
  //         try{
  //             const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/home/identificacao`, {
  //             method: 'GET',
  //             credentials: 'include',
  //             });

  //             const data = await res.json();
  //             setUser(data)
  //         } catch (err) {
  //             // setMessage("Erro ao carregar saudação.");
  //             console.error(err);
  //         }
  //     }; user();

  //     const e = async () => {
  //       try{
  //         const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/configuracoes`, {
  //           method: 'GET',
  //           credentials: 'include',
  //         });

  //         const data = await res.json();
  //         escolaridade = ((data.usuario.escolaridade).toLowerCase()).replace(/^\w/, (c: string) => c.toUpperCase());
  //         setEscola(escolaridade);
  //       } catch (err) {
  //         // setMessage("Erro ao carregar saudação.");
  //         console.error(err);
  //       }
  //     }; e();

  //   }, []);

  return (
    <Popover open={false} onOpenChange={setOpen}>
      <PopoverTrigger asChild className="">
        <Button
          variant="outline"
          role="combobox"
          className={`font-normal rounded-[20px] border-[2px] border-[#0d0f224e] pl-2 w-full max-w-[400px] text-[18px] h-[58px] outline-[#9767F8] `}
        >
          <span className="w-full flex rounded-[25px]">
            {value
              ? frameworks4.find((framework) => framework.value === value)
                  ?.label
              : "Selecione o nível de escolaridade"}
          </span>
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-[500px] p-0 rounded-[25px] ">
        <Command>
          <CommandList className="rounded-[25px]">
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup className="">
              {frameworks4.map((framework) => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  className="text-[18px]"
                  onSelect={(currentValue) => {
                    onChange(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  {framework.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === framework.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export function ComboboxDemoMateria({ value, onChange }: ComboboxDemoProps) {
  const [open, setOpen] = useState(false);
  const [materias, setMaterias] = useState<materiaItem[]>([]);

  useEffect(() => {
    // Função para buscar matérias
    const materia = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/materias`, {
          method: "GET",
          credentials: "include",
        });

        const data = await res.json();
        setMaterias(data);
      } catch (err) {
        console.error(err);
      }
    };
    materia();
  }, []);

  const frameworksMateria = materias.map((materia) => ({
    value: materia.nome,
    label: materia.nome,
  }));

  // const [ user, setUser ] = useState<UserData>({});
  // const [ escola, setEscola ] = useState("");
  // let escolaridade = "";

  //   useEffect(() => {
  //     const user = async () => {
  //         try{
  //             const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/home/identificacao`, {
  //             method: 'GET',
  //             credentials: 'include',
  //             });

  //             const data = await res.json();
  //             setUser(data)
  //         } catch (err) {
  //             // setMessage("Erro ao carregar saudação.");
  //             console.error(err);
  //         }
  //     }; user();

  //     const e = async () => {
  //       try{
  //         const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/configuracoes`, {
  //           method: 'GET',
  //           credentials: 'include',
  //         });

  //         const data = await res.json();
  //         escolaridade = ((data.usuario.escolaridade).toLowerCase()).replace(/^\w/, (c: string) => c.toUpperCase());
  //         setEscola(escolaridade);
  //       } catch (err) {
  //         // setMessage("Erro ao carregar saudação.");
  //         console.error(err);
  //       }
  //     }; e();

  //   }, []);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild className="">
        <Button
          variant="outline"
          role="combobox"
          className={`pl-5 text-[18px] w-full max-w-[500px] h-[45px] border-2 border-[rgba(0,0,0,0.19)] rounded-[20px] outline-[rgba(151,103,248,0.6)]  `}
        >
          <span className="font-normal w-full block text-left rounded-[20px] overflow-hidden text-ellipsis whitespace-nowrap ">
            {value ? (
              <div className="">
                {
                  frameworksMateria.find(
                    (framework) => framework.value === value
                  )?.label as string
                }
              </div>
            ) : (
              <div className="text-[#9CA3AF]">Matéria designada</div>
            )}
          </span>
        </Button>
      </PopoverTrigger>

      <PopoverContent className="min-w-[200px] p-0 rounded-[20px] z-[1100] ">
        <Command className="rounded-[20px]">
          <CommandList className="rounded-[20px] ">
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup className="rounded-[20px]">
              {frameworksMateria.map((framework) => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  className="text-[18px] "
                  onSelect={(currentValue) => {
                    onChange(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  {framework.label}
                  <Check
                    className={cn(
                      "ml-auto ",
                      value === framework.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export function ComboboxDemoMateriaPostar({ value, onChange }: ComboboxDemoProps) {
  const [open, setOpen] = useState(false);
  const [materias, setMaterias] = useState<materiaItem[]>([]);

  useEffect(() => {
    // Função para buscar matérias
    const materia = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/materias`, {
          method: "GET",
          credentials: "include",
        });

        const data = await res.json();
        setMaterias(data);
      } catch (err) {
        console.error(err);
      }
    };
    materia();
  }, []);

  const frameworksMateria = materias.map((materia) => ({
    value: materia.id,
    label: materia.nome,
  }));

  // const [ user, setUser ] = useState<UserData>({});
  // const [ escola, setEscola ] = useState("");
  // let escolaridade = "";

  //   useEffect(() => {
  //     const user = async () => {
  //         try{
  //             const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/home/identificacao`, {
  //             method: 'GET',
  //             credentials: 'include',
  //             });

  //             const data = await res.json();
  //             setUser(data)
  //         } catch (err) {
  //             // setMessage("Erro ao carregar saudação.");
  //             console.error(err);
  //         }
  //     }; user();

  //     const e = async () => {
  //       try{
  //         const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/configuracoes`, {
  //           method: 'GET',
  //           credentials: 'include',
  //         });

  //         const data = await res.json();
  //         escolaridade = ((data.usuario.escolaridade).toLowerCase()).replace(/^\w/, (c: string) => c.toUpperCase());
  //         setEscola(escolaridade);
  //       } catch (err) {
  //         // setMessage("Erro ao carregar saudação.");
  //         console.error(err);
  //       }
  //     }; e();

  //   }, []);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild className="">
        <Button
          variant="outline"
          role="combobox"
          className={`pl-5 text-[18px] w-full max-w-[500px] h-[45px] border-2 border-[rgba(0,0,0,0.19)] rounded-[20px] outline-[rgba(151,103,248,0.6)]  `}
        >
          <span className="font-normal w-full block text-left rounded-[20px] overflow-hidden text-ellipsis whitespace-nowrap ">
            {value ? (
              <div className="">
                {
                  frameworksMateria.find(
                    (framework) => framework.value === value
                  )?.label as string
                }
              </div>
            ) : (
              <div className="text-[#9CA3AF]">Matéria designada</div>
            )}
          </span>
        </Button>
      </PopoverTrigger>

      <PopoverContent className="min-w-[200px] p-0 rounded-[20px] z-[1100] ">
        <Command className="rounded-[20px]">
          <CommandList className="rounded-[20px] ">
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup className="rounded-[20px]">
              {frameworksMateria.map((framework) => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  className="text-[18px] "
                  onSelect={(currentValue) => {
                    onChange(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  {framework.label}
                  <Check
                    className={cn(
                      "ml-auto ",
                      value === framework.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

type materiaItem = {
  id?: string;
  nome?: string;
  cor?: string;
  icone?: string;
  usuarioId?: string;
  materiais?: Material[]; // or specify the correct type if known
  // add other properties if needed
};
type materialType = {
  id: string;
  titulo: string;
  origem: string; // e.g. "TOPICOS"
  tipoMaterial: string; // e.g. "COMPLETO"
  nomeDesignado: string;
  autorId: string;
  materiaId: string | null;
  assunto: string | null;
  caminhoArquivo: string | null;
  chatHistoryJson: string | null;
  conteudo: string | null;
  criadoEm: string; // ISO date string
  flashcardsJson: string | null; // JSON string of flashcards
  quizzesJson: string | null; // JSON string of quizzes
  respostasQuizJson: string | null; // JSON string of quiz responses
  resumoIA: string | null;
  quantidadeFlashcards: number | null;
  quantidadeQuestoes: number | null;
  pdfBinario: string | null;
  tempoAtivo: number;
  topicos?: string[];
};
export type ComboboxDemoPropsPostar = {
  value: string;
  onChange: (value: string, materiaId: string | null) => void;
};

export function ComboboxDemoMaterial({
  value,
  onChange,
}: ComboboxDemoPropsPostar) {
  const [open, setOpen] = useState(false);
  const [materias, setMaterias] = useState<materialType[]>([]);

  useEffect(() => {
    const materia = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/materiais`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        const data = await res.json();
        setMaterias(data.materiais);
      } catch (err) {
        console.error(err);
      }
    };
    materia();
  }, []);

  const frameworksMateria = materias.map((materia) => ({
    value: materia.id,
    label: materia.titulo,
    materiaId: materia.materiaId,
  }));

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          className="pl-5 text-[18px] w-full max-w-[500px] h-[45px] border-2 border-[rgba(0,0,0,0.19)] rounded-[20px]"
        >
          <span className="font-normal w-full block text-left overflow-hidden text-ellipsis whitespace-nowrap">
            {value ? (
              (frameworksMateria.find((f) => f.value === value)?.label ??
              "Selecionar")
            ) : (
              <div className="text-[#9CA3AF]">Matéria designada</div>
            )}
          </span>
        </Button>
      </PopoverTrigger>

      <PopoverContent className="min-w-[200px] p-0 rounded-[20px] z-[1100]">
        <Command>
          <CommandList>
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {frameworksMateria.map((framework, index) => (
                <CommandItem
                  key={index}
                  value={framework.value}
                  className="text-[18px]"
                  onSelect={() => {
                    onChange(framework.value, framework.materiaId);
                    setOpen(false);
                  }}
                >
                  {framework.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === framework.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}


export function CalendarioRepeticao({ value, onChange }: ComboboxDemoProps) {
  const [open, setOpen] = useState(false);
  const [materias, setMaterias] = useState<materiaItem[]>([]);

  useEffect(() => {
    // Função para buscar matérias
    const materia = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/materias`, {
          method: "GET",
          credentials: "include",
        });

        const data = await res.json();
        setMaterias(data);
      } catch (err) {
        console.error(err);
      }
    };
    materia();
  }, []);

  const frameworksRepeticao = [
    {
      value: "nao_repetir",
      label: "Não repetir",
    },
    {
      value: "diario",
      label: "A cada dia",
    },
    {
      value: "semanal",
      label: "A cada semana",
    },
    {
      value: "mensal",
      label: "A cada mês",
    },
  ];

  // const [ user, setUser ] = useState<UserData>({});
  // const [ escola, setEscola ] = useState("");
  // let escolaridade = "";

  //   useEffect(() => {
  //     const user = async () => {
  //         try{
  //             const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/home/identificacao`, {
  //             method: 'GET',
  //             credentials: 'include',
  //             });

  //             const data = await res.json();
  //             setUser(data)
  //         } catch (err) {
  //             // setMessage("Erro ao carregar saudação.");
  //             console.error(err);
  //         }
  //     }; user();

  //     const e = async () => {
  //       try{
  //         const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/configuracoes`, {
  //           method: 'GET',
  //           credentials: 'include',
  //         });

  //         const data = await res.json();
  //         escolaridade = ((data.usuario.escolaridade).toLowerCase()).replace(/^\w/, (c: string) => c.toUpperCase());
  //         setEscola(escolaridade);
  //       } catch (err) {
  //         // setMessage("Erro ao carregar saudação.");
  //         console.error(err);
  //       }
  //     }; e();

  //   }, []);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild className="">
        <Button
          variant="outline"
          role="combobox"
          className={`pl-5 text-[18px] w-full max-w-[500px] h-[45px] border-2 border-[rgba(0,0,0,0.19)] rounded-[20px] outline-[rgba(151,103,248,0.6)]  `}
        >
          <span className="font-normal w-full block text-left rounded-[20px] overflow-hidden text-ellipsis whitespace-nowrap ">
            {value ? (
              <div className="">
                {
                  frameworksRepeticao.find(
                    (framework) => framework.value === value
                  )?.label as string
                }
              </div>
            ) : (
              <div className="text-[#9CA3AF]">Repetição</div>
            )}
          </span>
        </Button>
      </PopoverTrigger>

      <PopoverContent className="min-w-[200px] p-0 rounded-[20px] z-[1100] ">
        <Command className="rounded-[20px]">
          <CommandList className="rounded-[20px] ">
            <CommandEmpty>Repetir.</CommandEmpty>
            <CommandGroup className="rounded-[20px]">
              {frameworksRepeticao.map((framework) => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  className="text-[18px] "
                  onSelect={(currentValue) => {
                    onChange(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  {framework.label}
                  <Check
                    className={cn(
                      "ml-auto ",
                      value === framework.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}


interface CalendarioDuracaoProps {
  value: {
    repeticao: string;
    duracao: string;
  };
  onChange: (value: { repeticao: string; duracao: string }) => void;
}

export function CalendarioDuracao({ value, onChange }: CalendarioDuracaoProps) {
  const [open, setOpen] = useState(false);
  const [materias, setMaterias] = useState<materiaItem[]>([]);
  const [repeticao, setRepeticao] = useState(value.repeticao || "");

  useEffect(() => {
    const fetchMaterias = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/materias`, {
          credentials: "include",
        });
        const data = await res.json();
        setMaterias(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchMaterias();
  }, []);

  const frameworksDuracao = [
    { value: "sempre", label: "Sempre" },
    { value: "ate_data_marcada", label: "Até a data marcada" },
  ];

  return (
    <div className="w-full flex gap-2">
      {/* First select — matéria */}
      <CalendarioRepeticao
        value={repeticao}
        onChange={(newMateria) => {
          setRepeticao(newMateria);
          onChange({ ...value, repeticao: newMateria }); // 🔹 send both values up
        }}
      />

      {/* Second select — duração */}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            className="pl-5 text-[18px] min-w-[40%] max-w-[500px] h-[45px] border-2 border-[rgba(0,0,0,0.19)] rounded-[20px] outline-[rgba(151,103,248,0.6)]"
          >
            <span className="font-normal w-full block text-left rounded-[20px] overflow-hidden text-ellipsis whitespace-nowrap ">
              {value.duracao ? (
                frameworksDuracao.find((f) => f.value === value.duracao)?.label
              ) : (
                <div className="text-[#9CA3AF]">Duração</div>
              )}
            </span>
          </Button>
        </PopoverTrigger>

        <PopoverContent className="min-w-[200px] p-0 rounded-[20px] z-[1100]">
          <Command className="rounded-[20px]">
            <CommandList>
              <CommandEmpty>Escolher duração.</CommandEmpty>
              <CommandGroup>
                {frameworksDuracao.map((framework) => (
                  <CommandItem
                    key={framework.value}
                    value={framework.value}
                    className="text-[18px]"
                    onSelect={(duracaoSelecionada) => {
                      const newDuracao =
                        duracaoSelecionada === value.duracao
                          ? ""
                          : duracaoSelecionada;
                      onChange({ ...value, duracao: newDuracao }); // 🔹 send both values up
                      setOpen(false);
                    }}
                  >
                    {framework.label}
                    <Check
                      className={cn(
                        "ml-auto",
                        value.duracao === framework.value
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
