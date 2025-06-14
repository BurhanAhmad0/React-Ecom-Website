import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup'; // Import yup
// Fix: Adjusted import paths to be relative to a common 'src' structure
import { useApp } from '../Context/AppContext'; // Assuming AppContext is in 'src/context'
import { useAuth } from '../Context/AuthContext'; // Assuming AuthContext is in 'src/context'
import toast from 'react-hot-toast'; // For notifications
import axios from 'axios';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';

// 1. Define the Yup Validation Schema
const checkoutSchema = yup.object().shape({
    shipping: yup.object().shape({
        fullName: yup.string().required('Full name is required').max(100, 'Full name cannot exceed 100 characters'),
        address1: yup.string().required('Address Line 1 is required').max(200, 'Address cannot exceed 200 characters'),
        address2: yup.string().max(200, 'Address cannot exceed 200 characters').nullable(), // .nullable() allows null or undefined, .default('') can set a default empty string
        city: yup.string().required('City is required').max(100, 'City cannot exceed 100 characters'),
        stateProvince: yup.string().required('State/Province is required').max(100, 'State/Province cannot exceed 100 characters'),
        zipCode: yup.string().required('Zip/Postal Code is required').max(20, 'Invalid zip code').matches(/^[0-9A-Za-z\s-]{3,}$/, 'Invalid zip/postal code format'), // More generic for international
        country: yup.string().required('Country is required').max(100, 'Country cannot exceed 100 characters'),
        phone: yup.string().required('Phone number is required').min(10, 'Phone number must be at least 10 digits').max(15, 'Phone number cannot exceed 15 digits').matches(/^\+?[0-9\s()-]*$/, 'Invalid phone number format'), // Allow some common phone chars
    })
});

const CheckoutPage = () => {

    const stripe = useStripe();
    const elements = useElements();

    const { cart, loading: cartLoading } = useApp(); // Get cart data from AppContext
    const { user } = useAuth(); // Get user data for pre-filling form

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [OrderConfirmationModal, setOrderConfirmationModal] = useState(false)

    // Initialize react-hook-form with yupResolver
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({
        resolver: yupResolver(checkoutSchema), // Use yupResolver here
        defaultValues: {
            shipping: {
                fullName: user?.name || '', // Pre-fill with user's name if available
                address1: '',
                address2: '',
                city: '',
                stateProvince: '',
                zipCode: '',
                country: '',
                phone: '',
            }
        },
    });

    // Calculate order summary details
    const subtotal = cart?.reduce(
        (acc, item) => acc + (item.product_id?.product_price || 0) * item.quantity,
        0
    ) || 0;
    const shippingCost = subtotal > 0 ? 5.00 : 0; // Example: free shipping if cart empty, otherwise $5
    const totalAmount = subtotal + shippingCost;

    // Handle form submission
    const onSubmit = async (formData) => {

        const payload = {
            ...formData,
            userId: user?.userId,
            totalAmount,
            products: cart
        };

        setIsSubmitting(true);
        const toastId = toast.loading("Placing your order...");

        try {
            const res = await axios.post(`${import.meta.env.VITE_API_BASE}/order`, payload, {
                withCredentials: true,
            });

            if (!stripe || !elements) {
                toast.error("Stripe not loaded yet.");
                return;
            }

            const result = await stripe.confirmCardPayment(res.data.clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                },
            });

            if (result.error) {
                console.error(result.error);
                toast.error(result.error.message || "Payment failed", { id: toastId });
            } else if (result.paymentIntent.status === "succeeded") {
                setOrderConfirmationModal(true)
                toast.success("Payment successful and order placed!", { id: toastId });
                reset(); // Reset form
                // navigate('/order-confirmation');
            } else {
                toast("Payment processing. Please wait...", { id: toastId });
            }

        } catch (error) {
            console.error('Checkout error:', error);
            toast.error('Failed to place order. Please try again.', { id: toastId });
        } finally {
            setIsSubmitting(false);
        }
    };

    if (cartLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-50">
                <p className="text-xl text-gray-700">Loading your cart...</p>
            </div>
        );
    }

    if (!cart || cart.length === 0) {
        return (
            <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50 p-4">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">Your Cart is Empty</h1>
                <p className="text-gray-600 mb-6">Add some items to proceed to checkout.</p>
                <button
                    onClick={() => window.history.back()} // Simple back button, ideally navigate to products
                    className="px-6 py-3 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 transition"
                >
                    Continue Shopping
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl md:text-4xl font-extrabold text-center text-gray-900 mb-10">Checkout</h1>

            <form onSubmit={handleSubmit(onSubmit)} className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Shipping and Payment Details (Left/Center Column) */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Shipping Address */}
                    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">Shipping Address</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                            <div>
                                <label htmlFor="shipping.fullName" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                <input
                                    type="text"
                                    id="shipping.fullName"
                                    {...register('shipping.fullName')}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                {errors.shipping?.fullName && <p className="mt-1 text-sm text-red-500">{errors.shipping.fullName.message}</p>}
                            </div>
                            <div>
                                <label htmlFor="shipping.address1" className="block text-sm font-medium text-gray-700 mb-1">Address Line 1</label>
                                <input
                                    type="text"
                                    id="shipping.address1"
                                    {...register('shipping.address1')}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                {errors.shipping?.address1 && <p className="mt-1 text-sm text-red-500">{errors.shipping.address1.message}</p>}
                            </div>
                            <div>
                                <label htmlFor="shipping.address2" className="block text-sm font-medium text-gray-700 mb-1">Address Line 2 (Optional)</label>
                                <input
                                    type="text"
                                    id="shipping.address2"
                                    {...register('shipping.address2')}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                {errors.shipping?.address2 && <p className="mt-1 text-sm text-red-500">{errors.shipping.address2.message}</p>}
                            </div>
                            <div>
                                <label htmlFor="shipping.city" className="block text-sm font-medium text-gray-700 mb-1">City</label>
                                <input
                                    type="text"
                                    id="shipping.city"
                                    {...register('shipping.city')}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                {errors.shipping?.city && <p className="mt-1 text-sm text-red-500">{errors.shipping.city.message}</p>}
                            </div>
                            <div>
                                <label htmlFor="shipping.stateProvince" className="block text-sm font-medium text-gray-700 mb-1">State / Province</label>
                                <input
                                    type="text"
                                    id="shipping.stateProvince"
                                    {...register('shipping.stateProvince')}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                {errors.shipping?.stateProvince && <p className="mt-1 text-sm text-red-500">{errors.shipping.stateProvince.message}</p>}
                            </div>
                            <div>
                                <label htmlFor="shipping.zipCode" className="block text-sm font-medium text-gray-700 mb-1">Zip / Postal Code</label>
                                <input
                                    type="text"
                                    id="shipping.zipCode"
                                    {...register('shipping.zipCode')}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                {errors.shipping?.zipCode && <p className="mt-1 text-sm text-red-500">{errors.shipping.zipCode.message}</p>}
                            </div>
                            <div className="md:col-span-2">
                                <label htmlFor="shipping.country" className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                                <input
                                    type="text"
                                    id="shipping.country"
                                    {...register('shipping.country')}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                {errors.shipping?.country && <p className="mt-1 text-sm text-red-500">{errors.shipping.country.message}</p>}
                            </div>
                            <div className="md:col-span-2">
                                <label htmlFor="shipping.phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                <input
                                    type="tel"
                                    id="shipping.phone"
                                    {...register('shipping.phone')}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                {errors.shipping?.phone && <p className="mt-1 text-sm text-red-500">{errors.shipping.phone.message}</p>}
                            </div>
                        </div>
                    </div>

                    {/* Payment Information */}
                    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">Payment Details</h2>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Card Information</label>
                            <div className="border border-gray-300 rounded-md px-3 py-2">
                                <CardElement options={{ style: { base: { fontSize: '16px' } } }} />
                            </div>
                        </div>
                    </div>

                </div>

                {/* Order Summary (Right Column) */}
                <div className="lg:col-span-1 bg-white p-6 rounded-xl shadow-lg border border-gray-100 h-fit sticky top-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Order Summary</h2>

                    {cart?.map((item) => (
                        <div key={item.product_id?._id} className="flex items-center justify-between mb-4 pb-2 border-b border-gray-100 last:border-b-0 last:pb-0">
                            <div className="flex items-center">
                                <img
                                    src={item.product_id?.product_image || 'https://placehold.co/50x50/cccccc/ffffff?text=No+Image'}
                                    alt={item.product_id?.product_name}
                                    className="w-12 h-12 object-cover rounded-md mr-4"
                                />
                                <div>
                                    <p className="font-semibold text-gray-800">{item.product_id?.product_name}</p>
                                    <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                                </div>
                            </div>
                            <span className="font-medium text-gray-800">${((item.product_id?.product_price || 0) * item.quantity).toFixed(2)}</span>
                        </div>
                    ))}

                    <div className="mt-6 pt-4 border-t border-gray-200 space-y-3">
                        <div className="flex justify-between text-gray-700">
                            <span>Subtotal</span>
                            <span>${subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-gray-700">
                            <span>Shipping</span>
                            <span>${shippingCost.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-xl font-bold text-gray-900 pt-3 border-t border-gray-200">
                            <span>Total</span>
                            <span>${totalAmount.toFixed(2)}</span>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting || !cart || cart.length === 0}
                        className="cursor-pointer mt-8 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow-md transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? 'Processing Order...' : `Place Order ($${totalAmount.toFixed(2)})`}
                    </button>
                </div>
            </form>

            {OrderConfirmationModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/45 bg-opacity-50 z-50">
                    <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full text-center animate-fadeIn">
                        <h2 className="text-2xl font-semibold text-green-600 mb-4">Payment Successful</h2>
                        <p className="text-gray-700 mb-2">
                            Thank you, <strong>{'Ali'}</strong>!
                        </p>
                        <p className="text-gray-700 mb-6">
                            Your order of <strong>${'500'}</strong> has been confirmed.
                        </p>
                        <button
                            onClick={() => setOrderConfirmationModal(false)}
                            className="cursor-pointer bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition duration-300"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}

        </div>
    );
};

export default CheckoutPage;
