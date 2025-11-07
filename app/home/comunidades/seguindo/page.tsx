"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  useState,
  useEffect,
  useRef,
  useContext,
  useMemo,
  createContext,
} from "react";
import ErrorModal from "@/components/ui/ErrorModal";
import Loading from "@/app/home/components/loading";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { SearchContext } from "@/app/context/SearchContext";

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

export default function SalasdeEstudo() {
  const router = useRouter();
  const [message, setMessage] = useState<string | null>(null);
  const [user, setUser] = useState<UserData>({});
  const [bannerData, setBannerData] = useState<BannerData>({});
  const [loading, setLoading] = useState(false);
  const [salas, setSalas] = useState<Salas[]>([]);
  const [avatares, setAvatares] = useState<string[]>([]);

  const { searchTerm } = useContext(SearchContext);

  const filteredPosts = useMemo(() => {
    if (!searchTerm.trim()) return salas;
    return salas.filter((p) =>
      p.nome.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, salas]);

  useEffect(() => {
    const fetchAll = async () => {
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
        // Run all fetches in parallel
        const [userRes, salasRes] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/home/identificacao`, {
            method: "GET",
            credentials: "include",
          }),
          fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/sala-estudo/usuario/${userIDdata1.userId}/salas-participando`,
            {
              method: "GET",
              credentials: "include",
            }
          ),
        ]);

        // Parse all JSONs in parallel
        const [userData, salasData] = await Promise.all([
          userRes.json(),
          salasRes.json(),
        ]);

        // ✅ Set states after everything is done
        setUser(userData);
        const lista = Array.isArray(salasData) ? salasData : [];
        setSalas(lista);
        console.log(salasData);

        lista.forEach((s: Salas) => {
          if (Array.isArray(s.avataresUltimosUsuarios)) {
            setAvatares((prev) => [...prev, ...s.avataresUltimosUsuarios]);
          }
        });

        // Extract data from /home/salas-estudo safely
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
      <div className="w-full h-full flex flex-col px-4 py-2 gap-4 overflow-y-auto overflow-x-hidden">
        {(filteredPosts ?? []).map((sala, index) => {
          const randomColor = cor[Math.floor(Math.random() * cor.length)];

          return (
            <div
              key={index}
              className="w-full min-h-fit border-2 border-[rgba(0,0,0,0.3)] rounded-[35px] shadow-md p-4 flex gap-3 lg:flex-row flex-col"
            >
              {/* WRAPPER NÃO-FLEX PARA EVITAR O BUG */}
              <div className="w-full flex flex-col min-w-[60%]">
                <div className="flex items-center w-full justify-between">
                  <h1 className="font-medium">{sala.nome}</h1>
                </div>

                {/* ✅ WRAPPER NÃO-FLEX COM OVERFLOW CORRETO */}
                <div className="w-full overflow-hidden rounded-[35px]">
                  <div className="w-full h-64 relative">
                    <img
                      src={sala.banner}
                      alt={sala.nome}
                      className="w-full h-full object-cover rounded-[35px]"
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-5 w-full justify-center">
                <div className="flex flex-wrap gap-1 w-full">
                  {(sala.topicos ?? []).slice(0, 5).map((topico, index) => (
                    <span
                      key={index}
                      className="text-[16px] px-3 rounded-full h-fit w-fit shadow-md truncate"
                      style={{
                        backgroundColor:
                          cor[Math.floor(Math.random() * cor.length)],
                      }}
                    >
                      {topico}
                    </span>
                  ))}
                  {sala.topicos.length > 6 && (
                    <span className="text-[16px] px-3 rounded-full h-fit w-fit shadow-md bg-gray-300">
                      +{sala.topicos.length - 5} more
                    </span>
                  )}
                </div>

                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  transition={{ ease: "easeInOut" }}
                  onClick={() =>
                    sala.id &&
                    router.push(
                      `/home/comunidades/salas_de_estudo/${sala.id}/postagens`
                    )
                  }
                  className="text-white font-medium text-[20px] bg-[#1E2351] w-full max-w-[230px] rounded-full py-3 shadow-md"
                >
                  Visualizar
                </motion.button>

                <p className="w-full break-all line-clamp-5">
                  {sala.descricao}
                </p>

                <div className="flex items-center ">
                  <div className="flex -space-x-3">
                    {(sala.avataresUltimosUsuarios ?? [])
                      .slice(0, 4)
                      .map((avatar, index) => (
                        <img
                          key={index}
                          src={avatar}
                          alt="Usuário"
                          className="w-10 h-10 rounded-full border-[3px] border-white object-cover"
                        />
                      ))}

                    {sala.quantidadeEstudantes > 4 && (
                      <div className="w-10 h-10 rounded-full bg-[#9B79E0] border-[3px] border-white flex items-center justify-center text-white text-sm font-medium">
                        +{sala.quantidadeEstudantes - 4}
                      </div>
                    )}
                  </div>

                  <div className="ml-3">
                    <h2 className="text-[18px] leading-none">
                      {sala.quantidadeEstudantes}{" "}
                      {sala.quantidadeEstudantes === 1
                        ? "estudante"
                        : "estudantes"}
                    </h2>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
