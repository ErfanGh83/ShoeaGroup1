
import React from 'react';
import axios from "axios";


function HomeContainerProducts() {
    const baseURL = "http://localhost:5173/Products/";

    const [post, setPost] = React.useState(null);

    React.useEffect(() => {
        axios.get(baseURL).then((response) => {
        setPost(response.data);
        });
    }, []);

    if (!post) return null;

  return (
    <div>
        <ul className="grid grid-cols-2 w-full max-h-[480px] overflow-y-auto pt-6 pb-36">
            {post.map((product)=>
                <li className='w-[182px] h-[244px] flex flex-col mx-auto'>
                <div className='size-[182px] rounded-2xl overflow-hidden'>
                    <img className='size-full' src={product.images}/>
                </div>

                <h2 className='max-w-36 overflow-x-auto font-medium'>
                    {product.title}
                </h2>

                <p className='text-sm'>
                    {product.price}
                </p>
            </li>
            )}
        </ul>
    </div>
  )
}

export default HomeContainerProducts