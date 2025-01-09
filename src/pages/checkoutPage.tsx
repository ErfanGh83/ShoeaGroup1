import AddressComponent from "../components/checkout/addressComponent";
import DeliveryComponent from "../components/checkout/deliveryComponent";
import ActiveOrdersComponent from "../components/ordersComponents/activeOrdersComponent";

function CheckoutPage() {
  return (
    <div>
        <AddressComponent />
        <h2 className="ml-8 text-xl font-semibold">Orders List</h2>
        <ActiveOrdersComponent/>
        <DeliveryComponent />
    </div>
  )
}

export default CheckoutPage