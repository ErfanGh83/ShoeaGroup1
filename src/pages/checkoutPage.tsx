import AddressComponent from "../components/checkout/addressComponent";
import DeliveryComponent from "../components/checkout/deliveryComponent";

function CheckoutPage() {
  return (
    <div>
        <AddressComponent />
        <DeliveryComponent />
    </div>
  )
}

export default CheckoutPage