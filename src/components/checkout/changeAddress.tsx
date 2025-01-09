import { useState, useEffect } from "react";
import { VscLocation } from "react-icons/vsc";
import { addToAddress, setSelectedAddress, useAddress } from "../../customHooks/useFetchData";
import { Link } from "react-router";
import { toast } from "react-toastify";
import { IAddress } from "../../types/types";

function ChangeAddress() {
    const { data: initialAddress } = useAddress({ isSelected: "true" });
    const { data: addresses, isError, refetch } = useAddress();
    const [mode, setMode] = useState("view");
    const [localSelectedAddress, setLocalSelectedAddress] = useState({
        name: "",
        address: "",
    });
    const [newAddress, setNewAddress] = useState({ name: "", address: "" });

    useEffect(() => {
        if (initialAddress) {
            setLocalSelectedAddress(initialAddress as IAddress);
        }
    }, [initialAddress]);

    const handleSelectedAddress = (address : IAddress) => {
        setLocalSelectedAddress(address);
        setSelectedAddress({ name: address.name });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewAddress((prev) => ({ ...prev, [name]: value }));
    };

    const handleSaveNewAddress = () => {
        if (newAddress.name && newAddress.address && addresses) {
            const isDuplicate = addresses.find(obj => obj.name === newAddress.name);
            
            if(!isDuplicate){
                addToAddress({ name: newAddress.name, address: newAddress.address })
                setSelectedAddress({name: newAddress.name});
                setLocalSelectedAddress(newAddress);
                setMode("view");
                refetch();
            }
            else{
                toast.warn('address names should be unique')
            }

        } else {
            toast.warn("Please fill out all fields.");
        }
    };

    if (!addresses || isError) {
        return <div className="text-center">Error while fetching addresses</div>;
    }

    return (
        <div className="px-8 pb-10 my-4 flex flex-col">
            <h2 className="text-xl font-semibold">Select Shipping Address</h2>

            {mode === "view" ? (
                <>
                    <div className="flex flex-col gap-4 my-4">
                        {addresses.map((address: IAddress) => (
                            <div
                                key={address.name}
                                className={`w-full h-[100px] p-2 my-4 rounded-2xl shadow-md flex flex-row items-center cursor-pointer ${localSelectedAddress.name === address.name
                                        ? "bg-gray-200"
                                        : "bg-white"
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
                                            className={`w-4 h-4 rounded-full border-2 border-gray-400 ${localSelectedAddress.name === address.name
                                                    ? "bg-black"
                                                    : "bg-white"
                                                }`}
                                        ></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div>
                        <button
                            onClick={() => setMode("newAddress")}
                            className="w-full h-[50px] my-4 rounded-3xl bg-gray-300 font-semibold text-xl flex items-center justify-center"
                        >
                            Add New Address
                        </button>
                    </div>
                </>
            ) : (
                <div className="my-8">
                    <h3 className="text-lg font-semibold">Add New Address</h3>
                    <form className="flex flex-col gap-4">
                        <input
                            type="text"
                            name="name"
                            value={newAddress.name}
                            onChange={handleInputChange}
                            placeholder="Name"
                            className="p-2 border rounded"
                        />
                        <textarea
                            name="address"
                            value={newAddress.address}
                            onChange={handleInputChange}
                            placeholder="Address"
                            className="p-2 border rounded"
                        />
                        <div className="flex gap-4">
                            <button
                                type="button"
                                onClick={handleSaveNewAddress}
                                className="w-full h-[50px] rounded-3xl bg-black text-white font-semibold"
                            >
                                Save
                            </button>
                            <button
                                type="button"
                                onClick={() => setMode("view")}
                                className="w-full h-[50px] rounded-3xl bg-gray-300 font-semibold"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}

            { mode == 'view' ?<Link to={`/checkout`}>
                <div className="w-[450px] h-[50px] rounded-3xl bg-black ml-[-10px] text-white font-semibold text-xl flex items-center justify-center fixed bottom-2">
                    Apply
                </div>
            </Link> : <></>}
        </div>
    );
}

export default ChangeAddress;

