import React from "react";

import SaleProductsSection from "../components/SaleProductsSection.jsx";
import FeaturedProductsSection from "../components/FeaturedProductsSection.jsx";
import TrustedBrandsSection from "../components/TrustedBrandsSection.jsx";
import CategoriesSection from "../components/CategoriesSection.jsx";
import TrendingNowSection from "../components/TrendingNowSection.jsx";
import NewsLetterSection from "../components/NewsLetterSection.jsx";

const home = () => {
  return (
    <div className="font-poppins bg-white">
      <SaleProductsSection />
      <FeaturedProductsSection />
      <CategoriesSection />
      <TrustedBrandsSection />
      <TrendingNowSection />
      <NewsLetterSection />
    </div>
  );
};

export default home;
