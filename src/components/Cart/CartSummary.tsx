const CartSummary = () => {
  return (
    <div className="p-4 bg-white rounded-t-2xl max-h-28  w-screen flex gap-10 items-center mt-4">
      <div>
        <h2 className="text-lg font-bold">Total price:</h2>
        <p className="text-lg font-bold text-gray-800">$</p>
      </div>
      <button className="bg-black text-white py-2 px-6 rounded-3xl w-72 h-14">
        Checkout
      </button>
    </div>
  );
};

export default CartSummary;
