import React from "react";
import CartList from "../components/Cart/CartList";
import CartSummary from "../components/Cart/CartSummary";
import { BiSearch } from "react-icons/bi";

const CartPage: React.FC = () => {
  return (
    <div className="flex flex-col h-screen bg-gray-100 p-4 pb-12 pt-6">
      <header className="flex justify-between items-center p-4 bg-gray-100  mb-4">
        <div className="flex gap-2">
          <img src="../assets/logo-black.svg" alt="" className="w-10 h-10" />
          <h1 className="text-2xl font-bold">My Cart</h1>
        </div>
        <button>
          <BiSearch size={28} />
        </button>
      </header>
      <div className="flex-1 overflow-auto custom-scrollbar">
        <CartList />
      </div>
      <div className="flex items-center w-full">
        <CartSummary />
      </div>
    </div>
  );
};

export default CartPage;
