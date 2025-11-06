"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import ErrorModal from "@/components/ui/ErrorModal";
import Loading from "@/app/home/components/loading";
import { Plus, SendHorizonal, X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { Backdrop3 } from "@/app/home/components/backdrop";
import {
  ComboboxDemoMateria,
  ComboboxDemoMaterial,
  ComboboxDemoMateriaPostar,
} from "@/app/home/components/dropdown";
import { marked } from "marked";

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

type Autor = {
  id?: string;
  nome: string;
  foto: string;
};

type Materia = {
  nome: string;
  cor?: string;
  icone?: string;
};

type Quiz = {
  pergunta: string;
  alternativas: string[];
  correta: string;
};

type Flashcard = {
  pergunta: string;
  resposta: string;
};

type MaterialInterno = {
  id: string;
  titulo: string;
  assunto?: string;
  conteudo?: string;
  quizzesJson?: string; // JSON de Quiz[]
  respostasQuizJson?: string | null;
  flashcardsJson?: string; // JSON de Flashcard[]
  resumoIA?: string;
  tipoMaterial?: string;
  nomeDesignado?: string;
  caminhoArquivo?: string | null;
  topicos?: string[];
  quantidadeFlashcards?: number;
  quantidadeQuestoes?: number;
  chatHistoryJson?: string | null;
};

type MaterialCompleto = {
  atribuidoEm?: string;
  autor?: Autor;
  materia?: Materia;
  material: MaterialInterno; // <---- tudo dentro de 'material'
  materiaId?: string;
  autorId?: string;
  origem?: string;
  pdfBinario?: string | null;
  criadoEm?: string;
  tempoAtivo?: number;
  tags?: string[];
};
export default function Materiais() {
  const router = useRouter();
  const pathname = usePathname();
  const [message, setMessage] = useState<string | null>(null);
  const [user, setUser] = useState<UserData>({});
  const [bannerData, setBannerData] = useState<BannerData>({});
  const [loading, setLoading] = useState(false);
  const [salas, setSalas] = useState<Salas[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [open, setOpen] = useState(false);
  const [topicos, setTopicos] = useState<string[]>([]);
  const [topicoInput, setTopicoInput] = useState("");
  const [materiaDesignada, setMateriaDesignada] = useState("");
  const [materialDesignado, setMaterialDesignado] = useState("");
  const [material, setMaterial] = useState<MaterialCompleto[]>([]);
  const [open2, setOpen2] = useState(false);
  const [materialID, setMaterialID] = useState("");

  const fetchAll = async () => {
    try {
      // Run all fetches in parallel
      const [userRes, salasRes, materiaisRes] = await Promise.all([
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/home/identificacao`, {
          method: "GET",
          credentials: "include",
        }),
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/sala-estudo`, {
          method: "GET",
          credentials: "include",
        }),
        fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/sala-estudo/sala/${pathname.split("/")[4]}/materiais`,
          {
            method: "GET",
            credentials: "include",
          }
        ),
      ]);

      // Parse all JSONs in parallel
      const [userData, salasData, materiaisData] = await Promise.all([
        userRes.json(),
        salasRes.json(),
        materiaisRes.json(),
      ]);

      // ✅ Set states after everything is done
      setUser(userData);
      setSalas(salasData.salas);
      setMaterial(materiaisData);

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

  useEffect(() => {
    const fetchAll = async () => {
      try {
        // Run all fetches in parallel
        const [userRes, salasRes, materiaisRes] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/home/identificacao`, {
            method: "GET",
            credentials: "include",
          }),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/sala-estudo`, {
            method: "GET",
            credentials: "include",
          }),
          fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/sala-estudo/sala/${pathname.split("/")[4]}/materiais`,
            {
              method: "GET",
              credentials: "include",
            }
          ),
        ]);

        // Parse all JSONs in parallel
        const [userData, salasData, materiaisData] = await Promise.all([
          userRes.json(),
          salasRes.json(),
          materiaisRes.json(),
        ]);

        // ✅ Set states after everything is done
        setUser(userData);
        setSalas(salasData.salas);
        setMaterial(materiaisData);

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

  function closing() {
    setOpen(false);
    setOpen2(false);
    setMaterialDesignado("");
    setMateriaDesignada("");
    setMaterialID("");
    setTopicos([]);
  }

  const postarMaterial = async () => {
    const userRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/id`, {
      method: "GET",
      credentials: "include",
    });
    const userData = await userRes.json();

    const payload = {
      salaId: pathname.split("/")[4],
      materialId: materialDesignado,
      materiaId: materiaDesignada,
      autorId: userData.userId,
      tags: topicos.length ? topicos : [],
    };

    console.log("Payload enviado:", payload);

    const Res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/sala-estudo/sala/${pathname.split("/")[4]}/publicar-material`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        credentials: "include",
      }
    );

    const Data = await Res.json();
    console.log(Data, "POSTANDO UM MATERIAL");
    if (Data.error) {
      setMessage(Data.error);
    } else {
      fetchAll();
      closing();
    }
  };

  const VincularMaterial = async () => {
    const userIDRes1 = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/users/id`,
      {
        method: "GET",
        credentials: "include",
      }
    );

    const userIDdata1 = await userIDRes1.json(); // parse the response
    // setUserID(userIDdata1.userId); // set the state

    const payload = {
      materialId: materialID,
      materiaId: materiaDesignada,
    };

    console.log(payload);

    const Res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/sala-estudo/usuario/${userIDdata1.userId}/adicionar-material`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload), // ✅ send the object, not the string
        credentials: "include",
      }
    );
    const Data = Res.json();
    console.log(Data, "VINCULANDO UM MATERIAL");

    // router.push(
    //   `/home/materiais/${materiaDesignada}/${materialID}/Resumo`
    // );

    closing();
  };

  if (loading) return <Loading />;
  return (
    <>
      {message && (
        <ErrorModal message={message} onClose={() => setMessage(null)} />
      )}
      {open && (
        <>
          <motion.div
            key="content"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 0.94 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="w-full h-full fixed left-0 right-0 flex justify-center overflow-hidden items-center z-[1100] "
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
                <img
                  src="/Vector.svg"
                  alt="Decoração"
                  className="absolute top-0 left-[-180px] rotate-90 w-[550px] -z-10"
                />

                <div className="w-full flex flex-col justify-center h-full gap-4">
                  <div className="flex ">
                    <div className=" flex flex-col justify-center items-center w-full text-[35px] font-medium">
                      Enviar Material
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

                  <div className="w-full text-[18px] overflow-hidden pb-1 flex flex-col gap-4">
                    {/* <div className=" flex flex-col gap-1">
                        <h2 className="text-[20px] font-medium">
                          {" "}
                          Nome do material
                        </h2>
                        <input
                          type="text"
                          value={input}
                          onChange={(e) => setInput(e.target.value)}
                          placeholder="Nome do Material"
                          className="pl-5 text-[18px] w-full max-w-[500px] h-[45px] border-2 border-[rgba(0,0,0,0.19)] rounded-[20px] outline-[rgba(151,103,248,0.6)]"
                        />
                      </div> */}

                    <div className="relative flex flex-col gap-1">
                      <h2 className="text-[20px] font-medium">
                        Material designado:
                      </h2>

                      <ComboboxDemoMaterial
                        value={materialDesignado}
                        onChange={(id, materiaId) => {
                          setMaterialDesignado(id);
                          if (materiaId) setMateriaDesignada(materiaId);
                          console.log("Selected Material:", id);
                          console.log("Materia ID:", materiaId);
                        }}
                      />
                    </div>

                    <div className=" lg:w-full w-[500px] max-w-full h-fit flex flex-col gap-1">
                      <h1 className="font-medium text-[20px] leading-[20px] ">
                        Tags
                      </h1>
                      <div className=" max-w-[600px] h-fit flex gap-1 justify-center items-end ">
                        <input
                          type="text"
                          value={topicoInput}
                          onChange={(e) => setTopicoInput(e.target.value)}
                          onKeyDown={(e) => {
                            if (
                              e.key === "Enter" &&
                              topicoInput &&
                              !topicos.includes(topicoInput)
                            ) {
                              setTopicos((prev) => [...prev, topicoInput]);
                              setTopicoInput("");
                            }
                          }}
                          placeholder="Adicionar tags"
                          className="pl-5 text-[20px] w-full h-[45px] border-2 border-[rgba(0,0,0,0.19)] rounded-[20px] outline-[rgba(151,103,248,0.6)]"
                        />

                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.92 }}
                          onClick={() => {
                            if (topicoInput && !topicos.includes(topicoInput)) {
                              setTopicos((prev) => [...prev, topicoInput]);
                              setTopicoInput("");
                            }
                          }}
                          className="p-[10px] min-w-[50px] bg-[#A39CEC] rounded-[27%] text-white flex justify-center items-center text-[20px] font-semibold shadow-md "
                        >
                          <SendHorizonal className="size-6" />
                        </motion.button>
                      </div>
                    </div>

                    <div className="lg:w-full min-h-[50px] w-[500px] max-w-full h-full rounded-[25px] max-h-[350px] overflow-y-auto overflow-x-hidden flex justify-center border-2 border-[rgba(0,0,0,0.19)] items-center">
                      <div className="w-[95%] px-2 py-2 h-min mt-2 flex flex-wrap gap-2 overflow-auto min-h-fit max-h-[30px] ">
                        <AnimatePresence>
                          {topicos.map((topico, index) => (
                            <motion.div
                              key={topico + index}
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              id="topicos"
                              className="flex w-fit h-fit py-1 px-2 gap-2 text-white bg-[#A387DC] rounded-[8px] max-w-full cursor-pointer"
                            >
                              <X
                                onClick={() => {
                                  setTopicos((prev) =>
                                    prev.filter((_, i) => i !== index)
                                  );
                                }}
                                className="text-[rgba(0,0,0,0.34)]"
                              />

                              <span className=" w-full block text-ellipsis overflow-hidden break-words ">
                                {topico}
                              </span>
                            </motion.div>
                          ))}
                        </AnimatePresence>
                      </div>
                    </div>

                    <div className="w-full flex justify-center items-center min-h-fit">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ ease: "easeInOut" }}
                        onClick={postarMaterial}
                        className=" bg-[#9B79E0] text-white px-4 py-2 shadow-md  rounded-full"
                      >
                        Enviar Material
                      </motion.button>
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

      <div className="w-full flex flex-col px-4 py-4 gap-4 h-fit ">
        <div className="flex w-full justify-between gap-2">
          <input
            type="text"
            id="nome_materia"
            placeholder="Pesquisar material"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-3 text-[18px] max-w-[650px] w-full py-2 border-2 border-[rgba(0,0,0,0.19)] h-[50px] rounded-full outline-[rgba(151,103,248,0.6)]"
          />
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ ease: "easeInOut" }}
            onClick={() => setOpen(true)}
            className="self-start bg-[#9B79E0] text-white px-4 py-2 shadow-md my-auto rounded-full text-nowrap"
          >
            Postar material 
          </motion.button>
        </div>
        {/* lg:flex-row */}
        <div className="flex gap-3 pb-4 h-fit flex-col ">
          {material
            .filter((m) =>
              (m.material.titulo ?? "")
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
            )
            .map((sala, index) => {
              const html = sala.material.resumoIA
                ? marked.parse(sala.material.resumoIA)
                : "";

              return (
                <div
                  key={index}
                  // lg:max-w-[50%]
                  className={`w-full min-h-fit h-[500px] flex gap-2 lg:flex-row flex-col`}
                >
                  <div className="flex flex-col w-full gap-3 h-fit">
                    <div className="w-full">
                      <div className="flex gap-1 overflow-x-hidden">
                        <img
                          src={`${sala.autor?.foto}`}
                          className="rounded-full cursor-pointer transition-all w-12 h-12 shadow-md"
                          alt="Foto de perfil"
                        />
                        <div className="flex flex-col text-[18px] max-w-full ">
                          <span className="font-semibold truncate">
                            {sala.autor?.nome}
                          </span>
                          <div className="font-semibold w-full max-w-full overflow-x-auto overflow-y-hidden  ">
                            {sala?.tags?.map((tag, index) => {
                              const randomColor =
                                cor[Math.floor(Math.random() * cor.length)];
                              return (
                                <span
                                  key={index}
                                  style={{ backgroundColor: randomColor }}
                                  className="text-[16px] px-3 rounded-full h-fit w-fit shadow-md truncate mr-1"
                                >
                                  {tag}
                                </span>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                      <h1 className="text-[28px] font-medium line-clamp-2 break-all">
                        {sala.material.titulo}
                      </h1>
                    </div>
                    <div className=" shadow-md w-full bg-[rgba(217,217,217,0.34)] flex gap-3 flex-col justify-between max-w-full max-h-full rounded-[35px] min-h-[400px] h-[500px] mt-auto overflow-hidden mb-2 p-4">
                      {/* Conteúdo do resumo */}

                      {/* <div className=" flex justify-center items-center w-fit text-[20px] font-medium gap-3">
                        <motion.a
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="cursor-pointer h-full"
                        >
                          <motion.span
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            Resumo
                          </motion.span>
                          {pathname.endsWith("materiais") && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              exit={{ scale: 1 }}
                              className="origin-center -mb-1 rounded-3xl transition-all ease-in-out h-[5px] bg-[#A39CEC]"
                            ></motion.div>
                          )}
                        </motion.a>

                        <motion.a
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="cursor-pointer h-full"
                        >
                          <motion.span className="text-nowrap">
                            Flashcards
                          </motion.span>
                          {pathname.endsWith("postagens") && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              exit={{ scale: 1 }}
                              className="origin-center -mb-1 rounded-3xl transition-all ease-in-out h-[5px] bg-[#A39CEC]"
                            ></motion.div>
                          )}
                        </motion.a>

                        <motion.a
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="cursor-pointer h-full"
                        >
                          <motion.span className="text-nowrap">
                            Quizzes
                          </motion.span>
                          {pathname.endsWith("postagens") && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              exit={{ scale: 1 }}
                              className="origin-center -mb-1 rounded-3xl transition-all ease-in-out h-[5px] bg-[#A39CEC]"
                            ></motion.div>
                          )}
                        </motion.a>
                      </div> */}

                      <motion.span className="text-[28px] leading-none">
                        Prévia
                      </motion.span>

                      {/* RESUMO: */}
                      {/* <div className="flex-1 w-full bg-white border border-[rgba(0,0,0,0.15)] rounded-tl-[35px] rounded-tr-[35px] p-4 overflow-y-auto overflow-x-hidden ">
                        <div className="text-[16px] mb-2">
                          Resumo <span className="text-[#726BB6]">IA</span>
                        </div>
                        <p
                          className="text-[16px] resumo2 break-words line-clamp-7"
                          dangerouslySetInnerHTML={{ __html: html }}
                        />
                      </div> */}

                      {/* FLASHCARDS: */}
                      <div className="flex-1 w-full bg-white border border-[rgba(0,0,0,0.15)] rounded-tl-[35px] rounded-tr-[35px] p-4 overflow-y-auto overflow-x-hidden ">
                        <div className="text-[16px] mb-2">
                          Resumo <span className="text-[#726BB6]">IA</span>
                        </div>
                        <p
                          className="text-[16px] resumo2 break-words line-clamp-7"
                          dangerouslySetInnerHTML={{ __html: html }}
                        />
                      </div>
                      {/* Botão ixo */}

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ ease: "easeInOut" }}
                        onClick={() => {
                          setOpen(true);
                          setMaterialID(sala.material.id);
                        }}
                        className="self-center bg-[#9B79E0] text-white px-4 py-2 shadow-md rounded-full text-nowrap"
                      >
                        Vincular matéria
                      </motion.button>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}
