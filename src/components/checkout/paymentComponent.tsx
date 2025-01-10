import { BiWallet } from "react-icons/bi";
import { BiCreditCard } from "react-icons/bi";
import { BsPaypal } from "react-icons/bs";
import { BsGoogle } from "react-icons/bs";
import { Link } from "react-router";
import { useState } from "react";
import { addToOrders, useAddress, useCart } from "../../customHooks/useFetchData";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store.redux";

function PaymentComponent() {
    const activeDelivery = useSelector((state: RootState) => state.delivery.activeDelivery);

    const [activePayment, setActivePayment] = useState('Wallet')
    const { data: cart } = useCart()
    const { data: selectedAddress } = useAddress({ isSelected: 'true'})

    const handleAddToOrder = () => {
        addToOrders(
            {
                products: cart,
                address: selectedAddress.address,
                shippingType: activeDelivery,
                discount: 0
            }
        )
    }

    return (
        <div className="p-2">
            <div
                className={`w-full h-[100px] p-2 mx-auto my-4 rounded-2xl shadow-md flex flex-row items-center cursor-pointer ${activePayment === "Wallet" ? "bg-gray-200" : "bg-white"
                    }`}
                onClick={() => setActivePayment("Wallet")}
            >
                <div className="rounded-full p-2 border-8 border-gray m-4 bg-black">
                    <BiWallet size={24} color="white" />
                </div>

                <div className="w-full flex flex-row gap-2 overflow-hidden justify-between">
                    <h3 className="w-fit mx-2 font-bold">Wallet</h3>
                </div>
            </div>

            <div
                className={`w-full h-[100px] p-2 mx-auto my-4 rounded-2xl shadow-md flex flex-row items-center cursor-pointer ${activePayment === "PayPal" ? "bg-gray-200" : "bg-white"
                    }`}
                onClick={() => setActivePayment("PayPal")}
            >
                <div className="rounded-full p-2 border-8 border-gray m-4 bg-black">
                    <BsPaypal size={24} color="white" />
                </div>

                <div className="w-full flex flex-row gap-2 overflow-hidden justify-between">
                    <h3 className="w-fit mx-2 font-bold">PayPal</h3>
                </div>
            </div>

            <div
                className={`w-full h-[100px] p-2 mx-auto my-4 rounded-2xl shadow-md flex flex-row items-center cursor-pointer ${activePayment === "Google" ? "bg-gray-200" : "bg-white"
                    }`}
                onClick={() => setActivePayment("Google")}
            >
                <div className="rounded-full p-2 border-8 border-gray m-4 bg-black">
                    <BsGoogle size={24} color="white" />
                </div>

                <div className="w-full flex flex-row gap-2 overflow-hidden justify-between">
                    <h3 className="w-fit mx-2 font-bold">Google Play</h3>
                </div>
            </div>

            <div
                className={`w-full h-[100px] p-2 mx-auto my-4 rounded-2xl shadow-md flex flex-row items-center cursor-pointer ${activePayment === "CreditCard" ? "bg-gray-200" : "bg-white"
                    }`}
                onClick={() => setActivePayment("CreditCard")}
            >
                <div className="rounded-full p-2 border-8 border-gray m-4 bg-black">
                    <BiCreditCard size={24} color="white" />
                </div>

                <div className="w-full flex flex-row gap-2 overflow-hidden justify-between">
                    <h3 className="w-fit mx-2 font-bold">Credit Card</h3>
                </div>
            </div>

            <Link to={`/home`}>
                <button onClick={handleAddToOrder} className="w-[450px] h-[50px] rounded-3xl bg-black mx-4 text-white font-semibold text-xl flex items-center justify-center absolute bottom-2">
                    Apply
                </button>
            </Link>
        </div>
    );
}

export default PaymentComponent;