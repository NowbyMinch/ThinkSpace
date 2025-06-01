import LayoutClient from "./LayoutClient";

export default async function idMaterialLayout({ children, params }: { params: Promise<{ id: string; idMaterial: string }> } & { children: React.ReactNode }) {
    const resolvedParams = await params;
    const id = resolvedParams.id;
    const idMaterial = resolvedParams.idMaterial;

    return(
        <>
            <div className="mt-[12px] h-[calc(100vh-25px)] min-h-fit w-full ml-[20px] mr-[20px] flex flex-col items-center">
                <div className="h-[5%] w-[95%] ml-2 gap-4 ">
                    <LayoutClient id={id} idMaterial={idMaterial}/>
                </div>
                
                <div className="grid grid-cols-[3fr_1fr] h-[95%] w-full gap-[20px]">
                    { children }
                </div>
            </div>
        </>
    )
}