import { BiBell } from "react-icons/bi";
import { BiHeart } from "react-icons/bi";

const HomeHeader = ()=>{

    return(
        <header className="w-full h-20 shadow-xl absolute top-0 flex flex-row justify-between items-center px-6">
            <div className="w-[194px] h-12 justify-between flex flex-row">
                <div className="w-12 h-12 rounded-full bg-black">
                    
                </div>
                
                <div className="flex flex-col w-[140px] ml-2">
                    <p className="text-gray-400 text-md">
                        Good Morning 👋
                    </p>

                    <h2 className=" font-semibold text-lg">
                        Saeed Abdilar
                    </h2>
                </div>
            </div>

            <div className="w-16 h-6 flex flex-row justify-between items-center">
                <BiBell size={28}/>
                <BiHeart size={28}/>
            </div>

        </header>
    )
}

export default HomeHeader;