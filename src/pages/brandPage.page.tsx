import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { BiArrowBack } from 'react-icons/bi';
import { VscLoading } from 'react-icons/vsc';
import { useNavigate } from 'react-router-dom';

function BrandPage() {
    const navigate = useNavigate()

    const { brand } = useParams<{ brand: string }>();
    const [products, setProducts] = useState(null);

    useEffect(() => {
    axios.get(`  http://localhost:5173/Products?brand=${brand?.replace(/ /g,"")}`).then((response) => {
      setProducts(response.data);
    });
  }, [brand]);

  if (!products) {
    return (
    <div className="size-36 flex items-center justify-center m-auto animate-spin">
        <VscLoading size={36}/>
    </div>
    );
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
            {products.map((product)=>
                <li key={product.id}  className='w-[182px] h-[244px] flex flex-col mx-auto' onClick={() => navigate(`/product/${product.id}`)}>
                <div className='size-[182px] rounded-2xl overflow-hidden'>
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
  )
}

export default BrandPage