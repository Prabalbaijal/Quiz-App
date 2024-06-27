import React from 'react'
import { useSelector } from 'react-redux'

function Sidebar() {
    const { loggedinUser } = useSelector(store => store.user)
    return (
        <div className='flex flex-col w-[25vw] bg-green-600 h-screen items-center border-4 border-red-400'>
            <div className='flex flex-col items-center w-full border-4 border-red-400'>
                    <div className="mt-20 avatar">
                        <div className="w-24 rounded-full">
                            <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                        </div>
                    </div>
                    <div className='mt-4'><h1 className='text-xl font-bold'>{`${loggedinUser?.firstName} ${loggedinUser?.lastName}(You)`}</h1></div>
            </div>
            <div>Dashboard</div>
            
        </div>
    )
}

export default Sidebar
