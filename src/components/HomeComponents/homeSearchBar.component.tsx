import { useState, useEffect } from "react";
import { BiSearch } from "react-icons/bi";
import { useNavigate } from "react-router";
import { baseURL } from "../../customHooks/useFetchData";
import { HTTP } from "../../services/http.service";

const HomeSearchBar = () => {

    const [search, setSearch] = useState('')
    const [products, setProducts] = useState([])
    const [searchResult, setSearchResult] = useState('invisible')
    const navigate = useNavigate()

    const baseUrl = baseURL

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await HTTP.get(baseUrl);
            setProducts(response.data);
          } catch (error) {
            console.error("Error fetching products:", error);
          }
        };
    
        fetchData();
    }, []);

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
                {products.filter((item)=>{
                    return search.toLowerCase() === '' 
                    ? item 
                    : item.title.toLowerCase().includes(search);
                } ).map((product)=>(
                    <li onClick={() => navigate(`/product/${product.id}`)} key={product.id} className="w-full h-fit p-4 flex flex-row items-center justify-between border-b-2 border-b-gray-100">
                        <img className="size-12" src={product.images} />
                        <p>{product.title}</p>
                        <p>${product.price}</p>
                    </li>
                ))}
            </ul> : ''}
        </div>
    )
}

export default HomeSearchBar;