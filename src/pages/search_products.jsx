 import { useEffect, useState } from "react";
import { getfilterProducts } from "../services/products/products";
import ProductCard from "../component/productCard";

const SearchProduct = () => {
  const [productsList, setproductsList] = useState([]);
  const [selectColor, setSelectColor] = useState();
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getfilterProducts(search);
        if (res && res?.data) {
          setproductsList(res?.data);
        }
      } catch (error) {
        console.error("Failed to fetch filtered products:", error.message);
      }
    };

    fetchData();
  }, [search]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Search Box */}
      <div className="flex justify-center py-6">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by product name"
          className="w-4/5 sm:w-1/2 border border-gray-300 rounded-full px-5 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
        />
      </div>

      {/* Product Grid */}
      <div className="w-[90%] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pb-10">
        {productsList?.length > 0 ? (
          productsList.map((product) => {
            const discount = Math.round(
              ((product?.currect_price - product?.offer_price) / product?.currect_price) * 100
            );

            return (
              <ProductCard
                key={product?._id}
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
          <p className="text-center col-span-full text-gray-600">No products found.</p>
        )}
      </div>
    </div>
  );
};

export default SearchProduct;
