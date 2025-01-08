import React, { useEffect } from 'react';
import { z } from 'zod';
import { BiSearch } from 'react-icons/bi';
import { TiDeleteOutline } from "react-icons/ti";
import axios from 'axios';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchValue, setSearchHistory, clearSearchHistory, setProducts } from './searchSlice';
const searchSchema = z.string().min(1, 'Search term is required');
const SearchBar: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate(); const baseURL = 'http://localhost:5173/Products';
    const searchValue = useSelector((state: any) => state.search.searchValue);
    const searchHistory = useSelector((state: any) => state.search.searchHistory);
    const products = useSelector((state: any) => state.search.products);
    const showHistory = searchHistory.length > 0;
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(baseURL);
                dispatch(setProducts(response.data));
            }
            catch (error) { console.error("Error fetching products:", error); }
        };
        fetchData();
    }, [dispatch]);
    useEffect(() => {
        const history = localStorage.getItem('searchHistory');
        if (history) { dispatch(setSearchHistory(JSON.parse(history))); }
    }, [dispatch]);
    const handleSearch = () => {
        try {
            searchSchema.parse(searchValue);
            const updatedHistory = [...new Set([searchValue, ...searchHistory])];
            dispatch(setSearchHistory(updatedHistory));
            localStorage.setItem('searchHistory', JSON.stringify(updatedHistory));
            dispatch(setSearchValue(''));
        } catch (error) { console.error(error); }
    };
    const handleDeleteHistoryItem = (item: string) => {
        const updatedHistory = searchHistory.filter(hist => hist !== item);
        dispatch(setSearchHistory(updatedHistory));
        localStorage.setItem('searchHistory', JSON.stringify(updatedHistory));
    };
    const handleClearHistory = () => {
        dispatch(clearSearchHistory());
        localStorage.removeItem('searchHistory');
    };
    const productsList = () => {
        return (
            <ul className="w-11/12 bg-white max-h-[400px] overflow-y-auto shadow-2xl m-12 absolute z-10 rounded-lg">
                {products.filter((item:string) => searchValue.toLowerCase() === '' ? item : item.title.toLowerCase().includes(searchValue.toLowerCase())).map((product) => (<li onClick={() => navigate(/product/${ product.id })} key={product.id} className="w-full h-fit p-4 flex flex-row items-center justify-between border-b-2 border-b-gray-100">
                    <img className="size-12" src={product.images} alt={product.title} />
                    <p>{product.title}</p>
                    <p>${product.price}</p>
                </li>))}
            </ul>);
    };
    return (
        <div className="relative w-11/12 mx-auto">
            <div className="flex flex-row my-4">
                <button onClick={handleSearch}>
                    <BiSearch size={24} color="gray" />
                </button>
                <input type="text" value={searchValue} onChange={(e) => dispatch(setSearchValue(e.target.value))} className="w-full bg-transparent px-2 focus:outline-none" placeholder="Search" />
            </div>{showHistory && (<div>
                <div className='flex flex-row items-center justify-between'>
                    <p className="p-2 cursor-pointer text-blue-500" onClick={handleClearHistory}>Clear History</p> </div>
                <ul> {searchHistory.map((item:string) => (<li key={item} className="flex justify-between items-center p-2">
                    <span>{item}</span>
                    <button onClick={() => handleDeleteHistoryItem(item)}>
                        <TiDeleteOutline size={24} />
                    </button>
                </li>))}
                </ul> </div>)}{ } {searchValue && productsList()}</div>);
};
export default SearchBar;