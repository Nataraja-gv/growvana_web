import React from "react";
import { Link } from "react-router-dom";

const CategoryCard = ({ title, imageUrl, link }) => {
  return (
    <Link
      to={link}
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
    </Link>
  );
};

export default CategoryCard;
