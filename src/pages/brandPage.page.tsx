import { Link, useParams } from 'react-router-dom';
import { BiArrowBack } from 'react-icons/bi';
import { VscLoading } from 'react-icons/vsc';
import { useProducts } from '../customHooks/useFetchData';

function BrandPage() {

    const { brand } = useParams<{ brand: string }>();

    const { data, isLoading, error } = useProducts({brands : brand?.replace(' ', '')});

    if (isLoading) return(
      <div className="size-36 flex items-center justify-center m-auto animate-spin">
        <VscLoading size={36}/>
      </div>
    );
    if (error){
      if(error.message == 'Request failed with status code 404'){
        return(<div className="mx-auto my-6">
          <h2 className="text-center text-6xl font-bold">404</h2>
          <h2 className="text-center text-3xl font-bold">Not Found !</h2>
        </div>)
      }
      return(
        <div>{error.message}</div>
      )
    }

  return (
    <div>
        <div className='w-full flex flex-row items-center my-4'>
            <button className='size-12 mx-4' onClick={()=>window.history.back()}>
                <BiArrowBack size={30}/>
            </button>

            <p className='text-4xl font-bold'>{brand.charAt(0).toUpperCase() + brand.slice(1)}</p>
        </div>

        <ul className="grid grid-cols-2 w-full pt-6 mb-16">
            {data.map((product)=>
            <Link key={product.id} to={`/products/${product.id}`} >
                <li  className='w-[182px] h-[244px] flex flex-col mx-auto'>
                    <div className='size-[182px] rounded-2xl overflow-hidden'>
                        <img className='size-full' src={product.images[0]}/>
                    </div>

                    <h2 className='w-full overflow-hidden text-lg text-center font-medium'>
                        {product.name}
                    </h2>

                    <p className='text-md text-center font-semibold'>
                        $ {product.price}
                    </p>
                </li>
            </Link>
                
            )}
        </ul>
    </div>
  )
}

export default BrandPage