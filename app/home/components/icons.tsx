import {
  CirclePlus, Heart, Globe, Monitor, CodeXml, HeartPulse,
  Minus, Divide, X, Plus, Search, ChevronRight, ChevronsLeft,
  ChevronsRight, ChevronLeft, AlarmClock, Bell, Book,
  Bookmark, Calendar, Check, Clipboard, Clock,
  Code, Cpu, Database, Download, Edit, Eye, File, Filter, Flag,
  Folder, GitBranch, Globe2, Grid, Hash, Headphones, HelpCircle,
  Home, Inbox, Info, Key, Layers, Layout, LifeBuoy, Lightbulb, List,
  Loader, Lock, LogIn, LogOut, Mail, Map, Menu, SquareX, 
  SquarePen,
  Ellipsis
} from "lucide-react";


export const icons = [
  // Educação e aprendizado
  { id: "book", Icon: Book }, { id: "bookmark", Icon: Bookmark },
  { id: "clipboard", Icon: Clipboard }, { id: "file", Icon: File }, { id: "folder", Icon: Folder },
  { id: "calendar", Icon: Calendar }, { id: "clock", Icon: Clock }, { id: "alarmClock", Icon: AlarmClock },
  { id: "edit", Icon: Edit }, { id: "download", Icon: Download }, { id: "eye", Icon: Eye },
  { id: "check", Icon: Check }, { id: "search", Icon: Search }, { id: "filter", Icon: Filter },
  { id: "helpCircle", Icon: HelpCircle }, { id: "info", Icon: Info }, { id: "lightbulb", Icon: Lightbulb },

  // Programação e lógica
  { id: "code", Icon: Code }, { id: "codeXml", Icon: CodeXml }, { id: "cpu", Icon: Cpu }, { id: "database", Icon: Database },
  { id: "gitBranch", Icon: GitBranch }, { id: "hash", Icon: Hash }, { id: "Monitor", Icon: Monitor },

  // Matemática
  { id: "plus", Icon: Plus }, { id: "minus", Icon: Minus }, { id: "x", Icon: X }, { id: "divide", Icon: Divide },

  // Interface e organização de conhecimento
  { id: "layers", Icon: Layers }, { id: "layout", Icon: Layout }, { id: "grid", Icon: Grid }, { id: "list", Icon: List },
  { id: "menu", Icon: Menu }, { id: "loader", Icon: Loader },

  // Comunicação e interações
  { id: "mail", Icon: Mail }, { id: "inbox", Icon: Inbox }, { id: "bell", Icon: Bell }, { id: "headphones", Icon: Headphones },

  // Identidade e acesso (login/logout para ambientes de estudo)
  { id: "logIn", Icon: LogIn }, { id: "logOut", Icon: LogOut }, { id: "lock", Icon: Lock }, { id: "key", Icon: Key },

  // Contexto global e navegação de conteúdo
  { id: "globe", Icon: Globe }, { id: "globe2", Icon: Globe2 }, { id: "map", Icon: Map }, { id: "home", Icon: Home },
  { id: "chevronRight", Icon: ChevronRight }, { id: "chevronLeft", Icon: ChevronLeft },
  { id: "chevronsRight", Icon: ChevronsRight }, { id: "chevronsLeft", Icon: ChevronsLeft },

  // Extras úteis
  { id: "flag", Icon: Flag }, { id: "lifeBuoy", Icon: LifeBuoy }, { id: "circlePlus", Icon: CirclePlus },
  { id: "heart", Icon: Heart }, { id: "heartPulse", Icon: HeartPulse }, { id: "squareX", Icon: SquareX },
  { id: "squarePen", Icon: SquarePen }
];
export const colors = ["#8B81F3", "#CAC5FF", "#FFA6F1", "#FFACA1"];

export const cor = { 
    "#8B81F3": "ROXO", 
    "#CAC5FF": "LILAS", 
    "#FFA6F1": "ROSA", 
    "#FFACA1": "SALMAO" 
};