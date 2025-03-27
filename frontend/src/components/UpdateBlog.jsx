import React, {
  useEffect,
  useState,
  useCallback,
  useRef,
  useMemo,
} from "react";
import useGetBlogDetails from "../hooks/useGetBlogDetails";
import PropTypes from "prop-types";
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
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [image, setImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isMountedRef = useRef(true);

  const { register, handleSubmit, setValue, reset } = useForm();
  const { blogDetails } = useGetBlogDetails({ id });

  const updateEditorState = useCallback((content) => {
    if (!content) return;
    const blocksFromHtml = htmlToDraft(content);
    const contentState = ContentState.createFromBlockArray(
      blocksFromHtml.contentBlocks
    );
    setEditorState(EditorState.createWithContent(contentState));
  }, []);

  useEffect(() => {
    isMountedRef.current = true;
    if (blogDetails) {
      reset({
        title: blogDetails.title || "",
        author: blogDetails.author || "",
        content: blogDetails.content || "",
      });
      updateEditorState(blogDetails.content || "");
    }
    return () => {
      isMountedRef.current = false;
    };
  }, [blogDetails, reset, updateEditorState]);

  const handleEditorChange = (state) => {
    setEditorState(state);
    const contentHTML = draftToHtml(convertToRaw(state.getCurrentContent()));
    setValue("content", contentHTML);
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0] || null;
    setImage(file);
  };

  const imagePreviewUrl = useMemo(() => {
    return image ? URL.createObjectURL(image) : blogDetails?.image || "";
  }, [image, blogDetails?.image]);

  useEffect(() => {
    return () => {
      if (image) URL.revokeObjectURL(imagePreviewUrl);
    };
  }, [image, imagePreviewUrl]);

  const onSubmit = async (data) => {
    if (!isMountedRef.current) return;
    setIsSubmitting(true);
    const updatedData = {
      title: data.title || blogDetails.title,
      content: data.content || blogDetails.content,
      author: data.author || blogDetails.author,
    };

    const formData = new FormData();
    formData.append("title", updatedData.title);
    formData.append("content", updatedData.content);
    formData.append("author", updatedData.author);
    if (image) formData.append("image", image);

    try {
      await axios.put(`${API_URL}/api/v1/blogs/updateBlog/${id}`, formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (isMountedRef.current) {
        toast.success("Blog updated successfully!");
        setShowUpdateBlog(false);
      }
    } catch (error) {
      if (isMountedRef.current) toast.error("Failed to update blog.");
    } finally {
      if (isMountedRef.current) setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm">
      <div className="bg-[#262626] text-white w-[90%] max-w-lg p-6 rounded-lg shadow-lg overflow-hidden">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Update Your Blog
        </h2>
        <div className="max-h-[80vh] overflow-y-auto pr-2">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <div className="flex flex-col gap-2">
              <label htmlFor="title">Blog Title</label>
              <input
                id="title"
                {...register("title")}
                className="bg-[#3B1C32] w-full p-3 rounded-md outline-none focus:ring-2 focus:ring-[#6A1E55]"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="content">Blog Content</label>
              <div className="bg-[#3B1C32] w-full p-3 rounded-md border border-gray-500">
                <Editor
                  editorState={editorState}
                  onEditorStateChange={handleEditorChange}
                  wrapperClassName="editor-wrapper"
                  editorClassName="editor-content max-h-60 overflow-auto"
                  toolbarClassName="editor-toolbar"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="image">Upload Image</label>
              {imagePreviewUrl && (
                <img
                  src={imagePreviewUrl}
                  alt="Blog preview"
                  className="w-full h-40 object-cover rounded-md mb-2"
                />
              )}
              <input
                id="image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="bg-[#3B1C32] w-full p-3 rounded-md border border-gray-500 cursor-pointer"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="author">Blog Author</label>
              <input
                id="author"
                {...register("author")}
                className="bg-[#3B1C32] w-full p-3 rounded-md outline-none focus:ring-2 focus:ring-[#6A1E55]"
              />
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
    </div>
  );
};

UpdateBlog.propTypes = {
  id: PropTypes.string.isRequired,
  setShowUpdateBlog: PropTypes.func.isRequired,
};

export default UpdateBlog;
