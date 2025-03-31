import axios from "axios";
import React, { useEffect, useState, useCallback } from "react";

const SearchBlog = ({ setSelectedCategory }) => {
  const API_URL = process.env.REACT_APP_API_URL;
  const [inputSearch, setInputSearch] = useState("");
  const [blogResults, setBlogResults] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setLocalSelectedCategory] = useState("All");

  // Fetch categories from backend
  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/api/v1/category/getCategory`,
          {
            withCredentials: true,
          }
        );
        setCategories(response.data || []);
      } catch (error) {
        console.log("Error fetching categories:", error.message);
      }
    };
    getCategories();
  }, [API_URL]);

  // Handle search input change
  const handleSearchChange = (e) => {
    setInputSearch(e.target.value);
  };

  // Handle category selection
  const handleCategoryChange = (e) => {
    const selected = e.target.value;
    setLocalSelectedCategory(selected);
    setSelectedCategory(selected); // Update parent component
  };

  // Search blogs API call with debounce
  const searchBlog = useCallback(async () => {
    if (!inputSearch.trim()) {
      setBlogResults([]);
      return;
    }

    try {
      const response = await axios.post(
        `${API_URL}/api/v1/blogs/searchBlog`,
        { title: inputSearch },
        { withCredentials: true }
      );
      setBlogResults(response?.data?.searchedBlogs || []);
    } catch (error) {
      console.error("Error in finding blogs:", error);
      setBlogResults([]);
    }
  }, [API_URL, inputSearch]);

  // Debounce search to avoid too many API calls
  useEffect(() => {
    const delay = setTimeout(() => {
      searchBlog();
    }, 500);
    return () => clearTimeout(delay);
  }, [searchBlog]);

  return (
    <div className="flex flex-col justify-center items-center py-5 lg:max-w-[1400px] md:max-w-[1100px] max-w-[300px] mx-auto w-full gap-4">
      {/* Search Bar */}
      <div className=" flex items-center w-full h-full justify-center gap-3">
        <div className="w-3/4">
          <input
            type="text"
            value={inputSearch}
            onChange={handleSearchChange}
            className="w-full py-2 rounded-full bg-gray-200 text-black shadow-lg outline-none px-4"
            placeholder="Search Your Blog...."
            onFocus={() => setIsOpen(true)}
            onBlur={() => setTimeout(() => setIsOpen(false), 300)}
          />
        </div>

        {/* Category Dropdown */}
        <div className="bg-gray-200 py-2 px-3 rounded-lg shadow-md text-black outline-none">
          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="bg-transparent outline-none"
          >
            <option value="All">All</option>
            {categories.map((category) => (
              <option key={category._id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      {/* Search Results */}
      {isOpen && blogResults.length > 0 && (
        <div className="bg-gray-200 shadow-lg border rounded-lg mt-5 lg:w-2/3 md:w-2/3 w-full px-10 py-5 ">
          {blogResults.map((blog) => (
            <div
              key={blog._id}
              className="py-1 flex items-center justify-between lg:flex-row md:flex-row flex-col lg:text-start md:text-start text-center gap-4"
            >
              <p>{blog.title}</p>
              <button
                className="px-4 py-1 rounded-lg bg-gradient-to-r from-[#AF57C5] to-[#D33427] hover:brightness-95 text-white transition-all duration-300"
                onClick={() =>
                  (window.location.href = `/readBlog?id=${blog._id}`)
                }
              >
                Visit
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBlog;
