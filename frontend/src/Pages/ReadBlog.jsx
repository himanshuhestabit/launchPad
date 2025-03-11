import React from "react";
import { useLocation } from "react-router-dom";
import useGetBlogDetails from "../hooks/useGetBlogDetails";

const ReadBlog = () => {
  const location = useLocation();
  //   console.log(location.state);
  const id = location.state.id;
  //   console.log(id);
  const { blogDetails } = useGetBlogDetails({ id });
  //   console.log(blogDetails);

  return (
    <div className="w-full h-screen flex  gap-4 bg-[#1A1A1D] text-white">
      <div className="w-full container mx-auto pt-5">
        <p className="font-bold text-3xl">{blogDetails?.title}</p>
        <p className="font-medium text-lg">{blogDetails?.content}</p>

        <p className="font-light">{blogDetails?.author}</p>
      </div>
    </div>
  );
};

export default ReadBlog;
