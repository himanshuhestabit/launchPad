import React from "react";
import useGetRecentBlogs from "../hooks/useGetRecentBlogs";
import { useNavigate } from "react-router-dom";

const RecentBlog = () => {
  const navigate = useNavigate();
  const { recentBlogs } = useGetRecentBlogs();

  function handleVisit(id) {
    navigate("/readBlog", { state: { id } });
  }

  return (
    <div>
      <h1 className="text-4xl font-extrabold text-center text-[#F8B400] mb-6">
        Recent Blogs
      </h1>

      {!recentBlogs || recentBlogs.length === 0 ? (
        <p>Loading....</p>
      ) : (
        <div>
          {recentBlogs.map((item) => (
            <div
              key={item?._id}
              className="flex items-center justify-between py-2 text-black"
            >
              <p>{item?.title?.slice(0, 36)}...</p>
              <button
                onClick={() => handleVisit(item?._id)}
                className="px-5 py-1 bg-blue-400 hover:bg-blue-500 transition-all duration-300 rounded-md"
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

export default RecentBlog;
