import React, { useState } from 'react'
import Role from '../common/role'
import { ImCancelCircle } from "react-icons/im";
import summaryApi from '../common';
import { toast } from 'react-toastify';

function ChangeUserRole({
    onClose,
    role,
    username,
    email,
    userId,
    callFunc,
}) {
    const [userRole , setUserRole] = useState(role)
    const handleOnChangeRole = (e) => {
        setUserRole(e.target.value)
    }

    const handleUpdateUserRole = async() => {
        
    }

  return (
        <div className='w-full h-full flex fixed top-0 bottom-0 z-10 left-0 right-0 justify-center items-center bg-slate-200 bg-opacity-50'>
        <div className='w-full bg-white max-w-xl mx-auto my-auto p-4'>
        <div className='text-2xl cursor-pointer w-fit ml-auto' onClick={onClose}>
        <ImCancelCircle />
        </div>
        <p className='flex justify-center font-semibold text-3xl'>User Role</p>
        <p className='text-xl my-5'>Username :- {username}</p>
        <p className='text-xl my-5'>Email :- {email}</p>
        <div className='flex gap-2 my-5'>
        <p className='text-xl '>Role :-</p>
        <select className='border px-4 py-1 rounded-md cursor-pointer' value={userRole} onChange={handleOnChangeRole}>
            {
                Object.values(Role).map((option) => {
                    return(
                        <option value={option} key={option}> 
                        {option}
                        </option>
                    )
                })
            }
        </select>
        </div>
        <button className='w-full bg-green-500 text-white max-w-fit mx-auto block mt-5 p-3 rounded-full hover:bg-green-700' onClick={handleUpdateUserRole}>
            change user role
        </button>
        </div>
    </div>
  )
}

export default ChangeUserRole
