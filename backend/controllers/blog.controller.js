import { Blog } from "../model/blog.model.js";
import { Category } from "../model/category.model.js";
import User from "../model/user.model.js";

export const createBlog = async (req, res) => {
  try {
    const { title, content, categoryId } = req.body;
    const userId = req.user.id;
    const image = req.file ? req.file.path : ""; // Ensure image is optional

    if (!title || !content || !categoryId) {
      return res
        .status(400)
        .json({ message: "Title, content, and category are required" });
    }

    // Validate user
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Validate category
    const category = await Category.findById(categoryId);
    if (!category) return res.status(404).json({ message: "Invalid category" });

    // Validate image type (optional, if you're allowing only images)
    if (req.file && !req.file.mimetype.startsWith("image/")) {
      return res.status(400).json({ message: "Invalid image format" });
    }

    // Create new blog
    const newBlog = new Blog({
      title,
      content,
      image,
      categoryId,
      user: userId,
      author: user.name, // Directly use req.user
    });

    // Save blog & update user's blog list in parallel
    await Promise.all([
      newBlog.save(),
      User.findByIdAndUpdate(userId, { $push: { blogs: newBlog._id } }),
    ]);

    // Populate user and category for better frontend usage
    const populatedBlog = await Blog.findById(newBlog._id)
      .populate("user", "name email")
      .populate("categoryId", "name");

    res.status(201).json({
      success: true,
      message: "Blog created successfully",
      blog: populatedBlog,
    });
  } catch (error) {
    console.error("Error creating blog:", error);
    res.status(500).json({ success: false, message: error.message });
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
    const blog = await Blog.findById(blogId).populate("user");
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
    const recentBlog = await Blog.find({}).sort({ createdAt: -1 }).limit(3);
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
