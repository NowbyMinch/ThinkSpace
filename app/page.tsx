"use client";

import Image from "next/image";
import React, { useCallback, useRef, useEffect} from 'react'
import { MoveUpRight, ChevronLeft, ChevronRight, Instagram } from "lucide-react" ;
import useEmblaCarousel from 'embla-carousel-react'
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";

interface AccordionItem {
  title: string;
  content: string;
}

const items: AccordionItem[] = [
  {
    title: "O que torna o ThinkSpace diferente das outras plataformas de estudo?",
    content:
      "ThinkSpace oferece uma abordagem personalizada e gamificada para o aprendizado.",
  },
  {
    title: "Como eu posso acessar a plataforma?",
    content:
      "Você pode acessar a plataforma através do site oficial usando seu e-mail cadastrado.",
  },
  {
    title: "Qual a idade mínima para registro na plataforma?",
    content: "A idade mínima para se registrar é 13 anos.",
  },
];

export default function Home() {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' } )
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
    const [showHeader, setShowHeader] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentY = window.scrollY;

            if (currentY > lastScrollY && currentY > 100) {
                // Scrolling down
                setShowHeader(false);
                console.log("false")
            } else {
                // Scrolling up
                console.log("true")
                setShowHeader(true);
            }

            setLastScrollY(currentY);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    const scrollToSection = (index: number) => {
        sectionRefs.current[index]?.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });
    };

    const toggle = (index: number) => {
        setOpenIndex(index === openIndex ? null : index);
    };

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev()
    }, [emblaApi])

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext()
    }, [emblaApi])

    return (
        <>
            <div className="w-screen z-[0] relative">
                <header id="header" className={`${showHeader ? 'translate-y-0' : '-translate-y-full'} transition-all ease-in-out duration-300 z-[1100] shadow-md fixed top-0 bg-white w-[100%] h-[120px] flex justify-center`}>
                    <div className="flex w-[90%] max-w-[1700px] h-[120px] justify-between">
                        <div className=" w-full h-full flex items-center ">
                            <a className="cursor-pointer ">
                                <Image width={300} height={500} src="/landingpage/logo1.png" className="w-[180px] " alt="Logo"/>
                            </a>
                        </div>
                        <div className=" w-full flex justify-center items-center ">  
                            <div id="links-header" className="flex justify-between gap-2">
                                <motion.a 
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}

                                className="cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                                    Home
                                </motion.a>

                                <motion.a 
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                
                                className="cursor-pointer" onClick={() => scrollToSection(1)} >
                                    Sobre nós
                                </motion.a>

                                <motion.a 
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }} 
                                
                                className="cursor-pointer" onClick={() => scrollToSection(2)}>
                                    Planos
                                </motion.a>

                                <motion.a 
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                
                                className="cursor-pointer" onClick={() => scrollToSection(3)}>
                                    FAQ
                                </motion.a>
                            </div>
                        </div>
                        <div className=" w-full flex justify-end ">
                            <div className="flex items-center gap-8 ">
                                <Link href="/login" className=" transition-all ease-in-out hover:text-[#A78CDC]">
                                    <button className="text-[20px] ">Entrar</button>
                                </Link>
                                <motion.button 
                                whileTap={{ scale: 0.99 }} 
                                whileHover={{ scale: 1.01 }}
                                transition={{ duration: 0.2, ease: "easeInOut" }}
                                className="text-[20px] p-[8px_20px] rounded-full border-[2px] h-fit flex gap-4 items-center justify-center border-[rgba(18,18,18,0.24)] cursor-pointer hover:border-[#A78CDC]">
                                    <Link href="/registrar">
                                        Registre-se
                                    </Link>
                                    <div className="bg-[#A39CEC] p-3 rounded-full"> <MoveUpRight className="text-white size-5"/> </div>
                                </motion.button>
                            </div>

                        </div>
                    </div>
                </header>
                
                <main className="flex justify-center items-center flex-col gap-[150px] ">
                    <div className="w-full relative flex justify-center h-fit ">
                        <div className="w-full h-full z-[-10] ">
                            <Image width={300} height={500} src="/landingpage/background.svg" alt="Banner" className="w-full mt-[-28px] "/>
                        </div>

                        <div className="w-[1570px] h-[88%] flex max-w-[80%] absolute ">
                            <div className="flex max-w-[50%]">
                                <div className="w-[600px] h-[80%] text-[70px] flex flex-col gap-4 justify-center items-start ">  

                                    <h1 className="overflow-ellipsis line-clamp-3 break-words w-full text-[65px] text-white">Estude de maneira mais <span id="conf" className=" text-[#FF92EE] text-[60px]">rápida</span> e <span id="conf" className=" text-[#5F3AC4] text-[60px]">eficiente</span></h1>
                                    <p className="text-[25px] text-white line-clamp-1 break-words">O jeito inteligente de aprender mais em menos tempo.</p>

                                    <motion.button 
                                    whileTap={{ scale: 0.98 }} 
                                    whileHover={{ scale: 1.02 }}
                                    transition={{ duration: 0.2, ease: "easeInOut" }}
                                    className="w-[250px] max-w-[43%] text-white text-[20px] p-[10px] rounded-full flex gap-4 items-center justify-center cursor-pointer 
                                    bg-[#BF9FFF] ">
                                        <span className="line-clamp-2 break-words">Comece a estudar</span>
                                        <div className="bg-white p-3 rounded-full "> <MoveUpRight className="text-[#A39CEC] size-5"/> </div>
                                    </motion.button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="w-[1300px] max-w-[80%] flex flex-col justify-center items-center gap-7 mt-[-200px]">   
                        <div  className="w-full text-[55px] flex justify-between items-center">
                            <h1 id="title">Nossas funcionalidades</h1>
                            <Image id="func-vector" width={500} height={300} src="/landingpage/func-vector.svg" alt="Vector" className="w-[350px]"/>
                        </div>

                        <div className="grid grid-rows-[1fr_46%] w-[78%] h-[720px] gap-6">
                            <div className="grid grid-cols-3 gap-5">
                                <div id="func-boxes" className="bg-[#B697F5] shadow-md rounded-[45px] relative overflow-hidden flex flex-col justify-end items-center">
                                    <Image width={300} height={500} src="/landingpage/func1.svg" alt="Funcionalidade 1" className="absolute top-0 right-0 w-[90%] "/>
                                    <div className="h-[60%] w-[80%] flex flex-col ">
                                        <h1 className="text-[40px] font-bold line-clamp-1 break-words ">Quizzes</h1>
                                        <p className="text-[18px] break-words line-clamp-5">Descubra quizzes feitos pela comunidade ou crie os seus próprios para testar conhecimentos e compartilhar com outras pessoas.</p>
                                    </div>
                                </div>
                                <div id="func-boxes" className="bg-[#FFB0F3] shadow-md rounded-[45px] relative overflow-hidden flex flex-col justify-end items-center">
                                    <Image width={300} height={500} src="/landingpage/func2.svg" alt="Funcionalidade 2" className="absolute top-0 right-0 w-[90%] "/>
                                    <div className="h-[60%] w-[80%] flex flex-col ">
                                        <h1 className="text-[40px] font-bold line-clamp-1 break-words ">Comunidade </h1>
                                        <p className="text-[18px] break-words line-clamp-5">Uma comunidade aberta para trocar ideias, compartilhar conteúdos e se conectar com pessoas que compartilham seus interesses.</p>
                                    </div>
                                </div>
                                <div id="func-boxes" className="bg-[#9678FF] shadow-md rounded-[45px] relative overflow-hidden flex flex-col justify-end items-center">
                                    <Image width={300} height={500} src="/landingpage/func3.svg" alt="Funcionalidade 3" className="absolute top-4 right-0 w-[90%] "/>
                                    <div className="h-[60%] w-[80%] flex flex-col ">
                                        <h1 className="text-[40px] font-bold line-clamp-1 break-words ">Materiais</h1>
                                        <p className="text-[18px] break-words line-clamp-5">Geração automática de materiais de estudo com IA, a partir de documentos enviados ou tópicos personalizados.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-[1fr_1fr] gap-6">
                                <div id="func-boxes" className="bg-[#A67EF6] shadow-md rounded-[45px] relative overflow-hidden flex flex-col justify-end items-center">
                                    <Image width={300} height={500} src="/landingpage/func4.svg" alt="Funcionalidade 4" className="absolute top-[-15px] right-[0] w-[85%] "/>
                                    <div className="h-[59%] w-[80%] flex flex-col ">
                                        <h1 className="text-[40px] font-bold line-clamp-1 break-words ">Métricas</h1>
                                        <p className="text-[18px] break-words w-[75%] line-clamp-4">Acompanhe seu progresso, visualize suas conquistas e descubra insights que ajudam você a aprender melhor a cada dia.</p>
                                    </div>
                                </div>                                
                                <div id="func-boxes" className="bg-[#FF80EB] shadow-md rounded-[45px] relative overflow-hidden flex flex-col justify-end items-center">
                                    <div className="absolute top-[-30px] right-[-95px] w-[105%] h-[100%]">
                                        <Image width={800} height={800} src="/landingpage/func5.svg" alt="Funcionalidade 5" className=" w-full "/>
                                    </div>
                                    <div className="h-[62%] w-[80%] flex flex-col ">
                                        <h1 className="text-[40px] font-bold line-clamp-1 break-words ">Calendário</h1>
                                        <p className="text-[18px] break-words w-[70%] line-clamp-4">Organize sua rotina, planeje seus estudos e nunca perca um prazo com um calendário feito para acompanhar seu ritmo.</p>
                                    </div>
                                </div>                                
                            </div>
                        </div>
                    </div>
                    
                    <div ref={el => { sectionRefs.current[1] = el; }} className="w-[1300px]  max-w-[80%] flex flex-row justify-center ">
                        <div className="w-[50%] flex flex-col gap-12">
                            <h1 id="title" className="w-full">Aprender nunca foi tão fácil
                                <Image width={300} height={500} className="absolute top-0 left-[-38px] w-[40%]" src="/landingpage/aprendervec.svg" alt="Vector"/>
                            </h1>
                            <p id="animate" className="text-[22px]">Nossa missão é simples: tornar o estudo mais inteligente, acessível e personalizado para todos os estudantes, em qualquer fase da vida.
                                Na ThinkSpace, criamos planos de estudo estratégicos, pensados para economizar tempo, reduzir o estresse e ajudar cada pessoa a alcançar seus objetivos com mais foco e confiança.
                                Acreditamos que aprender não precisa ser complicado — e com o plano certo, tudo flui melhor.
                            </p>
                            <motion.button 
                            whileTap={{ scale: 0.98 }} 
                            whileHover={{ scale: 1.02 }}
                            transition={{ duration: 0.2, ease: "easeInOut" }}
                            className="w-[255px] max-w-[43%] text-[#704FE6] text-[20px] p-[8px_20px] rounded-full border h-fit flex gap-4 items-center justify-center border-[#704FE6] cursor-pointer  ">
                                <span className="line-clamp-2 break-words">Comece a estudar</span>
                                <div className="bg-[#704FE6] p-3 rounded-full "> <MoveUpRight className="text-white size-5"/> </div>
                            </motion.button>
                        </div>

                        <div id="animate" className=" w-[50%] flex flex-col ">
                            <div className="h-[570px] flex justify-end relative ">
                                <Image id="aprender" width={300} height={800} src="/landingpage/aprendervec1.svg" alt="Banner" className="absolute top-0 w-[45%] "/>
                                <Image id="aprender" width={300} height={800} src="/landingpage/aprendervec2.svg" alt="Banner" className="absolute top-[25%] w-[75%] "/>
                                <Image id="aprender" width={300} height={800} src="/landingpage/aprendervec3.svg" alt="Banner" className="absolute bottom-0 w-[80%] "/>
                            </div>
                        </div>

                    </div>

                    <div className="w-full h-[850px] bg-[#9767F8] flex flex-col justify-center items-center ">
                        <div className="w-[1300px] h-[80%] max-w-[80%] relative flex flex-col items-center ">
                            <Image width={300} height={800} src="/landingpage/materiaisvec.svg" alt="Banner" className="absolute w-full top-0"/>
                            
                            <div className="flex flex-col items-center gap-[100px] w-full h-full">
                                <h1 id="animate" className="text-white text-center text-[50px] w-[80%]">Nossos materiais tornam o aprendizado divertido e acessível para estudantes de todas as idades.</h1>
                                
                                <div className="flex w-full gap-2 justify-center items-center">

                                    <button className="embla__prev h-min" onClick={scrollPrev}>
                                        <ChevronLeft className="bg-[rgba(255,255,255,0.10)] size-12 p-2 rounded-full text-white"/>
                                    </button>

                                    <div className="embla">
                                        <div className="embla__viewport " ref={emblaRef}>
                                            <div className="embla__container ">

                                                <div className="embla__slide flex flex-col gap-6 items-center">
                                                    <Image src="/landingpage/materiais-img1.svg" className="max-h-[200px]" width={300} height={500} alt="Alt"/>
                                                    <h1 className=" h-[60px] text-white  text-[30px] leading-8 text-center flex justify-center ">Professora de Ciências</h1>
                                                    <h2 className="text-white max-w-[96%] text-center text-[20px]">Ajuda pré-universitários a explorarem o mundo com curiosidade e foco no vestibular.</h2>
                                                </div>
                                                <div className="embla__slide flex flex-col gap-6 items-center">
                                                    <Image src="/landingpage/materiais-img2.svg" className="max-h-[200px]" width={300} height={500} alt="Alt"/>
                                                    <h1 className=" h-[60px] text-white text-[30px] leading-8 text-center flex justify-center ">Mentora de Artes</h1>
                                                    <h2 className="text-white max-w-[96%] text-center text-[20px]">Inspira estudantes a desenvolverem a criatividade através do desenho e expressão visual.</h2>
                                                </div>
                                                <div className="embla__slide flex flex-col gap-6 items-center">
                                                    <Image src="/landingpage/materiais-img3.svg" className="max-h-[200px]" width={300} height={500} alt="Alt"/>
                                                    <h1 className=" h-[60px] text-white text-[30px] leading-8 text-center flex justify-center ">Professor de Matemática</h1>
                                                    <h2 className="text-white max-w-[96%] text-center text-[20px]">Ensina com entusiasmo, conectando o raciocínio lógico ao dia a dia universitário.</h2>
                                                </div>
                                                <div className="embla__slide flex flex-col gap-6 items-center">
                                                    <Image src="/landingpage/materiais-img4.svg" className="max-h-[200px]" width={300} height={500} alt="Alt"/>
                                                    <h1 className=" h-[60px] text-white text-[30px] leading-8 text-center flex justify-center ">Estudante amante de leitura</h1>
                                                    <h2 className="text-white max-w-[96%] text-center text-[20px]">Descobre novos mundos através dos livros e compartilha conhecimento com alegria.</h2>
                                                </div>
                                                <div className="embla__slide flex flex-col gap-6 items-center">
                                                    <Image src="/landingpage/materiais-img5.svg" className=" max-h-[200px]" width={300} height={500} alt="Alt"/>
                                                    <h1 className=" h-[60px] text-white text-[30px] leading-8 text-center flex justify-center ">Estudante autodidata em tecnologia</h1>
                                                    <h2 className="text-white max-w-[96%] text-center text-[20px]">Aprende por conta própria sobre programação e inovação, com sede de descobertas.</h2>
                                                </div>
                                                

                                            </div>
                                        </div>
                                    </div>
                                    <button className="embla__next h-min" onClick={scrollNext}>
                                        <ChevronRight className="bg-[rgba(255,255,255,0.10)] size-12 p-2 rounded-full text-white"/>
                                    </button>
                                </div>
                                
                            </div>

                        </div>
                    </div>
                    
                    <div className="w-full pb-20 flex justify-center relative ">
                        <div className="w-[1500px] flex justify-center items-center ">
                            <div ref={el => { sectionRefs.current[2] = el; }} className="w-[1300px] max-w-[80%] flex flex-row justify-center">
                                <div className="w-full flex flex-col gap-12 relative ">
                                    <h1 id="title" className="preco w-full">Nossos planos</h1>
                                    <div className="h-[575px] flex justify-center items-center gap-10 relative ">
                                        <motion.div
                                        whileHover={{ scale: 1.01 }}
                                        whileTap={{ scale: 0.99 }}
                                        transition={{ duration: 0.2, ease: "easeInOut" }}
                                        id="title"
                                        className="w-[420px] rounded-[45px] h-full bg-[#B697F5] cursor-pointer relative overflow-hidden shadow-lg border-[6px] border-[#a98ee4] flex flex-col items-center gap-10">
                                            <div className="absolute w-[120%] top-[-65px] left-[-60px] h-[35%]   ">
                                                <Image src="/landingpage/gratis.svg" alt="Perguntas Frequentes Vector" className="w-full" width={300} height={500}/>
                                            </div>
                                            <div className="h-[105px] mt-[50%] w-[85%] flex items-end">
                                                <span className="leading-none text-[40px]">R$</span>
                                                <span className="text-[105px] font-medium leading-[85px]">00</span>
                                                <span className="leading-none ">,</span>
                                                <span className="mb-auto text-[35px] font-medium">00</span>
                                                <span className="leading-none text-[40px] -ml-3 ">/mensal</span>
                                            </div>

                                            <div className=" w-[90%] flex items-end ">
                                                <ul className="text-[23px] text-[#000] list-disc pl-3">
                                                    <li>5 Salas de estudos</li>
                                                    <li>Até 10 materiais de estudo por mês</li>
                                                    <li>Sem acesso à chat IA</li>
                                                    <li>Ambiente com anúncios</li>
                                                </ul>
                                            </div>

                                        </motion.div>

                                        <motion.div
                                        whileHover={{ scale: 1.01 }}
                                        whileTap={{ scale: 0.99 }}
                                        transition={{ duration: 0.2, ease: "easeInOut" }}
                                        id="title"
                                        className="w-[420px] rounded-[45px] h-full bg-[#FFB0F3] cursor-pointer relative overflow-hidden shadow-lg border-[6px] border-[#e59eda] flex flex-col items-center gap-10">
                                            <div className="absolute w-[120%] top-[-65px] left-[-60px] h-[35%]   ">
                                                <Image src="/landingpage/basico.svg" alt="Perguntas Frequentes Vector" className="w-full" width={300} height={500}/>
                                            </div>
                                            <div className="h-[105px] mt-[50%] w-[85%] flex items-end">
                                                <span className="leading-none text-[40px]">R$</span>
                                                <span className="text-[105px] font-medium leading-[85px]">12</span>
                                                <span className="leading-none ">,</span>
                                                <span className="mb-auto text-[35px] font-medium">90</span>
                                                <span className="leading-none text-[40px] -ml-3 ">/mensal</span>
                                            </div>

                                            <div className=" w-[90%] flex items-end ">
                                                <ul className="text-[23px] text-[#000] list-disc pl-3">
                                                    <li>Acesso ilimitado a salas de estudo</li>
                                                    <li>30 Materiais de estudo por mês</li>
                                                    <li>Inteligência Artificial limitada</li>
                                                    <li>Ambiente 100% livre de anúncios</li>
                                                </ul>
                                            </div>

                                        </motion.div>

                                        <motion.div
                                        whileHover={{ scale: 1.01 }}
                                        whileTap={{ scale: 0.99 }}
                                        transition={{ duration: 0.2, ease: "easeInOut" }}
                                        id="title"
                                        className="w-[420px] rounded-[45px] h-full bg-[#9678FF] cursor-pointer relative overflow-hidden shadow-lg border-[6px] border-[#876de7] flex flex-col items-center gap-10">
                                            <div className="absolute w-[120%] top-[-65px] left-[-60px] h-[35%]   ">
                                                <Image src="/landingpage/premium.svg" alt="Perguntas Frequentes Vector" className="w-full" width={300} height={500}/>
                                            </div>
                                            <div className="h-[105px] mt-[50%] w-[85%] flex items-end">
                                                <span className="leading-none text-[40px]">R$</span>
                                                <span className="text-[105px] font-medium leading-[85px]">19</span>
                                                <span className="leading-none ">,</span>
                                                <span className="mb-auto text-[35px] font-medium">90</span>
                                                <span className="leading-none text-[40px] -ml-3 ">/mensal</span>
                                            </div>

                                            <div className=" w-[90%] flex items-end ">
                                                <ul className="text-[23px] text-[#000] list-disc pl-3">
                                                    <li>Acesso ilimitado a salas de estudo</li>
                                                    <li>Materiais de estudo sempre disponíveis</li>
                                                    <li>Inteligência Artificial sem limites</li>
                                                    <li>Ambiente 100% livre de anúncios</li>
                                                </ul>
                                            </div>

                                        </motion.div>

                                    </div>
                                </div>
                            </div>  
                        </div>

                        <div className="absolute w-[100%] overflow-hidden bottom-0 z-[-10]">
                            <Image id="aprender" width={300} height={800} src="Vector 2.svg" alt="Banner" className=" w-full"/>
                        </div>

                    </div>

                    <div ref={el => { sectionRefs.current[3] = el; }} id="perguntas-frequentes" className="w-full h-[500px]  flex gap-[150px] ">
                        <div className="w-[45%] h-full relative ">
                            <h1 id="title" className="absolute top-0 right-0 ">Perguntas Frequentes</h1>
                            <Image src="/landingpage/perguntasvec.svg" alt="Perguntas Frequentes Vector" className="w-[735px] " width={300} height={500}/>
                        </div>

                        <div className="w-[45%] flex flex-col  ">
                            {items.map((item, index) => (
                                <motion.div
                                id="perguntas"
                                key={index}
                                whileTap={{ scale: 0.99 }} 
                                whileHover={{ scale: 1.01 }}
                                transition={{ duration: 0.2, ease: "easeInOut" }}
                                className="border w-[550px] max-w-[85%] min-h-[82px] border-[rgba(18,18,18,0.14)] rounded-[20px] mb-4 overflow-hidden shadow-md"
                                >
                                    {/* Header */}
                                    <button
                                        onClick={() => toggle(index)}
                                        className="w-full min-h-[82px] flex justify-between items-center px-6 py-4 text-left text-[20px] font-medium "
                                    >
                                        {item.title}
                                        
                                        <span className={`text-[20px] text-[rgba(151,103,248,1)] transform transition-transform duration-300 flex justify-center items-center rounded-full 
                                        ${
                                            openIndex === index ? "-rotate-90" : ""
                                        }`}
                                        >
                                        <ChevronLeft />
                                        </span>
                                    </button>

                                    {/* Animated Content */}
                                    <AnimatePresence initial={false}>
                                        {openIndex === index && (
                                        <motion.div
                                            key="content"
                                            initial={{ height: 0, opacity: 0, filter: "blur(1px)" }}
                                            animate={{ height: "auto", opacity: 1, filter: "blur(0px)" }}
                                            exit={{ height: 0, opacity: 0, filter: "blur(1px)" }}
                                            transition={{ duration: 0.3, ease: "easeInOut" }}
                                        >
                                            <div className="px-6 pb-4 text-[18px] text-gray-700">
                                            {item.content}
                                            </div>
                                        </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </main>
                    
                <footer className="w-full h-[300px] flex justify-center items-center">
                    <div className="w-[34%] h-[140px] flex justify-center  items-center">
                        <Image width={300} height={500} src="/landingpage/logo1.png" className="h-full w-auto" alt="Logo"/>
                    </div>

                    <div className="w-[33%] flex flex-col justify-center items-center ">

                        <div className=" flex justify-center items-center gap-4 ">
                            <a href="/termos-de-uso">Termos de uso</a>
                            <a href="/politica-de-privacidade">Política de privacidade</a>
                            <a href="">Suporte</a>
                        </div>
                        
                        <div className="w-full flex justify-center items-center gap-4 mt-2">
                            <p>© 2023 ThinkSpace. Todos os direitos reservados.</p>
                        </div>
                    </div>

                    <div className="w-[33%] flex flex-col ">
                        <motion.a 
                        href="https://www.instagram.com/thinkspace__?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                        target="_blank" rel="noopener noreferrer"
                        whileTap={{ scale: 0.98 }} 
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.2, ease: "easeInOut" }}

                        className=" border-[2px] border-[#704FE6] p-3 w-fit rounded-full flex justify-center items-center">
                            <Instagram className="text-[#EFEFEF] size-[40px] z-10 rounded-[15px]"/>
                            <div className="w-[35px] rounded-[10px] h-[35px] bg-[#704FE6] absolute "></div>
                        </motion.a>
                    </div>
                </footer>
            </div>
        </>
    )
};
