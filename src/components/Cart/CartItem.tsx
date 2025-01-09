// import React, { useState } from "react";

// import { useDispatch } from "react-redux";
// import { CartActions } from "../../redux/slices/Cart.slice";
import { useCart } from "../../customHooks/useFetchData";
import { CartItem } from "../../types/types";
// import { CartItem as CartItemType } from "../../types/types";
// import { BiTrash } from "react-icons/bi";
// import { BiPlus } from "react-icons/bi";
// import { BiMinus } from "react-icons/bi";
// // import { useAppSelector } from "../../hook/redux.hook";
// import DeleteModal from "./DeleteModal";

// interface CartItemProps {
//   item: CartItemType;
// }

// const CartItem: React.FC<CartItemProps> = ({ item }) => {
//   const dispatch = useDispatch();
//   //   const cartItems = useAppSelector((state) => state.cart.item);

//   const handleQuantityChange = (quantity: number) => {
//     if (quantity <= 0) {
//       dispatch(CartActions.removeItem(item.id));
//     } else {
//       dispatch(CartActions.updateItemQuantity({ id: item.id, quantity }));
//     }
//   };

//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedItem, setSelectedItem] = useState<any>(null);

//   const handleOpenModal = (item: any) => {
//     setSelectedItem(item);
//     setIsModalOpen(true);
//   };

//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//     setSelectedItem(null);
//   };

//   const handleDelete = (id: string) => {
//     dispatch(CartActions.removeItem(id));
//     handleCloseModal();
//   };

//   return (
//     <div className="flex items-center justify-between h-auto bg-white p-4 rounded-lg shadow-md mb-4 relative">
//       <div className="flex items-center">
//         <img
//           src={item.images[1]}
//           alt={item.name}
//           className="w-28 h-28 object-cover rounded-lg"
//         />
//         <div className="ml-4 space-y-4">
//           <h3 className="text-lg font-medium">{item.name}</h3>
//           <p className="text-sm text-gray-500">
//             color ={item.color} | Size = {item.size}
//           </p>
//           <p className="text-lg font-bold text-gray-800">${item.price}</p>
//         </div>
//       </div>
//       <div className="flex items-center justify-center bg-gray-200 rounded-3xl p-1 mt-20">
//         <button
//           onClick={() => handleQuantityChange(item.quantity - 1)}
//           className="w-8 h-8 rounded-full flex items-center justify-center"
//         >
//           <BiMinus size={18} />
//         </button>
//         <span className="mx-2 text-lg font-semibold">{item.quantity}</span>
//         <button
//           onClick={() => handleQuantityChange(item.quantity + 1)}
//           className="w-8 h-8 rounded-full flex items-center justify-center"
//         >
//           <BiPlus size={18} />
//         </button>
//         <button
//           onClick={() => handleOpenModal(item)}
//           className="absolute top-5 right-5"
//         >
//           <BiTrash size={24} />
//         </button>
//       </div>
//       {isModalOpen && selectedItem && (
//         <DeleteModal
//           item={selectedItem}
//           isOpen={isModalOpen}
//           onClose={handleCloseModal}
//           onDelete={handleDelete}
//         />
//       )}
//     </div>
//   );
// };

// export default CartItem;

const CartItems: React.FC<CartItem> = () => {
  const { data, isError, isLoading } = useCart();
  if (isError) {
    return <div> ... error fetching data</div>;
  }
  if (isLoading) {
    return <div> ...loading</div>;
  }
  console.log(data);

  return <div></div>;
};

export default CartItems;
