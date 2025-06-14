import React from 'react'
import { useApp } from '../Context/AppContext'
import { Link } from 'react-router-dom'

const TrendingNowSection = () => {

    const { products, loading } = useApp()

    return (
        <section className="bg-white py-20 px-4 sm:px-6 lg:px-10">
            <div className="max-w-7xl mx-auto">
                {/* Section Heading */}
                <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-12">
                    Trending Now
                </h2>

                {/* Trending Products Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {loading ? (
                        <div>Loading...</div>
                    ) : (
                        products.slice(0, 4).map((product) => (
                            <div
                                key={product._id}
                                className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 p-6 flex flex-col justify-between"
                            >
                                {/* Optional Product Image */}
                                <div className="mb-4">
                                    <div className="aspect-w-1 aspect-h-1 bg-gray-100 rounded-lg overflow-hidden">
                                        <img
                                            loading='lazy'
                                            src={product.product_image}
                                            alt={product.product_name}
                                            className="object-cover w-full h-full"
                                        />
                                    </div>
                                </div>

                                {/* Product Details */}
                                <h3 className="text-lg font-semibold text-gray-800 mb-2">{product.product_name}</h3>
                                <p className="text-gray-600 text-sm">
                                    Discover the latest trends in {product.product_description.toLowerCase()}.
                                </p>

                                <Link
                                    to={`/product/${product._id}`}
                                    className="mt-4 inline-block text-blue-600 hover:text-blue-700 text-sm font-medium"
                                >
                                    View Details →
                                </Link>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </section>
    )
}

export default TrendingNowSection
