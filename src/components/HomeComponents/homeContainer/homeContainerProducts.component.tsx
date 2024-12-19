import { useState, useEffect } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function HomeContainerProducts() {
  const baseURL = "http://localhost:5173/Products/";

  const navigate = useNavigate();

  const [post, setPost] = useState<any>(null);
  const [activeFilters, setActiveFilters] = useState<any>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const params = { ...activeFilters };

        if (Array.isArray(params.brand)) {
          params.brand = params.brand.join(',');
        }

        const response = await axios.get(baseURL, { params });
        setPost(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();
  }, [activeFilters]);

  const toggleFilter = (key: string, value: string | number) => {
    setActiveFilters((prevFilters: any) => {
      const newFilters = { ...prevFilters };

      if (key === 'brand') {
        if (!Array.isArray(newFilters[key])) {
          newFilters[key] = [];
        }

        if (newFilters[key].includes(value)) {
          newFilters[key] = newFilters[key].filter((item: any) => item !== value);
          if (newFilters[key].length === 0) {
            delete newFilters[key];
          }
        } else {
          newFilters[key].push(value);
        }
      } else {
        if (newFilters[key] === value) {
          delete newFilters[key];
        } else {
          newFilters[key] = value;
        }
      }

      return newFilters;
    });
  };

  if (!post) return null;

  return (
    <div>
      <div className="w-full tag-buttons flex flex-row gap-2 justify-normal overflow-x-auto">
        <button
          className="w-fit px-2 h-8 flex items-center text-center border-2 border-black rounded-3xl"
          onClick={() => setActiveFilters({})}
        >
          All
        </button>

        <button
          className={`w-fit px-2 h-8 flex items-center text-center border-2 border-black rounded-3xl ${
            activeFilters.brand?.includes('nike') ? 'bg-black text-white' : ''
          }`}
          onClick={() => toggleFilter('brand', 'nike')}
        >
          Nike
        </button>
        <button
          className={`w-fit px-2 h-8 flex items-center text-center border-2 border-black rounded-3xl ${
            activeFilters.brand?.includes('adidas') ? 'bg-black text-white' : ''
          }`}
          onClick={() => toggleFilter('brand', 'adidas')}
        >
          Adidas
        </button>
        <button
          className={`w-fit px-2 h-8 flex items-center text-center border-2 border-black rounded-3xl ${
            activeFilters.brand?.includes('asics') ? 'bg-black text-white' : ''
          }`}
          onClick={() => toggleFilter('brand', 'asics')}
        >
          Asics
        </button>

        <button
          className="w-fit px-2 h-8 flex items-center text-center border-2 border-black rounded-3xl"
          onClick={() => toggleFilter('color', 'rose')}
        >
          Rose
        </button>
        <button
          className="w-fit px-2 h-8 flex items-center text-center border-2 border-black rounded-3xl"
          onClick={() => toggleFilter('color', 'emerald')}
        >
          Emerald
        </button>
        <button
          className="w-fit px-2 h-8 flex items-center text-center border-2 border-black rounded-3xl"
          onClick={() => toggleFilter('size', 42)}
        >
          42
        </button>
        <button
          className="w-fit px-2 h-8 flex items-center text-center border-2 border-black rounded-3xl"
          onClick={() => toggleFilter('size', 41)}
        >
          41
        </button>
      </div>

      <div className="flex flex-row w-full mx-auto items-center gap-4">
        {Object.keys(activeFilters).length > 0 && <h2 className="text-xl font-semibold text-start">Active filters:</h2>}

        {activeFilters.brand &&
          activeFilters.brand.map((brand: string) => (
            <p
              key={brand}
              className="w-fit px-2 border-2 border-black rounded-3xl my-2 cursor-pointer"
              onClick={() => toggleFilter('brand', brand)}
            >
              {brand}
            </p>
          ))}
        {activeFilters.color && (
          <p
            className="w-fit px-2 border-2 border-black rounded-3xl my-2 cursor-pointer"
            onClick={() => toggleFilter('color', activeFilters.color)}
          >
            {activeFilters.color}
          </p>
        )}
        {activeFilters.size && (
          <p
            className="w-fit px-2 border-2 border-black rounded-3xl my-2 cursor-pointer"
            onClick={() => toggleFilter('size', activeFilters.size)}
          >
            {activeFilters.size}
          </p>
        )}
      </div>

      <ul className="grid grid-cols-2 w-full max-h-[600px] overflow-y-auto pt-6 mb-16">
        {post.map((product: any) => (
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

export default HomeContainerProducts;

