"use client"

import { useEffect, useState } from "react"
import { Check, ChevronDown, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const frameworks = [
  {
    value: "Esta semana",
    label: "Esta semana",
  },
  {
    value: "Há 1 semana",
    label: "Há 1 semana",
  },
  {
    value: "Há 2 semanas",
    label: "Há 2 semanas",
  },
  {
    value: "Há 3 semanas",
    label: "Há 3 semanas",
  },
]

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
]

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
  }
]

const frameworks4 = [
  {
    value: "Estudante",
    label: "Estudante",
  },
  {
    value: "Admin",
    label: "Admin",
  }
]

type materiaItem = {
    id?: string;
    nome?: string;
    cor?: string;
    icone?: string;
    usuarioId?: string;
    materiais?: any[]; // or specify the correct type if known
    // add other properties if needed
};

export function ComboboxDemo() {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState("")

  return (
    <Popover open={open} onOpenChange={setOpen} >
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[180px] flex gap-4 justify-center rounded-[10px]"
        >
          <span>
            {value
              ? frameworks.find((framework) => framework.value === value)?.label
              : "Selecione a semana"}
          </span>

          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0 rounded-[10px]">
        <Command className="rounded-[10px]">
          <CommandList>
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {frameworks.map((framework) => (
                
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue)
                    setOpen(false)
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
  )
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
          className={`${value ? "" : "text-[rgba(0,0,0,0.6)]"} font-normal text-[20px] h-[58px] w-full rounded-[25px] outline-[rgba(151,103,248,0.6)] border-2 border-[rgba(10,8,9,0.6)] hover:bg-white `}
        >
          <span className="block w-full truncate text-left">
            {value
              ? frameworks2.find((framework) => framework.value === value)?.label
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
          className={`${value ? "" : "text-[rgba(0,0,0,0.6)]"} font-normal text-[20px] h-[58px] w-full rounded-[25px] outline-[rgba(151,103,248,0.6)] border-2 border-[rgba(10,8,9,0.6)] hover:bg-white `}
        >
          <span className="block w-full truncate text-left">
            {value
              ? frameworks3.find((framework) => framework.value === value)?.label
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
          className={`font-normal rounded-[20px] border-[2px] border-[#0d0f224e] pl-2 w-[60%] text-[25px] h-[58px] outline-[#9767F8] `}
        >
          <span className="w-full flex rounded-[25px]">
            {value
              ? frameworks2.find((framework) => framework.value === value.toUpperCase())?.label
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
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild className="">
        <Button
          variant="outline"
          role="combobox"
          className={`font-normal rounded-[20px] border-[2px] border-[#0d0f224e] pl-2 w-[60%] text-[25px] h-[58px] outline-[#9767F8] `}
        >
          <span className="w-full flex rounded-[25px]">
            {value
              ? frameworks4.find((framework) => framework.value === value)?.label
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
      try{
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/materias`, {
              method: 'GET',
              credentials: 'include',
          });
          
          const data = await res.json();
          setMaterias(data)
      } catch (err) {
      console.error(err);
      }
    }; materia();

  }, [])
  

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
    <Popover open={open} onOpenChange={setOpen} >
      <PopoverTrigger asChild className="">
        <Button
          variant="outline"
          role="combobox"
          className={`pl-5 text-[20px] w-full h-[45px] border-2 border-[rgba(0,0,0,0.19)] rounded-[20px] outline-[rgba(151,103,248,0.6)]  `}
        >
          <span className="font-normal w-full block text-left rounded-[25px] overflow-hidden text-ellipsis whitespace-nowrap ">
            {value
              ? <div className="">{frameworksMateria.find((framework) => framework.value === value)?.label as string}</div> 
              : <div className="text-[#9CA3AF]">Matéria designada</div> 
              }
          </span>
        </Button>
      </PopoverTrigger>

      <PopoverContent className="min-w-[200px] p-0 rounded-[25px] z-[1100]">
        <Command>
          <CommandList className="rounded-[25px]">
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup className="">
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
