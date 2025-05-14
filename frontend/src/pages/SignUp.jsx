import React, { useState } from 'react';
import loginIcon from '../assets/output-onlinegiftools.gif';
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { Link, useNavigate } from 'react-router-dom';
import imageToBase64 from '../helpers/imageToBase64';
import summaryApi from '../common';
import { toast } from 'react-toastify';
import Spinner from '../components/Spinner';

function SignUp() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [data, setData] = useState({
    profilePic: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    if (data.password === data.confirmPassword) {
      setLoading(true);
      try {
        const dataResponse = await fetch(summaryApi.signUp.url, {
          method: summaryApi.signUp.method,
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(data),
        });

        const userData = await dataResponse.json();
        setLoading(false);

        if (userData.success) {
          toast.success(userData.message);
          navigate("/login");
        } else if (userData.error) {
          toast.error(userData.message);
        }
      } catch (error) {
        setLoading(false);
        toast.error("An error occurred while signing up.");
      }
    } else {
      toast.error("Passwords do not match.");
    }
  };

  const handleUploadPic = async (e) => {
    const file = e.target.files[0];
    const imagePic = await imageToBase64(file);
    setData((prevData) => ({
      ...prevData,
      profilePic: imagePic,
    }));
  };

  return (
    <section id="signup">
      <div className="container mx-auto p-4 relative">
        {loading && <Spinner/>}
        <div
          className="bg-white w-full max-w-md mx-auto p-4">
          <div className="w-30 h-30 mx-auto relative rounded-full overflow-hidden">
            <div className="h-full">
              <img src={data.profilePic || loginIcon} alt="Profile" className="h-full" />
            </div>
            <form>
              <label>
                <div className="text-sm bg-slate-200 opacity-80 pb-5 pt-2 absolute w-full bottom-0 cursor-pointer text-center">
                  Upload image
                </div>
                <input type="file" className="hidden" onChange={handleUploadPic} />
              </label>
            </form>
          </div>

          <form className="mt-6" onSubmit={handleOnSubmit}>
            <div className="flex flex-col gap-3 text-xl">
              <div>
                <label>Username: </label>
                <div className="bg-slate-200 p-2 rounded mt-2">
                  <input
                    type="text"
                    onChange={handleOnChange}
                    name="username"
                    required
                    value={data.username}
                    placeholder="Enter username"
                    className="outline-none h-full w-full bg-transparent p-1"
                    disabled={loading}
                  />
                </div>
              </div>
              <div>
                <label>Email: </label>
                <div className="bg-slate-200 p-2 rounded mt-2">
                  <input
                    type="email"
                    onChange={handleOnChange}
                    name="email"
                    required
                    value={data.email}
                    placeholder="Enter email"
                    className="outline-none h-full w-full bg-transparent p-1"
                    disabled={loading}
                  />
                </div>
              </div>
              <div>
                <label>Password: </label>
                <div className="bg-slate-200 p-2 rounded flex items-center mt-2">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    required
                    value={data.password}
                    onChange={handleOnChange}
                    placeholder="Enter password"
                    className="outline-none h-full w-full bg-transparent p-1"
                    disabled={loading}
                  />
                  {data.password && (
                  <div
                    className="text-2xl cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <IoMdEyeOff /> : <IoMdEye />}
                  </div>
                )}
                </div>
              </div>
              <div>
                <label>Confirm Password: </label>
                <div className="bg-slate-200 p-2 rounded flex items-center mt-2">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    required
                    value={data.confirmPassword}
                    onChange={handleOnChange}
                    placeholder="Confirm password"
                    className="outline-none h-full w-full bg-transparent p-1"
                    disabled={loading}
                  />
                  {data.confirmPassword && (
                  <div
                    className="text-2xl cursor-pointer"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <IoMdEyeOff /> : <IoMdEye />}
                  </div>
                )}
                </div>
              </div>
            </div>

            <button
              type="submit"
              className={`bg-green-500 text-white w-full max-w-[130px] block mx-auto m-4 py-3 rounded-full hover:scale-110 transition-all text-xl cursor-pointer ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={loading}
            >
              Signup
            </button>
          </form>

          <p className="text-lg">
            Already have an account?{" "}
            <Link to={"/login"} className="hover:text-orange-500 hover:underline text-green-400">
              Login
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}

export default SignUp;
