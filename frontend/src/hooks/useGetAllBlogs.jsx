import axios from "axios";
import React, { useEffect, useState } from "react";

const useGetAllBlogs = () => {
  const API_URL = process.env.REACT_APP_API_URL;
  const [allBlogs, setAllBlogs] = useState();
  async function getAllBlogs() {
    try {
      const response = await axios.get(`${API_URL}/api/v1/blogs/getAllBlogs`, {
        withCredentials: true,
      });
      setAllBlogs(response);
    } catch (error) {
      console.log("errro in getting blogs");
    }
  }
  useEffect(() => {
    getAllBlogs();
  }, []);
  return { allBlogs };
};

export default useGetAllBlogs;
