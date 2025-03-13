import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/features/authSlice";

const Login = () => {
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

  async function onSubmit(data) {
    try {
      const response = await axios.post(`${API_URL}/api/v1/user/login`, data, {
        withCredentials: true,
      });

      console.log("API Response:", response.data);
      if (response.status === 200) {
        dispatch(loginSuccess());
        toast.success("User logged in successfully!");
        navigate("/blog");
      }
    } catch (error) {
      console.error("Login Error:", error);
      toast.error("Failed to login user");
    }
  }

  return (
    <div className="w-full h-screen flex items-center justify-center bg-[#1A1A1D] text-white flex-col">
      <div className="bg-[#3B1C32] w-2/4 h-2/4 rounded-xl flex flex-col items-center justify-center">
        <div>
          <p className="text-3xl font-bold container mx-auto mb-6">
            Login User
          </p>
        </div>
        <div className="w-[90%] flex">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full flex flex-col gap-4"
          >
            <div className="flex flex-col gap-2 w-full">
              <label htmlFor="email">Email</label>
              <input
                {...register("email", { required: "Email is required" })}
                className="bg-[#1A1A1D] w-3/4 p-3 rounded-md"
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
                className="bg-[#1A1A1D] w-3/4 p-3 rounded-md"
              />
              {errors.password && (
                <p className="text-red-500">{errors.password.message}</p>
              )}
            </div>
            <div>
              <input
                className="bg-[#1A1A1D] text-white px-4 py-2 rounded-lg hover:bg-[#101012] cursor-pointer transition-all duration-300"
                type="submit"
                value={isSubmitting ? "Submitting..." : "Submit"}
                disabled={isSubmitting}
              />
            </div>
          </form>
          <div className="text-center flex flex-col items-center justify-center">
            <img
              className="bg-transparent bg-cover w-[85%] h-auto pb-3"
              src={imageUrl}
              alt="login Image"
            />
            <Link
              to="/"
              className="cursor-pointer text-blue-200 hover:text-blue-300 transition-all duration-300"
            >
              New User? Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
