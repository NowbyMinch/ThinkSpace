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
                            <p className="text-[20px]">
                            Seja bem-vindo ao site da ThinkSpace. Antes de explorar tudo o que temos a oferecer, é importante que você entenda e concorde com algumas regras básicas que regem o uso do nosso site, thinkspace.app.br, e de qualquer outro serviço digital que oferecemos, como lojas e plataformas de e-commerce.
                            </p>

                            <p className="text-[20px]">
                            Ao utilizar nosso site e serviços, você automaticamente concorda em seguir as regras aqui estabelecidas. Caso não concorde com algum ponto, por favor, considere não utilizar nossos serviços. É muito importante para nós que você se sinta seguro e bem informado a todo momento.
                            </p>
                        </div>

                        <h1 className="text-[32px]">1. Aceitação dos Termos</h1>
                        <div className="flex flex-col gap-2 mt-4 mb-10">
                            <p className="text-[20px]">
                            Ao navegar e utilizar o site da ThinkSpace, você concorda automaticamente com nossos termos e condições. Estamos sempre buscando melhorias, portanto, esses termos podem ser alterados periodicamente. Se realizarmos mudanças significativas, publicaremos as atualizações aqui no site. Ao continuar utilizando o site após tais alterações, você estará aceitando os novos termos.
                            </p>
                        </div>

                        <h1 className="text-[32px]">2. Como Usar o Nosso Site</h1>
                        <div className="flex flex-col gap-2 mt-4 mb-10">
                            <p className="text-[20px]">
                            A maior parte do nosso site está disponível sem necessidade de cadastro. No entanto, algumas seções específicas podem exigir que você crie uma conta. Pedimos que forneça informações verdadeiras e mantenha seu login e senha seguros. Se decidir compartilhar conteúdo conosco, como comentários, faça-o de forma respeitosa e dentro da legalidade.
                            </p>
                        </div>

                        <h1 className="text-[32px]">3. Sua Privacidade</h1>
                        <div className="flex flex-col gap-2 mt-4 mb-10">
                            <p className="text-[20px]">
                            Na ThinkSpace, a privacidade é um valor essencial. Ao interagir com nosso site, você aceita nossa Política de Privacidade, que detalha nossa abordagem responsável e em conformidade com as leis quanto ao tratamento dos seus dados pessoais. Nosso compromisso é com a transparência e a segurança: explicamos como coletamos, utilizamos e protegemos suas informações, garantindo sua privacidade e oferecendo controle sobre seus dados.
                            </p>

                            <p className="text-[20px]">
                            Adotamos práticas de segurança para proteger suas informações contra acessos não autorizados e compartilhamento indevido. Qualquer eventual cooperação com terceiros ocorrerá somente com sua autorização ou por exigência legal clara, reafirmando nosso compromisso com sua confiança e segurança digital.
                            </p>
                        </div>

                        <h1 className="text-[32px]">4. Direitos de Conteúdo</h1>
                        <div className="flex flex-col gap-2 mt-4 mb-10">
                            <p className="text-[20px]">
                            O conteúdo disponível no site da ThinkSpace, incluindo, mas não se limitando a textos, imagens, ilustrações, designs, ícones, fotografias, softwares, videoclipes e áudios, constitui propriedade intelectual protegida pela legislação nacional e por tratados internacionais. Essa proteção abrange tanto materiais produzidos por nós quanto conteúdos utilizados sob licença ou permissão de terceiros, garantindo o respeito aos direitos autorais e de propriedade industrial.
                            </p>

                            <p className="text-[20px]">
                            Ao acessar nosso site, você recebe uma licença limitada, não exclusiva e revogável para visualizar e utilizar o conteúdo para fins pessoais e não comerciais. Qualquer reprodução, distribuição, transmissão ou modificação sem autorização escrita da ThinkSpace é proibida. Essa medida visa proteger os direitos dos criadores e valorizar a criatividade e a inovação.
                            </p>
                        </div>

                        <h1 className="text-[32px]">5. Cookies e Mais</h1>
                        <div className="flex flex-col gap-2 mt-4 mb-10">
                            <p className="text-[20px]">
                            Utilizamos cookies para melhorar sua experiência, coletando informações anônimas durante sua visita, como preferências de idioma, duração da sessão, páginas acessadas e outras estatísticas de uso. Esses dados nos ajudam a personalizar conteúdos, otimizar a navegação, aprimorar o design e garantir segurança online.
                            </p>

                            <p className="text-[20px]">
                            Se preferir limitar ou desativar os cookies, você pode ajustar as configurações do seu navegador. No entanto, isso pode impactar sua experiência, já que algumas funcionalidades dependem deles para funcionar corretamente.
                            </p>
                        </div>

                        <h1 className="text-[32px]">6. Links Externos</h1>
                        <div className="flex flex-col gap-2 mt-4 mb-10">
                            <p className="text-[20px]">
                            Nosso site pode conter links para páginas externas que acreditamos ser do seu interesse. Ressaltamos que não temos controle sobre esses sites e não nos responsabilizamos por seus conteúdos ou políticas.
                            </p>
                        </div>

                        <h1 className="text-[32px]">7. Alterações e Atualizações</h1>
                        <div className="flex flex-col gap-2 mt-4 mb-10">
                            <p className="text-[20px]">
                            A evolução constante faz parte da nossa atuação. Por isso, estes Termos de Uso podem ser atualizados para refletir mudanças em nossos serviços ou na legislação. Sempre que isso ocorrer, a versão mais recente estará disponível aqui. Caso as mudanças sejam significativas, faremos o possível para notificá-lo pelos meios de contato fornecidos.
                            </p>

                            <p className="text-[20px]">
                            Ao continuar acessando o site após tais alterações, você concorda com os novos termos. Se não concordar, recomendamos que interrompa o uso dos nossos serviços.
                            </p>
                        </div>

                        <p className="text-[20px] font-semibold mt-10">Dúvidas ou Comentários?</p>
                        <p className="text-[20px]">Caso tenha dúvidas sobre estes termos, entre em contato pelo e-mail <strong>suportethinkspace@gmail.com</strong>.</p>

                        <p className="text-[16px] text-neutral-500 mt-10">
                            Os ícones utilizados neste site são fornecidos pelo <strong>Lucide Icons</strong>. As imagens e vetores são licenciados e obtidos por meio da plataforma <strong>Freepik</strong>.
                        </p>
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