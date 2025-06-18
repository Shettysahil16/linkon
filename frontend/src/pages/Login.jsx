import React, { useContext, useState } from 'react';
import loginIcon from '../assets/output-onlinegiftools.gif';
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { Link, useNavigate } from 'react-router-dom';
import summaryApi from '../common';
import { toast } from 'react-toastify';
import Context from '../context';
import Spinner from '../components/Spinner';
function Login() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const { fetchUserDetails, fetchCartProductCounts } = useContext(Context);
    const [showPassword, setShowPassword] = useState(false);
    const [data, setData] = useState({
        email: "",
        password: ""
    })

    const handleOnChange = (e) => {
        const { name, value } = e.target
        setData((data) => {
            return {
                ...data,
                [name]: value
            }
        })
    }

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const dataResponse = await fetch(summaryApi.login.url, {
            method: summaryApi.login.method,
            credentials: 'include',
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(data),
        })
        setLoading(false);
        const loggedUser = await dataResponse.json();
        if (loggedUser.success) {
            toast.success(loggedUser.message);
            fetchUserDetails();
            fetchCartProductCounts();
            navigate("/");
        }

        if (loggedUser.error) {
            toast.error(loggedUser.message);
        }
    }
    return (
        <section id='login'>
            <div className='container mx-auto p-4'>
                {loading && <Spinner />}
                <div className="bg-white w-full max-w-md mx-auto p-4 transition-opacity duration-300">
                    <div className='w-30 h-30 mx-auto'>
                        <img src={loginIcon} alt="login icon" />
                    </div>
                    <form className='mt-6' onSubmit={handleOnSubmit}>
                        <div className='flex flex-col gap-4 text-xl'>
                            <div>
                                <label>Email: </label>
                                <div className='bg-slate-200 p-2 rounded mt-2'>
                                    <input
                                        type="email"
                                        onChange={handleOnChange}
                                        name='email'
                                        value={data.email}
                                        placeholder='enter email'
                                        className='outline-none h-full w-full bg-transparent p-1' />
                                </div>
                            </div>
                            <div>
                                <label>Password: </label>
                                <div className='bg-slate-200 p-2 rounded flex items-center mt-2'>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        value={data.password}
                                        onChange={handleOnChange}
                                        placeholder='enter password'
                                        className='outline-none h-full w-full bg-transparent p-1' />
                                    {
                                        data.password && (
                                            <div className='text-2xl cursor-pointer' onClick={() => setShowPassword(!showPassword)}>
                                                {
                                                    showPassword ? (<IoMdEyeOff />) : (<IoMdEye />)
                                                }
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                        <Link to={"/forgotPassword"} className='text-lg block w-fit ml-auto mt-1 hover:text-orange-500 hover:underline'>
                            forgot password?
                        </Link>
                        <button className='bg-green-500 text-white w-full max-w-[130px] block mx-auto m-4 py-3 rounded-full hover:scale-110 transition-all text-xl cursor-pointer'>
                            login
                        </button>
                    </form>
                    <p className='text-lg'>
                        Don't have an account? <Link to={"/SignUp"} className='hover:text-orange-500 hover:underline text-green-400'> Sign up </Link>
                    </p>
                </div>
            </div>
        </section>
    )
}

export default Login
