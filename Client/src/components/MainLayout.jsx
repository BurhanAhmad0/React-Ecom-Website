import React from "react";

import { Outlet } from "react-router-dom";

import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";

const MainLayout = () => {
  return (
    <>
      <header>
        <Navbar bgColor="bg-gray-900" />
      </header>
      <Outlet />
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default MainLayout;
