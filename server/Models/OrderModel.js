const mongoose = require('mongoose');

// Define schema
const OrderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to your User model
        required: true // An order must belong to a user
    },
    products: [ // Renamed from "Orders" to "products" (or "items")
        {
            productId: { // Renamed from "OrderId" to "productId"
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product', // Reference to your Product model
                required: true
            },
            quantity: {
                type: Number,
                required: true,
                min: 1 // Quantity must be at least 1
            },
            priceAtOrder: { // Store the price at the time the order was placed
                type: Number,
                required: true
            },
            // Optional: You might want to store a snapshot of basic product details
            // like name and image directly here to avoid populating for simple displays,
            // though it introduces some data duplication that needs management.
            // productName: String,
            // productImage: String,
        }
    ],
    totalAmount: { // It's good practice to define type explicitly
        type: Number,
        required: true,
        min: 0 // Total amount cannot be negative
    },
    status: {
        type: String,
        enum: ["Pending", "Shipped", "Delivered", "Cancelled"], // Common statuses
        default: "Pending", // Default status for new orders
        required: true
    },
    paymentInfo: {
        method: { type: String, required: true, default: 'Card' },
        transactionId: { type: String, required: true },
        // You might want to add more payment details like last4, brand, etc.
    },
    shippingAddress: { // Add a field for the shipping address
        fullName: { type: String, required: true },
        address1: { type: String, required: true },
        address2: { type: String },
        city: { type: String, required: true },
        stateProvince: { type: String, required: true },
        zipCode: { type: String, required: true },
        country: { type: String, required: true },
        phone: { type: String, required: true },
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Prevent model overwrite in development (important in Next.js or hot reload)
// Use mongoose.models.Order for consistency in Next.js environments
const Order = mongoose.models.Order || mongoose.model('Order', OrderSchema);

// Export the model
module.exports = Order;