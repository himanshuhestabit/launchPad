import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const BlogCard = ({
  blog,
  onRead,
  onUpdate,
  onDelete,
  showActions = false,
}) => {
  const navigate = useNavigate();

  // Function to truncate HTML content safely
  const truncateHtml = (html, length) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent.slice(0, length) + "...";
  };

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
      }}
      whileHover={{ scale: 1.02 }}
      className="flex lg:flex-row flex-col items-center bg-white rounded-lg p-6 shadow-md gap-6"
    >
      <motion.div
        className="lg:w-2/5 w-full"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <img
          src={blog.image}
          alt={blog.title}
          className="lg:w-3/4 lg:h-3/4 w-full h-full object-cover rounded-md shadow-md"
        />
      </motion.div>

      <div className="lg:w-3/5 w-full">
        <h3 className="text-2xl font-bold text-gray-800">{blog.title}</h3>
        <div
          className="text-lg mb-4 text-gray-500"
          dangerouslySetInnerHTML={{
            __html: truncateHtml(blog?.content, 120),
          }}
        />
        <div className="mt-4 flex lg:flex-row flex-col gap-4">
          <button
            className="bg-gradient-to-r from-[#AF57C5] to-[#D33427] text-white hover:brightness-90 px-4 py-2 rounded-md transition-all duration-200"
            onClick={() => onRead(blog?._id)}
          >
            Read
          </button>
          {showActions && (
            <>
              <button
                onClick={() => onUpdate(blog?._id)}
                className="bg-gradient-to-r from-yellow-300 to-yellow-500 px-4 py-2 rounded-md hover:brightness-95 transition"
              >
                Update
              </button>
              <button
                className="bg-gradient-to-r from-red-400 to-red-600 px-4 py-2 rounded-md hover:brightness-95 transition"
                onClick={() => onDelete(blog?._id)}
              >
                Delete
              </button>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default BlogCard;
