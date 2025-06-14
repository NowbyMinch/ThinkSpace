"use client";

import { motion } from "framer-motion"
import Image from "next/image"
import { useEffect, useState } from "react";
import Link from "next/link";
import { Instagram, MoveUpRight } from "lucide-react";

export default function PoliticaDePrivacidade() {
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

    return (
        <>
            <div className="w-screen h-screen relative flex flex-col items-center bg-white ">
                <div className="h-[120px] w-full ">
                    <header id="header" className={`${showHeader ? 'translate-y-0' : '-translate-y-full'} transition-all ease-in-out duration-300 z-[1100] shadow-md fixed top-0 bg-white w-[100%] h-[120px] flex justify-center`}>
                        <div className="flex w-[90%] max-w-[1700px] h-[120px] justify-between">
                            <div className=" w-full h-full flex items-center ">
                                <Link href="/" className="cursor-pointer ">
                                    <Image width={300} height={500} src="/landingpage/logo1.png" className="w-[180px] " alt="Logo"/>
                                </Link>
                            </div>
                            <div className=" w-full flex justify-center items-center ">  
                                
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
                    <header id="header" className={` bg-white w-[100%] h-[120px] `}>
                    </header>
                </div>
                
                <div className="w-full flex flex-col items-center gap-8 mb-8">
                    <div className="w-[100%] h-[120px] py-4 bg-[#9767F8] mx-auto flex justify-center items-center shadow-md">
                        <h1 className="text-[60px] w-max text-white">Política de Privacidade</h1>
                    </div>

                    <div className="w-[1000px] max-w-[80%] h-full mb-5">
                        <h1 className="text-[35px]">INFORMAÇÕES GERAIS</h1>
                        <div className="flex flex-col gap-2 mt-4 mb-10">
                            <p className="text-[20px]">Nesta política de privacidade será informado a maneira que ocorre o tratamento dos dados pessoais das pessoas que acessam o site ThinkSpace informando assim, de forma transparente quais são os dados, qual o intuito da coleta e a maneira que os visitantes podem controlar ou deletar suas informações.Este texto foi criado de acordo com a lei de Proteção de Dados Pessoais (Lei /18), o Marco Civil da Internet (Lei 12.965 /14) e também o Regulamento da UE n. 2016/6790. Vale ressaltar que, este texto poderá sofrer alterações por conta de eventuais atualizações normativas.Informamos que toda e qualquer informação pessoal coletada por nosso website ThinkSpace será utilizada para melhorar a sua experiência ao navegar em nosso website, visando desta maneira que sua visita se torne mais vantajosa e assertiva.</p>

                            <p className="text-[20px]">
                            A confidencialidade das informações pessoais dos usuários do site ThinkSpace é de suma importância para nossa equipe, por este motivo, buscamos otimizar continuamente todos os processos internos, utilizando o gerador de política de privacidade de forma clara, para mante-los em segurança e de acordo com todas as normas impostas.
                            </p>
                        </div>

                        <h1 className="text-[32px]">SEÇÃO II - COLETA DOS DADOS</h1>
                        <div className="flex flex-col gap-2 mt-4 mb-10">
                            <p className="text-[20px]">Os dados pessoais dos visitantes podem ser coletados quando:</p>
                            <p className="text-[20px]">II.I - O  indivíduo realiza a criação de um cadastro no site ThinkSpace e com base nisso podem ser solicitados dados como: email, nome, telefone, etc.</p>
                            <p className="text-[20px]">II.II - O indivíduo navega nas páginas de nosso site ThinkSpace e neste caso, podem ser coletados dados como: palavras-chaves de origem do buscador, comentários, navegador utilizado, IP da rede, etc.</p>
                            <p className="text-[20px]">II.III - Por meio de terceiros, tais como: Google e/ou Facebook, sendo que, no momento de logar em um destes sites é autorizado diretamente pelo terceiro.No caso de envio de newsletters ou até mesmo envio de avisos por e-mail os cookies podem ser utilizados para direcionar um conteúdo mais adequado ao usuário final, com o intuito de melhorar a experiência de quem está lendo o e-mail.</p>
                        </div>

                        <h1 className="text-[32px]">SEÇÃO III - ACEITE</h1>
                        <div className="flex flex-col gap-2 mt-4 mb-10">
                            <p className="text-[20px]">A partir do momento da utilização do website ThinkSpace pressupõe que o usuário aceitou a política de privacidade. Desta forma reservamos o direito de modificar esta política sem que seja realizado um aviso prévio. Por este motivo, nós recomendamos que os usuários realizem uma consulta regularmente a nossa política, para que desta forma, se mantenham sempre atualizados de possíveis alterações, caso seja necessário é possível entrar em contato conosco informando suas dúvidas.O desenvolvedor poderá coletar informações pessoais do usuário que acessa o site, tais como nome, e-mail, número de telefone fixo e/ou celular, endereço, data de nascimento, ip e/ou outros dados. Na grande maioria das vezes, esses dados são utilizados para ativar a função de geotarget (exibir determinados conteúdos de acordo com a localização) e também filtrando por tipo de usuário (analisando a necessidade de cada um).</p>
                        </div>

                        <h1 className="text-[32px]">SEÇÃO IV - VINCULO A SITES EXTERNOS</h1>
                        <div className="flex flex-col gap-2 mt-4 mb-10">
                            <p className="text-[20px]">A plataforma ThinkSpace pode conter vínculo com sites externos, estes que podem possuir ferramentas e/ou informações proveitosas para os usuários. Esta política de privacidade não é empregada aos sites externos, se for do interesse do usuário, o mesmo deverá acessar a política de privacidade do site em questão para ter conhecimento dos detalhes.</p> 
                        </div>

                        <h1 className="text-[32px]">ATUALIZAÇÃO</h1>
                        <div className="flex flex-col gap-2 mt-4 mb-10">
                            <p className="text-[20px]">Essa politica de privacidade obteve sua última atualização na data de 03/06/2025, podendo ser modificada a qualquer momento, sem aviso prévio.</p> 
                        </div>
                    </div>
                </div>

                <footer className="w-full h-[300px] flex justify-center items-center py-8 mt-auto">
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

                    <div className="w-[33%] flex flex-col">
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
}