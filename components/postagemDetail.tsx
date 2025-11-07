import { Bookmark, ShieldX, Trash } from "lucide-react";
import React, { useEffect, useState, useContext } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { FavoritosContext } from "@/app/home/comunidades/layout";

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

  const { refreshFavoritos } = useContext(FavoritosContext);

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

  // ✅ DENUNCIAR POST
  const Denunciar = async () => {
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

  return (
    <AnimatePresence>
      {appear && (
        <motion.div
          key="modal"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{
            scale: 0,
            opacity: 0,
            transition: { duration: 0.15, ease: "easeInOut" },
          }}
          className="origin-top-left relative mr-[-11px] z-50"
        >
          <div
            className={`absolute right-0 ${
              index === last ? "bottom-9" : "-top-full mt-2"
            } w-[160px] rounded-2xl bg-white shadow-md border-[1px] border-[rgba(0,0,0,0.26)]`}
          >
            <div className="flex flex-col w-full text-base">
              <button
                onClick={() => { onClose?.(); }}
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
      )}
    </AnimatePresence>
  );
};

export default PostagemDetail;
