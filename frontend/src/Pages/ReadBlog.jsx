import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import useGetBlogDetails from "../hooks/useGetBlogDetails";
import RecentBlog from "../components/RecentBlog";
import axios from "axios";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

const ReadBlog = () => {
  const location = useLocation();
  const blogId = location.state?.id;
  const { blogDetails } = useGetBlogDetails({ id: blogId });
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [submittingComment, setSubmittingComment] = useState(false);
  const [user, setUser] = useState(null);
  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/v1/user/me`, {
          withCredentials: true,
        });
        if (response.data.success) setUser(response.data.user);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    if (blogId) fetchComments();
  }, [blogId]);

  const fetchComments = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/api/v1/comment/getCommentsByBlog/${blogId}`,
        { withCredentials: true }
      );
      if (response.data.success) setComments(response.data.comments);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const handleCommentSubmit = async () => {
    if (comment.trim() === "") return;
    try {
      setSubmittingComment(true);
      const response = await axios.post(
        `${API_URL}/api/v1/comment/createComment`,
        { blogId, content: comment },
        { withCredentials: true }
      );
      if (response.data.success) {
        setComments([...comments, response.data.comment]);
        setComment("");
      }
    } catch (error) {
      setSubmittingComment(false);
      console.error("Error adding comment:", error);
    } finally {
      setSubmittingComment(false);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      const response = await axios.delete(
        `${API_URL}/api/v1/comment/deleteComment/${commentId}`,
        { withCredentials: true }
      );
      if (response.data.success) {
        setComments((prevComments) =>
          prevComments.filter((comment) => comment._id !== commentId)
        );
        toast.success("Comment deleted successfully");
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
      toast.error("Error deleting comment");
    }
  };
  console.log(user);
  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="bg-white text-black w-full min-h-screen flex flex-col items-center px-4"
    >
      <div className="max-w-6xl w-full py-12 flex flex-col lg:flex-row gap-8">
        {/* Blog Content Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full lg:w-3/4 bg-white p-6 rounded-lg shadow-lg"
        >
          <motion.h1
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-3xl lg:text-5xl font-extrabold text-center bg-gradient-to-r from-[#AF57C5] to-[#D33427] text-transparent bg-clip-text mb-6"
          >
            {blogDetails?.title}
          </motion.h1>

          <div className="flex justify-between items-center text-gray-500 text-sm mb-4">
            <p>
              By{" "}
              <span className="text-black font-bold">
                {blogDetails?.user?.name || "Unknown"}
              </span>
            </p>
            <p>{new Date(blogDetails?.createdAt).toLocaleDateString()}</p>
          </div>

          <motion.img
            src={blogDetails?.image}
            alt={blogDetails?.title}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="w-full h-80 object-cover rounded-lg mb-6"
          />

          <p className="text-gray-300 text-lg mb-4">
            {blogDetails?.description}
          </p>
          <div
            dangerouslySetInnerHTML={{ __html: blogDetails?.content }}
            className="text-gray-700 leading-relaxed prose prose-lg"
          />
          <p className="mt-8 text-right text-gray-400 italic text-lg">
            - {blogDetails?.author}
          </p>

          {/* Comment Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12"
          >
            <h2 className="text-2xl font-bold mb-4 border-b pb-2">Comments</h2>
            <div className="mb-4">
              <textarea
                className="w-full p-3 rounded-lg bg-white text-black border border-gray-500"
                placeholder="Add a comment..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="mt-2 bg-gradient-to-r from-[#AF57C5] to-[#D33427] text-white px-6 py-2 rounded-lg transition-all duration-300 hover:brightness-90"
                onClick={handleCommentSubmit}
                disabled={submittingComment}
              >
                Submit
              </motion.button>
            </div>
            {comments.length > 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="space-y-4"
              >
                {comments.map((c) => (
                  <div
                    key={c._id}
                    className="bg-gray-100 text-black border border-gray-200 p-5 rounded-lg flex justify-between items-center"
                  >
                    <div>
                      <p className="text-gray-700">{c.content}</p>
                      <p className="text-gray-400 text-sm italic">
                        - {c.user?.name || "Anonymous"}
                      </p>
                    </div>
                    {user &&
                      (user.id === c.user?._id || user.role === "admin") && (
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          onClick={() => handleDeleteComment(c._id)}
                          className="text-red-500 text-sm hover:underline"
                        >
                          Delete
                        </motion.button>
                      )}
                  </div>
                ))}
              </motion.div>
            ) : (
              <p className="text-gray-400">
                No comments yet. Be the first to comment!
              </p>
            )}
          </motion.div>
        </motion.div>

        {/* Recent Blog Section */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="w-full lg:w-1/4 lg:max-h-[40vh] bg-white p-6 rounded-lg shadow-lg"
        >
          <RecentBlog />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ReadBlog;
