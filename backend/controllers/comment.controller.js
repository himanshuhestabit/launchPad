import { Blog } from "../model/blog.model.js";
import { Comment } from "../model/comment.model.js";

export const createComment = async (req, res) => {
  try {
    const { content, blogId } = req.body;
    const userId = req.user.id;

    if (!content || !blogId) {
      return res
        .status(400)
        .json({ message: "Content and blogId are required" });
    }

    const blog = await Blog.findById(blogId);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    const newComment = new Comment({
      content,
      blog: blogId,
      user: userId,
    });

    await newComment.save();

    blog.comments.push(newComment._id);
    await blog.save();

    // Populate the user field before sending the response
    await newComment.populate("user", "name profilePic");

    res.status(201).json({
      success: true,
      message: "Comment added successfully",
      comment: newComment,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getCommentsByBlog = async (req, res) => {
  try {
    const { blogId } = req.params;

    const comments = await Comment.find({ blog: blogId }).populate("user");

    res.status(200).json({ success: true, comments });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//not tested

export const updateComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const { content } = req.body;
    const userId = req.user.id;

    // Find comment
    const comment = await Comment.findById(commentId);
    if (!comment) return res.status(404).json({ message: "Comment not found" });

    // Ensure only the author can update it
    if (comment.user.toString() !== userId) {
      return res
        .status(403)
        .json({ message: "Unauthorized to update this comment" });
    }

    // Update content
    comment.content = content || comment.content;
    await comment.save();

    res.status(200).json({
      success: true,
      message: "Comment updated successfully",
      comment,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;

    // Find the comment
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    // Remove the comment from the blog's comments array
    await Blog.findByIdAndUpdate(comment.blog, {
      $pull: { comments: commentId },
    });

    // Delete the comment
    await Comment.findByIdAndDelete(commentId);

    res
      .status(200)
      .json({ success: true, message: "Comment deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
