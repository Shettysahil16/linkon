import React from 'react';
import { useSelector } from 'react-redux';
import { FaRegUserCircle } from "react-icons/fa";
import { Link, Outlet } from 'react-router-dom';

function AdminPanel() {
  const user = useSelector((state) => state?.user?.user);
  if (!user) {
    return null; 
  }
  return (
    <>
      <div className='min-h-[calc(100vh-160px)] md:flex hidden'>
        <aside className='bg-white min-h-full w-full max-w-80 border'>
          <div className='bg-yellow-500 flex flex-col justify-center items-center h-70'>
            <div>
              {
                user.profilePic ? (
                  <img src={user.profilePic} alt={user.username} className='h-40 w-40 rounded-full' />
                )
                  :
                  (
                    <FaRegUserCircle className='text-3xl lg:text-9xl' />
                  )
              }
            </div>
            <p className='capitalize font-semibold text-xl'>
              {user?.username}
            </p>

            <p className='mt-1 text-lg'>
              {user?.role}
            </p>
          </div>
          <div>
            <nav className='flex flex-col px-2 py-4 font-medium'>
              <Link to={"all-users"} className='p-2 hover:bg-slate-200 text-xl'>All Users</Link>
              <Link to={"all-products"} className='p-2 hover:bg-slate-200 text-xl'>Products</Link>
            </nav>
          </div>
        </aside>

        <main className='h-full w-full p-4'>
          <Outlet/>
        </main>
      </div>
    </>
  )
}

export default AdminPanel
