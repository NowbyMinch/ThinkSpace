"use client";
import React, { useEffect, useRef, useState } from "react";
import { SendHorizonal } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import LoadingMessage from "./LoadingMessage";

type UserData = {
  primeiroNome?: string;
  cargo?: string;
  foto?: string;
};

type ChatMateriaisProps = {
  idMaterial: string;
  appear: boolean;
};

type Historico = {
  id: string;
  mensagemIa?: string | null;
  mensagemUsuario?: string | null;
};

export const ChatMateriais = ({ idMaterial, appear }: ChatMateriaisProps) => {
  const [user, setUser] = useState<UserData>({});
  const [mensagem, setMensagem] = useState("");
  const [historicoUsuario, setHistoricoUsuario] = useState<Historico[]>([]);
  const [historicoBot, setHistoricoBot] = useState<Historico[]>([]);
  const [insideLoading, setInsideLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Drag & Resize
  const [chatWidth, setChatWidth] = useState(400);
  const [chatHeight, setChatHeight] = useState(600);
  const [isResizing, setIsResizing] = useState(false);
  const [position, setPosition] = useState({ x: 100, y: 100 });

  const chatRef = useRef<HTMLDivElement>(null);
  const offset = useRef({ x: 0, y: 0 });
  const resizeDirection = useRef<{ right?: boolean; bottom?: boolean }>({});

  const beginResize = (dir: "right" | "bottom" | "corner", e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsResizing(true);
    resizeDirection.current = {
      right: dir === "right" || dir === "corner",
      bottom: dir === "bottom" || dir === "corner",
    };
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing) return;
      const rect = chatRef.current?.getBoundingClientRect();
      if (!rect) return;

      let newWidth = chatWidth;
      let newHeight = chatHeight;

      if (resizeDirection.current.right) {
        newWidth = Math.max(300, e.clientX - rect.left);
      }
      if (resizeDirection.current.bottom) {
        newHeight = Math.max(300, e.clientY - rect.top);
      }

      setChatWidth(newWidth);
      setChatHeight(newHeight);
    };

    const handleMouseUp = () => {
      setIsResizing(false);
      resizeDirection.current = {};
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isResizing, chatWidth, chatHeight]);

  // Drag
  const startDrag = (e: React.MouseEvent<HTMLDivElement>) => {
    offset.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
    window.addEventListener("mousemove", onDrag);
    window.addEventListener("mouseup", stopDrag);
  };

  const onDrag = (e: MouseEvent) => {
    setPosition({
      x: e.clientX - offset.current.x,
      y: e.clientY - offset.current.y,
    });
  };

  const stopDrag = () => {
    window.removeEventListener("mousemove", onDrag);
    window.removeEventListener("mouseup", stopDrag);
  };

  // Fetch usuário
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/home/identificacao`, {
          method: "GET",
          credentials: "include",
        });
        const data = await res.json();
        setUser(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUser();
  }, []);

  // Receber histórico completo
  const ReceberMensagem = async () => {
    try {
      const resUsuario = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/materiais/chatbox/mensagens-usuario/${idMaterial}`,
        { method: "GET", credentials: "include" }
      );
      const dataUsuario = await resUsuario.json();
      setHistoricoUsuario(dataUsuario.mensagensUsuario);

      setInsideLoading(true);

      const resBot = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/materiais/chatbox/mensagens-IA/${idMaterial}`,
        { method: "GET", credentials: "include" }
      );
      const dataBot = await resBot.json();
      setHistoricoBot(dataBot.mensagensIa);

      setInsideLoading(false);
      scrollToBottom();
    } catch (err) {
      console.error(err);
      setInsideLoading(false);
    }
  };

  const Mensagem = async () => {
    if (!mensagem.trim()) return;

    const tempId = Date.now().toString();

    // adiciona localmente
    setHistoricoUsuario((prev) => [...prev, { id: tempId, mensagemUsuario: mensagem }]);
    setHistoricoBot((prev) => [...prev, { id: tempId, mensagemIa: null }]);

    const texto = mensagem;
    setMensagem("");
    setInsideLoading(true);
    scrollToBottom();

    try {
        console.log(texto);
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/materiais/chatbox/${idMaterial}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mensagem: texto }),
        credentials: "include",
      });

      // Atualiza histórico completo da IA
      await ReceberMensagem();
    } catch (err) {
      console.error(err);
      setInsideLoading(false);
    }
  };

  // Buscar mensagens ao montar
  useEffect(() => {
    ReceberMensagem();
  }, [idMaterial]);

  return (
    <AnimatePresence>
      {appear && (
        <div
          ref={chatRef}
          style={{
            width: chatWidth,
            height: chatHeight,
            position: "absolute",
            top: position.y,
            left: position.x,
          }}
          onMouseDown={startDrag}
          className="relative bg-white rounded-[25px] shadow-md border border-gray-300 flex flex-col overflow-hidden"
        >
          {/* Header */}
          <div className="text-gray-400 p-2 text-center font-semibold">
            Para manter a experiência leve e segura, suas conversas ficam salvas por até 30 dias.
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-auto p-2">
            {historicoUsuario.map((m, i) => (
              <React.Fragment key={m.id}>
                {/* User */}
                <div className="flex flex-col w-fit gap-1 ml-auto items-end justify-end ">
                  <div className="shadow-md h-min rounded-full w-[50px]">
                    <img alt="Profile Picture" src={user.foto} className="rounded-full w-full" />
                  </div>
                  <div className="bg-[#FF9F93] w-fit max-w-[75%] border border-[rgba(0,0,0,0.53)] p-3 rounded-[25px] rounded-tr-none flex justify-center items-center shadow-md">
                    <p className="text-[18px] break-words text-white">{m.mensagemUsuario}</p>
                  </div>
                </div>

                {/* Bot */}
                <div className="flex flex-col gap-1 mr-auto">
                  <div className="shadow-md h-min rounded-full w-[50px]">
                    <img
                      alt="Profile Picture"
                      src="/IApicture.svg"
                      className="rounded-full w-full"
                      width={800}
                      height={800}
                    />
                  </div>

                  <div className="bg-[#A39CEC] w-fit max-w-[75%] border border-[rgba(0,0,0,0.53)] p-3 rounded-[25px] rounded-tl-none flex justify-center items-center shadow-md">
                    {historicoBot[i]?.mensagemIa ? (
                      <p className="text-[18px] break-words text-white">{historicoBot[i].mensagemIa}</p>
                    ) : insideLoading ? (
                      <LoadingMessage />
                    ) : null}
                  </div>
                </div>
              </React.Fragment>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              Mensagem();
            }}
            className="flex gap-2 p-2"
          >
            <input
              value={mensagem}
              onChange={(e) => setMensagem(e.target.value)}
              className="flex-1 border border-[#828181] rounded-full p-2"
              placeholder="Pergunte a assistente IA"
            />
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="bg-[#A39CEC] text-white px-4 rounded-[15px]"
            >
              <SendHorizonal />
            </motion.button>
          </form>

          {/* Resize zones */}
          <div
            className="absolute top-0 right-0 h-full w-3 cursor-ew-resize"
            style={{ background: "transparent" }}
            onMouseDown={(e) => beginResize("right", e)}
          />
          <div
            className="absolute bottom-0 left-0 w-full h-3 cursor-ns-resize"
            style={{ background: "transparent" }}
            onMouseDown={(e) => beginResize("bottom", e)}
          />
          <div
            className="absolute bottom-0 right-0 w-5 h-5 cursor-se-resize"
            style={{ background: "transparent" }}
            onMouseDown={(e) => beginResize("corner", e)}
          />
        </div>
      )}
    </AnimatePresence>
  );
};
