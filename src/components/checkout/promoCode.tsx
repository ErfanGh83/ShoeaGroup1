import { useState } from "react";
import { useDiscount } from "../../customHooks/useFetchData";
import { BiPlus } from "react-icons/bi";
const PromoCode = () => {
  const [promoCode, setPromoCode] = useState<string>("");
  const [isApplied, setIsApplied] = useState<boolean>(false);
  const { data: discount, isFetching } = useDiscount(promoCode);

  const handleApplyCode = () => {
    if (!promoCode.trim()) {
      return;
    }

    if (discount) {
      setIsApplied(true);
    } else {
      console.log("invalid code");
    }
  };

  const handleRemoveCode = () => {
    setPromoCode("");
    setIsApplied(false);
  };

  return (
    <div className="h-screen flex flex-col items-start justify-start p-8">
      <h3 className="text-lg font-semibold mb-4">Promo Code</h3>

      <div className="flex items-center space-x-2">
        {!isApplied ? (
          <>
            <input
              type="text"
              placeholder="Enter Promo Code"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              className="px-4 py-2 h-14 w-96  bg-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-300"
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

      {isApplied && (
        <div className="mt-4">
          <p className="text-gray-700">Code: {discount?.code}</p>
        </div>
      )}
    </div>
  );
};

export default PromoCode;
