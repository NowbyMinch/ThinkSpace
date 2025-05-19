
export default function Personalização() {
    return (
        <>
            <div className="ml-10 mt-4 w-[95%] border-b flex flex-col gap-[25px] border-[rgba(0,0,0,0.33)] pb-4 ">
                <div className="relative flex items-center w-[820px] gap-2">
                    <div className="min-w-[602px] max-w-[602px]">
                        <h1 className="font-medium text-[35px]">Tema</h1>
                        <h2 className="text-[25px]">Escolha o plano de fundo</h2>
                    </div>
                </div>

                <div className="flex gap-12">
                    <div id="tema" className="w-[300px] h-[180px] rounded-[25px] border border-[rgba(0,0,0,38%)] flex gap-3 items-center justify-center shadow-md cursor-pointer ">
                        <div className="border border-[rgba(0,0,0,38%)] h-[90%] w-6 rounded-full flex justify-center">
                            <div className=" w-[90%] mt-2 relative">
                                <img src="../../../Light Bulb-off.png" alt="Logo" className="w-full absolute "/>
                                <img src="../../../Light Bulb.png" alt="Logo" className=" w-full absolute "/>
                            </div>
                        </div>
                        <div className="border border-[rgba(0,0,0,38%)] h-[90%] w-[80%] rounded-[25px]"></div>
                    </div>
                    <div id="tema" className="w-[300px] h-[180px] rounded-[25px] border bg-[#383638] border-[rgba(0,0,0,38%)] flex gap-3 items-center justify-center shadow-md cursor-pointer">
                        <div className="border border-[rgba(0,0,0,38%)] h-[90%] w-6 rounded-full flex justify-center">
                            <div className=" w-[90%] mt-2 relative">
                                <img src="../../../Light Bulb-off.png" alt="Logo" className="w-full absolute"/>
                                <img src="../../../Light Bulb.png" alt="Logo" className=" w-full absolute "/>
                            </div>
                        </div>
                        <div className="border border-[rgba(0,0,0,38%)] h-[90%] w-[80%] rounded-[25px]"></div>
                    </div>
                </div>
            </div>
    
        </>    
    )
}