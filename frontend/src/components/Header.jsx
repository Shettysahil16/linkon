import Logo from './Logo'
import { IoSearchSharp } from "react-icons/io5";
import { FaRegUserCircle } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import summaryApi from '../common';
import { toast } from 'react-toastify';
import { setUserDetails } from '../store/userSlice';
import { useState } from 'react';


function Header() {
    const user = useSelector(state => state?.user?.user);
    const dispatch = useDispatch();
    const [adminPanel, setAdminPanel] = useState(false);

    const handleLogout = async (e) => {
        e.preventDefault();
        const dataResponse = await fetch(summaryApi.currentUserLogout.url, {
            method: summaryApi.currentUserLogout.method,
            credentials: "include",
            headers: {
                "content-type": "application/json",
            },
        })
        const userData = await dataResponse.json();
        if (userData.success) {
            toast.success(userData.message, {
                position: "top-center",
                pauseOnHover: false,
            })
            dispatch(setUserDetails([]))
        }
        if (userData.error) {
            toast.success(userData.message, {
                position: "top-center",
                pauseOnHover: false,
            })
        }
    }
    return (
        <div className='h-20 w-auto flex shadow-md justify-around items-center bg-white'>
            <div>
                <Link to={"/"}>
                    <Logo h={100} w={100} />
                </Link>
            </div>

            <div className='hidden lg:flex w-full max-w-sm justify-between items-center border rounded-full pl-4 h-10 hover:shadow-md'>
                <input type='text' placeholder='search products here....' className='w-full h-8 outline-none rounded-l-full' />
                <div className='text-xl min-w-[50px] h-10 bg-green-700 flex justify-center items-center rounded-r-full text-white'>
                    <IoSearchSharp />
                </div>
            </div>

            <div className='flex gap-8 max-w-sm items-center'>
                <div className='relative flex justify-center'>
                    <div className='text-3xl cursor-pointer' onClick={() => setAdminPanel(!adminPanel)}>
                        {
                            user.profilePic ? (
                                <img src={user?.profilePic} alt='profile image' className='w-10 h-10 rounded-full' />
                            )
                                :
                                (
                                    <FaRegUserCircle />
                                )
                        }
                    </div>
                    {
                        adminPanel && (
                            <div className='absolute bottom-0 top-11 h-fit bg-white p-2 shadow-lg'>
                                <nav>
                                    <Link to={"admin-panel"} className='whitespace-nowrap hover:bg-slate-200 p-1 rounded-md' onClick={() => setAdminPanel(!adminPanel)}>
                                        Admin Panel
                                    </Link>
                                </nav>
                            </div>
                        )
                    }

                </div>
                <div className='text-3xl cursor-pointer flex relative'>
                    <FaShoppingCart />
                    <p className='text-sm text-white bg-green-500 h-5 w-5 flex items-center justify-center rounded-full p-1 absolute -right-3 -top-1'>
                        0
                    </p>
                </div>
                <div>
                    {
                        user._id ?
                            (
                                <button onClick={handleLogout} className='px-5 py-2 bg-green-500 text-white rounded-full hover:bg-green-700'>
                                    Logout
                                </button>
                            )
                            :
                            (
                                <Link to={"/login"} className='px-5 py-2 bg-green-500 text-white rounded-full hover:bg-green-700'>
                                    login
                                </Link>
                            )
                    }
                </div>
            </div>
        </div>
    )
}

export default Header
