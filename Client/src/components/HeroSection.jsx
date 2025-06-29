import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../Context/AuthContext.jsx";

const HeroSection = () => {
  const { user } = useAuth();

  return (
    <section className="bg-transparent py-20 md:py-48 z-10">
      <div className="container mx-auto px-6 max-w-3xl text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold  mb-6">
          Welcome to Our Website
        </h1>
        <p className="text-gray-600 text-base sm:text-lg md:text-xl mb-10">
          Discover amazing content and connect with us.
        </p>
        {!user ? (
          <Link
            to="/signup"
            className="inline-block bg-blue-600 text-white text-lg font-semibold px-8 py-4 rounded-md shadow-md hover:bg-blue-700 transition duration-300"
          >
            Get Started
          </Link>
        ) : (
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/shop"
              className="bg-blue-600 text-white px-6 py-3 rounded-md font-semibold text-lg hover:bg-blue-700 transition"
            >
              Go to Shop
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default HeroSection;
