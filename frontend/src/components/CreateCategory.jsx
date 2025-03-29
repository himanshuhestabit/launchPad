import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { MdDelete } from "react-icons/md";
const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const API_URL = process.env.REACT_APP_API_URL;
  // Fetch categories
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/v1/category/getCategory`, {
        withCredentials: true,
      });
      setCategories(res.data);
    } catch (error) {
      console.error("Error fetching categories", error);
    }
  };
  // Handle category creation
  const handleCreateCategory = async (e) => {
    e.preventDefault();
    if (!categoryName.trim()) return toast.error("Category name is required");

    try {
      const response = await axios.post(
        `${API_URL}/api/v1/category/createCategory`,
        {
          name: categoryName,
        },
        { withCredentials: true }
      );
      toast.success(response?.data?.message);
      console.log(response);
      setCategoryName("");
      fetchCategories();
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to create category"
      );
    }
  };

  // Handle category deletion
  const handleDeleteCategory = async (id) => {
    try {
      const response = await axios.delete(
        `${API_URL}/api/v1/category/deleteCategory/${id}`,
        { withCredentials: true }
      );
      toast.success(response?.data?.message);
      fetchCategories();
    } catch (error) {
      toast.error(error?.response.data?.message);
    }
  };

  return (
    <div className="w-full min-h-[50vh] lg:min-h-[70vh] flex items-center justify-center">
      <div className="lg:max-w-[1300px] md:max-w-[800px] max-w-[300px] mx-auto p-4 bg-white shadow-md rounded-lg w-full">
        <h2 className="lg:text-3xl text-2xl font-bold mb-4 text-cente bg-gradient-to-r from-[#AF57C5] to-[#D33427] text-transparent bg-clip-text">
          Manage Categories
        </h2>

        <form
          onSubmit={handleCreateCategory}
          className="mb-4 flex gap-2 flex-col lg:flex-row md:flex-row pt-2"
        >
          <input
            type="text"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            placeholder="Enter category name"
            className="bg-gray-300 w-full lg:py-3 py-2 px-5 pr-12 rounded-full outline-none"
            required
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-[#AF57C5] to-[#D33427] hover:brightness-95 text-white px-4 py-2 rounded"
          >
            Create
          </button>
        </form>
        {/* Category List */}
        <div className="bg-gray-100 p-4 rounded mt-3">
          {categories.length === 0 ? (
            <p className="text-center text-gray-500">No categories found.</p>
          ) : (
            <ul>
              {categories.map((category) => (
                <li
                  key={category._id}
                  className="flex justify-between items-center p-2 border-b"
                >
                  <span>{category.name}</span>
                  <button
                    onClick={() => handleDeleteCategory(category._id)}
                    className="bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1 rounded flex items-center gap-1"
                  >
                    <p className="hidden md:block lg:block">Delete </p>
                    <MdDelete />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateCategory;
