import React from 'react'
import { useSelector } from 'react-redux'
import { FaRegUserCircle } from "react-icons/fa";
import { Link, Outlet } from 'react-router-dom';


function AdminPanel() {
  const user = useSelector(state => state.user.user)
  return (
    <>
      <div className='min-h-[calc(100vh-160px)] md:flex hidden'>
        <aside className=' bg-white w-full max-w-60 shadow-md border border-black'>
          <div className='flex flex-col justify-center relative items-center h-35 bg-red-500'>
            <div className='text-6xl cursor-pointer mt-2'>
              {
                user.profilePic ? (
                  <img src={user?.profilePic} alt='profile image' className='w-20 h-20 rounded-full' />
                )
                  :
                  (
                    <FaRegUserCircle />
                  )
              }
            </div>
            <p className='text-lg font-semibold mt-1 capitalize'>{user.username}</p>
            <p className='text-sm '>{user.role}</p>
          </div>
          <div>
            <nav className='grid p-3'>
              <Link to={"all-users"} className='px-2 py-3 hover:bg-slate-300'>
                All users
              </Link>
              <Link to={"products"} className='px-2 py-3 hover:bg-slate-300'>
                products
              </Link>
            </nav>
          </div>
        </aside>
        <main className='w-full h-full p-4'>
          <Outlet />
        </main>
      </div>
    </>
  )
}

export default AdminPanel
