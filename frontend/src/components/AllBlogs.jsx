import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const AllBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_URL = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();

  // Function to truncate HTML content safely
  const truncateHtml = (html, length) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent.slice(0, length) + "...";
  };

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const response = await axios.get(
          `${API_URL}/api/v1/blogs/getAllBlogs`,
          { withCredentials: true }
        );
        setBlogs(response?.data?.blogs || []);
      } catch (error) {
        console.error("Error fetching blogs", error);
      } finally {
        setLoading(false);
      }
    }
    fetchBlogs();
  }, [API_URL]);

  let content;

  if (loading) {
    content = <p className="text-center text-gray-500 text-lg">Loading...</p>;
  } else if (blogs.length === 0) {
    content = (
      <p className="text-center text-gray-400 text-lg">No posts available</p>
    );
  } else {
    content = (
      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={{
          hidden: { opacity: 0, y: 50 },
          visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.2 } },
        }}
        viewport={{ once: true }}
        className="flex flex-col gap-8"
      >
        {blogs.slice(0, 4).map((blog, index) => (
          <motion.div
            key={blog._id}
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
            }}
            className="flex flex-col lg:flex-row items-center gap-6 bg-white p-6 rounded-lg shadow-lg"
          >
            {/* Left Content */}
            <div className="w-full lg:w-1/2 text-center lg:text-left">
              <h3 className="text-2xl font-bold mb-2 text-black">
                {blog.title}
              </h3>
              <div
                className="text-sm sm:text-base font-thin text-gray-600 mb-4"
                dangerouslySetInnerHTML={{
                  __html: truncateHtml(blog.content, 120),
                }}
              />
              <p className="text-sm text-gray-500">Author: {blog.author}</p>
              <button
                onClick={() =>
                  navigate("/readBlog", { state: { id: blog._id } })
                }
                className="mt-4 bg-gradient-to-r from-[#AF57C5] to-[#D33427] text-white px-4 py-2 rounded-md hover:brightness-95 transition"
              >
                Read More
              </button>
            </div>

            {/* Right Image */}
            <div className="w-full lg:w-1/2 flex items-center justify-center">
              <img
                src={blog.image}
                alt={blog.title}
                className="w-3/4 h-3/4 object-cover rounded-md shadow-md"
              />
            </div>
          </motion.div>
        ))}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
      className="w-full px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto py-10">
        <h2 className="text-4xl font-bold text-center bg-gradient-to-r from-[#AF57C5] to-[#D33427] text-transparent bg-clip-text pb-6">
          Read Blogs
        </h2>

        {content}

        {/* Read All Blogs Button */}
        {!loading && blogs.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-center mt-8"
          >
            <button
              onClick={() => navigate("/blog")}
              className="bg-gradient-to-r from-[#AF57C5] to-[#D33427] text-white px-6 py-2 rounded-lg transition-all duration-300 hover:brightness-90 cursor-pointer"
            >
              Read All Blogs
            </button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default AllBlogs;
