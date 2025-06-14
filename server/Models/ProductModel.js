const mongoose = require('mongoose');

// Define schema
const ProductSchema = new mongoose.Schema({
    product_name: {
        type: String,
        required: true,
    },
    product_price: {
        type: String,
        required: true,
    },
    product_image: {
        type: String
    },
    product_description: {
        type: String,
        required: true,
    },
    product_category: {
        type: String,
        required: true,
    },
    product_quantity: {
        type: Number,
        required: true,
    },
    product_image: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Prevent model overwrite in development (important in Next.js or hot reload)
const Product = mongoose.model('Product', ProductSchema);

// Export the model
module.exports = Product;
