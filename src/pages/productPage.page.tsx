import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { BiHeart } from "react-icons/bi";
import { BiStar } from "react-icons/bi";
import { BiShoppingBag } from "react-icons/bi";
import { VscLoading } from "react-icons/vsc";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ProductPage() {
    const { id } = useParams<{ id: string }>();
    const [userId, setUserId] = useState(null);
    const [product, setProduct] = useState(null);
    const [user, setUser] = useState({});
    const [quantity, setQuantity] = useState(0);


    useEffect(() => {
        axios.get(`  http://localhost:5173/Products/${id}`).then((response) => {
        setProduct(response.data);
    });
    }, [id]);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");

        if (storedUser) {
            const user = JSON.parse(storedUser);
            setUserId(user.id);
        } else {
            setUserId(null);
        }
    }, []);

    useEffect(() => {
        if (userId !== null) {
            axios.get(`http://localhost:5173/users/${userId}`)
                .then((response) => {
                    setUser(response.data);

                    if (response.data.cart) {
                        for (let i = 0; i < response.data.cart.length; i++) {
                            if (response.data.cart[i].id === id) {
                                setQuantity(response.data.cart[i].quantity);
                                break;
                            }
                        }
                    }
                })
                .catch((error) => {
                    console.error("Error fetching user data:", error);
                });
        }
    }, [userId, id]); 


    const updateCart = (productId, newQuantity) => {
        if (!userId || !user) {
            toast.warn('please login first !');
            return;
        };

        const updatedCart = [...user.cart];

        const productIndex = updatedCart.findIndex(item => item.id === productId);
    
        if (productIndex !== -1) {
            if (newQuantity > 0) {
                updatedCart[productIndex].quantity = newQuantity;
            } else {
                updatedCart.splice(productIndex, 1);
            }
        } else if (newQuantity > 0) {
            updatedCart.push({ id: productId, quantity: newQuantity });
        }

        axios.put(`http://localhost:5173/users/${userId}`, { ...user, cart: updatedCart })
            .then((response) => {
                console.log("Cart updated successfully:", response.data);
                setUser({ ...user, cart: updatedCart }); // Update state
            })
            .catch((error) => {
                console.error("Error updating cart:", error);
            });
    };
    

  if (!product) {
    return (
        <div className="size-36 flex items-center justify-center m-auto animate-spin">
            <VscLoading size={36}/>
        </div>
    );
  }

  const add = () => {
    const count = quantity + 1;
    setQuantity(count)
  }

  const reduce = () => {
    const count = quantity > 0? quantity - 1 : 0;
    setQuantity(count)
  }

  const submitChanges = () => {
    updateCart(id, quantity)
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
                <button className="text-2xl" onClick={add}>
                    +
                </button>

                <p className="text-xl font-semibold">
                    {quantity}
                </p>

                <button className="text-2xl" onClick={reduce}>
                    -
                </button>
            </div>
        </div>

        <hr className="mx-6 mt-6" />

        <div className="flex flex-row px-6 my-10 justify-between">
            <div>
                <p className="text-base text-gray-500 font-medium">
                    Total price
                </p>

                <p className="text-2xl font-bold">
                    $259.99
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