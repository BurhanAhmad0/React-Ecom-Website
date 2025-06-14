import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useApp } from '../Context/AppContext'

const CategorisedProducts = () => {

    const { handleAddToCart } = useApp()
    const { category } = useParams()
    const [categorisedProducts, setCategorisedProducts] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchCategorisedProducts = async () => {
            try {
                const res = await axios.get(`http://localhost:3000/api/product/category/${category}`, {
                    withCredentials: true
                });
                setCategorisedProducts(res.data.products);
            } catch (err) {
                setCategorisedProducts(null);
            } finally {
                setLoading(false);
            }
        };
        fetchCategorisedProducts();
    }, []);

    return (
        <section className="py-16 px-4 sm:px-6 lg:px-10 bg-gray-50 min-h-screen">
            <h2 className="text-3xl font-semibold text-center text-gray-800 mb-10 capitalize">
                {category} Products
            </h2>

            {loading ? (
                <div className="text-center text-gray-500 text-lg">Loading...</div>
            ) : categorisedProducts.length === 0 ? (
                <div className="text-center text-gray-600 text-lg">No products found in this category.</div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
                    {categorisedProducts.map(product => (
                        <div key={product._id} className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow duration-300 flex flex-col">
                            <img
                                loading='lazy'
                                src={product.product_image}
                                alt={product.product_name}
                                className="w-full h-48 object-cover rounded-md mb-4"
                            />
                            <h3 className="text-lg font-semibold text-gray-800 mb-1">
                                {product.product_name}
                            </h3>
                            <p className="text-gray-600 mb-2 text-sm line-clamp-2">
                                {product.product_description}
                            </p>
                            <p className="text-blue-600 font-bold mb-3">
                                ${parseInt(product.product_price).toFixed(2)}
                            </p>
                            <button onClick={() => handleAddToCart(product._id)} className="cursor-pointer mt-auto bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors">
                                Add to Cart
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </section>
    )
}

export default CategorisedProducts
