import axios from "axios";
import React from "react";
import { MdEmail, MdError } from "react-icons/md";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

const VerifyOTP = () => {
  const email = localStorage.getItem("otpEmail");
  const API_URL = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  async function onSubmit(data) {
    try {
      const response = await axios.post(`${API_URL}/api/v1/user/verifyOtp`, {
        email,
        otp: data.otp,
      });
      if (response.status === 200) {
        toast.success(response.data.message);
        localStorage.removeItem("otpEmail");
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
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

  const imageUrl =
    "https://img.freepik.com/free-photo/medium-shot-man-wearing-vr-glasses_23-2149126949.jpg?t=st=1743338560~exp=1743342160~hmac=8b4d2bb709746d65da9ccb3b8090ac000df4076d2261f79f697ffc0119fe332b&w=1380";

  return (
    <div className="w-full h-screen">
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
              Verify Your{" "}
              <span className="bg-gradient-to-r from-[#AF57C5] to-[#D33427] text-transparent bg-clip-text">
                OTP
              </span>
            </p>
            <p className="text-2xl font-bold pb-4">Check Your Email</p>
            <p className="font-thin">
              We've sent a One-Time Password (OTP) to your email <b>{email}</b>.
              Enter the OTP below to verify your account.
            </p>
          </div>

          <div className="pt-12">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="w-full flex flex-col gap-6 py-6"
            >
              <div className="flex flex-col gap-2 w-full">
                <label className="text-lg font-semibold flex items-center gap-1">
                  <MdEmail />
                  OTP Code
                </label>
                <input
                  {...register("otp", {
                    required: "OTP is required",
                    pattern: {
                      message: "Enter a valid 6-digit OTP",
                    },
                  })}
                  className="bg-gray-300 w-full py-3 px-5 rounded-full outline-none"
                  autoComplete="off"
                  placeholder="Enter Your OTP"
                />
                {errors.otp && (
                  <div className="flex items-center gap-1 text-red-500">
                    <MdError />
                    <p>{errors.otp.message}</p>
                  </div>
                )}
              </div>

              <div>
                <input
                  className="bg-gradient-to-r from-[#AF57C5] to-[#D33427] text-white px-6 py-2 rounded-lg transition-all duration-300 hover:brightness-95 cursor-pointer"
                  type="submit"
                  value={isSubmitting ? "Verifying..." : "Verify OTP"}
                  disabled={isSubmitting}
                />
              </div>
            </form>

            <div className="pt-6">
              <p className="text-lg">
                Entered the wrong email?{" "}
                <Link
                  to={"/"}
                  className="font-bold bg-gradient-to-r from-[#007FFF] to-[#6CB4EE] text-transparent bg-clip-text hover:text-blue-600"
                >
                  Register Again
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
                alt="verify-otp-page-image"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default VerifyOTP;
