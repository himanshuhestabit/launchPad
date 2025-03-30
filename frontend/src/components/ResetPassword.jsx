import axios from "axios";
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { RiLockPasswordFill } from "react-icons/ri";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const imageUrl =
    "https://images.unsplash.com/photo-1511447333015-45b65e60f6d5?q=80&w=1855&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

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
    if (password !== confirmPassword) {
      return toast.error("Passwords do not match!");
    }
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/v1/user/resetPassword/${token}`,
        { password }
      );
      toast.success(data.message);
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
    setLoading(false);
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
              Reset Your{" "}
              <span className="bg-gradient-to-r from-[#AF57C5] to-[#D33427] text-transparent bg-clip-text">
                Password
              </span>
            </p>
            <p className="text-2xl font-bold pb-4">
              Secure your account with a new password.
            </p>
            <p className="font-thin">
              Enter a strong password and confirm it to reset your credentials.
            </p>
          </div>

          <div className="pt-12">
            <form
              onSubmit={handleSubmit}
              className="w-full flex flex-col gap-6 py-6"
            >
              <div className="flex flex-col gap-2 w-full">
                <label
                  htmlFor="password"
                  className="text-lg font-semibold flex items-center gap-1"
                >
                  <RiLockPasswordFill />
                  New Password
                </label>
                <input
                  type="password"
                  className="bg-gray-300 w-full py-3 px-5 rounded-full outline-none"
                  placeholder="Enter new password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="flex flex-col gap-2 w-full">
                <label
                  htmlFor="confirmPassword"
                  className="text-lg font-semibold flex items-center gap-1"
                >
                  <RiLockPasswordFill />
                  Confirm Password
                </label>
                <input
                  type="password"
                  className="bg-gray-300 w-full py-3 px-5 rounded-full outline-none"
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#AF57C5] to-[#D33427] text-white py-2 rounded-full font-semibold transition-all hover:brightness-95"
                  disabled={loading}
                >
                  {loading ? "Resetting..." : "Reset Password"}
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
                alt="reset-password-image"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ResetPassword;
