import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "../layout/mainLayout";
import HomePage from "../pages/homePage";
import ProductsDetailsPage from "../pages/productsDetailsPage";
import CartPage from "../pages/cartPage";
import NewAddress from "../pages/newAddress";

const RoutesPage = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/product/:id" element={<ProductsDetailsPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/address/new" element={<NewAddress />} />

          <Route path="*" element="No page" />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default RoutesPage;
