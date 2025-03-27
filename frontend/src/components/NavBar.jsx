import axios from "axios";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { logout } from "../redux/features/authSlice";
import { FaUserAlt } from "react-icons/fa";
import { IoCreateOutline } from "react-icons/io5";
import { BsCollection } from "react-icons/bs";
import { IoIosLogOut } from "react-icons/io";
import { CiSquarePlus } from "react-icons/ci";
const NavBar = () => {
  const [openModal, setOpenModal] = useState(false);
  const [user, setUser] = useState(null);
  const id = useSelector((state) => state.auth.userId);
  const API_URL = process.env.REACT_APP_API_URL;
  const isAuthenticated =
    useSelector((state) => state.auth.isAuthenticated) || false;
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    setOpenModal(!openModal);
  }

  function handleLogout() {
    try {
      axios.get(`${API_URL}/api/v1/user/logout`, { withCredentials: true });
      toast.success("Logged out successfully");
      navigate("/login");
      setOpenModal(false);
      dispatch(logout());
      setUser(null);
    } catch (error) {
      toast.error("Error in logging out");
    }
  }

  function handleLogin() {
    navigate("/login");
  }
  function handleYourBlog() {
    navigate("/yourBlog");
    setOpenModal(false);
  }
  function handleCreateBlog() {
    navigate("/createBlog");
    setOpenModal(false);
  }
  function handleHome() {
    navigate("/home");
    setOpenModal(false);
  }
  function handleCreateCategory() {
    navigate("/createCategory");
    setOpenModal(false);
  }
  return (
    <nav className="py-2 bg-white text-black shadow-md">
      <div className="lg:max-w-[1300px] md:max-w-[800px] max-w-[300px] mx-auto flex justify-between items-center">
        <button
          className="text-3xl font-black bg-gradient-to-r from-[#AF57C5] to-[#D33427] text-transparent bg-clip-text"
          onClick={handleHome}
        >
          Blogs
        </button>

        <div className="flex space-x-6 items-center">
          {isAuthenticated ? (
            <div className="flex items-start justify-center gap-2">
              <div>
                <button
                  onClick={handleClick}
                  className="w-12 h-12 flex items-center justify-center bg-gradient-to-r from-[#AF57C5] to-[#D33427] rounded-full text-white text-xl"
                >
                  <FaUserAlt />
                </button>
              </div>
              <div className="">
                <p className="text-center font-semibold ">{user?.name}</p>
                <p className="text-center text-gray-500 text-sm font-thin">
                  {user?.role}
                </p>
              </div>

              <div
                className={`absolute top-12 right-20 bg-white shadow-lg rounded-lg   w-48 ${
                  openModal ? "block" : "hidden"
                }`}
              >
                <button
                  className="block px-4 py-2 hover:bg-gray-100 w-full"
                  onClick={handleCreateBlog}
                >
                  <p className="flex items-center justify-center gap-1 ">
                    Create Blog <IoCreateOutline />
                  </p>
                </button>
                <button
                  onClick={handleYourBlog}
                  className="block px-4 py-2 hover:bg-gray-100 w-full"
                >
                  <p className="flex items-center justify-center gap-1">
                    Your Blogs <BsCollection />
                  </p>
                </button>
                {user?.role === "admin" && (
                  <button
                    onClick={handleCreateCategory}
                    className="block px-4 py-2 hover:bg-gray-100 w-full"
                  >
                    <p className="flex items-center justify-center gap-1">
                      Create Category <CiSquarePlus />
                    </p>
                  </button>
                )}
                <button
                  onClick={handleLogout}
                  className="block w-full px-4 py-2 text-red-500 hover:bg-gray-100 "
                >
                  <p className="flex items-center justify-center gap-1">
                    Logout <IoIosLogOut />
                  </p>
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={handleLogin}
              className="px-6 py-2 bg-gradient-to-r from-[#007FFF] to-[#6CB4EE] hover:from-[#1034A6] hover:to-[#00BFFF] text-white cursor-pointer rounded-lg transition-all duration-300"
            >
              LogIn
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
