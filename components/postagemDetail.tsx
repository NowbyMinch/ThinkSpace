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

export type Autor = {
  foto: string;
  id: string;
  nome: string;
  perfil: string | null;
};

export type Comentario = {
  id: string;
  conteudo: string;
  criadoEm: string; // ISO date string
  autorId: string;
};

export type SalaFav = {
  id: string;
  nome: string;
};

export type Favorito = {
  autor: Autor;
  comentarios: Comentario[];
  conteudo: string;
  criadoEm: string; // ISO date string
  curtidas: number;
  curtidoPeloUsuario: boolean;
  id: string;
  quantidadeComentarios: number;
  sala: SalaFav;
  salvo: boolean;
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
  const [favorito, setFavorito] = useState<Favorito[]>([]);
  const [salvo, setSalvo] = useState(false);

  const { refreshFavoritos } = useContext(FavoritosContext);


  useEffect(() => {
    console.log(Mine);
  }, [Mine]);

  const Fetch = async () => {
    const userIDRes = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/users/id`,
      {
        method: "GET",
        credentials: "include",
      }
    );

    const userIDdata = await userIDRes.json(); // parse the response
    // setUserID(userIDdata.userId); // set the state

    // Run all fetches in parallel
    const [favoritosRes] = await Promise.all([
      fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/sala-estudo/usuario/${userIDdata.userId}/favoritos`,
        {
          method: "GET",
          credentials: "include",
        }
      ),
    ]);

    // Parse all JSONs in parallel
    const [favoritosData] = await Promise.all([favoritosRes.json()]);

    // ✅ Set states after everything is done

    const PostSalvo = favoritosData.filter(
      (item: Favorito) => item.id === message
    );
    if (PostSalvo) {
      setFavorito(PostSalvo);
    }
  };

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
      // setUserID(userIDdata.userId); // set the state

      // Run all fetches in parallel
      const [favoritosRes] = await Promise.all([
        fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/sala-estudo/usuario/${userIDdata.userId}/favoritos`,
          {
            method: "GET",
            credentials: "include",
          }
        ),
      ]);

      // Parse all JSONs in parallel
      const [favoritosData] = await Promise.all([favoritosRes.json()]);
      console.log(favoritosData)
      // ✅ Set states after everything is done

      const PostSalvo = favoritosData.filter(
        (item: Favorito) => item.id === message
      );
      if (PostSalvo) {
        setFavorito(PostSalvo);
      }
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
    console.log(message)
    console.log(Mine)

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
    } finally {
      Fetch();
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
                    {favorito && favorito.length > 0 && favorito[0].salvo ? (
                      <>
                        <hr className="border-t-[2px] border-[#D7DDEA] mx-4" />
                        <button
                          onClick={() => {
                              console.log("HAHAHAHAH");

                            Favoritos();
                            onClose?.();
                          }}
                          className="mx-2 text-[#726BB6] text-[20px] px-2 w-[95%] py-2 flex gap-2 items-center"
                        >
                          <Bookmark fill="currentColor" /> Desfavoritar
                        </button>
                      </>
                    ) : (
                      <>
                        <hr className="border-t-[2px] border-[#D7DDEA] mx-4" />
                        <button
                            onClick={() => {
                              console.log('HAHAHAHAH')
                            Favoritos();
                            onClose?.();
                          }}
                          className="mx-2 text-[#726BB6] text-[20px] px-2 w-[95%] py-2 flex gap-2 items-center"
                        >
                          <Bookmark /> Favoritar
                        </button>
                      </>
                    )}
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
