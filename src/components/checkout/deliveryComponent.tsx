import { useSelector } from "react-redux";
import { BsTruck } from "react-icons/bs";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { RootState } from "../../redux/store.redux";

function DeliveryComponent() {
  const activeDelivery = useSelector((state: RootState) => state.delivery.activeDelivery);

  return (
    <div className="px-8 my-4 flex flex-col">
      <h2 className="text-xl font-semibold">Choose Shipping</h2>

      <div className="w-full h-[100px] p-2 my-4 rounded-2xl shadow-md flex flex-row items-center">
        <div className="rounded-full p-2 border-8 border-gray m-4 bg-black">
          <BsTruck size={24} color="white" />
        </div>

        <div className="flex flex-col gap-2 w-[280px] overflow-hidden">
          <h3 className="w-full font-bold">
            {activeDelivery}
          </h3>
        </div>

        <div className="m-auto">
          <Link to={`/checkout/delivery`}>
            <FaArrowRight size={24} />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default DeliveryComponent;