import { useState } from "react";
import { BiSearch } from "react-icons/bi";
import { useNavigate } from "react-router";
import { useProducts } from "../../customHooks/useFetchData";
import { VscLoading } from "react-icons/vsc";

const HomeSearchBar = () => {

    const [search, setSearch] = useState('')
    const { data: products, isLoading, error } = useProducts()
    const [searchResult, setSearchResult] = useState('invisible')
    const navigate = useNavigate()

    if (isLoading) return(
        <div className="size-36 flex items-center justify-center m-auto animate-spin">
          <VscLoading size={36}/>
        </div>
      );

      if (error){
        if(error.message == 'Request failed with status code 404'){
          return(<div className="mx-auto my-6">
            <h2 className="text-center text-xl font-bold">No products found with the selected combination of filters!</h2>
          </div>)
        }
        return(
          <div>{error.message}</div>
        )
      }

    return(
        
        <div onFocus={()=>setSearchResult('visible')} onBlur={() => {
            setTimeout(() => setSearchResult('invisible'), 100);
          }} className="w-11/12 h-[37px] bg-white mx-auto flex flex-col items-center px-2">

            <div className="flex flex-row w-full my-4">
                <button>
                    <BiSearch size={24} color="gray" />
                </button>
            
                <input onChange={(e)=>setSearch(e.target.value)} className="w-full bg-transparent px-2 focus:outline-none" placeholder="Search"/>
            </div>
            
            {searchResult == 'visible'? <ul className="w-11/12 bg-white max-h-[400px] overflow-y-auto shadow-2xl m-12 absolute rounded-lg overflow-hidden flex flex-col">
                {products?.filter((product)=>{
                    return search.toLowerCase() === '' 
                    ? product 
                    : product.name.toLowerCase().includes(search);
                } ).map((product)=>(
                    <li onClick={() => navigate(`/product/${product.id}`)} key={product.id} className="w-full h-fit p-4 flex flex-row items-center justify-between border-b-2 border-b-gray-100">
                        <img className="size-12" src={product.images[0]} />
                        <p>{product.name}</p>
                        <p>${product.price}</p>
                    </li>
                ))}
            </ul> : ''}
        </div>
    )
}

export default HomeSearchBar;