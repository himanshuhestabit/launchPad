import axios from "axios";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {
  const user = JSON.parse(localStorage.getItem("isAuthenticated"));
  console.log(user);
  useEffect(() => {
    if (user) {
      navigate("/blog");
    }
  }, []);
  const imageUrl =
    "https://img.freepik.com/free-vector/mobile-login-concept-illustration_114360-83.jpg?t=st=1741858072~exp=1741861672~hmac=55fa744dd2302e6816a8128fa88d8e07af1f648d79d62e8d0e53b0c4b79188ae&w=740";
  const API_URL = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  async function onSubmit(data) {
    try {
      const response = await axios.post(
        `${API_URL}/api/v1/user/register`,
        data
      );
      if (response.status === 201) {
        navigate("/login");
      }
      toast.success("User registered successfully!");
    } catch (error) {
      toast.error("Failed to register user");
    }
  }

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-[#1A1A1D] text-white px-4">
      <div className="bg-[#3B1C32] w-full max-w-4xl rounded-xl flex flex-col md:flex-row items-center justify-center p-6 md:p-10 shadow-lg">
        {/* Left Side: Register Form */}
        <div className="w-full md:w-1/2 flex flex-col items-center">
          <p className="text-2xl md:text-3xl font-bold mb-6">Register User</p>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full flex flex-col gap-4"
          >
            <div className="flex flex-col gap-2 w-full">
              <label>Name</label>
              <input
                {...register("name", { required: "Name is required" })}
                className="bg-[#1A1A1D] w-full p-3 rounded-md"
                autoComplete="off"
                placeholder="Enter Your Name"
              />
              {errors.name && (
                <p className="text-red-500">{errors.name.message}</p>
              )}
            </div>
            <div className="flex flex-col gap-2 w-full">
              <label>Email</label>
              <input
                type="email"
                {...register("email", { required: "Email is required" })}
                className="bg-[#1A1A1D] w-full p-3 rounded-md"
                placeholder="Enter Your Email"
                autoComplete="off"
              />
              {errors.email && (
                <p className="text-red-500">{errors.email.message}</p>
              )}
            </div>
            <div className="flex flex-col gap-2 w-full">
              <label>Password</label>
              <input
                type="password"
                {...register("password", { required: "Password is required" })}
                className="bg-[#1A1A1D] w-full p-3 rounded-md"
                placeholder="Enter Your Password"
                autoComplete="off"
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
            to="/login"
            className="mt-4 text-blue-200 hover:text-blue-300 transition-all duration-300"
          >
            Already have an account? Login
          </Link>
        </div>

        {/* Right Side: Image */}
        <div className="hidden md:flex w-full md:w-1/2 justify-center">
          <img
            className="bg-transparent bg-cover w-3/4"
            src={imageUrl}
            alt="Register"
          />
        </div>
      </div>
    </div>
  );
};

export default Register;
