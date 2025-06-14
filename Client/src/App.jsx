import React from 'react'
import { Routes, Route } from "react-router-dom";

import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/home';
import About from './pages/about';
import Profile from './pages/profile';
import Cart from './pages/cart';
import ProductDetail from './pages/ProductDetail';
import CategorisedProducts from './pages/CategorisedProducts';
import CheckOut from './pages/CheckOut';
import NoPage from './pages/NoPage';

import Dashboard from './pages/Admin/AdminDashboard';
import Products from './pages/Admin/Products';
import AddProducts from './pages/Admin/AddProducts';
import AdminProductDetail from './pages/Admin/ProductDetail';
import Orders from './pages/Admin/Orders';

import HomeLayout from './components/HomeLayout';
import MainLayout from './components/MainLayout';
import ProtectedRoutes from './components/ProtectedRoute';
import UnauthorizedAccess from './pages/UnauthorizedAccess';
import AdminLayout from './components/Admin/AdminLayout';
import AdminRoutes from './components/Admin/AdminRoutes';

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
            <Route path="/category/:category" element={<CategorisedProducts />} />
            <Route path="/checkout" element={<CheckOut />} />
          </Route>
        </Route>

        {/* Admin Routes */}
        <Route element={<ProtectedRoutes />}>
          <Route element={<AdminRoutes />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Dashboard />} />
              <Route path='/admin/addProduct' element={<AddProducts />} />
              <Route path='/admin/products' element={<Products />} />
              <Route path='/admin/products/:id' element={<AdminProductDetail />} />
              <Route path='/admin/orders' element={<Orders />} />
            </Route>
          </Route>
        </Route>

        <Route path="/signup" element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/UnauthorizedAccess' element={<UnauthorizedAccess />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </>
  )
}

export default App
