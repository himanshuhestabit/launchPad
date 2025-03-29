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
