import axios from "axios";
import React, { useEffect, useState } from "react";
import { data, useNavigate } from "react-router-dom";

const SearchBlog = () => {
  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_URL;
  const [inputSearch, setInputSerach] = useState();
  const [blogTitle, setBlogTitle] = useState();
  const [isOpen, setIsOpen] = useState(false);
  function handleChange(e) {
    setInputSerach(e.target.value);
  }
  async function searchBlog() {
    try {
      const response = await axios.post(
        `${API_URL}/api/v1/blogs/searchBlog`,
        { title: inputSearch },
        { withCredentials: true }
      );
      setBlogTitle(response?.data?.searchedBlogs);
    } catch (error) {
      console.log("Error in finding blogs", error);
    }
  }
  function handClick(id) {
    navigate("/readBlog", { state: { id } });
  }
  useEffect(() => {
    const delay = setTimeout(() => {
      searchBlog(inputSearch);
    }, 500);
    return () => clearTimeout(delay);
  }, [inputSearch]);

  return (
    <div className="flex flex-col items-center py-5 w-full">
      <div className="w-3/4">
        <input
          type="text"
          name="title"
          onChange={handleChange}
          className="w-full py-2 rounded-full bg-[#3B1C32] px-4"
          placeholder="Search Your Blog...."
          onFocus={() => setIsOpen(true)}
          // onBlur={() => setIsOpen(false)}
        />
      </div>
      {isOpen && inputSearch && (
        <div className="bg-[#3B1C32] border-white border mt-5 w-2/3 px-5 py-5">
          {blogTitle &&
            blogTitle.map((item, key) => (
              <>
                <div
                  className="py-1 flex items-center justify-between"
                  key={key}
                >
                  <p>{item?.title}</p>
                  <p
                    className="px-4 cursor-pointer rounded-lg bg-blue-500 hover:bg-blue-600 transition-all duration-300"
                    onClick={() => handClick(item?._id)}
                  >
                    Visit
                  </p>
                </div>
              </>
            ))}
        </div>
      )}
    </div>
  );
};

export default SearchBlog;
