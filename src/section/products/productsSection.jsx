import React, { useEffect, useState } from "react";
import { getProducts } from "../../services/products/products";
import ProductCard from "../../component/productCard";
import { useSnackbar } from "notistack";


const ProductsSection = () => {
  const [productsList, setProductsList] = useState([]);
  const [selectColor, setSelectColor] = useState();
  const [loading, setLoading] = useState(false);
 

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await getProducts();
        setProductsList(response?.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

   

  return (
    <div className=" ">
      <h1 className="text-[32px] text-green-800 font-bold text-center  mt-[34px]">
        Shark’s Favourite Picks!
      </h1>
      {loading && (
        <div className="flex justify-center items-center h-64">
          <p>Loading...</p>
        </div>
      )}
      <div className=" w-[80%] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {productsList?.length > 0 ? (
          productsList?.slice(5, 13)?.map((product) => {
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

export default ProductsSection;
