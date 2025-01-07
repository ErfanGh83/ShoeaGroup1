import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { BiArrowBack, BiHeart, BiShoppingBag, BiStar } from "react-icons/bi";
import { VscLoading } from "react-icons/vsc";
import { toast } from "react-toastify";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useCart, useProduct, useUser, useWishlist } from "../customHooks/useFetchData";
import ColorSelector from "../components/productComponents/colorSelector";
import SizeSelector from "../components/productComponents/sizeSelector";
import QuantitySelector from "../components/productComponents/quantitySelector";
import { useDispatch } from "react-redux";
import { CartActions } from "../redux/slices/Cart.slice";
import { addToCart, toggleWishlist } from "../customHooks/useFetchData";
import { CartItem } from "../types/types";

const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const { data: user } = useUser();
  const { data: product, isLoading: isProductLoading, isError: isProductError } = useProduct(id!);
  const [quantity, setQuantity] = useState(0);
  const [selectedSize, setSelectedSize] = useState(41);
  const [selectedColor, setSelectedColor] = useState('red');
  const [isWished, setIsWished] = useState(false)
  const { data: wishlistArray } = useWishlist()
  const { data: cart } = useCart()

  const handleQuantityChange = (operation: "add" | "reduce") => {
    setQuantity((prev) => (operation === "add" ? prev + 1 : Math.max(prev - 1, 0)));
  };

  useEffect(() => {

    if (product) {
      console.log(product)
      setIsWished(wishlistArray?.some((item) => item.id === Number(id)) || false);
    }

    if (cart) {
      const cartItem = cart.find((item: CartItem) => item.productId == Number(id));

      if (cartItem) {
        setSelectedColor(cartItem.color)
        setSelectedSize(cartItem.size)
        setQuantity(cartItem.count);
      }else{
        setSelectedColor(product?.colors[0] || '')
        setSelectedSize(Number(product?.sizes[0]))
        setQuantity(0)
      }
    }
  }, [id, cart, product]);
  
  const dispatch = useDispatch();
  const handleSubmit = () => {
    addToCart({
      productId: Number(id),
      color: selectedColor,
      size: selectedSize,
      count: quantity
    })
    
    dispatch(
      CartActions.addItem({
        id: product?.id,
        name: product?.name,
        price: product?.price,
        quantity: quantity,
        images: product?.images,
      })
    );
  }

  const handleToggleWish = () => {
    if(user){
      toggleWishlist({
        productId: Number(id)
      })
      toast.success('Wishlist updated!')

      if(isWished){
        setIsWished(false)
      }
      else{
        setIsWished(true)
      }
    }
    else{
      toast.warn('Please login first')
    }
  }

  if (isProductLoading) {
    return <VscLoading />;
  }

  if (isProductError || !product) {
    return <div>Error loading product</div>;
  }

  return (
    <div>
      <button
        onClick={() => window.history.back()}
        className="size-12 m-2 flex justify-center items-center absolute z-10"
      >
        <BiArrowBack size={30} />
      </button>

      <Slider {...sliderSettings}>
        {product?.images.map((image, index) => (
          <div key={index}>
            <img className="w-full h-[500px]" src={image} alt={product?.name} />
          </div>
        ))}
      </Slider>

      <div className="w-full h-fit py-2 my-4 flex flex-row items-center justify-between px-6">
        <h1 className="text-4xl font-bold">{product.name}</h1>

        <button onClick={() => handleToggleWish()}>
          <BiHeart size={30} color={isWished ? "red" : "black"} />
        </button>
      </div>

      <div className="flex flex-row ">
        <div className="size-fit px-2 py-1 rounded-md flex justify-center items-center bg-gray-200 mx-4">
          <p className="text-sm font-medium text-gray-600">
            {product.sold_quantity} sold
          </p>
        </div>

        <div>
          <BiStar size={26}/>
        </div>

        <div className="mx-2 my-auto">
          <p className="font-medium text-gray-600">
            {product.rating} ({product.view_count} reviews)
          </p>
        </div>
      </div>

      <hr className="mx-6 mt-6" />

      <div className="w-11/12 mx-auto gap-4">
        <h2 className="text-xl font-semibold my-2">Description</h2>
        <p className="text-sm text-gray-600">{product.description}</p>
      </div>

      <div className="flex flex-row px-6 justify-between mt-2">
        <SizeSelector sizes={product.sizes} selectedSize={selectedSize} onSizeChange={setSelectedSize} />
        <ColorSelector colors={product.colors} selectedColor={selectedColor} onColorChange={setSelectedColor} />
      </div>

      <div className="flex flex-row px-6 mt-8 items-center">
        <p className="text-2xl font-bold">Quantity</p>
        <QuantitySelector quantity={quantity} onQuantityChange={handleQuantityChange} />
      </div>

      <hr className="mx-6 mt-6" />

      <div className="flex flex-row px-6 my-10 justify-between">
        <div>
          <p className="text-md text-gray-700 my-2">Price: ${product.price}</p>
          <p className="text-base text-gray-500 font-medium">Total price</p>
          <p className="text-2xl font-bold">${product.price * quantity || product.price}</p>
        </div>

        <button

          onClick={handleSubmit}
          className="w-[300px] h-[60px] flex flex-row items-center rounded-full bg-black text-white justify-center gap-2 shadow-sm"
        >
          <BiShoppingBag size={24} />
          <p className="text-2xl font-semibold">Add to cart</p>
        </button>
      </div>
    </div>
  );
}

export default ProductPage;