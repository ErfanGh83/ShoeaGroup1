import { Link } from "react-router";
import AddressComponent from "../components/checkout/addressComponent";
import CheckoutCart from "../components/checkout/checkoutCart";
import DeliveryComponent from "../components/checkout/deliveryComponent";
import { useUser } from "../customHooks/useFetchData";

function CheckoutPage() {

  const { data: user } = useUser()

  if (!user) {
    return (
      <Link to={`/login`}>
        <div className="size-fit p-4 mx-auto text-center text-3xl text-blue-600">
          please login.
        </div>
      </Link>
    )
  }

  return (
    <div>
      <AddressComponent />
      <CheckoutCart />
      <DeliveryComponent />

      <Link to={`payment`}>
        <div className="w-[450px] h-[50px] rounded-3xl bg-black mx-4 text-white font-semibold text-xl flex items-center justify-center absolute bottom-2">
          Apply
        </div>
      </Link>
    </div>
  )
}

export default CheckoutPage