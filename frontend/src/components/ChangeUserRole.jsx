import React, { useState } from 'react';
import { ImCancelCircle } from "react-icons/im";
import Role from '../common/role'
import summaryApi from '../common';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import Spinner from './Spinner';

function ChangeUserRole({
    userId,
    username,
    email,
    role,
    onClose,
    callFunc,
}) {
    const [userRole, setUserRole] = useState(role);
    const [loading, setLoading] = useState(false);

    const handleOnChangeRole = (e) => {
        setUserRole(e.target.value)
    };

    const handleChangeUserRole = async(e) => {
        e.preventDefault();
        setLoading(true);
        const dataResponse = await fetch(summaryApi.updateUsers.url,{
            method : summaryApi.updateUsers.method,
            credentials : 'include',
            headers: {
                "content-type": "application/json",
              },
              body : JSON.stringify({
                userId : userId,
                role : userRole,
              })
        })
        setLoading(false);
        const updatedUserDetails = await dataResponse.json();
        if(updatedUserDetails.success){
            toast.success(updatedUserDetails.message);
            onClose();
            callFunc();
        }
        
        if(updatedUserDetails.error){
            toast.error(updatedUserDetails.message);
        }
    };

    return (
        <>
        {loading && <Spinner/>}
            <div className='h-full w-full fixed top-0 left-0 flex justify-center items-center z-10'>
                <div className='bg-white w-full max-w-md mx-auto shadow-md p-4 h-full max-h-86'>
                    <div className='flex justify-between items-center text-2xl pb-4'>
                        <h1 className='text-3xl font-semibold '>Change User Role</h1>
                        <button>
                            <ImCancelCircle className='hover:text-red-500 cursor-pointer' onClick={onClose} />
                        </button>
                    </div>
                    <div className='flex flex-col gap-3 pt-4'>
                    <p className='text-2xl'>Username : {username} </p>
                    <p className='text-2xl'>Email : {email}</p>
                    <div className='flex justify-between items-center pb-2 '>
                        <p className='text-2xl'>Role :</p>
                        <select className='border px-4 py-2 rounded-md cursor-pointer' value={userRole} onChange={handleOnChangeRole}>
                            {
                                Object.values(Role).map((option) => (
                                    <option value={option} key={option}>
                                        {option}
                                    </option>
                                ))
                            }
                        </select>
                    </div>
                    </div>
                    <button 
                    className='bg-green-500 w-fit block mx-auto py-3 px-3 rounded-full mt-10 text-white hover:bg-green-600 cursor-pointer'
                    onClick={handleChangeUserRole}
                    >
                        change user role
                    </button>
                </div>
            </div>
        </>
    )
}

ChangeUserRole.propTypes = {
    userId : PropTypes.string,
    username : PropTypes.string,
    email : PropTypes.string,
    role : PropTypes.string,
    onClose : PropTypes.func,
    callFunc : PropTypes.func,
}

export default ChangeUserRole
