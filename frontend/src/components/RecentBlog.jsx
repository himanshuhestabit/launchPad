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
      <div>
        <h1 className="text-4xl font-extrabold text-center text-[#F8B400] mb-6">
          Recent Blogs
        </h1>
      </div>
      <div>{!recentBlogs && <p>Loading....</p>}</div>
      <div>
        {recentBlogs && (
          <div>
            {recentBlogs.map((item, key) => (
              <>
                <div className="flex items-center justify-between py-2">
                  <p key={key}>{(item?.title).slice(0, 36)}...</p>
                  <p
                    onClick={() => handleVisit(item?._id)}
                    className="px-5 py-1 bg-blue-400 hover:bg-blue-500 transition-all duration-300 rounded-md cursor-pointer"
                  >
                    Visit
                  </p>
                </div>
              </>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentBlog;
