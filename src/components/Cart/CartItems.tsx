import { useCart, useUpdateCart } from "../../customHooks/useFetchData";

import { BiTrash } from "react-icons/bi";
import { BiPlus } from "react-icons/bi";
import { BiMinus } from "react-icons/bi";

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

const CartItems = () => {
  const { data, isError, isLoading } = useCart();

  const updateCart = useUpdateCart();

  if (isError) {
    return <div> ... error fetching data</div>;
  }
  if (isLoading) {
    return <div> ...loading</div>;
  }
  const handleUpdateQuantity = (id: string, count: number) => {
    if (count < 1) return;
    console.log(id);

    const updateItem = data?.find((item) => item.productId === id);
    if (!updateItem) return;
    console.log({ ...updateItem, count });

    updateCart.mutate({ ...updateItem, count });
  };

  return (
    <div className="h-[510px] overflow-y-scroll">
      {data?.map((item) => (
        <div className="flex flex-1 flex-col gap-4 h-40">
          <div className="flex items-center justify-between shadow-md rounded-2xl p-4 relative h-auto">
            <img
              src={item.images![0]}
              alt={item.name}
              className="w-28 h-28 object-cover rounded-2xl"
            />
            <div className="flex-1 mx-4 space-y-2">
              <h2 className="text-lg font-bold text-gray-900">{item.name}</h2>
              <div className="flex gap-2 items-center">
                <div className="w-4 h-4 rounded-full ring-1"></div>
                <span className="text-lg">
                  {item.color} | Size : {item.size}
                </span>
              </div>
              <p className="text-xl font-bold text-gray-800">${item.price}</p>
            </div>
            <div className="flex h-10 w-28  items-center justify-between gap-4 bg-gray-200 rounded-full px-2 py-1 absolute bottom-4 right-3">
              <button
                onClick={() =>
                  handleUpdateQuantity(item.productId, (item.count || 1) - 1)
                }
              >
                <BiMinus size={18} />
              </button>
              <span className="text-lg font-bold text-gray-900">
                {item.count}
              </span>
              <button
                onClick={() =>
                  handleUpdateQuantity(item.productId, (item.count || 0) + 1)
                }
              >
                <BiPlus size={18} />
              </button>
            </div>
            <button className="absolute top-6 right-2">
              <BiTrash size={20} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartItems;
