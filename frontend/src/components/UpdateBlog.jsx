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
  const [stage, setStage] = useState(1);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [image, setImage] = useState(null);
  const [categories, setCategories] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isMountedRef = useRef(true);

  const { register, handleSubmit, setValue, reset } = useForm();
  const { blogDetails } = useGetBlogDetails({ id });

  useEffect(() => {
    axios
      .get(`${API_URL}/api/v1/category/getCategory`, { withCredentials: true })
      .then((res) => setCategories(res.data))
      .catch((err) => console.error("Error fetching categories", err));
  }, [API_URL]);

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
        category: blogDetails.categoryId || "",
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
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("content", data.content);
    formData.append("author", data.author);
    formData.append("categoryId", data.category);
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
      <div className="bg-white text-black w-[90%] min-h-[70%] p-6 rounded-lg shadow-lg overflow-hidden">
        <h2 className="text-2xl font-bold mb-4 text-center bg-gradient-to-r from-[#AF57C5] to-[#D33427] text-transparent bg-clip-text">
          Update Your Blog
        </h2>
        <div className="max-h-[80vh] overflow-y-auto pr-2">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            {stage === 1 && (
              <>
                <label>Blog Title</label>
                <input
                  {...register("title")}
                  className="p-3 border rounded-md w-full"
                />
                <label>Blog Content</label>
                <div className="overflow-y-auto max-h-[30vh]">
                  <Editor
                    editorState={editorState}
                    onEditorStateChange={handleEditorChange}
                    className="border p-3 rounded-md w-full"
                  />
                </div>
              </>
            )}
            {stage === 2 && (
              <>
                <label>Upload Image</label>
                {imagePreviewUrl && (
                  <img
                    src={imagePreviewUrl}
                    alt="Blog preview"
                    className="w-full h-40 object-cover rounded-md mb-2"
                  />
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="p-3 border rounded-md w-full"
                />
                <label>Select Category</label>
                <select
                  {...register("category")}
                  className="p-3  border rounded-md w-full"
                >
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </>
            )}
            <div className="flex justify-between mt-4 lg:flex-row flex-col gap-2 lg:gap-0">
              {stage > 1 && (
                <button
                  type="button"
                  onClick={() => setStage(stage - 1)}
                  className="bg-gray-500 text-white px-6 py-2 rounded-md"
                >
                  Back
                </button>
              )}
              {stage < 2 && (
                <button
                  type="button"
                  onClick={() => setStage(stage + 1)}
                  className="bg-gray-500 text-white px-6 py-2 rounded-md"
                >
                  Next
                </button>
              )}
              {stage === 2 && (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-gradient-to-r from-[#007FFF] to-[#6CB4EE] hover:from-[#1034A6] hover:to-[#00BFFF] text-white  px-4 py-2 rounded-md"
                >
                  {isSubmitting ? "Updating..." : "Update"}
                </button>
              )}
              <button
                type="button"
                onClick={() => setShowUpdateBlog(false)}
                className="bg-gradient-to-r from-red-500 to-red-600 text-white hover:brightness-95 px-4 py-2 rounded-md"
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
