import { BiArrowBack } from "react-icons/bi";
import { useUser, useWishlist } from "../customHooks/useFetchData";
import WishlistProducts from "../components/whislistComponents/wishistProducts";
import { VscLoading } from "react-icons/vsc";


function WishListPage() {

    const { data: user } = useUser()
    const { data: wishlistProducts, isError: isProductError, isLoading: isProductLoading } = useWishlist()

    if (isProductLoading) {
        return <VscLoading />;
    }

    if (isProductError) {
        return <div>Error loading product</div>;
    }

    if(!wishlistProducts){
        return(
            <div className="mx-auto my-8 text-center">
                <h1 className="text-6xl">Empty .</h1>
            </div>
        )
    }


    return (
        <div>
            <div className='w-full flex flex-row items-center my-4'>
                <button className='size-12 mx-4' onClick={() => window.history.back()}>
                    <BiArrowBack size={30} />
                </button>
                <p className='text-4xl font-bold'>My Wishlist</p>
            </div>
            <WishlistProducts products={wishlistProducts} />
        </div>
    );
}

export default WishListPage;