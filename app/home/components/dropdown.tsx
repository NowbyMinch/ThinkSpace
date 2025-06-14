"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
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

export function ComboboxDemo() {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")

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
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild className="">
        <Button
          variant="outline"
          role="combobox"
          className={`${value ? "" : "text-[rgba(0,0,0,0.6)]"} font-normal text-[20px] h-[60px] w-full rounded-[25px] outline-[rgba(151,103,248,0.6)] border-2 border-[rgba(10,8,9,0.6)] hover:bg-white `}
        >
          <span className="w-full flex rounded-[25px]">
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
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild className="">
        <Button
          variant="outline"
          role="combobox"
          className={`${value ? "" : "text-[rgba(0,0,0,0.6)]"} font-normal text-[20px] h-[60px] w-full rounded-[25px] outline-[rgba(151,103,248,0.6)] border-2 border-[rgba(10,8,9,0.6)] hover:bg-white `}
        >
          <span className="w-full flex rounded-[25px]">
            {value
              ? frameworks3.find((framework) => framework.value === value)?.label
              : "Selecione o nível de escolaridade"}
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