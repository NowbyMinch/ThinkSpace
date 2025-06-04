"use client";

import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts"
import { useState, useEffect } from "react";
const data = [ 
    {dia:"Dia 1", atividades:2}, 
    {dia:"Dia 2", atividades:18}, 
    {dia:"Dia 3", atividades:5},
    {dia:"Dia 4", atividades:14},
    {dia:"Dia 5", atividades:19},
    {dia:"Dia 6", atividades:16},
    {dia:"Dia 7", atividades:8},
 ] 

 export const Chart  = () => {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
      // Só após o componente estar no cliente
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
                    <Tooltip/>
                </LineChart>
            </div>
        </>
    )

}
