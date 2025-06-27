import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "../layout/mainLayout";
import HomePage from "../pages/homePage";
import ProductsDetailsPage from "../pages/productsDetailsPage";
import CartPage from "../pages/cartPage";
import NewAddress from "../pages/newAddress";
import TrackOrderPage from "../pages/trackorderPage";
import MyOrders from "../pages/myorders";
import LoginModal from "../pages/loginpage";
import CategoryProduct from "../pages/categoryProduct";
import SearchProduct from "../pages/search_products";
import ProfilePage from "../pages/profilePage";
import SubscriptionPage from "../pages/premiumPage";
 

const RoutesPage = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/product/:id" element={<ProductsDetailsPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/address/new" element={<NewAddress />} />
          <Route path="/track_order_page" element={<TrackOrderPage />} />
          <Route path="/premium" element={<SubscriptionPage />} />

          <Route
            path="/products/category/:categoryId"
            element={<CategoryProduct />}
          />
          <Route path="/search" element={<SearchProduct />} />
          <Route path="/my_orders" element={<MyOrders />} />
          <Route path="/login" element={<LoginModal />} />
          <Route path="/user/profile" element={<ProfilePage />} />

          <Route path="*" element="No page" />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default RoutesPage;
