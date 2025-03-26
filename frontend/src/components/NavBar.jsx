import axios from "axios";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { logout } from "../redux/features/authSlice";

const NavBar = () => {
  const [openModal, setOpenModal] = useState(false);
  const userImage =
    "https://img.freepik.com/free-psd/3d-icon-social-media-app_23-2150049569.jpg?t=st=1742973848~exp=1742977448~hmac=fbb9c9db5620c0ad43116c34317e114ba636dcb6fb485abd05959e78791c6e94&w=740";
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
      dispatch(logout());
      setUser(null);
    } catch (error) {
      toast.error("Error in logging out");
    }
  }

  function handleLogin() {
    navigate("/login");
  }

  return (
    <nav className="py-2 bg-white text-black shadow-md">
      <div className="lg:max-w-[1300px] md:max-w-[800px] max-w-[300px] mx-auto flex justify-between items-center">
        <Link
          className="text-3xl font-black bg-gradient-to-r from-[#AF57C5] to-[#D33427] text-transparent bg-clip-text"
          to="/blog"
        >
          Blogs
        </Link>

        <div className="flex space-x-6 items-center">
          {isAuthenticated ? (
            <div className="flex items-start justify-center gap-2">
              <div>
                <button onClick={handleClick}>
                  <img
                    src={userImage}
                    alt=""
                    className="w-14 h-14 rounded-full"
                  />
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
                <Link
                  to="/createBlog"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Create Blog
                </Link>
                <Link
                  to="/yourBlog"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Your Blog
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100"
                >
                  Logout
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
