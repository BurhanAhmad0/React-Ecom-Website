const mongoose = require('mongoose');

// Define schema
const UserSchema = new mongoose.Schema({
    profile_image: {
        type: String
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true, // ensures no duplicate emails
    },
    password: {
        type: String,
        required: true,
    },
    user_role: {
        type: String,
        enum: ['admin', 'user'], // restricts to these roles
        default: 'user', // default role is user
    },
    cart_products: {
        type: [
            {
                product_id: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Product', // Assuming you have a Product model
                    required: true,
                },
                quantity: {
                    type: Number,
                    default: 1,
                },
            },
        ],
        default: [], // default to an empty array
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Prevent model overwrite in development (important in Next.js or hot reload)
const User = mongoose.model('User', UserSchema);

// Export the model
module.exports = User;
