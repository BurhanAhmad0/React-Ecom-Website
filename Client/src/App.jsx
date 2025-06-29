import React from "react";
import { Routes, Route } from "react-router-dom";

import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import Home from "./pages/home.jsx";
import About from "./pages/about.jsx";
import Profile from "./pages/profile.jsx";
import Cart from "./pages/cart.jsx";
import ProductDetail from "./pages/ProductDetail.jsx";
import CategorisedProducts from "./pages/CategorisedProducts.jsx";
import CheckOut from "./pages/CheckOut.jsx";
import NoPage from "./pages/NoPage.jsx";

import Dashboard from "./pages/Admin/AdminDashboard.jsx";
import Products from "./pages/Admin/Products.jsx";
import AddProducts from "./pages/Admin/AddProducts.jsx";
import AdminProductDetail from "./pages/Admin/ProductDetail.jsx";
import Orders from "./pages/Admin/Orders.jsx";

import HomeLayout from "./components/HomeLayout.jsx";
import MainLayout from "./components/MainLayout.jsx";
import ProtectedRoutes from "./components/ProtectedRoute.jsx";
import AdminLayout from "./components/Admin/AdminLayout.jsx";
import UnauthorizedAccess from "./pages/UnauthorizedAccess.jsx";
import AdminRoutes from "./components/Admin/AdminRoutes.jsx";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomeLayout />}>
          <Route index element={<Home />} />
        </Route>

        {/* Client Routes */}
        <Route path="/" element={<MainLayout />}>
          <Route element={<ProtectedRoutes />}>
            <Route path="/about" element={<About />} />
            <Route path="/profile/:username" element={<Profile />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route
              path="/category/:category"
              element={<CategorisedProducts />}
            />
            <Route path="/checkout" element={<CheckOut />} />
          </Route>
        </Route>

        {/* Admin Routes */}
        <Route element={<ProtectedRoutes />}>
          <Route element={<AdminRoutes />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="/admin/addProduct" element={<AddProducts />} />
              <Route path="/admin/products" element={<Products />} />
              <Route
                path="/admin/products/:id"
                element={<AdminProductDetail />}
              />
              <Route path="/admin/orders" element={<Orders />} />
            </Route>
          </Route>
        </Route>

        <Route path="/signup" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/UnauthorizedAccess" element={<UnauthorizedAccess />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </>
  );
};

export default App;
