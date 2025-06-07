"use client";
import { useState } from "react";
import { motion } from "framer-motion";

export default function Flashcard() {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="w-80 h-48 perspective cursor-pointer"
      onClick={() => setFlipped(!flipped)}
    >
      <motion.div
        className="relative w-full h-full"
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front side */}
        <div className="absolute w-full h-full backface-hidden bg-white border-2 border-gray-800 rounded-lg flex items-center justify-center p-6 text-xl font-semibold shadow-lg">
          Questão
        </div>

        {/* Back side */}
        <div className="absolute w-full h-full backface-hidden bg-gray-100 border-2 border-gray-800 rounded-lg flex items-center justify-center p-6 text-lg font-medium text-gray-800 shadow-lg"
          style={{ transform: "rotateY(180deg)" }}
        >
          Resposta
        </div>
      </motion.div>
    </div>
  );
}