import React from 'react'
import { Link } from 'react-router-dom'

const CategoriesSection = () => {
    return (
        <section className="bg-white py-20 px-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Heading */}
                <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-12">
                    Shop by Category
                </h2>

                {/* Category Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {['Electronics', 'Fashion', 'Home & Garden', 'Sports'].map((category, index) => (
                        <div
                            key={index}
                            className="bg-gray-50 hover:bg-white transition-colors duration-300 border border-gray-200 hover:shadow-md rounded-xl p-6 flex flex-col items-start"
                        >
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                {category}
                            </h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                Explore our wide range of {category.toLowerCase()} products.
                            </p>
                            <Link
                                to={`/category/${category.toLowerCase().replace(/\s+/g, '-')}`}
                                className="mt-4 text-blue-600 hover:underline text-sm font-medium"
                            >
                                View All
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default CategoriesSection
