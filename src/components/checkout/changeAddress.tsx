import React, { useState, useEffect } from "react";
import { VscLocation } from "react-icons/vsc";
import { setSelectedAddress, useAddress } from "../../customHooks/useFetchData";
import { Link } from "react-router";

function ChangeAddress() {
    const { data: initialAddress } = useAddress({ isSelected: 'true' });
    const { data: addresses } = useAddress()
    const [ localSelectedAddress, setLocalSelectedAddress ] = useState({ name: '', address: ''})

    useEffect(() => {
        if (initialAddress) {
            setLocalSelectedAddress(initialAddress);
        }
    }, [initialAddress]);

    const handleSelectedAddress = (address: IAddress) => {
        setLocalSelectedAddress(address)
        setSelectedAddress({name: address.name})
    };

    if(!addresses){
        return(
            <div>
                no addresses
            </div>
        )
    }

    return (
        <div className="px-8 my-4 flex flex-col">
            <button>
                <Link to={`/checkout`}>
                    Back
                </Link>
            </button>
            <h2 className="text-xl font-semibold">Select Shipping Address</h2>
            <div className="flex flex-col gap-4 my-4">
                {addresses.map((address) => (
                    <div
                        key={address.name}
                        className={`w-full h-[100px] p-2 my-4 rounded-2xl shadow-md flex flex-row items-center cursor-pointer ${localSelectedAddress.name === address.name ? "bg-gray-200" : "bg-white"
                            }`}
                        onClick={() => handleSelectedAddress(address)}
                    >
                        <div className="rounded-full border-8 border-gray m-4 bg-black">
                            <VscLocation size={30} color="white" />
                        </div>

                        <div className="flex flex-col gap-2 w-[280px] overflow-hidden">
                            <h3 className="w-full font-bold">{address.name}</h3>
                            <p className="w-full text-sm text-gray-400 overflow-hidden text-ellipsis whitespace-nowrap">
                                {address.address}
                            </p>
                        </div>

                        <div className="m-auto">
                            <div className="flex items-center justify-center">
                                <div
                                    className={`w-4 h-4 rounded-full border-2 border-gray-400 ${localSelectedAddress.name === address.name ? "bg-black" : "bg-white"
                                        }`}
                                ></div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ChangeAddress;