import { Blog } from "../model/blog.model.js";
import { Category } from "../model/category.model.js";

// Create a new category
export const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name)
      return res.status(400).json({ message: "Category name is required" });

    const existingCategory = await Category.findOne({ name });
    if (existingCategory)
      return res.status(400).json({ message: "Category already exists" });

    const category = new Category({ name });
    await category.save();

    res.status(201).json({
      success: true,
      message: "Category Created Successfully",
      category,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error in creating category" });
  }
};

// Get all categories
export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res
        .status(404)
        .json({ success: false, message: "Id is required" });
    }
    const categoryExists = await Category.findById(id);
    if (!categoryExists) {
      return res
        .status(404)
        .json({ success: false, message: "Category Doesn't exists" });
    }
    await Category.findByIdAndDelete(id);
    return res
      .status(200)
      .json({ success: true, message: "Category Deleted Successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Error in deleting category" });
  }
};

export const getBlogsByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params; // Extract categoryId from URL

    // Validate category existence
    const categoryExists = await Category.findById(categoryId);
    if (!categoryExists) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }

    // Fetch all blogs under this category, populating user details
    const blogs = await Blog.find({ categoryId })
      .populate("user") // Populate user details (optional)
      .populate("categoryId") // Populate category name (optional)
      .sort({ createdAt: -1 }); // Sort by latest blogs first

    if (!blogs.length) {
      return res.status(200).json({
        success: true,
        message: "No blogs found in this category",
        blogs: [],
      });
    }

    res.status(200).json({
      success: true,
      message: "Blogs fetched successfully",
      blogs,
    });
  } catch (error) {
    console.error("Error fetching category blogs:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
