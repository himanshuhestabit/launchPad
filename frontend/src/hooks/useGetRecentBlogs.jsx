import axios from "axios";
import React, { useEffect, useState } from "react";

const useGetRecentBlogs = () => {
  const [recentBlogs, setRecentBlogs] = useState();
  const API_URL = process.env.REACT_APP_API_URL;
  async function getRecentBlogs() {
    try {
      const response = await axios.get(
        `${API_URL}/api/v1/blogs/getRecentBlogs`
      );
      setRecentBlogs(response?.data?.recentBlog);
    } catch (error) {
      console.log("Error in getting recent blog", error);
    }
  }
  useEffect(() => {
    getRecentBlogs();
  }, []);
  return { recentBlogs };
};

export default useGetRecentBlogs;
