import React, { useEffect, useState } from "react";
import useGetBlogDetails from "../hooks/useGetBlogDetails";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";

const UpdateBlog = ({ id, setShowUpdateBlog }) => {
  const API_URL = process.env.REACT_APP_API_URL;
  const [isUpdated, setIsUpdated] = useState(false);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [image, setImage] = useState(null);
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const { blogDetails } = useGetBlogDetails({ id, isUpdated });
  console.log(blogDetails);
  useEffect(() => {
    if (blogDetails) {
      reset({
        title: blogDetails.title,
        author: blogDetails.author,
      });

      const blocksFromHtml = htmlToDraft(blogDetails.content);
      const contentState = ContentState.createFromBlockArray(
        blocksFromHtml.contentBlocks
      );
      setEditorState(EditorState.createWithContent(contentState));
      setValue("content", blogDetails.content);
    }
  }, [blogDetails, reset, setValue]);

  const handleEditorChange = (state) => {
    setEditorState(state);
    const contentHTML = draftToHtml(convertToRaw(state.getCurrentContent()));
    setValue("content", contentHTML);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  async function onSubmit(data) {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("content", data.content);
    formData.append("author", data.author);
    if (image) {
      formData.append("image", image);
    }

    try {
      const response = await axios.put(
        `${API_URL}/api/v1/blogs/updateBlog/${id}`,
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      toast.success("Blog updated successfully!");
      setShowUpdateBlog(false);
      setIsUpdated(!isUpdated);
    } catch (error) {
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
            <label>Blog Title</label>
            <input
              {...register("title", { required: "Title is required" })}
              className="bg-[#3B1C32] w-full p-3 rounded-md outline-none focus:ring-2 focus:ring-[#6A1E55]"
            />
            {errors.title && (
              <span className="text-red-400">{errors.title.message}</span>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label>Blog Content</label>
            <div className="bg-[#3B1C32] w-full p-3 rounded-md border border-gray-500">
              <Editor
                editorState={editorState}
                onEditorStateChange={handleEditorChange}
                wrapperClassName="editor-wrapper"
                editorClassName="editor-content"
                toolbarClassName="editor-toolbar"
              />
            </div>
            {errors.content && (
              <span className="text-red-400">{errors.content.message}</span>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label>Upload Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="bg-[#3B1C32] w-full p-3 rounded-md border border-gray-500 cursor-pointer"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label>Blog Author</label>
            <input
              {...register("author", { required: "Author is required" })}
              className="bg-[#3B1C32] w-full p-3 rounded-md outline-none focus:ring-2 focus:ring-[#6A1E55]"
            />
            {errors.author && (
              <span className="text-red-400">{errors.author.message}</span>
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
