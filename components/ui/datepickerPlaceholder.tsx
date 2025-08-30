'use client';
import { useState } from 'react';
import { format, parse, isValid, startOfMonth, endOfMonth, startOfWeek, addDays, addMonths, subMonths, isSameMonth, isSameDay, lastDayOfMonth } from 'date-fns';
import { CalendarDays, ChevronLeft, ChevronRight } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { IMaskInput } from "react-imask";
import IMask from "imask";

type DatePickerProps = {
  onChange: (date: string) => void; // formato "YYYY-MM-DD"
};

export default function DatePickerPlaceholder({ onChange }: DatePickerProps ) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [showPicker, setShowPicker] = useState(false);
  const [calendarMonth, setCalendarMonth] = useState(new Date());

  const currentYear = new Date().getFullYear();

  const validateDate = (val: string) => {
    const parsed = parse(val, "dd/MM/yyyy", new Date());
    if (!isValid(parsed)) return false;

    const day = parsed.getDate();
    const month = parsed.getMonth() + 1;
    const year = parsed.getFullYear();

    if (month < 1 || month > 12) return false;
    if (year < 1900 || year > currentYear) return false;

    const maxDay = lastDayOfMonth(parsed).getDate();
    if (day < 1 || day > maxDay) return false;

    return true;
  };

  // handleInputChange agora recebe uma string do IMaskInput
  const handleInputChange = (val: string) => {
    setInputValue(val);

    if (val.length === 10 && validateDate(val)) {
      const parsed = parse(val, "dd/MM/yyyy", new Date());
      setSelectedDate(parsed);
      setCalendarMonth(parsed);
      onChange(parsed.toISOString().split("T")[0]); // retorna no formato "YYYY-MM-DD"
    } else {
      setSelectedDate(null);
    }

    
  };

  const handleDateSelect = (date: Date) => {
    if (date.getFullYear() < 1900 || date.getFullYear() > currentYear) return;
    const formatted = format(date, "dd/MM/yyyy");
    setSelectedDate(date);
    setInputValue(formatted);
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

  return (
    
    <div className="relative">
      <div className="relative">

        <IMaskInput
          mask="d/m/Y"
          blocks={{
            d: { mask: IMask.MaskedRange, from: 1, to: 31, maxLength: 2, placeholderChar: "d" },
            m: { mask: IMask.MaskedRange, from: 1, to: 12, maxLength: 2, placeholderChar: "m" },
            Y: { mask: IMask.MaskedRange, from: 1900, to: 9999, maxLength: 4, placeholderChar: "a" },
          }}
          overwrite={true}
          lazy={false}
          eager={true}
          onAccept={handleInputChange}
          placeholder="dd/mm/aaaa"
          className="no-select p-3 text-[18px] w-full rounded-[25px] 
                    outline-[rgba(151,103,248,0.6)] 
                    border-2 border-[rgba(10,8,9,0.6)] 
                    caret-black"
        />


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
