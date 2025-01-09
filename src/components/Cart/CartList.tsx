import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store.redux";
import CartItem from "./CartItem";
import { useCart } from "../../customHooks/useFetchData";

const CartList: React.FC = () => {
  const cartItems = useSelector((state: RootState) => state.cart.item);
  const { data: cart } = useCart();

  if(!cart){
    return(
      <div>loading</div>
    )
  }

  return (
    <div className="">
      {cart.map((item) => (
        <CartItem key={item.id} item={item} />
      ))}
    </div>
  );
};

export default CartList;
