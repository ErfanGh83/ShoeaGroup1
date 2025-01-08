import { VscLocation } from "react-icons/vsc";
import { BiPencil } from "react-icons/bi";
import { Link } from "react-router";
import { useAddress, useUser } from "../../customHooks/useFetchData";
import { useEffect } from "react";

function AddressComponent() {

    const { data: user } = useUser()
    const { data: selectedAddress, isError: isAddressError, isLoading: isAddressLoading, refetch } = useAddress({ isSelected: 'true'})

    useEffect(() => {
        refetch();
    }, []);

    if(isAddressLoading){
        return(<div>
            address is loading
        </div>)
    }

    if(isAddressError){
        return(<div>
            error fetching address
        </div>)
    }

    return (
        <div className="px-8 my-4 flex flex-col">
            <h2 className="text-xl font-semibold">Shipping Address</h2>

            <div className="w-full h-[100px] p-2 my-4 rounded-2xl shadow-md flex flex-row items-center">
                <div className="rounded-full border-8 border-gray m-4 bg-black">
                    <VscLocation size={30} color="white" />
                </div>

                <div className="flex flex-col gap-2 w-[280px] overflow-hidden">
                    <h3 className="w-full font-bold">{selectedAddress ? selectedAddress.name : ''}</h3>
                    <p className="w-full text-sm text-gray-400 overflow-hidden text-ellipsis whitespace-nowrap">
                        {selectedAddress ? selectedAddress.address : ''}
                    </p>
                </div>

                <div className="m-auto">
                    <Link to={`/checkout/address`}>
                        <BiPencil size={24} />
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default AddressComponent;