import { Blog } from "../model/blog.model.js";

export const createBlog = async (req, res) => {
  try {
    const { title, content, author } = req.body;
    if (!title || !content || !author) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }
    const newBlog = new Blog({ title, content, author });
    await newBlog.save();
    return res
      .status(201)
      .json({ success: true, message: "Blog created successfully" });
  } catch (error) {
    return res.status(500).json({ succes: false, message: error.message });
  }
};

export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    if (!blogs) {
      return res
        .status(404)
        .json({ success: false, message: "No blogs found" });
    }
    return res.status(200).json({ success: true, blogs });
  } catch (error) {
    return res.status(500).json({ succes: false, message: error.message });
  }
};

export const getBlog = async (req, res) => {
  try {
    const blogId = req.params.id;
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res
        .status(404)
        .json({ success: false, message: "Blog not found" });
    }
    return res.status(200).json({ success: true, blog });
  } catch (error) {
    return res.status(500).json({ succes: false, message: error.message });
  }
};

export const updateBlog = async (req, res) => {
  try {
    const { title, content, author } = req.body;
    const blogId = req.params.id;
    if (!title || !content || !author) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }
    if (!blogId) {
      return res
        .status(400)
        .json({ success: false, message: "Blog ID is required" });
    }
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res
        .status(404)
        .json({ success: false, message: "Blog not found" });
    }
    blog.title = title;
    blog.content = content;
    blog.author = author;
    await blog.save();
    return res
      .status(200)
      .json({ success: true, message: "Blog updated successfully" });
  } catch (error) {
    return res.status(500).json({ succes: false, message: error.message });
  }
};

export const deleteBlog = async (req, res) => {
  try {
    const blogId = req.params.id;
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res
        .status(404)
        .json({ success: false, message: "Blog not found" });
    }
    await Blog.findByIdAndDelete(blogId);
    return res
      .status(200)
      .json({ success: true, message: "Blog deleted successfully" });
  } catch (error) {
    return res.status(500).json({ succes: false, message: error.message });
  }
};

export const getRecentBlogs = async (req, res) => {
  try {
    const recentBlog = await Blog.find({}).sort({ createdAt: -1 }).limit(5);
    return res
      .status(200)
      .json({ success: true, message: "Blog Found Successfully", recentBlog });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Error in getting Recent Blogs" });
  }
};

export const searchBlog = async (req, res) => {
  try {
    const { title } = req.body;
    if (!title) {
      return res
        .status(404)
        .json({ succes: false, message: "Please Write SomeThing" });
    }
    const searchedBlogs = await Blog.find({
      $or: [{ title: { $regex: title, $options: "i" } }],
    });
    if (!searchedBlogs) {
      return res
        .status(404)
        .json({ succes: false, message: "No Blogs Exists" });
    }
    return res
      .status(200)
      .json({ succes: true, message: "Found Successfully", searchedBlogs });
  } catch (error) {
    return res
      .status(500)
      .json({ succes: false, message: "Error in finding blogs" });
  }
};
