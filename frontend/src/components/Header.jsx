import React, { useContext, useState } from 'react';
import Logo from './Logo';
import { IoSearchSharp } from "react-icons/io5";
import { FaRegUserCircle } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import summaryApi from '../common';
import { toast } from 'react-toastify';
import { setUserDetails } from '../../../../kinkon/frontend/src/store/userSlice';
import Spinner from './Spinner';
import ROLE from '../common/role';
import Context from '../context';

const Header = () => {
  const navigate = useNavigate();
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state?.user?.user);
  const dispatch = useDispatch();
  const context = useContext(Context);

  const handleUserLogout = async (e) => {
    e.preventDefault();
    setLoading(true);
    const fetchData = await fetch(summaryApi.user_logout.url, {
      method: summaryApi.user_logout.method,
      credentials: 'include',
    })

    const userLoggedOut = await fetchData.json();
    setLoading(false);

    if (userLoggedOut.success) {
      toast.success(userLoggedOut.message);
      dispatch(setUserDetails(null));
      navigate("/login");
    }
  }

  return (
    <>
      <header className='h-20 shadow-md bg-white fixed w-full z-20'>
        <div className='h-full container mx-auto flex items-center justify-between px-4'>
          <div>
            <Link to={""}>
              <Logo h={100} w={100} />
            </Link>
          </div>

          <div className='hidden lg:flex w-full max-w-md justify-between items-center border-1 border-slate-200 rounded-full pl-4 h-12 hover:shadow-md'>
            <input type="text" placeholder='search products here...' className='text-lg w-full h-8 outline-none rounded-l-full' />
            <div className='text-2xl min-w-[60px] h-12 bg-green-700 flex justify-center items-center rounded-r-full text-white'>
              <IoSearchSharp />
            </div>
          </div>

          <div className='flex gap-6 md:gap-8 items-center cursor-pointer'>
            {
              user?._id && (
                <div className='relative flex flex-col items-center'>
              <div onClick={() => setShowAdminPanel(!showAdminPanel)}>
                {
                  user.profilePic ? (
                    <img src={user.profilePic} className='h-10 w-10 lg:h-12 lg:w-12 rounded-full text-xs' />
                  ) :
                    (
                      <div className='flex flex-col justify-center items-center pt-5'>
                        <FaRegUserCircle className='text-3xl lg:text-3xl' />
                        <p>{user.username}</p>
                      </div>
                    )
                }
              </div>
              {
                user?.role === ROLE.ADMIN && (
                  showAdminPanel && (
                    <div className='absolute top-17 bg-white p-2 md:flex hidden z-10' onClick={() => setShowAdminPanel(!showAdminPanel)}>
                      <nav>
                        <Link to={"/admin-panel/all-products"} className='w-full whitespace-nowrap hover:bg-slate-200 p-2 rounded-md'>Admin panel</Link>
                      </nav>
                    </div>
                  )
                )
              }
            </div>
              )
            }
            {
              user?._id && (
                <div className='text-3xl relative cursor-pointer'>
              <FaShoppingCart />
              <p className='h-5 w-5 absolute bg-green-500 -top-1 -right-2 rounded-full text-sm text-white flex items-center justify-center p-1'>
                {
                  context?.cartProductCount
                }
              </p>
            </div>
              )
            }
            {
              loading ? <Spinner/> :(
                user ? (
                <button onClick={handleUserLogout} className='text-xl text-white px-5 pb-2 pt-1 bg-green-500 rounded-full hover:bg-green-600 cursor-pointer'>
                  logout
                </button>
              ) :
                (
                  <Link to={"/login"} className='text-xl text-white px-5 pb-2 pt-1 bg-green-500 rounded-full hover:bg-green-600 cursor-pointer'>
                    login
                  </Link>
                )
              )
            }
          </div>


        </div>
      </header>
    </>
  )
}

export default Header
