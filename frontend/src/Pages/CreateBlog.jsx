import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CreateBlog = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const API_URL = process.env.REACT_APP_API_URL;

  async function onSubmit(data) {
    try {
      const response = await axios.post(
        `${API_URL}/api/v1/blogs/createBlogs`,
        data,
        { withCredentials: true }
      );
      console.log("Response", response);
      if (response.status === 201) {
        toast.success("Blog created successfully");
        navigate("/blog");
      }
    } catch (error) {
      console.log("Error in submitting the response", error);
      toast.error("Error In Creating Blog");
    }
  }

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-[#1A1A1D] text-white flex-col p-4">
      <div className="bg-[#3B1C32] w-full max-w-3xl p-8 rounded-xl flex flex-col items-center justify-center shadow-lg">
        <p className="text-3xl font-bold mb-6 text-center">Create Your Blog</p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full flex flex-col gap-4"
        >
          <div className="flex flex-col gap-2 w-full">
            <label>Enter Title</label>
            <input
              className="bg-[#1A1A1D] text-white w-full p-3 rounded-md border border-gray-500 focus:outline-none focus:border-purple-400"
              {...register("title", {
                required: "Title is required",
                minLength: {
                  value: 3,
                  message: "Title must be at least 3 characters",
                },
              })}
            />
            {errors.title && (
              <span className="text-red-500">{errors.title.message}</span>
            )}
          </div>
          <div className="flex flex-col gap-2 w-full">
            <label>Enter Content</label>
            <textarea
              rows={6}
              className="bg-[#1A1A1D] text-white w-full p-3 rounded-md border border-gray-500 focus:outline-none focus:border-purple-400"
              {...register("content", {
                required: "Content is required",
                minLength: {
                  value: 10,
                  message: "Content must be at least 10 characters",
                },
              })}
            />
            {errors.content && (
              <span className="text-red-500">{errors.content.message}</span>
            )}
          </div>
          <div className="flex flex-col gap-2 w-full">
            <label>Enter Author</label>
            <input
              className="bg-[#1A1A1D] text-white w-full p-3 rounded-md border border-gray-500 focus:outline-none focus:border-purple-400"
              {...register("author", {
                required: "Author is required",
                minLength: {
                  value: 3,
                  message: "Author must be at least 3 characters",
                },
              })}
            />
            {errors.author && (
              <span className="text-red-500">{errors.author.message}</span>
            )}
          </div>
          <div>
            <input
              className="bg-[#6A1E55] text-white px-6 py-2 rounded-md cursor-pointer hover:bg-[#8A2D70] transition-all duration-300 w-full"
              type="submit"
              value={isSubmitting ? "Submitting..." : "Submit"}
              disabled={isSubmitting}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateBlog;
