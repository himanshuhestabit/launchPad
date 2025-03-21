import axios from "axios";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/features/authSlice";

const Login = () => {
  const user = JSON.parse(localStorage.getItem("isAuthenticated"));
  console.log(user);
  const imageUrl =
    "https://img.freepik.com/free-vector/secure-login-concept-illustration_114360-4685.jpg?t=st=1741859293~exp=1741862893~hmac=d111e44bc18cd67482ca875a45b9c9bda51cbde3576e2bcb2f3a52e4be8278b8&w=740";
  const API_URL = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  useEffect(() => {
    if (user) {
      navigate("/blog");
    }
  }, []);
  async function onSubmit(data) {
    try {
      const response = await axios.post(`${API_URL}/api/v1/user/login`, data, {
        withCredentials: true,
      });
      if (response.status === 200) {
        const { role } = response.data.userExist;
        dispatch(loginSuccess({ role }));
        toast.success("User logged in successfully!");
        navigate("/blog");
      }
    } catch (error) {
      toast.error("Failed to login user");
    }
  }

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-[#1A1A1D] text-white px-4">
      <div className="bg-[#3B1C32] w-full max-w-4xl rounded-xl flex flex-col md:flex-row items-center justify-center p-6 md:p-10 shadow-lg">
        <div className="w-full md:w-1/2 flex flex-col items-center">
          <p className="text-2xl md:text-3xl font-bold mb-6">Login User</p>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full flex flex-col gap-4"
          >
            <div className="flex flex-col gap-2 w-full">
              <label htmlFor="email">Email</label>
              <input
                {...register("email", { required: "Email is required" })}
                className="bg-[#1A1A1D] w-full p-3 rounded-md"
                autoComplete="off"
                placeholder="Enter Your Email"
              />
              {errors.email && (
                <p className="text-red-500">{errors.email.message}</p>
              )}
            </div>
            <div className="flex flex-col gap-2 w-full">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                {...register("password", { required: "Password is required" })}
                className="bg-[#1A1A1D] w-full p-3 rounded-md"
                autoComplete="off"
                placeholder="Enter Your Password"
              />
              {errors.password && (
                <p className="text-red-500">{errors.password.message}</p>
              )}
            </div>
            <div>
              <input
                className="bg-green-600 text-white w-full px-4 py-2 rounded-lg hover:bg-green-700 cursor-pointer transition-all duration-300"
                type="submit"
                value={isSubmitting ? "Submitting..." : "Submit"}
                disabled={isSubmitting}
              />
            </div>
          </form>
          <Link
            to="/"
            className="mt-4 text-blue-200 hover:text-blue-300 transition-all duration-300"
          >
            New User? Register
          </Link>
        </div>

        <div className="hidden md:flex w-full md:w-1/2 justify-center">
          <img
            className="bg-transparent bg-cover w-3/4"
            src={imageUrl}
            alt="Login"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
