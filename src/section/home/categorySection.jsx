import React, { useEffect, useState } from "react";
import { getCategorys } from "../../services/category/category";
import CategoryCard from "../../component/categoryComponent";

const CategorySection = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const response = await getCategorys();
        setCategories(response?.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="flex  mt-[50px] w-[80%] mx-auto items-center justify-between flex-wrap gap-4 p-4">
      {categories?.length > 0 ? (
        categories?.map((category) => (
          <CategoryCard
            key={category?._id}
            title={category?.category_name}
            imageUrl={category?.category_image}
            id={category._id}
          />
        ))
      ) : (
        <p>No categories found.</p>
      )}
    </div>
  );
};

export default CategorySection;
