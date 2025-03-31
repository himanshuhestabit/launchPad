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
  const [stage, setStage] = useState(1);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [categories, setCategories] = useState([]);
  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  useEffect(() => {
    axios
      .get(`${API_URL}/api/v1/category/getCategory`, { withCredentials: true })
      .then((res) => setCategories(res.data))
      .catch((err) => console.error("Error fetching categories", err));
  }, [API_URL]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const handleEditorChange = (state) => {
    setEditorState(state);
    const contentHTML = draftToHtml(convertToRaw(state.getCurrentContent()));
    setValue("content", contentHTML);
  };

  const handleImageChange = useCallback((e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  }, []);

  useEffect(
    () => () => imagePreview && URL.revokeObjectURL(imagePreview),
    [imagePreview]
  );

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("content", data.content);
    formData.append("author", user.name);
    formData.append("categoryId", data.category);
    if (image) formData.append("image", image);

    try {
      const response = await axios.post(
        `${API_URL}/api/v1/blogs/createBlog`,
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log(response);
      toast.success(response?.data?.message);
      navigate("/home");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="flex flex-col md:flex-row lg:max-w-[1300px] md:max-w-[800px] max-w-[300px] mx-auto  min-h-screen p-4 my-10 text-black">
      {/* Left Side Form */}
      <div className="md:w-2/3 p-8 rounded-xl ">
        <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-[#AF57C5] to-[#D33427] text-transparent bg-clip-text">
          Create Your Blog
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full flex flex-col gap-4"
        >
          {stage === 1 && (
            <>
              <label htmlFor="title">Enter Title</label>
              <input
                {...register("title", { required: "Title is required" })}
                className="p-3 border rounded-md "
                placeholder="Enter Blog Title"
              />
              {errors.title && (
                <span className="text-red-500">{errors.title.message}</span>
              )}

              <label htmlFor="content">Enter Content</label>
              <div className="max-h-[70vh] overflow-y-auto">
                <Editor
                  editorState={editorState}
                  onEditorStateChange={handleEditorChange}
                  className="border p-3 rounded-md "
                />
              </div>
              {errors.content && (
                <span className="text-red-500">{errors.content.message}</span>
              )}
            </>
          )}

          {stage === 2 && (
            <>
              <label htmlFor="image">Upload Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="p-3 border rounded-md"
              />
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-48 object-cover rounded-md"
                />
              )}

              <label htmlFor="category">Select Category</label>
              <select
                {...register("category", { required: "Category is required" })}
                className="p-3 border rounded-md"
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>
              {errors.category && (
                <span className="text-red-500">{errors.category.message}</span>
              )}
            </>
          )}

          <div className="flex justify-between mt-4">
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
              <input
                type="submit"
                value="Create Blog"
                className="bg-gradient-to-r from-[#007FFF] to-[#6CB4EE] hover:from-[#1034A6] hover:to-[#00BFFF] text-white px-6 py-2 rounded-md cursor-pointer"
              />
            )}
          </div>
        </form>
      </div>

      {/* Right Side Progress Indicator */}
      <div className="md:w-1/3 p-8 flex flex-col items-center">
        <h3 className="text-xl font-bold">Progress</h3>
        <div className="mt-4 flex flex-col gap-2 w-full">
          <div
            className={`p-3 rounded-md text-center ${
              stage === 1
                ? "bg-gradient-to-r from-[#AF57C5] to-[#D33427] text-white"
                : "bg-gray-200"
            }`}
          >
            Step 1: Title & Content
          </div>
          <div
            className={`p-3 rounded-md text-center ${
              stage === 2
                ? "bg-gradient-to-r from-[#AF57C5] to-[#D33427] text-white"
                : "bg-gray-200"
            }`}
          >
            Step 2: Image & Category
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateBlog;
