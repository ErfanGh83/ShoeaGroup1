import { useMemo } from "react";
import { useCart } from "../../customHooks/useFetchData";

const CartSummary = () => {
  const { data } = useCart();
  const totalPrice = useMemo(() => {
    return data?.reduce(
      (acc, item) => acc + (item.price || 0) * (item.count || 0),
      0
    );
  }, [data]);
  return (
    <div className="p-4 bg-white rounded-t-2xl max-h-28  w-full flex gap-10 items-center mt-4">
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
