import React, { useEffect, useState } from "react";
import { getProductById } from "../services/products/products";
import { useParams } from "react-router-dom";

const ProductsDetailsPage = () => {
  const { id } = useParams();
  const [productDetails, setProductDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedColor, setSelectedColor] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      setLoading(true);
      try {
        const response = await getProductById(id);
        setProductDetails(response?.data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="text-center py-10 text-lg">
        Loading product details...
      </div>
    );
  }

  if (!productDetails) {
    return (
      <div className="text-center py-10 text-red-500 text-lg">
        Product not found.
      </div>
    );
  }

  const {
    product_name,
    product_images,
    rating,
    currect_price,
    offer_price,
    color_options,
  } = productDetails;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Product Image */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <img
            src={product_images?.[0]?.image_link || "/placeholder.jpg"}
            alt={product_name}
            className="w-full h-[500px] md:h-[700px] object-cover"
          />
        </div>

        {/* Product Info */}
        <div className="mt-6 md:mt-0 flex flex-col justify-between">
          <div>
            <h2 className="text-3xl font-bold text-green-800 mb-4">
              {product_name}
            </h2>

            <div className="flex items-center gap-2 mb-2">
              <span className="text-yellow-500 text-xl">★</span>
              <span className="text-gray-700 text-lg">{rating} Rateing</span>
              <span className="ml-4 text-green-600 text-lg font-semibold">
                Save ₹{Number(currect_price - offer_price).toFixed(2)}
              </span>
            </div>

            <div className="text-2xl font-bold text-green-900 mb-2">
              ₹{offer_price}
              <span className="text-orange-500 line-through text-lg ml-2">
                ₹{currect_price}
              </span>
            </div>

            <div className="w-full h-px bg-gray-200 my-4" />

            {/* Color Options */}
            <div className="mb-4">
              <h4 className="mb-2 font-medium text-gray-800">Select Color:</h4>
              <div className="flex items-center flex-wrap gap-2">
                {color_options?.map((color, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedColor(color)}
                    aria-label={`Select color ${color}`}
                    className={`w-7 h-7 rounded-full border-2 transition-transform duration-200 ${
                      selectedColor === color
                        ? "border-yellow-400 scale-110"
                        : "border-pink-300"
                    }`}
                    style={{
                      backgroundColor: color,
                    }}
                  />
                ))}
              </div>
              {selectedColor && (
                <p className="mt-2 text-sm text-gray-700">
                  Selected color: <strong>{selectedColor}</strong>
                </p>
              )}
            </div>
            <div className=" flex items-center gap-4  p-3 border border-gray-200 rounded-[20px]">
              <img
                src="https://kyari.co/cdn/shop/files/Living_Room_2.png?v=1731851287"
                alt="Secure Payment"
                className="w-15 "
              />
              <div>
                <p className=" text-[14px] font-semibold">Living Room</p>
                <p className=" text-[14px]">Indirect Sunlight</p>
              </div>
            </div>
            <div className="mt-6">
              <h2 className=" text-[14px] font-semibold text-green-700">HIGHLIGHTS:</h2>
              <div className="flex items-center gap-4 p-3 bg-blue-400 border border-gray-200 rounded-[20px] mt-4">
                <img
                  src="https://cdn.shopify.com/s/files/1/0646/8327/8550/files/watering-can-ezgif.com-resize.gif?v=1736489817"
                  alt="Watering Can"
                  className="w-10 h-10"
                />
                <div >
                  <p className="text-[14px] font-semibold">Water Just Once a Week</p>
                  <p className="text-[14px]">{productDetails?.description}</p>
                </div>
              </div>
            </div>
            <button className="mt-6 w-full bg-green-700 text-white py-3 rounded-xl text-lg font-medium hover:bg-green-800 transition duration-300">
              Add to Basket
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsDetailsPage;
