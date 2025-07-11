"use client";

import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts"
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { TooltipProps } from "recharts";

const data = [ 
    {dia:"Dia 1", atividades:0}, 
    {dia:"Dia 2", atividades:0}, 
    {dia:"Dia 3", atividades:0},
    {dia:"Dia 4", atividades:0},
    {dia:"Dia 5", atividades:0},
    {dia:"Dia 6", atividades:0},
    {dia:"Dia 7", atividades:0},
 ] 

const CustomTooltip = ({ active, payload }:  TooltipProps<number, string>) => {
  if (!active || !payload || payload.length === 0) return null;

  const atividades = payload[0].value;

  return (
    
    <AnimatePresence>
        <motion.div
        initial={{ scale:0.50 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.50 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        className="bg-white rounded-xl shadow p-3 text-center origin-top-left">
            <p className="text-xl font-bold">{atividades}</p>
            <p className="text-base ">Atividades feitas</p>
        </motion.div>

    </AnimatePresence>
  );
};

 export const Chart  = () => {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
      setIsClient(true);
    }, []);
  
    if (!isClient) return null;
    
    return (
        <>
            <div className="w-[770px] max-w-[100%] overflow-hidden">
                <LineChart width={770} height={300} data={data} margin={{top: 12, left: -35, bottom: 0, right: 0}}> 
                    <CartesianGrid stroke="#ccc" strokeDasharray="5 5"/>
                    <XAxis stroke="#666" dataKey="dia"/>
                    <YAxis dataKey="atividades"/>
                    <Line type="monotone" dataKey="atividades" strokeWidth={4} stroke="#9767F8" />
                    <Tooltip content={CustomTooltip} />
                </LineChart>
            </div>
        </>
    )

}
