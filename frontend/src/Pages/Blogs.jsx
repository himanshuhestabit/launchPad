import React, { useEffect, useState, useMemo } from "react";
import useGetBlogs from "../hooks/useGetBlogs";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UpdateBlog from "../components/UpdateBlog";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogs } from "../redux/features/blogSlice";
import Pagination from "../components/Pagination";
import SearchBlog from "../components/SearchBlog";
import { motion } from "framer-motion";
import BlogCard from "../components/BlogCard"; // Import the BlogCard component

const Blogs = () => {
  const [showUpdateBlog, setShowUpdateBlog] = useState(false);
  const [selectedBlogId, setSelectedBlogId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 6;

  const user = useMemo(
    () => JSON.parse(localStorage.getItem("isAuthenticated")),
    []
  );
  const API_URL = process.env.REACT_APP_API_URL;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { blogs, loading } = useGetBlogs();
  const role = useSelector((state) => state.auth.role);

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  const handleUpdate = (id) => {
    setSelectedBlogId(id);
    setShowUpdateBlog(true);
  };

  const handleDelete = async (id) => {
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
      toast.error("Error deleting the blog");
    }
  };

  const handleRead = (id) => navigate("/readBlog", { state: { id } });

  const totalPages = useMemo(
    () => Math.ceil(blogs.length / blogsPerPage),
    [blogs.length]
  );

  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = useMemo(
    () => blogs.slice(indexOfFirstBlog, indexOfLastBlog),
    [blogs, indexOfFirstBlog, indexOfLastBlog]
  );

  let content;

  if (loading) {
    content = <p className="text-center text-xl">Loading blogs...</p>;
  } else if (blogs.length === 0) {
    content = <p className="text-center text-lg">No blogs available</p>;
  } else {
    content = (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col gap-6 w-full"
      >
        {currentBlogs.map((blog) => (
          <BlogCard
            key={blog._id}
            blog={blog}
            onRead={handleRead}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
            showActions={role === "admin"} // Show update & delete buttons only for admins
          />
        ))}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="w-full min-h-screen flex flex-col bg-white text-black gap-5"
    >
      <SearchBlog />
      <div className="lg:max-w-[1300px] md:max-w-[800px] max-w-[300px] mx-auto p-6 min-h-[70vh] flex flex-col items-center justify-center">
        {content}
      </div>
      {blogs.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          nextPage={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          prevPage={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        />
      )}
      {showUpdateBlog && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center"
        >
          <UpdateBlog
            id={selectedBlogId}
            setShowUpdateBlog={setShowUpdateBlog}
          />
        </motion.div>
      )}
    </motion.div>
  );
};

export default Blogs;
