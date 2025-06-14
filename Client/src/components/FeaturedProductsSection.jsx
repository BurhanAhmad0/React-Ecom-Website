import React from 'react'
import { useApp } from '../Context/AppContext'
import { Link } from 'react-router-dom'

const FeaturedProductsSection = () => {

    const { products, loading } = useApp()

    return (
        <section className="py-20 px-10 bg-gray-100 text-center">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl sm:text-4xl font-semibold text-gray-800 mb-10">Featured Products</h2>

                {loading ? (
                    <div>Loading...</div>
                ) : (
                    <div className="flex flex-wrap justify-center gap-8">
                        {products.slice(0, 3).map((product) => (
                            <div key={product._id} className="bg-white p-6 w-full sm:w-[300px] rounded-lg shadow-md hover:-translate-y-1 transition-transform">
                                <img loading='lazy' src={product.product_image} alt={product.product_name} className="w-full h-auto rounded-md" />
                                <h3 className="text-lg font-medium text-gray-900 mt-4 mb-2">{product.product_name}</h3>
                                <p className="text-gray-600 text-base">${parseInt(product.product_price).toFixed(2)}</p>
                                <Link to={`/product/${product._id}`} className="inline-block mt-4 px-5 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors">
                                    Shop Now
                                </Link>
                            </div>
                        ))}
                    </div>
                )}

            </div>
        </section>
    )
}

export default FeaturedProductsSection
