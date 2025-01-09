import { Link } from "react-router"
import { useCart, useUser } from "../../customHooks/useFetchData"

function CheckoutCart() {

    const { data: products } = useCart()

    if (!products) {
        return (
            <div className="text-center text-3xl">
                no products in the cart
            </div>
        )
    }

    const colorClasses: { [key: string]: string } = {
        red: 'bg-red-600',
        blue: 'bg-blue-600',
        green: 'bg-green-600',
        yellow: 'bg-yellow-600',
        purple: 'bg-purple-600',
        rose: 'bg-rose-600',
        emerald: 'bg-emerald-600',
        gray: 'bg-gray-600',
    };

    return (
        <div className="p-8">
            <h2 className="text-xl font-semibold">Order List</h2>

            <ul>
                {products.map((product) => (
                    <li key={product.productId} className="w-full mx-auto my-8 rounded-3xl shadow-md p-2 flex flex-row gap-6 justify-evenly items-center">
                        <div className="size-32 rounded-2xl overflow-hidden">
                            <img className="size-fit" src={`${product.images[0]}`} />
                        </div>

                        <div className="w-[240px] flex flex-col">
                            <div>
                                <h2 className="text-xl font-semibold">{product.name}</h2>
                            </div>

                            <div className="w-fit my-1 text-gray-500 font-medium">
                                <ul className="w-full flex flex-row gap-2 items-center">
                                    <li
                                        className={`rounded-full size-4 ${colorClasses[product.color.toLowerCase()] || 'bg-gray-600'
                                            }`}
                                    ></li>
                                    <li>{product.color}</li>
                                    <li>|</li>
                                    <li>size={product.size}</li>
                                </ul>
                            </div>

                            <div className='w-[70px] h-[30px] rounded-md bg-gray-200 flex items-center justify-center'>
                                <p className='text-center text-gray-700 text-xs font-medium'>In Delivery</p>
                            </div>

                            <div className='w-full flex flex-row justify-between mt-2 items-center'>
                                <div>
                                    <p className='text-xl font-semibold'>${product.price}</p>
                                </div>

                                <div>
                                    <Link to={`/products/${product.productId}`}>
                                        <button className='w-fit h-[35px] px-4 rounded-2xl bg-black text-white m-1'>
                                            {product.count}
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default CheckoutCart