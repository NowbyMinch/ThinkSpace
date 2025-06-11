import LayoutClient from "./LayoutClient";

export default async function idMaterialLayout({ children, params }: { params: Promise<{ id: string; idMaterial: string }> } & { children: React.ReactNode }) {
    const resolvedParams = await params;
    const id = resolvedParams.id;
    const idMaterial = resolvedParams.idMaterial;

    return(
        <>
            <div className="mt-[12px] h-[calc(100vh-25px)] min-h-fit w-full ml-[20px] mr-[20px] flex flex-col items-center overflow-hidden gap-1">
                <div className=" min-h-[42px] max-h-[42px] w-[95%] ml-2 gap-4 ">
                    <LayoutClient id={id} idMaterial={idMaterial}/>
                </div>
                
                <div className="grid grid-cols-[7.2fr_2.8fr] h-[calc(100%-42px)]  w-full gap-[20px] ">
                    { children }
                </div>
            </div>
        </>
    )
}