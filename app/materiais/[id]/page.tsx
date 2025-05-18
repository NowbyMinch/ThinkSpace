import MateriaisClient from "./MateriaisClient";
import {  CirclePlus, Heart, Globe, Monitor, CodeXml, HeartPulse, Minus, Divide, X, Plus, Search, ChevronRight, ChevronsLeft, ChevronsRight, ChevronLeft, ChevronDown, BookOpenText, FileText, FileInput, ScrollText } from "lucide-react";
import {  useEffect, useState  } from 'react';


export default function Materiais({ params }: {params: { id: string } }) {
    return <MateriaisClient id={params.id} />
};
