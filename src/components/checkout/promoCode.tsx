import { useEffect, useState } from "react";
import { useCart, useDiscount } from "../../customHooks/useFetchData";
import { BiPlus } from "react-icons/bi";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store.redux";

const PromoCode = () => {
  
  const [promoCode, setPromoCode] = useState<string>("");
  const [isApplied, setIsApplied] = useState<boolean>(false);
  const { data: discount, isFetching } = useDiscount(promoCode);
  const { data: cart } = useCart();
  const activeDelivery = useSelector((state: RootState) => state.delivery.activeDelivery);

  const [amount, setAmount] = useState(0)

  useEffect(()=>{
    if(cart){
      setAmount(cart.reduce(
      (acc, item) => acc + (item.price || 0) * (item.count || 0),
      0
    ));
    }
  }, [cart])

  const shipping = activeDelivery == 'Regular'? 10 : 30;
  const promoDiscount =
    isApplied && discount ? (amount * discount.discount) / 100 : 0;
  const total = amount + shipping - promoDiscount;

  const handleApplyCode = () => {
    if (!promoCode.trim()) {
      return;
    }
    if (discount) {
      setIsApplied(true);
    } else {
      console.log("Invalid code");
    }
  };

  const handleRemoveCode = () => {
    setPromoCode("");
    setIsApplied(false);
  };

  return (
    <div className="h-auto flex flex-col items-start justify-start pb-24 p-8 w-auto">
      <h3 className="text-lg font-semibold mb-4">Promo Code</h3>

      <div className="flex items-center space-x-2">
        {!isApplied ? (
          <>
            <input
              type="text"
              placeholder="Enter Promo Code"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              className="px-4 py-2 h-14 w-96 bg-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-300"
            />

            <button
              onClick={handleApplyCode}
              disabled={isFetching}
              className="w-12 h-12 flex items-center justify-center rounded-full bg-black text-white hover:bg-gray-800 focus:outline-none disabled:bg-gray-400"
            >
              <BiPlus size={14} />
            </button>
          </>
        ) : (
          <div className="flex items-center justify-between bg-black text-white px-4 py-2 rounded-full space-x-2 w-64 h-14">
            <span>{`Discount ${discount?.discount}% Off`}</span>
            <button
              onClick={handleRemoveCode}
              className="text-white hover:text-gray-300 focus:outline-none"
            >
              ×
            </button>
          </div>
        )}
      </div>

      <div className="w-screen max-w-sm bg-white rounded-lg shadow-lg p-6 mt-8 space-y-4">
        <div className="flex justify-between items-center mb-4">
          <span className="text-gray-700">Amount</span>
          <span className="text-gray-900 font-semibold">
            ${amount.toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between items-center mb-4">
          <span className="text-gray-700">Shipping</span>
          <span className="text-gray-900 font-semibold">
            ${shipping.toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between items-center mb-4">
          <span className="text-gray-700">Promo</span>
          <span className="text-red-500 font-semibold">
            - ${promoDiscount.toFixed(2)}
          </span>
        </div>
        <div className="border-t border-gray-300 my-4"></div>

        <div className="flex justify-between items-center">
          <span className="text-gray-900 font-bold text-lg">Total</span>
          <span className="text-gray-900 font-bold text-lg">
            ${total.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PromoCode;
