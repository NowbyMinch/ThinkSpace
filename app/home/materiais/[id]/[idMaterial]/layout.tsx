import LayoutClient from "./LayoutClient";

export default async function idMaterialLayout({ children, params }: { params: Promise<{ id: string; idMaterial: string }> } & { children: React.ReactNode }) {
    const resolvedParams = await params;
    const id = resolvedParams.id;
    const idMaterial = resolvedParams.idMaterial;

    return(
        <>
            <div className="mt-[12px] h-[calc(100vh-25px)] min-h-fit w-full flex flex-col items-center overflow-hidden ">
                <div className=" w-[2000px]  max-w-[95%] lg:max-w-[90%] overflow-hidden flex justify-center items-center min-h-[42px] max-h-[42px] ml-2 gap-4 ">
                    <LayoutClient id={id} idMaterial={idMaterial}/>
                </div>
                
                <div className="w-[2000px] max-w-[95%] lg:max-w-[90%] mx-auto mb-[12px] overflow-hidden h-[calc(100vh-66px)] gap-3 rounded-[35px] flex justify-center items-center  ">
                    { children }
                </div>
            </div>
        </>
    )
}