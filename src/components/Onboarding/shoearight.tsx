interface ShoeaRight {
  setPage: (value: string) => void;
}
const Page3: React.FC<ShoeaRight> = ({ setPage }) => {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-centerp">
      <div className="w-full h-[60%]">
        <img src="/src/assets/obsp3-img.png" className="w-full h-full" />
      </div>
      <div className="relative w-full h-full flex flex-col items-center gap-16 pt-8 px-6">
        <p className="text-3xl leading-relaxed font-bold text-center">
          Let’s fulfill your fashion needs with shoearight now!
        </p>
        <div className="felx flex-col">
          <div className=" flex gap-2 absolute bottom-36 left-[40%]">
            <div className="w-8 h-1 bg-black opacity-50"></div>
            <div className="w-8 h-1 bg-black opacity-50"></div>
            <div className="w-8 h-1 bg-black"></div>
          </div>
          <button
            onClick={() => setPage("Authentication")}
            className="bg-black hover:bg-gray-800 rounded-full text-white w-[90%] py-3 fixed bottom-14 left-[5%]"
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page3;
