// components/ErrorModal.tsx
import { X } from "lucide-react";
import React from "react";
import { AnimatePresence, motion } from "framer-motion";

type Props = {
  message: string;
  onClose: () => void;
};

const ErrorModal: React.FC<Props> = ({ message, onClose }) => {
  return (
    <AnimatePresence>
      <motion.div 
      initial={{ opacity: 0, y: 0 }}
      animate={{ opacity: 1, y: 10 }}
      exit={{ opacity: 0, y: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="fixed inset-0 z-50 flex items-end justify-end ml-auto mt-auto pb-7 pr-4 w-[385px] max-w-[80%] h-min ">
        <div className="bg-[#b24040] rounded-[25px] shadow-lg px-6 py-2 max-w-sm w-full flex text-white">
          <div className="">
              <h2 className="text-lg font-semibold mb-2 ">Error</h2>
              <p className="text-[18px] mb-4 ">{message}</p>
          </div>
          <div className="ml-auto ">
              <button onClick={onClose} className="mt-1">
                  <X/>
              </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ErrorModal;