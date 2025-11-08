"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  NotebookPen,
  User,
  ChartLine,
  CalendarDays,
  Cog,
  LogOut,
  ChevronUp,
  X,
} from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState, useRef } from "react";
import { Tooltip } from "@heroui/react";
import { AnimatePresence, motion } from "framer-motion";
import { Backdrop3 } from "./backdrop";
import { useRouter } from "next/navigation";
import ErrorModal from "@/components/ui/ErrorModal";
import { RefreshUserContext } from "@/app/context/RefreshUserContext";

type UserData = {
  primeiroNome?: string;
  cargo?: string;
  foto?: string;
  // add other properties if needed
};

export const Sidebar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [message, setMessage] = useState("");
  const [logoutPop, setLogoutPop] = useState(false);
  const [user, setUser] = useState<UserData>({});
  const [visible, setVisible] = useState(false);
  const bottomBar = useRef<HTMLDivElement>(null);
  const [newToComunityPop, setNewToComunityPop] = useState(false);
  const [newUser, setNewUser] = useState(false);

  const handleLogout = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
      method: "POST",
      credentials: "include",
    });

    const data = await res.json();
    if (data.message === "Logout realizado com sucesso") {
      router.push("/");
    }
    //  console.log(data);
  };

  type BannerData = {
    relatorioUrl?: string;
    // add other properties if needed
  };

  const [bannerData, setBannerData] = useState<BannerData>({});

  const bar = () => {
    if (!visible) {
      //  console.log(visible + " tornando visível");

      if (bottomBar.current) {
        bottomBar.current.style.width = "90%";
      }
      setTimeout(() => {
        setVisible(!visible);
      }, 100);
    } else {
      //  console.log(visible + " tornando invisível");
      setVisible(!visible);

      setTimeout(() => {
        if (bottomBar.current) {
          bottomBar.current.style.width = "65px";
        }
      }, 400);
    }
  };

  useEffect(() => {
    const banner = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/home/banner`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        const data = await res.json();
        setBannerData(data);
      } catch (err) {
        setMessage("Erro ao carregar saudação.");
        console.error(err);
      }
    };
    banner();

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
        setUser(data);
      } catch (err) {
        setMessage("Erro ao carregar saudação.");
        console.error(err);
      }
    };
    user();

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

  const RefreshUser = async () => {
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

  function closing() {
    setNewToComunityPop(false);
  }

  return (
    <>
      {message && (
        <ErrorModal
          message=""
          onClose={() => {
            setMessage("");
          }}
        />
      )}
      {logoutPop && (
        <>
          <motion.div
            key="content"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 0.94 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className={`w-full h-full fixed flex justify-center items-center opacity-1 z-[1100] `}
          >
            <div
              className="w-full h-full absolute"
              onClick={() => setLogoutPop(false)}
            ></div>
            <motion.div
              key="content"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 0.94 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className={`w-[700px] p-4 h-[350px] min-fit flex rounded-[40px] z-[1100]  opacity-1 `}
            >
              <div
                id="white-box"
                className={` w-full h-full rounded-[40px] bg-white shadow-md flex justify-center items-center relative overflow-hidden z-[1100] left-[50%] translate-x-[-50%] top-[50%] translate-y-[-50%]`}
              >
                <Image
                  width={300}
                  height={500}
                  src="/Vector.svg"
                  alt="Decoração"
                  className="absolute top-0 left-[-180px] rotate-90 w-[550px]"
                />
                <Image
                  width={300}
                  height={500}
                  src="/Vector.svg"
                  alt="Decoração"
                  className="absolute bottom-[-40px] right-[-170px] -rotate-90 w-[550px]"
                />

                <div className="w-[80%] h-[85%] flex flex-col items-center gap-2 z-[900] ">
                  <div className="flex flex-col justify-center items-center">
                    <img
                      src={`${user.foto}`}
                      alt="Foto de perfil"
                      className="rounded-full w-20 h-20"
                    />
                    <span className="font-medium text-[30px]">
                      {user.primeiroNome}{" "}
                    </span>
                    <span className="text-[20px]"></span>
                  </div>

                  <h1 className="text-center text-[20px] font-medium my-auto">
                    Saindo da conta. Até a próxima sessão!
                  </h1>
                  <div className="w-full flex justify-center gap-4 mt-auto">
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setLogoutPop(false)}
                      className="p-[10px_15px] rounded-[20px] text-[18px] bg-[#F1F1F1] border border-[rgba(68,68,68, 0.17)]"
                    >
                      Voltar
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => {
                        setLogoutPop(false);
                        handleLogout();
                      }}
                      className="p-[10px_15px] min-w-[65px] rounded-[20px] text-[18px] text-white bg-[#9767F8] border border-[rgba(68,68,68, 0.17)]"
                    >
                      Sair
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          <div className="w-full absolute flex justify-center items-center ">
            <Backdrop3 onClick={() => setLogoutPop(false)} />
          </div>
        </>
      )}

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
                    aprendizado mais colaborativo, respeitoso e produtivo. Aqui,
                    você pode criar salas personalizadas, interagir com colegas,
                    compartilhar materiais e trocar experiências de estudo. Para
                    que todos aproveitem esse ambiente de forma positiva e
                    segura, é essencial seguir algumas regras de convivência:
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
                    Caso deseje rever essas e outras diretrizes, consulte nossos
                    Termos de Uso disponíveis na plataforma. Juntos, podemos
                    construir uma comunidade de aprendizado segura, acolhedora e
                    inspiradora.
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

      <RefreshUserContext.Provider value={{ RefreshUser }}>
        <div className=" min-w-[80px]  h-[100vh] min-h-fit hidden lg:flex flex-col justify-center items-center ml-2 z-[100]">
          <nav className="bg-white min-w-[80px] min-h-fit h-[98%] flex flex-col items-center border border-[#00000031] shadow-md rounded-[70px] fixed ">
            <div className=" h-[92%] max-h-[1000px] px-1 flex flex-col justify-between items-center overflow-hidden ">
              <Link className="relative" href="/home">
                <Tooltip
                  closeDelay={0}
                  content="Menu Principal"
                  placement="right"
                  className="w-fit text-[18px]"
                  showArrow={true}
                >
                  <motion.div
                    initial="initial"
                    animate="initial"
                    whileHover="hovered"
                    whileTap={{ scale: 0.95 }}
                    variants={{
                      initial: { scale: 1 },
                      hovered: { scale: 1.05 },
                    }}
                    className="w-[55px] h-[55px] mt-5 cursor-pointer relative"
                  >
                    {/* Show only the correct icon */}
                    {pathname === "/home" ? (
                      <>
                        <motion.img
                          src="/Light Bulb.png"
                          alt="Logo"
                          className="w-full absolute"
                          variants={{
                            initial: { scale: 1 },
                            hovered: { scale: 1.15 },
                          }}
                        />
                      </>
                    ) : (
                      <>
                        <motion.img
                          src="/Light Bulb.png"
                          alt="Logo"
                          className="w-full absolute scale-100"
                          variants={{
                            initial: { scale: 0 },
                            hovered: { scale: 1 },
                          }}
                        />
                      </>
                    )}
                    <motion.img
                      src="/Light Bulb-off.png"
                      width={300}
                      height={500}
                      alt="Logo"
                      className=" z-10 w-full absolute"
                    />
                  </motion.div>
                </Tooltip>
              </Link>

              <div className="flex flex-col items-center gap-[18px]">
                <Link href="/home/materiais" className="">
                  <Tooltip
                    closeDelay={0}
                    content="Materiais"
                    placement="right"
                    className="w-fit text-[18px]"
                    showArrow={true}
                  >
                    <motion.button
                      animate={{ scale: 1 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{
                        duration: 0.2,
                      }}
                      className={` ${
                        pathname === "/home/materiais"
                          ? "bg-[#A39CEC]"
                          : "bg-transparent"
                      } relative p-[10px] rounded-full `}
                    >
                      <NotebookPen
                        className={`size-[24px] cursor-pointer ${pathname !== "/home/materiais" ? "text-black" : "text-white"}`}
                      />
                    </motion.button>
                  </Tooltip>
                </Link>

                {/* href="/home/comunidades/postagens" */}
                <div
                  onClick={() => {
                    if (newUser) {
                      router.push("/home/comunidades/postagens");
                    } else {
                      setNewToComunityPop(true);
                    }
                  }}
                  className=""
                >
                  <Tooltip
                    closeDelay={0}
                    content="Comunidades"
                    placement="right"
                    className="w-fit text-[18px]"
                    showArrow={true}
                  >
                    <motion.button
                      animate={{ scale: 1 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{
                        duration: 0.2,
                      }}
                      className={` ${
                        pathname.startsWith("/home/comunidades")
                          ? "bg-[#A39CEC]"
                          : "bg-transparent"
                      } relative p-[10px] rounded-full `}
                    >
                      <User
                        className={`size-[24px] cursor-pointer ${pathname.startsWith("/home/comunidades") ? "text-white" : "text-black"}`}
                      />
                    </motion.button>
                  </Tooltip>
                </div>

                <Link
                  href={`${bannerData.relatorioUrl && `/home/${bannerData.relatorioUrl}`} `}
                  className=""
                >
                  <Tooltip
                    closeDelay={0}
                    content="Métricas"
                    placement="right"
                    className="w-fit text-[18px]"
                    showArrow={true}
                  >
                    <motion.button
                      animate={{ scale: 1 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{
                        duration: 0.2,
                      }}
                      className={` ${
                        pathname.endsWith("/metrica") &&
                        pathname.startsWith("/home/users/")
                          ? "bg-[#A39CEC]"
                          : "bg-transparent"
                      } relative p-[10px] rounded-full `}
                    >
                      <ChartLine
                        className={`size-[24px] cursor-pointer ${
                          pathname.endsWith("/metrica") &&
                          pathname.startsWith("/home/users/")
                            ? "text-white"
                            : "text-black"
                        }`}
                      />
                    </motion.button>
                  </Tooltip>
                </Link>

                <Link href={`/home/calendario`} className="">
                  <Tooltip
                    closeDelay={0}
                    content="Calendário"
                    placement="right"
                    className="w-fit text-[18px]"
                    showArrow={true}
                  >
                    <motion.button
                      animate={{ scale: 1 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{
                        duration: 0.2,
                      }}
                      className={` ${
                        pathname === "/home/calendario"
                          ? "bg-[#A39CEC]"
                          : "bg-transparent"
                      } relative p-[10px] rounded-full `}
                    >
                      <CalendarDays
                        className={`size-[24px] cursor-pointer ${pathname !== "/home/calendario" ? "text-black" : "text-white"}`}
                      />
                    </motion.button>
                  </Tooltip>
                </Link>

                <Link href={`/home/configuracoes/informacoes`} className="">
                  <Tooltip
                    closeDelay={0}
                    content="Configurações"
                    placement="right"
                    className="w-fit text-[18px]"
                    showArrow={true}
                  >
                    <motion.button
                      animate={{ scale: 1 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{
                        duration: 0.2,
                      }}
                      className={` ${
                        pathname == "/home/configuracoes/informacoes" ||
                        pathname == "/home/configuracoes/notificacao" ||
                        pathname == "/home/configuracoes/personalizacao" ||
                        pathname == "/home/configuracoes/conta"
                          ? "bg-[#A39CEC]"
                          : "bg-transparent"
                      } relative p-[10px] rounded-full `}
                    >
                      <Cog
                        className={`size-[24px] cursor-pointer ${
                          pathname == "/home/configuracoes/informacoes" ||
                          pathname == "/home/configuracoes/notificacao" ||
                          pathname == "/home/configuracoes/personalizacao" ||
                          pathname == "/home/configuracoes/conta"
                            ? "text-white"
                            : "text-black"
                        }`}
                      />
                    </motion.button>
                  </Tooltip>
                </Link>
              </div>

              <Tooltip
                closeDelay={0}
                content="Sair"
                placement="right"
                className="w-fit text-[18px]"
                showArrow={true}
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setLogoutPop(true)}
                  id="side_pop"
                  className="relative p-[10px] rounded-full "
                >
                  <LogOut className="size-[24px] cursor-pointer text-black " />
                </motion.button>
              </Tooltip>
            </div>
          </nav>
        </div>

        <motion.div
          ref={bottomBar}
          className={`${visible ? "h-[85px] " : "left-[50%] translate-x-[-50%]"} w-[65px] left-[50%] translate-x-[-50%] fixed bottom-0 rounded-tl-[10px] rounded-tr-[10px] min-h-fit flex flex-col justify-center items-center z-[100] overflow-hidden `}
        >
          <div
            className="bg-[#D9D9D9] w-[65px] h-[25px] rounded-tl-[10px] lg:hidden rounded-tr-[10px] mt-auto flex justify-center items-center cursor-pointer"
            onClick={() => bar()}
          >
            <ChevronUp
              className={` ${visible ? "rotate-[180deg]" : ""} transition-all ease-in-out duration-400 `}
            />
          </div>

          <nav
            className={`${visible ? "mb-[5px]" : "-mb-[75px]"} lg:hidden transition-all ease-in-out duration-400 bg-white w-full min-h-fit h-[70px] flex flex-col items-center border border-[#00000031] shadow-md rounded-[70px]`}
          >
            <div className=" h-full w-full flex justify-between px-5 items-center overflow-hidden ">
              <Link className="relative" href="/home">
                <Tooltip
                  closeDelay={0}
                  content="Menu Principal"
                  placement="right"
                  className="w-fit text-[18px] "
                  showArrow={true}
                >
                  <motion.div
                    initial="initial"
                    animate="initial"
                    whileHover="hovered"
                    whileTap={{ scale: 0.95 }}
                    variants={{
                      initial: { scale: 1 },
                      hovered: { scale: 1.05 },
                    }}
                    className="w-[36px] h-[36px] mb-2 cursor-pointer relative"
                  >
                    {/* Show only the correct icon */}
                    {pathname === "/home" ? (
                      <>
                        <motion.img
                          src="/Light Bulb.png"
                          alt="Logo"
                          className="w-full absolute"
                          variants={{
                            initial: { scale: 1 },
                            hovered: { scale: 1.15 },
                          }}
                        />
                      </>
                    ) : (
                      <>
                        <motion.img
                          src="/Light Bulb.png"
                          alt="Logo"
                          className="w-full absolute scale-100"
                          variants={{
                            initial: { scale: 0 },
                            hovered: { scale: 1 },
                          }}
                        />
                      </>
                    )}
                    <motion.img
                      src="/Light Bulb-off.png"
                      width={300}
                      height={500}
                      alt="Logo"
                      className=" z-10 w-full absolute"
                    />
                  </motion.div>
                </Tooltip>
              </Link>

              <div className="flex items-center  ">
                <Link href="/home/materiais" className="">
                  <Tooltip
                    closeDelay={0}
                    content="Materiais"
                    placement="right"
                    className="w-fit text-[18px]"
                    showArrow={true}
                  >
                    <motion.button
                      animate={{ scale: 1 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{
                        duration: 0.2,
                      }}
                      className={` ${
                        pathname === "/home/materiais"
                          ? "bg-[#A39CEC]"
                          : "bg-transparent"
                      } relative p-[10px] rounded-full `}
                    >
                      <NotebookPen
                        className={`size-[24px] cursor-pointer ${pathname !== "/home/materiais" ? "text-black" : "text-white"}`}
                      />
                    </motion.button>
                  </Tooltip>
                </Link>

                <div
                  onClick={() => {
                    if (newUser) {
                      router.push("/home/comunidades/postagens");
                    } else {
                      setNewToComunityPop(true);
                    }
                  }}
                  className=""
                >
                  <Tooltip
                    closeDelay={0}
                    content="Comunidades"
                    placement="right"
                    className="w-fit text-[18px]"
                    showArrow={true}
                  >
                    <motion.button
                      animate={{ scale: 1 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{
                        duration: 0.2,
                      }}
                      className={` ${
                        pathname.startsWith("/home/comunidades")
                          ? "bg-[#A39CEC]"
                          : "bg-transparent"
                      } relative p-[10px] rounded-full `}
                    >
                      <User
                        className={`size-[24px] cursor-pointer ${pathname.startsWith("/home/comunidades") ? "text-white" : "text-black"}`}
                      />
                    </motion.button>
                  </Tooltip>
                </div>

                <Link
                  href={`${bannerData.relatorioUrl && `/home/${bannerData.relatorioUrl}`} `}
                  className=""
                >
                  <Tooltip
                    closeDelay={0}
                    content="Métricas"
                    placement="right"
                    className="w-fit text-[18px]"
                    showArrow={true}
                  >
                    <motion.button
                      animate={{ scale: 1 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{
                        duration: 0.2,
                      }}
                      className={` ${
                        pathname.endsWith("/metrica") &&
                        pathname.startsWith("/home/users/")
                          ? "bg-[#A39CEC]"
                          : "bg-transparent"
                      } relative p-[10px] rounded-full `}
                    >
                      <ChartLine
                        className={`size-[24px] cursor-pointer ${
                          pathname.endsWith("/metrica") &&
                          pathname.startsWith("/home/users/")
                            ? "text-white"
                            : "text-black"
                        }`}
                      />
                    </motion.button>
                  </Tooltip>
                </Link>

                <Link href={`/home/calendario`} className="">
                  <Tooltip
                    closeDelay={0}
                    content="Calendário"
                    placement="right"
                    className="w-fit text-[18px]"
                    showArrow={true}
                  >
                    <motion.button
                      animate={{ scale: 1 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{
                        duration: 0.2,
                      }}
                      className={` ${
                        pathname === "/home/calendario"
                          ? "bg-[#A39CEC]"
                          : "bg-transparent"
                      } relative p-[10px] rounded-full `}
                    >
                      <CalendarDays
                        className={`size-[24px] cursor-pointer ${pathname !== "/home/calendario" ? "text-black" : "text-white"}`}
                      />
                    </motion.button>
                  </Tooltip>
                </Link>

                <Link href={`/home/configuracoes/informacoes`} className="">
                  <Tooltip
                    closeDelay={0}
                    content="Configurações"
                    placement="right"
                    className="w-fit text-[18px]"
                    showArrow={true}
                  >
                    <motion.button
                      animate={{ scale: 1 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{
                        duration: 0.2,
                      }}
                      className={` ${
                        pathname == "/home/configuracoes/informacoes" ||
                        pathname == "/home/configuracoes/notificacao" ||
                        pathname == "/home/configuracoes/personalizacao" ||
                        pathname == "/home/configuracoes/conta"
                          ? "bg-[#A39CEC]"
                          : "bg-transparent"
                      } relative p-[10px] rounded-full `}
                    >
                      <Cog
                        className={`size-[24px] cursor-pointer ${
                          pathname == "/home/configuracoes/informacoes" ||
                          pathname == "/home/configuracoes/notificacao" ||
                          pathname == "/home/configuracoes/personalizacao" ||
                          pathname == "/home/configuracoes/conta"
                            ? "text-white"
                            : "text-black"
                        }`}
                      />
                    </motion.button>
                  </Tooltip>
                </Link>
              </div>

              <Tooltip
                closeDelay={0}
                content="Sair"
                placement="right"
                className="w-fit text-[18px]"
                showArrow={true}
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setLogoutPop(true)}
                  id="side_pop"
                  className="relative p-[10px] rounded-full "
                >
                  <LogOut className="size-[24px] cursor-pointer text-black " />
                </motion.button>
              </Tooltip>
            </div>
          </nav>
        </motion.div>
      </RefreshUserContext.Provider>
    </>
  );
};
