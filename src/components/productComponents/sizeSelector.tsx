interface SizeSelectorProps {
    sizes: string[];
    selectedSize: string | null;
    onSizeChange: (size: string) => void;
  }
  
  const SizeSelector: React.FC<SizeSelectorProps> = ({ sizes, selectedSize, onSizeChange }) => {
    return (
      <div className="flex flex-col w-1/2">
        <p className="text-2xl font-bold">Size</p>
        <ul className="w-11/12 h-fit py-2 flex flex-row gap-4 overflow-x-scroll">
          {sizes.map((size) => (
            <li
              key={size}
              onClick={() => onSizeChange(size)}
              className={`size-10 rounded-full ${selectedSize === size ? "bg-black text-white" : ""} border-2 border-black items-center`}
            >
              <p className="size-10 px-2 pt-1 font-bold">{size}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default SizeSelector;
  