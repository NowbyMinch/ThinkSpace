"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import ErrorModal from "@/components/ui/ErrorModal";
import Loading from "@/app/home/components/loading";

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
export default function Materiais() {
  const [message, setMessage] = useState<string | null>(null);
  const [user, setUser] = useState<UserData>({});
  const [bannerData, setBannerData] = useState<BannerData>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        // Run all fetches in parallel
        const [userRes] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/home/identificacao`, {
            method: "GET",
            credentials: "include",
          }),
        ]);

        // Parse all JSONs in parallel
        const [userData] = await Promise.all([userRes.json()]);

        // ✅ Set states after everything is done
        setUser(userData);

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
      <div className="w-full h-full p-4">a</div>
    </>
  );
}
