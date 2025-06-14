'use client';
import { useState } from 'react';
import { format, parse, isValid, startOfMonth, endOfMonth, startOfWeek, addDays, addMonths, subMonths, isSameMonth, isSameDay } from 'date-fns';
import { CalendarDays, ChevronLeft, ChevronRight } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

type DatePickerProps = {
  onChange: (date: string) => void; // formato "YYYY-MM-DD"
};

export default function DatePicker({ onChange }: DatePickerProps ) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [showPicker, setShowPicker] = useState(false);
  const [calendarMonth, setCalendarMonth] = useState(new Date());

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputValue(val);

    const parsed = parse(val, 'dd/MM/yyyy', new Date());
    
    if (isValid(parsed) && parsed.getFullYear() >= 1900) {
      setSelectedDate(parsed);
      setCalendarMonth(parsed);
      onChange(parsed.toISOString().split('T')[0]);
    } else {
      setSelectedDate(null);
    }
  };

  const handleDateSelect = (date: Date) => {
    if (date.getFullYear() < 1900) return; // 🚫 Block selection
    setSelectedDate(date);
    setInputValue(format(date, 'dd/MM/yyyy'));
    setCalendarMonth(date);
    setShowPicker(false);
    onChange(date.toISOString().split("T")[0]); 
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
    <div className="relative ">
      <div className="relative ">
        <input
          type="text"
          placeholder="Data de nascimento" // <-- updated format
          value={inputValue}
          required
          onChange={handleInputChange}
          onClick={() => {
            const prevMonth = subMonths(calendarMonth, 1);
            if (prevMonth.getFullYear() >= 1900) {
              setCalendarMonth(prevMonth);
            }
          }}
          className=" rounded-[25px] border-2 border-[rgba(10,8,9,0.6)] h-[60px] w-full p-3 text-[20px] pr-10 shadow-sm outline-[rgba(151,103,248,0.6)]"
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
          initial={{ scale: 0, opacity: 0}}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0, transition:{ duration: 0.15, ease: "easeInOut"} }}

          id='date-box' className="absolute right-0 z-10 mt-2 w-[65%] rounded-[25px] border border-gray-700 bg-white p-4 shadow-xl origin-top-right">
            <div className="mb-3 flex items-center justify-between px-2 ">
              <button type='button' onClick={() => setCalendarMonth(subMonths(calendarMonth, 1))}>
                <ChevronLeft size={20} />
              </button>
              <span className="text-[20px] font-medium ">
                {format(calendarMonth, 'MMMM yyyy')}
              </span>
              <button type='button' onClick={() => setCalendarMonth(addMonths(calendarMonth, 1))}>
                <ChevronRight size={20} />
              </button>
            </div>

            <div className="grid grid-cols-7 gap-1 text-[20px] px-1 pb-1">
              {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
                <div key={i} className="text-center ">{day}</div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1 text-sm ">
              {generateCalendar().map((day, i) => {
                const isSelected = selectedDate && isSameDay(day, selectedDate);
                const inCurrentMonth = isSameMonth(day, calendarMonth);
                return (
                  <button
                    key={i}
                    onClick={() => handleDateSelect(day)}
                    className={`rounded-md py-1 text-center transition text-[18px] ${
                      isSelected
                        ? 'bg-[#9767f87e] '
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
