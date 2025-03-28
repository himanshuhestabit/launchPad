import axios from "axios";
import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const RecentlyAddedBlogs = () => {
  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_URL;
  const [recentBlogs, setRecentBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleVisit = useCallback(
    (id) => {
      navigate("/readBlog", { state: { id } });
    },
    [navigate]
  );

  const getRecentBlogs = useCallback(async () => {
    try {
      const response = await axios.get(
        `${API_URL}/api/v1/blogs/getRecentBlogs`,
        { withCredentials: true }
      );
      setRecentBlogs(response?.data?.recentBlog || []);
    } catch (error) {
      console.error("Error in getting recent blogs", error);
    } finally {
      setLoading(false);
    }
  }, [API_URL]);

  useEffect(() => {
    getRecentBlogs();
  }, [getRecentBlogs]);

  let content;

  if (loading) {
    content = <p className="text-center text-gray-500">Loading...</p>;
  } else if (recentBlogs.length > 0) {
    content = (
      <div className="flex items-center justify-between gap-4 lg:flex-row flex-col">
        {recentBlogs.map(({ _id, image, title, author, content }) => (
          <div
            key={_id}
            className="w-full p-4 bg-white shadow-lg rounded-lg flex flex-col items-center justify-center"
          >
            <img
              src={image}
              alt={title}
              className="w-full h-full lg:h-48 object-cover rounded-md"
            />
            <div className="p-4 flex flex-col flex-grow">
              <h3 className="text-xl font-bold text-gray-800">
                {title.slice(0, 30)}..
              </h3>
              <p className="text-sm text-gray-500">By {author}</p>
              <div
                className="text-gray-700 mt-2 line-clamp-2"
                dangerouslySetInnerHTML={{ __html: content }}
              />
              <div className="mt-auto">
                <button
                  onClick={() => handleVisit(_id)}
                  className="inline-block mt-4 bg-gradient-to-r from-[#AF57C5] to-[#D33427] text-white px-4 py-2 rounded-lg hover:brightness-90"
                >
                  Read More
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  } else {
    content = <p className="text-center text-gray-500">No posts available</p>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }} // Start from bottom with opacity 0
      whileInView={{ opacity: 1, y: 0 }} // Animate to normal position
      transition={{ duration: 0.8, ease: "easeOut" }} // Smooth animation
      viewport={{ once: true }} // Triggers only once
      className="w-full px-4 sm:px-6 lg:px-8 py-10"
    >
      <div className="max-w-[1300px] mx-auto">
        <p className="bg-gradient-to-r from-[#AF57C5] to-[#D33427] text-transparent bg-clip-text font-bold text-3xl text-center pb-6">
          Recently Added Blogs
        </p>
        {content}
      </div>
    </motion.div>
  );
};

export default RecentlyAddedBlogs;
