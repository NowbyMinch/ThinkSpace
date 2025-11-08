"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  ComboboxDemoSettings,
  ComboboxDemoSettings2,
} from "../../components/dropdown";
import ErrorModal from "@/components/ui/ErrorModal";
import { DatePickerConfiguracoes } from "@/components/ui/datepicker";

type UserData = {
  primeiroNome?: string;
  cargo?: string;
  foto?: string;
};

type UsuarioData = {
  primeiroNome?: string;
  cargo?: string;
  foto?: string;
  areaDeInteresse?: string;
  atualizadoEm?: string;
  codigoExpiracao?: string;
  codigoVerificado?: string;
  criadoEm?: string;
  dataNascimento?: string;
  email?: string;
  emailVerificado?: boolean;
  escolaridade?: string;
  funca?: string;
  id?: string;
  instituicaoId?: string;
  nomeCompleto?: string;
  objetivoNaPlataforma?: string;
  senha?: string;
  sobrenome?: string;
  ultimoLogin?: string;
};

export default function Informacoes() {
  const [user, setUser] = useState<UserData>({});
  const [usuario, setUsuario] = useState<UsuarioData>({});
  const [instituicao, setInstituicao] = useState("");
  const [escola, setEscola] = useState("");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<string | null>(null);

  const [configuracoes, setConfiguracoes] = useState({
    primeiroNome: "",
    sobrenome: "",
    dataNascimento: "",
    instituicao: "",
    cargo: "",
    escolaridade: "",
  });

  // Fetch initial data
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // User data
        const resUser = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/home/identificacao`,
          { method: "GET", credentials: "include" }
        );
        const userData = await resUser.json();
        setUser(userData);

        // Usuario configuracoes
        const resUsuario = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/users/configuracoes`,
          { method: "GET", credentials: "include" }
        );
        const dataUsuario = await resUsuario.json();
        const escolaridadeFormatted = (dataUsuario.usuario.escolaridade ?? "")
          .toLowerCase()
          .replace(/^\w/, (c: string) => c.toUpperCase());
        setEscola(escolaridadeFormatted);
        setUsuario(dataUsuario.usuario);

        // Instituicao
        const resInstituicao = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/users/instituicao/nome`,
          { method: "GET", credentials: "include" }
        );
        const dataInstituicao = await resInstituicao.json();
        setInstituicao(dataInstituicao.nome);

        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
        setMessage("Erro ao carregar dados do usuário.");
      }
    };
    fetchData();
  }, []);

  // Update configuracoes after data is loaded
  useEffect(() => {
    if (!loading) {
      setConfiguracoes((prev) => ({
        ...prev,
        primeiroNome: usuario.primeiroNome ?? "",
        sobrenome: usuario.sobrenome ?? "",
        dataNascimento: usuario.dataNascimento ?? "",
        instituicao: instituicao ?? "",
        cargo: user.cargo ?? "",
        escolaridade: escola ?? "",
      }));
    }
  }, [loading]);

  // Reload configuracoes from backend
  const reloadConfiguracoes = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/configuracoes`,
        { method: "GET", credentials: "include" }
      );
      const data = await res.json();
      const escolaridadeFormatted = (data.usuario.escolaridade ?? "")
        .toLowerCase()
        .replace(/^\w/, (c: string) => c.toUpperCase());
      setEscola(escolaridadeFormatted);
      setUsuario(data.usuario);
    } catch (err) {
      console.error(err);
    }
  };

  // PATCH any changed fields
  const Check = async () => {
    try {
      const fieldEndpoints: Record<string, string> = {
        primeiroNome: "/configuracoes/primeiro-nome",
        sobrenome: "/configuracoes/sobrenome",
        dataNascimento: "/configuracoes/data-nascimento",
        instituicao: "/configuracoes/instituicao",
        escolaridade: "/configuracoes/nivel-escolaridade",
      };

      let changedSomething = false;

      for (const key of Object.keys(fieldEndpoints)) {
        if ((configuracoes as any)[key] !== (usuario as any)[key]) {
          changedSomething = true;

          const payload =
            key === "escolaridade"
              ? { nivelEscolaridade: (configuracoes as any)[key] }
              : { [key]: (configuracoes as any)[key] };

          await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}${fieldEndpoints[key]}`,
            {
              method: "PATCH",
              credentials: "include",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(payload),
            }
          );
        }
      }

      // ✅ only reload at the END
      if (changedSomething) {
        window.location.reload();
      }
    } catch (err) {
      console.error("Erro ao atualizar configurações:", err);
      setMessage("Erro ao atualizar configurações");
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center w-full h-full">
        <div className="animate-spin w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full" />
      </div>
    );

  return (
    <>
      {message && (
        <ErrorModal message={message} onClose={() => setMessage(null)} />
      )}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          Check();
        }}
        className="mt-4 flex flex-col gap-4 overflow-hidden w-[90%]"
      >
        {/* Primeiro Nome */}
        <div className="flex flex-col justify-between lg:w-[50%] max-w-[550px]">
          <h1 className="text-[20px] font-medium">Primeiro nome</h1>
          <input
            type="text"
            value={configuracoes.primeiroNome}
            onChange={(e) =>
              setConfiguracoes({
                ...configuracoes,
                primeiroNome: e.target.value,
              })
            }
            className="rounded-[20px] border-[2px] border-[#0d0f224e] pl-2 w-full max-w-[400px] text-[18px] h-[58px] outline-[#9767F8]"
          />
        </div>

        {/* Sobrenome */}
        <div className="flex flex-col justify-between lg:w-[50%] max-w-[550px]">
          <h1 className="text-[20px] font-medium">Sobrenome</h1>
          <input
            type="text"
            value={configuracoes.sobrenome}
            onChange={(e) =>
              setConfiguracoes({ ...configuracoes, sobrenome: e.target.value })
            }
            className="rounded-[20px] border-[2px] border-[#0d0f224e] pl-2 w-full max-w-[400px] text-[18px] h-[58px] outline-[#9767F8]"
          />
        </div>

        {/* Data de Nascimento */}
        <div className="flex flex-col justify-between lg:w-[50%] max-w-[550px]">
          <h1 className="text-[20px] font-medium">Data de Nascimento </h1>

          <DatePickerConfiguracoes
            value={configuracoes.dataNascimento}
            onChange={(value: string) =>
              setConfiguracoes({
                ...configuracoes,
                dataNascimento: value, // <-- value is "YYYY-MM-DD"
              })
            }
          />
        </div>

        {/* Instituição */}
        <div className="flex flex-col justify-between lg:w-[50%] max-w-[550px]">
          <h1 className="text-[20px] font-medium">Instituição</h1>
          <input
            type="text"
            value={configuracoes.instituicao}
            onChange={(e) =>
              setConfiguracoes({
                ...configuracoes,
                instituicao: e.target.value,
              })
            }
            className="rounded-[20px] border-[2px] border-[#0d0f224e] pl-2 w-full max-w-[400px] text-[18px] h-[58px] outline-[#9767F8]"
          />
        </div>

        {/* Cargo */}
        <div className="flex flex-col justify-between lg:w-[50%] max-w-[550px]">
          <h1 className="text-[20px] font-medium">Cargo ou Posição</h1>
          <ComboboxDemoSettings
            value={configuracoes.cargo}
            onChange={(value) =>
              setConfiguracoes({ ...configuracoes, cargo: value })
            }
          />
        </div>

        {/* Escolaridade */}
        <div className="flex flex-col justify-between lg:w-[50%] max-w-[550px]">
          <h1 className="text-[20px] font-medium">Nível de escolaridade</h1>
          <ComboboxDemoSettings2
            value={configuracoes.escolaridade}
            onChange={(value) => {
              setConfiguracoes({ ...configuracoes, escolaridade: value });
              console.log(value);
            }}
          />
        </div>

        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          type="submit"
          id="editar_conta"
          className="mt-2 mb-1 ml-1 py-2 px-10 w-min h-min rounded-[30px] text-[18px] font-medium border border-[#1E2351]"
        >
          Salvar
        </motion.button>
      </form>
    </>
  );
}
