import Image from "next/image"
import { MoveUpRight } from "lucide-react"


export default function Home() {
    return (
        <>
            <div className="w-screen h-screen ">
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
                            <div className="text-[20px] p-[8px_20px] rounded-full border-[2px] h-fit flex gap-4 items-center justify-center border-[rgba(18,18,18,0.24)] transition-all ease-in-out duration-300 cursor-pointer hover:border-[#A39CEC]">
                                Registre-se
                                <button className="bg-[#A39CEC] p-3 rounded-full"> <MoveUpRight className="text-white size-5"/> </button>
                            </div>
                        </div>

                    </div>
                </header>
                
                <main className="flex justify-center items-center flex-col gap-14 pb-[500px]">
                    <div className="w-full relative flex justify-center items-center ">
                        <div className="w-full h-full z-[-10] ">
                            <Image width={300} height={500} src="/landingpage/background.svg" alt="Banner" className="w-full  "/>
                        </div>

                        <div className="w-[1570px] h-full flex max-w-[80%] absolute">
                            <div className="flex max-w-[50%]">
                                <div className="w-[600px] h-[80%] text-[70px] flex flex-col gap-4 justify-center items-start">  

                                    <h1 className="overflow-ellipsis line-clamp-3 break-words w-full text-white">Estude de maneira mais <span id="conf" className=" text-[#FF92EE]">rápida</span> e <span id="conf" className=" text-[#5F3AC4]">eficiente</span></h1>
                                    <p className="text-[25px] text-white">O jeito inteligente de aprender mais em menos tempo.</p>

                                    <div className="w-[280px] text-white text-[20px] p-[8px_20px] rounded-full border-[2px] h-fit flex gap-4 items-center justify-center border-[rgba(18,18,18,0.24)] transition-all ease-in-out duration-300 cursor-pointer hover:border-[#A39CEC] bg-[#BF9FFF]">
                                        Comece a estudar
                                        <button className="bg-white p-3 rounded-full"> <MoveUpRight className="text-[#A39CEC] size-5"/> </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="w-[1300px] max-w-[80%] flex flex-col justify-center items-center gap-7">   
                        <h1 className="w-full text-[55px] flex justify-between items-center">Nossas funcionalidades
                            <Image width={500} height={300} src="/landingpage/func-vector.svg" alt="Vector" className="w-[350px]"/>
                        </h1>

                        <div className="grid grid-rows-[1fr_46%] w-[78%] h-[720px] gap-6">
                            <div className="grid grid-cols-3 gap-5">
                                <div className="bg-[#B697F5] rounded-[45px] relative overflow-hidden flex flex-col justify-end items-center">
                                    <Image width={300} height={500} src="/landingpage/func1.svg" alt="Funcionalidade 1" className="absolute top-0 right-0 w-[90%] "/>
                                    <div className="h-[60%] w-[80%] flex flex-col ">
                                        <h1 className="text-[40px] font-bold line-clamp-1 break-words ">Quizzes</h1>
                                        <p className="text-[18px] break-words line-clamp-5">Descubra quizzes feitos pela comunidade ou crie os seus próprios para testar conhecimentos e compartilhar com outras pessoas.</p>
                                    </div>
                                </div>
                                <div className="bg-[#FFB0F3] rounded-[45px] relative overflow-hidden flex flex-col justify-end items-center">
                                    <Image width={300} height={500} src="/landingpage/func2.svg" alt="Funcionalidade 2" className="absolute top-0 right-0 w-[90%] "/>
                                    <div className="h-[60%] w-[80%] flex flex-col ">
                                        <h1 className="text-[40px] font-bold line-clamp-1 break-words ">Comunidade </h1>
                                        <p className="text-[18px] break-words line-clamp-5">Uma comunidade aberta para trocar ideias, compartilhar conteúdos e se conectar com pessoas que compartilham seus interesses.</p>
                                    </div>
                                </div>
                                <div className="bg-[#9678FF] rounded-[45px] relative overflow-hidden flex flex-col justify-end items-center">
                                    <Image width={300} height={500} src="/landingpage/func3.svg" alt="Funcionalidade 3" className="absolute top-0 right-0 w-[90%] "/>
                                    <div className="h-[60%] w-[80%] flex flex-col ">
                                        <h1 className="text-[40px] font-bold line-clamp-1 break-words ">Materiais</h1>
                                        <p className="text-[18px] break-words line-clamp-5">Geração automática de materiais de estudo com IA, a partir de documentos enviados ou tópicos personalizados.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-[1fr_1fr] gap-6">
                                <div className="bg-[#A67EF6] rounded-[45px] relative overflow-hidden flex flex-col justify-end items-center">
                                    <Image width={300} height={500} src="/landingpage/func4.svg" alt="Funcionalidade 4" className="absolute top-[-15px] right-[0] w-[85%] "/>
                                    <div className="h-[59%] w-[80%] flex flex-col ">
                                        <h1 className="text-[40px] font-bold line-clamp-1 break-words ">Métricas</h1>
                                        <p className="text-[18px] break-words w-[75%] line-clamp-4">Acompanhe seu progresso, visualize suas conquistas e descubra insights que ajudam você a aprender melhor a cada dia.</p>
                                    </div>
                                </div>                                
                                <div className="bg-[#FF80EB] rounded-[45px] relative overflow-hidden flex flex-col justify-end items-center">
                                    <Image width={300} height={500} src="/landingpage/func5.svg" alt="Funcionalidade 5" className="absolute top-[-15px] right-[-75px] w-full "/>
                                    <div className="h-[62%] w-[80%] flex flex-col ">
                                        <h1 className="text-[40px] font-bold line-clamp-1 break-words ">Calendário</h1>
                                        <p className="text-[18px] break-words w-[70%] line-clamp-4">Organize sua rotina, planeje seus estudos e nunca perca um prazo com um calendário feito para acompanhar seu ritmo.</p>
                                    </div>
                                </div>                                
                            </div>
                        </div>
                    </div>

                </main>
                    
                <footer></footer>
            </div>
        </>
    )
};