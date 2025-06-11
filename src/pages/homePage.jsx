import React from "react";
import BannerPage from "./banner";
import CategorySection from "../section/home/categorySection";
import ProductsSection from "../section/products/productsSection";

const HomePage = () => {
  return (
    <div>
      <BannerPage />
      <CategorySection/>
      <ProductsSection/>
    </div>
  );
};

export default HomePage;
