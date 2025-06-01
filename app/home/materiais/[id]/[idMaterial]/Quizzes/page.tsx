"use client";

// import { PageProps } from "../type";
// { params }: PageProps 

export default function MaterialClient() {
    return( 
        <>  
            <div className="bg-white rounded-[35px] h-[100%] overflow-hidden flex flex-col items-center  shadow-md border border-[#00000031]">
                <div className="w-[1200px] max-w-[90%] h-[850px] max-h-[92%] mt-[35px] mb-[35px] relative flex justify-center items-center">
                    <div className="w-full h-[10px] rounded-full bg-[rgba(16,19,46,0.14)] absolute top-0"><div className="w-[20%] h-full rounded-full bg-[rgba(30,35,81,0.75)]"></div></div>

                    <div className="w-full h-[75%] bg-[#F7F7FF] rounded-[25px] border-[2px] shadow-md border-[rgba(60,49,91,0.24)] flex justify-center items-center">
                        <div className="w-[95%] h-[95%] relative flex justify-center items-center">
                            <div className="absolute bg-blue-500 top-0 w-full h-5">
                                <div className="">Questão 1/5</div>
                            </div>
                            <div className="w-[90%] h-[85%]"></div>
                            <div className="absolute bg-blue-500 bottom-0 w-full h-5"></div>
                        </div>
                    </div>

                </div>
            </div>

            <div className="bg-white rounded-[35px] flex justify-center shadow-md border border-[#00000031]">
                
            </div>
        </>
    );
};
