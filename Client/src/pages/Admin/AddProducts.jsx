import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import toast from 'react-hot-toast';

const AddProducts = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm();

    const onSubmit = async (data) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_BASE}/product`, data, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true,
            });

            if (response.status === 201) {
                toast.success('Product added successfully');
                reset();
            }
        } catch (error) {
            const message = error.response?.data?.message || error.message;
            toast.error(message);
            console.error('Add product error:', message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-8">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full max-w-lg bg-white p-8 rounded-md shadow-md space-y-6"
            >
                <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">Add New Product</h2>

                <div>
                    <label htmlFor="product_name" className="block mb-1 text-gray-700 font-medium">
                        Product Name
                    </label>
                    <input
                        id="product_name"
                        type="text"
                        {...register('product_name', { required: 'Product name is required' })}
                        className={`w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.name ? 'border-red-500' : 'border-gray-300'
                            }`}
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
                        {...register('product_description', { required: 'Description is required' })}
                        className={`w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none ${errors.description ? 'border-red-500' : 'border-gray-300'
                            }`}
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
                            required: 'Price is required',
                            min: { value: 0.01, message: 'Price must be at least $0.01' },
                        })}
                        className={`w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.price ? 'border-red-500' : 'border-gray-300'
                            }`}
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
                            required: 'Price is required',
                            min: { value: 0.01, message: 'Price must be at least $0.01' },
                        })}
                        className={`w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.price ? 'border-red-500' : 'border-gray-300'
                            }`}
                        placeholder="Enter product quantity"
                    />
                    {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>}
                </div>

                <div>
                    <label htmlFor="product_category" className="block mb-1 text-gray-700 font-medium">
                        Category
                    </label>
                    <input
                        id="product_category"
                        type="text"
                        {...register('product_category', { required: 'Category is required' })}
                        className={`w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.category ? 'border-red-500' : 'border-gray-300'
                            }`}
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
                            required: 'Image URL is required',
                            pattern: {
                                value: /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg|webp))$/i,
                                message: 'Enter a valid image URL',
                            },
                        })}
                        className={`w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.imageUrl ? 'border-red-500' : 'border-gray-300'
                            }`}
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
                    {isSubmitting ? 'Adding...' : 'Add Product'}
                </button>
            </form>
        </div>
    );
};

export default AddProducts;
