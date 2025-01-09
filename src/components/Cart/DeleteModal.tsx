import React from "react";
import { DeleteModalProps } from "../../types/types";

const DeleteModal: React.FC<DeleteModalProps> = ({
  item,
  isOpen,
  onClose,
  onDelete,
}) => {
  return (
    <div
      className={`fixed inset-0 z-50 flex items-end justify-center bg-black bg-opacity-5 ${
        isOpen ? "modal-enter" : "modal-exit"
      }`}
    >
      <div className="w-full h-auto bg-white rounded-t-3xl p-6 shadow-lg">
        <h2 className="text-lg font-bold text-center text-gray-800 mb-6">
          Remove From Cart?
        </h2>
        <div className="flex items-center gap-4 mb-6">
          <img
            src={item.images[0]}
            alt={item.name}
            className="w-24 h-24 rounded-md object-cover"
          />
          <div className="flex flex-col gap-2">
            <h3 className="text-gray-800 font-bold text-xl">{item.name}</h3>
            <p className="text-gray-600 text-lg">
              {item.color} | Size: {item.size}
            </p>
            <span className="text-gray-900 font-bold">${item.price}</span>
          </div>
        </div>
        <div className="flex justify-between gap-4">
          <button
            onClick={onClose}
            className="w-full py-3 rounded-full bg-gray-300 text-gray-700 font-semibold"
          >
            Cancel
          </button>
          <button
            onClick={() => onDelete(item.productId)}
            className="w-full py-3 rounded-full bg-black text-white font-semibold"
          >
            Yes, Remove
          </button>
        </div>
      </div>
    </div>
  );
};
export default DeleteModal;
