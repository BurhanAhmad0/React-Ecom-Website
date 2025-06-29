import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext.jsx";
import { Toaster } from "react-hot-toast";

import userIcon from "../../assets/icons/userSvg.svg";
import productIcon from "../../assets/icons/productSvg.svg";
import orderIcon from "../../assets/icons/orderSvg.svg";

const Navbar = ({ bgColor }) => {
  const { user, loading, handleLogout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav
      className={`font-poppins flex items-center justify-between flex-wrap ${bgColor} py-4 px-10`}
    >
      <Toaster position="top-right" reverseOrder={false} />

      {/* Admin Brand */}
      <div className="flex items-center flex-shrink-0 text-blue-600 text-2xl font-bold">
        <Link to="/">Exclusive</Link>
      </div>

      {/* Right Section */}
      {!loading && (
        <div className="flex items-center space-x-6">
          {user ? (
            <>
              {/* Admin Tools (optional links or icons) */}
              <Link
                to="/admin/products"
                className="text-white hover:text-blue-200"
              >
                <img
                  loading="lazy"
                  className="w-8 h-8 cursor-pointer"
                  src={productIcon}
                  alt=""
                />
              </Link>
              <Link
                to="/admin/orders"
                className="text-white hover:text-blue-200"
              >
                <img
                  loading="lazy"
                  className="w-8 h-8 cursor-pointer"
                  src={orderIcon}
                  alt=""
                />
              </Link>

              {/* User Avatar with Dropdown */}
              <div className="relative group flex items-center justify-center w-9 h-9">
                <img
                  loading="lazy"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  src={userIcon}
                  alt="Admin"
                  className="w-8 h-8 cursor-pointer"
                />

                <div
                  className={`absolute right-0 top-10 mt-2 w-48 text-black bg-white rounded-md shadow-lg z-20 ${
                    isMenuOpen ? "block" : "hidden"
                  }`}
                >
                  <Link
                    to={`/profile/${user.name.split(" ")[0]}`}
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Profile
                  </Link>
                  <Link
                    to={`/admin`}
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Admin Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-100"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-300"
              >
                Login
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
