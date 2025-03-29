import axios from "axios";
import React, { useEffect, useState } from "react";
import { MdEmail, MdError } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { useForm } from "react-hook-form";
import { FaUser, FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

const Register = () => {
  const [readPass, setReadPass] = useState(false);
  const user = JSON.parse(localStorage.getItem("isAuthenticated"));
  const imageUrl =
    "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fA%3D%3D";
  const API_URL = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();

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
      if (data?.password === data?.confirmPassword) {
        const response = await axios.post(
          `${API_URL}/api/v1/user/register`,
          data,
          {
            withCredentials: true,
          }
        );

        if (response.status === 201) {
          toast.success(response?.data?.message);
          navigate("/login");
        } else {
          throw new Error("User data missing in response");
        }
      } else {
        toast.error("Password and Confirm Password is not matching");
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  }

  function handleClick() {
    setReadPass(!readPass);
  }

  return (
    <div className="w-full lg:h-screen flex items-center justify-center">
      <div className="lg:max-w-[1300px] md:max-w-[800px] max-w-[300px] mx-auto flex items-center justify-between h-full gap-4 lg:flex-row flex-col">
        {/* Left Section - Text & Form */}
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="lg:w-2/4 h-full py-16 w-full"
        >
          <div>
            <p className="text-4xl font-black pb-3">
              Welcome to{" "}
              <span className="bg-gradient-to-r from-[#AF57C5] to-[#D33427] text-transparent bg-clip-text">
                Blog App
              </span>
            </p>
            <p className="text-2xl font-bold pb-4">Register To Get Started</p>
            <p className="font-thin">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam
              ipsa voluptate nam culpa iure, aliquam ipsum aperiam labore hic
              quasi illo est dolore cupiditate. Impedit?
            </p>
          </div>
          <div className="pt-12">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="w-full flex flex-col gap-6 py-6"
            >
              <div className="flex flex-col gap-2 w-full">
                <label className="text-lg font-semibold flex items-center gap-1">
                  <FaUser />
                  Name
                </label>
                <input
                  {...register("name", {
                    required: "Name is required",
                    pattern: {
                      value: /^[A-Za-z\s]+$/,
                      message: "Only Characters are allowed",
                    },
                    minLength: {
                      value: 2,
                      message: "Name must contain 2 characters",
                    },
                    maxLength: {
                      value: 16,
                      message: "Name must be less than 16 characters",
                    },
                  })}
                  className="bg-gray-300 w-full py-3 px-5 rounded-full outline-none"
                  autoComplete="off"
                  placeholder="Please Enter Your Name"
                />
                {errors.name && (
                  <div className="flex items-center gap-1 text-red-500">
                    <MdError />
                    <p>{errors.name.message}</p>
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-2 w-full">
                <label className="text-lg font-semibold flex items-center gap-1">
                  <MdEmail />
                  Email
                </label>
                <input
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/,
                      message: "Please Enter Valid Email",
                    },
                  })}
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
                <label className="text-lg font-semibold flex items-center gap-1">
                  <RiLockPasswordFill />
                  Password
                </label>
                <div className="relative flex items-center w-full">
                  <input
                    type={readPass ? "text" : "password"}
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 8,
                        message: "Password must be at least 8 characters",
                      },
                      maxLength: {
                        value: 16,
                        message: "Password must be at most 16 characters",
                      },
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
              <div className="flex flex-col gap-2 w-full">
                <label className="text-lg font-semibold flex items-center gap-1">
                  <RiLockPasswordFill />
                  Confirm Password
                </label>
                <div className="relative flex items-center w-full">
                  <input
                    type={readPass ? "text" : "password"}
                    {...register("confirmPassword", {
                      required: "Confirm Password is required",
                      minLength: {
                        value: 8,
                        message: "Password must be at least 8 characters",
                      },
                      maxLength: {
                        value: 16,
                        message: "Password must be at most 16 characters",
                      },
                    })}
                    className="bg-gray-300 w-full py-3 px-5 pr-12 rounded-full outline-none"
                    autoComplete="off"
                    placeholder="Confirm Your Password"
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
                {errors.confirmPassword && (
                  <div className="flex items-center gap-1 text-red-500">
                    <MdError />
                    <p>{errors.confirmPassword.message}</p>
                  </div>
                )}
              </div>
              <div>
                <input
                  className="bg-gradient-to-r from-[#AF57C5] to-[#D33427] text-white px-6 py-2 rounded-lg transition-all duration-300 hover:brightness-90 cursor-pointer"
                  type="submit"
                  value={isSubmitting ? "Submitting..." : "Register"}
                  disabled={isSubmitting}
                />
              </div>
            </form>
            <div className="pt-6">
              <p className="text-lg">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-bold bg-gradient-to-r from-[#007FFF] to-[#6CB4EE] text-transparent bg-clip-text hover:text-blue-600"
                >
                  Login
                </Link>
              </p>
            </div>
          </div>
        </motion.div>

        {/* Right Section - Image */}
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-2/4 h-[90%] lg:flex items-start justify-end hidden"
        >
          <div className="w-[92%] h-[92%] flex items-center justify-center border-animation">
            <div className="w-[94%] h-[94%] rounded-lg overflow-hidden">
              <img
                src={imageUrl}
                alt="register-page-image"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;
