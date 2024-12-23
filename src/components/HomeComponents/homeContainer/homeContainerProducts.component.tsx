import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate } from 'react-router';

const fetchProducts = async (params: { brand: string[] }) => {
  const response = await axios.get('http://localhost:5173/Products', {
    params,
  });
  return response.data;
};

function Products() {
  const [filters, setFilters] = useState({
    brand: [] as string[],
    color: [] as string[],
    size: [] as string[],
  });
  const navigate = useNavigate();

  const toggleFilter = (filterType: string, filterValue: string) => {
    if (filterValue === 'all') {
      setFilters({
        brand: [],
        color: [],
        size: [],
      });
    } else {
      setFilters((prev) => {
        const updatedFilters = { ...prev };
        const updatedArray = updatedFilters[filterType].includes(filterValue)
          ? updatedFilters[filterType].filter((item) => item !== filterValue)
          : [...updatedFilters[filterType], filterValue];

        updatedFilters[filterType] = updatedArray;
        return updatedFilters;
      });
    }
  };

  const queryParams = {
    brand: filters.brand,
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ['products', queryParams],
    queryFn: () => fetchProducts(queryParams),
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const filteredProducts = data?.filter((product: {
    id: string;
    title: string;
    brand: string;
    color: string[];
    size: number[];
    price: number;
    images: string;
  }) => {
    const matchesBrand = filters.brand.length === 0 || filters.brand.includes(product.brand);
    const matchesColor =
      filters.color.length === 0 || product.color.some((col) => filters.color.includes(col));
    const matchesSize =
      filters.size.length === 0 || product.size.some((sz) => filters.size.includes(sz.toString()));

    return matchesBrand && matchesColor && matchesSize;
  });

  const brandFilterArray = ['all', 'adidas', 'nike', 'puma', 'asics'];
  const colorFilterArray = ['emerald', 'yellow', 'rose', 'red', 'gray', 'teal'];
  const sizeFilterArray = ['40', '41', '42', '43'];

  return (
    <div>
      <div className="filter-section flex flex-row overflow-x-auto">
        {brandFilterArray.map((brand) => (
          <button
            key={brand}
            onClick={() => toggleFilter('brand', brand)}
            className={`m-2 px-2 text-center rounded-3xl border-2 border-black ${
              filters.brand.length === 0 && brand === 'all' ? 'bg-black text-white' : filters.brand.includes(brand) ? 'bg-black text-white' : 'bg-white'
            }`}
          >
            {brand}
          </button>
        ))}

        {colorFilterArray.map((color) => (
          <button
            key={color}
            onClick={() => toggleFilter('color', color)}
            className={`m-2 px-2 text-center rounded-3xl border-2 border-black ${
              filters.color.includes(color) ? 'bg-black text-white' : 'bg-white'
            }`}
          >
            {color}
          </button>
        ))}

        {sizeFilterArray.map((size) => (
          <button
            key={size}
            onClick={() => toggleFilter('size', size)}
            className={`m-2 px-2 text-center rounded-3xl border-2 border-black ${
              filters.size.includes(size) ? 'bg-black text-white' : 'bg-white'
            }`}
          >
            {size}
          </button>
        ))}
      </div>

      <ul className="grid grid-cols-2 w-full max-h-[600px] overflow-y-auto pt-6 mb-16">
        {filteredProducts?.map((product: {
          id: string;
          title: string;
          brand: string;
          color: string[];
          size: number[];
          price: number;
          images: string;
        }) => (
          <li
            key={product.id}
            className="w-[182px] h-[244px] flex flex-col mx-auto"
            onClick={() => navigate(`/product/${product.id}`)}
          >
            <div className="size-[182px] rounded-2xl overflow-hidden">
              <img className="size-full" src={product.images} alt={product.title} />
            </div>
            <h2 className="max-w-36 overflow-x-auto font-medium">{product.title}</h2>
            <p className="text-md font-semibold">${product.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Products;
