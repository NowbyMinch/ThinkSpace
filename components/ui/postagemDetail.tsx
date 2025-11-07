import { Bookmark, ShieldX, Trash, X } from "lucide-react";
import React, { useEffect, useState, useContext, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { FavoritosContext } from "@/app/home/comunidades/layout";
import { Backdrop3 } from "@/app/home/components/backdrop";
import ErrorModal from "./ErrorModal";

type Props = {
  message?: string;
  comentario?: boolean;
  Mine?: boolean;
  appear?: boolean;
  index?: number;
  last?: number;
  onClose?: () => void;
  onError?: (message: string) => void;
};

const PostagemDetail: React.FC<Props> = ({
  message,
  comentario,
  Mine,
  appear,
  index,
  last,
  onClose,
  onError,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isFavorito, setIsFavorito] = useState<boolean>(false);
  const [messageError, setMessage] = useState<string | null>(null);

  const { refreshFavoritos } = useContext(FavoritosContext);

  const [denunciaOpen, setDenunciaOpen] = useState(false);

  function closing() {
    setDenunciaOpen(false);
    onClose?.()
  }

  // ✅ Load once
  useEffect(() => {
    const loadFavorito = async () => {
      const user = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/id`, {
        credentials: "include",
      }).then((res) => res.json());

      const favoritos = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/sala-estudo/usuario/${user.userId}/favoritos`,
        { credentials: "include" }
      ).then((res) => res.json());

      const found = favoritos.some((p: any) => p.id === message);
      setIsFavorito(found);
    };

    loadFavorito();
  }, [message]);

  // ✅ DELETE POST
  const Delete = async () => {
    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/sala-estudo/post/${message}`,
        { method: "DELETE", credentials: "include" }
      );

      onClose?.();
      if (pathname.split("/")[5] === message) router.back();
    } catch (error) {
      console.error(error);
    }
  };

  // ✅ DELETE COMMENT
  const DeleteComentario = async () => {
    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/sala-estudo/comentario/${message}`,
        { method: "DELETE", credentials: "include" }
      );

      onClose?.();
    } catch (error) {
      console.error(error);
    }
  };

  // ✅ FAVORITE / UNFAVORITE (instant UI)
  const toggleFavorito = async () => {
    try {
      // ✅ Optimistic UI (instant)
      setIsFavorito((prev) => !prev);

      const user = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/id`, {
        credentials: "include",
      }).then((res) => res.json());

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/sala-estudo/post/${message}/salvar/${user.userId}`,
        { method: "POST", credentials: "include" }
      );

      const data = await res.json();
      console.log("Favoritar Response:", data);

      if (
        data.message === "Post salvo com sucesso." ||
        data.message === "Salvamento removido com sucesso."
      ) {
        // ✅ Update Layout instantly
        refreshFavoritos();
      } else {
        // ❌ Backend error → Undo
        setIsFavorito((prev) => !prev);
        onError?.(data.message);
      }
    } catch (error) {
      // ❌ Request failed → Undo
      setIsFavorito((prev) => !prev);
      console.error(error);
    }
  };

  const motivos = [
    "Spam ou enganoso",
    "Desinformação",
    "Atos perigosos ou nocivos",
    "Conteúdo de incitação ao ódio ou abusivo",
    "Assédio ou bullying",
    "Promove terrorismo",
    "Conteúdo sexual",
    "Conteúdo violento ou repulsivo",
    "Suicídio, automutilação ou transtornos alimentares",
    "Abuso infantil",
  ];

  const [motivo, setMotivo] = useState("");

  // ✅ DENUNCIAR POST
  const Denunciar = async () => {
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
      postId: message,
      denuncianteId: userIDdata1.userId,
      motivo: motivo,
    };

    const Res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/sala-estudo/post/denunciar`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload), // ✅ send the object, not the string
        credentials: "include",
      }
    );

    const Data = await Res.json();
    console.log(Data, "DATA ETAPA - 1");
    if (Data.message !== "Denúncia registrada com sucesso.") {
      setMessage(Data.error);
      return;
    }

    // onClose?.();
  };

  const boxRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    function handleClickOutside(e: Event) {
      // If click is not inside the modal box → close
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) {
        onClose?.();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [onClose]);

  return (
    <>
      {messageError && (
        <ErrorModal
          key={`error-${messageError}`}
          message={messageError}
          onClose={() => setMessage(null)}
        />
      )}

      {denunciaOpen && (
        <>
          <motion.div
            key={`denuncia-${message}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            ref={boxRef}
            className="fixed left-0 right-0 top-0 bottom-0 flex justify-center items-center z-[1100]"
          >
            <div className="absolute inset-0" onClick={() => closing()} />

            <motion.div
              key="modal-wrapper"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 0.94 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative z-[1101] rounded-[40px] overflow-hidden shadow-md"
              style={{ width: 640 }}
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
                  className="p-4 gap-3 w-full rounded-[40px] overflow-hidden shadow-md flex flex-col items-center relative z-[1100]"
                >
                  <img
                    src="/Vector.svg"
                    alt="Decoração"
                    className="absolute bottom-0 right-[-180px] rotate-[260deg] w-[550px] -z-10"
                  />

                  <div className="flex justify-between items-center w-full">
                    <h1 className="text-[35px] font-medium self-end leading-none">
                      Denúncia
                    </h1>
                    <div className="w-fit">
                      <motion.div
                        whileHover={{ scale: 1.08 }}
                        whileTap={{ scale: 0.92 }}
                        onClick={closing}
                        className="cursor-pointer w-6 h-6"
                      >
                        <X className="w-full h-full" />
                      </motion.div>
                    </div>
                  </div>
                  <p className="text-[rgb(150,149,149)] text-[20px] font-medium">
                    Obrigado por ajudar a manter nossa comunidade segura e
                    respeitosa! Conte para nós o que aconteceu, e vamos
                    investigar para garantir um ambiente melhor para todos.
                  </p>

                  <div className="w-full flex flex-col gap-2 font-medium text-[#303030]">
                    {motivos.map((motivo, index) => (
                      <label
                        key={index}
                        className="flex items-center gap-3 cursor-pointer select-none "
                      >
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="relative"
                        >
                          <motion.input
                            type="radio"
                            name="motivo"
                            value={motivo}
                            onChange={() => {
                              setMotivo(motivo);
                            }}
                            className="peer sr-only "
                          />
                          <div className="h-5 w-5 rounded-full border-2 border-[#303030] peer-checked:border-2 peer-checked:border-[#9767F8] peer-checked:bg-[#9767F8]"></div>
                        </motion.div>

                        {/* <motion.input
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          type="radio"
                          name="motivo"
                          value={motivo}
                          className=" cursor-pointer h-5 w-5 border-[#303030] accent-[#9767F8]"
                        /> */}

                        <span className="text-[18px]">{motivo}</span>
                      </label>
                    ))}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ ease: "easeInOut" }}
                    onClick={Denunciar}
                    className="self-start bg-[#9B79E0] text-white px-4 py-2 shadow-md  rounded-full"
                  >
                    Denunciar
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
      <AnimatePresence>
        {appear && (
          <>
            <motion.div
              key="modalCloseBox"
              className="origin-top-left relative mr-[-11px] z-50 cursor-pointer"
            >
              <div
                className={`w-5 h-5 absolute ${index !== last ? "-top-5 right-[13px]" : "-top-5 right-[13px]"} `}
              ></div>
            </motion.div>

            <motion.div
              key="modal"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{
                scale: 0,
                opacity: 0,
                transition: { duration: 0.15, ease: "easeInOut" },
              }}
              ref={boxRef}
              className="origin-top-left relative mr-[-11px] z-50"
            >
              <div
                className={`absolute right-0 ${
                  index === last ? "bottom-9" : "-top-full mt-2"
                } w-[160px] rounded-2xl bg-white shadow-md border-[1px] border-[rgba(0,0,0,0.26)]`}
              >
                <div className="flex flex-col w-full text-base">
                  <button
                    onClick={() => {
                      setDenunciaOpen(true);
                    }}
                    className="mx-2 text-[#726BB6] text-[20px] px-2 w-[95%] py-2 flex gap-2 items-center"
                  >
                    <ShieldX /> Denunciar
                  </button>

                  {!comentario && (
                    <>
                      <hr className="border-t-[2px] border-[#D7DDEA] mx-4" />

                      <button
                        onClick={() => {
                          toggleFavorito();
                          onClose?.();
                        }}
                        className="mx-2 text-[#726BB6] text-[20px] px-2 w-[95%] py-2 flex gap-2 items-center"
                      >
                        {isFavorito ? (
                          <>
                            <Bookmark fill="currentColor" /> Desfavoritar
                          </>
                        ) : (
                          <>
                            <Bookmark /> Favoritar
                          </>
                        )}
                      </button>
                    </>
                  )}

                  {Mine && (
                    <>
                      <hr className="border-t-[2px] border-[#D7DDEA] mx-4" />
                      <button
                        onClick={comentario ? DeleteComentario : Delete}
                        className="mx-2 text-[#726BB6] text-[20px] px-2 w-[95%] py-2 flex gap-2 items-center"
                      >
                        <Trash /> Excluir
                      </button>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default PostagemDetail;
