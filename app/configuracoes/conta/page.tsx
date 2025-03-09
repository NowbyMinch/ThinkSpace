
export default function Conta() {
    return(
        <>
            <div className="ml-10">
                <div className="flex justify-between mt-10 w-[1000px] items-center border-b pb-5 border-b-[rgb(0,0,0,30%)]">
                    <div className="">
                        <h1 className="font-medium">Endereço de Email</h1>
                        <h2 className="text-[25px]">marimachado@gmail.com</h2>
                    </div>

                    <button id="editar_conta" className="font-medium border border-[#1E2351] rounded-[5px] w-[100px] h-[55px] text-[24px]">Editar</button>
                </div>
                <div className="flex justify-between mt-10 w-[1000px] items-center border-b pb-5 border-b-[rgb(0,0,0,30%)]">
                    <div className="">
                        <h1 className="font-medium">Senha</h1>
                        <h2 className="text-[25px]">***********</h2>
                    </div>

                    <button id="editar_conta" className="font-medium border border-[#1E2351] rounded-[5px] w-[100px] h-[55px] text-[24px]">Editar</button>
                </div>
                <div className="flex justify-between mt-10 w-[1000px] items-center ">
                    <div className="w-[80%]">
                        <h1 className="font-medium">Excluir sua conta</h1>
                        <p className="text-[25px] ">Ao excluir a sua conta, você não poderá mais acessar os seus estudos ou fazer login em nossa plataforma. Sua conta no ThinkSpace foi criada em 10:00, 10 de jan. de 2025.</p>
                    </div>

                    <button id="editar_conta" className="font-medium border border-[#1E2351] rounded-[5px] w-[100px] h-[55px] text-[24px]">Excluir</button>
                </div>

            </div>
        </>
    )
}