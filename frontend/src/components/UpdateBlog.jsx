import React, { useEffect, useState } from "react";
import useGetBlogDetails from "../hooks/useGetBlogDetails";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";

const UpdateBlog = ({ id, setShowUpdateBlog }) => {
  const API_URL = process.env.REACT_APP_API_URL;
  const [isUpdated, setIsUpdated] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const { blogDetails } = useGetBlogDetails({ id, isUpdated });

  useEffect(() => {
    if (blogDetails) {
      reset({
        title: blogDetails.title,
        content: blogDetails.content,
        author: blogDetails.author,
      });
    }
  }, [blogDetails, reset]);

  async function onSubmit(data) {
    try {
      const response = await axios.put(
        `${API_URL}/api/v1/blogs/updateBlog/${id}`,
        data,
        { withCredentials: true }
      );
      console.log("Updated successfully:", response.data);
      toast.success("Blog updated successfully!");
      setShowUpdateBlog(false);
      setIsUpdated(!isUpdated);
    } catch (error) {
      console.error("Error updating blog:", error);
      toast.error("Failed to update blog.");
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm">
      <div className="bg-[#262626] text-white w-[90%] max-w-lg p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Update Your Blog
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-gray-300">Blog Title</label>
            <input
              {...register("title", { required: "Title is required" })}
              className="bg-[#3B1C32] w-full p-3 rounded-md outline-none focus:ring-2 focus:ring-[#6A1E55]"
            />
            {errors.title && (
              <span className="text-red-400 text-sm">
                {errors.title.message}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-gray-300">Blog Content</label>
            <textarea
              rows={5}
              {...register("content", { required: "Content is required" })}
              className="bg-[#3B1C32] w-full p-3 rounded-md outline-none focus:ring-2 focus:ring-[#6A1E55]"
            />
            {errors.content && (
              <span className="text-red-400 text-sm">
                {errors.content.message}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-gray-300">Blog Author</label>
            <input
              {...register("author", { required: "Author is required" })}
              className="bg-[#3B1C32] w-full p-3 rounded-md outline-none focus:ring-2 focus:ring-[#6A1E55]"
            />
            {errors.author && (
              <span className="text-red-400 text-sm">
                {errors.author.message}
              </span>
            )}
          </div>
          <div className="flex justify-between mt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-green-600 text-white px-4 py-2 rounded-lg transition-all duration-300 hover:bg-green-700 disabled:opacity-50"
            >
              {isSubmitting ? "Updating..." : "Update"}
            </button>
            <button
              type="button"
              onClick={() => setShowUpdateBlog(false)}
              className="bg-red-600 text-white px-4 py-2 rounded-lg transition-all duration-300 hover:bg-red-700"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateBlog;
