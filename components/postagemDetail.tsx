// components/ErrorModal.tsx
import { Bookmark, ShieldX, X } from "lucide-react";
import React from "react";
import { AnimatePresence, motion } from "framer-motion";

type Props = {
  message?: string;
  appear?: boolean;
  index?: number;
  last?: number;
  onClose?: () => void;
};

const PostagemDetail: React.FC<Props> = ({ message, appear, index, last, onClose }) => {
  return (
    <>
      {appear && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{
            scale: 0,
            opacity: 0,
            transition: { duration: 0.15, ease: "easeInOut" },
          }}
          className="origin-top-left relative mr-[-11px]  z-1000"
        >
          <div
            className={`absolute right-0  ${index === last ? "bottom-9 " : "-top-full mt-2"} w-[160px] rounded-2xl bg-white shadow-md border-[1px] border-[rgba(0,0,0,0.26)] `}
          >
            <div className="flex flex-col w-full text-base z-100">
              <button
                onClick={() => {}}
                className="mx-2 text-[#726BB6] text-[20px] px-2 w-[95%] py-2  flex gap-2 items-center"
              >
                <ShieldX /> Denunciar
              </button>
              <hr className="border-t-[2px] border-[#D7DDEA] mx-4" />
              <button
                onClick={() => {}}
                className="mx-2 text-[#726BB6] text-[20px] px-2 w-[95%] py-2 flex gap-2 items-center"
              >
                <Bookmark /> Salvar
              </button>
            </div>
            {/* <div className="absolute -top-2 right-4 w-5 h-5 rounded-sm bg-white rotate-45 border border-[rgba(0,0,0,0.26)] shadow -z-10 "></div> */}
          </div>
        </motion.div>
      )}
    </>
  );
};

export default PostagemDetail;
