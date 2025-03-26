import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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
          {
            withCredentials: true,
          }
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
      <div className="flex flex-col gap-8">
        {/* Display only the first 4 blogs */}
        {blogs.slice(0, 4).map((blog) => (
          <div
            key={blog._id}
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
                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
              >
                Read More
              </button>
            </div>

            {/* Right Image */}
            <div className="w-full lg:w-1/2">
              <img
                src={blog.image}
                alt={blog.title}
                className="w-3/4 h-3/4 object-cover rounded-md shadow-md"
              />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto py-10">
        <h2 className="text-4xl sm:text-5xl font-black text-center bg-gradient-to-r from-[#AF57C5] to-[#D33427] text-transparent bg-clip-text pb-6">
          Latest Blogs
        </h2>

        {content}

        {/* Read All Blogs Button */}
        {!loading && blogs.length > 0 && (
          <div className="text-center mt-8">
            <button
              onClick={() => navigate("/blog")}
              className="bg-gradient-to-r from-[#AF57C5] to-[#D33427] text-white px-6 py-2 rounded-lg transition-all duration-300 hover:brightness-90 cursor-pointer"
            >
              Read All Blogs
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllBlogs;
