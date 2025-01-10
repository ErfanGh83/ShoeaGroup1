import { BiSearch } from "react-icons/bi";
import CartItems from "../components/Cart/CartItems";
import CartSummary from "../components/Cart/CartSummary";

const CartPage = () => {
  return (
    <div className="flex flex-col h-screen bg-gray-100 p-4 pb-12 pt-6">
      <header className="flex justify-between items-center p-4 bg-gray-100  mb-4">
        <div className="flex gap-2">
          <img src="src/assets/logo-black.svg" alt="" className="w-10 h-10" />
          <h1 className="text-2xl font-bold">My Cart</h1>
        </div>
        <button>
          <BiSearch size={28} />
        </button>
      </header>
      <CartItems />
      <div className="w-fit flex mx-auto fixed bottom-16">
        <CartSummary />
      </div>
    </div>
  );
};

export default CartPage;
