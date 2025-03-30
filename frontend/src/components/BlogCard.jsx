import React from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FaExternalLinkAlt } from "react-icons/fa";
import { GrDocumentUpdate } from "react-icons/gr";
import { MdDelete } from "react-icons/md";
import useGetCategoryName from "../hooks/useGetCategoryName";

const BlogCard = ({ blog, onUpdate, onDelete, showActions = false }) => {
  const navigate = useNavigate();

  const truncateHtml = (html, length) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent.slice(0, length) + "...";
  };

  function handleRead(id) {
    navigate("/readBlog", { state: { id } });
  }

  const categoryId = blog?.categoryId;
  const categoryName = useGetCategoryName(categoryId);
  console.log(categoryName);
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
        className="relative lg:w-2/5 w-full"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Category Badge */}
        {categoryName && (
          <span className="absolute top-3 left-3 bg-gradient-to-r from-[#AF57C5] to-[#D33427] text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
            {categoryName}
          </span>
        )}

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
            className="bg-gradient-to-r from-[#AF57C5] to-[#D33427] text-white hover:brightness-90 px-4 py-2 rounded-md transition-all duration-200 flex items-center justify-center gap-2"
            onClick={() => handleRead(blog?._id)}
          >
            Read More <FaExternalLinkAlt />
          </button>
          {showActions && (
            <>
              <button
                onClick={() => onUpdate(blog?._id)}
                className="bg-gradient-to-r from-[#007FFF] to-[#6CB4EE] hover:from-[#1034A6] hover:to-[#00BFFF] text-white px-4 py-2 rounded-md hover:brightness-95 transition flex items-center justify-center gap-2"
              >
                Update <GrDocumentUpdate />
              </button>
              <button
                className="bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-md hover:brightness-95 transition flex items-center justify-center gap-2"
                onClick={() => onDelete(blog?._id)}
              >
                Delete <MdDelete />
              </button>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
};

BlogCard.propTypes = {
  blog: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    category: PropTypes.shape({
      name: PropTypes.string,
    }),
  }).isRequired,
  onUpdate: PropTypes.func,
  onDelete: PropTypes.func,
  showActions: PropTypes.bool,
};

BlogCard.defaultProps = {
  onUpdate: () => {},
  onDelete: () => {},
  showActions: false,
};

export default BlogCard;
