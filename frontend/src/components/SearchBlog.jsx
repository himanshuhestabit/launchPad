import axios from "axios";
import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

const SearchBlog = () => {
  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_URL;

  const [inputSearch, setInputSearch] = useState("");
  const [blogResults, setBlogResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (e) => {
    setInputSearch(e.target.value);
  };

  const handleClick = (id) => {
    navigate("/readBlog", { state: { id } });
  };

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

  useEffect(() => {
    const delay = setTimeout(() => {
      searchBlog();
    }, 500);
    return () => clearTimeout(delay);
  }, [searchBlog]);

  return (
    <div className="flex flex-col items-center py-5 max-w-[1700px] mx-auto w-full">
      <div className="w-3/4">
        <input
          type="text"
          name="title"
          value={inputSearch}
          onChange={handleChange}
          className="w-full py-2 rounded-full bg-gradient-to-r from-[#ebebeb] to-[#efafa9] text-black shadow-lg outline-none px-4"
          placeholder="Search Your Blog...."
          onFocus={() => setIsOpen(true)}
          onBlur={() => setTimeout(() => setIsOpen(false), 200)}
        />
      </div>
      {isOpen && blogResults.length > 0 && (
        <div className="bg-white border-gray-500 shadow-lg border mt-5 w-2/3 px-10 py-5">
          {blogResults.map((blog) => (
            <div
              key={blog._id}
              className="py-1 flex items-center justify-between"
            >
              <p>{blog.title}</p>
              <button
                className="px-4 py-1 cursor-pointer rounded-lg bg-blue-500 hover:bg-blue-600 transition-all duration-300"
                onClick={() => handleClick(blog._id)}
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
