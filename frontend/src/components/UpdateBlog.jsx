import React, { useEffect, useState } from "react";
import useGetBlogDetails from "../hooks/useGetBlogDetails";
import { set, useForm } from "react-hook-form";
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
      setShowUpdateBlog((prev) => !prev);
      setIsUpdated((prev) => !prev);
      console.log(data);
    } catch (error) {
      console.error("Error updating blog:", error);
      toast.error("Failed to update blog.");
    }
  }

  return (
    <div className="w-full container mx-auto flex flex-col gap-4">
      <p className="text-3xl font-bold container mx-auto mb-6">
        Update Your Blog
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-2 w-full">
          <label>Blog Title</label>
          <input
            {...register("title")}
            className="bg-[#3B1C32] w-3/4 p-3 rounded-md"
          />
        </div>
        <div className="flex flex-col gap-2 w-full">
          <label>Blog Content</label>
          <textarea
            rows={5}
            {...register("content")}
            className="bg-[#3B1C32] w-3/4 p-3 rounded-md"
          />
        </div>
        <div>
          <label className="flex flex-col gap-2 w-full">Blog Author</label>
          <input
            {...register("author")}
            className="bg-[#3B1C32] w-3/4 p-3 rounded-md"
          />
        </div>
        <div className="pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-[#6A1E55] text-white px-4 py-2 rounded"
          >
            {isSubmitting ? "Updating..." : "Update"}
          </button>
        </div>
      </form>
      <div>
        <button
          onClick={() => setShowUpdateBlog((prev) => !prev)}
          className="bg-[#6A1E55] text-white px-4 py-2 rounded"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default UpdateBlog;
