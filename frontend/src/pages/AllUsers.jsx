import React, { useEffect, useState } from 'react';
import summaryApi from '../common';
import { toast } from "react-toastify";
import moment from 'moment';
import { FiEdit } from "react-icons/fi";
import ChangeUserRole from './ChangeUserRole';

function AllUsers() {
  const [allUsers, setAllUsers] = useState([]);
  const [openRoleChange, setOpenRoleChange] = useState(false);
  const [userDetails, setUpdateUserDetails] = useState({
    username: "",
    email: "",
    role: "",
    _id : "",
  })
  const fetchAllUsers = async () => {
    const dataResponse = await fetch(summaryApi.allUsers.url, {
      method: summaryApi.allUsers.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
    })
    const userData = await dataResponse.json();
    if (userData.success) {
      setAllUsers(userData.data)
    }
    if (userData.error) {
      toast.error("some error occurred")
    }

  }

  useEffect(() => {
    fetchAllUsers();
  }, [])
  return (
    <div>
      <table className='w-full userTable'>
        <thead>
          <tr>
            <th className='p-1'>Sr no.</th>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Created Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {
            allUsers.map((users, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{users.username}</td>
                  <td>{users.email}</td>
                  <td>{users.role}</td>
                  <td>{moment(users.createdAt).format('ll')}</td>
                  <td className='p-1'>
                    <button className='p-2 bg-blue-100 rounded-full hover:bg-blue-300'
                      onClick={() => {
                        setUpdateUserDetails(users)
                        setOpenRoleChange(!openRoleChange)
                      }}
                    >
                      <FiEdit />
                    </button>
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
      {
        openRoleChange && (
          <ChangeUserRole 
          onClose={() => setOpenRoleChange(!openRoleChange)} 
          username={userDetails.username} email={userDetails.email} 
          role={userDetails.role} 
          userId={userDetails._id}
          callFunc={fetchAllUsers}
          />
        )
      }
    </div>
  )
}

export default AllUsers
