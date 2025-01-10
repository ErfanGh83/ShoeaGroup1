import { useUser } from '../customHooks/useFetchData'
import { BiSearch } from 'react-icons/bi'
import { Link, Outlet } from 'react-router'
import { useState } from 'react'
import { CgMoreO } from 'react-icons/cg'

function OrdersPage() {

    const { data: user } = useUser()
    const [activeState, setActiveState] = useState('active');

    if(!user){
        return(
            <div className='size-fit p-2 mx-auto my-12'>
                <h1 className='text-center text-3xl font-semibold mx-auto'> Please <span className='text-blue-500'><Link to={`/login`}>login</Link></span> first.</h1>
            </div>
        )
    }

    return (
        <div className='pb-10'>
            <header className='w-full flex flex-col'>
                <div className='w-full h-fit p-4 justify-between flex flex-row items-center'>
                    <div className='size-fit p-2 flex flex-row gap-4'>
                        <img className='size-6 m-auto' src='/src/assets/logo-black.svg'/>
                        <h2 className='font-semibold text-2xl'>My Orders</h2>
                    </div>

                    <div className='size-fit p-2 flex flex-row gap-4'>
                        <BiSearch size={30}/>
                        <CgMoreO size={30}/>
                    </div>
                </div>

                <div className='w-11/12 mx-auto flex flex-row items-center'>
                        <button onClick={() => setActiveState('active')} className={`w-1/2 border-b-4 border-b-gray text-center font-semibold text-xl ${
                            activeState == 'active'? 'text-black border-b-black' : 'text-gray-400'}`}>
                            <Link to={`/orders/active`}>
                                <h3 className='text-center size-full m-2'>
                                    Active 
                                </h3>
                            </Link>
                        </button>
                    
                        
                        <button onClick={() => setActiveState('completed')} className={`w-1/2 border-b-4 border-b-gray text-center font-semibold text-xl ${
                            activeState == 'completed'? 'text-black border-b-black' : 'text-gray-400'}`}>
                            <Link to={`/orders/completed`}>
                                <h3 className='text-center size-full m-2'>
                                    Completed
                                </h3>
                            </Link>
                        </button>
                    
                </div>
            </header>

            <main>
                <Outlet/>
            </main>
        </div>
    )
}

export default OrdersPage