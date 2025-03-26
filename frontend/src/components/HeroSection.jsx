import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FaLongArrowAltRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();
  const imageUrl =
    "https://t4.ftcdn.net/jpg/03/08/69/75/360_F_308697506_9dsBYHXm9FwuW0qcEqimAEXUvzTwfzwe.jpg";
  const [user, setUser] = useState(null);
  const id = useSelector((state) => state.auth.userId);
  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    async function fetchUserDetails() {
      if (id) {
        try {
          const response = await axios.get(
            `${API_URL}/api/v1/user/getUser/${id}`,
            { withCredentials: true }
          );
          setUser(response.data.user);
        } catch (error) {
          console.error("Error fetching user details", error);
        }
      }
    }
    fetchUserDetails();
  }, [id, API_URL]);
  function handleClick() {
    navigate("/blog");
  }
  return (
    <div className="w-full px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center justify-between gap-8 py-10">
        {/* Left Section */}
        <div className="w-full lg:w-1/2 text-center lg:text-left">
          <p className="text-4xl sm:text-5xl lg:text-6xl font-black pb-3">
            Welcome,{" "}
            <span className="bg-gradient-to-r from-[#AF57C5] to-[#D33427] text-transparent bg-clip-text">
              {user?.name || "Guest"}
            </span>
          </p>
          <p className="text-xl sm:text-2xl lg:text-3xl font-bold pb-4">
            This platform has{" "}
            <span className="bg-gradient-to-r from-[#AF57C5] to-[#D33427] text-transparent bg-clip-text">
              10000+
            </span>{" "}
            users
          </p>
          <p className="text-sm sm:text-base font-thin max-w-md mx-auto lg:mx-0">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            Perspiciatis architecto laborum harum mollitia obcaecati, quod
            fugiat voluptatibus voluptatem quos ut fuga vero aperiam quidem,
            dolor iure assumenda explicabo quia eum?
          </p>
          <button
            className="flex items-center justify-center gap-2 mt-5 bg-gradient-to-r from-[#AF57C5] to-[#D33427] text-white px-6 py-2 rounded-lg transition-all duration-300 hover:brightness-90 cursor-pointer mx-auto lg:mx-0"
            onClick={handleClick}
          >
            Explore Blog <FaLongArrowAltRight />
          </button>
        </div>

        {/* Right Section */}
        <div className="w-full lg:w-1/2">
          <img
            src={imageUrl}
            alt="Hero-Image"
            className="w-full h-auto object-cover rounded-md shadow-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
