import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import UpdateBlog from "./UpdateBlog";
import BlogCard from "../components/BlogCard";

const YourAllBlogs = () => {
  const [showUpdateBlog, setShowUpdateBlog] = useState(false);
  const [selectedBlogId, setSelectedBlogId] = useState(null);
  const navigate = useNavigate();
  const userId = useSelector((state) => state.auth.userId);
  const API_URL = process.env.REACT_APP_API_URL;
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    async function getAllUserBlogs() {
      try {
        const response = await axios.get(
          `${API_URL}/api/v1/user/getUserBlogs/${userId}`,
          { withCredentials: true }
        );
        setBlogs(response?.data?.blogs || []);
      } catch (error) {
        console.error(
          "Error fetching user blogs:",
          error.response?.data || error.message
        );
      }
    }
    getAllUserBlogs();
  }, []);

  const handleRead = (id) => navigate("/readBlog", { state: { id } });

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `${API_URL}/api/v1/blogs/deleteBlog/${id}`,
        { withCredentials: true }
      );
      if (response.status === 200) {
        toast.success("Blog deleted successfully");
        setBlogs(blogs.filter((blog) => blog._id !== id));
      }
    } catch (error) {
      toast.error("Error in deleting the blog");
    }
  };

  const handleUpdate = (id) => {
    setSelectedBlogId(id);
    setShowUpdateBlog(true);
  };
  console.log(blogs);
  return (
    <div className="w-full lg:min-h-screen">
      <div className="lg:max-w-[1300px] md:max-w-[800px] max-w-[300px] mx-auto flex flex-col gap-6 py-8">
        <h2 className="text-4xl font-black pb-3 text-center bg-gradient-to-r from-[#AF57C5] to-[#D33427] text-transparent bg-clip-text">
          Your Blogs
        </h2>
        {blogs.length > 0 ? (
          blogs.map((blog, index) => (
            <motion.div
              key={blog._id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <BlogCard
                blog={blog}
                onRead={handleRead}
                onUpdate={handleUpdate}
                onDelete={handleDelete}
                showActions={true} // Enable actions for the user's blogs
              />
            </motion.div>
          ))
        ) : (
          <p className="text-center text-gray-500">No blogs found</p>
        )}
      </div>

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

export default YourAllBlogs;
