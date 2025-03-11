import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const CreateBlog = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
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
        toast("Blog created successfully");
        navigate("/blog");
      }
    } catch (error) {
      console.log("Error in submitting the response", error);
      toast.error("Error In Creating Blog");
    }
  }
  return (
    <div className="w-full h-screen flex items-center justify-center bg-[#1A1A1D] text-white">
      <div className="w-full">
        <div>
          <p className="text-3xl font-bold container mx-auto mb-6">
            Create Your Blog
          </p>
        </div>
        <div className="w-full">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full container mx-auto flex flex-col gap-4"
          >
            <div className="flex flex-col gap-2 w-full">
              <label htmlFor="">Enter Title</label>
              <input
                className="bg-[#3B1C32] w-3/4 p-3 rounded-md"
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
              <label htmlFor="">Enter Content</label>
              <textarea
                rows={8}
                className="bg-[#3B1C32] w-3/4 p-3 rounded-md"
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
              <label htmlFor="">Enter Author</label>
              <input
                className="bg-[#3B1C32] w-3/4 p-3 rounded-md"
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
                className="bg-[#6A1E55] text-white px-4 py-2 rounded-md cursor-pointer"
                type="submit"
                value={isSubmitting ? "Submitting..." : "Submit"}
                disabled={isSubmitting}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateBlog;
