// blue_text = 1E2351;

export default function() {
    return( 
        <>

        <div className="grid grid-cols-[1fr_415px] w-full ml-[20px] mr-[20px] gap-[20px]">
            
            <div className="bg-white min-w-full mt-[12px] border rounded-[40px]">
                
                <div className="mt-[25px] ml-[30px] overflow-hidden">

                    <h1 className="text-[#1E2351] font-medium text-[55px] ">Olá, Maria</h1>
                    <h1 className="font-medium text-[35px] text-[#A19797] ">Qual matéria será revisada hoje? </h1>
                    <div className="w-full h-[50px] mt-8 flex justify-center">
                        <input type="text" className="w-[1000px] text-[25px] pl-5 h-[50px] border-2 border-[] rounded-[25px] outline-" />
                    </div>

                </div>
            </div>

            <div className="bg-white mt-[12px] border rounded-[40px]">

                <div className="w-full">

                    <div className="grid grid-cols-[100px_1fr] ml-[15px] mt-[30px] gap-[15px]">
                        
                        <div className=" h-[100px] rounded-full bg-[#d3d3d3]"></div>
                        
                        <div className="">
                            <h1 className="text-[28px] font-medium ">Maria Eduarda</h1>
                            <h2 className="text-[#828181] font-medium text-[25px]">Estudante</h2>
                            <div className="w-[220px] h-2 rounded-[25px] bg-[#1e235138]">
                                <div className="w-[35%] h-2 rounded-[25px] bg-purple-600 "></div>
                            </div>
                            <div className="flex justify-between w-[220px]">
                                <h2 className="font-medium text-[18px] text-[#828181]">Iniciante</h2>
                                <h2 className="font-medium text-[18px] text-[#828181]">150xp</h2>
                            </div>
                            
                        </div>

                    </div>


                </div>

            </div>
        </div>

        </>
    );
};
