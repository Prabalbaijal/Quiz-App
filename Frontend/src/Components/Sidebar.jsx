import React from 'react'
import { useSelector } from 'react-redux'
import {useNavigate,Link} from 'react-router-dom'

function Sidebar() {
    const { loggedinUser } = useSelector(store => store.user)
    const navigate=useNavigate()
    return (
        <div className='gap-0 flex flex-col w-[25vw] bg-gray-300 h-screen items-center border-4 '>
            <div className='flex flex-col items-center w-full bg-gray-300'>
                    <div className="mt-32 avatar">
                        <div className="w-24 rounded-full">
                            <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                        </div>
                    </div>
                    <div className='mt-4'><h1 className='text-xl font-bold'>{`${loggedinUser?.firstName} ${loggedinUser?.lastName}(You)`}</h1></div>
            </div>
            <div><hr className='w-[25vw] mt-2'></hr></div>
            <div className='h-8 pt-2 text-lg mt-14'>Dashboard</div>
            <div><hr className='w-[25vw]'></hr></div>
            <div><hr className='w-[25vw]'></hr></div>
            <div className='h-10 pt-4 text-lg'><Link to="/create-quiz">Create a Quiz</Link></div>
            <div><hr className='w-[25vw]'></hr></div>
            <div className='h-10 pt-4 text-lg'>My Quizzes</div>
            <div><hr className='w-[25vw]'></hr></div>
            
            
        </div>
    )
}

export default Sidebar
