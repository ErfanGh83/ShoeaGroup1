import { data, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { BiArrowBack, BiHeart, BiShoppingBag } from "react-icons/bi";
import { VscLoading } from "react-icons/vsc";
import { toast } from "react-toastify";
import { useCart, useProduct, useUser } from "../customHooks/useFetchData";
import { useUpdateCart, useUserInfo } from "../customHooks/useFetchData";
import ColorSelector from "../components/productComponents/colorSelector";
import SizeSelector from "../components/productComponents/sizeSelector";
import QuantitySelector from "../components/productComponents/quantitySelector";
import { useWishlist } from "../customHooks/useFetchData";
import { addToCart, toggleWishlist } from "../api/auth.api";

function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const [quantity, setQuantity] = useState(0)
  // const [userId, setUserId] = useState<number | null>(null);
  const { data: user} = useUser()
  const { data: product, isLoading: isProductLoading, isError: isProductError } = useProduct(id!);
  // const { data: cart } = useCart()
  // const { data: wishlist } = useWishlist({})

  // console.log(cart)
  console.log(product)

  const handleSubmit = () => {
    addToCart({
    productId: id,
    color: 'red',
    size: 41,
    count: quantity
    })
    
  }

  const toggleWish = () => {
    console.log('toggled')
    console.log({
      productId : Number(id)
    })
    toggleWishlist({
      productId: Number(id)
    })
  }
  // console.log(product)
  // const updateCartMutation = useUpdateCart(userId ? String(userId) : null);

  // const {
  //   user,
  //   quantity,
  //   selectedColor,
  //   selectedSize,
  //   setSelectedColor,
  //   setSelectedSize,
  //   setQuantity,
  //   userInfoMutation,
  // } = useUserInfo({ id, product });

  // const { isWished, toggleWishlist } = useWishlist(userId);

  // useEffect(() => {
  //   const storedUser = localStorage.getItem("user");
  //   if (storedUser) {
  //     const user = JSON.parse(storedUser);
  //     setUserId(user.id);
  //   }
  // }, []);

  // useEffect(() => {
  //   if (userId && id && !user) {
  //     userInfoMutation.mutate(userId);
  //   }
  // }, [userId, id]);

  const handleQuantityChange = (operation: "add" | "reduce") => {
    setQuantity((prev) => (operation === "add" ? prev + 1 : Math.max(prev - 1, 0)));
  };

  // const submitChanges = () => {
  //   if (!userId || !user) {
  //     toast.warn("Please login first!");
  //     return;
  //   }

  //   const updatedCart = [...user.cart];
  //   const productIndex = updatedCart.findIndex(
  //     (item) => item.id === id && item.color === selectedColor && item.size === selectedSize
  //   );

  //   if (productIndex !== -1) {
  //     if (quantity > 0) {
  //       updatedCart[productIndex].quantity = quantity;
  //     } else {
  //       updatedCart.splice(productIndex, 1);
  //     }
  //   } else if (quantity > 0) {
  //     updatedCart.push({
  //       id: id!,
  //       quantity,
  //       color: selectedColor!,
  //       size: selectedSize!,
  //     });
  //   }

  //   updateCartMutation.mutate(updatedCart, {
  //     onSuccess: () => {
  //       toast.success("Cart updated!");
  //     },
  //     onError: () => {
  //       toast.error("Failed to update cart.");
  //     },
  //   });
  // };

  if (isProductLoading) {
    return <VscLoading />;
  }

  if (isProductError || !product) {
    return <div>Error loading product</div>;
  }

  return (
    <div>
      <button onClick={() => window.history.back()} className="size-12 m-2 flex justify-center items-center absolute">
        <BiArrowBack size={30} />
      </button>
      <div className="w-full max-h-[450px] overflow-hidden">
        <img src={product.images[0]} alt={product.name} />
      </div>

      <div className="w-full h-fit py-2 my-2 flex flex-row items-center justify-between px-6">
        <h1 className="text-4xl font-bold">{product.name}</h1>
        <button onClick={() => toggleWish()}>
          <BiHeart size={30} color={product.isFavorite ? "red" : "black"} />
        </button>
      </div>
{/* 
      <div className="flex flex-row px-6 justify-between mt-2">
        <SizeSelector sizes={product.size} selectedSize={selectedSize} onSizeChange={setSelectedSize} />
        <ColorSelector colors={product.color} selectedColor={selectedColor} onColorChange={setSelectedColor} />
      </div> */}

      <div className="flex flex-row px-6 mt-8 items-center">
        <p className="text-2xl font-bold">Quantity</p>
        <QuantitySelector quantity={quantity || 0} onQuantityChange={handleQuantityChange} />
      </div>

      <hr className="mx-6 mt-6" />

      <div className="flex flex-row px-6 my-10 justify-between">
        <div>
          <p className="text-md text-gray-700 my-2">Price: ${product.price}</p>
          <p className="text-base text-gray-500 font-medium">Total price</p>
          <p className="text-2xl font-bold">${product.price * quantity || product.price}</p>
        </div>

        <button
          onClick={() => handleSubmit()}
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
