import { useDispatch, useSelector } from "react-redux";
import { BsTruck } from "react-icons/bs";
import { FaPlane } from "react-icons/fa";
import { RootState } from "../../redux/store.redux";
import { setActiveDelivery } from "../../redux/slices/deliverySlice";
import { Link } from "react-router";

function ChangeDelivery() {
  const dispatch = useDispatch();
  const activeDelivery = useSelector((state: RootState) => state.delivery.activeDelivery);

  return (
    <div className="p-2">
      <div
        className={`w-full h-[100px] p-2 mx-auto my-4 rounded-2xl shadow-md flex flex-row items-center cursor-pointer ${
          activeDelivery === "Regular" ? "bg-gray-200" : "bg-white"
        }`}
        onClick={() => dispatch(setActiveDelivery("Regular"))}
      >
        <div className="rounded-full p-2 border-8 border-gray m-4 bg-black">
          <BsTruck size={24} color="white" />
        </div>

        <div className="flex flex-col gap-2 w-[280px] overflow-hidden">
          <h3 className="w-full font-bold">Regular</h3>
          <p className="w-full text-sm text-gray-400 overflow-hidden text-ellipsis whitespace-nowrap">
            Estimated Arrival, Dec 25-26
          </p>
        </div>
      </div>

      <div
        className={`w-full h-[100px] p-2 mx-auto my-4 rounded-2xl shadow-md flex flex-row items-center cursor-pointer ${
          activeDelivery === "Express" ? "bg-gray-200" : "bg-white"
        }`}
        onClick={() => dispatch(setActiveDelivery("Express"))}
      >
        <div className="rounded-full p-2 border-8 border-gray m-4 bg-black">
          <FaPlane size={24} color="white" />
        </div>

        <div className="flex flex-col gap-2 w-[280px] overflow-hidden">
          <h3 className="w-full font-bold">Express</h3>
          <p className="w-full text-sm text-gray-400 overflow-hidden text-ellipsis whitespace-nowrap">
            Estimated Arrival, Dec 23-24
          </p>
        </div>
      </div>

      <Link to={`/checkout`}>
        <div className="w-full h-[50px] rounded-3xl bg-black text-white font-semibold text-xl flex items-center justify-center">
          Apply
        </div>
      </Link>
    </div>
  );
}

export default ChangeDelivery;