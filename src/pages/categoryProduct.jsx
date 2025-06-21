import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { getProductsCategoryById } from "../services/products/products";
import ProductCard from "../component/productCard";

const CategoryProduct = () => {
  const [productsList, setProductsList] = useState([]);
  const { state } = useLocation();
  const Title = state?.title;
  const [selectColor, setSelectColor] = useState();
  const [loading, setLoading] = useState(false);
  const { categoryId } = useParams();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await getProductsCategoryById(categoryId);
        setProductsList(response?.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryId]);

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <div className="   ">
      <h1 className="text-[32px] text-green-800 font-bold text-center mt-[134px] mb-[30px]">
        {Title} Category Products
      </h1>
      {loading && (
        <div className="flex justify-center items-center h-64">
          <p>Loading...</p>
        </div>
      )}
      <div className=" w-[80%] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {productsList?.length > 0 ? (
          productsList?.map((product) => {
            const discount = Math.round(
              ((product?.currect_price - product?.offer_price) /
                product?.currect_price) *
                100
            );

            return (
              <ProductCard
                title={product?.product_name}
                discount={discount}
                rating={product?.rating}
                originalPrice={product?.currect_price}
                price={product?.offer_price}
                image={product?.product_images[0]?.image_link}
                colors={product?.color_options}
                productId={product?._id}
                selectedColor={selectColor}
                setSelectedColor={setSelectColor}
              />
            );
          })
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
};

export default CategoryProduct;
