import { useCart } from "../../customHooks/useFetchData";
import { CartData } from "../../types/types";
type checkoutItem = CartData;

const CheckoutProducts: React.FC = () => {
  const { data: checkoutItem, isError } = useCart();

  if (isError) {
    return <div>... error fetching data</div>;
  }

  console.log(checkoutItem);
  return (
    <div>
      <h2 className="font-bold text-xl">Order List</h2>
      {checkoutItem?.map((item) => (
        <div key={item.productId}>
          <div className="flex items-center bg-gray-100 rounded-2xl p-4 shadow-sm h-auto mt-5">
            <img
              src={item.images[1]}
              alt={item.name}
              className="w-28 h-28 rounded-2xl mr-4"
            />
            <div className="flex flex-col items-center gap-3">
              <div className="flex flex-col gap-2">
                <p className="font-medium text-gray-800">{item.name}</p>
                <div className="flex gap-2">
                  <div className="w-6 h-6 rounded-full"></div>
                  <p className="text-sm text-gray-500">
                    color : {item.color} | size : {item.size}
                  </p>
                </div>
              </div>
              <div className="flex justify-between">
                <span className="font-bold text-xl"> ${item.price}</span>
                <div className=" w-8 h-8 rounded-full">
                  <span className="font-bold text-xl ml-52"> {item.count}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default CheckoutProducts;
