import React, { useState } from "react";
import useGetBlogs from "../hooks/useGetBlogs";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UpdateBlog from "../components/UpdateBlog";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogs } from "../redux/features/blogSlice";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const Blogs = () => {
  const role = useSelector((state) => state.auth.role);
  const API_URL = process.env.REACT_APP_API_URL;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { blogs, loading, error } = useGetBlogs();
  const [showUpdateBlog, setShowUpdateBlog] = useState(false);
  const [selectedBlogId, setSelectedBlogId] = useState(null);

  function handleUpdate(id) {
    setSelectedBlogId(id);
    setShowUpdateBlog(true);
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

  return (
    <div className="w-full min-h-screen flex flex-col bg-[#1A1A1D] text-white gap-5">
      <NavBar />
      <div className="container mx-auto p-6">
        {loading ? (
          <p className="text-center text-xl">Loading blogs...</p>
        ) : error ? (
          <p className="text-center text-red-500">Error: {error}</p>
        ) : blogs.length === 0 ? (
          <p className="text-center text-lg">No blogs available</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((item) => (
              <div
                key={item.id || item._id}
                className="bg-[#3B1C32] p-6 rounded-lg shadow-lg flex flex-col justify-between"
              >
                <div>
                  <h2 className="text-2xl font-bold mb-2">{item.title}</h2>
                  <p className="text-lg mb-4">
                    {item.content.slice(0, 100)}...
                  </p>
                  <p className="text-sm text-gray-300">Author: {item.author}</p>
                </div>
                <div className="flex justify-between mt-4">
                  <button
                    onClick={() => handleRead(item._id)}
                    className="bg-blue-500 px-4 py-2 rounded-md hover:bg-blue-600 transition"
                  >
                    Read Blog
                  </button>
                  {role === "admin" && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleUpdate(item._id)}
                        className="bg-yellow-500 px-4 py-2 rounded-md hover:bg-yellow-600 transition"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="bg-red-500 px-4 py-2 rounded-md hover:bg-red-600 transition"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
      {showUpdateBlog && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center">
          <UpdateBlog
            id={selectedBlogId}
            setShowUpdateBlog={setShowUpdateBlog}
          />
        </div>
      )}
    </div>
  );
};

export default Blogs;
