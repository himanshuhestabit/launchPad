import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/features/authSlice";
const Login = () => {
  const API_URL = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    watch,
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
      <div className="w-full">
        <div className="text-3xl font-bold container mx-auto mb-6 text-center">
          <p>Login User</p>
        </div>
        <div className="w-full">
          <form
            action=""
            onSubmit={handleSubmit(onSubmit)}
            className="w-full container mx-auto flex flex-col gap-4"
          >
            <div className="flex flex-col gap-2 w-full">
              <label htmlFor="">Email</label>
              <input
                {...register("email")}
                className="bg-[#3B1C32] w-3/4 p-3 rounded-md"
              />
            </div>
            <div className="flex flex-col gap-2 w-full">
              <label htmlFor="">Password</label>
              <input
                {...register("password")}
                className="bg-[#3B1C32] w-3/4 p-3 rounded-md"
              />
            </div>
            <div>
              <input
                className="bg-[#6A1E55] text-white px-4 py-2 rounded"
                type="submit"
                value={isSubmitting ? "Submitting..." : "Submit"}
                disabled={isSubmitting}
              />
            </div>
          </form>
          <div className="text-center text-blue-300">
            <Link to="/">Register? New user</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
