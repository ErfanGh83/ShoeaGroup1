import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store.redux";
import { Link } from "react-router";

const CartSummary: React.FC = () => {
  const totalPrice = useSelector((state: RootState) => state.cart.totalPrice);

  return (
    <div className="p-4 bg-white rounded-t-2xl min-h-28 w-screen flex gap-10 items-center mt-4">
      <div>
        <h2 className="text-lg font-bold">Total price:</h2>
        <p className="text-lg font-bold text-gray-800">${totalPrice}</p>
      </div>
      <Link to={`/checkout`}>
        <button className="bg-black text-white py-2 px-6 rounded-3xl w-72 h-14">
          Checkout
        </button>
      </Link>
        
    </div>
  );
};

export default CartSummary;
