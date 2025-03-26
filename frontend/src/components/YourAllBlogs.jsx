import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import UpdateBlog from "./UpdateBlog";

const YourAllBlogs = () => {
  const [showUpdateBlog, setShowUpdateBlog] = useState(false);
  const [selectedBlogId, setSelectedBlogId] = useState(null);
  const navigate = useNavigate();
  const truncateHtml = (html, length) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent.slice(0, length) + "...";
  };
  const userId = useSelector((state) => state.auth.userId);

  const API_URL = process.env.REACT_APP_API_URL;
  const [blogs, setBlogs] = useState([]);

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

  function handleRead(id) {
    navigate("/readBlog", { state: { id } });
  }
  useEffect(() => {
    getAllUserBlogs();
  }, []);
  async function handleDelete(id) {
    try {
      const response = await axios.delete(
        `${API_URL}/api/v1/blogs/deleteBlog/${id}`,
        { withCredentials: true }
      );
      if (response.status === 200) {
        toast.success("Blog deleted successfully");
        getAllUserBlogs();
      }
    } catch (error) {
      toast.error("Error in deleting the blog");
    }
  }
  const handleUpdate = (id) => {
    setSelectedBlogId(id);
    setShowUpdateBlog(true);
  };

  return (
    <div className="w-full lg:h-screen">
      <div className="lg:max-w-[1300px] md:max-w-[800px] max-w-[300px] mx-auto flex flex-col gap-6 py-8">
        <h2 className="text-4xl font-black pb-3 text-center">Your Blogs</h2>
        {blogs.length > 0 ? (
          blogs.map((blog) => (
            <div
              key={blog._id}
              className="flex lg:flex-row flex-col items-center bg-gray-100 rounded-lg p-6 shadow-md gap-6"
            >
              <div className="lg:w-3/5 w-full">
                <h3 className="text-2xl font-bold text-gray-800">
                  {blog.title}
                </h3>
                <div
                  className="text-lg mb-4"
                  dangerouslySetInnerHTML={{
                    __html: truncateHtml(blog?.content, 120),
                  }}
                />
                <div className="mt-4 flex gap-4">
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                    onClick={() => handleRead(blog?._id)}
                  >
                    Read
                  </button>
                  <button
                    onClick={() => handleUpdate(blog?._id)}
                    className="bg-yellow-500 text-white px-4 py-2 rounded-lg"
                  >
                    Update
                  </button>
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded-lg"
                    onClick={() => handleDelete(blog?._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
              <div className="lg:w-2/5 w-full">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>
            </div>
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
