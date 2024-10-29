import React, { useContext, useState } from 'react'
import LoginIcon from '../assets/signin.gif'
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { Link, useNavigate } from 'react-router-dom';
import summaryApi from '../common';
import { toast } from "react-toastify";
import Context from '../context';


function Login() {
    const [showPassword, setShowPassword] = useState(false)
    const [data, setData] = useState({
        email: "",
        password : "",
    })
    const navigate = useNavigate();
    const {fetchUserDetails} = useContext(Context);

    const handleOnChange = (e) => {
        const {name , value} = e.target
        setData((data) => {
            return{
                ...data,
                [name] : value,
            }
        }) 
    }
    const handleOnSubmit = async(e) => {
        e.preventDefault();
        const dataResponse = await fetch(summaryApi.login.url,{
            method : summaryApi.login.method,
            credentials : "include",
            headers : {
                "content-type" : "application/json",
            },
            body : JSON.stringify(data)
        })
        const userData = await dataResponse.json();
        if (userData.success) {
            toast.success(userData.message, {
                position: "top-center",
                pauseOnHover: false,
            })
            navigate("/");
            fetchUserDetails();
        }
        if (userData.error) {
            toast.error(userData.message, {
                position: "top-center",
                pauseOnHover: false,
            })
        }
    }
    return (
        <section id="login">
            <div className='mx-auto container p-4'>
                <div className='bg-white p-2 py-5 w-full max-w-md mx-auto'>
                    <div className='h-20 w-20 mx-auto'>
                        <img src={LoginIcon} alt='login icons' />
                    </div>
                    <form className='flex flex-col gap-4 px-3' onSubmit={handleOnSubmit}>
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
                            <Link to={"/forget-password"} className='block w-fit ml-auto mt-3 hover:text-orange-400 hover:underline'>
                            forget password?
                            </Link>
                        </div>
                        <button className='text-white bg-green-500 px-3 py-3 rounded-full w-full max-w-[120px] mx-auto block m-3 hover:scale-105 transition-all'>
                        login
                    </button>
                    </form>
                    <p>
                    Don't have account? <Link to={"/signup"} className='hover:underline hover:text-orange-400'>Sign up</Link>
                    </p>
                </div>
            </div>
        </section>
    )
}

export default Login
