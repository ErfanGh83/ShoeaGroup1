import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useProducts } from "../../../customHooks/useFetchData";
import { Product } from "../../types/types";

interface Filters {
  brands: string[];
  colors: string[];
  sizes: string[];
}

const HomeContainerProducts: React.FC = () => {
  const [filters, setFilters] = useState<Filters>({
    brands: [],
    colors: [],
    sizes: [],
  });

  const navigate = useNavigate();

  const handleFilterChange = (filterType: keyof Filters, filterValue: string) => {
    setFilters((prev) => {
      const updatedFilters = { ...prev };
      const updatedArray = updatedFilters[filterType].includes(filterValue)
        ? updatedFilters[filterType].filter((item) => item !== filterValue)
        : [...updatedFilters[filterType], filterValue];

      updatedFilters[filterType] = updatedArray;
      return updatedFilters;
    });
  };

  const buildQueryParams = (filters: Filters) => {
    const params: Record<string, string> = {};
    if (filters.brands.length > 0) params.brands = filters.brands.join(",");
    if (filters.colors.length > 0) params.colors = filters.colors.join(",");
    if (filters.sizes.length > 0) params.sizes = filters.sizes.join(",");
    return params;
  };

  const queryParams = buildQueryParams(filters);
  const { data, isLoading, error } = useProducts(queryParams);

  if (isLoading) return <p>Loading...</p>;
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

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-4">
        <h3 className="mr-2">Brands:</h3>
        {["nike", "adidas", "puma"].map((brand) => (
          <button
            key={brand}
            onClick={() => handleFilterChange("brands", brand)}
            className={`px-4 py-2 rounded-full border ${filters.brands.includes(brand) ? "bg-black text-white" : "bg-white text-black"}`}
          >
            {brand}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap gap-2 mb-4">
        <h3 className="mr-2">Colors:</h3>
        {["red", "emerald", "rose", "teal"].map((color) => (
          <button
            key={color}
            onClick={() => handleFilterChange("colors", color)}
            className={`px-4 py-2 rounded-full border ${filters.colors.includes(color) ? "bg-black text-white" : "bg-white text-black"}`}
          >
            {color}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap gap-2 mb-4">
        <h3 className="mr-2">Sizes:</h3>
        {["40", "41", "42", "43"].map((size) => (
          <button
            key={size}
            onClick={() => handleFilterChange("sizes", size)}
            className={`px-4 py-2 rounded-full border ${filters.sizes.includes(size) ? "bg-black text-white" : "bg-white text-black"}`}
          >
            {size}
          </button>
        ))}
      </div>

      <ul className="grid grid-cols-2 w-full max-h-[600px] overflow-y-auto pt-6 mb-16">
        {data?.map((product) => (
          <li
            key={product.id}
            className="w-[182px] h-[244px] flex flex-col mx-auto"
            onClick={() => navigate(`/product/${product.id}`)}
          >
            <div className="size-[182px] rounded-2xl overflow-hidden">
              <img className="size-full" src={product.images[0]} alt={product.name} />
            </div>
            <h2 className="max-w-36 overflow-x-auto font-medium">{product.name}</h2>
            <p className="text-md font-semibold">${product.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomeContainerProducts;