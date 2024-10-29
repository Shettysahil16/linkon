import React, { useState } from 'react'
import LoginIcon from '../assets/signin.gif'
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { Link, useNavigate } from 'react-router-dom';
import imageToBase64 from '../helpers/imageToBase64';
import summaryApi from '../common';
import { toast } from "react-toastify";

function Signup() {
    const [showPassword, setShowPassword] = React.useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [data, setData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        profilePic: "",
    })
    const navigate = useNavigate()

    const handleOnChange = (e) => {
        const { name, value } = e.target
        setData((data) => {
            return {
                ...data,
                [name]: value,
            }
        })
    }


    const handleOnSubmit = async (e) => {
        e.preventDefault();
        if (data.password === data.confirmPassword) {
            const dataResponse = await fetch(summaryApi.signup.url, {
                method: summaryApi.signup.method,
                credentials : "include",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(data)
            })

            const userInfo = await dataResponse.json();
            if (userInfo.success) {
                toast.success(userInfo.message, {
                    position: "top-center",
                    pauseOnHover: false,
                })
                navigate("/login")
            }
            if (userInfo.error) {
                toast.error(userInfo.message, {
                    position: "top-center",
                    pauseOnHover: false,
                })
            }
        }
        if (data.password !== data.confirmPassword) {
            toast.error("password are not matching", {
                position: "top-center",
                pauseOnHover: false,
            })
        }
    }


    const handleUploadPic = async (e) => {
        const file = e.target.files[0];
        const imagePic = await imageToBase64(file);
        setData((data) => {
            return {
                ...data,
                profilePic: imagePic,
            }
        })
    }
    return (
        <section id="signup">
            <div className='mx-auto container p-4'>
                <div className='bg-white p-2 py-5 w-full max-w-md mx-auto'>
                    <div className='h-20 w-20 mx-auto relative rounded-full overflow-hidden'>
                        <div className='h-full'>
                            <img src={data.profilePic || LoginIcon} className='h-full' alt='login icons' />
                            <form>
                                <label>
                                    <div className='text-xs bg-slate-200  py-2 pb-5 pl-1 pt-2 absolute w-full bottom-0 bg-opacity-70 cursor-pointer'>
                                        Upload image
                                    </div>
                                    <input type="file" className='hidden' onChange={handleUploadPic} />
                                </label>
                            </form>
                        </div>
                    </div>
                    <form className='flex flex-col gap-4 mt-7 px-3' onSubmit={handleOnSubmit}>
                        <div className=''>
                            <label>username:</label>
                            <div className='bg-slate-100 py-3 pl-2 mt-2'>
                                <input type="text"
                                    name='username'
                                    value={data.username}
                                    required
                                    onChange={handleOnChange}
                                    placeholder='enter username'
                                    className='w-full outline-none bg-transparent' />
                            </div>
                        </div>
                        <div className=''>
                            <label>email:</label>
                            <div className='bg-slate-100 py-3 pl-2 mt-2'>
                                <input type="email"
                                    name='email'
                                    value={data.email}
                                    required
                                    onChange={handleOnChange}
                                    placeholder='enter email'
                                    className='w-full outline-none bg-transparent' />
                            </div>
                        </div>
                        <div className=''>
                            <label>password:</label>
                            <div className='bg-slate-100 py-3 px-2 mt-2 flex items-center'>
                                <input type={showPassword ? "text" : "password"}
                                    name='password'
                                    value={data.password}
                                    required
                                    onChange={handleOnChange}
                                    placeholder='enter password'
                                    className='w-full outline-none bg-transparent' />
                                <div className='cursor-pointer'>
                                    <span className='text-2xl' onClick={() => setShowPassword(!showPassword)}>
                                        {showPassword ? <IoMdEyeOff /> : <IoMdEye />}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className=''>
                            <label>confirm password:</label>
                            <div className='bg-slate-100 py-3 px-2 mt-2 flex items-center'>
                                <input type={showConfirmPassword ? "text" : "password"}
                                    name='confirmPassword'
                                    value={data.confirmPassword}
                                    required
                                    onChange={handleOnChange}
                                    placeholder='confirm password'
                                    className='w-full outline-none bg-transparent' />
                                <div className='cursor-pointer'>
                                    <span className='text-2xl' onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                                        {showConfirmPassword ? <IoMdEyeOff /> : <IoMdEye />}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <button className='text-white bg-green-500 px-3 py-3 rounded-full w-full max-w-[120px] mx-auto block m-3 hover:scale-105 transition-all'>
                            Signup
                        </button>
                    </form>
                    <p>
                        Already have account? <Link to={"/login"} className='hover:underline hover:text-orange-400'>login</Link>
                    </p>
                </div>
            </div>
        </section>
    )
}

export default Signup
