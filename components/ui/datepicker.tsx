"use client";
import { useEffect, useState, useRef } from "react";
import {
  format,
  parse,
  isValid,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  addDays,
  addMonths,
  subMonths,
  isSameMonth,
  isSameDay,
  lastDayOfMonth,
} from "date-fns";
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  ChevronsLeftRightEllipsisIcon,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { IMaskInput } from "react-imask";
import IMask from "imask";
import React from "react";

type DiaData = {
  diaNumero?: number;
  diaSemana?: number;
};
type CalendarioData = {
  mesAtual?: string;
  anoAtual?: number;
  dias?: DiaData[];
  diaAtual?: number;
};

type DatePickerProps = {
  onChange: (date: string) => void; // formato "YYYY-MM-DD"
};

"use client";

import {
  addDays,
  addMonths,
  endOfMonth,
  format,
  isSameDay,
  isSameMonth,
  parse,
  startOfMonth,
  startOfWeek,
  subMonths,
  isValid,
} from "date-fns";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";

type DatePickerProps = {
  onChange?: (date: string | null) => void;
};

type CalendarioData = {
  [key: string]: any;
};

export function DatePicker({ onChange }: DatePickerProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showPicker, setShowPicker] = useState(false);
  const [focused, setFocused] = useState(false);
  const [focused2, setFocused2] = useState(false);
  const [focused3, setFocused3] = useState(false);

  // ✅ EMPTY FIELDS
  const [inputValue, setInputValue] = useState("");
  const [inputValue2, setInputValue2] = useState("");
  const [inputValue3, setInputValue3] = useState("");

  // ✅ IMPORTANT CHANGE: Start as null, not new Date()
  const [calendarMonth, setCalendarMonth] = useState<Date | null>(null);
  const [sendDate, setSendDate] = useState<Date | null>(null);

  const ValueRef = useRef<HTMLInputElement | null>(null);
  const ValueRef2 = useRef<HTMLInputElement | null>(null);
  const ValueRef3 = useRef<HTMLInputElement | null>(null);

  // ✅ Load saved date on mount only if it exists
  useEffect(() => {
    if (typeof window === "undefined") return;

    const day = localStorage.getItem("saved_birth_day");
    const month = localStorage.getItem("saved_birth_month");
    const year = localStorage.getItem("saved_birth_year");

    if (!day || !month || !year) return;

    const safeDate = new Date(`${year}-${month}-${day}T12:00:00`);
    if (isNaN(safeDate.getTime())) return;

    setSelectedDate(safeDate);
    setCalendarMonth(safeDate);
    setInputValue(day);
    setInputValue2(month);
    setInputValue3(year);

    onChange?.(`${year}-${month}-${day}`);
  }, []);

  const handleKeyUp = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace") {
      if (index === 3 && ValueRef3.current?.value === "") {
        ValueRef2.current?.focus();
      } else if (index === 2 && ValueRef2.current?.value === "") {
        ValueRef.current?.focus();
      }
    }
  };

  const [calendario, setCalendario] = useState<CalendarioData>({});

  useEffect(() => {
    const calendario = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/home/calendario`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        const data = await res.json();
        setCalendario(data);
      } catch (err) {
        console.error(err);
      }
    };
    calendario();
  }, []);

  // ✅ Day validation
  useEffect(() => {
    if (inputValue === "00") {
      setInputValue("01");
    } else if (parseInt(inputValue) > 31) {
      setInputValue("31");
    } else if (["1", "3", "5", "7", "8", "10", "12"].includes(inputValue2)) {
      if (parseInt(inputValue) > 31) setInputValue("31");
    } else if (["4", "6", "9", "11"].includes(inputValue2)) {
      if (parseInt(inputValue) > 30) setInputValue("30");
    } else if (inputValue2 === "2" && parseInt(inputValue) > 28) {
      setInputValue("28");
    } else {
      if (inputValue.length === 2) {
        ValueRef2.current?.focus();
        setInputValue(inputValue.slice(0, 2));
      }
    }
  }, [inputValue, inputValue2]);

  // ✅ Month validation
  useEffect(() => {
    if (inputValue2 === "00") {
      setInputValue2("01");
    } else if (parseInt(inputValue2) > 12) {
      setInputValue2("12");
    } else if (inputValue2.length === 2) {
      ValueRef3.current?.focus();
      setInputValue2(inputValue2.slice(0, 2));
    }
  }, [inputValue2]);

  // ✅ Year validation
  useEffect(() => {
    const currentYear = new Date().getFullYear();

    if (parseInt(inputValue3) > currentYear) {
      setInputValue3(currentYear.toString());
    } else if (inputValue3.length === 4) {
      ValueRef3.current?.blur();
      if (parseInt(inputValue3) < 1901) {
        setInputValue3("1900");
      }
    }
  }, [inputValue3]);

  // ✅ Save automatically when full date typed
  useEffect(() => {
    if (
      inputValue.length === 2 &&
      inputValue2.length === 2 &&
      inputValue3.length === 4
    ) {
      localStorage.setItem("saved_birth_day", inputValue);
      localStorage.setItem("saved_birth_month", inputValue2);
      localStorage.setItem("saved_birth_year", inputValue3);

      onChange?.(`${inputValue3}-${inputValue2}-${inputValue}`);
    }
  }, [inputValue, inputValue2, inputValue3]);

  const generateCalendar = () => {
    const base = calendarMonth ?? new Date(); // ✅ Works when null
    const start = startOfWeek(startOfMonth(base), { weekStartsOn: 0 });
    const end = endOfMonth(base);

    const days: Date[] = [];
    let current = start;

    while (current <= end || days.length % 7 !== 0) {
      days.push(current);
      current = addDays(current, 1);
    }

    return days;
  };

  // ✅ Calendar reacts to typing
  useEffect(() => {
    if (
      inputValue.length === 2 &&
      inputValue2.length === 2 &&
      inputValue3.length === 4
    ) {
      const typedDate = parse(
        `${inputValue3}-${inputValue2}-${inputValue}`,
        "yyyy-MM-dd",
        new Date()
      );

      if (isValid(typedDate)) {
        setCalendarMonth(typedDate);
        setSelectedDate(typedDate);
      }
    }
  }, [inputValue, inputValue2, inputValue3]);

  const currentYear = new Date().getFullYear();

  const handleDateSelect = (date: Date) => {
    if (date.getFullYear() < 1900 || date.getFullYear() > currentYear) return;

    const formatted = format(date, "dd/MM/yyyy");
    const d = formatted.slice(0, 2);
    const m = formatted.slice(3, 5);
    const y = formatted.slice(6, 10);

    setSelectedDate(date);
    setCalendarMonth(date);
    setInputValue(d);
    setInputValue2(m);
    setInputValue3(y);
    setShowPicker(false);

    localStorage.setItem("saved_birth_day", d);
    localStorage.setItem("saved_birth_month", m);
    localStorage.setItem("saved_birth_year", y);

    onChange?.(`${y}-${m}-${d}`);
  };

  return (
    <div className="relative">
      <div className="relative">
        <div
          className={`${focused || focused2 || focused3 ? "border-[rgba(151,103,248,0.6)]" : "border-[rgba(10,8,9,0.6)]"} relative cursor-text p-3 h-[54px] gap-1 text-[18px] flex w-full rounded-[25px] border-2`}
        >
          {/* DD */}
          <div className="relative text-gray-400 block w-[31px]">
            {!focused && !inputValue && (
              <div className="w-full absolute text-center">dd</div>
            )}
            <input
              ref={ValueRef}
              value={inputValue}
              onBlur={() => {
                setFocused(false);
                if (inputValue && inputValue.length === 1) {
                  setInputValue(inputValue.padStart(2, "0"));
                } else if (parseInt(inputValue) < 1) {
                  setInputValue("");
                }
              }}
              type="text"
              onFocus={() => setFocused(true)}
              onChange={(e) => setInputValue(e.target.value)}
              className={`${focused ? "bg-[rgba(151,103,248,0.17)]" : "bg-transparent"} text-center text-black absolute w-full rounded-[5px] border-none outline-none transition-all duration-100`}
            />
          </div>

          <div className="text-gray-400">/</div>

          {/* MM */}
          <div className="relative text-gray-400 block w-[31px]">
            {!focused2 && !inputValue2 && (
              <div className="w-full absolute text-center">mm</div>
            )}
            <input
              ref={ValueRef2}
              onKeyUp={(e) => handleKeyUp(2, e)}
              value={inputValue2}
              type="text"
              onFocus={() => setFocused2(true)}
              onBlur={() => setFocused2(false)}
              onChange={(e) => setInputValue2(e.target.value)}
              className={`${focused2 ? "bg-[rgba(151,103,248,0.17)]" : "bg-transparent"} text-center text-black absolute w-full rounded-[5px] border-none outline-none transition-all duration-100`}
            />
          </div>

          <div className="text-gray-400">/</div>

          {/* YYYY */}
          <div className="relative text-gray-400 block w-[42px]">
            {!focused3 && !inputValue3 && (
              <div className="w-full absolute text-center">aaaa</div>
            )}
            <input
              ref={ValueRef3}
              value={inputValue3}
              onKeyUp={(e) => handleKeyUp(3, e)}
              type="text"
              onFocus={() => setFocused3(true)}
              onBlur={() => setFocused3(false)}
              onChange={(e) => setInputValue3(e.target.value)}
              className={`${focused3 ? "bg-[rgba(151,103,248,0.17)]" : "bg-transparent"} text-center text-black absolute w-full rounded-[5px] border-none outline-none transition-all duration-100`}
            />
          </div>
        </div>

        <button
          type="button"
          onClick={() => setShowPicker(!showPicker)}
          className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black transition"
        >
          <CalendarDays size={18} />
        </button>
      </div>

      <AnimatePresence>
        {showPicker && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0, transition: { duration: 0.15 } }}
            id="date-box"
            className="absolute right-0 z-10 mt-2 lg:w-[65%] min-w-[210px] rounded-[25px] border border-gray-700 bg-white p-4 shadow-xl origin-top-right"
          >
            {/* Calendar Header */}
            <div className="mb-3 flex items-center justify-between px-2">
              <button
                type="button"
                onClick={() =>
                  setCalendarMonth(
                    calendarMonth ? subMonths(calendarMonth, 1) : new Date()
                  )
                }
              >
                <ChevronLeft size={20} />
              </button>
              <span className="text-[20px] font-medium">
                {format(calendarMonth ?? new Date(), "MMMM yyyy")}
              </span>
              <button
                type="button"
                onClick={() =>
                  setCalendarMonth(
                    calendarMonth ? addMonths(calendarMonth, 1) : new Date()
                  )
                }
              >
                <ChevronRight size={20} />
              </button>
            </div>

            {/* Weekdays */}
            <div className="grid grid-cols-7 gap-1 text-[20px] px-1 pb-1">
              {["S", "M", "T", "W", "T", "F", "S"].map((day, i) => (
                <div key={i} className="text-center">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar */}
            <div className="grid grid-cols-7 gap-1 text-sm">
              {generateCalendar().map((day, i) => {
                const isSelected =
                  selectedDate && isSameDay(day, selectedDate);
                const inCurrentMonth =
                  isSameMonth(day, calendarMonth ?? new Date());

                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => handleDateSelect(day)}
                    className={`rounded-md py-1 text-center text-[18px] transition
                      ${
                        isSelected
                          ? "bg-[#9767f87e]"
                          : inCurrentMonth
                            ? "hover:bg-[#9767f834]"
                            : "text-zinc-500"
                      }`}
                  >
                    {day.getDate()}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}


type DatePickerPropsConfiguracoes = {
  value?: string; // ✅ incoming date "YYYY-MM-DD"
  onChange: (date: string) => void;
};

export function DatePickerConfiguracoes({
  value,
  onChange,
}: DatePickerPropsConfiguracoes) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showPicker, setShowPicker] = useState(false);
  const [focused, setFocused] = useState(false);
  const [focused2, setFocused2] = useState(false);
  const [focused3, setFocused3] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [inputValue2, setInputValue2] = useState("");
  const [inputValue3, setInputValue3] = useState("");
  const [calendarMonth, setCalendarMonth] = useState(new Date());
  const [sendDate, setSendDate] = useState(new Date());
  const ValueRef = useRef<HTMLInputElement | null>(null);
  const ValueRef2 = useRef<HTMLInputElement | null>(null);
  const ValueRef3 = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!value) return;

    // Accept both "YYYY-MM-DD" and full ISO "YYYY-MM-DDTHH:mm:...Z"
    const isoDate = value.includes("T") ? value.split("T")[0] : value;
    const parts = isoDate.split("-");

    // Validate
    if (parts.length !== 3) return;
    const [y, m, d] = parts;

    // basic checks
    if (!/^\d{4}$/.test(y) || !/^\d{2}$/.test(m) || !/^\d{2}$/.test(d)) return;

    // Set text inputs directly (no timezone conversion)
    setInputValue(d);
    setInputValue2(m);
    setInputValue3(y);

    // Set calendar / selectedDate to a safe midday UTC date to avoid timezone shifts
    const safeIso = `${isoDate}T12:00:00Z`;
    const safeDate = new Date(safeIso);
    if (!isNaN(safeDate.getTime())) {
      setSelectedDate(safeDate);
      setCalendarMonth(safeDate);
    }

    // Notify parent with normalized YYYY-MM-DD
    onChange(`${y}-${m}-${d}`);
  }, [value]);


  const handleKeyUp = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace") {
      if (index === 3 && ValueRef3.current?.value === "") {
        ValueRef2.current?.focus();
      } else if (index === 2 && ValueRef2.current?.value === "") {
        ValueRef.current?.focus();
      }
    }
  };

  const [calendario, setCalendario] = useState<CalendarioData>({});

  useEffect(() => {
    const calendario = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/home/calendario`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        const data = await res.json();
        setCalendario(data);
      } catch (err) {
        console.error(err);
      }
    };
    calendario();
  }, []);

  useEffect(() => {
    if (inputValue === "00") {
      setInputValue("01");
    } else if (parseInt(inputValue) > 31) {
      setInputValue("31");
    } else if (
      inputValue2 === "1" ||
      inputValue2 === "3" ||
      inputValue2 === "5" ||
      inputValue2 === "7" ||
      inputValue2 === "8" ||
      inputValue2 === "10" ||
      inputValue2 === "12"
    ) {
      if (parseInt(inputValue) > 31) {
        setInputValue("31");
      }
    } else if (
      inputValue2 === "4" ||
      inputValue2 === "6" ||
      inputValue2 === "9" ||
      inputValue2 === "11"
    ) {
      if (parseInt(inputValue) > 30) {
        setInputValue("30");
      }
    } else if (inputValue2 === "2") {
      if (parseInt(inputValue) > 28) {
        setInputValue("28");
      }
    } else {
      if (inputValue.length === 2) {
        ValueRef2.current?.focus();
        setInputValue(inputValue.slice(0, 2));
      }
    }
  }, [inputValue, inputValue2]);

  useEffect(() => {
    if (inputValue2 === "00") {
      setInputValue2("01");
    } else if (parseInt(inputValue2) > 12) {
      setInputValue2("12");
    } else {
      if (inputValue2.length === 2) {
        ValueRef3.current?.focus();
        setInputValue2(inputValue2.slice(0, 2));
      }
    }
  }, [inputValue2]);

  useEffect(() => {
    if (parseInt(inputValue3) > (new Date().getFullYear() ?? 0)) {
      if (new Date().getFullYear() !== undefined) {
        setInputValue3(new Date().getFullYear().toString());
      }
    } else {
      if (inputValue3.length === 4) {
        ValueRef3.current?.blur();
        setInputValue3(inputValue3.slice(0, 4));
        if (parseInt(inputValue3) < 1901) {
          setInputValue3("1900");
        }
      }
    }
  }, [inputValue3]);

  // ✅ SAVE WHEN USER TYPES A COMPLETE VALID DATE
  useEffect(() => {
    if (
      inputValue.length === 2 &&
      inputValue2.length === 2 &&
      inputValue3.length === 4
    ) {
      // ✅ Save each part safely
      localStorage.setItem("saved_birth_day", inputValue);
      localStorage.setItem("saved_birth_month", inputValue2);
      localStorage.setItem("saved_birth_year", inputValue3);

      onChange(`${inputValue3}-${inputValue2}-${inputValue}`);
    }
  }, [inputValue, inputValue2, inputValue3]);

  const currentYear = new Date().getFullYear();

  const handleDateSelect = (date: Date) => {
    if (date.getFullYear() < 1900 || date.getFullYear() > currentYear) return;

    const formatted = format(date, "dd/MM/yyyy");
    setSelectedDate(date);
    setInputValue(formatted.slice(0, 2));
    setInputValue2(formatted.slice(3, 5));
    setInputValue3(formatted.slice(6, 10));
    setCalendarMonth(date);
    setShowPicker(false);

    const d = formatted.slice(0, 2);
    const m = formatted.slice(3, 5);
    const y = formatted.slice(6, 10);

    localStorage.setItem("saved_birth_day", d);
    localStorage.setItem("saved_birth_month", m);
    localStorage.setItem("saved_birth_year", y);

    onChange(`${y}-${m}-${d}`);
  };

  const generateCalendar = () => {
    const start = startOfWeek(startOfMonth(calendarMonth), { weekStartsOn: 0 });
    const end = endOfMonth(calendarMonth);
    const days: Date[] = [];

    let current = start;
    while (current <= end || days.length % 7 !== 0) {
      days.push(current);
      current = addDays(current, 1);
    }

    return days;
  };

  useEffect(() => {
    if (
      inputValue.length === 2 &&
      inputValue2.length === 2 &&
      inputValue3.length === 4
    ) {
      const typedDate = parse(
        `${inputValue3}-${inputValue2}-${inputValue}`,
        "yyyy-MM-dd",
        new Date()
      );
      if (isValid(typedDate)) {
        setCalendarMonth(typedDate);
        setSelectedDate(typedDate);
      }
    }
  }, [inputValue, inputValue2, inputValue3]);

  return (
    <div className="relative w-full max-w-[400px]">
      <div className="relative  w-full ">
        <div
          className={`${focused || focused2 || focused3 ? "border-[rgba(151,103,248,0.6)]" : "border-[#0d0f224e]"} relative cursor-text p-3  w-full max-w-[400px] text-[18px] h-[58px] gap-1 flex rounded-[20px] border-2 `}
        >
          <div className="relative text-gray-400 block w-[31px]">
            {!focused && !inputValue && (
              <div className="w-full rounded-[5px] absolute text-center">
                dd
              </div>
            )}
            <input
              ref={ValueRef}
              value={inputValue}
              onBlur={() => {
                setFocused(false);
                if (inputValue && inputValue.length === 1) {
                  setInputValue(inputValue.padStart(2, "0")); // "2" → "02"
                } else if (parseInt(inputValue) < 1) {
                  setInputValue("1");
                }
              }}
              type="text"
              onFocus={() => setFocused(true)}
              onChange={(e) => setInputValue(e.target.value)}
              className={`${focused ? "bg-[rgba(151,103,248,0.17)]" : "bg-transparent"} text-center text-black absolute w-full rounded-[5px] border-none outline-none transition-all ease-in-out duration-100 `}
            />
          </div>

          <div className="text-gray-400 ">/</div>

          <div className="relative text-gray-400 block w-[31px]">
            {!focused2 && !inputValue2 && (
              <div className="w-full rounded-[5px] absolute text-center">
                mm
              </div>
            )}

            <input
              ref={ValueRef2}
              onKeyUp={(e) => handleKeyUp(2, e)}
              value={inputValue2}
              type="text"
              onFocus={() => setFocused2(true)}
              onBlur={() => {
                setFocused2(false);
                if (inputValue2 && inputValue2.length === 1) {
                  setInputValue2(inputValue2.padStart(2, "0")); // "2" → "02"
                }
              }}
              onChange={(e) => setInputValue2(e.target.value)}
              className={`${focused2 ? "bg-[rgba(151,103,248,0.17)]" : "bg-transparent"} text-center text-black absolute w-full rounded-[5px] border-none outline-none transition-all ease-in-out duration-100 `}
            />
          </div>

          <div className="text-gray-400 ">/</div>

          <div className="relative text-gray-400 block w-[42px]">
            {!focused3 && !inputValue3 && (
              <div className="w-full rounded-[5px] absolute text-center">
                aaaa
              </div>
            )}

            <input
              ref={ValueRef3}
              value={inputValue3}
              onKeyUp={(e) => handleKeyUp(3, e)}
              type="text"
              onFocus={() => setFocused3(true)}
              onBlur={() => {
                setFocused3(false);
              }}
              onChange={(e) => setInputValue3(e.target.value)}
              className={`${focused3 ? "bg-[rgba(151,103,248,0.17)]" : "bg-transparent"} text-center text-black absolute w-full rounded-[5px] border-none outline-none transition-all ease-in-out duration-100 `}
            />
          </div>
        </div>

        <button
          type="button"
          onClick={() => setShowPicker(!showPicker)}
          className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 transition-all ease-in-out duration-100 hover:text-black"
        >
          <CalendarDays size={18} />
        </button>
      </div>

      <AnimatePresence>
        {showPicker && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{
              scale: 0,
              opacity: 0,
              transition: { duration: 0.15, ease: "easeInOut" },
            }}
            id="date-box"
            className="absolute right-0 z-10 mt-2 lg:w-[65%] min-w-[210px] rounded-[25px] border border-gray-700 bg-white p-4 shadow-xl origin-top-right"
          >
            {/* Calendar Header */}
            <div className="mb-3 flex items-center justify-between px-2">
              <button
                type="button"
                onClick={() => setCalendarMonth(subMonths(calendarMonth, 1))}
              >
                <ChevronLeft size={20} />
              </button>
              <span className="text-[20px] font-medium">
                {format(calendarMonth, "MMMM yyyy")}
              </span>
              <button
                type="button"
                onClick={() => setCalendarMonth(addMonths(calendarMonth, 1))}
              >
                <ChevronRight size={20} />
              </button>
            </div>

            {/* Week Days */}
            <div className="grid grid-cols-7 gap-1 text-[20px] px-1 pb-1">
              {["S", "M", "T", "W", "T", "F", "S"].map((day, i) => (
                <div key={i} className="text-center">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Days */}
            <div className="grid grid-cols-7 gap-1 text-sm">
              {generateCalendar().map((day, i) => {
                const isSelected = selectedDate && isSameDay(day, selectedDate);
                const inCurrentMonth = isSameMonth(day, calendarMonth);
                return (
                  <button
                    type="button"
                    key={i}
                    onClick={() => handleDateSelect(day)}
                    className={`rounded-md py-1 text-center transition text-[18px] ${
                      isSelected
                        ? "bg-[#9767f87e]"
                        : inCurrentMonth
                          ? "hover:bg-[#9767f834]"
                          : "text-zinc-500"
                    }`}
                  >
                    {day.getDate()}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function DatePicker2({ onChange }: DatePickerProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showPicker, setShowPicker] = useState(false);
  const [focused, setFocused] = useState(false);
  const [focused2, setFocused2] = useState(false);
  const [focused3, setFocused3] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [inputValue2, setInputValue2] = useState("");
  const [inputValue3, setInputValue3] = useState("");
  const [calendarMonth, setCalendarMonth] = useState(new Date());
  const [sendDate, setSendDate] = useState(new Date());
  const ValueRef = useRef<HTMLInputElement | null>(null);
  const ValueRef2 = useRef<HTMLInputElement | null>(null);
  const ValueRef3 = useRef<HTMLInputElement | null>(null);

  const handleKeyUp = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace") {
      if (index === 3 && ValueRef3.current?.value === "") {
        ValueRef2.current?.focus();
      } else if (index === 2 && ValueRef2.current?.value === "") {
        ValueRef.current?.focus();
      }
    }
  };

  const [calendario, setCalendario] = useState<CalendarioData>({});

  useEffect(() => {
    const calendario = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/home/calendario`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        const data = await res.json();
        setCalendario(data);
      } catch (err) {
        console.error(err);
      }
    };
    calendario();
  }, []);

  useEffect(() => {
    if (inputValue === "00") {
      setInputValue("01");
    } else if (parseInt(inputValue) > 31) {
      setInputValue("31");
    } else if (
      inputValue2 === "1" ||
      inputValue2 === "3" ||
      inputValue2 === "5" ||
      inputValue2 === "7" ||
      inputValue2 === "8" ||
      inputValue2 === "10" ||
      inputValue2 === "12"
    ) {
      //  console.log(inputValue2);
      if (parseInt(inputValue) > 31) {
        setInputValue("31");
      }
    } else if (
      inputValue2 === "4" ||
      inputValue2 === "6" ||
      inputValue2 === "9" ||
      inputValue2 === "11"
    ) {
      //  console.log(inputValue2);

      if (parseInt(inputValue) > 30) {
        setInputValue("30");
      }
    } else if (inputValue2 === "2") {
      //  console.log(inputValue2);

      if (parseInt(inputValue) > 28) {
        setInputValue("28");
      }
    } else {
      if (inputValue.length === 2) {
        ValueRef2.current?.focus();
        setInputValue(inputValue.slice(0, 2));
      }
    }
  }, [inputValue, inputValue2]);

  useEffect(() => {
    if (inputValue2 === "00") {
      setInputValue2("01");
    } else if (parseInt(inputValue2) > 12) {
      setInputValue2("12");
    } else {
      if (inputValue2.length === 2) {
        ValueRef3.current?.focus();
        setInputValue2(inputValue2.slice(0, 2));
      }
    }
  }, [inputValue2]);

  useEffect(() => {
    if (inputValue3.length === 4) {
      ValueRef3.current?.blur();
      setInputValue3(inputValue3.slice(0, 4));
      if (parseInt(inputValue3) < 1901) {
        setInputValue3("1900");
      }
    }
  }, [inputValue3]);

  useEffect(() => {
    let date = inputValue3 + "-" + inputValue2 + "-" + inputValue;
    onChange(date);
  }, [inputValue, inputValue2, inputValue3]);

  const handleDateSelect = (date: Date) => {
    if (date.getFullYear() < 1900) return;
    // console.log(date);
    const formatted = format(date, "dd/MM/yyyy");
    setSelectedDate(date);
    setInputValue(formatted.slice(0, 2));
    setInputValue2(formatted.slice(3, 5));
    setInputValue3(formatted.slice(6, 10));
    setCalendarMonth(date);
    setShowPicker(false);
    onChange(date.toISOString().split("T")[0]); // mantém "YYYY-MM-DD"
  };

  const generateCalendar = () => {
    const start = startOfWeek(startOfMonth(calendarMonth), { weekStartsOn: 0 });
    const end = endOfMonth(calendarMonth);
    const days: Date[] = [];

    let current = start;
    while (current <= end || days.length % 7 !== 0) {
      days.push(current);
      current = addDays(current, 1);
    }

    return days;
  };

  useEffect(() => {
    if (
      inputValue.length === 2 &&
      inputValue2.length === 2 &&
      inputValue3.length === 4
    ) {
      const typedDate = parse(
        `${inputValue3}-${inputValue2}-${inputValue}`,
        "yyyy-MM-dd",
        new Date()
      );
      if (isValid(typedDate)) {
        setCalendarMonth(typedDate);
        setSelectedDate(typedDate);
      }
    }
  }, [inputValue, inputValue2, inputValue3]);

  return (
    <div className="relative h-full w-full min-h-[282px]">
      <AnimatePresence>
        <motion.div
          // initial={{ scale: 0, opacity: 0 }}
          // animate={{ scale: 1, opacity: 1 }}
          // exit={{ scale: 0, opacity: 0, transition:{ duration: 0.15, ease: "easeInOut"} }}
          id="date-box"
          className="absolute right-0 z-10 h-full w-full rounded-[25px] border bg-[#ffffff63] p-4 shadow-xl origin-top-right"
        >
          {/* Calendar Header */}
          <div className="mb-3 flex items-center justify-between px-2">
            <button
              type="button"
              onClick={() => setCalendarMonth(subMonths(calendarMonth, 1))}
            >
              <ChevronLeft size={20} />
            </button>
            <span className="text-[20px] font-medium">
              {format(calendarMonth, "MMMM yyyy")}
            </span>
            <button
              type="button"
              onClick={() => setCalendarMonth(addMonths(calendarMonth, 1))}
            >
              <ChevronRight size={20} />
            </button>
          </div>

          {/* Week Days */}
          <div className="grid grid-cols-7 gap-1 text-[20px] px-1 pb-1">
            {["S", "M", "T", "W", "T", "F", "S"].map((day, i) => (
              <div key={i} className="text-center">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Days */}
          <div className="grid grid-cols-7 gap-1 text-sm">
            {generateCalendar().map((day, i) => {
              const isSelected = selectedDate && isSameDay(day, selectedDate);
              const inCurrentMonth = isSameMonth(day, calendarMonth);
              return (
                <button
                  type="button"
                  key={i}
                  onClick={() => handleDateSelect(day)}
                  className={`rounded-md py-1 text-center transition text-[18px] ${
                    isSelected
                      ? "bg-[#9767f87e]"
                      : inCurrentMonth
                        ? "hover:bg-[#9767f834]"
                        : "text-zinc-500"
                  }`}
                >
                  {day.getDate()}
                </button>
              );
            })}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
