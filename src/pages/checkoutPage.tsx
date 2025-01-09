import AddressComponent from "../components/checkout/addressComponent";
import CheckoutCart from "../components/checkout/checkoutCart";
import DeliveryComponent from "../components/checkout/deliveryComponent";

function CheckoutPage() {
  return (
    <div>
        <AddressComponent />
        <CheckoutCart />
        <DeliveryComponent />
    </div>
  )
}

export default CheckoutPage