import React from "react";
import { Star } from "lucide-react";
import { Link } from "react-router-dom";

const ProductCard = ({
  title,
  price,
  originalPrice,
  discount,
  rating,
  image,
  colors = [],
  selectedColor,
  productId,
}) => {
  return (
    <Link to={`/product/${productId}`}>
      <div className="bg-white rounded-2xl  hover:shadow-lg transition relative">
        <div>
          <img
            src={image}
            alt={title}
            className="rounded-2xl w-full h-64 object-cover"
          />
        </div>
        <div className="p-3">
          <div className="absolute top-2 right-2 bg-[#1BA55D] text-white text-xs font-semibold px-2 py-1 rounded-lg">
            {discount}% OFF
          </div>

          {/* Info Section */}
          <div className=" space-y-2">
            {/* Rating */}
            <div className="flex items-center text-[#FFB400] text-sm font-medium">
              <Star size={16} fill="currentColor" className="mr-1" />
              {rating?.toFixed(1)}
            </div>

            {/* Title */}
            <div className="text-gray-800  text-[14px] font-semibold min-h-[3rem] leading-tight">
              {title}
            </div>

            {/* Price */}
            <div className="flex items-center gap-2">
              <span className="text-[#1BA55D] font-bold text-base">
                ₹{price}
              </span>
              <span className="line-through text-gray-400 text-sm">
                ₹{originalPrice}
              </span>
            </div>

            {/* Color Picker */}
            <div className="mt-2">
              <p className="text-xs text-gray-500 mb-1">Available Color</p>
              <div className="flex flex-wrap gap-2">
                {colors?.map((color, idx) => (
                  <div
                    key={idx}
                    className={`w-5 h-5 rounded-full border-2 ${
                      selectedColor === color
                        ? "border-black"
                        : "border-gray-300"
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>

            {/* Add to Basket */}
            <button className="mt-4 w-full bg-[#1A4D3D] hover:bg-[#133d2f] text-white py-2 rounded-full font-semibold transition">
              Add to Basket
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
