import React, { useEffect, useState } from "react";
import useGetBlogs from "../hooks/useGetBlogs";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UpdateBlog from "../components/UpdateBlog";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogs } from "../redux/features/blogSlice";
import Pagination from "../components/Pagination";
import SearchBlog from "../components/SearchBlog";

const Blogs = () => {
  const [showUpdateBlog, setShowUpdateBlog] = useState(false);
  const [selectedBlogId, setSelectedBlogId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 6;

  const user = JSON.parse(localStorage.getItem("isAuthenticated"));
  const API_URL = process.env.REACT_APP_API_URL;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { blogs, loading } = useGetBlogs();
  const role = useSelector((state) => state.auth.role);

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  const truncateHtml = (html, length) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent.slice(0, length) + "...";
  };

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
      toast.error("Error in deleting the blog");
    }
  };

  const handleRead = (id) => {
    navigate("/readBlog", { state: { id } });
  };

  const totalPages = Math.ceil(blogs.length / blogsPerPage);
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  let content;
  if (loading) {
    content = <p className="text-center text-xl">Loading blogs...</p>;
  } else if (blogs.length === 0) {
    content = <p className="text-center text-lg">No blogs available</p>;
  } else {
    content = (
      <div className="flex flex-col gap-6 w-full">
        {currentBlogs.map((item) => {
          const blogId = item?._id || item?.id;
          const { title, content, author, image } = item;
          return (
            <div
              key={blogId}
              className="flex flex-col md:flex-row bg-white p-6 rounded-lg shadow-xl gap-6"
            >
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <h2 className="text-2xl font-bold mb-2">{title}</h2>
                  <div
                    className="text-lg mb-4"
                    dangerouslySetInnerHTML={{
                      __html: truncateHtml(content, 120),
                    }}
                  />
                  <p className="text-sm text-gray-300">Author: {author}</p>
                </div>
                <div className="flex flex-col sm:flex-row justify-start mt-4 gap-2">
                  <button
                    onClick={() => handleRead(blogId)}
                    className="bg-gradient-to-r text-white from-[#718eeb] to-[#0521c2] hover:brightness-90 px-4 py-2 rounded-md  transition-all duration-200"
                  >
                    Read Blog
                  </button>
                  {role === "admin" && (
                    <div className="flex flex-col sm:flex-row gap-2">
                      <button
                        onClick={() => handleUpdate(blogId)}
                        className="bg-gradient-to-r from-yellow-300 to-yellow-500 px-4 py-2 rounded-md hover:brightness-95 transition"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => handleDelete(blogId)}
                        className="bg-gradient-to-r from-red-400 to-red-600 px-4 py-2 rounded-md hover:brightness-95 transition"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <div className="w-full md:w-1/3 h-48 md:h-auto">
                <img
                  src={image}
                  alt={title}
                  className="w-3/4 h-3/4 object-cover rounded-md"
                />
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen flex flex-col bg-white text-black gap-5">
      <SearchBlog />
      <div className="container mx-auto p-6 min-h-[70vh] flex flex-col items-center justify-center">
        {content}
      </div>
      {blogs.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          nextPage={nextPage}
          prevPage={prevPage}
        />
      )}
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
