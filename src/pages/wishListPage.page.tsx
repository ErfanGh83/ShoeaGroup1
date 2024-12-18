import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { BiArrowBack } from "react-icons/bi";
import { BiHeartCircle } from "react-icons/bi";

function WishListPage() {
    const [userId, setUserId] = useState(null);
    const [user, setUser] = useState(null);
    const [products, setProducts] = useState([]);
    const [wishlistProducts, setWishlistProducts] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5173/Products')
            .then((response) => {
                setProducts(response.data);
            })
            .catch((error) => {
                console.error("Error fetching products:", error);
            });
    }, []);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const user = JSON.parse(storedUser);
            setUserId(user.id || null);
        } else {
            setUserId(null);
        }
    }, []);

    useEffect(() => {
        if (userId !== null) {
            axios.get(`http://localhost:5173/users/${userId}`)
                .then((response) => {
                    setUser(response.data);
                })
                .catch((error) => {
                    console.error("Error fetching user data:", error);
                });
        }
    }, [userId]);

    useEffect(() => {
        if (user && user.wishlist) {
            const filteredProducts = [];
            for(let i=0; i < user.wishlist.length; i++){
                for(let j=0; i < products.length; j++){
                    if(user.wishlist[i].id == products[j].id){
                        filteredProducts.push(products[j])
                        break;
                    }
                }
            }
            setWishlistProducts(filteredProducts);
        }
    }, [user, products]);

    const navigate = useNavigate()

    return (
        <div>
        <div className='w-full flex flex-row items-center my-4'>
            <button className='size-12 mx-4' onClick={()=>window.history.back()}>
                <BiArrowBack size={30}/>
            </button>

            <p className='text-4xl font-bold'>My Wishlist</p>
        </div>

        <ul className="grid grid-cols-2 w-full pt-6 mb-16">
            {wishlistProducts.map((product)=>
                <li key={product.id}  className='w-[182px] h-[244px] flex flex-col mx-auto' onClick={() => navigate(`/product/${product.id}`)}>
                
                <div className='size-[182px] rounded-2xl overflow-hidden flex flex-row-reverse'>
                    <div className="w-fit h-fit absolute">
                        <BiHeartCircle size={24}/>
                    </div>
                    <img className='size-full' src={product.images}/>
                </div>

                <h2 className='max-w-36 overflow-x-auto font-medium'>
                    {product.title}
                </h2>

                <p className='text-md font-semibold'>
                    $ {product.price}
                </p>
            </li>
            )}
        </ul>
    </div>
    );
}

export default WishListPage;
