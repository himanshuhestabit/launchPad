import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { logout } from "../redux/features/authSlice";

const NavBar = () => {
  const role = useSelector((state) => state.auth.role);
  const API_URL = process.env.REACT_APP_API_URL;
  const isAuthenticated =
    useSelector((state) => state.auth.isAuthenticated) || false;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleLogout() {
    try {
      axios.get(`${API_URL}/api/v1/user/logout`, {
        withCredentials: true,
      });
      toast.success("Logged out successfully");
      navigate("/login");
      dispatch(logout());
    } catch (error) {
      toast.error("Error in logging out");
    }
  }

  function handleLogin() {
    navigate("/login");
  }

  return (
    <nav className="my-4">
      <div className="flex justify-between items-center space-x-6 container mx-auto">
        <p className="text-3xl font-bold">Blogs</p>
        {role === "admin" && (
          <Link
            to="/createBlog"
            className="px-6 py-2 bg-green-500 text-white rounded-lg"
          >
            Create Blog
          </Link>
        )}
        {isAuthenticated ? (
          <p
            onClick={handleLogout}
            className="px-6 py-2 bg-red-500 text-white cursor-pointer rounded-lg"
          >
            LogOut
          </p>
        ) : (
          <p
            onClick={handleLogin}
            className="px-6 py-2 bg-blue-500 text-white cursor-pointer rounded-lg"
          >
            LogIn
          </p>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
