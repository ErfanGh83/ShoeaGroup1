import { BiBell } from "react-icons/bi";
import { BiHeart } from "react-icons/bi";
import { Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { BiLogOut } from "react-icons/bi";
import { logout } from "../../api/auth.api";
import { useSelector, useDispatch } from "react-redux";
import { AuthActions } from "../../redux/slices/Auth.slice";
import { RootState } from "../../redux/store.redux";

const HomeHeader = ()=>{

    const userState = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch();

    const handleLogout = async () => {
        try {
            dispatch(AuthActions.clear());
            await logout();
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    return(
        <header className="w-full h-20 shadow-xl absolute top-0 flex flex-row justify-between items-center px-6">
            <div className="w-[194px] h-12 justify-between flex flex-row">
                <div className="size-12 flex rounded-full justify-center items-center">
                    <CgProfile size={50}/>
                </div>
                
                <div className="flex flex-col w-[140px] ml-2">
                    <p className="text-gray-400 text-md">
                        {userState?.username? 'Good Morning 👋' : ''}
                    </p>
                    
                    <h2 className="font-semibold text-lg h-max">
                        {userState?.username ? (
                            userState?.username
                        ) : (
                            <Link to="/login" className="m-auto">
                                Login
                            </Link>
                        )}
                    </h2>
                </div>
            </div>

            <div>
                <h2 className="font-semibold text-lg mx-auto">
                    {!userState?.username ? (
                        !userState?.username
                    ) : (
                        <Link to="/login">
                                <button onClick={handleLogout} className="w-fit py-2 px-4 rounded-full border-black border-2 m-auto items-center justify-evenly flex flex-row gap-2">
                                    <BiLogOut size={24} color="black"/>
                                    Logout
                                </button>
                        </Link>
                    )}
                </h2>
            </div>

            <div className="w-16 h-6 flex flex-row justify-between items-center">
                
                
                <BiBell size={28} />
                
                <Link to="/wishlist">
                    <BiHeart size={28}/>
                </Link>
            </div>

        </header>
    )
}

export default HomeHeader;
