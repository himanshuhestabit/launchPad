import React, { useEffect, useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";

const CreateBlog = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("isAuthenticated"));

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();

  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const API_URL = process.env.REACT_APP_API_URL;

  // Convert editor content to HTML and update form state
  const handleEditorChange = (state) => {
    setEditorState(state);
    const contentHTML = draftToHtml(convertToRaw(state.getCurrentContent()));
    setValue("content", contentHTML);
  };

  // Handle Image Upload with Preview
  const handleImageChange = useCallback((e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
    }
  }, []);

  // Cleanup object URL on unmount
  useEffect(() => {
    return () => {
      if (imagePreview) URL.revokeObjectURL(imagePreview);
    };
  }, [imagePreview]);

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("content", data.content);
    formData.append("author", data.author);
    formData.append("categoryId", "67e2ad02b1457b94d13fd9bb"); // Replace with actual categoryId

    if (image) {
      formData.append("image", image);
    }

    try {
      const response = await axios.post(
        `${API_URL}/api/v1/blogs/createBlog`,
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response.status === 201) {
        toast.success("Blog created successfully");
        navigate("/home");
      }
    } catch (error) {
      console.error("Error creating blog", error);
      toast.error("Error In Creating Blog");
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-white text-black flex-col p-4">
      <div className="  bg-gradient-to-r from-[#e090f4] to-[#ef786d] w-full max-w-3xl p-8 rounded-xl flex flex-col items-center justify-center shadow-lg">
        <p className="text-3xl font-bold mb-6 text-center">Create Your Blog</p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full flex flex-col gap-4"
        >
          {/* Title Input */}
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="title">Enter Title</label>
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

          {/* Content Editor (Scrollable) */}
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="content">Enter Content</label>
            <div className="bg-[#1A1A1D] text-white w-full p-3 rounded-md border border-gray-500 max-h-[300px] overflow-y-auto">
              <Editor
                editorState={editorState}
                onEditorStateChange={handleEditorChange}
                wrapperClassName="editor-wrapper"
                editorClassName="editor-content min-h-[200px]"
                toolbarClassName="editor-toolbar"
              />
            </div>
            {errors.content && (
              <span className="text-red-500">{errors.content.message}</span>
            )}
          </div>

          {/* Image Upload with Preview */}
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="image">Upload Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="bg-[#1A1A1D] text-white w-full p-3 rounded-md border border-gray-500 cursor-pointer"
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                className="mt-2 w-full h-48 object-cover rounded-md"
              />
            )}
          </div>

          {/* Author Input */}
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="author">Enter Author</label>
            <input
              autoComplete="off"
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

          {/* Submit Button */}
          <div>
            <input
              className="bg-gradient-to-r from-[#6ac258] to-[#05a31c] text-white px-6 py-2 rounded-md cursor-pointer transition-all duration-300 w-full"
              type="submit"
              value={isSubmitting ? "Submitting..." : "Submit"}
              disabled={isSubmitting}
            />
          </div>

          {/* Cancel Button */}
          <div>
            <button
              type="button"
              onClick={() => navigate("/home")}
              className="bg-gradient-to-r from-[#e8666a] to-[#a1031e] text-white px-6 py-2 rounded-md cursor-pointer hover:bg-[#8A2D70] transition-all duration-300 w-full"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateBlog;
