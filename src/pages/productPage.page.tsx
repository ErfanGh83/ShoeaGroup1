import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { BiHeart } from "react-icons/bi";
import { BiStar } from "react-icons/bi";
import axios from "axios";

function ProductPage() {
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState(null);

    useEffect(() => {
    axios.get(`  http://localhost:5173/Products/${id}`).then((response) => {
      setProduct(response.data);
    });
  }, [id]);

  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <div>
        <button onClick={()=>window.history.back()} className="size-12 m-2 flex justify-center items-center absolute">
            <BiArrowBack size={30}/>
        </button>
        <div className="w-full max-h-[400px] overflow-hidden">
            <img src={product.images}/>
        </div>

        <div className="w-full h-fit py-2 my-2 flex flex-row items-center justify-between px-6">
            <h1 className="text-4xl font-bold">
                {product.title}
            </h1>
            
            <button>
                <BiHeart size={30}/>
            </button>
        </div>

        <div className="w-full h-fit flex flex-row gap-4 py-2 px-6 items-center">
            <div className="flex flex-row w-fit px-2 h-8 rounded-md bg-gray-200">
                <p className="text-xs font-medium text-center text-gray-700 m-auto">
                    2345 sold
                </p>
            </div>

            <div>
                <BiStar size={24} />
            </div>

            <div>
                <p className="text-sm font-medium">
                    4.3 (5344 reviews)
                </p>
            </div>
        </div>

        <div className="w-full h-fit py-2 px-6 mt-6 flex flex-col">
            <h2 className="text-2xl font-bold">
                Description
            </h2>

            <p className="text-gray-600 my-2">
                    The key characteristics that set sneakers apart from
                other shoes are their flexible rubber soles, comfortable
                build, and often more casual, fashionable design.
                <button className="inline-block text-black mx-2 font-semibold">
                    View more...
                </button>
            </p>
        </div>
    </div>
  )
}

export default ProductPage