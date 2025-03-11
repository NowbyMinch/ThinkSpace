export default function Test() {
    return (
        <>
            <div className="mt-4 ml-10 flex flex-col gap-6">
                <div className="flex flex-col justify-between  w-[1000px]  ">
                    <h1 className="text-[35px] font-medium">Nome</h1>
                    <input type="text" defaultValue="Maria Eduarda" className=" rounded-[20px] border-[2px] border-[#0d0f224e] pl-2 w-[60%] text-[25px] h-[60px] outline-[#9767F8]"></input>
                </div>

                <div className="flex flex-col justify-between w-[1000px] ">
                    <h1 className="text-[35px] font-medium">Data de Nascimento</h1>
                    <input type="text" defaultValue="12 de Novembro de 2025" className=" rounded-[20px] border-[2px] border-[#0d0f224e] pl-2 w-[60%] text-[25px] h-[60px] outline-[#9767F8]"></input>
                </div>

                <div className="flex flex-col justify-between w-[1000px] ">
                    <h1 className="text-[35px] font-medium">Instituição</h1>
                    <input type="text" defaultValue="Colégio SEICE" className=" rounded-[20px] border-[2px] border-[#0d0f224e] pl-2 w-[60%] text-[25px] h-[60px] outline-[#9767F8]"></input>
                </div>

                <div className="flex flex-col justify-between w-[1000px] ">
                    <h1 className="text-[35px] font-medium">Nome de Usuário</h1>
                    <input type="text" defaultValue="Madu.jpg" className=" rounded-[20px] border-[2px] border-[#0d0f224e] pl-2 w-[60%] text-[25px] h-[60px] outline-[#9767F8]"></input>
                </div>

                <div className="flex flex-col justify-between w-[1000px] ">
                    <h1 className="text-[35px] font-medium">Cargo ou Posição / Nível de escolaridade</h1>
                    <input type="text" defaultValue="Moderador" className=" rounded-[20px] border-[2px] border-[#0d0f224e] pl-2 w-[60%] text-[25px] h-[60px] outline-[#9767F8]"></input>
                </div>

                <button id="editar_conta" className="mt-3 w-[200px] h-[60px] rounded-[30px] text-[25px] font-medium border border-[#1E2351]">Salvar</button>

            </div>
        </>
    )
}