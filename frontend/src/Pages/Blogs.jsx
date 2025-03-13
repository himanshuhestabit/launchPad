import React, { useState } from "react";
import useGetBlogs from "../hooks/useGetBlogs";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UpdateBlog from "../components/UpdateBlog";
import { useDispatch } from "react-redux";
import { fetchBlogs } from "../redux/features/blogSlice";
import NavBar from "../components/NavBar";

const Blogs = () => {
  const API_URL = process.env.REACT_APP_API_URL;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { blogs, loading, error } = useGetBlogs();

  const [showUpdateBlog, setShowUpdateBlog] = useState(false);

  function handleUpdate(id) {
    try {
      setShowUpdateBlog((prev) => !prev);
    } catch (error) {
      toast.error("Error in updating the blog");
    }
  }

  async function handleDelete(id) {
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
  }

  function handleRead(id) {
    navigate("/readBlog", { state: { id } });
  }

  return (
    <div className="w-full h-screen flex flex-col bg-[#1A1A1D] text-white gap-5">
      <NavBar />
      <div>
        {loading ? (
          <p className="text-center">Loading blogs...</p>
        ) : error ? (
          <p className="text-center text-red-500">Error: {error}</p>
        ) : blogs.length === 0 ? (
          <p className="text-center">No blogs available</p>
        ) : (
          blogs.map((item) => (
            <div key={item.id || item._id} className="container mx-auto mb-4">
              <div className="bg-[#3B1C32] p-4 rounded-md flex justify-between">
                <div>
                  <p className="text-xl font-bold">
                    {item.title.slice(0, 16)}...
                  </p>
                  <p className="text-lg">{item.content.slice(0, 30)}...</p>
                  <p className="text-sm">Author: {item.author}</p>
                  <button
                    onClick={() => handleRead(item._id)}
                    className="cursor-pointer text-blue-300"
                  >
                    Read Blog
                  </button>
                </div>
                <div className="flex gap-4">
                  <button onClick={() => handleUpdate(item._id)}>update</button>
                  <button onClick={() => handleDelete(item._id)}>delete</button>
                  {showUpdateBlog && (
                    <div className="absolute top-0 right-0 left-0 bottom-0 bg-[#1A1A1D] flex items-center justify-center">
                      <UpdateBlog
                        id={item._id}
                        setShowUpdateBlog={setShowUpdateBlog}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Blogs;
