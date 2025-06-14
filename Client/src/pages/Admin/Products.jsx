import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../../Context/AppContext'

import AdminProductCard from '../../components/Admin/AdminProductCard'

const Products = () => {
  const navigate = useNavigate()
  const { products, loading } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
        <h1 className="text-2xl font-bold mb-4 sm:mb-0">Product Management</h1>
        <button
          onClick={() => navigate('/admin/addProduct')}
          className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition cursor-pointer"
        >
          + Add Product
        </button>
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.length === 0 ? (
            <p className="text-gray-500 text-center">No products found.</p>
          ) : (
            products.map((product) => (
              <AdminProductCard key={product._id} product={product} />
            ))
          )}
        </div>
      )}

    </div>
  )
}

export default Products
