import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CartPage from "../../../pages/cartPage";
import axios from "axios";

export const Api = axios.create({
  baseURL: "http://localhost:8000/",
});

export const BASE_URL="http://localhost:8000"
const SearchResults = () => {
    const { query } = useParams<{ query: string }>();
    const [products, setProducts] = useState<[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
   

    useEffect(() => {
      const fetchSearchResults = async () => {
        try {
          const response = await Api.get(`/products?title_like=${query}`);
          setProducts(response.data);
        } catch (error) {
          setError("Error fetching search results");
        } finally {
          setLoading(false);
        }
      };
  
      if (query) {
        fetchSearchResults();
      }
    }, [query]);
  
    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
  
    return (
      <div>
        <h2>Search Results for: {query}</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
          {products.length > 0 ? (
            products.map((item) => (
              <CartPage
                key={item.id}
                title={item.title}
                price={item.price}
                images={item.images}
                onClick={() => console.log(item.id)} 
              />
            ))
          ) : (
            <div>No products found</div>
          )}
        </div>
      </div>
    );
  };
  
  export default SearchResults