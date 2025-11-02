// components/ErrorModal.tsx
import { Bookmark, ShieldX, Trash, X } from "lucide-react";
import React, { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";

type Props = {
  message?: string;
  comentario?: boolean;
  Mine?: boolean;
  appear?: boolean;
  index?: number;
  last?: number;
  onClose?: () => void;
};

const PostagemDetail: React.FC<Props> = ({
  message,
  comentario,
  Mine,
  appear,
  index,
  last,
  onClose,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    console.log(Mine);
  }, [Mine]);

  const Delete = async () => {
    try {
      // 🔹 Pegar userID
      const DeleteRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/sala-estudo/post/${message}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      const deleteData = await DeleteRes.json();
      console.log(deleteData);

      onClose?.();
      if (pathname.split("/")[5] === message) {
        router.back();
      }
    } catch (error) {
      console.error("Erro ao curtir:", error);
    }
  };

  const DeleteComentario = async () => {
    try {
      // 🔹 Pegar userID
      const DeleteRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/sala-estudo/comentario/${message}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      const deleteData = await DeleteRes.json();
      console.log(deleteData);

      onClose?.();
      
    } catch (error) {
      console.error("Erro ao curtir:", error);
    }
  };

  // /sala-estudo/opst / { postId };

  return (
    <>
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
              <div className="flex flex-col w-full text-base z-100">
                <button
                  onClick={() => onClose?.()}
                  className="mx-2 text-[#726BB6] text-[20px] px-2 w-[95%] py-2 flex gap-2 items-center"
                >
                  <ShieldX /> Denunciar
                </button>
                <hr className="border-t-[2px] border-[#D7DDEA] mx-4" />
                <button
                  onClick={() => onClose?.()}
                  className="mx-2 text-[#726BB6] text-[20px] px-2 w-[95%] py-2 flex gap-2 items-center"
                >
                  <Bookmark /> Salvar
                </button>
                <hr className="border-t-[2px] border-[#D7DDEA] mx-4" />
                {Mine && (
                  <button
                    onClick={comentario ? DeleteComentario : Delete}
                    className="mx-2 text-[#726BB6] text-[20px] px-2 w-[95%] py-2 flex gap-2 items-center"
                  >
                    <Trash /> Excluir
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default PostagemDetail;
