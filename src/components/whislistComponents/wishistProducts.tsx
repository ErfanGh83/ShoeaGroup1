import React from "react";
import { Product } from "../../types/types";
import { BiHeartCircle } from "react-icons/bi";

interface WishlistProductsProps {
    products: Product[];
    navigate: (path: string) => void;
}

const WishlistProducts: React.FC<WishlistProductsProps> = ({ products, navigate }) => {
    return (
        <ul className="grid grid-cols-2 w-full pt-6 mb-16">
            {products.map((product) => (
                <li key={product.id} className='w-[182px] h-[244px] flex flex-col mx-auto' onClick={() => navigate(`/product/${product.id}`)}>
                    <div className='size-[182px] rounded-2xl overflow-hidden flex flex-row-reverse'>
                        <div className="w-fit h-fit absolute">
                            <BiHeartCircle size={24} />
                        </div>
                        <img className='size-full' src={product.images} />
                    </div>
                    <h2 className='max-w-36 overflow-x-auto font-medium'>
                        {product.title}
                    </h2>
                    <p className='text-md font-semibold'>
                        $ {product.price}
                    </p>
                </li>
            ))}
        </ul>
    );
};

export default WishlistProducts;