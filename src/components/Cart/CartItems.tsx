import { useState } from "react";
import {
  useCart,
  useDeleteCart,
  useUpdateCart,
} from "../../customHooks/useFetchData";
import DeleteModal from "../Cart/DeleteModal";
import { BiTrash } from "react-icons/bi";
import { BiPlus } from "react-icons/bi";
import { BiMinus } from "react-icons/bi";
import ColorDisplay from "./generateColor";

const CartItems = () => {
  const { data, isError, isLoading } = useCart();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const updateCart = useUpdateCart();
  const deleteCart = useDeleteCart();

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
  const handleOpenModal = (item: any) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };
  const handleDelete = (id: string) => deleteCart.mutate(id);
  return (
    <div className="h-[510px] overflow-y-scroll">
      {data?.map((item) => (
        <div className="flex flex-1 flex-col gap-4 h-40" key={item.productId}>
          <div className="flex items-center justify-between shadow-md rounded-2xl p-4 relative h-auto">
            <img
              src={item.images![0]}
              alt={item.name}
              className="w-28 h-28 object-cover rounded-2xl"
            />
            <div className="flex-1 mx-4 space-y-2">
              <h2 className="text-lg font-bold text-gray-900">{item.name}</h2>
              <div className="flex gap-2 items-center">
                {/* <div className="w-4 h-4 rounded-full ring-1"> */}
                <ColorDisplay color={item.color} />
                {/* </div> */}
                <span className="text-lg text-gray-500 font-semibold">
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
            <button
              className="absolute top-6 right-2"
              onClick={() => handleOpenModal(item)}
            >
              <BiTrash size={20} />
            </button>
          </div>
          {isModalOpen && selectedItem && (
            <DeleteModal
              item={selectedItem}
              isOpen={isModalOpen}
              onClose={handleCloseModal}
              onDelete={() => handleDelete(item.productId)}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default CartItems;
