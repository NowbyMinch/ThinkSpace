export default function Configurações() {
    return(
    <>
        <div className="w-full mr-[20px] ml-[20px] h-[calc(100vh-24px)] mt-[12px] mb-[12px] bg-white shadow-md rounded-[35px] border border-[#00000031] flex justify-center items-center">
            <div className="w-[96%] h-[94%] ">
                <h1 className="font-medium text-[45px]">Configurações</h1>
                <div className="w-full mt-5 ">
                    <div className="ml-10 flex justify-between w-[65%]">
                        <h2 className="text-[25px] font-medium cursor-pointer ">Informações básicas</h2>
                        <h2 className="text-[25px] font-medium cursor-pointer">Personalização</h2>
                        <h2 className="text-[25px] font-medium cursor-pointer">Notificação</h2>
                        <h2 className="text-[25px] font-medium cursor-pointer">Conta</h2>
                    </div>

                    <div className="w-[calc(100%+4.1%)] ml-[-2.1%] h-[2px]  bg-[rgba(0,0,0,0.25)]"></div>
                </div>

            </div>

        </div>
    </>
    
)
}