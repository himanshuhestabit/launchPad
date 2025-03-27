import { useState, useEffect } from "react";
import axios from "axios";

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState("");

  // Fetch categories
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get("/api/categories");
      setCategories(res.data);
    } catch (error) {
      console.error("Error fetching categories", error);
    }
  };

  // Handle category creation
  const handleCreateCategory = async (e) => {
    e.preventDefault();
    if (!categoryName.trim()) return alert("Category name is required");

    try {
      await axios.post("/api/categories", { name: categoryName });
      setCategoryName("");
      fetchCategories(); // Refresh categories
    } catch (error) {
      console.error("Error creating category", error);
      alert(error.response?.data?.message || "Failed to create category");
    }
  };

  // Handle category deletion
  const handleDeleteCategory = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category?"))
      return;

    try {
      await axios.delete(`/api/categories/${id}`);
      fetchCategories(); // Refresh categories
    } catch (error) {
      console.error("Error deleting category", error);
      alert("Failed to delete category");
    }
  };

  return (
    <div className="w-full lg:h-screen flex items-center justify-center">
      <div className="lg:max-w-[1300px] md:max-w-[800px] max-w-[300px] mx-auto p-4 bg-white shadow-md rounded-lg w-full">
        <h2 className="text-xl font-bold mb-4 text-center">
          Manage Categories
        </h2>

        {/* Create Category Form */}
        <form onSubmit={handleCreateCategory} className="mb-4 flex gap-2">
          <input
            type="text"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            placeholder="Enter category name"
            className="border p-2 rounded w-full"
            required
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Create
          </button>
        </form>

        {/* Category List */}
        <div className="bg-gray-100 p-4 rounded">
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
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
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
