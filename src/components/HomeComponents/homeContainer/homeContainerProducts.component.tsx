import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useProducts } from "../../../customHooks/useFetchData";
import { VscLoading } from "react-icons/vsc";
import { BiArrowBack } from "react-icons/bi";

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

  if (isLoading) return (
    <div className="size-36 flex items-center justify-center m-auto animate-spin">
      <VscLoading size={36} />
    </div>
  );
  if (error) {
    if (error.message == 'Request failed with status code 404') {
      return (<div className="mx-auto my-6 flex flex-col">
        <h2 className="text-center text-xl font-bold">No products found with the selected combination of filters!</h2>
        <button className="rounded-full border-black border-2 size-fit p-4 mx-auto my-4" onClick={() => setFilters({
          brands: [],
          colors: [],
          sizes: [],
        })}><BiArrowBack size={24}/>
        </button>
      </div>)
    }
    return (
      <div className="flex flex-col">
        <div>{error.message}</div>
        <button className="rounded-full border-black border-2 size-fit p-4 mx-auto my-4" onClick={() => setFilters({
          brands: [],
          colors: [],
          sizes: [],
        })}><BiArrowBack size={24}/>
        </button>
      </div>
    )
  }

  return (
    <div className="px-2">
        <Link to={`/mostpopular`}>
          <div className='m-4'>
            <h2 className="text-xl font-bold">Most Popular</h2>
          </div>
        </Link>
          
      <div className="size-fit flex flex-col mx-4 mt-4 font-semibold text-md">
        <div className="flex flex-wrap gap-2 mb-4">
          <h3 className="mr-2">Brands:</h3>
            <ul className="flex flex-row overflow-x-auto w-[330px] gap-x-2">
              {["nike", "adidas", "puma", "asics", "newbalance", "reebok", "converse"].map((brand) => (
              <button
                key={brand}
                onClick={() => handleFilterChange("brands", brand)}
                className={`px-4 py-2 rounded-full border ${filters.brands.includes(brand) ? "bg-black text-white" : "bg-white text-black"}`}
              >
                {brand}
              </button>
            ))}
            </ul>
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          <h3 className="mr-2">Colors:</h3>
          <ul className="flex flex-row overflow-x-auto w-[330px] gap-x-2">
            {["red", "emerald", "rose", "teal"].map((color) => (
            <button
              key={color}
              onClick={() => handleFilterChange("colors", color)}
              className={`px-4 py-2 rounded-full border ${filters.colors.includes(color) ? "bg-black text-white" : "bg-white text-black"}`}
            >
              {color}
            </button>
          ))}
          </ul>
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          <h3 className="mr-2">Sizes:</h3>
          <ul className="flex flex-row overflow-x-auto w-[330px] gap-x-2">
            {["40", "41", "42", "43"].map((size) => (
            <button
              key={size}
              onClick={() => handleFilterChange("sizes", size)}
              className={`px-4 py-2 rounded-full border ${filters.sizes.includes(size) ? "bg-black text-white" : "bg-white text-black"}`}
            >
              {size}
            </button>
          ))}
          </ul>
        </div>
      </div>
        

      <ul className="grid grid-cols-2 w-full h-fit p-2 overflow-y-auto pt-6 mb-16 justify-between">
        {data?.map((product) => (
          <Link key={product.id} to={`/products/${product.id}`} >
            <li className='w-fit h-fit p-2 flex flex-col mx-auto'>
              <div className='size-[182px] rounded-2xl overflow-hidden'>
                <img className='size-full' src={product.images[0]} />
              </div>

              <h2 className='w-full overflow-hidden text-lg text-center font-medium'>
                {product.name}
              </h2>

              <p className='text-md text-center font-semibold'>
                $ {product.price}
              </p>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default HomeContainerProducts;