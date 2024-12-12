import { BiSearch } from "react-icons/bi";

const HomeSearchBar = () => {

    return(
        <div className="w-11/12 h-[37px] bg-white mx-auto flex flex-row items-center px-2">
            <button onClick={()=>{}}>
                <BiSearch size={24} color="gray" />
            </button>
            
            <input className="w-full bg-transparent px-2 focus:outline-none" placeholder="Search"/>
        </div>
    )
}

export default HomeSearchBar;