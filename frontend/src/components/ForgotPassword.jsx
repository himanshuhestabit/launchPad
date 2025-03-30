import axios from "axios";
import React, { useState } from "react";
import { MdEmail, MdError } from "react-icons/md";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const imageUrl =
    "https://images.unsplash.com/photo-1579567761406-4684ee0c75b6?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  // Animation Variants
  const slideLeft = {
    hidden: { x: -100, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.8 } },
  };

  const slideRight = {
    hidden: { x: 100, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.8 } },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/v1/user/forgotPassword`,
        { email }
      );
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
    setLoading(false);
  };

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
              Forgot Your{" "}
              <span className="bg-gradient-to-r from-[#AF57C5] to-[#D33427] text-transparent bg-clip-text">
                Password?
              </span>
            </p>
            <p className="text-2xl font-bold pb-4">
              No worries! We’ll help you reset it.
            </p>
            <p className="font-thin">
              Enter your email, and we'll send you a password reset link.
            </p>
          </div>

          <div className="pt-12">
            <form
              onSubmit={handleSubmit}
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
                  type="email"
                  className="bg-gray-300 w-full py-3 px-5 rounded-full outline-none"
                  autoComplete="off"
                  placeholder="Enter Your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#AF57C5] to-[#D33427] text-white py-2 rounded-full font-semibold transition-all hover:brightness-95"
                  disabled={loading}
                >
                  {loading ? "Sending..." : "Send Reset Link"}
                </button>
                <button
                  type="button"
                  className="w-full bg-gray-300 text-gray-800 py-2 rounded-full font-semibold transition-all hover:bg-gray-400"
                  onClick={() => navigate("/login")}
                >
                  Cancel
                </button>
              </div>
            </form>
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
                alt="forgot-password-image"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ForgotPassword;
