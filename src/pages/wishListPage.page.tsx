import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { BiArrowBack } from "react-icons/bi";
import { useProducts, useUser } from "../customHooks/useFetchData";
import WishlistProducts from "../components/whislistComponents/wishistProducts"; // Assuming you have this component
import { Product, User } from "../types/types";

function WishListPage() {
    const [userId, setUserId] = useState<string | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [wishlistProducts, setWishlistProducts] = useState<Product[]>([]);

    const { data: products, error: productsError, isLoading: productsLoading } = useProducts();
    const { data: userData, error: userError, isLoading: userLoading } = useUser(userId);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const user: User = JSON.parse(storedUser);
            setUserId(user?.id || null);
        } else {
            setUserId(null);
        }
    }, []);

    useEffect(() => {
        if (userData) {
            setUser(userData);
        }
    }, [userData]);

    useEffect(() => {
        if (user && user.wishlist && products) {
            const filteredProducts = products.filter(product =>
                user.wishlist.some(wishlistItem => wishlistItem.id === product.id)
            );
            setWishlistProducts(filteredProducts);
        }
    }, [user, products]);

    const navigate = useNavigate();

    if (productsLoading || userLoading) return <div>Loading...</div>;
    if (productsError) return <div>Error fetching products: {productsError.message}</div>;
    if (userError) return <div>Error fetching user data: {userError.message}</div>;

    return (
        <div>
            <div className='w-full flex flex-row items-center my-4'>
                <button className='size-12 mx-4' onClick={() => window.history.back()}>
                    <BiArrowBack size={30} />
                </button>
                <p className='text-4xl font-bold'>My Wishlist</p>
            </div>
            <WishlistProducts products={wishlistProducts} navigate={navigate} />
        </div>
    );
}

export default WishListPage;