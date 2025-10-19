'use client';
import { useEffect, useState, useRef } from 'react';
import { format, parse, isValid, startOfMonth, endOfMonth, startOfWeek, addDays, addMonths, subMonths, isSameMonth, isSameDay, lastDayOfMonth } from 'date-fns';
import { CalendarDays, ChevronLeft, ChevronRight, ChevronsLeftRightEllipsisIcon } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { IMaskInput } from "react-imask";
import IMask from "imask";
import React from 'react';

type DatePickerProps = {
  onChange: (date: string) => void; // formato "YYYY-MM-DD"
};
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

export default function DatePicker({ onChange }: DatePickerProps ) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showPicker, setShowPicker] = useState(false);
  const [focused, setFocused] = useState(false);
  const [focused2, setFocused2] = useState(false);
  const [focused3, setFocused3] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [inputValue2, setInputValue2] = useState('');
  const [inputValue3, setInputValue3] = useState('');
  const [calendarMonth, setCalendarMonth] = useState(new Date());
  const [sendDate, setSendDate] = useState(new Date());
  const ValueRef = useRef<HTMLInputElement | null>(null);
  const ValueRef2 = useRef<HTMLInputElement | null>(null);
  const ValueRef3 = useRef<HTMLInputElement | null>(null);
  
  const handleKeyUp = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      if (index === 3 && ValueRef3.current?.value === "") {
        ValueRef2.current?.focus();
      } else if (index === 2 && ValueRef2.current?.value === "") {
        ValueRef.current?.focus();
      }
    }
  };
  
  const [ calendario, setCalendario ] = useState<CalendarioData>({})
  
  useEffect(() => {
    const calendario = async () => {
      try{
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/home/calendario`, {
          method: 'GET',
          credentials: 'include',
        });
        
        const data = await res.json();
        setCalendario(data)
      } catch (err) {
        console.error(err);
      }
    }; calendario();

  }, [])
  
  useEffect(() => {
    if (inputValue === "00"){
      setInputValue("01");
    }
    else if (parseInt(inputValue) > 31){
      setInputValue("31");
    } else if (inputValue2 === "1" || inputValue2 === "3" || inputValue2 === "5" || inputValue2 === "7" || inputValue2 === "8" || inputValue2 === "10" || inputValue2 === "12"){
      console.log(inputValue2)
      if (parseInt(inputValue) > 31) {
        setInputValue("31");
      }
    } else if (inputValue2 === "4" || inputValue2 === "6" || inputValue2 === "9" || inputValue2 === "11" ) {
      console.log(inputValue2)

      if (parseInt(inputValue) > 30) {
        setInputValue("30");
      }
    } else if (inputValue2 === "2"){
      console.log(inputValue2)

      if (parseInt(inputValue) > 28) {
        setInputValue("28");
      }
    } else {
      if (inputValue.length === 2){
        ValueRef2.current?.focus();    
        setInputValue(inputValue.slice(0,2))
      };

    };

  }, [inputValue,inputValue2]);

  useEffect(() => {
    if (inputValue2 === "00"){
      setInputValue2("01");
    } else if (parseInt(inputValue2) > 12) {
      setInputValue2("12");
    } else {
      if (inputValue2.length === 2){
        ValueRef3.current?.focus();    
        setInputValue2(inputValue2.slice(0,2))
      }
    };

  }, [inputValue2]);
  
  useEffect(() => {
    if (parseInt(inputValue3) > (new Date().getFullYear() ?? 0)) {

      if ( new Date().getFullYear() !== undefined) {
        // let raw = e.target.value.replace(/\D/g, ""); // remove non-numeric
        setInputValue3(new Date().getFullYear().toString());
      }
      
    } else {
      if (inputValue3.length === 4){
        ValueRef3.current?.blur();    
        setInputValue3(inputValue3.slice(0,4))
        if(parseInt(inputValue3) < 1901){
          setInputValue3("1900");
        }
      } 
    }

  }, [inputValue3]);
  
  useEffect(() => {
    let date = inputValue3 + "-" + inputValue2 + "-" + inputValue;
    onChange(date);

  }, [inputValue, inputValue2, inputValue3]);
  
  const currentYear = new Date().getFullYear();

  const handleDateSelect = (date: Date) => {
    if (date.getFullYear() < 1900 || date.getFullYear() > currentYear) return;
    // console.log(date);
    const formatted = format(date, "dd/MM/yyyy");
    setSelectedDate(date);
    setInputValue(formatted.slice(0,2));
    setInputValue2(formatted.slice(3,5));
    setInputValue3(formatted.slice(6,10));
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
    if (inputValue.length === 2 && inputValue2.length === 2 && inputValue3.length === 4) {
      const typedDate = parse(`${inputValue3}-${inputValue2}-${inputValue}`, "yyyy-MM-dd", new Date());
      if (isValid(typedDate)) {
        setCalendarMonth(typedDate);
        setSelectedDate(typedDate);
      }
    }
  }, [inputValue, inputValue2, inputValue3]);

  
  return (
    <div className="relative">
      <div className="relative">

        <div className={`${focused || focused2 || focused3 ? "border-[rgba(151,103,248,0.6)]" : "border-[rgba(10,8,9,0.6)]"} relative cursor-text p-3 h-[54px] gap-1 text-[18px] flex w-full rounded-[25px] border-2 `}>
          <div className="relative text-gray-400 block w-[31px]">
            {!focused && !inputValue && <div className='w-full rounded-[5px] absolute text-center'>dd</div>}
            <input ref={ValueRef} value={inputValue} onBlur={() => {
              setFocused(false);
              if (inputValue && inputValue.length === 1) {
                setInputValue(inputValue.padStart(2, "0")); // "2" → "02"
              }
              else if(parseInt(inputValue) < 1){
                setInputValue("1");
              };
            }} type="text" onFocus={() => setFocused(true)} onChange={(e) => setInputValue(e.target.value)} className={`${focused  ? "bg-[rgba(151,103,248,0.17)]" : "bg-transparent" } text-center text-black absolute w-full rounded-[5px] border-none outline-none transition-all ease-in-out duration-100 `}/>
          </div>  

          <div className="text-gray-400 ">/</div>

          <div className="relative text-gray-400 block w-[31px]">
            {!focused2 && !inputValue2 && <div className='w-full rounded-[5px] absolute text-center'>mm</div>}

            <input ref={ValueRef2} onKeyUp={(e) => handleKeyUp(2,e)} value={inputValue2} type="text" onFocus={() => setFocused2(true)} onBlur={() => {
              setFocused2(false);
              if (inputValue2 && inputValue2.length === 1) {
                setInputValue2(inputValue2.padStart(2, "0")); // "2" → "02"
              }
            }} onChange={(e) => setInputValue2(e.target.value)} className={`${focused2  ? "bg-[rgba(151,103,248,0.17)]" : "bg-transparent" } text-center text-black absolute w-full rounded-[5px] border-none outline-none transition-all ease-in-out duration-100 `}/>
          </div>

          <div className="text-gray-400 ">/</div>

          <div className="relative text-gray-400 block w-[42px]">
            {!focused3 && !inputValue3 && <div className='w-full rounded-[5px] absolute text-center'>aaaa</div>}

            <input ref={ValueRef3} value={inputValue3} onKeyUp={(e) => handleKeyUp(3,e)} type="text" onFocus={() => setFocused3(true)} onBlur={() => {setFocused3(false); 
              
            }} onChange={(e) => setInputValue3(e.target.value)} className={`${focused3  ? "bg-[rgba(151,103,248,0.17)]" : "bg-transparent" } text-center text-black absolute w-full rounded-[5px] border-none outline-none transition-all ease-in-out duration-100 `}/>
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
            exit={{ scale: 0, opacity: 0, transition:{ duration: 0.15, ease: "easeInOut"} }}
            id='date-box'
            className="absolute right-0 z-10 mt-2 lg:w-[65%] min-w-[210px] rounded-[25px] border border-gray-700 bg-white p-4 shadow-xl origin-top-right"
          >
            {/* Calendar Header */}
            <div className="mb-3 flex items-center justify-between px-2">
              <button type='button' onClick={() => setCalendarMonth(subMonths(calendarMonth, 1))}>
                <ChevronLeft size={20} />
              </button>
              <span className="text-[20px] font-medium">
                {format(calendarMonth, 'MMMM yyyy')}
              </span>
              <button type='button' onClick={() => setCalendarMonth(addMonths(calendarMonth, 1))}>
                <ChevronRight size={20} />
              </button>
            </div>

            {/* Week Days */}
            <div className="grid grid-cols-7 gap-1 text-[20px] px-1 pb-1">
              {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
                <div key={i} className="text-center">{day}</div>
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
                        ? 'bg-[#9767f87e]'
                        : inCurrentMonth
                        ? 'hover:bg-[#9767f834]'
                        : 'text-zinc-500'
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
