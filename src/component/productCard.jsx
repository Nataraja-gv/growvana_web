import React, { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { AddToCart, getCartitem } from "../services/cart/cart";
import { useDispatch, useSelector } from "react-redux";
import { addCartLength } from "../utils/feature/totalCart";

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
  setSelectedColor,
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const [allReadyBag, setAllReadyBag] = useState([]);
  const user = useSelector((state) => state?.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSelectedColor = (productId, color) => {
    setSelectedColor((prev) => ({
      ...prev,
      [productId]: color,
    }));
  };

  const fetchProductsCart = async () => {
    try {
      const res = await getCartitem();
      if (res) {
        setAllReadyBag(res?.data);
        dispatch(addCartLength(res?.data?.length));
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchProductsCart();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user?.name) {
      navigate("/login");
    }
    const color = selectedColor?.[productId];
    if (!color) {
      enqueueSnackbar("Please select a color first", { variant: "warning" });
      return;
    }
    try {
      const data = {
        cartItems: [
          {
            productId: productId,
            quantity: 1,
            colorType: color,
          },
        ],
      };
      const res = await AddToCart(data);
      if (res) {
        fetchProductsCart();
        enqueueSnackbar("product added successfully", { variant: "success" });
      }
    } catch (error) {
      enqueueSnackbar(error?.message, { variant: "error" });
    }
  };

  return (
    <div className="bg-white rounded-2xl  hover:shadow-lg transition relative">
      <Link to={`/product/${productId}`}>
        <div>
          <img
            src={image}
            alt={title}
            className="rounded-2xl w-full h-64 object-cover"
          />
        </div>
      </Link>
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
            <span className="text-[#1BA55D] font-bold text-base">₹{price}</span>
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
                  onClick={() => handleSelectedColor(productId, color)}
                  className={`w-5 h-5 cursor-pointer rounded-full border-2 ${
                    selectedColor?.[productId] === color
                      ? "border-yellow-400"
                      : "border-pink-200"
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>

          {/* Add to Basket */}
          {allReadyBag.some((item) => item?.productId?._id === productId) ? (
            <button className="mt-4 w-full bg-[#1A4D3D] hover:bg-[#133d2f] text-white py-2 rounded-full font-semibold transition">
              Added
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="mt-4 w-full bg-[#1A4D3D] hover:bg-[#133d2f] text-white py-2 rounded-full font-semibold transition"
            >
              Add to Basket
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
