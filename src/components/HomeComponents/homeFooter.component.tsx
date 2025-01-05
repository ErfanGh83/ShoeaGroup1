import { BiHome } from "react-icons/bi";
import { BsCart } from "react-icons/bs";
import { CgShoppingBag } from "react-icons/cg";
import { BiWallet } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { Link } from "react-router";

function HomeFooter() {
  return (
    <div className="w-[500px] h-[66px] bg-white flex flex-row items-center justify-evenly font-semibold fixed bottom-0">
      <div className="flex flex-col items-center">
        <BiHome size={30} color="black" />
        <p>Home</p>
      </div>
      <Link to={"/cart"}>
        <div className="flex flex-col items-center">
          <BsCart size={30} />
          <p>Cart</p>
        </div>
      </Link>
      <div className="flex flex-col items-center">
        <CgShoppingBag size={30} />
        <p>Orders</p>
      </div>

      <div className="flex flex-col items-center">
        <BiWallet size={30} />
        <p>Wallet</p>
      </div>

      <div className="flex flex-col items-center">
        <CgProfile size={30} />
        <p>Profile</p>
      </div>
    </div>
  );
}

export default HomeFooter;
