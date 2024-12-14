
const Page1: React.FC = () => {
  return (
    <div className="w-full h-[94%] flex flex-col items-center justify-centerp">
      <div className="w-full h-[60%]">
        <img src="/src/assets/obsp1-img2.png" className="w-full h-full" />
      </div>
      <div className="relative w-full h-full flex flex-col items-center gap-16 pt-8 px-6">
        <p className="text-3xl leading-relaxed font-bold text-center">
          We provide high quality products just for you
        </p>
        <div className="w-full flex flex-row items-center">
          <div className=" flex flex-row gap-2 mx-auto">
            <div className="w-8 h-1 bg-black"></div>
            <div className="w-8 h-1 bg-black opacity-50"></div>
            <div className="w-8 h-1 bg-black opacity-50"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page1;
