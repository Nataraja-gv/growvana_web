import React, { useEffect } from "react";
import BannerPage from "./banner";
import CategorySection from "../section/home/categorySection";
import ProductsSection from "../section/products/productsSection";

const HomePage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  return (
    <div>
      <BannerPage />
      <CategorySection />
      <ProductsSection />
    </div>
  );
};

export default HomePage;
