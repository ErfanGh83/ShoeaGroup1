import { Link } from "react-router"
import { useProducts } from "../customHooks/useFetchData"
import { BiArrowBack } from "react-icons/bi"

function MostPopularPage() {

    const { data: products } = useProducts({ is_popular: 'true' })

    return (
        <div>
            <div className='w-full flex flex-row items-center my-4'>
                <button className='size-12 mx-4' onClick={() => window.history.back()}>
                    <BiArrowBack size={30} />
                </button>

                <p className='text-4xl font-bold'>Most Popular</p>
            </div>

            <ul className="grid grid-cols-2 w-full h-fit p-2 overflow-y-auto pt-6 mb-16 justify-between">
                {products?.map((product) => (
                    <Link key={product.id} to={`/products/${product.id}`} >
                        <li className='w-fit h-fit p-2 flex flex-col mx-auto'>
                            <div className='size-[182px] rounded-2xl overflow-hidden'>
                                <img className='size-full' src={product.images[0]} />
                            </div>

                            <h2 className='w-full overflow-hidden text-lg text-center font-medium'>
                                {product.name}
                            </h2>

                            <p className='text-md text-center font-semibold'>
                                $ {product.price}
                            </p>
                        </li>
                    </Link>
                ))}
            </ul>
        </div>
    )
}

export default MostPopularPage