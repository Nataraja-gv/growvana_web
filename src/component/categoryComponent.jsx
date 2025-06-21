import React from "react";
import { useNavigate } from "react-router-dom";

const CategoryCard = ({ title, imageUrl, id }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/products/category/${id}`, { state: { title } })}
      className="flex flex-col items-center transition-transform hover:scale-105"
    >
      <div
        className={`w-25 h-25 rounded-full  flex items-center justify-center`}
      >
        <img src={imageUrl} alt={title} className="h-32 object-contain" />
      </div>
      <p className="mt-2 text-[16px] font-semibold text-green-900  hover:underline">
        {title}
      </p>
    </div>
  );
};

export default CategoryCard;
