import React, { useEffect, useState } from "react";
import axios from "axios";
import { useApp } from "../Context/AppContext.jsx";
import { useParams } from "react-router-dom";

const ProductDetail = () => {
  const { handleAddToCart } = useApp();

  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE}/product/${id}`,
          {
            withCredentials: true,
          }
        );
        setProduct(res.data.product);
      } catch (err) {
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 sm:px-6 lg:px-8">
      {loading ? (
        <div className="text-center text-lg text-gray-600">Loading...</div>
      ) : (
        <div className="max-w-5xl mx-auto bg-white shadow-md rounded-lg overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
          <div className="w-full h-64 md:h-auto">
            <img
              loading="lazy"
              src={product.product_image}
              alt={product.product_name}
              className="w-full h-full object-cover rounded-md"
            />
          </div>
          <div className="flex flex-col justify-between space-y-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                {product.product_name}
              </h1>
              <p className="text-gray-600 text-base">
                {product.product_description}
              </p>
            </div>

            <div className="text-gray-800">
              <p className="text-xl font-semibold mt-2">
                ${parseFloat(product.product_price).toFixed(2)}
              </p>
              <p className="text-sm mt-1">
                Quantity: {product.product_quantity}
              </p>
              <p className="text-sm mt-1">
                Category: {product.product_category}
              </p>
            </div>

            <button
              onClick={() => handleAddToCart(product._id)}
              className="cursor-pointer mt-4 w-full md:w-auto bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700 transition"
            >
              Add to Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
