import React, { useState, useEffect } from 'react';
import { z } from 'zod';
import { BiSearch } from 'react-icons/bi';
import { TiDeleteOutline } from "react-icons/ti";
import axios from 'axios';
import { useNavigate } from 'react-router';


interface ProductType{
  id:number;
  title:string;
  price:number;
  images:string;
}
const searchSchema = z.string().min(1, 'Search term is required');

const SearchBar: React.FC = () => {
    const [searchValue, setsearchValue] = useState<string>('');
    const [searchHistory, setSearchHistory] = useState<string[]>([]);
    const [showHistory, setShowHistory] = useState<boolean>(false);
    const [products, setProducts] = useState([]);
    const navigate = useNavigate(); 
    const baseURL = 'http://localhost:5173/Products';

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(baseURL);
                setProducts(response.data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const history = localStorage.getItem('searchHistory');
        if (history) {
            setSearchHistory(JSON.parse(history));
        }
    }, []);

    const handleSearch = () => {
        try {
            searchSchema.parse(searchValue);
            const updatedHistory = [...new Set([searchValue, ...searchHistory])];
            setSearchHistory(updatedHistory);
            localStorage.setItem('searchHistory', JSON.stringify(updatedHistory));
            setsearchValue('');
            setShowHistory(false); 
        } catch (error) {
            console.error(error);
        }
    };

    const productsList = () => {
        return (
            <ul className="w-11/12 bg-white max-h-[400px] overflow-y-auto shadow-2xl m-12 absolute z-10 rounded-lg">
                {products.filter((item) =>
                    searchValue.toLowerCase() === ''
                        ? item
                        : item.title.toLowerCase().includes(searchValue.toLowerCase())
                ).map((product:ProductType) => (
                    <li onClick={() => navigate(/product/${product.id})} key={product.id} className="w-full h-fit p-4 flex flex-row items-center justify-between border-b-2 border-b-gray-100">
                        <img className="size-12" src={product.images} alt={product.title} />
                        <p>{product.title}</p>
                        <p>${product.price}</p>
                    </li>
                ))}
            </ul>
        );
    };

    const handleDeleteHistoryItem = (item: string) => {
        const updatedHistory = searchHistory.filter(hist => hist !== item);
        setSearchHistory(updatedHistory);
        localStorage.setItem('searchHistory', JSON.stringify(updatedHistory));
    };

    const handleClearHistory = () => {
        setSearchHistory([]);
        localStorage.removeItem('searchHistory');
    };

    return (
        <div className="relative w-11/12 mx-auto">
            <div className="flex flex-row my-4">
                <button onClick={handleSearch}>
                    <BiSearch size={24} color="gray" />                 </button>
                <input
                    type="text"
                    value={searchValue}
                    onChange={(e) => setsearchValue(e.target.value)}
                    onFocus={() => setShowHistory(true)}
                    onBlur={() => setTimeout(() => setShowHistory(false), 100)}
                    className="w-full bg-transparent px-2 focus:outline-none"
                    placeholder="Search"
                />
            </div>

            {showHistory && searchHistory.length > 0 && (
                <div>
                    {}
                    <div className='flex flex-row items-center justify-between'>
                        <p className="p-2 cursor-pointer text-blue-500" onClick={handleClearHistory}>Clear History</p>
                    </div>
                    <ul>
                        {searchHistory.map((item) => (
                            <li key={item} className="flex justify-between items-center p-2">
                                <span>{item}</span>
                                <button onClick={() => handleDeleteHistoryItem(item)}>
                                    <TiDeleteOutline size={24} />
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {}
            {searchValue && productsList()}
        </div>
    );
};

export default SearchBar;