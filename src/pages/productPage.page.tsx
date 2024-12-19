import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { BiArrowBack, BiHeart, BiStar, BiShoppingBag } from "react-icons/bi";
import { VscLoading } from "react-icons/vsc";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useMutation } from "@tanstack/react-query";
import { useProduct } from "../api/query";
import axios from "axios";

interface User {
  id: number;
  cart: { id: string; quantity: number }[];
  wishlist: { id: string }[];
}

function ProductPage() {
    const { id } = useParams<{ id: string }>();
    const [userId, setUserId] = useState<number | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [quantity, setQuantity] = useState(0);
    const [isWished, setIsWished] = useState(false);
  
    const { data: product, isLoading: isProductLoading, isError: isProductError } = useProduct(id!);
  
    const userInfoMutation = useMutation({
      mutationFn: (userId: number) =>
        axios.get(`http://localhost:5173/users/${userId}`).then((res) => res.data),
      onSuccess: (data: User) => {
        setUser(data);
        const cartItem = data.cart.find((item) => item.id === id);
        setQuantity(cartItem ? cartItem.quantity : 0);
  
        const isInWishlist = data.wishlist.some((item) => item.id === id);
        setIsWished(isInWishlist);
      },
      onError: () => {
        toast.error("Failed to fetch user information.");
      },
    });
  
    useEffect(() => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const user = JSON.parse(storedUser);
        setUserId(user.id);
      }
    }, []);
  
    useEffect(() => {
      if (userId !== null) {
        userInfoMutation.mutate(userId);
      }
    }, [userId]);
  
    const updateUserData = async (updatedData: { cart?: any[]; wishlist?: any[] }) => {
      try {
        const updatedUser = { ...user, ...updatedData };
        await axios.put(`http://localhost:5173/users/${userId}`, updatedUser);
        setUser(updatedUser);
        toast.success("Cart updated !");
      } catch (error) {
        console.error("Error updating user data:", error);
        toast.error("Failed to update user data.");
      }
    };
  
    const updateCart = (newQuantity: number) => {
      if (!userId || !user) {
        toast.warn('Please login first!');
        return;
      }
  
      const updatedCart = [...user.cart];
      const productIndex = updatedCart.findIndex((item) => item.id === id);
  
      if (productIndex !== -1) {
        if (newQuantity > 0) {
          updatedCart[productIndex].quantity = newQuantity;
        } else {
          updatedCart.splice(productIndex, 1);
        }
      } else if (newQuantity > 0) {
        updatedCart.push({ id, quantity: newQuantity });
      }
  
      updateUserData({ cart: updatedCart });
    };
  
    const toggleWishlist = () => {
      if (!userId || !user) {
        toast.warn('Please login first!');
        return;
      }
  
      const updatedWishlist = [...user.wishlist];
      const productIndex = updatedWishlist.findIndex((item) => item.id === id);
  
      if (productIndex !== -1) {
        updatedWishlist.splice(productIndex, 1);
        setIsWished(false);
      } else {
        updatedWishlist.push({ id });
        setIsWished(true);
      }
  
      updateUserData({ wishlist: updatedWishlist });
    };
  
    const handleQuantityChange = (operation: "add" | "reduce") => {
      setQuantity((prev) => {
        const newQuantity = operation === "add" ? prev + 1 : prev > 0 ? prev - 1 : 0;
        return newQuantity;
      });
    };

    const submitChanges = () => {
        updateCart(quantity);
      };
  
    if (isProductLoading) {
      return <VscLoading />;
    }
  
    if (isProductError) {
      return <div>Error loading product</div>;
    }

  return (
    <div>
        <button onClick={()=>window.history.back()} className="size-12 m-2 flex justify-center items-center absolute">
            <BiArrowBack size={30}/>
        </button>
        <div className="w-full max-h-[450px] overflow-hidden">
            <img src={product.images}/>
        </div>

        <div className="w-full h-fit py-2 my-2 flex flex-row items-center justify-between px-6">
            <h1 className="text-4xl font-bold">
                {product.title}
            </h1>
            
            <button onClick={toggleWishlist}>
                <BiHeart size={30} color={isWished ? "red" : "black"} />
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

        <div className="flex flex-row px-6 justify-between mt-2">
            <div className="flex flex-col w-1/2">
                <p className="text-2xl font-bold">
                    Size
                </p>

                <ul className="w-11/12 h-fit py-2 flex flex-row gap-4 overflow-x-scroll">
                    <li className="size-10 rounded-full border-2 border-black items-center">
                        <p className="size-10 px-2 pt-1 font-bold">
                            42
                        </p>
                    </li>

                    <li className="size-10 rounded-full border-2 border-black items-center">
                        <p className="size-10 px-2 pt-1 font-bold">
                            43
                        </p>
                    </li>

                    <li className="size-10 rounded-full border-2 border-black items-center">
                        <p className="size-10 px-2 pt-1 font-bold">
                            44
                        </p>
                    </li>
                    
                </ul>
            </div>

            <div className="flex flex-col w-1/2">
                <p className="text-2xl font-bold">
                    Color
                </p>

                <ul className="w-11/12 h-fit py-2 flex flex-row gap-4 overflow-x-scroll">
                    <li className="size-10 rounded-full bg-red-600 shadow-md">
                        <p className="size-10 px-2 pt-1 font-bold ">
                            
                        </p>
                    </li>

                    <li className="size-10 rounded-full bg-blue-600 shadow-md">
                        <p className="size-10 px-2 pt-1 font-bold ">
                            
                        </p>
                    </li>

                    <li className="size-10 rounded-full bg-green-600 shadow-md">
                        <p className="size-10 px-2 pt-1 font-bold ">
                            
                        </p>
                    </li>

                    <li className="size-10 rounded-full bg-white shadow-md">
                        <p className="size-10 px-2 pt-1 font-bold ">
                            
                        </p>
                    </li>

                    <li className="size-10 rounded-full bg-purple-600 shadow-md">
                        <p className="size-10 px-2 pt-1 font-bold ">
                            
                        </p>
                    </li>
                    
                </ul>
            </div>
        </div>

        <div className="flex flex-row px-6 mt-8 items-center ">
            <p className="text-2xl font-bold">Qauntity</p>

            <div className="w-[150px] h-[50px] flex flex-row justify-evenly items-center rounded-full mx-4 bg-gray-200 shadow-lg">
                <button className="text-2xl" onClick={() => handleQuantityChange("add")}>
                    +
                </button>

                <p className="text-xl font-semibold">
                    {quantity}
                </p>

                <button className="text-2xl" onClick={() => handleQuantityChange("reduce")}>
                    -
                </button>
            </div>
        </div>

        <hr className="mx-6 mt-6" />

        <div className="flex flex-row px-6 my-10 justify-between">
            <div>
                <p className="text-md text-gray-700 my-2">Price: ${product.price}</p>
                <p className="text-base text-gray-500 font-medium">
                    Total price
                </p>

                <p className="text-2xl font-bold">
                    ${product.price * quantity}
                </p>
            </div>

            <button onClick={submitChanges} className="w-[300px] h-[60px] flex flex-row items-center rounded-full bg-black text-white justify-center gap-2 shadow-sm">
                <BiShoppingBag size={24}/>
                <p  className="text-2xl font-semibold">Add to cart</p>
            </button>
        </div>
    </div>
  )
}

export default ProductPage