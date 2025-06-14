import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../Context/AppContext'; // Ensure this path is correct

const Cart = () => {
    const navigate = useNavigate()
    const { cart, handleUpdateQuantity, handleProductDelete, CartLoading } = useApp(); // Get the actual cart state and loading status

    let shippingCost = 5.00;
    const totalAmount = cart ? cart.reduce(
        (acc, item) => acc + (item.product_id?.product_price || 0) * item.quantity, // Safely access price
        0
    ) : 0;

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Your Cart</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Cart Items */}
                <div className="lg:col-span-2 space-y-4">
                    {CartLoading ? (
                        <p className="text-center text-gray-600 text-lg">Loading cart items...</p>
                    ) : cart && cart.length > 0 ? (
                        cart.map((item) => (
                            <div
                                key={item.product_id?._id || item._id} // Use product_id._id for key, fallback to item._id
                                className="flex flex-col md:flex-row items-center bg-white rounded-lg shadow p-4"
                            >
                                <img
                                    onClick={() => navigate(`/product/${item.product_id?._id}`)}
                                    loading='lazy'
                                    src={item.product_id?.product_image} // Access image from nested product_id
                                    alt={item.product_id?.product_name} // Access name from nested product_id
                                    className="cursor-pointer w-24 h-24 object-cover rounded-md mb-4 md:mb-0 md:mr-4"
                                />
                                <div className="flex-1">
                                    <h2 onClick={() => navigate(`/product/${item.product_id?._id}`)} className="cursor-pointer text-lg font-semibold">{item.product_id?.product_name}</h2>
                                    <p className="text-gray-600">${(parseFloat(item.product_id?.product_price) || 0).toFixed(2)}</p>

                                    <div className="flex items-center mt-2">
                                        {/* Quantity Decrease Button */}
                                        <button
                                            onClick={() => handleUpdateQuantity(item.product_id?._id, 'decreaseQuantity')} // You'd connect this to your update function
                                            className="cursor-pointer bg-gray-200 text-gray-700 px-3 py-1 rounded-l-md hover:bg-gray-300 transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                                        >
                                            -
                                        </button>

                                        {/* Quantity Input Field */}
                                        <input
                                            type="number"
                                            min="1"
                                            value={item.quantity}
                                            readOnly // Keep readOnly if you're managing quantity with +/- buttons
                                            className="w-16 border-t border-b border-gray-300 p-1 text-center text-gray-800 font-medium focus:outline-none"
                                        // You might add an onChange handler here if you want direct input editing
                                        />

                                        {/* Quantity Increase Button */}
                                        <button
                                            onClick={() => handleUpdateQuantity(item.product_id?._id, 'increaseQuantity')} // You'd connect this to your update function
                                            className="cursor-pointer bg-gray-200 text-gray-700 px-3 py-1 rounded-r-md hover:bg-gray-300 transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                                <button onClick={() => handleProductDelete(item.product_id?._id)} className="cursor-pointer text-red-600 hover:underline mt-4 md:mt-0">
                                    Remove
                                </button>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-600 text-lg">Your cart is empty!</p>
                    )}
                </div>

                {/* Summary */}
                <div className="bg-white p-6 rounded-lg shadow h-fit">
                    <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
                    <div className="flex justify-between mb-2">
                        <span>Subtotal</span>
                        <span>${totalAmount.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between mb-4">
                        <span>Shipping</span>
                        <span>${shippingCost}</span>
                    </div>
                    <hr className="mb-4" />
                    <div className="flex justify-between font-bold text-lg mb-6">
                        <span>Total</span>
                        <span>${(totalAmount + shippingCost).toFixed(2)}</span>
                    </div>
                    <button onClick={() => navigate('/checkout')} className="cursor-pointer w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
                        Proceed to Checkout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Cart;