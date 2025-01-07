import { useOrders } from '../../customHooks/useFetchData';
import { VscLoading } from 'react-icons/vsc';
import { BiError } from 'react-icons/bi';
import { Product } from '../../types/types';
import { Link } from 'react-router';

function CompletedOrdersComponent() {
    const {
        data: products,
        isError: isProductsError,
        isLoading: isProductsLoading,
    } = useOrders({ status: 'completed' });

    if (isProductsLoading) {
        return (
            <div className="size-36 flex items-center justify-center m-auto animate-spin">
                <VscLoading size={36} />
            </div>
        );
    }

    if (isProductsError) {
        return (
            <div className="size-fit p-2 flex flex-row mx-auto items-center gap-3">
                <BiError size={50} />
                <h1 className="text-center text-xl font-semibold mx-auto">
                    Something went wrong, please try again.
                </h1>
            </div>
        );
    }

    if (!products) {
        return (
            <div className="size-fit p-2 mx-auto my-4">
                <img
                    className="size-fit p-2 m-2"
                    src="/src/assets/images/empty_orders.webp"
                />
                <h1 className="text-center text-3xl font-semibold mx-auto">Empty :(</h1>
            </div>
        );
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
        <div>
            <ul>
                {products.map((product: Product) => (
                    <li key={product.productId} className="w-5/6 mx-auto my-8 rounded-3xl shadow-md p-2 flex flex-row gap-8">
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
                                    <li>|</li>
                                    <li>Qty={product.count}</li>
                                </ul>
                            </div>

                            <div className='w-[70px] h-[30px] rounded-md bg-gray-200 flex items-center justify-center'>
                                <p className='text-center text-gray-700 text-xs font-medium'>Completed</p>
                            </div>

                            <div className='w-full flex flex-row justify-between mt-2 items-center'>
                                <div>
                                    <p className='text-xl font-semibold'>${product.price}</p>
                                </div>

                                <div>
                                    <Link to={`/products/${product.productId}`}>
                                        <button className='w-fit h-[35px] px-4 rounded-2xl bg-black text-white m-1'>
                                            Leave Review
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default CompletedOrdersComponent;