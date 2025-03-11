import React, { useState } from "react";
import useGetBlogs from "../hooks/useGetBlogs";
import { toast } from "react-toastify";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import UpdateBlog from "../components/UpdateBlog";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/features/authSlice";
import { fetchBlogs } from "../redux/features/blogSlice";

const Blogs = () => {
  const API_URL = process.env.REACT_APP_API_URL;
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { blogs, loading, error } = useGetBlogs();

  const [showUpdateBlog, setShowUpdateBlog] = useState(false);

  function handleUpdate(id) {
    try {
      setShowUpdateBlog((prev) => !prev);
    } catch (error) {
      toast.error("Error in updating the blog");
    }
  }

  async function handleDelete(id) {
    try {
      const response = await axios.delete(
        `${API_URL}/api/v1/blogs/deleteBlog/${id}`,
        { withCredentials: true }
      );
      if (response.status === 200) {
        toast.success("Blog deleted successfully");
        dispatch(fetchBlogs());
      }
    } catch (error) {
      toast.error("Error in deleting the blog");
    }
  }

  function handleRead(id) {
    navigate("/readBlog", { state: { id } });
  }

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
    <div className="w-full h-screen flex flex-col bg-[#1A1A1D] text-white gap-5">
      <div className="flex items-center justify-between container mx-auto">
        <p className="text-3xl font-bold mb-6">Blogs</p>
        <Link to={"/createBlog"} className="px-4 py-1 bg-blue-500 rounded-full">
          Create Blog
        </Link>
        <p>
          {isAuthenticated ? (
            <p
              onClick={handleLogout}
              className="px-5 py-2 bg-red-500 cursor-pointer rounded-sm"
            >
              LogOut
            </p>
          ) : (
            <p
              onClick={handleLogin}
              className="px-5 py-2 bg-blue-500 cursor-pointer rounded-sm"
            >
              LogIn
            </p>
          )}
        </p>
      </div>
      <div>
        {loading ? (
          <p className="text-center">Loading blogs...</p>
        ) : error ? (
          <p className="text-center text-red-500">Error: {error}</p>
        ) : blogs.length === 0 ? (
          <p className="text-center">No blogs available</p>
        ) : (
          blogs.map((item) => (
            <div key={item.id || item._id} className="container mx-auto mb-4">
              <div className="bg-[#3B1C32] p-4 rounded-md flex justify-between">
                <div>
                  <p className="text-xl font-bold">
                    {item.title.slice(0, 16)}...
                  </p>
                  <p className="text-lg">{item.content.slice(0, 30)}...</p>
                  <p className="text-sm">Author: {item.author}</p>
                  <button
                    onClick={() => handleRead(item._id)}
                    className="cursor-pointer text-blue-300"
                  >
                    Read Blog
                  </button>
                </div>
                <div className="flex gap-4">
                  <button onClick={() => handleUpdate(item._id)}>update</button>
                  <button onClick={() => handleDelete(item._id)}>delete</button>
                  {showUpdateBlog && (
                    <div className="absolute top-0 right-0 left-0 bottom-0 bg-[#1A1A1D] flex items-center justify-center">
                      <UpdateBlog
                        id={item._id}
                        setShowUpdateBlog={setShowUpdateBlog}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Blogs;
