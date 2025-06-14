"use client";

import { motion } from "framer-motion"
import Image from "next/image"
import { useEffect, useState } from "react";
import Link from "next/link";
import { Instagram, MoveUpRight } from "lucide-react";

export default function TermosDeUso() {
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
            <div className="w-screen h-screen relative flex flex-col items-center bg-white">
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
                        <h1 className="text-[60px] w-max text-white">Termos de Uso</h1>
                    </div>

                    <div className="w-[1000px] max-w-[80%] h-full mb-5">
                        <h1 className="text-[35px]">Termos de Uso e Serviço da ThinkSpace</h1>
                        <div className="flex flex-col gap-2 mt-4 mb-10">
                            <p className="text-[20px]">Seja Bem-Vindo ao site da ThinkSpace. Antes de explorar tudo o que temos a oferecer, é importante que você entenda e concorde com algumas regras básicas que regem o uso do nosso site thinkspace.app.br, e qualquer outro serviço digital que nós oferecemos, como lojas e plataformas de e-commerce.</p>

                            <p className="text-[20px]">
                            Ao usar nosso site e serviços, você automaticamente concorda em seguir as regras que estabelecemos aqui. Caso não concorde com algo, por favor, considere não usar nossos serviços. É muito importante para nós que você se sinta seguro e informado a todo momento.
                            </p>
                        </div>

                        <h1 className="text-[32px]">1. Aceitando os Termos</h1>
                        <div className="flex flex-col gap-2 mt-4 mb-10">
                            <p className="text-[20px]">Ao navegar e usar o site da ThinkSpace, você concorda automaticamente com nossas regras e condições. Estamos sempre procurando melhorar, então esses termos podem mudar de vez em quando. Se fizermos alterações significativas, vamos postar as atualizações aqui no site. Continuar usando o site após essas mudanças significa que você aceita os novos termos.</p>
                        </div>

                        <h1 className="text-[32px]">2. Como Usar o Nosso Site</h1>
                        <div className="flex flex-col gap-2 mt-4 mb-10">
                            <p className="text-[20px]">A maior parte do nosso site está aberta para você sem a necessidade de cadastro. No entanto, algumas seções especiais podem exigir que você crie uma conta. Pedimos que você seja honesto ao fornecer suas informações e que mantenha sua senha e login seguros. Se decidir compartilhar algum conteúdo conosco, como comentários, por favor, faça-o de maneira respeitosa e dentro da lei.</p>
                        </div>

                        <h1 className="text-[32px]">3. Sua Privacidade</h1>
                        <div className="flex flex-col gap-2 mt-4 mb-10">
                            <p className="text-[20px]">Na ThinkSpace, a privacidade é um valor essencial. Ao interagir com nosso site, você aceita nossa Política de Privacidade, que detalha nossa abordagem responsável e conforme às leis para o manejo dos seus dados pessoais. Nosso compromisso é com a transparência e a segurança: explicamos como coletamos, usamos e protegemos suas informações, garantindo sua privacidade e oferecendo controle sobre seus dados.
                            </p>
                            
                            <p className="text-[20px]">
                                Adotamos práticas de segurança para proteger suas informações contra acesso não autorizado e compartilhamento indevido, assegurando que qualquer cooperação com terceiros ocorra apenas com base na sua aprovação ou exigências legais claras, reafirmando nosso comprometimento com a sua confiança e segurança digital.
                            </p>    
                        </div>

                        <h1 className="text-[32px]">4. Direitos de Conteúdo</h1>
                        <div className="flex flex-col gap-2 mt-4 mb-10">
                            <p className="text-[20px]">O conteúdo disponível no site da ThinkSpace, incluindo, mas não se limitando a, textos, imagens, ilustrações, designs, ícones, fotografias, programas de computador, videoclipes e áudios, constitui propriedade intelectual protegida tanto pela legislação nacional quanto por tratados internacionais sobre direitos autorais e propriedade industrial. Essa propriedade engloba não apenas materiais diretamente produzidos e publicados por nós, mas também conteúdos que são utilizados sob licença ou permissão de terceiros, garantindo que todos os direitos sejam respeitados conforme as normativas vigentes.
                            </p>

                            <p className="text-[20px]">Ao acessar nosso site, você recebe uma licença limitada, não exclusiva e revogável para visualizar e usar o conteúdo para fins pessoais e não comerciais. Isso implica que qualquer reprodução, distribuição, transmissão ou modificação do conteúdo, sem a devida autorização escrita da ThinkSpace, é estritamente proibida. Tal restrição visa proteger os direitos de propriedade intelectual associados aos materiais disponibilizados, assegurando que sua utilização não infrinja os direitos dos criadores ou detentores desses direitos, além de promover um ambiente de respeito e valorização da criatividade e inovação.
                            </p>
                        </div>

                        <h1 className="text-[32px]">5. Cookies e Mais</h1>
                        <div className="flex flex-col gap-2 mt-4 mb-10">
                            <p className="text-[20px]">Utilizamos cookies para melhorar sua experiência, coletando informações anônimas durante sua visita, como suas preferências de idioma, duração da visita, páginas acessadas, e outras estatísticas de uso. Esses dados nos ajudam a personalizar seu conteúdo, otimizar a navegação, melhorar continuamente o site em design e funcionalidade, e garantir sua segurança online. Esta prática é essencial para nos permitir oferecer um serviço mais ajustado às suas necessidades e resolver qualquer problema que possa surgir mais rapidamente.
                            </p>

                            <p className="text-[20px]">Se você preferir limitar ou recusar o uso de cookies, a configuração pode ser ajustada através do seu navegador. Isso pode afetar a sua experiência no site, pois algumas funcionalidades dependem dos cookies para funcionar corretamente. Entendemos a importância do controle sobre suas informações e queremos que você saiba que, ao ajustar as configurações para bloquear cookies, algumas partes do nosso site podem não oferecer a experiência completa pretendida.
                            </p>
                        </div>

                        <h1 className="text-[32px]">6. Explorando Links Externos</h1>
                        <div className="flex flex-col gap-2 mt-4 mb-10">
                            <p className="text-[20px]">Nosso site pode incluir links para sites externos que achamos que podem ser do seu interesse. Note que não temos controle sobre esses sites externos e, portanto, não somos responsáveis pelo seu conteúdo ou políticas.
                            </p>
                        </div>

                        <h1 className="text-[32px]">7. Mudanças e Atualizações</h1>
                        <div className="flex flex-col gap-2 mt-4 mb-10">
                            <p className="text-[20px]">A evolução é parte de como operamos, o que significa que estes Termos de Uso podem passar por atualizações para refletir melhor as mudanças em nossos serviços ou na legislação. Sempre que isso acontecer, você encontrará a versão mais recente disponível aqui. Se as mudanças forem significativas, faremos o possível para notificá-lo através dos meios de contato que você nos forneceu.
                            </p>
                            <p className="text-[20px]">Continuar a acessar o site após essas mudanças indica que você concorda com os novos termos. Se, por qualquer motivo, você não concordar com as atualizações, pedimos que não continue utilizando nosso site e serviços.
                            </p>
                        </div>

                        <p className="text-[20px]">Dúvidas ou Comentários?</p>
                        <p className="text-[20px]">Se tiver dúvidas sobre estes termos, não hesite em nos contatar através do e-mail suportethinkspace@gmail.com</p>

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