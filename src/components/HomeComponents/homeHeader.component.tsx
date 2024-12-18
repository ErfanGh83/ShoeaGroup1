import { BiBell } from "react-icons/bi";
import { BiHeart } from "react-icons/bi";
import { Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { useEffect, useState } from "react";

const HomeHeader = ()=>{

    const [username, setUsername] = useState('');

    useEffect(() => {
        const storedUser = localStorage.getItem('storedUser');
        if (storedUser) {
            const user = JSON.parse(storedUser);
            setUsername(user.username || '');
        } else {
            setUsername('');
        }
    }, []);

    return(
        <header className="w-full h-20 shadow-xl absolute top-0 flex flex-row justify-between items-center px-6">
            <div className="w-[194px] h-12 justify-between flex flex-row">
                <div className="size-12 flex rounded-full justify-center items-center">
                    <CgProfile size={50}/>
                </div>
                
                <div className="flex flex-col w-[140px] ml-2">
                    <p className="text-gray-400 text-md">
                        {username? 'Good Morning 👋' : ''}
                    </p>
                    
                    <h2 className="font-semibold text-lg">
                        {username ? (
                            username
                        ) : (
                            <Link to="/login" className="m-auto">
                                Login
                            </Link>
                        )}
                    </h2>
                </div>
            </div>

            <div className="w-16 h-6 flex flex-row justify-between items-center">
                <BiBell size={28}/>
                <BiHeart size={28}/>
            </div>

        </header>
    )
}

export default HomeHeader;