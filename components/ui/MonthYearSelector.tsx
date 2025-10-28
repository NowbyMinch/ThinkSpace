"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

type MonthYearSelectorProps = {
  selectedDate: Date;
  onChange: (date: Date) => void;
};

export default function MonthYearSelector({
  selectedDate,
  onChange,
}: MonthYearSelectorProps) {
  const [month, setMonth] = useState(selectedDate.getMonth());
  const [year, setYear] = useState(selectedDate.getFullYear());

  const months = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  const handlePrevMonth = () => {
    if (month === 0) {
      setMonth(11);
      setYear((prev) => prev - 1);
      onChange(new Date(year - 1, 11, 1));
    } else {
      setMonth((prev) => prev - 1);
      onChange(new Date(year, month - 1, 1));
    }
  };

  const handleNextMonth = () => {
    if (month === 11) {
      setMonth(0);
      setYear((prev) => prev + 1);
      onChange(new Date(year + 1, 0, 1));
    } else {
      setMonth((prev) => prev + 1);
      onChange(new Date(year, month + 1, 1));
    }
  };

  const handleYearChange = (delta: number) => {
    const newYear = year + delta;
    setYear(newYear);
    onChange(new Date(newYear, month, 1));
  };

  return (
    <div className="flex flex-col items-center w-full gap-3 text-[15px]">
      {/* Month selector */}
      <div className="flex justify-between items-center w-full max-w-[350px] ">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handlePrevMonth}
          className="p-2 rounded-full hover:bg-gray-200 transition"
        >
          <ChevronLeft className="w-5 h-5" />
        </motion.button>

        <h2 className=" font-semibold text-center text-nowrap w-[95px]">
          {months[month]} {year}
        </h2>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleNextMonth}
          className="p-2 rounded-full hover:bg-gray-200 transition"
        >
          <ChevronRight className="w-5 h-5" />
        </motion.button>
      </div>

      {/* Year quick control (optional) */}
      {/* <motion.div
        className="flex items-center gap-3 text-gray-600 text-sm"
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <button
          onClick={() => handleYearChange(-1)}
          className="px-3 py-1 rounded-full hover:bg-gray-200"
        >
          −1 ano
        </button>
        <button
          onClick={() => handleYearChange(+1)}
          className="px-3 py-1 rounded-full hover:bg-gray-200"
        >
          +1 ano
        </button>
      </motion.div> */}
    </div>
  );
}
