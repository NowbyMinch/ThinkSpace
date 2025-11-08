"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Backdrop, Backdrop3 } from "./components/backdrop";
import { Backdrop2 } from "./components/backdrop";
import { CarouselLinks } from "./components/carousel";
import { motion, AnimatePresence } from "framer-motion";
import ErrorModal from "@/components/ui/ErrorModal";
import Loading from "@/app/home/components/loading";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { useContext } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
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
  Flame,
  ArrowLeft,
  ArrowRight,
  Ellipsis,
} from "lucide-react";
import * as Icons from "lucide-react";
import { avatar } from "@heroui/react";
import { useRouter } from "next/navigation";
import { RefreshUserContext } from "../context/RefreshUserContext";

const icons = [
  // Educação e aprendizado
  { id: "book", Icon: Book },
  { id: "bookmark", Icon: Bookmark },
  { id: "clipboard", Icon: Clipboard },
  { id: "file", Icon: File },
  { id: "folder", Icon: Folder },
  { id: "calendar", Icon: Calendar },
  { id: "clock", Icon: Clock },
  { id: "alarmClock", Icon: AlarmClock },
  { id: "edit", Icon: Edit },
  { id: "download", Icon: Download },
  { id: "eye", Icon: Eye },
  { id: "check", Icon: Check },
  { id: "search", Icon: Search },
  { id: "filter", Icon: Filter },
  { id: "helpCircle", Icon: HelpCircle },
  { id: "info", Icon: Info },
  { id: "lightbulb", Icon: Lightbulb },

  // Programação e lógica
  { id: "code", Icon: Code },
  { id: "codeXml", Icon: CodeXml },
  { id: "cpu", Icon: Cpu },
  { id: "database", Icon: Database },
  { id: "gitBranch", Icon: GitBranch },
  { id: "hash", Icon: Hash },
  { id: "Monitor", Icon: Monitor },

  // Matemática
  { id: "plus", Icon: Plus },
  { id: "minus", Icon: Minus },
  { id: "x", Icon: X },
  { id: "divide", Icon: Divide },

  // Interface e organização de conhecimento
  { id: "layers", Icon: Layers },
  { id: "layout", Icon: Layout },
  { id: "grid", Icon: Grid },
  { id: "list", Icon: List },
  { id: "menu", Icon: Menu },
  { id: "loader", Icon: Loader },

  // Comunicação e interações
  { id: "mail", Icon: Mail },
  { id: "inbox", Icon: Inbox },
  { id: "bell", Icon: Bell },
  { id: "headphones", Icon: Headphones },

  // Identidade e acesso (login/logout para ambientes de estudo)
  { id: "logIn", Icon: LogIn },
  { id: "logOut", Icon: LogOut },
  { id: "lock", Icon: Lock },
  { id: "key", Icon: Key },

  // Contexto global e navegação de conteúdo
  { id: "globe", Icon: Globe },
  { id: "globe2", Icon: Globe2 },
  { id: "map", Icon: Map },
  { id: "home", Icon: Home },
  { id: "chevronRight", Icon: ChevronRight },
  { id: "chevronLeft", Icon: ChevronLeft },
  { id: "chevronsRight", Icon: ChevronsRight },
  { id: "chevronsLeft", Icon: ChevronsLeft },

  // Extras úteis
  { id: "flag", Icon: Flag },
  { id: "lifeBuoy", Icon: LifeBuoy },
  { id: "circlePlus", Icon: CirclePlus },
  { id: "heart", Icon: Heart },
  { id: "heartPulse", Icon: HeartPulse },
  { id: "squareX", Icon: SquareX },
  { id: "squarePen", Icon: SquarePen },
];

type BannerData = {
  mensagem?: string;
  relatorio?: string;
  relatorioUrl?: string;
  // add other properties if needed
};
type UserData = {
  primeiroNome?: string;
  cargo?: string;
  foto?: string;
  // add other properties if needed
};
type DiaData = {
  diaNumero?: number;
  diaSemana?: number;
  // add other properties if needed
};
type CalendarioData = {
  mesAtual?: string;
  anoAtual?: number;
  dias?: DiaData[];
  diaAtual?: number;
  // add other properties if needed
};
type notificacoesType = {
  cor: string;
  data: string;
  dataAnotacao: string;
  id: string;
  lida: false;
  mensagem: string;
  usuarioId: string;
  subtitulo: string;
  titulo: string;
  // add other properties if needed
};
type notificacaoData = {
  userId?: string;
  notificacoes?: notificacoesType[];

  // add other properties if needed
};
type Materia = {
  id: string;
  nome: string;
  cor: string; // "SALMAO"
  icone: string; // "divide"
  usuarioId: string;
  tempoAtivo: number; // 0
  ultimaRevisao: string; // ISO date string: "2025-11-06T02:04:23.825Z"
  xpAcumulada: number; // 17
  barraProgresso: number; // 1–100 or any numeric progress
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

export default function HomePage() {
  const router = useRouter();
  const [pop, setPop] = useState(false);
  const [pop2, setPop2] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const cores = {
    ROXO: "#8B81F3",
    LILAS: "#CAC5FF",
    ROSA: "#FFA6F1",
    SALMAO: "#FFACA1",
  };
  const cor = ["#8B81F3", "#CAC5FF", "#FFA6F1", "#FFACA1"];

  function opening() {
    setPop(true);
  }

  function closing() {
    setTimeout(() => setPop(false), 10);
    setNewToComunityPop(false);
  }

  function closingLink() {
    setLinkUtil1(false);
    setLinkUtil2(false);
    setLinkUtil3(false);
  }

  const handleGo = async () => {
    await router.refresh(); // ✅ forces re-render with updated data
    router.push("/home/comunidades/postagens");
  };

  function opening2() {
    setPop2(true);
  }

  async function closing2() {
    setTimeout(() => setPop2(false), 10);
    if (notificacao.notificacoes) {
      for (let n = 0; n < notificacao.notificacoes.length; n++) {
        // console.log(
        //   notificacao.notificacoes[n].id,
        //   "Notificacao ---------------------------------------------------------------------------------"
        // );
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/users/notificacoes/${notificacao.notificacoes[n].id}`,
            {
              method: "POST",
              credentials: "include",
            }
          );
          const noti = await res.json();

          ReloadNotification();
          // console.log("Notificacao detalhe:", noti);
        } catch (err) {
          console.error("Erro ao buscar notificação:", err);
        }
      }
    }
  }

  const [calendario, setCalendario] = useState<CalendarioData>({});
  const [bannerData, setBannerData] = useState<BannerData>({});
  const [user, setUser] = useState<UserData>({});
  const [salas, setSalas] = useState<Salas[]>([]);
  const [avatares, setAvatares] = useState<string[]>([]);
  const [notificacao, setNotificacao] = useState<notificacaoData>({});
  const [loading, setLoading] = useState(true);
  const [materias, setMaterias] = useState<Materia[]>([]);
  const [ofensiva, setOfensiva] = useState();
  const [ofensivaMensagem, setOfensivaMensagem] = useState("");
  const [totalEstudantes, setTotalEstudantes] = useState(0);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [newToComunityPop, setNewToComunityPop] = useState(false);
  const [newUser, setNewUser] = useState(false);

  const [linkUtil1, setLinkUtil1] = useState(false);
  const [linkUtil2, setLinkUtil2] = useState(false);
  const [linkUtil3, setLinkUtil3] = useState(false);

  const toggle = (index: number) => {
    setOpenIndex(index === openIndex ? null : index);
  };

  const ReloadNotification = async () => {
    try {
      // Run all fetches in parallel
      const [notificacaoRes] = await Promise.all([
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/home/notificacoes`, {
          method: "GET",
          credentials: "include",
        }),
      ]);

      // Parse all JSONs in parallel
      const [notificacaoData] = await Promise.all([notificacaoRes.json()]);

      // ✅ Set states after everything is done
      setNotificacao(notificacaoData);
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
        const [
          materiaRes,
          bannerRes,
          userRes,
          calendarioRes,
          salasRes,
          notificacaoRes,
          ofensivaRes,
        ] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/home/materias`, {
            method: "GET",
            credentials: "include",
          }),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/home/banner`, {
            method: "GET",
            credentials: "include",
          }),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/home/identificacao`, {
            method: "GET",
            credentials: "include",
          }),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/home/calendario`, {
            method: "GET",
            credentials: "include",
          }),
          fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/sala-estudo/usuario/${userIDdata1.userId}/salas-recentes`,
            {
              method: "GET",
              credentials: "include",
            }
          ),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/home/notificacoes`, {
            method: "GET",
            credentials: "include",
          }),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/home/ofensiva`, {
            method: "GET",
            credentials: "include",
          }),
        ]);

        // Parse all JSONs in parallel
        const [
          materiaData,
          bannerData,
          userData,
          calendarioData,
          salasData,
          notificacaoData,
          ofensivaData,
        ] = await Promise.all([
          materiaRes.json(),
          bannerRes.json(),
          userRes.json(),
          calendarioRes.json(),
          salasRes.json(),
          notificacaoRes.json(),
          ofensivaRes.json(),
        ]);

        // ✅ Set states after everything is done
        setMaterias(materiaData);
        setBannerData(bannerData);
        setUser(userData);
        setCalendario(calendarioData);
        setNotificacao(notificacaoData);
        setOfensivaMensagem(ofensivaData.mensagemOfensiva);
        setOfensiva(ofensivaData.status);

        if (salasData.length > 0) {
          setAvatares(salasData.avataresUltimosUsuarios);
          setTotalEstudantes(salasData.totalEstudantes);
          setSalas(Array.isArray(salasData) ? salasData : []);
        }
        // Extract data from /home/salas-estudo safely
        // if (salasData) {
        // }
      } catch (err) {
        console.error("Erro ao carregar dados:", err);
        setMessage("Erro ao carregar dados.");
      } finally {
        // ✅ Stop loading only after all requests (success or error)
        setLoading(false);
      }
    };
    fetchAll();

    const newToComunityGET = async () => {
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
          `${process.env.NEXT_PUBLIC_API_URL}/sala-estudo/usuario/${userIDdata1.userId}/status-termos-comunidade`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        const data = await res.json();
        setNewUser(data.aceitouTermosComunidade);

        //  console.log("TERMOS TERMOS TERMOS TERMOS ", data);
      } catch (err) {
        setMessage("Erro ao carregar saudação.");
        console.error(err);
      }
    };
    newToComunityGET();
  }, []);

  const { RefreshUser } = useContext(RefreshUserContext);

  const setNewToComunityState = async () => {
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
        `${process.env.NEXT_PUBLIC_API_URL}/sala-estudo/usuario/${userIDdata1.userId}/aceitar-termos-comunidade`,
        {
          method: "POST",
          credentials: "include",
        }
      );

      const data = await res.json();
      //  console.log(data);
      if (data.message === "Termos de uso da comunidade aceitos com sucesso.") {
        setNewUser(true);
        window.location.reload();
        setLoading(true);
        router.push("/home/comunidades/postagens");
      } else {
        setMessage(data.message);
      }
    } catch (err) {
      setMessage("Erro ao carregar saudação.");
      console.error(err);
    } finally {
      setNewToComunityPop(false);
    }
  };

  useEffect(() => {
    if (materias && materias.length > 0 && salas && salas.length > 0) {
      setLoading(false);
    }
  }, [materias, salas]);

  if (loading) return <Loading />;

  let NaoLidas = 0;

  return (
    <>
      {message && (
        <ErrorModal message={message} onClose={() => setMessage(null)} />
      )}

      <AnimatePresence initial={false}>
        {newToComunityPop && (
          <>
            <motion.div
              key={`denuncia-${message}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed left-0 right-0 top-0 bottom-0 flex justify-center items-center z-[1100]"
            >
              <div className="absolute inset-0" onClick={() => closing()} />

              <motion.div
                key="modal-wrapper"
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 0.94 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="relative z-[1101] rounded-[40px] overflow-hidden shadow-md"
                style={{ width: 700 }}
              >
                <div
                  className="bg-white w-full max-h-[90vh] overflow-y-auto overflow-x-hidden"
                  style={{
                    WebkitOverflowScrolling: "touch",
                    clipPath: "inset(0 round 40px)",
                  }}
                >
                  <div
                    id="white-box"
                    className="p-7 gap-3 w-full rounded-[40px] overflow-hidden shadow-md flex flex-col items-center relative z-[1100]"
                  >
                    <img
                      src="/Vector.svg"
                      alt="Decoração"
                      className="absolute bottom-0 right-[-180px] rotate-[260deg] w-[550px] -z-10"
                    />

                    <div className="flex justify-between items-center w-full">
                      <h1 className="text-[35px] font-medium self-end leading-none">
                        Bem vindo! 🌟
                      </h1>
                      {/* <div className="w-fit">
                            <motion.div
                              whileHover={{ scale: 1.08 }}
                              whileTap={{ scale: 0.92 }}
                              onClick={closing}
                              className="cursor-pointer w-6 h-6"
                            >
                              <X className="w-full h-full" />
                            </motion.div>
                          </div> */}
                    </div>
                    <p className="text-[#5e5e5e] text-[20px] font-medium">
                      Essa é a aba Comunidade — um espaço criado para tornar o
                      aprendizado mais colaborativo, respeitoso e produtivo.
                      Aqui, você pode criar salas personalizadas, interagir com
                      colegas, compartilhar materiais e trocar experiências de
                      estudo. Para que todos aproveitem esse ambiente de forma
                      positiva e segura, é essencial seguir algumas regras de
                      convivência:
                    </p>
                    <ul className="text-[#5e5e5e] text-[18px] font-medium list-disc list-outside pl-4">
                      <li>
                        Evite mensagens repetitivas, propagandas ou conteúdos
                        falsos;
                      </li>
                      <li>
                        Não compartilhe informações sem fonte confiável ou que
                        possam induzir outros ao erro;
                      </li>
                      <li>
                        Proibição de incentivo a comportamentos arriscados ou
                        prejudiciais;
                      </li>
                      <li>
                        Respeite todas as pessoas, independentemente de suas
                        diferenças;
                      </li>
                      <li>
                        Qualquer forma de intimidação, ataque pessoal ou
                        humilhação é inaceitável;
                      </li>
                      <li>
                        É estritamente proibido defender, apoiar ou incentivar
                        atividades terroristas;
                      </li>
                      <li>
                        Mantenha o ambiente adequado para todas as idades e fins
                        educacionais;
                      </li>
                      <li>
                        Não compartilhe imagens, vídeos ou textos com conteúdo
                        violento ou repulsivo;
                      </li>
                      <li>
                        Temas relacionados a suicídio, automutilação ou
                        transtornos alimentares devem ser tratados com
                        responsabilidade e nunca incentivados;
                      </li>
                      <li>
                        Qualquer material ou menção a abuso infantil será
                        imediatamente reportado.
                      </li>
                    </ul>
                    <p className="text-[#5e5e5e] text-[20px] font-medium">
                      Caso deseje rever essas e outras diretrizes, consulte
                      nossos Termos de Uso disponíveis na plataforma. Juntos,
                      podemos construir uma comunidade de aprendizado segura,
                      acolhedora e inspiradora.
                    </p>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ ease: "easeInOut" }}
                      onClick={setNewToComunityState}
                      className="self-center bg-[#9B79E0] text-white px-4 py-2 shadow-md  rounded-full"
                    >
                      Aceitar termos
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            <div className="w-full absolute flex justify-center items-center">
              <Backdrop3 onClick={() => closing()} />
            </div>
          </>
        )}

        {pop && <Backdrop key={1} />}
        {pop2 && <Backdrop2 key={2} />}
        {linkUtil1 && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed left-0 right-0 top-0 bottom-0 flex justify-center items-center z-[1100] "
            >
              <div className="absolute inset-0" onClick={() => closingLink()} />

              <motion.div
                key="modal-wrapper"
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 0.94 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="relative z-[1101] rounded-[40px] shadow-md bg-white h-[1400px] max-h-full overflow-hidden border-[10px] border-[#1E2351]"
                style={{ width: 1200 }} // ou className w-[640px]
              >
                <div className="h-full w-full overflow-y-auto overflow-x-auto flex flex-col gap-8 pb-10">
                  <div className="h-[420px] min-h-fit w-full bg-[rgba(74,58,242,0.08)] flex sm:flex-row flex-col overflow-hidden relative px-4 shadow-md">
                    <img
                      src="/homeVector.svg"
                      alt="Decoração"
                      className="absolute top-0 -right-3 rotate-[5deg] min-w-[60%] -z-10"
                    />

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setLinkUtil1(false);
                      }}
                      className="absolute top-4 right-4 w-6 h-6"
                    >
                      <X className="w-full h-full" />
                    </motion.button>
                    <div className="self-center sm:hidden flex-col flex ">
                      <h1 className="text-[#726BB6] text-[55px] font-medium ">
                        Links úteis
                      </h1>
                      <p className="text-[20px] font-medium max-w-[350px]">
                        Como os grupos de estudo podem te ajudar na sua
                        trajetória acadêmica?
                      </p>
                    </div>

                    <img
                      src="/homeIMG.svg"
                      alt="Decoração"
                      className="w-[380px] max-w-[50%] h-auto  sm:mx-0 mx-auto"
                    />

                    <div className="self-center sm:flex flex-col hidden ">
                      <h1 className="text-[#726BB6] text-[60px] font-medium ">
                        Links úteis
                      </h1>
                      <p className="text-[22px] font-medium max-w-[350px]">
                        Como os grupos de estudo podem te ajudar na sua
                        trajetória acadêmica?
                      </p>
                    </div>
                  </div>
                  <div className="w-[90%] self-center min-h-fit text-[18px] text-[rgb(150,150,150)] font-medium">
                    <p className="text-justify leading-relaxed">
                      Aprender é um processo muito mais produtivo quando é feito
                      em comunidade. Por isso, os grupos de estudo dentro da
                      nossa plataforma foram criados para aproximar estudantes
                      com os mesmos objetivos, promovendo trocas de
                      conhecimento, incentivo mútuo e uma rotina de estudos mais
                      leve e organizada.
                    </p>

                    <p className="text-justify leading-relaxed mt-4">
                      Na aba Comunidade, você pode criar sua própria sala de
                      estudo e convidar colegas para participar. Essa
                      funcionalidade permite que cada grupo tenha um espaço
                      personalizado, com o foco que preferir — seja para revisar
                      conteúdos de uma disciplina específica, estudar para o
                      Enem, preparar-se para vestibulares, concursos ou até
                      mesmo compartilhar experiências sobre a vida
                      universitária.
                    </p>

                    <p className="text-justify leading-relaxed mt-4">
                      Dentro das salas, é possível anexar materiais de estudo,
                      que incluem como resumos de IA, flashcards e quizzes, além
                      do histórico de chat de IA. Por exemplo, um grupo de
                      Biologia pode criar um tópico sobre “Ecologia” e anexar um
                      material de estudo, enquanto outro estudante compartilha
                      flashcards e um terceiro posta sobre dúvidas em relação à
                      matéria, como "O que são organelas?". Assim, todos
                      colaboram e constroem juntos um repositório de
                      conhecimento acessível e dinâmico.
                    </p>

                    <p className="text-justify leading-relaxed mt-4">
                      Além disso, a interação é um dos pontos mais importantes.
                      Você pode curtir e responder comentários, salvar postagens
                      relevantes e participar de discussões que ampliam sua
                      compreensão dos temas estudados. Imagine um grupo de
                      Redação, onde os participantes compartilham seus textos e
                      recebem feedbacks construtivos de outros colegas — essa
                      troca é valiosa e contribui diretamente para o
                      aperfeiçoamento de cada um.
                    </p>

                    <p className="text-justify leading-relaxed mt-4">
                      Para garantir que todos se sintam à vontade e respeitados,
                      nossa plataforma também oferece a opção de denúncia. Caso
                      algum comportamento inadequado aconteça — como
                      desrespeito, linguagem ofensiva ou compartilhamento
                      indevido de conteúdo — qualquer usuário pode realizar uma
                      denúncia de forma simples e rápida. Assim, todos colaboram
                      para manter um ambiente seguro, acolhedor e saudável, onde
                      o foco é o aprendizado e o respeito mútuo.
                    </p>

                    <p className="text-justify leading-relaxed mt-4">
                      Participar de grupos de estudo também desenvolve
                      habilidades socioemocionais e acadêmicas, como trabalho em
                      equipe, comunicação, organização e empatia — competências
                      que são fundamentais tanto para a vida acadêmica quanto
                      para o mercado de trabalho.
                    </p>

                    <p className="text-justify leading-relaxed mt-4">
                      Em resumo, os grupos de estudo da nossa plataforma não são
                      apenas espaços para trocar informações, mas verdadeiras
                      comunidades de aprendizado. Aqui, cada contribuição conta,
                      e o conhecimento é construído de forma coletiva,
                      conectando pessoas que compartilham os mesmos sonhos e
                      metas.
                    </p>
                  </div>
                  <div className="w-[90%] self-center">
                    <motion.button
                      whileTap={{ scale: 0.98 }}
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.2, ease: "easeInOut" }}
                      onClick={() => {
                        setLinkUtil1(false);
                        setLinkUtil2(true);
                      }}
                      className=" text-[#704FE6] text-[18px] w-fit p-[8px_20px] rounded-full border h-fit flex gap-4 items-center justify-center bg-[#A39CEC] cursor-pointer  "
                    >
                      <span className="line-clamp-2 break-words text-[#FFFFFF]">
                        Próximo Link Útil
                      </span>
                      <div className="bg-[rgba(255,255,255,0.77)] p-3 rounded-full ">
                        {" "}
                        <ArrowRight className="text-[#A39CEC] size-5" />{" "}
                      </div>
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
            <div className="w-full absolute flex justify-center items-center">
              <Backdrop3 onClick={() => closingLink()} />
            </div>
          </>
        )}

        {linkUtil2 && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed left-0 right-0 top-0 bottom-0 flex justify-center items-center z-[1100] "
            >
              <div className="absolute inset-0" onClick={() => closingLink()} />

              <motion.div
                key="modal-wrapper"
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 0.94 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="relative z-[1101] rounded-[40px] shadow-md bg-white h-[1400px] max-h-full overflow-hidden border-[10px] border-[#1E2351]"
                style={{ width: 1200 }} // ou className w-[640px]
              >
                <div className="h-full w-full overflow-y-auto overflow-x-auto flex flex-col gap-8 pb-10">
                  <div className="h-[420px] min-h-fit w-full bg-[rgba(74,58,242,0.08)] flex sm:flex-row flex-col overflow-hidden relative px-4 shadow-md">
                    <img
                      src="/homeVector.svg"
                      alt="Decoração"
                      className="absolute top-0 -right-3 rotate-[5deg] min-w-[60%] -z-10"
                    />

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setLinkUtil2(false);
                      }}
                      className="absolute top-4 right-4 w-6 h-6"
                    >
                      <X className="w-full h-full" />
                    </motion.button>
                    <div className="self-center sm:hidden flex-col flex ">
                      <h1 className="text-[#726BB6] text-[55px] font-medium ">
                        Links úteis
                      </h1>
                      <p className="text-[20px] font-medium max-w-[350px]">
                        Como posso estudar de forma eficiente?
                      </p>
                    </div>

                    <img
                      src="/eficiente.svg"
                      alt="Decoração"
                      className="w-[580px] max-w-[50%] h-auto sm:mx-0 mx-auto"
                    />

                    <div className="self-center sm:flex flex-col hidden ">
                      <h1 className="text-[#726BB6] text-[60px] font-medium ">
                        Links úteis
                      </h1>
                      <p className="text-[22px] font-medium max-w-[350px]">
                        Como posso estudar de forma eficiente?
                      </p>
                    </div>
                  </div>
                  <div className="w-[90%] self-center min-h-fit text-[18px] text-[rgb(150,150,150)] font-medium">
                    <p className="text-justify leading-relaxed">
                      Estudar de forma eficiente com o ThinkSpace é simples,
                      pois a plataforma foi desenvolvida justamente para
                      otimizar o aprendizado e tornar o processo mais dinâmico e
                      personalizado. Tudo começa com os materiais de estudo: o
                      aluno pode carregar textos, apostilas ou temas de aula, e
                      a inteligência artificial integrada transforma o conteúdo
                      em resumos claros e diretos, destacando os principais
                      tópicos. Isso facilita a compreensão e reduz o tempo gasto
                      na leitura de grandes volumes de informação.
                    </p>

                    <p className="text-justify leading-relaxed mt-4">
                      Com base nesses materiais, o ThinkSpace cria flashcards
                      automáticos e quizzes personalizados, permitindo revisar o
                      conteúdo de forma prática e interativa. Essa técnica
                      estimula a memorização ativa, considerada uma das formas
                      mais eficazes de retenção de conhecimento.
                    </p>

                    <p className="text-justify leading-relaxed mt-4">
                      Além disso, o calendário de estudos ajuda o estudante a
                      manter uma rotina organizada, registrando prazos, provas e
                      metas de aprendizado. Dessa forma, é possível planejar o
                      tempo de estudo de maneira equilibrada, evitando
                      sobrecarga e esquecimentos.
                    </p>

                    <p className="text-justify leading-relaxed mt-4">
                      As métricas de desempenho também são um diferencial
                      importante: elas mostram o progresso do aluno, apontando
                      quais áreas precisam de reforço e quais já estão
                      consolidadas. Assim, é possível ajustar o ritmo e as
                      estratégias de estudo de forma personalizada.
                    </p>

                    <p className="text-justify leading-relaxed mt-4">
                      Por fim, o ThinkSpace conta com salas de estudo e uma
                      comunidade interativa, onde os usuários podem compartilhar
                      materiais, tirar dúvidas e trocar experiências com outros
                      estudantes. Esse ambiente colaborativo torna o aprendizado
                      mais leve, motivador e eficiente.
                    </p>

                    <p className="text-justify leading-relaxed mt-4">
                      Em resumo, o ThinkSpace combina tecnologia, organização e
                      interação para ajudar o aluno a estudar de maneira mais
                      inteligente — com foco no que realmente importa, no seu
                      ritmo e com ferramentas que potencializam o aprendizado.
                    </p>
                  </div>
                  <div className="w-[90%] self-center">
                    <motion.button
                      whileTap={{ scale: 0.98 }}
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.2, ease: "easeInOut" }}
                      onClick={() => {
                        setLinkUtil2(false);
                        setLinkUtil3(true);
                      }}
                      className=" text-[#704FE6] text-[18px] w-fit p-[8px_20px] rounded-full border h-fit flex gap-4 items-center justify-center bg-[#A39CEC] cursor-pointer  "
                    >
                      <span className="line-clamp-2 break-words text-[#FFFFFF]">
                        Próximo Link Útil
                      </span>
                      <div className="bg-[rgba(255,255,255,0.77)] p-3 rounded-full ">
                        {" "}
                        <ArrowRight className="text-[#A39CEC] size-5" />{" "}
                      </div>
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
            <div className="w-full absolute flex justify-center items-center">
              <Backdrop3 onClick={() => closingLink()} />
            </div>
          </>
        )}

        {linkUtil3 && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed left-0 right-0 top-0 bottom-0 flex justify-center items-center z-[1100] "
            >
              <div className="absolute inset-0" onClick={() => closingLink()} />

              <motion.div
                key="modal-wrapper"
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 0.94 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="relative z-[1101] rounded-[40px] shadow-md bg-white h-[1400px] max-h-full overflow-hidden border-[10px] border-[#1E2351]"
                style={{ width: 1200 }} // ou className w-[640px]
              >
                <div className="h-full w-full overflow-y-auto overflow-x-auto flex flex-col gap-8 pb-10">
                  <div className="h-[420px] min-h-fit w-full bg-[rgba(74,58,242,0.08)] flex sm:flex-row flex-col overflow-hidden relative px-4 shadow-md">
                    <img
                      src="/homeVector.svg"
                      alt="Decoração"
                      className="absolute top-0 -right-3 rotate-[5deg] min-w-[60%] -z-10"
                    />

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setLinkUtil3(false);
                      }}
                      className="absolute top-4 right-4 w-6 h-6"
                    >
                      <X className="w-full h-full" />
                    </motion.button>
                    <div className="self-center sm:hidden flex-col flex ">
                      <h1 className="text-[#726BB6] text-[55px] font-medium ">
                        Links úteis
                      </h1>
                      <p className="text-[20px] font-medium max-w-[350px]">
                        De que forma os flashcards e quizzes contribuem para a
                        minha aprendizagem?
                      </p>
                    </div>

                    <img
                      src="/contribuem.svg"
                      alt="Decoração"
                      className="w-[380px] max-w-[50%] h-auto  sm:mx-0 mx-auto"
                    />

                    <div className="self-center sm:flex flex-col hidden ">
                      <h1 className="text-[#726BB6] text-[60px] font-medium ">
                        Links úteis
                      </h1>
                      <p className="text-[22px] font-medium max-w-[350px]">
                        De que forma os flashcards e quizzes contribuem para a
                        minha aprendizagem?
                      </p>
                    </div>
                  </div>
                  <div className="w-[90%] self-center min-h-fit text-[18px] text-[rgb(150,150,150)] font-medium">
                    <p className="text-justify leading-relaxed">
                      Os flashcards e quizzes da plataforma ThinkSpace foram
                      desenvolvidos para tornar o aprendizado mais ativo,
                      eficiente e duradouro, ajudando o estudante a fixar o
                      conteúdo de forma prática e dinâmica.
                    </p>
                    <p className="text-justify leading-relaxed mt-4">
                      Os flashcards funcionam como cartões de estudo que
                      apresentam uma pergunta ou palavra-chave de um lado e a
                      resposta do outro. Esse formato estimula o cérebro a
                      buscar informações na memória — um processo conhecido como
                      recuperação ativa (active recall) — que é comprovadamente
                      um dos métodos mais eficazes para fixar o conhecimento.
                      Além disso, o uso de revisões espaçadas (spaced
                      repetition) potencializa o aprendizado, reforçando o
                      conteúdo em intervalos estratégicos e melhorando a
                      retenção de longo prazo.
                    </p>
                    <p className="text-justify leading-relaxed mt-4">
                      De acordo com uma matéria publicada pela CNN Brasil
                      (2023), o uso frequente de flashcards — entre três a cinco
                      vezes por semana — melhora o foco e a retenção de
                      conteúdos, principalmente quando há revisões constantes e
                      repetição dos temas estudados. A reportagem destaca ainda
                      que esse método simples é uma das técnicas de estudo mais
                      eficazes reconhecidas por educadores e pesquisadores da
                      área de aprendizagem.
                    </p>

                    <p className="text-justify leading-relaxed mt-4">
                      Já os quizzes complementam os flashcards ao oferecer uma
                      forma prática de testar o conhecimento adquirido. Eles
                      permitem que o estudante avalie seu desempenho,
                      identifique lacunas e compreenda quais assuntos precisam
                      de mais atenção. Ao responder quizzes regularmente, o
                      aluno reforça a memorização, treina o raciocínio rápido e
                      transforma o estudo em um processo interativo, com
                      resultados imediatos.
                    </p>

                    <p className="text-justify leading-relaxed mt-4">
                      No ThinkSpace, os quizzes são integrados ao conteúdo
                      estudado por meio dos flashcards, criando um ciclo
                      contínuo de aprendizado: o estudante revisa os temas com
                      flashcards, testa o conhecimento com quizzes e, a partir
                      dos resultados, reforça os pontos que ainda precisam ser
                      aprimorados.
                    </p>
                    <p className="text-justify leading-relaxed mt-4">
                      Essa combinação é poderosa porque transforma o estudo em
                      uma experiência ativa, personalizada e mensurável. Em vez
                      de apenas ler ou assistir a aulas, o aluno participa
                      ativamente do processo, melhora a concentração e consolida
                      o aprendizado de maneira eficiente.
                    </p>

                    <p className="text-justify leading-relaxed mt-4">
                      Em resumo, os flashcards e quizzes do ThinkSpace são mais
                      do que simples ferramentas — são aliados estratégicos na
                      jornada de quem deseja aprender de forma inteligente,
                      prática e com resultados reais.
                    </p>
                  </div>
                  {/* <div className="w-[90%] self-center">
                    <motion.button
                      whileTap={{ scale: 0.98 }}
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.2, ease: "easeInOut" }}
                      onClick={() => {
                        setLinkUtil1(false);
                        setLinkUtil2(true);
                      }}
                      className=" text-[#704FE6] text-[18px] w-fit p-[8px_20px] rounded-full border h-fit flex gap-4 items-center justify-center bg-[#A39CEC] cursor-pointer  "
                    >
                      <span className="line-clamp-2 break-words text-[#FFFFFF]">
                        Próximo Link Útil
                      </span>
                      <div className="bg-[rgba(255,255,255,0.77)] p-3 rounded-full ">
                        {" "}
                        <ArrowRight className="text-[#A39CEC] size-5" />{" "}
                      </div>
                    </motion.button>
                  </div> */}
                </div>
              </motion.div>
            </motion.div>
            <div className="w-full absolute flex justify-center items-center">
              <Backdrop3 onClick={() => closingLink()} />
            </div>
          </>
        )}
      </AnimatePresence>

      <div className=" w-[1580px] max-w-[90%] lg:max-w-[90%] mx-auto h-full  pb-8 max-h-full  ">
        <div className="h-[82px] mt-[15px] flex justify-between ">
          <div className="flex gap-[10px] ">
            <div
              id="pop"
              className=" relative w-[55px] h-[55px] rounded-full bg-[#D9D9D9] cursor-pointer flex justify-center items-center border border-[#00000031] shadow-md "
            >
              <div
                onMouseEnter={() => opening()}
                onMouseLeave={() => closing()}
                className="w-full h-full absolute rounded-full z-[150] group"
              >
                <div className=" relative w-full h-full group">
                  <AnimatePresence initial={false}>
                    {pop && <div className="w-[70px] h-[100px]"></div>}
                    {pop && (
                      <motion.div
                        key="content"
                        initial={{ opacity: 0.95, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0.95, scale: 0.9 }}
                        transition={{ duration: 0.01, ease: "easeInOut" }}
                        className={`absolute pop1_box h-10 origin-top-left transition-all ease-in-out bg-white border border-[#00000031] shadow-md z-50 rounded-[25px] top-[85px] justify-center items-center overflow-hidden flex cursor-default
                      `}
                      >
                        <div className=" w-[85%] h-[85%] overflow-hidden flex flex-col justify-between ">
                          <div className="h-full ">
                            <h1 className="w-fit text-[20px] font-medium leading-none cursor-text">
                              Sua ofensiva
                            </h1>
                            <h2 className="cursor-text font-medium text-[18px] w-fit text-[#121212] ">
                              {ofensivaMensagem}
                            </h2>
                          </div>

                          <div className="flex justify-between ">
                            {(() => {
                              if (ofensiva) {
                                return (
                                  <>
                                    <div className="flex flex-col text-center ">
                                      <span className="text-[15px]">DOM</span>
                                      {(() => {
                                        if (ofensiva[0] === 0) {
                                          return (
                                            <div className="diaOfensiva flex justify-center items-center rounded-[8px] border border-[#00000031] shadow-md bg-[#D9D9D9]"></div>
                                          );
                                        } else if (ofensiva[0] === 1) {
                                          return (
                                            <div className="diaOfensiva flex justify-center items-center rounded-[8px] border border-[#00000031] shadow-md bg-[#EB9481]">
                                              <X className="text-[#C10000] stroke-3 size-7" />
                                            </div>
                                          );
                                        } else {
                                          return (
                                            <div className="diaOfensiva flex justify-center items-center rounded-[8px] border border-[#00000031] shadow-md bg-[#A59EF0]">
                                              <Check className="text-white stroke-3 size-7" />
                                            </div>
                                          );
                                        }
                                      })()}
                                    </div>

                                    <div className="flex flex-col text-center ">
                                      <span className="text-[15px]">SEG</span>
                                      {(() => {
                                        if (ofensiva[1] === 0) {
                                          return (
                                            <div className=" flex justify-center items-center diaOfensiva rounded-[8px] border border-[#00000031] shadow-md bg-[#D9D9D9]"></div>
                                          );
                                        } else if (ofensiva[1] === 1) {
                                          return (
                                            <div className=" flex justify-center items-center diaOfensiva rounded-[8px] border border-[#00000031] shadow-md bg-[#EB9481]">
                                              <X className="text-[#C10000] stroke-3 size-7" />
                                            </div>
                                          );
                                        } else {
                                          return (
                                            <div className=" flex justify-center items-center diaOfensiva rounded-[8px] border border-[#00000031] shadow-md bg-[#A59EF0]">
                                              <Check className="text-white stroke-3 size-7 " />
                                            </div>
                                          );
                                        }
                                      })()}
                                    </div>

                                    <div className="flex flex-col text-center ">
                                      <span className="text-[15px]">TER</span>
                                      {(() => {
                                        if (ofensiva[2] === 0) {
                                          return (
                                            <div className=" flex justify-center items-center diaOfensiva rounded-[8px] border border-[#00000031] shadow-md bg-[#D9D9D9]"></div>
                                          );
                                        } else if (ofensiva[2] === 1) {
                                          return (
                                            <div className=" flex justify-center items-center diaOfensiva rounded-[8px] border border-[#00000031] shadow-md bg-[#EB9481]">
                                              <X className="text-[#C10000] stroke-3 size-7" />
                                            </div>
                                          );
                                        } else {
                                          return (
                                            <div className=" flex justify-center items-center diaOfensiva rounded-[8px] border border-[#00000031] shadow-md bg-[#A59EF0]">
                                              <Check className="text-white stroke-3 size-7 " />
                                            </div>
                                          );
                                        }
                                      })()}
                                    </div>

                                    <div className="flex flex-col text-center ">
                                      <span className="text-[15px]">QUA</span>
                                      {(() => {
                                        if (ofensiva[3] === 0) {
                                          return (
                                            <div className=" flex justify-center items-center diaOfensiva rounded-[8px] border border-[#00000031] shadow-md bg-[#D9D9D9]"></div>
                                          );
                                        } else if (ofensiva[3] === 1) {
                                          return (
                                            <div className=" flex justify-center items-center diaOfensiva rounded-[8px] border border-[#00000031] shadow-md bg-[#EB9481]">
                                              <X className="text-[#C10000] stroke-3 size-7" />
                                            </div>
                                          );
                                        } else {
                                          return (
                                            <div className=" flex justify-center items-center diaOfensiva rounded-[8px] border border-[#00000031] shadow-md bg-[#A59EF0]">
                                              <Check className="text-white stroke-3 size-7 " />
                                            </div>
                                          );
                                        }
                                      })()}
                                    </div>

                                    <div className="flex flex-col text-center ">
                                      <span className="text-[15px]">QUI</span>
                                      {(() => {
                                        if (ofensiva[4] === 0) {
                                          return (
                                            <div className=" flex justify-center items-center diaOfensiva rounded-[8px] border border-[#00000031] shadow-md bg-[#D9D9D9]"></div>
                                          );
                                        } else if (ofensiva[4] === 1) {
                                          return (
                                            <div className=" flex justify-center items-center diaOfensiva rounded-[8px] border border-[#00000031] shadow-md bg-[#EB9481]">
                                              <X className="text-[#C10000] stroke-3 size-7" />
                                            </div>
                                          );
                                        } else {
                                          return (
                                            <div className=" flex justify-center items-center diaOfensiva rounded-[8px] border border-[#00000031] shadow-md bg-[#A59EF0]">
                                              <Check className="text-white stroke-3 size-7 " />
                                            </div>
                                          );
                                        }
                                      })()}
                                    </div>

                                    <div className="flex flex-col text-center ">
                                      <span className="text-[15px]">SEX</span>
                                      {(() => {
                                        if (ofensiva[5] === 0) {
                                          return (
                                            <div className=" flex justify-center items-center diaOfensiva rounded-[8px] border border-[#00000031] shadow-md bg-[#D9D9D9]"></div>
                                          );
                                        } else if (ofensiva[5] === 1) {
                                          return (
                                            <div className=" flex justify-center items-center diaOfensiva rounded-[8px] border border-[#00000031] shadow-md bg-[#EB9481]">
                                              <X className="text-[#C10000] stroke-3 size-7" />
                                            </div>
                                          );
                                        } else {
                                          return (
                                            <div className=" flex justify-center items-center diaOfensiva rounded-[8px] border border-[#00000031] shadow-md bg-[#A59EF0]">
                                              <Check className="text-white stroke-3 size-7 " />
                                            </div>
                                          );
                                        }
                                      })()}
                                    </div>

                                    <div className="flex flex-col text-center ">
                                      <span className="text-[15px]">SAB</span>
                                      {(() => {
                                        if (ofensiva[6] === 0) {
                                          return (
                                            <div className=" flex justify-center items-center diaOfensiva rounded-[8px] border border-[#00000031] shadow-md bg-[#D9D9D9]"></div>
                                          );
                                        } else if (ofensiva[6] === 1) {
                                          return (
                                            <div className=" flex justify-center items-center diaOfensiva rounded-[8px] border border-[#00000031] shadow-md bg-[#EB9481]">
                                              <X className="text-[#C10000] stroke-3 size-7" />
                                            </div>
                                          );
                                        } else {
                                          return (
                                            <div className=" flex justify-center items-center diaOfensiva rounded-[8px] border border-[#00000031] shadow-md bg-[#A59EF0]">
                                              <Check className="text-white stroke-3 size-7 " />
                                            </div>
                                          );
                                        }
                                      })()}
                                    </div>
                                  </>
                                );
                              }
                            })()}
                          </div>
                        </div>

                        <Image
                          width={300}
                          height={500}
                          src="/Vector.svg"
                          className="absolute right-[-50px] top-[-40px] z-[-10]"
                          alt="Decoração"
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              <Flame className=" size-[30px] text-[#cc6b5f] fill-[#e19786]" />
            </div>

            <div
              id="pop2"
              className=" relative w-[55px] h-[55px] rounded-full bg-[#D9D9D9] cursor-pointer flex justify-center items-center border border-[#00000031] shadow-md "
            >
              <div
                onMouseEnter={() => opening2()}
                onMouseLeave={() => closing2()}
                className="w-full h-full absolute rounded-full z-[150] group"
              >
                <div className=" relative w-full h-full group cursor-pointer">
                  <AnimatePresence initial={false}>
                    {pop2 && <div className="w-[70px] h-[100px]"></div>}
                    {pop2 && (
                      <motion.div
                        key="content"
                        initial={{ opacity: 0.95, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0.95, scale: 0.9 }}
                        transition={{ duration: 0.01, ease: "easeInOut" }}
                        className={`pop2_box absolute py-4  bg-white origin-top-left md:left-0 left-[-125%] h-fit transition-all ease-in-out border cursor-default border-[#00000031] shadow-md z-50 rounded-[25px] top-[85px] justify-center flex items-center overflow-hidden  `}
                      >
                        <div className=" w-[85%] h-[95%] flex flex-col relative gap-[2%] z-100">
                          <div className="">
                            <h1 className=" font-medium text-[20px] leading-none cursor-text">
                              Notificações
                            </h1>
                            <h2 className=" font-medium text-[18px] text-[#121212] cursor-text">
                              Fique em dia
                            </h2>
                          </div>

                          <div className="w-full h-fit max-h-[390px] py-1 bg-[rgb(217,217,217,57%)] rounded-[8px] flex items-center flex-col overflow-auto z-100">
                            <div className=" w-full rounded-[20px] max-h-full grid gap-1 pt-2 pb-2 pl-2 pr-2 overflow-y-auto overflow-x-auto">
                              {notificacao?.notificacoes &&
                                notificacao?.notificacoes?.length === 0 && (
                                  <>
                                    <div
                                      id="notificacao"
                                      className="w-full h-fit py-1 bg-[#A39CEC] rounded-[20px] items-center justify-center flex cursor-pointer"
                                    >
                                      <div className=" overflow-hidden w-[90%] max-w-[400px]  flex gap-4 items-center justify-center">
                                        <div className="min-w-[70px] h-[70px] rounded-[15px] bg-[rgba(255,255,255,0.4)] flex justify-center items-center">
                                          <Info className="text-[#7D77BC] size-14" />
                                        </div>
                                        <div className="w-full max-w-[270px]">
                                          <h1 className="text-[20px] text-white">
                                            Não há notificações
                                          </h1>
                                          <h2 className="text-[18px] w-[100%] break-words">
                                            Você não possui notificações no
                                            momento.
                                          </h2>
                                        </div>
                                      </div>
                                    </div>
                                  </>
                                )}

                              {notificacao?.notificacoes &&
                                notificacao?.notificacoes?.length > 0 && (
                                  <>
                                    {notificacao.notificacoes.map(
                                      (nota, index) => {
                                        if (
                                          nota.titulo !==
                                          "Denúncia por violação na comunidade"
                                        ) {
                                          return (
                                            <motion.div
                                              id="perguntas"
                                              key={nota.id || index}
                                              whileTap={{ scale: 0.99 }}
                                              whileHover={{ scale: 1.01 }}
                                              transition={{
                                                duration: 0.2,
                                                ease: "easeInOut",
                                              }}
                                              style={{
                                                backgroundColor:
                                                  `${nota.cor}33` || "#9767f8",
                                              }}
                                              className={`border min-h-fit w-full max-w-full border-[rgba(18,18,18,0.14)] rounded-[20px] overflow-hidden shadow-md `}
                                            >
                                              <button
                                                onClick={() => toggle(index)}
                                                className="w-full min-h-[55px] h-fit flex flex-col justify-between  text-left text-[18px] text-white font-medium transition-all ease-in-out  items-center"
                                              >
                                                <div
                                                  style={{
                                                    backgroundColor:
                                                      nota.cor || "white",
                                                  }}
                                                  className="w-full flex justify-between min-h-[55px] h-fit items-center px-6 "
                                                >
                                                  <span className="flex-1 min-w-0 break-all leading-none whitespace-normal pr-4 line-clamp-4 py-1">
                                                    {nota.titulo}
                                                  </span>

                                                  <span
                                                    className={`text-[18px] text-[rgba(151,103,248,1)] transform transition-transform duration-300 flex justify-center items-center rounded-full ${openIndex === index ? "-rotate-90" : ""}`}
                                                  >
                                                    <ChevronLeft className="text-white" />
                                                  </span>
                                                </div>

                                                <AnimatePresence
                                                  initial={false}
                                                >
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
                                                      transition={{
                                                        duration: 0.3,
                                                        ease: "easeInOut",
                                                      }}
                                                      className="w-full px-6  "
                                                    >
                                                      <div className="w-full pr-1 pt-1 flex justify-end ">
                                                        <span className="ml-auto text-[15px] flex gap-1 font-medium text-[#1E2351]">
                                                          {new Date(
                                                            nota.data
                                                          ).toLocaleDateString(
                                                            "pt-BR",
                                                            {
                                                              day: "numeric",
                                                              month: "long",
                                                              year: "numeric",
                                                            }
                                                          )}
                                                        </span>
                                                      </div>
                                                      <div className=" min-h-fit text-[15px] font-medium text-[#1E2351] pb-4 h-fit">
                                                        <div className="flex gap-1 items-center text-wrap ">
                                                          <div
                                                            style={{
                                                              borderColor:
                                                                nota.cor ||
                                                                "#9767f8",
                                                            }}
                                                            className={`min-w-4 min-h-4 border-3 rounded-full`}
                                                          ></div>
                                                          <span className=" break-all whitespace-normal w-full">
                                                            {nota.subtitulo}
                                                          </span>
                                                        </div>
                                                        <span className="break-words whitespace-normal w-full h-fit">
                                                          {nota.mensagem}
                                                        </span>
                                                      </div>
                                                    </motion.div>
                                                  )}
                                                </AnimatePresence>
                                              </button>
                                            </motion.div>
                                          );
                                        } else {
                                          return (
                                            <motion.div
                                              id="perguntas"
                                              key={nota.id || index}
                                              whileTap={{ scale: 0.99 }}
                                              whileHover={{ scale: 1.01 }}
                                              transition={{
                                                duration: 0.2,
                                                ease: "easeInOut",
                                              }}
                                              className={`bg-[#EB9481] border min-h-fit w-full max-w-full border-[rgba(18,18,18,0.14)] rounded-[20px] overflow-hidden shadow-md `}
                                            >
                                              <button
                                                onClick={() => toggle(index)}
                                                className="w-full min-h-[55px] h-fit flex flex-col justify-between  text-left text-[18px] text-white font-medium transition-all ease-in-out  items-center"
                                              >
                                                <div className="w-full flex justify-between min-h-[55px] h-fit items-center px-6 ">
                                                  <span className="flex gap-1 min-w-0 break-all leading-none whitespace-normal pr-1 line-clamp-4 py-1 items-center">
                                                    <Icons.TriangleAlert className="text-[#994533] size-8 " />
                                                    {nota.titulo}
                                                  </span>

                                                  <span
                                                    className={`text-[18px] text-[rgba(151,103,248,1)] transform transition-transform duration-300 flex justify-center items-center rounded-full ${openIndex === index ? "-rotate-90" : ""}`}
                                                  >
                                                    <ChevronLeft className="text-white" />
                                                  </span>
                                                </div>

                                                <AnimatePresence
                                                  initial={false}
                                                >
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
                                                      transition={{
                                                        duration: 0.3,
                                                        ease: "easeInOut",
                                                      }}
                                                      className="w-full px-6  "
                                                    >
                                                      <div className="w-full pr-1 pt-1 flex justify-end ">
                                                        <span className="ml-auto text-[15px] flex gap-1 font-medium text-[#753527]">
                                                          {new Date(
                                                            nota.data
                                                          ).toLocaleDateString(
                                                            "pt-BR",
                                                            {
                                                              day: "numeric",
                                                              month: "long",
                                                              year: "numeric",
                                                            }
                                                          )}
                                                        </span>
                                                      </div>
                                                      <div className=" min-h-fit text-[15px] font-medium text-[#753527] pb-4 h-fit">
                                                        <div className="flex gap-1 items-center text-wrap ">
                                                          <span className=" break-all whitespace-normal w-full">
                                                            {nota.subtitulo}
                                                          </span>
                                                        </div>
                                                        <div className="break-words whitespace-normal w-full h-fit">
                                                          {/* {
                                                            nota.mensagem.split(
                                                              "Motivo"
                                                            )[0]
                                                          } */}
                                                          <div>
                                                            Pedimos que leia
                                                            atentamente as
                                                            diretrizes da
                                                            comunidade nos
                                                            termos de
                                                            privacidade antes de
                                                            publicar novamente.
                                                          </div>
                                                          <div>
                                                            Nosso objetivo é
                                                            manter um ambiente
                                                            seguro, respeitoso e
                                                            produtivo para todos
                                                            os membros.
                                                          </div>
                                                          <div>
                                                            Por favor, evite
                                                            repetir esse tipo de
                                                            conteúdo no futuro.
                                                            Agradecemos sua
                                                            compreensão e
                                                            colaboração.
                                                          </div>
                                                          <div>
                                                            — Equipe de
                                                            Moderação ThinkSpace
                                                          </div>
                                                        </div>
                                                        <div className="break-words whitespace-normal w-full h-fit">
                                                          {
                                                            nota.mensagem.split(
                                                              "comunidade."
                                                            )[1]
                                                          }
                                                        </div>
                                                        <div className="w-full rounded-[15px] bg-[#AD6359] p-4 flex flex-col gap-2  ">
                                                          <span className="w-full text-[18px] leading-none text-white">
                                                            {nota.mensagem
                                                              .split(
                                                                "alimentares"
                                                              )[1]
                                                              .split(":")[0] +
                                                              nota.mensagem.split(
                                                                "denunciado"
                                                              )[1][0]}
                                                          </span>
                                                          <div className="w-full h-full rounded-[15px] bg-[#fff] p-2">
                                                            <div className="break-words whitespace-normal w-full h-fit text-black">
                                                              {
                                                                nota.mensagem.split(
                                                                  "denunciado:"
                                                                )[1]
                                                              }
                                                            </div>
                                                          </div>
                                                        </div>
                                                      </div>
                                                    </motion.div>
                                                  )}
                                                </AnimatePresence>
                                              </button>
                                            </motion.div>
                                          );
                                        }
                                      }
                                    )}
                                  </>
                                )}
                            </div>
                          </div>
                        </div>

                        <Image
                          width={300}
                          height={500}
                          src="/Vector.svg"
                          className="absolute right-[-50px] top-[-40px] -z-10"
                          alt="Decoração"
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
              <Bell className="size-[30px] text-[rgba(0,0,0,31%)]" />
              {notificacao?.notificacoes &&
                notificacao?.notificacoes.map((item, index) => {
                  if (!item.lida) {
                    NaoLidas = NaoLidas + 1;
                  }

                  if (
                    notificacao.notificacoes &&
                    index === notificacao.notificacoes.length - 1
                  ) {
                    if (notificacao?.notificacoes && NaoLidas) {
                      return (
                        <AnimatePresence key={index}>
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            key={index}
                            className=" rounded-full  w-5 h-5 -top-[2px] flex justify-center items-center -right-1 text-white font-bold absolute bg-[#F92A46]"
                          >
                            {notificacao?.notificacoes && NaoLidas}
                          </motion.div>
                        </AnimatePresence>
                      );
                    }
                  }
                })}
            </div>
          </div>

          <div className="flex gap-2">
            <div className="text-end flex flex-col justify-center ">
              <h1 className="font-medium leading-none text-[clamp(1.35rem,3vw,1.875rem)]">
                {user.primeiroNome}
              </h1>
              <h2 className="font-medium text-[clamp(1.26rem,3vw,1.25rem)] text-[#828181]">
                {user.cargo}
              </h2>
            </div>

            <img
              src={`${user.foto}`}
              className="rounded-full cursor-pointer transition-all w-[55px] h-[55px] shadow-md bg-blue-200 "
              alt="Foto de perfil"
            />
          </div>
        </div>

        <div className="w-full flex lg:flex-row flex-col mt-3 pb-3 gap-[30px] ">
          <div className="w-full lg:w-[60%]">
            <div className="w-full h-[230px] bg-[#CCB2FF] overflow-hidden shadow-md rounded-[35px] flex items-center relative border border-[#00000031] ">
              <div className="z-10 ml-[4%] w-[60%] h-[90%] flex justify-center items-center">
                <div className=" flex flex-col justify-between w-full h-[90%] ">
                  <h1 className="banner_title text-[22px] font-medium break-words">
                    {bannerData.mensagem} {bannerData.relatorio}
                  </h1>

                  <a
                    href={`/home/${bannerData.relatorioUrl}`}
                    className=" rounded-full"
                  >
                    <button className="banner_button bg-[#1E2351] rounded-full text-white text-[18px] shadow-md leading-5">
                      Saiba mais!
                    </button>
                  </a>
                </div>
              </div>

              <Image
                width={300}
                height={500}
                src="/meta.svg"
                alt="Decoração"
                className="banner h-full absolute  right-0 object-cover  "
              />
            </div>

            <h1 className="text-[30px] mt-4 mb-4">Matérias recentes:</h1>
            <div className="w-full ">
              {materias && materias.length === 0 && (
                <div className="w-full h-[230px] bg-[#CCB2FF] shadow-md rounded-[35px] flex items-center relative border border-[#00000031] ">
                  <div className="ml-10  lg: w-[60%] h-[90%] flex justify-center items-center">
                    <div className=" flex flex-col py-2 justify-between w-full h-full  ">
                      <h1 className="text-[20px] max-w-[70%] lg:w-full h-fit font-medium line-clamp-3 break-words">
                        Nenhuma matéria criada ainda. Comece agora e organize
                        seu caminho rumo ao sucesso!
                      </h1>

                      <Link href="/home/materiais" className=" rounded-full">
                        <button className="py-3 px-4 bg-[#1E2351] rounded-full text-white flex justify-center items-center gap-2 text-[18px] shadow-md leading-5 ">
                          <Icons.CirclePlus className="size-8" /> Criar matéria
                        </button>
                      </Link>
                    </div>
                  </div>
                  <Image
                    width={300}
                    height={500}
                    src="/semmateria.svg"
                    alt="Decoração"
                    className=" w-[310px] max-w-[40%]  absolute h-[full] right-0 object-cover lg:flex hidden "
                  />
                </div>
              )}

              {materias && materias.length > 0 && (
                <>
                  <Carousel className="w-full" opts={{ align: "start" }}>
                    <CarouselContent className="gap-4 min-h-[200px]">
                      {materias.map((material, index) => {
                        return (
                          <CarouselItem
                            key={index}
                            className=" basis-full sm:basis-[49%] lg:basis-[32.2%] cursor-pointer"
                          >
                            <Card
                              style={{
                                backgroundColor:
                                  material.cor &&
                                  cores[material.cor as keyof typeof cores]
                                    ? cores[material.cor as keyof typeof cores]
                                    : "#FFFFFF",
                              }}
                              className="h-[200px] rounded-[25px] shadow-md border border-[#00000031] w-full"
                            >
                              <CardContent className="flex items-center justify-center h-full flex-col ">
                                <Link
                                  href={`/home/materiais/${material.id}`}
                                  className=" mt-6 w-[98%]"
                                >
                                  <div className=" flex gap-[6px] w-full items-center relative ">
                                    <div className="w-[60px] h-[60px] rounded-full min-w-[60px] bg-white flex justify-center items-center ">
                                      {(() => {
                                        const IconComponent = icons.find(
                                          (icon) =>
                                            icon.id.toLowerCase() ===
                                            material.icone?.toLowerCase()
                                        )?.Icon;
                                        if (IconComponent) {
                                          return (
                                            <IconComponent className="size-[40px] text-[#757575]" />
                                          );
                                        }
                                        return null;
                                      })()}
                                    </div>

                                    <h1 className="text-[28px] overflow-hidden text-ellipsis line-clamp-2 break-words leading-8 font-medium ">
                                      {material.nome}
                                    </h1>
                                  </div>

                                  <div className="w-full ">
                                    <div className="w-full h-[7px] rounded-full bg-[rgb(30,35,81,14%)] text-[17px] font-medium mt-4">
                                      <div className="w-[0%] h-[7px] rounded-full bg-[rgb(30,35,81,75%)] "></div>
                                    </div>
                                    <div className="flex justify-between ">
                                      <span className="font-medium text-[17px]">
                                        XP
                                      </span>
                                      <span className="font-medium text-[17px]">
                                        {material.xpAcumulada}xp
                                      </span>
                                    </div>
                                  </div>
                                </Link>
                              </CardContent>
                            </Card>
                          </CarouselItem>
                        );
                      })}
                    </CarouselContent>
                    {materias.length > 3 && (
                      <>
                        <CarouselPrevious />
                        <CarouselNext />
                      </>
                    )}
                  </Carousel>
                </>
              )}
            </div>

            <h1 className="text-[30px] mt-4 mb-4">Links úteis:</h1>

            <div className="">
              <Carousel className="w-full" opts={{ align: "start" }}>
                <CarouselContent className="gap-4 min-h-[200px]">
                  <CarouselItem
                    onClick={() => {
                      setLinkUtil1(true);
                    }}
                    className="basis-full sm:basis-[49%] cursor-pointer"
                  >
                    <Card className="h-[320px] rounded-[25px] bg-[#1E2351] shadow-md border border-[#00000031] w-full">
                      <CardContent className="flex items-center justify-center h-full flex-col p-0">
                        <div className="w-[92%] h-[95%] ">
                          <div className="w-full h-[70%] rounded-tl-[25px] rounded-tr-[25px] bg-[#EFE7FF] flex justify-center object-cover">
                            <Image
                              src="/trajetoria.svg"
                              width={300}
                              height={500}
                              alt="Link Útil"
                              className=" h-full w-full "
                            />
                          </div>
                          <p className="text-white text-[18px]">
                            Como os grupos de estudo podem te ajudar na sua
                            trajetória acadêmica?
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </CarouselItem>

                  <CarouselItem
                    onClick={() => {
                      setLinkUtil2(true);
                    }}
                    className="basis-full sm:basis-[49%] cursor-pointer"
                  >
                    <Card className="h-[320px] rounded-[25px] bg-[#1E2351] shadow-md border border-[#00000031] w-full">
                      <CardContent className="flex items-center justify-center h-full flex-col p-0">
                        <div className="w-[92%] h-[95%] ">
                          <div className="w-full h-[70%] rounded-tl-[25px] rounded-tr-[25px] bg-[#EFE7FF] flex justify-center object-cover">
                            <Image
                              src="/eficiente.svg"
                              width={300}
                              height={500}
                              alt="Link Útil"
                              className=" h-full w-full -mb-24"
                            />
                          </div>
                          <p className="text-white text-[18px]">
                            Como posso estudar de forma eficiente?
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </CarouselItem>

                  <CarouselItem
                    onClick={() => {
                      setLinkUtil3(true);
                    }}
                    className="basis-full sm:basis-[49%] cursor-pointer"
                  >
                    <Card className="h-[320px] rounded-[25px] bg-[#1E2351] shadow-md border border-[#00000031] w-full">
                      <CardContent className="flex items-center justify-center h-full flex-col p-0">
                        <div className="w-[92%] h-[95%] ">
                          <div className="w-full h-[70%] rounded-tl-[25px] rounded-tr-[25px] bg-[#EFE7FF] flex justify-center object-cover">
                            <Image
                              src="/contribuem.svg"
                              width={300}
                              height={500}
                              alt="Link Útil"
                              className=" h-full w-full -mb-24"
                            />
                          </div>
                          <p className="text-white text-[18px]">
                            De que forma os flashcards e quizzes contribuem para
                            a minha aprendizagem?
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>
          </div>

          <div className="lg:w-[40%] w-full  ">
            <motion.div
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              transition={{ ease: "easeInOut" }}
              onClick={() => {
                router.push("/home/calendario");
              }}
              className="cursor-pointer bg-white h-[230px] flex flex-col justify-center items-center rounded-[35px] shadow-md bg border border-[#00000031] overflow-hidden"
            >
              <div className=" w-full flex h-[40%] text-center justify-center gap-20 items-center relative">
                <h1 className="text-[30px] font-bold ">
                  {calendario.mesAtual} {calendario.anoAtual}
                </h1>
                <img
                  src="/Vector.svg"
                  alt=""
                  className="absolute w-full rotate-[150deg] "
                />
              </div>

              <div className=" w-[96%] flex flex-row justify-between h-[40%] text-center items-center">
                <div className="  flex justify-center">
                  <div className=" rounded-[15px]  justify-center  ">
                    <h2 className="text-[16px]">
                      {
                        calendario.dias?.[(calendario.diaAtual ?? 0) - 4]
                          ?.diaSemana
                      }
                    </h2>
                    <h1 className="font-bold text-[32px]">
                      {
                        calendario.dias?.[(calendario.diaAtual ?? 0) - 4]
                          ?.diaNumero
                      }
                    </h1>
                  </div>
                </div>

                <div className="  flex justify-center">
                  <div className=" rounded-[15px]  justify-center  ">
                    <h2 className="text-[16px]">
                      {
                        calendario.dias?.[(calendario.diaAtual ?? 0) - 3]
                          ?.diaSemana
                      }
                    </h2>
                    <h1 className="font-bold text-[32px]">
                      {
                        calendario.dias?.[(calendario.diaAtual ?? 0) - 3]
                          ?.diaNumero
                      }
                    </h1>
                  </div>
                </div>

                <div className="  flex justify-center">
                  <div className=" rounded-[15px]  justify-center  ">
                    <h2 className="text-[16px]">
                      {
                        calendario.dias?.[(calendario.diaAtual ?? 0) - 2]
                          ?.diaSemana
                      }
                    </h2>
                    <h1 className="font-bold text-[32px]">
                      {
                        calendario.dias?.[(calendario.diaAtual ?? 0) - 2]
                          ?.diaNumero
                      }
                    </h1>
                  </div>
                </div>

                <div className=" translate-y-[-10px] flex justify-center">
                  <div className="w-[60px] rounded-[15px] py-2 justify-center bg-[#CCB2FF] shadow-md">
                    <h2 className="text-[16px]">
                      {
                        calendario.dias?.[(calendario.diaAtual ?? 0) - 1]
                          ?.diaSemana
                      }
                    </h2>
                    <h1 className="font-bold text-[32px]">
                      {
                        calendario.dias?.[(calendario.diaAtual ?? 0) - 1]
                          ?.diaNumero
                      }
                    </h1>
                  </div>
                </div>

                <div className="  flex justify-center">
                  <div className=" rounded-[15px]  justify-center  ">
                    <h2 className="text-[16px]">
                      {calendario.dias?.[calendario.diaAtual ?? 0]?.diaSemana}
                    </h2>
                    <h1 className="font-bold text-[32px]">
                      {calendario.dias?.[calendario.diaAtual ?? 0]?.diaNumero}
                    </h1>
                  </div>
                </div>

                <div className="  flex justify-center">
                  <div className=" rounded-[15px]  justify-center  ">
                    <h2 className="text-[16px]">
                      {
                        calendario.dias?.[(calendario.diaAtual ?? 0) + 1]
                          ?.diaSemana
                      }
                    </h2>
                    <h1 className="font-bold text-[32px]">
                      {
                        calendario.dias?.[(calendario.diaAtual ?? 0) + 1]
                          ?.diaNumero
                      }
                    </h1>
                  </div>
                </div>

                <div className="  flex justify-center">
                  <div className=" rounded-[15px]  justify-center  ">
                    <h2 className="text-[16px]">
                      {
                        calendario.dias?.[(calendario.diaAtual ?? 0) + 2]
                          ?.diaSemana
                      }
                    </h2>
                    <h1 className="font-bold text-[32px]">
                      {
                        calendario.dias?.[(calendario.diaAtual ?? 0) + 2]
                          ?.diaNumero
                      }
                    </h1>
                  </div>
                </div>
              </div>
            </motion.div>

            <h1 className="text-[30px] mt-4 mb-4 ">
              Salas de estudo recentes:
            </h1>
            <div
              id="scroll"
              className="max-h-[665px] overflow-y-auto pr-1 rounded-[25px] "
            >
              {salas.length === 0 && (
                <div className="w-full h-[400px] bg-[#CCB2FF] py-4 rounded-[25px] flex  items-center flex-col shadow-md">
                  <div className="w-[90%] h-[35%]  flex justify-center items-center">
                    <h1 className="banner_title text-[22px] font-medium line-clamp-4 break-words">
                      Entre em uma sala de estudos para acessar materiais
                      diversos, tirar dúvidas e trocar ideias com outros
                      estudantes.
                    </h1>
                  </div>

                  <div className="flex relative w-[90%] h-[65%] ">
                    <div className="h-full absolute z-10 ">
                      <Image
                        width={300}
                        height={500}
                        src="/irparasalas.svg"
                        alt="Ir para Salas Decoration"
                        className="h-full w-full rounded-[25px]"
                      />
                    </div>

                    <div className=" z-20 ml-auto mr-[4%] w-[45%] h-[61px] ">
                      <a className=" cursor-pointer rounded-full">
                        <button
                          onClick={() => {
                            if (newUser) {
                              router.push("/home/comunidades/postagens");
                            } else {
                              setNewToComunityPop(true);
                            }
                            RefreshUser();
                          }}
                          className="banner_button bg-[#1E2351] rounded-full text-white text-[18px] shadow-md leading-5"
                        >
                          Ir para aba de Comunidades
                        </button>
                      </a>
                    </div>
                  </div>
                </div>
              )}
              {salas.length > 0 && (
                <>
                  {salas.map((sala, index) => {
                    if (index < 5) {
                      return (
                        <div
                          key={index}
                          className="bg-white min-h-fit w-full h-[350px] rounded-[35px] shadow-md flex justify-center items-center mb-4 border border-[#00000031] p-4 "
                        >
                          <div className="flex flex-col justify-between w-full gap-4">
                            <div className="flex gap-[8px]">
                              {sala.topicos.map((topico, index) => {
                                const randomColor =
                                  cor[Math.floor(Math.random() * cor.length)];
                                return (
                                  <h2
                                    key={index}
                                    style={{ backgroundColor: randomColor }}
                                    className="text-[18px] px-3 text-white rounded-full "
                                  >
                                    {topico}
                                  </h2>
                                );
                              })}
                            </div>

                            <h1 className="font-medium text-[30px] leading-none">
                              {sala.nome}
                            </h1>
                            <div className="w-full leading-[55px]">
                              <div className="h-[200px] w-full ">
                                <img
                                  src={sala.banner}
                                  alt="Sala de Estudo"
                                  className="w-full h-full object-cover rounded-[25px] shadow-md"
                                />
                              </div>
                              <div className="w-full h-[1px] bg-[#1E2351] mt-3 "></div>
                            </div>

                            <div className="flex items-center ">
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
                            </div>

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
                    }
                  })}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
