const UserModel = require('../Models/UserModel');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken');

const User = (req, res) => {
    try {

        // Assumes the middleware adds `req.user` after verifying JWT
        if (!req.user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        res.status(200).json({
            message: 'User fetched successfully',
            user: req.user
        });

    } catch (error) {
        console.error("Error in User:", error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const UpdateUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const { name, email, password, role } = req.body;

        if (!userId) {
            return res.status(400).json({ message: 'User ID is required' });
        }

        const updatedFields = {};

        if (name) updatedFields.name = name;
        if (email) updatedFields.email = email;
        if (role) updatedFields.user_role = role;

        // Handle password conditionally
        if (password && password.trim() !== '') {
            if (password.length < 6) {
                return res.status(400).json({ message: 'Password must be at least 6 characters long' });
            }
            updatedFields.password = await bcrypt.hash(password, 10);
        }

        const updatedUser = await UserModel.findByIdAndUpdate(userId, updatedFields, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        const SESSION_TOKEN = jwt.sign(
            { userId: updatedUser._id, email: updatedUser.email, name: updatedUser.name, user_role: updatedUser.user_role, createdAt: updatedUser.createdAt },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.cookie('SESSION_TOKEN', SESSION_TOKEN, {
            httpOnly: true,
            secure: 'true',
            sameSite: 'none',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return res.status(200).json({
            message: 'User updated successfully'
        });
    } catch (error) {
        console.error('UpdateUser error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

const DeleteUser = async (req, res) => {
    try {
        const userId = req.params.id;

        if (!userId) {
            return res.status(400).json({ message: 'User ID is required' });
        }

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: 'Invalid user ID' });
        }

        const deletedUser = await UserModel.findByIdAndDelete(userId);

        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.clearCookie('SESSION_TOKEN', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict'
        });

        return res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('DeleteUser error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    UpdateUser,
    DeleteUser,
    User
}
