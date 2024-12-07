export default function BackgroundWelcome() {
  return (
    <div className="w-screen h-screen ">
 
        <div className="background-wallpaper w-full h-full bg-[url(/src/assets/photo_2024-12-05_16-00-53.jpg)] bg-no-repeat mx-auto">
        <div className="w-full h-full bg-gradient-to-b from-transparent to-black/80">

        </div>
        </div>


      <div className="absolute w-[94%] top-[70%] left-7 gap-5 text-white flex flex-col px-4">
        <h3 className="font-bold text-4xl">Welcome to 👋</h3>
        <h1 className="font-bold text-5xl">Shoea</h1>
        <p className="font-semibold text-lg">
          The best sneakers & shoes e-commerse app of the century for your
          fashion needs
        </p>
      </div>
    </div>
  );
}
