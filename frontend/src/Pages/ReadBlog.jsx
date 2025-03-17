import React from "react";
import { useLocation } from "react-router-dom";
import useGetBlogDetails from "../hooks/useGetBlogDetails";
import RecentBlog from "../components/RecentBlog";

const ReadBlog = () => {
  const location = useLocation();
  const id = location.state?.id;
  const { blogDetails } = useGetBlogDetails({ id });

  return (
    <div className="bg-[#1A1A1D] text-white w-full min-h-screen">
      <div className="container mx-auto px-4 py-12 flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-3/4 bg-[#2A2A2E] p-6 rounded-lg shadow-lg">
          <h1 className="text-3xl lg:text-4xl font-extrabold text-center text-[#F8B400] mb-6">
            {blogDetails?.title}
          </h1>
          <p className="text-lg leading-8 text-gray-300 text-justify">
            {blogDetails?.content}
          </p>
          <p className="mt-8 text-right text-gray-400 italic text-lg">
            - {blogDetails?.author}
          </p>
        </div>
        <div className="w-full lg:w-1/4 bg-[#2A2A2E] p-6 rounded-lg shadow-lg">
          <RecentBlog />
        </div>
      </div>
    </div>
  );
};

export default ReadBlog;
