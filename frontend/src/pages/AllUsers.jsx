import React, { useEffect, useState } from 'react'
import summaryApi from '../common'
import { toast } from 'react-toastify';
import { FiEdit } from "react-icons/fi";
import moment from 'moment';
import Spinner from '../components/Spinner';
import ChangeUserRole from '../components/ChangeUserRole';

function AllUsers() {
    const [loading, setLoading] = useState(false);
    const [allUsersDetails, setAllUserDetails] = useState([]);
    const [showChangeUser, setShowChangeUser] = useState(false);
    const [changeUserRoleDetails, setChangeUserRoleDetails] = useState({});

    const fetchAllUsers = async () => {
        setLoading(true);
        const dataResponse = await fetch(summaryApi.allUsers.url, {
            method: summaryApi.allUsers.method,
            credentials: 'include',
        })
        setLoading(false);
        const allUsers = await dataResponse.json();
        if (allUsers.success) {
            setAllUserDetails(allUsers.data);
        }

        if (allUsers.error) {
            toast.error(allUsers.message);
        }
    }

    useEffect(() => {
        fetchAllUsers();
    }, [])

    return (
        <>
        {loading && <Spinner/>}
        <div className={`${showChangeUser ? "bg-slate-300 opacity-50" : "bg-white"}`}>
            <table className='w-full userTable'>
                <thead>
                    <tr className='bg-black text-white'>
                        <th>Sr. no</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Created Date</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        allUsersDetails.map((users, index) => {
                            return (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{users.username}</td>
                                    <td>{users.email}</td>
                                    <td>{users.role}</td>
                                    <td>{moment(users.createdAt).format('lll')}</td>
                                    <td>
                                        <button className='bg-blue-100 p-2 rounded-full cursor-pointer hover:bg-blue-300' onClick={() => {
                                            setChangeUserRoleDetails(users);
                                            setShowChangeUser(!showChangeUser)
                                            }}>
                                            <FiEdit />
                                        </button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
        {
            showChangeUser && (
            <ChangeUserRole 
            onClose={() => setShowChangeUser(!showChangeUser)}
            userId={changeUserRoleDetails._id}
            username={changeUserRoleDetails.username}
            email={changeUserRoleDetails.email}
            role={changeUserRoleDetails.role}
            callFunc={fetchAllUsers}
            />
        )
        }
        </>
    )
}

export default AllUsers
