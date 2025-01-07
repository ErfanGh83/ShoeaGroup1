import { useOrders } from '../../customHooks/useFetchData'
import { VscLoading } from 'react-icons/vsc'
import { BiError } from 'react-icons/bi'
import { Product } from '../../types/types'

function ActiveOrdersComponent() {
    const { data: products, isError: isProductsError, isLoading: isProductsLoading } = useOrders({ status : 'indelivery'})

    if (isProductsLoading) {
        return (<div className="size-36 flex items-center justify-center m-auto animate-spin">
            <VscLoading size={36} />
        </div>)
    }

    if (isProductsError) {
        return (<div className='size-fit p-2 flex flex-row mx-auto items-center gap-3'>
            <BiError size={50} />
            <h1 className='text-center text-xl font-semibold mx-auto'>Something went wrong, please try again.</h1>
        </div>
        )
    }

    if (!products) {
        return (
            <div className='size-fit p-2 mx-auto my-4'>
                <img className='size-fit p-2 m-2' src='/src/assets/images/empty_orders.webp' />
                <h1 className='text-center text-3xl font-semibold mx-auto'>Empty :(</h1>
            </div>
        )
    }

  return (
    <div>
        <ul>
            {products.map((product: Product) => (
                <li key={product.id}>
                    {product.name}
                </li>
            ))}
        </ul>
    </div>
  )
}

export default ActiveOrdersComponent