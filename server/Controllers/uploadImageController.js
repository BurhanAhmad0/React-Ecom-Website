const cloudinary = require('../Configs/CloudinaryConfig')
const jwt = require('jsonwebtoken')

const ProductModel = require('../Models/ProductModel')
const UserModel = require('../Models/UserModel');

const uploadProfileImage = async (req, res) => {
    try {
        const result = await cloudinary.uploader.upload(req.file.path);

        // Find the user
        const user = await UserModel.findById(req.user.userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Save image URL to user's profile
        user.profile_image = result.secure_url;
        await user.save();

        const SESSION_TOKEN = jwt.sign(
            { userId: user._id, profile_image: user.profile_image, email: user.email, name: user.name, user_role: user.user_role, createdAt: user.createdAt },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.cookie('SESSION_TOKEN', SESSION_TOKEN, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        res.json({
            message: 'Image uploaded successfully'
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const uploadProductImage = async (req, res) => {
    try {
        const result = await cloudinary.uploader.upload(req.file.path);

        // Find the user
        const product = await ProductModel.findById(req.body.productId);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        // Save image URL to user's profile
        product.product_image = result.secure_url;
        await product.save();

        res.json({
            message: 'Image uploaded successfully'
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = {
    uploadProfileImage,
    uploadProductImage
}
