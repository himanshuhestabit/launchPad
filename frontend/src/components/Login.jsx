import axios from "axios";
import React, { useEffect } from "react";
import { MdEmail, MdError } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/features/authSlice";

const Login = () => {
  const user = JSON.parse(localStorage.getItem("isAuthenticated"));
  const imageUrl =
    "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
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
    <div className="w-full h-[90vh]">
      <div className="max-w-[1490px] mx-auto flex items-center justify-between h-full gap-4">
        <div className="w-2/4  h-full py-16">
          <div>
            <p className="text-4xl font-black pb-3">Welcome to Blog App</p>
            <p className="text-2xl font-bold pb-4">Please Login To Continue</p>
            <p className="font-thin">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Doloribus eaque amet saepe assumenda commodi deleniti impedit
              accusamus soluta quidem ex.
            </p>
          </div>
          <div className="pt-12">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="w-full flex flex-col gap-6 py-6"
            >
              <div className="flex flex-col gap-2 w-full">
                <label
                  htmlFor="email"
                  className="text-lg font-semibold flex items-center gap-1"
                >
                  <MdEmail />
                  Email
                </label>
                <input
                  {...register("email", { required: "Email is required" })}
                  className="bg-gray-300 w-full py-3 px-5 rounded-full outline-none"
                  autoComplete="off"
                  placeholder="Enter Your Email"
                />
                {errors.email && (
                  <div className="flex items-center gap-1 text-red-500">
                    <MdError />
                    <p>{errors.email.message}</p>
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-2 w-full">
                <label
                  htmlFor="password"
                  className="text-lg font-semibold flex items-center gap-1"
                >
                  <RiLockPasswordFill />
                  Password
                </label>
                <input
                  type="password"
                  {...register("password", {
                    required: "Password is required",
                  })}
                  className="bg-gray-300 w-full py-3 px-5 rounded-full outline-none"
                  autoComplete="off"
                  placeholder="Enter Your Password"
                />
                {errors.password && (
                  <div className="flex items-center gap-1 text-red-500">
                    <MdError />
                    <p>{errors.password.message}</p>
                  </div>
                )}
              </div>
              <div>
                <input
                  className="bg-gradient-to-r from-[#AF57C5] to-[#D33427] text-white px-6 py-2 rounded-lg transition-all duration-300 hover:brightness-90 cursor-pointer"
                  type="submit"
                  value={isSubmitting ? "Submitting..." : "Submit"}
                  disabled={isSubmitting}
                />
              </div>
            </form>
            <div className="pt-6">
              <p className="text-lg">
                New User? Please{" "}
                <Link
                  to={"/"}
                  className="font-bold text-blue-500 hover:text-blue-600 "
                >
                  Register
                </Link>
              </p>
            </div>
          </div>
        </div>
        <div className="w-2/4 h-full flex items-center justify-center ">
          <div className="w-[98%] h-[98%]  flex items-center justify-center border-animation">
            <div className="w-[96%] h-[96%]  rounded-lg overflow-hidden ">
              <img
                src={imageUrl}
                alt="login-page-image"
                className="w-full h-full object-cover "
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
