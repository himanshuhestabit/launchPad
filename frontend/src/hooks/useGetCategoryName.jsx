import { useEffect, useState } from "react";
import axios from "axios";

const useGetCategoryName = (categoryId) => {
  const [categoryName, setCategoryName] = useState("");

  useEffect(() => {
    if (!categoryId) return; // Prevent API call if categoryId is missing

    async function getCategoryName() {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/v1/category/categoryName/${categoryId}`,
          { withCredentials: true }
        );

        console.log("API Response:", data); // Debugging

        if (data.success) {
          setCategoryName(data.categoryExists.name); // Correctly set the category name
        } else {
          console.error("Error: API did not return success");
        }
      } catch (error) {
        console.error("Error fetching category name:", error.message);
        setCategoryName("Unknown"); // Set default value
      }
    }

    getCategoryName();
  }, [categoryId]);

  return categoryName; // Return only the category name
};

export default useGetCategoryName;
