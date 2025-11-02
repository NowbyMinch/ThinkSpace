"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import ErrorModal from "@/components/ui/ErrorModal";
import Loading from "@/app/home/components/loading";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

type UserData = {
  primeiroNome?: string;
  cargo?: string;
  foto?: string;
  // add other properties if needed
};
type BannerData = {
  mensagem?: string;
  relatorio?: string;
  relatorioUrl?: string;
  // add other properties if needed
};
type Salas = {
  id: string;
  nome: string;
  descricao: string;
  tipo: "PUBLICA" | "PRIVADA" | string;
  banner: string;
  assunto: string | null;
  avataresUltimosUsuarios: string[];
  criadoEm: string; // ISO date string
  moderadorId: string;
  quantidadeEstudantes: number;
  topicos: string[];
};

const cor = ["#8B81F3", "#CAC5FF", "#FFA6F1", "#FFACA1"];

export default function Materiais() {
  const router = useRouter();
  const [message, setMessage] = useState<string | null>(null);
  const [user, setUser] = useState<UserData>({});
  const [bannerData, setBannerData] = useState<BannerData>({});
  const [loading, setLoading] = useState(false);
  const [salas, setSalas] = useState<Salas[]>([]);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        // Run all fetches in parallel
        const [userRes, salasRes] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/home/identificacao`, {
            method: "GET",
            credentials: "include",
          }),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/sala-estudo`, {
            method: "GET",
            credentials: "include",
          }),
        ]);

        // Parse all JSONs in parallel
        const [userData, salasData] = await Promise.all([
          userRes.json(),
          salasRes.json(),
        ]);

        // ✅ Set states after everything is done
        setUser(userData);
        setSalas(salasData.salas);

        // Extract data from /home/salas-estudo safely

        console.log("✅ All data successfully loaded");
      } catch (err) {
        console.error("Erro ao carregar dados:", err);
        setMessage("Erro ao carregar dados.");
      } finally {
        // ✅ Stop loading only after all requests (success or error)
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

  if (loading) return <Loading />;
  return (
    <>
      <div className="w-full h-full flex flex-col px-4 py-2 gap-4 pb-4">
        <div className="flex w-full sm:flex-row flex-col">
          <div className="w-full flex justify-center bg-blue-200 ">Material</div>
          <hr className="sm:h-full sm:w-[2px] w-full bg-[#D7DDEA] mx-2" />
          <div className="w-full flex justify-center bg-blue-200">Material</div>
        </div>
      </div>
    </>
  );
}
