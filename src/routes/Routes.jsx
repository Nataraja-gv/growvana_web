import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "../layout/mainLayout";
import HomePage from "../pages/homePage";
import ProductsDetailsPage from "../pages/productsDetailsPage";

const RoutesPage = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/product/:id" element={<ProductsDetailsPage />} />
          <Route path="*" element="No page" />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default RoutesPage;
