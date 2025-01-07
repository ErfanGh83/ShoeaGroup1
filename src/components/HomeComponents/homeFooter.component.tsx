import { BiHome } from 'react-icons/bi';
import { BsCart } from 'react-icons/bs';
import { CgShoppingBag } from 'react-icons/cg';
import { BiWallet } from 'react-icons/bi';
import { CgProfile } from 'react-icons/cg';
import { useLocation, Link } from 'react-router-dom';

function HomeFooter() {
  const location = useLocation();

  const footerItems = [
    { path: '/home', label: 'Home', icon: <BiHome size={30} /> },
    { path: '/cart', label: 'Cart', icon: <BsCart size={30} /> },
    { path: '/orders/active', altPath: '/orders/completed', label: 'Orders', icon: <CgShoppingBag size={30} /> },
    { path: '/wallet', label: 'Wallet', icon: <BiWallet size={30} /> },
    { path: '/profile', label: 'Profile', icon: <CgProfile size={30} /> },
  ];

  return (
    <div className="w-[500px] h-[66px] bg-white flex flex-row items-center justify-evenly font-semibold fixed bottom-0">
      {footerItems.map((item) => (
        <Link to={item.path} key={item.path} className="flex flex-col items-center">
          <div
            style={{
              color: location.pathname === item.path || location.pathname === item.altPath ? 'black' : 'gray',
            }}
          >
            {item.icon}
          </div>
          <p style={{ color: location.pathname === item.path || location.pathname === item.altPath ? 'black' : 'gray' }}>
            {item.label}
          </p>
        </Link>
      ))}
    </div>
  );
}

export default HomeFooter;
