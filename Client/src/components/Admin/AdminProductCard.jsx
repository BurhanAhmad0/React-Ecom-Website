import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const AdminProductCard = ({ product }) => {

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm();
    const [showConfirm, setShowConfirm] = useState(false);
    const [IsUpdatingProduct, setIsUpdatingProduct] = useState(false)
    const navigate = useNavigate()

    const handleUpdateProduct = async (data) => {
        try {
            const response = await axios.put(`${import.meta.env.VITE_API_BASE}/product/${product._id}`, data, {
                withCredentials: true,
            });

            if (response.status === 201) {
                toast.success('Product updated successfully');
                setIsUpdatingProduct(false);
                reset(); // reset form after submission
            }
        } catch (error) {
            const message = error.response?.data?.message || error.message;
            toast.error(message);
            console.error('Update product error:', message);
        }
    };

    const handleDeleteProduct = async (id) => {
        try {
            const response = await axios.delete(`${import.meta.env.VITE_API_BASE}/product/${id}`, {
                withCredentials: true,
            });

            if (response.status === 201) {
                toast.success('Product deleted successfully');
            }
        } catch (error) {
            const message = error.response?.data?.message || error.message;
            toast.error(message);
            console.error('Delete product error:', message);
        }
    }

    const handleProductImageUpload = async (e) => {
        try {
            const file = e.target.files[0];

            const formData = new FormData();
            formData.append('image', file); // 'image' should match backend field name
            formData.append('productId', product._id);

            const response = await axios.post(
                `${import.meta.env.VITE_API_BASE}/upload/product_image`,
                formData,
                {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            toast.success('Image updated successfully!')
        } catch (error) {
            console.error('Upload failed:', error);
        }
    };

    return (
        <>
            <div
                onClick={() => navigate(`/admin/products/${product._id}`)}
                className="bg-white shadow border rounded-lg overflow-hidden cursor-pointer"
            >
                <img
                    loading='lazy'
                    src={product.product_image}
                    alt={product.product_name}
                    className="w-full h-48 object-cover"
                />
                <div className="p-4 space-y-2">
                    <h2 className="text-lg font-semibold">{product.product_name}</h2>
                    <p className="text-gray-600 font-medium">Quantity: {parseInt(product.product_quantity)}</p>
                    <p className="text-gray-600 font-medium">${parseInt(product.product_price).toFixed(2)}</p>

                    <div className="flex justify-between mt-4">
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsUpdatingProduct(true);
                            }}
                            className="cursor-pointer text-sm bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                        >
                            Update
                        </button>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                setShowConfirm(true);
                            }}
                            className="cursor-pointer text-sm bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>

            {/* Confirmation Modal */}
            {showConfirm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded shadow-lg w-full max-w-sm">
                        <h2 className="text-lg font-semibold">Confirm Deletion</h2>
                        <p className="mt-2 text-gray-700">Are you sure you want to this product?</p>
                        <div className="mt-4 flex justify-end space-x-2">
                            <button
                                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                                onClick={() => setShowConfirm(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                                onClick={() => {
                                    setShowConfirm(false);
                                    handleDeleteProduct(product._id);
                                }}
                            >
                                Yes, Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {IsUpdatingProduct && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 bg-opacity-50">
                    <div className="relative w-full max-w-lg mx-auto bg-white p-8 rounded-md shadow-lg overflow-y-auto max-h-screen">
                        <button
                            onClick={() => setIsUpdatingProduct(false)}
                            className="cursor-pointer absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl font-bold"
                        >
                            &times;
                        </button>

                        <form onSubmit={handleSubmit(handleUpdateProduct)} className="space-y-6">
                            <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">Update Product</h2>

                            <div>
                                <label htmlFor="product_name" className="block mb-1 text-gray-700 font-medium">
                                    Upload Image
                                </label>
                                <input
                                    type="file"
                                    id="profile_image"
                                    name="profile_image"
                                    className={`cursor-pointer w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                    onChange={(e) => handleProductImageUpload(e)}
                                />
                            </div>

                            <div>
                                <label htmlFor="product_name" className="block mb-1 text-gray-700 font-medium">
                                    Product Name
                                </label>
                                <input
                                    id="product_name"
                                    type="text"
                                    {...register('product_name')}
                                    className={`w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                                    placeholder="Enter product name"
                                />
                                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                            </div>

                            <div>
                                <label htmlFor="product_description" className="block mb-1 text-gray-700 font-medium">
                                    Description
                                </label>
                                <textarea
                                    id="product_description"
                                    {...register('product_description')}
                                    className={`w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none ${errors.description ? 'border-red-500' : 'border-gray-300'}`}
                                    rows={4}
                                    placeholder="Enter product description"
                                />
                                {errors.description && (
                                    <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="product_price" className="block mb-1 text-gray-700 font-medium">
                                    Price ($)
                                </label>
                                <input
                                    id="product_price"
                                    type="number"
                                    step="0.01"
                                    {...register('product_price', {
                                        min: { value: 0.01, message: 'Price must be at least $0.01' },
                                    })}
                                    className={`w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.price ? 'border-red-500' : 'border-gray-300'}`}
                                    placeholder="Enter product price"
                                />
                                {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>}
                            </div>

                            <div>
                                <label htmlFor="product_quantity" className="block mb-1 text-gray-700 font-medium">
                                    Quantity
                                </label>
                                <input
                                    id="product_quantity"
                                    type="number"
                                    step="0.01"
                                    {...register('product_quantity', {
                                        min: { value: 0.01, message: 'Quantity must be at least 0.01' },
                                    })}
                                    className={`w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.quantity ? 'border-red-500' : 'border-gray-300'}`}
                                    placeholder="Enter product quantity"
                                />
                                {errors.quantity && <p className="text-red-500 text-sm mt-1">{errors.quantity.message}</p>}
                            </div>

                            <div>
                                <label htmlFor="product_category" className="block mb-1 text-gray-700 font-medium">
                                    Category
                                </label>
                                <input
                                    id="product_category"
                                    type="text"
                                    {...register('product_category')}
                                    className={`w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.category ? 'border-red-500' : 'border-gray-300'}`}
                                    placeholder="Enter product category"
                                />
                                {errors.category && (
                                    <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="product_imageUrl" className="block mb-1 text-gray-700 font-medium">
                                    Image URL
                                </label>
                                <input
                                    id="product_imageUrl"
                                    type="url"
                                    {...register('product_imageUrl', {
                                        pattern: {
                                            value: /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg|webp))$/i,
                                            message: 'Enter a valid image URL',
                                        },
                                    })}
                                    className={`w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.imageUrl ? 'border-red-500' : 'border-gray-300'}`}
                                    placeholder="https://example.com/image.jpg"
                                />
                                {errors.imageUrl && (
                                    <p className="text-red-500 text-sm mt-1">{errors.imageUrl.message}</p>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md transition duration-300 disabled:opacity-60"
                            >
                                {isSubmitting ? 'Updating...' : 'Update Product'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </>
    )
}

export default AdminProductCard
