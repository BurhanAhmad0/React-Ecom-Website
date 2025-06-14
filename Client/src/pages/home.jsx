import React from 'react'

import SaleProductsSection from '../components/SaleProductsSection'
import FeaturedProductsSection from '../components/FeaturedProductsSection'
import TrustedBrandsSection from '../components/TrustedBrandsSection'
import CategoriesSection from '../components/CategoriesSection'
import TrendingNowSection from '../components/TrendingNowSection'
import NewsLetterSection from '../components/NewsLetterSection'

const home = () => {

  return (
    <div className='font-poppins bg-white'>
      <SaleProductsSection />
      <FeaturedProductsSection />
      <CategoriesSection />
      <TrustedBrandsSection />
      <TrendingNowSection />
      <NewsLetterSection />
    </div>
  )
}

export default home
