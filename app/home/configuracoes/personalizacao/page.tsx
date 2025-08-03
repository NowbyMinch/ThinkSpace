import Image from "next/image";

export default function Personalização() {
    return (
        <>
            <div className=" mt-4 w-[90%] border-b flex flex-col gap-[25px] border-[rgba(0,0,0,0.33)] pb-4 ">
                <div className="relative flex items-center  gap-2">
                    <div className="lg:min-w-[602px] lg:max-w-[602px]">
                        <h1 className="font-medium text-[25px]">Tema</h1>
                        <h2 className="text-[18px]">Escolha o plano de fundo</h2>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-12">
                    <div id="tema" className="w-[270px] h-[162px] rounded-[25px] border border-[rgba(0,0,0,38%)] flex gap-3 items-center justify-center shadow-md cursor-pointer ">
                        <div className="border border-[rgba(0,0,0,38%)] h-[90%] w-6 rounded-full flex justify-center">
                            <div className=" w-[90%] mt-2 relative">
                                <Image src="/Light Bulb-off.png" width={300} height={500} alt="Logo" className="w-full absolute "/>
                                <Image src="/Light Bulb.png" width={300} height={500} alt="Logo" className=" w-full absolute "/>
                            </div>
                        </div>
                        <div className="border border-[rgba(0,0,0,38%)] h-[90%] w-[80%] rounded-[25px]"></div>
                    </div>
                    <div id="tema" className="w-[270px] h-[162px] rounded-[25px] border bg-[#383638] border-[rgba(0,0,0,38%)] flex gap-3 items-center justify-center shadow-md cursor-pointer">
                        <div className="border border-[rgba(0,0,0,38%)] h-[90%] w-6 rounded-full flex justify-center">
                            <div className=" w-[90%] mt-2 relative">
                                <Image src="/Light Bulb-off.png" width={300} height={500} alt="Logo" className="w-full absolute "/>
                                <Image src="/Light Bulb.png" width={300} height={500} alt="Logo" className=" w-full absolute "/>
                            </div>
                        </div>
                        <div className="border border-[rgba(0,0,0,38%)] h-[90%] w-[80%] rounded-[25px]"></div>
                    </div>
                </div>
            </div>
    
        </>    
    )
}