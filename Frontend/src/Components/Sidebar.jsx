import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { setLoggedinUser } from '../redux/userSlice';
import axios from 'axios';
import toast from 'react-hot-toast';

function Sidebar() {
    const { loggedinUser } = useSelector(store => store.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const logoutFunction = async () => {
        try {
            const res = await axios.get('http://localhost:9000/api/users/logout');
            navigate("/");
            toast.success(res.data.message);
            dispatch(setLoggedinUser(null));
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className='flex flex-col items-center w-full h-screen p-2 bg-gray-300 border-r-4 min-w-[200px] sm:min-w-[250px] sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5'>
            <div className='flex flex-col items-center w-full bg-gray-300'>
                <div className="mt-8 lg:mt-32 avatar">
                    <div className="w-24 rounded-full">
                        <img src={loggedinUser?.profilePicture} alt="Profile" />
                    </div>
                </div>
                <div className='mt-4'><h1 className='text-xl font-bold'>{`${loggedinUser?.firstName} ${loggedinUser?.lastName} (You)`}</h1></div>
            </div>
            <hr className='w-full mt-4' />
            <div className='mt-8'>
                <Link to="/dashboard" className='block py-2 text-lg'>Dashboard</Link>
                <hr className='w-full' />
                <Link to="/create-quiz" className='block py-2 text-lg'>Create and Post Quiz</Link>
                <hr className='w-full' />
                <Link to="/quizzes" className='block py-2 text-lg'>View all Quizzes</Link>
                <hr className='w-full' />
                <div className='py-2 text-lg cursor-pointer' onClick={logoutFunction}>Logout</div>
                <hr className='w-full' />
            </div>
        </div>
    );
}

export default Sidebar;
