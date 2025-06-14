import React from 'react'
import { useApp } from '../Context/AppContext'

const SaleProductsSection = () => {

    const { products, loading, handleAddToCart } = useApp()

    return (
        <section className="bg-white py-20 px-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10">
                Sale Products
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {loading ? (
                    <div className="col-span-full text-center text-gray-600">Loading...</div>
                ) : (
                    products.slice(0, 4).map((product) => (
                        <div
                            key={product._id}
                            className="bg-gray-100 rounded-md p-4 hover:shadow-lg transition-shadow duration-300 flex flex-col"
                        >
                            <img
                                loading='lazy'
                                src={product.product_image}
                                alt={product.product_name}
                                className="w-full h-48 object-cover rounded-md mb-4"
                            />
                            <h3 className="text-lg font-semibold mb-1">{product.product_name}</h3>
                            <p className="text-gray-600 mb-4">
                                ${parseFloat(product.product_price).toFixed(2)}
                            </p>
                            <button onClick={() => handleAddToCart(product._id)} className="cursor-pointer mt-auto bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition-colors duration-300">
                                Add to Cart
                            </button>
                        </div>
                    ))
                )}
            </div>
        </section>
    )
}

export default SaleProductsSection
