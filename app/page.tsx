import Image from "next/image";
import {  Search  } from "lucide-react";

export default function Home() {
    return(
        
        <div className="w-[40%] ml-[20px] h-[82px] mt-[15px] flex justify-center relative" >
            <input type="text" id="search_bar" className="w-full z-10 text-[25px] pl-5 h-[55px] border-2 border-[rgba(0,0,0,0.19)]  rounded-[25px] outline-[#9767F8]" />
            <Search className="absolute right-[25px] text-black opacity-[36%] cursor-pointer top-[12px] size-[30px] z-20"/>
            {/* <div className="w-[97%] rounded-[20px] mt-5 mr-5 h-[50px] bg-[#D9D9D9] absolute"></div> */}
        </div>
        
    );
};
