interface ColorDisplayProps {
  color: string;
}

const ColorDisplay: React.FC<ColorDisplayProps> = ({ color }) => {
  const colorClasses: { [key: string]: string } = {
    red: "bg-red-600",
    blue: "bg-blue-600",
    green: "bg-green-600",
    yellow: "bg-yellow-600",
    purple: "bg-purple-600",
    rose: "bg-rose-600",
    emerald: "bg-emerald-600",
    gray: "bg-gray-600",
  };

  const colorClass = colorClasses[color] || "bg-gray-400";

  return (
    <div>
      <div
        className={`w-6 h-6 rounded-full ${colorClass} shadow-md`}
        title={color}
      ></div>
    </div>
  );
};

export default ColorDisplay;
