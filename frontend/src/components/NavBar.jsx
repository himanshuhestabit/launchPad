import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { logout } from "../redux/features/authSlice";
import { Menu, X } from "lucide-react";

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
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
    <nav className="py-4 bg-[#1A1A1D] text-white">
      <div className="container mx-auto flex justify-between items-center px-4">
        <Link className="text-3xl font-bold" to={"/blog"}>
          Blogs
        </Link>

        <button
          className="lg:hidden text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        <div className="hidden lg:flex space-x-6 items-center">
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
      </div>

      {menuOpen && (
        <div className="lg:hidden flex flex-col items-center bg-[#1A1A1D] py-4 space-y-4">
          {role === "admin" && (
            <Link
              to="/createBlog"
              className="px-6 py-2 bg-green-500 text-white rounded-lg"
              onClick={() => setMenuOpen(false)}
            >
              Create Blog
            </Link>
          )}
          {isAuthenticated ? (
            <p
              onClick={() => {
                handleLogout();
                setMenuOpen(false);
              }}
              className="px-6 py-2 bg-red-500 text-white cursor-pointer rounded-lg"
            >
              LogOut
            </p>
          ) : (
            <p
              onClick={() => {
                handleLogin();
                setMenuOpen(false);
              }}
              className="px-6 py-2 bg-blue-500 text-white cursor-pointer rounded-lg"
            >
              LogIn
            </p>
          )}
        </div>
      )}
    </nav>
  );
};

export default NavBar;
