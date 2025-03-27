import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import UpdateBlog from "./UpdateBlog";

const YourAllBlogs = () => {
  const truncateHtml = (html, length) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent.slice(0, length) + "...";
  };
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
              whileHover={{ scale: 1.02 }}
              className="flex lg:flex-row flex-col items-center bg-gray-100 rounded-lg p-6 shadow-md gap-6"
            >
              <div className="lg:w-3/5 w-full">
                <h3 className="text-2xl font-bold text-gray-800">
                  {blog.title}
                </h3>
                <div
                  className="text-lg mb-4 text-gray-500"
                  dangerouslySetInnerHTML={{
                    __html: truncateHtml(blog?.content, 120),
                  }}
                />
                <div className="mt-4 flex gap-4">
                  <button
                    className="bg-gradient-to-r text-white from-[#718eeb] to-[#0521c2] hover:brightness-90 px-4 py-2 rounded-md transition-all duration-200"
                    onClick={() => handleRead(blog?._id)}
                  >
                    Read
                  </button>
                  <button
                    onClick={() => handleUpdate(blog?._id)}
                    className="bg-gradient-to-r from-yellow-300 to-yellow-500 px-4 py-2 rounded-md hover:brightness-95 transition"
                  >
                    Update
                  </button>
                  <button
                    className="bg-gradient-to-r from-red-400 to-red-600 px-4 py-2 rounded-md hover:brightness-95 transition"
                    onClick={() => handleDelete(blog?._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
              <motion.div
                className="lg:w-2/5 w-full"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
              >
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-48 object-cover rounded-lg"
                />
              </motion.div>
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
