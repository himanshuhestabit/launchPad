import axios from "axios";
import React, { useEffect, useState } from "react";

const useGetBlogDetails = ({ id, isUpdated }) => {
  const [blogDetails, setBlogDetails] = useState();
  async function getBlogDetails() {
    try {
      const API_URL = process.env.REACT_APP_API_URL;
      const response = await axios.get(
        `${API_URL}/api/v1/blogs/getBlog/${id}`,
        { withCredentials: true }
      );
      setBlogDetails(response?.data?.blog);
    } catch (error) {
      console.log("Error in getting blog details", error);
    }
  }
  useEffect(() => {
    getBlogDetails();
  }, [id, isUpdated]);
  return { blogDetails };
};

export default useGetBlogDetails;
