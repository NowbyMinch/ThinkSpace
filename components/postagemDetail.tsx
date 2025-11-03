// components/ErrorModal.tsx
import { Bookmark, ShieldX, Trash, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { useContext } from "react";
import { FavoritosContext } from "@/app/home/comunidades/layout"; // adjust if path differs

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
  const [userID, setUserID] = useState<string>("");

  const { refreshFavoritos } = useContext(FavoritosContext);

  useEffect(() => {
    console.log(Mine);
  }, [Mine]);

  useEffect(() => {
    const Fetch = async () => {
      const userIDRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/id`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      const userIDdata = await userIDRes.json(); // parse the response
      setUserID(userIDdata.userId); // set the state
    };
    Fetch();
  }, []);

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

  const Favoritos = async () => {
    try {
      const userIDRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/id`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const userIDdata = await userIDRes.json();

      const FavoritarRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/sala-estudo/post/${message}/salvar/${userIDdata.userId}`,
        {
          method: "POST",
          credentials: "include",
        }
      );

      const FavoritarData = await FavoritarRes.json();
      console.log("FavoritarData:", FavoritarData);

      if (
        FavoritarData.message !== "Post salvo com sucesso." &&
        FavoritarData.message !== "Salvamento removido com sucesso."
      ) {
        onError?.(FavoritarData.message);
      } else {
        // ✅ Atualiza automaticamente os favoritos no Layout
        refreshFavoritos();
      }
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
                {!comentario && (
                  <>
                    <hr className="border-t-[2px] border-[#D7DDEA] mx-4" />
                    <button
                      onClick={() => {
                        Favoritos();
                        onClose?.();
                      }}
                      className="mx-2 text-[#726BB6] text-[20px] px-2 w-[95%] py-2 flex gap-2 items-center"
                    >
                      <Bookmark /> Salvar
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
    </>
  );
};

export default PostagemDetail;
