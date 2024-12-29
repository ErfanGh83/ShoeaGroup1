interface ColorSelectorProps {
    colors: string[];
    selectedColor: string | null;
    onColorChange: (color: string) => void;
  }
  
  const ColorSelector: React.FC<ColorSelectorProps> = ({ colors, selectedColor, onColorChange }) => {
    const colorClasses: { [key: string]: string } = {
      red: 'bg-red-600',
      blue: 'bg-blue-600',
      green: 'bg-green-600',
      yellow: 'bg-yellow-600',
      purple: 'bg-purple-600',
      rose: 'bg-rose-600',
      emerald: 'bg-emerald-600',
      gray: 'bg-gray-600',
    };
  
    return (
      <div className="flex flex-col w-1/2">
        <p className="text-2xl font-bold">Color</p>
        <ul className="w-11/12 h-fit py-2 flex flex-row gap-4 overflow-x-scroll">
          {colors.map((color) => {
            const colorClass = colorClasses[color] || 'bg-gray-400';
            return (
              <li
                key={color}
                onClick={() => onColorChange(color)}
                className={`w-10 h-10 rounded-full ${selectedColor === color ? "border-2 border-black" : ""} ${colorClass} shadow-md`}
              ></li>
            );
          })}
        </ul>
      </div>
    );
  };
  
  export default ColorSelector;
  