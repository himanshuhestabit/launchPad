import axios from "axios";
import React, { useEffect, useState } from "react";
import { MdEmail, MdError } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/features/authSlice";
import { motion } from "framer-motion";

const Login = () => {
  const [readPass, setReadPass] = useState(false);
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
      navigate("/home");
    }
  }, []);

  async function onSubmit(data) {
    try {
      const response = await axios.post(`${API_URL}/api/v1/user/login`, data, {
        withCredentials: true,
      });
      console.log(response);
      if (response.status === 200) {
        const { role, _id } = response.data.userExist;
        dispatch(loginSuccess({ role, userId: _id }));
        toast.success(response?.data?.message);
        navigate("/home");
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  }

  function handleClick() {
    setReadPass(!readPass);
  }

  // Animation Variants
  const slideLeft = {
    hidden: { x: -100, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.8 } },
  };

  const slideRight = {
    hidden: { x: 100, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.8 } },
  };

  return (
    <div className="w-full lg:h-screen">
      <div className="lg:max-w-[1300px] md:max-w-[800px] max-w-[300px] mx-auto flex items-center justify-between h-full gap-4 lg:flex-row flex-col">
        {/* Left Side (Form) - Sliding from Left */}
        <motion.div
          className="lg:w-2/4 w-full h-full py-16"
          initial="hidden"
          animate="visible"
          variants={slideLeft}
        >
          <div>
            <p className="text-4xl font-black pb-3">
              Welcome to{" "}
              <span className="bg-gradient-to-r from-[#AF57C5] to-[#D33427] text-transparent bg-clip-text">
                Blog App
              </span>
            </p>
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
                <div className="relative flex items-center w-full">
                  <input
                    type={readPass ? "text" : "password"}
                    {...register("password", {
                      required: "Password is required",
                    })}
                    className="bg-gray-300 w-full py-3 px-5 pr-12 rounded-full outline-none"
                    autoComplete="off"
                    placeholder="Enter Your Password"
                  />
                  {readPass ? (
                    <FaEye
                      className="absolute right-4 md:right-6 cursor-pointer text-gray-600"
                      onClick={handleClick}
                    />
                  ) : (
                    <FaEyeSlash
                      className="absolute right-4 md:right-6 cursor-pointer text-gray-600"
                      onClick={handleClick}
                    />
                  )}
                </div>
                {errors.password && (
                  <div className="flex items-center gap-1 text-red-500">
                    <MdError />
                    <p>{errors.password.message}</p>
                  </div>
                )}
              </div>

              <div>
                <input
                  className="bg-gradient-to-r from-[#AF57C5] to-[#D33427] text-white px-6 py-2 rounded-lg transition-all duration-300 hover:brightness-95 cursor-pointer"
                  type="submit"
                  value={isSubmitting ? "Submitting..." : "Login"}
                  disabled={isSubmitting}
                />
              </div>
            </form>

            <div className="pt-6 flex items-center justify-between">
              <p className="text-lg">
                New User? Please{" "}
                <Link
                  to={"/"}
                  className="font-bold bg-gradient-to-r from-[#007FFF] to-[#6CB4EE] text-transparent bg-clip-text hover:text-blue-600"
                >
                  Register
                </Link>
              </p>
              <p className="text-lg text-right">
                <Link
                  to="/forgotPassword"
                  className="font-bold bg-gradient-to-r from-[#007FFF] to-[#6CB4EE] text-transparent bg-clip-text hover:text-blue-600"
                >
                  Forgot Password?
                </Link>
              </p>
            </div>
          </div>
        </motion.div>

        {/* Right Side (Image) - Sliding from Right */}
        <motion.div
          className="w-2/4 h-[90%] lg:flex items-start justify-end hidden"
          initial="hidden"
          animate="visible"
          variants={slideRight}
        >
          <div className="w-[92%] h-[92%] flex items-center justify-center border-animation">
            <div className="w-[94%] h-[94%] rounded-lg overflow-hidden">
              <img
                src={imageUrl}
                alt="login-page-image"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
