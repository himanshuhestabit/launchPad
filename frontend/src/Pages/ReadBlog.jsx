import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import useGetBlogDetails from "../hooks/useGetBlogDetails";
import RecentBlog from "../components/RecentBlog";
import axios from "axios";

const ReadBlog = () => {
  const location = useLocation();
  const id = location.state?.id;
  const { blogDetails } = useGetBlogDetails({ id });
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const API_URL = process.env.REACT_APP_API_URL;

  // Fetch comments for the blog post
  useEffect(() => {
    if (id) {
      fetchComments();
    }
  }, [id]);

  const fetchComments = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/api/v1/comment/getCommentsByBlog/${id}`,
        { withCredentials: true }
      );
      console.log(response);
      if (response.data.success) {
        setComments(response.data.comments);
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const handleCommentSubmit = async () => {
    if (comment.trim() === "") return;

    try {
      const response = await axios.post(
        `${API_URL}/api/v1/comment/createComment`,
        {
          blogId: id,
          content: comment,
        },
        { withCredentials: true }
      );

      if (response.data.success) {
        setComments([...comments, response.data.comment]); // Add new comment
        setComment(""); // Clear input field
      }
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  return (
    <div className="bg-white text-black w-full min-h-screen flex flex-col items-center px-4">
      <div className="max-w-6xl w-full py-12 flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-3/4 bg-white p-6 rounded-lg shadow-lg">
          <h1 className="text-3xl lg:text-5xl font-extrabold text-center text-[#F8B400] mb-6">
            {blogDetails?.title}
          </h1>
          <div className="flex justify-between items-center text-gray-500 text-sm mb-4">
            <p>
              By{" "}
              <span className="text-white font-bold">
                {blogDetails?.user?.name || "Unknown"}
              </span>
            </p>
            <p>{new Date(blogDetails?.createdAt).toLocaleDateString()}</p>
          </div>
          <img
            src={blogDetails?.image}
            alt={blogDetails?.title}
            className="w-full h-80 object-cover rounded-lg mb-6"
          />
          <p className="text-gray-300 text-lg mb-4">
            {blogDetails?.description}
          </p>
          <div
            dangerouslySetInnerHTML={{ __html: blogDetails?.content }}
            className="text-gray-700 leading-relaxed"
          />
          <p className="mt-8 text-right text-gray-400 italic text-lg">
            - {blogDetails?.author}
          </p>

          {/* Comment Section */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-4 border-b pb-2">Comments</h2>
            <div className="mb-4">
              <textarea
                className="w-full p-3 rounded-lg bg-white text-black border border-gray-500"
                placeholder="Add a comment..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <button
                className="mt-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 rounded-lg transition-all duration-300 hover:brightness-90"
                onClick={handleCommentSubmit}
              >
                Submit
              </button>
            </div>
            {comments.length > 0 ? (
              <div className="space-y-4">
                {comments.map((c, index) => (
                  <div
                    key={c._id || index}
                    className="bg-gray-800 p-4 rounded-lg"
                  >
                    <p className="text-gray-300">{c.content}</p>
                    <p className="text-gray-400 text-sm italic">
                      - {c.user?.name || "Anonymous"}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400">
                No comments yet. Be the first to comment!
              </p>
            )}
          </div>
        </div>
        <div className="w-full lg:w-1/4 bg-white p-6 rounded-lg shadow-lg">
          <RecentBlog />
        </div>
      </div>
    </div>
  );
};

export default ReadBlog;
