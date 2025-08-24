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
      "ThinkSpace centraliza materiais de estudo, gera conteúdos automaticamente, conecta uma comunidade global e personaliza o aprendizado para cada aluno, tornando a experiência prática e interativa.",
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

export default function landingPage() {
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
            } else {
                // Scrolling up
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
            <div className=" z-[0] relative overflow-x-hidden p-0 m-0">
                <header id="header" className={`${showHeader ? 'translate-y-0' : '-translate-y-full'} transition-all ease-in-out duration-300 z-[1100] shadow-md fixed top-0 bg-white w-[100%] h-[100px] flex justify-center align items-center`}>
                    <div className="flex max-w-[95%] w-[1700px] max-h-[100px] h-max justify-between ">
                        <div className=" w-full h-full flex items-center ">
                            <a className="cursor-pointer ">
                                <Image width={300} height={500} src="/landingpage/logo1.png" className="w-[125px] " alt="Logo"/>
                            </a>
                        </div>

                        <div className="lg:flex w-full hidden justify-center items-center ">  
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
                                
                                className="cursor-pointer leading-none text-center text-nowrap" onClick={() => scrollToSection(1)} >
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
                            <div className="flex items-center gap-2 ">
                                <Link href="/login" className=" transition-all ease-in-out hover:text-[#A78CDC]">
                                    <button className="text-[18px] ">Entrar</button>
                                </Link>

                                <Link href="/registrar" className="">
                                    <motion.button 
                                    whileTap={{ scale: 0.99 }} 
                                    whileHover={{ scale: 1.01 }}
                                    transition={{ duration: 0.2, ease: "easeInOut" }}
                                    className="text-[18px] p-[5px_10px] leading-none text-nowrap rounded-full border-[2px] h-fit flex gap-4 items-center justify-center border-[rgba(18,18,18,0.24)] cursor-pointer hover:border-[#A78CDC]">
                                        Registre-se
                                        <div className="bg-[#A39CEC] p-2 rounded-full"> <MoveUpRight className="text-white size-5"/> </div>
                                    </motion.button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </header>
                
                <div className={`${showHeader ? 'translate-y-0' : '-translate-y-full'} w-[100%] h-[100px] `} ></div>

                <main className="flex justify-center items-center flex-col gap-[80px] md:gap-[150px] overflow-hidden ">
                    <div className="w-full relative flex justify-center items-center">
                        <div className="w-full object-center flex justify-center items-center overflow-hidden ">
                            <img src="/landingpage/background.png" className=" min-w-[800px] md:-mt-10 lg:-mt-16 xl:-mt-20 2xl:-mt-28 w-full"/>
                        </div>

                        <div className="absolute flex justify-center h-[85%] w-[90%] ">
                            <div className="back_title w-[580px] max-w-[80%] ml-[7%] mr-auto text-[70px] h-fit flex flex-col justify-center items-start ">  
                                <h1 className="title overflow-ellipsis  line-clamp-4 break-words w-full text-[40px] text-white leading-none">Estude de maneira mais <span id="conf" className="title text-[#FF92EE] text-[40px]">rápida</span> e <span id="conf" className="title text-[#5F3AC4] text-[40px] ">eficiente</span></h1>
                                <p className="jeito text-[18px] text-white break-words w-full">O jeito inteligente de aprender mais em menos tempo.</p>

                                <motion.button 
                                whileTap={{ scale: 0.98 }} 
                                whileHover={{ scale: 1.02 }}
                                transition={{ duration: 0.2, ease: "easeInOut" }}
                                className=" text-white text-[18px] p-[10px_10px] rounded-full flex gap-2 items-center justify-center cursor-pointer 
                                bg-[#BF9FFF] ">
                                    <span className="comece line-clamp-2 break-words ">Comece a estudar</span>
                                    <div className="bg-white p-2 rounded-full "> <MoveUpRight className="text-[#A39CEC] size-3"/> </div>
                                </motion.button>
                            </div>

                        </div>

                    </div>

                    <div className="w-[1300px] max-w-[90%] flex flex-col justify-center items-center gap-7 -mt-[150px]">   
                        <div className="w-full text-[55px] flex justify-between items-center">
                            <h1 id="title">Nossas funcionalidades</h1>
                            <Image id="func-vector" width={500} height={300} src="/landingpage/func-vector.svg" alt="Vector" className="w-[350px]"/>
                        </div>

                        <div className="flex flex-col w-full md:h-[740px] gap-5">
                            <div className="h-full flex md:flex-row flex-col gap-5">
                                <div id="func-boxes" className="w-full md:w-[33%] bg-[#B697F5] h-[200px] md:h-full shadow-md rounded-[45px] relative overflow-hidden flex flex-col justify-center md:justify-end items-center">
                                    <Image width={300} height={500} src="/landingpage/func1.svg" alt="Funcionalidade 1" className="absolute md:top-0 -bottom-16 hidden right-0 md:flex w-[100%] md:w-[85%] lg:w-[75%] "/>
                                    <div className=" w-[90%] md:w-[80%] md:min-h-[50%] flex flex-col z-10 md:mb-5">
                                        <h1 className="text-[25px] font-bold line-clamp-1 break-words ">Quizzes</h1>
                                        <p className="text-[18px] break-words ">Descubra quizzes feitos pela comunidade ou crie os seus próprios para testar conhecimentos e compartilhar com outras pessoas.</p>
                                    </div>
                                </div>
                                <div id="func-boxes" className="w-full md:w-[33%] bg-[#FFB0F3] h-[200px] md:h-full shadow-md rounded-[45px] relative overflow-hidden flex flex-col justify-center md:justify-end items-center">
                                    <Image width={300} height={500} src="/landingpage/func2.svg" alt="Funcionalidade 2" className="absolute md:top-0 -bottom-16 hidden right-0 md:flex w-[100%] md:w-[85%] lg:w-[75%] "/>
                                    <div className=" w-[90%] md:w-[80%] md:min-h-[50%] flex flex-col z-10 md:mb-5">
                                        <h1 className="text-[25px] font-bold line-clamp-1 break-words ">Comunidade </h1>
                                        <p className="text-[18px] break-words ">Uma comunidade aberta para trocar ideias, compartilhar conteúdos e se conectar com pessoas que compartilham seus interesses.</p>
                                    </div>
                                </div>
                                <div id="func-boxes" className="w-full md:w-[33%] bg-[#9678FF] h-[200px] md:h-full shadow-md rounded-[45px] relative overflow-hidden flex flex-col justify-center md:justify-end items-center">
                                    <Image width={300} height={500} src="/landingpage/func3.svg" alt="Funcionalidade 3" className="absolute md:top-4 -bottom-16 hidden right-0 md:flex w-[100%] md:w-[85%] lg:w-[75%] "/>
                                    <div className=" w-[90%] md:w-[80%] md:min-h-[50%] flex flex-col z-10 md:mb-5">
                                        <h1 className="text-[25px] font-bold line-clamp-1 break-words ">Materiais</h1>
                                        <p className="text-[18px] break-words ">Geração automática de materiais de estudo com IA, a partir de documentos enviados ou tópicos personalizados.</p>
                                    </div>
                                </div>
                            </div>

                            <div className="min-h-[46%] flex gap-5 flex-col md:flex-row">
                                <div id="func-boxes" className="bg-[#A67EF6] shadow-md h-[200px] md:h-full rounded-[45px] relative overflow-hidden flex flex-col justify-center md:justify-end items-center">
                                    <Image width={300} height={500} src="/landingpage/func4.svg" alt="Funcionalidade 4" className="absolute md:flex hidden top-[-15px] right-[0] w-[90%] md:w-[85%] lg:w-[75%]"/>
                                    <div className=" w-[90%] md:w-[80%] md:min-h-[50%] flex flex-col md:mb-5 ">
                                        <h1 className="text-[25px] font-bold line-clamp-1 break-words ">Métricas</h1>
                                        <p className="text-[18px] break-words ">Acompanhe seu progresso, visualize suas conquistas e descubra insights que ajudam você a aprender melhor a cada dia.</p>
                                    </div>
                                </div>    
                                <div id="func-boxes" className="bg-[#FF80EB] shadow-md h-[200px] md:h-full rounded-[45px] relative overflow-hidden flex flex-col justify-center md:justify-end items-center">
                                    <Image width={300} height={500} src="/landingpage/func5.svg" alt="Funcionalidade 5" className="absolute md:flex hidden top-[-15px] right-[0] w-[90%] md:w-[85%] lg:w-[75%] "/>
                                    <div className=" w-[90%] md:w-[80%] md:min-h-[50%] flex flex-col md:mb-5 ">
                                        <h1 className="text-[25px] font-bold line-clamp-1 break-words ">Calendário</h1>
                                        <p className="text-[18px] break-words ">Organize sua rotina, planeje seus estudos e nunca perca um prazo com um calendário feito para acompanhar seu ritmo.</p>
                                    </div>
                                </div>                               
                            </div>
                        </div>
                    </div>
                    
                    <div ref={el => { sectionRefs.current[1] = el; }} className="w-[1300px] sm:h-[550px] sm:gap-0 gap-4 max-w-[90%] flex flex-col sm:flex-row justify-center ">
                        <div className="w-full flex flex-col gap-10 ">
                            <h1 id="title" className="w-full ">Aprender nunca foi tão fácil
                                <Image width={300} height={500} className="absolute top-0 left-[-38px] w-[30%] -z-10" src="/landingpage/aprendervec.svg" alt="Vector"/>
                            </h1>
                            <p id="animate" className="text-[18px]">Nossa missão é simples: tornar o estudo mais inteligente, acessível e personalizado para todos os estudantes, em qualquer fase da vida.
                                Na ThinkSpace, criamos planos de estudo estratégicos, pensados para economizar tempo, reduzir o estresse e ajudar cada pessoa a alcançar seus objetivos com mais foco e confiança.
                                Acreditamos que aprender não precisa ser complicado — e com o plano certo, tudo flui melhor.
                            </p>
                            <motion.button 
                            whileTap={{ scale: 0.98 }} 
                            whileHover={{ scale: 1.02 }}
                            transition={{ duration: 0.2, ease: "easeInOut" }}
                            className=" text-[#704FE6] text-[18px] w-fit p-[8px_20px] rounded-full border h-fit flex gap-4 items-center justify-center border-[#704FE6] cursor-pointer  ">
                                <span className="line-clamp-2 break-words">Comece a estudar</span>
                                <div className="bg-[#704FE6] p-3 rounded-full "> <MoveUpRight className="text-white size-5"/> </div>
                            </motion.button>
                        </div>

                        <div id="animate" className=" w-full sm:h-full flex h-[370px] justify-center">
                            <img src="/landingpage/facil.svg" alt="Banner" className=" h-full "/>
                        </div>

                    </div>

                    <div className="w-full h-[850px] bg-[#9767F8] flex flex-col justify-center items-center ">
                        <div className="w-[1300px] h-[80%] max-w-[95%]  relative flex flex-col items-center ">
                            <Image width={300} height={800} src="/landingpage/materiaisvec.svg" alt="Banner" className="absolute w-full top-0"/>
                            
                            <div className="flex flex-col items-center gap-[100px] w-full h-full ">
                                <h1 id="animate" className="text-white text-center text-[30px] w-[750px] max-w-full h-fit">Nossos materiais tornam o aprendizado divertido e acessível para estudantes de todas as idades.</h1>
                                
                                <div className="flex w-full h-full gap-2 justify-center items-center">

                                    <button className="embla__prev h-min" onClick={scrollPrev}>
                                        <ChevronLeft className="bg-[rgba(255,255,255,0.10)] size-12 p-2 rounded-full text-white"/>
                                    </button>

                                    <div className="embla">
                                        <div className="embla__viewport " ref={emblaRef}>
                                            <div className="embla__container ">

                                                <div className="embla__slide flex flex-col gap-3 items-center  ">
                                                    <Image src="/landingpage/materiais-img1.svg" className="max-h-[200px]" width={300} height={500} alt="Alt"/>
                                                    <h1 className=" h-[60px] text-white text-[25px] leading-8 max-w-[230px] text-center flex justify-center   break-words">Professora de Ciências</h1>
                                                    <h2 className="embla_text text-white max-w-[230px] text-center text-[18px] break-words">Ajuda pré-universitários a explorarem o mundo com curiosidade e foco no vestibular.</h2>
                                                </div>
                                                <div className="embla__slide flex flex-col gap-3 items-center ">
                                                    <Image src="/landingpage/materiais-img2.svg" className="max-h-[200px]" width={300} height={500} alt="Alt"/>
                                                    <h1 className=" h-[60px] text-white text-[25px] leading-8 max-w-[230px] text-center flex justify-center ">Mentora de Artes</h1>
                                                    <h2 className="embla_text text-white max-w-[230px] text-center text-[18px]">Inspira estudantes a desenvolverem a criatividade através do desenho e expressão visual.</h2>
                                                </div>
                                                <div className="embla__slide flex flex-col gap-3 items-center ">
                                                    <Image src="/landingpage/materiais-img3.svg" className="max-h-[200px]" width={300} height={500} alt="Alt"/>
                                                    <h1 className=" h-[60px] text-white text-[25px] leading-8 max-w-[230px] text-center flex justify-center ">Professor de Matemática</h1>
                                                    <h2 className="embla_text text-white max-w-[230px] text-center text-[18px]">Ensina com entusiasmo, conectando o raciocínio lógico ao dia a dia universitário.</h2>
                                                </div>
                                                <div className="embla__slide flex flex-col gap-3 items-center ">
                                                    <Image src="/landingpage/materiais-img4.svg" className="max-h-[200px]" width={300} height={500} alt="Alt"/>
                                                    <h1 className=" h-[60px] text-white text-[25px] leading-8 max-w-[230px] text-center flex justify-center ">Estudante amante de leitura</h1>
                                                    <h2 className="embla_text text-white max-w-[230px] text-center text-[18px]">Descobre novos mundos através dos livros e compartilha conhecimento com alegria.</h2>
                                                </div>
                                                <div className="embla__slide flex flex-col gap-3 items-center ">
                                                    <Image src="/landingpage/materiais-img5.svg" className=" max-h-[200px]" width={300} height={500} alt="Alt"/>
                                                    <h1 className=" h-[60px] text-white text-[25px] leading-8 max-w-[230px] text-center flex justify-center ">Estudante programadora autodidata</h1>
                                                    <h2 className="embla_text text-white max-w-[230px] text-center text-[18px]">Aprende por conta própria sobre programação e inovação, com sede de descobertas.</h2>
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

                    <div className="w-full pb-20 flex justify-center relative">
                        <div ref={el => { sectionRefs.current[2] = el; }} className="w-[1300px] max-w-[90%] flex flex-row justify-center">
                            <div className="w-full flex flex-col gap-12 relative ">
                                <h1 id="title" className="preco w-full">Nossos planos</h1>
                                <div className="flex justify-between flex-col md:flex-row md:gap-0 gap-6 items-center relative preco_box ">
                                    <motion.div
                                    whileHover={{ scale: 1.01 }}
                                    whileTap={{ scale: 0.99 }}
                                    transition={{ duration: 0.2, ease: "easeInOut" }}
                                    id="title"
                                    className="box w-full md:w-[32%] rounded-[45px] min-h-[200px] md:h-full bg-[#B697F5] cursor-pointer relative overflow-hidden shadow-lg border-[6px] pb-4 border-[#a98ee4] flex flex-row md:flex-col justify-center gap-[5%] md:justify-end items-center ">
                                        <div className="absolute preco_img top-[-65px] left-[-60px] h-[35%] -z-10">
                                            <Image src="/landingpage/gratis.svg" alt="Perguntas Frequentes Vector" className="w-full" width={300} height={500}/>
                                        </div>

                                        <div className=" w-fit max-w-[90%] flex justify-end items-end min-h-fit md:h-[20%] ">
                                            <span className="leading-none valor">R$</span>
                                            <span className="text-[105px] font-medium leading-[80px] valoR">00</span>
                                            <span className="leading-none valor">,</span>
                                            <span className="mb-auto font-medium valor">00</span>
                                            <span className="leading-none -ml-3 valor">/mensal</span>
                                        </div>

                                        <div className=" w-fit md:w-[85%] flex min-h-fit md:h-[40%]">
                                            <ul className="ul_preco text-[18px] flex flex-col text-[#000] list-disc pl-3">
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
                                    className="box w-full md:w-[32%] rounded-[45px] min-h-[200px] md:h-full bg-[#FFB0F3] cursor-pointer relative overflow-hidden shadow-lg border-[6px] pb-4 border-[#e59eda] flex flex-row md:flex-col justify-center gap-[5%] md:justify-end items-center ">
                                        <div className="absolute preco_img top-[-65px] left-[-55px] h-[35%] -z-10">
                                            <Image src="/landingpage/basico.svg" alt="Perguntas Frequentes Vector" className="w-full" width={300} height={500}/>
                                        </div>

                                        <div className=" w-fit max-w-[90%] flex justify-end items-end min-h-fit md:h-[20%] ">
                                            <span className="leading-none valor">R$</span>
                                            <span className="text-[105px] font-medium leading-[80px] valoR">12</span>
                                            <span className="leading-none valor">,</span>
                                            <span className="mb-auto font-medium valor">90</span>
                                            <span className="leading-none -ml-3 valor">/mensal</span>
                                        </div>

                                        <div className=" w-fit md:w-[85%] flex min-h-fit md:h-[40%]">
                                            <ul className="ul_preco text-[18px] flex flex-col text-[#000] list-disc pl-3">
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
                                    className="box w-full md:w-[32%] rounded-[45px] min-h-[200px] md:h-full bg-[#876de7] cursor-pointer relative overflow-hidden shadow-lg border-[6px] pb-4 border-[#876de7] flex flex-row md:flex-col justify-center gap-[5%] md:justify-end items-center ">
                                        <div className="absolute preco_img top-[-65px] left-[-55px] h-[35%] -z-10">
                                            <Image src="/landingpage/premium.svg" alt="Perguntas Frequentes Vector" className="w-full" width={300} height={500}/>
                                        </div>

                                        <div className=" w-fit max-w-[90%] flex justify-end items-end min-h-fit md:h-[20%] ">
                                            <span className="leading-none valor">R$</span>
                                            <span className="text-[105px] font-medium leading-[80px] valoR">19</span>
                                            <span className="leading-none valor">,</span>
                                            <span className="mb-auto font-medium valor">90</span>
                                            <span className="leading-none -ml-3 valor">/mensal</span>
                                        </div>

                                        <div className=" w-fit md:w-[85%] flex min-h-fit md:h-[40%]">
                                            <ul className="ul_preco text-[18px] flex flex-col text-[#000] list-disc pl-3">
                                                <li className="max-w-[242px]">Acesso ilimitado a salas de estudo</li>
                                                <li className="max-w-[242px]">Materiais de estudo sempre disponíveis</li>
                                                <li className="max-w-[242px]">Inteligência Artificial sem limites</li>
                                                <li className="max-w-[242px]">Ambiente 100% livre de anúncios</li>
                                            </ul>
                                        </div>

                                        {/* className="box w-full md:w-[32%] rounded-[45px] min-h-[200px] md:h-full bg-[#9678FF] cursor-pointer relative overflow-hidden shadow-lg border-[6px] pb-4 border-[#876de7] flex flex-row md:flex-col justify-center gap-[5%] md:justify-end items-center ">
                                        <div className="absolute preco_img top-[-72px] left-[-53px] h-[35%] -z-10">
                                            <Image src="/landingpage/premium.svg" alt="Perguntas Frequentes Vector" className="w-full" width={300} height={500}/>
                                        </div>

                                        <div className=" w-fit max-w-[90%] flex justify-end items-end min-h-fit md:h-[20%] ">
                                            <span className="leading-none valor">R$</span>
                                            <span className="text-[105px] font-medium leading-[80px] valoR">19</span>
                                            <span className="leading-none valor">,</span>
                                            <span className="mb-auto font-medium valor">90</span>
                                            <span className="leading-none -ml-3 valor">/mensal</span>
                                        </div>

                                        <div className=" w-fit md:w-[85%] flex min-h-fit md:h-[40%]">
                                            <ul className="ul_preco text-[18px] flex flex-col text-[#000] list-disc pl-3">
                                                <li>Acesso ilimitado a salas de estudo</li>
                                                <li>Materiais de estudo sempre disponíveis</li>
                                                <li>Inteligência Artificial sem limites</li>
                                                <li>Ambiente 100% livre de anúncios</li>
                                            </ul>
                                        </div> */}
                                    </motion.div>
                                    

                                    {/* 
                                    <motion.div
                                    whileHover={{ scale: 1.01 }}
                                    whileTap={{ scale: 0.99 }}
                                    transition={{ duration: 0.2, ease: "easeInOut" }}
                                    id="title"
                                    className="w-full md:w-[32%] rounded-[45px] h-[32%] md:h-full bg-[#9678FF] cursor-pointer relative overflow-hidden shadow-lg border-[6px] border-[#876de7] flex flex-col items-center gap-10">
                                        <div className="absolute w-[120%] top-[-65px] left-[-60px] h-[35%] -z-10">
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
                                            <ul className="text-[18px] text-[#000] list-disc pl-3">
                                                <li>Acesso ilimitado a salas de estudo</li>
                                                <li>Materiais de estudo sempre disponíveis</li>
                                                <li>Inteligência Artificial sem limites</li>
                                                <li>Ambiente 100% livre de anúncios</li>
                                            </ul>
                                        </div>

                                    </motion.div> */}

                                </div>
                            </div>
                        </div>  
                        {/* <div className="w-[1500px] flex justify-center items-center ">
                        </div> */}

                        <div className="absolute w-[100%] overflow-hidden bottom-0 z-[-10]">
                            <Image id="aprender" width={300} height={800} src="Vector 2.svg" alt="Banner" className=" w-full"/>
                        </div>

                    </div>

                    <div ref={el => { sectionRefs.current[3] = el; }} id="perguntas-frequentes" className="w-full h-[635px] flex gap-[150px] relative">
                        <div className="w-full h-full absolute ">
                            <img src="/landingpage/perguntasvec.svg" alt="Perguntas Frequentes Vector" className="w-[800px] -z-100" />
                        </div>

                        <div className=" w-[1100px] max-w-[90%] mx-auto flex items-center flex-col gap-5 ">
                            <h1 id="title" className="">Perguntas Frequentes</h1>
                            {items.map((item, index) => (
                                <motion.div
                                id="perguntas"
                                key={index}
                                whileTap={{ scale: 0.99 }} 
                                whileHover={{ scale: 1.01 }}
                                transition={{ duration: 0.2, ease: "easeInOut" }}
                                className="border w-[550px] max-w-full min-h-[82px] border-[rgba(18,18,18,0.14)] bg-white rounded-[20px] mb-4 overflow-hidden shadow-md"
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
                    

                <footer className={`w-[1300px] max-w-full h-[200px] flex justify-center items-center mx-auto `}>
                    <div className="flex w-full h-full relative justify-center">
                        <div className=" w-fit h-full flex items-center absolute left-2 ">
                            <a className="cursor-pointer hidden md:flex">
                                <Image width={300} height={500} src="/landingpage/logo1.png" className="w-[125px] " alt="Logo"/>
                            </a>
                        </div>
                        
                        <div className=" w-fit flex overflow-hidden gap-2">
                            <div className="flex flex-col justify-center items-center ">
                                <div className=" flex justify-center items-center gap-4 ">
                                    <a href="/termos-de-uso">Termos de uso</a>
                                    <a href="/politica-de-privacidade">Política de privacidade</a>
                                    <a href="">Suporte</a>
                                </div>
                                
                                <div className="w-full flex justify-center items-center gap-4 mt-2">
                                    <p>© 2023 ThinkSpace. Todos os direitos reservados.</p>
                                </div>
                            </div>

                            <div className=" flex justify-center items-center">
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
                            
                        </div>
                    </div>
                </footer>

                {/* <footer className="w-full h-[300px] flex justify-center items-center">
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
                </footer> */}
            </div>
        </>
    )
};
