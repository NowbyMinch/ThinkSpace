"use client";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
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
  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });

  // Drag & Resize
    const [chatWidth, setChatWidth] = useState(400);
    const [chatHeight, setChatHeight] = useState(600);

    
    const [isResizing, setIsResizing] = useState(false);

    const offset = useRef<{
    mouseX: number;
    mouseY: number;
    startWidth: number;
    startHeight: number;
    startX: number;
    startY: number;
    } | null>(null);

    const parentRef = useRef<HTMLDivElement>(null); // referência do pai
    const chatRef = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

    useEffect(() => {
        if (!parentRef.current) return;
        if (parentRef.current && chatRef.current) {
            const parentWidth = parentRef.current.offsetWidth;
            const parentHeight = parentRef.current.offsetHeight;
            const chatWidth = chatRef.current.offsetWidth;
            const chatHeight = chatRef.current.offsetHeight;

            setPosition({
            x: parentWidth - chatWidth - 10,
            y: parentHeight - chatHeight - 80,
            });
        };
    }, [appear]);

    const resizeDirection = useRef<{
    right?: boolean;
    left?: boolean;
    top?: boolean;
    bottom?: boolean;
    }>({});

    // Inicia resize
    const beginResize = (
        dir: "right" | "left" | "top" | "bottom" | "top-left" | "top-right" | "bottom-left" | "bottom-right",
        e: React.MouseEvent<HTMLDivElement>
        ) => {

        if (position){
            e.preventDefault();
            e.stopPropagation();
            setIsResizing(true);
    
            resizeDirection.current = {
                right: dir.includes("right"),
                left: dir.includes("left"),
                top: dir.includes("top"),
                bottom: dir.includes("bottom"),
            };
    
            offset.current = {
                mouseX: e.clientX,
                mouseY: e.clientY,
                startWidth: chatWidth,
                startHeight: chatHeight,
                startX: position.x,
                startY: position.y,
            };
        }
        
    };

    // Drag
    const startDrag = (e: React.MouseEvent<HTMLDivElement>) => {
        if (position){
            offset.current = {
                mouseX: e.clientX,
                mouseY: e.clientY,
                startWidth: chatWidth,
                startHeight: chatHeight,
                startX: position.x,
                startY: position.y,
            };
            window.addEventListener("mousemove", onDrag);
            window.addEventListener("mouseup", stopDrag);
        }
    };

    const onDrag = (e: MouseEvent) => {
    if (!offset.current) return;
    const dx = e.clientX - offset.current.mouseX;
    const dy = e.clientY - offset.current.mouseY;
    setPosition({ x: offset.current.startX + dx, y: offset.current.startY + dy });
    };

    const stopDrag = () => {
    window.removeEventListener("mousemove", onDrag);
    window.removeEventListener("mouseup", stopDrag);
    };

    // Resize
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!isResizing || !offset.current) return;

            let newWidth = offset.current.startWidth;
            let newHeight = offset.current.startHeight;
            let newX = offset.current.startX;
            let newY = offset.current.startY;

            const dx = e.clientX - offset.current.mouseX;
            const dy = e.clientY - offset.current.mouseY;

            if (resizeDirection.current.right) newWidth = Math.max(300, offset.current.startWidth + dx);
            if (resizeDirection.current.left) {
            newWidth = Math.max(300, offset.current.startWidth - dx);
            newX = offset.current.startX + dx;
            }
            if (resizeDirection.current.bottom) newHeight = Math.max(300, offset.current.startHeight + dy);
            if (resizeDirection.current.top) {
            newHeight = Math.max(300, offset.current.startHeight - dy);
            newY = offset.current.startY + dy;
            }

            setChatWidth(newWidth);
            setChatHeight(newHeight);
            setPosition({ x: newX, y: newY });
        };
        const handleMouseUp = () => {
            setIsResizing(false);
            resizeDirection.current = {};
            offset.current = null;
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseup", handleMouseUp);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
        };
    }, [isResizing, chatWidth, chatHeight]);

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

        const resBot = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/materiais/chatbox/mensagens-IA/${idMaterial}`,
            { method: "GET", credentials: "include" }
        );
        const dataBot = await resBot.json();
        setHistoricoBot(dataBot.mensagensIa);

        scrollToBottom();
        } catch (err) {
        console.error(err);
        }
    };

    const Mensagem = async () => {
        if (!mensagem.trim()) return;

        const texto = mensagem;
        const tempId = Date.now().toString();

        // Mostra a mensagem do usuário imediatamente
        setHistoricoUsuario((prev) => [...prev, { id: tempId, mensagemUsuario: texto }]);
        setHistoricoBot((prev) => [...prev, { id: tempId, mensagemIa: null }]);
        setMensagem("");
        setInsideLoading(true);
        scrollToBottom();

        try {
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/materiais/chatbox/${idMaterial}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ mensagem: texto.trim() }),
            credentials: "include",
        });

        await ReceberMensagem();
        } catch (err) {
        console.error(err);
        } finally {
        setInsideLoading(false);
        scrollToBottom();
        }
    };

  useEffect(() => {
    ReceberMensagem();
  }, [idMaterial]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [historicoUsuario, historicoBot]);
    
    
  return (
    <AnimatePresence>
      {appear && (
        <>
            <div ref={parentRef} className="w-full h-full rounded-[35px] pointer-events-none absolute left-0 right-0 top-0 bottom-0"></div>
            
            {position && (
                <motion.div
                initial={{scale:0}}
                animate={{scale:1}}
                exit={{scale:0}}
                ref={chatRef}
                style={{
                    width: chatWidth,
                    height: chatHeight,
                    top: position.y,
                    left: position.x,
                }}
                onMouseDown={startDrag}
                className="origin-bottom-right absolute bg-white rounded-[25px] max-w-[95%] max-h-[90%] shadow-md border border-gray-300 flex flex-col overflow-hidden"
                >
                {/* Header */}
                <div className="text-gray-400 py-1 px-2 text-center ">
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
                    scrollToBottom();
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

                {/* Right edge */}
                    <div
                    className="absolute top-0 right-0 h-full w-1 cursor-ew-resize"
                    style={{ background: "transparent" }}
                    onMouseDown={(e) => beginResize("right", e)}
                    />

                    {/* Left edge */}
                    <div
                    className="absolute top-0 left-0 h-full w-2 cursor-ew-resize"
                    style={{ background: "transparent" }}
                    onMouseDown={(e) => beginResize("left", e)}
                    />

                    {/* Bottom edge */}
                    <div
                    className="absolute bottom-0 left-0 w-full h-2 cursor-ns-resize"
                    style={{ background: "transparent" }}
                    onMouseDown={(e) => beginResize("bottom", e)}
                    />

                    {/* Top edge */}
                    <div
                    className="absolute top-0 left-0 w-full h-2 cursor-ns-resize"
                    style={{ background: "transparent" }}
                    onMouseDown={(e) => beginResize("top", e)}
                    />

                    {/* Bottom-right corner */}
                    <div
                    className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize"
                    style={{ background: "transparent" }}
                    onMouseDown={(e) => beginResize("bottom-right", e)}
                    />

                    {/* Bottom-left corner */}
                    <div
                    className="absolute bottom-0 left-0 w-4 h-4 cursor-sw-resize"
                    style={{ background: "transparent" }}
                    onMouseDown={(e) => beginResize("bottom-left", e)}
                    />

                    {/* Top-right corner */}
                    <div
                    className="absolute top-0 right-0 w-4 h-4 cursor-ne-resize"
                    style={{ background: "transparent" }}
                    onMouseDown={(e) => beginResize("top-right", e)}
                    />

                    {/* Top-left corner */}
                    <div
                    className="absolute top-0 left-0 w-4 h-4 cursor-nw-resize"
                    style={{ background: "transparent" }}
                    onMouseDown={(e) => beginResize("top-left", e)}
                    />

                </motion.div>
            )}
        </>
      )}
    </AnimatePresence>
  );
};
