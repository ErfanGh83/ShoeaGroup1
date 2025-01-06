import { BiArrowBack } from "react-icons/bi";
import { useUser, useWishlist } from "../customHooks/useFetchData";
import WishlistProducts from "../components/whislistComponents/wishistProducts";
import { VscLoading } from "react-icons/vsc";
import { useEffect } from "react";

function WishListPage() {
    const { data: user } = useUser();
    const { data: wishlistProducts, isError: isProductError, isLoading: isProductLoading } = useWishlist();

    if (isProductLoading) {
        return (
            <div className="flex justify-center items-center h-full">
                <VscLoading size={36} className="animate-spin" />
            </div>
        );
    }

    if (isProductError) {
        return (<div>
            <div className="mx-auto my-8 text-center flex flex-col">
                <button className="size-12 mx-4" onClick={() => window.history.back()}>
                    <BiArrowBack size={30} />
                </button>
                <h1 className="text-4xl">Error loading the wishlist</h1>
            </div>
        </div>)
    }

    if (!wishlistProducts || wishlistProducts.length === 0) {
        return (
            <div className="mx-auto my-8 text-center flex flex-col">
                <button className="size-12 mx-4" onClick={() => window.history.back()}>
                    <BiArrowBack size={30} />
                </button>
                <h1 className="text-6xl">Empty.</h1>
            </div>
        );
    }

    return (
        <div>
            <div className="w-full flex flex-row items-center my-4">
                <button className="size-12 mx-4" onClick={() => window.history.back()}>
                    <BiArrowBack size={30} />
                </button>
                <p className="text-4xl font-bold">My Wishlist</p>
            </div>
            <WishlistProducts products={wishlistProducts} />
        </div>
    );
}

export default WishListPage;