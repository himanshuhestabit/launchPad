import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const Register = () => {
  const imageUrl =
    "https://img.freepik.com/free-vector/mobile-login-concept-illustration_114360-83.jpg?t=st=1741858072~exp=1741861672~hmac=55fa744dd2302e6816a8128fa88d8e07af1f648d79d62e8d0e53b0c4b79188ae&w=740";
  const API_URL = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  async function onSubmit(data) {
    try {
      const response = await axios.post(
        `${API_URL}/api/v1/user/register`,
        data
      );
      console.log("User registered successfully:", response.data);
      if (response.status === 201) {
        navigate("/login");
      }
      toast.success("User registered successfully!");
    } catch (error) {
      toast.error("Failed to register user");
    }
  }

  return (
    <div className="w-full h-screen flex items-center justify-center bg-[#1A1A1D] text-white flex-col">
      <div className="bg-[#3B1C32] w-2/4 h-2/4 rounded-xl flex flex-col items-center justify-center">
        <div>
          <p className="text-3xl font-bold container mx-auto mb-6">
            {" "}
            Register User
          </p>
        </div>
        <div className="w-[90%] flex">
          <form
            action=""
            onSubmit={handleSubmit(onSubmit)}
            className="w-full flex flex-col gap-4"
          >
            <div className="flex flex-col gap-2 w-full">
              <label htmlFor="">Name</label>
              <input
                {...register("name")}
                className="bg-[#1A1A1D] w-3/4 p-3 rounded-md"
              />
            </div>
            <div className="flex flex-col gap-2 w-full">
              <label htmlFor="">Email</label>
              <input
                {...register("email")}
                className="bg-[#1A1A1D] w-3/4 p-3 rounded-md"
              />
            </div>
            <div className="flex flex-col gap-2 w-full">
              <label htmlFor="">Password</label>
              <input
                {...register("password")}
                className="bg-[#1A1A1D] w-3/4 p-3 rounded-md"
              />
            </div>
            <div>
              <input
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 cursor-pointer transition-all duration-300"
                type="submit"
                value={isSubmitting ? "Submitting..." : "Submit"}
                disabled={isSubmitting}
              />
            </div>
          </form>
          <div className="text-center flex flex-col items-center justify-center">
            <img
              className="bg-transparent bg-cover w-[85%] h-auto pb-3 "
              src={imageUrl}
              alt="Register Image"
            />
            <Link
              to="/login"
              className="cursor-pointer text-blue-200 hover:text-blue-300 transition-all duration-300 "
            >
              Already have an account? Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
