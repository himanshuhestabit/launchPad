import React from "react";
import { useLocation } from "react-router-dom";
import useGetBlogDetails from "../hooks/useGetBlogDetails";
import RecentBlog from "../components/RecentBlog";
import NavBar from "../components/NavBar";

const ReadBlog = () => {
  const location = useLocation();
  const id = location.state.id;
  const { blogDetails } = useGetBlogDetails({ id });

  return (
    <div className="bg-[#1A1A1D] text-white w-full h-full">
      <div className="min-h-screen w-full bg-[#1A1A1D] text-white flex items-center justify-center px-6 py-12">
        <div className="container max-w-4xl mx-auto bg-[#2A2A2E] p-10 rounded-lg shadow-lg">
          <h1 className="text-4xl font-extrabold text-center text-[#F8B400] mb-6">
            {blogDetails?.title}
          </h1>

          <p className="text-lg leading-8 text-gray-300 text-justify">
            {blogDetails?.content}
          </p>

          <p className="mt-8 text-right text-gray-400 italic text-lg">
            - {blogDetails?.author}
          </p>
        </div>
        <div className="container w-1/4 mx-auto bg-[#2A2A2E] p-10 rounded-lg shadow-lg">
          <RecentBlog />
        </div>
      </div>
    </div>
  );
};

export default ReadBlog;
