"use client";

import { motion, AnimatePresence, useMotionValue, animate } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import ErrorModal from "@/components/ui/ErrorModal";
import Loading from "@/app/home/components/loading";
import { Ellipsis, Heart, MessageCircle } from "lucide-react";
import PostagemDetail from "@/components/postagemDetail";
import { Backdrop3 } from "../../components/backdrop";

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
  const [appear, setAppear] = useState(0);
  const [image, setImage] = useState(0);
  const [open, setOpen] = useState(false);
  const [scale, setScale] = useState(1);
  const [origin, setOrigin] = useState({ x: 50, y: 50 });
  const imgContainerRef = useRef<HTMLDivElement>(null);

  // Motion values for smooth dragging and reset
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    if (!imgContainerRef.current) return;

    const rect = imgContainerRef.current.getBoundingClientRect();

    // Get cursor position relative to the element (as %)
    const offsetX = ((e.clientX - rect.left) / rect.width) * 100;
    const offsetY = ((e.clientY - rect.top) / rect.height) * 100;

    setOrigin({ x: offsetX, y: offsetY });

    // Zoom step
    const delta = e.deltaY > 0 ? -0.15 : 0.15;

    setScale((prev) => {
      const next = Math.min(Math.max(prev + delta, 1), 3);

      // 🧲 If zooming out (deltaY > 0), recenter smoothly
      if (delta < 0 && next < prev) {
        animate(x, 0, { duration: 0.25, ease: "easeOut" });
        animate(y, 0, { duration: 0.25, ease: "easeOut" });
      }

      return next;
    });
  };

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

  function closing() {
    setOpen(false);
    setImage(0);
  }
  if (loading) return <Loading />;
  return (
    <>
      {open && (
        <>
          <motion.div
            key="content"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="w-full h-full fixed top-0 left-0 flex justify-center items-center  overflow-hidden z-[1100]"
          >
            {/* Background click to close */}
            <div
              className="w-full h-full absolute top-0 left-0 cursor-zoom-out"
              onClick={() => closing()}
            />

            {/* Zoomable + draggable image */}
            <motion.div
              ref={imgContainerRef}
              onWheel={handleWheel}
              drag={scale > 1}
              dragMomentum={false}
              style={{
                scale,
                transformOrigin: `${origin.x}% ${origin.y}%`,
                x,
                y,
              }}
              className="relative z-10 max-w-[95vw] max-h-[95vh] cursor-grab active:cursor-grabbing select-none"
            >
              <img
                src="/Profile.png"
                alt="zoomed image"
                draggable={false}
                className="w-auto h-auto max-w-full max-h-[95vh] rounded-[20px] shadow-lg object-contain"
              />
            </motion.div>
          </motion.div>

          {/* Optional backdrop */}
          <div className="w-full absolute flex justify-center items-center ">
            <Backdrop3 onClick={() => closing()} />
          </div>
        </>
      )}

      <div className="w-full h-full flex flex-col px-4 py-2 gap-4 overflow-y-auto overflow-x-hidden">
        <h1 className="text-[24px] font-medium">Principais postagens</h1>

        {Array.from({ length: 10 }).map((_, index) => (
          <div key={index} className="w-full h-fit flex flex-col mb-4">
            <div className="w-full flex flex-col gap-1">
              <div className="flex gap-1">
                <img
                  src={`${user.foto}`}
                  className="rounded-full cursor-pointer transition-all w-12 h-12 shadow-md  "
                  alt="Foto de perfil"
                />
                <div className="flex flex-col text-[18px]">
                  <span className="font-semibold ">Bia</span>
                  <span className="font-medium"> Badminton</span>
                </div>
              </div>

              <div
                onClick={() => {
                  setImage(index + 1);
                  setOpen(true);
                }}
                className=" cursor-pointer max-w-full max-h-[600px] w-fit h-fit border border-[#a39cec] overflow-hidden my-3 rounded-[35px] shadow-md relative"
              >
                <img src="/Profile.png " alt="test" className="h-full" />
              </div>
              <p className="text-[18px]">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
                tristique, est vel ornare finibus, turpis magna euismod turpis,
                quis interdum tellus magna et mauris. Donec fermentum, ipsum id
                varius imperdiet, erat eros bibendum neque. 
              </p>

              <div className="flex justify-between mt-3 pb-4 border border-b-[#D7DDEA]">
                <div className="flex gap-5">
                  <div className="flex gap-1 font-semibold ">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-6 h-6 cursor-pointer"
                    >
                      <Heart
                        className="text-[#C85959] w-full h-full"
                        fill="currentColor"
                        stroke="currentColor"
                      />
                    </motion.div>
                    <span>2.4k</span>
                  </div>

                  <div className="flex gap-1 font-semibold ">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-6 h-6 cursor-pointer"
                    >
                      <MessageCircle
                        className="text-[#726BB6] w-full h-full"
                        stroke="currentColor"
                      />
                    </motion.div>
                    <span>1.1k</span>
                  </div>
                </div>

                <motion.div className="w-6 h-6  relative">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full h-full cursor-pointer relative"
                    onClick={() =>
                      setAppear(appear === index + 1 ? 0 : index + 1)
                    }
                  >
                    <Ellipsis
                      className=" w-full h-full"
                      stroke="currentColor"
                    />
                  </motion.div>

                  <PostagemDetail
                    message="a"
                    onClose={() => {}}
                    last={10}
                    index={index + 1}
                    appear={appear === index + 1 && true}
                  />
                </motion.div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
// initial={{ scale: 0, opacity: 0 }}
//         animate={{ scale: 1, opacity: 1 }}
//         exit={{
//           scale: 0,
//           opacity: 0,
//           transition: { duration: 0.15, ease: "easeInOut" },
//         }}
