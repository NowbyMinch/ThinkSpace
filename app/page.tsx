"use client";

import Image from "next/image";
import React, { useCallback } from 'react'
import { MoveUpRight, ChevronLeft, ChevronRight } from "lucide-react" ;
import useEmblaCarousel from 'embla-carousel-react'

export default function Home() {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' } )

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev()
    }, [emblaApi])

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext()
    }, [emblaApi])

    return (
        <>
            <div className="w-screen z-[0]">
                <header className=" w-[90%] max-w-[1700px] h-[120px] flex justify-between mx-auto ">
                    <button className=" w-full h-full flex items-center ">
                        <Image width={300} height={500} src="/landingpage/logo1.png" className="w-[180px] " alt="Logo"/>
                    </button>
                    <div className=" w-full flex justify-center items-center ">  
                        <div id="links-header" className="flex justify-between gap-2">
                            <a href="">
                            Home
                            </a>
                            <a href="">
                                Sobre nós
                            </a>
                            <a href="">
                                Precificação
                            </a>
                            <a href="">
                                FAQ
                            </a>
                        </div>
                    </div>
                    <div className=" w-full flex justify-end ">
                        <div className="flex items-center gap-8">
                            <button className="text-[20px]">Entrar</button>
                            <div  className="text-[20px] p-[8px_20px] rounded-full border-[2px] h-fit flex gap-4 items-center justify-center border-[rgba(18,18,18,0.24)] transition-all ease-in-out duration-300 cursor-pointer hover:border-[#866ABF]">
                                Registre-se
                                <button className="bg-[#A39CEC] p-3 rounded-full"> <MoveUpRight className="text-white size-5"/> </button>
                            </div>
                        </div>

                    </div>
                </header>
                
                <main className="flex justify-center items-center flex-col pb-[500px] gap-[150px] ">
                    <div className="w-full relative flex justify-center h-fit ">
                        <div className="w-full h-full z-[-10] ">
                            <Image width={300} height={500} src="/landingpage/background.svg" alt="Banner" className="w-full mt-[-28px]"/>
                        </div>

                        <div className="w-[1570px] h-[88%] flex max-w-[80%] absolute ">
                            <div className="flex max-w-[50%]">
                                <div className="w-[600px] h-[80%] text-[70px] flex flex-col gap-4 justify-center items-start ">  

                                    <h1 className="overflow-ellipsis line-clamp-3 break-words w-full text-white">Estude de maneira mais <span id="conf" className=" text-[#FF92EE]">rápida</span> e <span id="conf" className=" text-[#5F3AC4]">eficiente</span></h1>
                                    <p className="text-[25px] text-white line-clamp-1 break-words">O jeito inteligente de aprender mais em menos tempo.</p>

                                    <div className="w-[255px] max-w-[43%] text-white text-[20px] p-[8px_20px] rounded-full border-[2px] h-fit flex gap-4 items-center justify-center border-[rgba(18,18,18,0.24)] transition-all ease-in-out duration-300 cursor-pointer hover:border-[#866ABF] bg-[#BF9FFF] ">
                                        <span className="line-clamp-2 break-words">Comece a estudar</span>
                                        <button className="bg-white p-3 rounded-full "> <MoveUpRight className="text-[#A39CEC] size-5"/> </button>
                                    </div>
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
                    
                    <div className="w-[1300px] max-w-[80%] flex flex-row justify-center ">
                        <div className="w-[50%] flex flex-col gap-12">
                            <h1 id="title" className="w-full">Aprender nunca foi tão fácil
                                <Image width={300} height={500} className="absolute top-0 left-[-38px] w-[40%]" src="/landingpage/aprendervec.svg" alt="Vector"/>
                            </h1>
                            <p id="animate" className="text-[22px]">Nossa missão é simples: tornar o estudo mais inteligente, acessível e personalizado para todos os estudantes, em qualquer fase da vida.
                                Na ThinkSpace, criamos planos de estudo estratégicos, pensados para economizar tempo, reduzir o estresse e ajudar cada pessoa a alcançar seus objetivos com mais foco e confiança.
                                Acreditamos que aprender não precisa ser complicado — e com o plano certo, tudo flui melhor.
                            </p>
                            <div className="w-[255px] max-w-[43%] text-[#704FE6] text-[20px] p-[8px_20px] rounded-full border h-fit flex gap-4 items-center justify-center border-[#704FE6] transition-all ease-in-out duration-300 cursor-pointer  ">
                                <span className="line-clamp-2 break-words">Comece a estudar</span>
                                <button className="bg-[#704FE6] p-3 rounded-full "> <MoveUpRight className="text-white size-5"/> </button>
                            </div>
                        </div>

                        <div id="animate" className=" w-[50%] flex flex-col ">
                            <div className="h-[570px] flex justify-end relative ">
                                <Image id="animate" width={300} height={800} src="/landingpage/aprendervec1.svg" alt="Banner" className="absolute top-0 w-[45%] "/>
                                <Image id="animate" width={300} height={800} src="/landingpage/aprendervec2.svg" alt="Banner" className="absolute top-[25%] w-[75%] "/>
                                <Image id="animate" width={300} height={800} src="/landingpage/aprendervec3.svg" alt="Banner" className="absolute bottom-0 w-[80%] "/>
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

                                                <div className="embla__slide flex flex-col gap-2 ">
                                                    <Image src="/landingpage/materiais-img1.svg" className="max-h-[200px]" width={300} height={500} alt="Alt"/>
                                                    <h1 className=" h-[70px] text-white text-[35px] leading-8 text-center">Estudantes universitários</h1>
                                                    <h2 className="text-white text-center text-[20px]">Professora de Ciências</h2>
                                                </div>
                                                <div className="embla__slide flex flex-col gap-2 ">
                                                    <Image src="/landingpage/materiais-img2.svg" className="max-h-[200px]" width={300} height={500} alt="Alt"/>
                                                    <h1 className=" h-[70px] text-white text-[35px] leading-8 text-center">Estudantes universitários</h1>
                                                    <h2 className="text-white text-center text-[20px]">Professora de Ciências</h2>
                                                </div>
                                                <div className="embla__slide flex flex-col gap-2 ">
                                                    <Image src="/landingpage/materiais-img3.svg" className="max-h-[200px]" width={300} height={500} alt="Alt"/>
                                                    <h1 className=" h-[70px] text-white text-[35px] leading-8 text-center">Estudantes universitários</h1>
                                                    <h2 className="text-white text-center text-[20px]">Professora de Ciências</h2>
                                                </div>
                                                <div className="embla__slide flex flex-col gap-2 ">
                                                    <Image src="/landingpage/materiais-img4.svg" className="max-h-[200px]" width={300} height={500} alt="Alt"/>
                                                    <h1 className=" h-[70px] text-white text-[35px] leading-8 text-center">Estudantes universitários</h1>
                                                    <h2 className="text-white text-center text-[20px]">Professora de Ciências</h2>
                                                </div>
                                                <div className="embla__slide flex flex-col gap-2 ">
                                                    <Image src="/landingpage/materiais-img1.svg" className="max-h-[200px]" width={300} height={500} alt="Alt"/>
                                                    <h1 className=" h-[70px] text-white text-[35px] leading-8 text-center">Estudantes universitários</h1>
                                                    <h2 className="text-white text-center text-[20px]">Professora de Ciências</h2>
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

                    <div className="w-full h-[500px] ">
                        <div className="w-[45%] h-full relative ">
                            <h1 id="title" className="absolute top-0 right-0 ">Perguntas Frequentes</h1>
                            <Image src="/landingpage/perguntasvec.svg" alt="Perguntas Frequentes Vector" className="w-[735px] " width={300} height={500}/>
                        </div>

                        <div className="">
                            
                        </div>
                    </div>
                </main>
                    
                <footer></footer>
            </div>
        </>
    )
};
