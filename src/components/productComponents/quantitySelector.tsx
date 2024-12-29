interface QuantitySelectorProps {
    quantity: number;
    onQuantityChange: (operation: "add" | "reduce") => void;
  }
  
  const QuantitySelector: React.FC<QuantitySelectorProps> = ({ quantity, onQuantityChange }) => {
    return (
      <div className="w-[150px] h-[50px] flex flex-row justify-evenly items-center rounded-full mx-4 bg-gray-200 shadow-lg">
        <button className="text-2xl" onClick={() => onQuantityChange("add")}>+</button>
        <p className="text-xl font-semibold">{quantity}</p>
        <button className="text-2xl" onClick={() => onQuantityChange("reduce")}>-</button>
      </div>
    );
  };
  
  export default QuantitySelector;
  