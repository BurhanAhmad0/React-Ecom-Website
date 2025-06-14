const UserModel = require('../Models/UserModel');

const GetCartProducts = async (req, res) => {
    try {
        const userId = req.user?.userId;

        if (!userId) {
            return res.status(400).json({ message: 'User ID is required' });
        }

        // Fetch user with cart populated (assuming `cart` is an array of product IDs)
        const user = await UserModel.findById(userId).populate('cart_products.product_id');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const cartProducts = user.cart_products;

        res.status(201).json({ message: 'Cart products fetched successfully', cartProducts });
    } catch (error) {
        console.error("Error in GetCartProducts:", error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const AddToCart = async (req, res) => {
    try {
        const { id } = req.params; // This `id` is likely the product ID
        const { userId, quantity } = req.body; // Assuming you're passing userId and quantity in the request body

        // 1. Find the user
        const user = await UserModel.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // 2. Check if the product already exists in the cart
        const productIndex = user.cart_products.findIndex(
            (item) => item.product_id.toString() === id
        );

        if (productIndex > -1) {
            // Product exists, update quantity
            user.cart_products[productIndex].quantity += quantity || 1; // Increment by requested quantity or 1
        } else {
            // Product does not exist, add new item
            user.cart_products.push({ product_id: id, quantity: quantity || 1 });
        }

        // 3. Save the updated user document
        await user.save();

        res.status(201).json({ message: 'Product added to cart successfully' });

    } catch (error) {
        console.error("Error in AddToCart:", error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const RemoveFromCart = async (req, res) => {
    try {
        const { id } = req.params; // This `id` is the product ID to be removed
        // For 'delete whole product', you no longer need quantityToRemove from req.body
        // const { userId, quantityToRemove } = req.body; // No longer needed for full removal
        const { userId } = req.body; // Assuming userId still comes from the body,
        // though typically it would be from req.user.id via auth.

        // 1. Find the user
        const user = await UserModel.findById(userId); // Or UserModel.findById(req.user.id)

        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // 2. Find the product in the cart
        const productIndex = user.cart_products.findIndex(
            (item) => item.product_id.toString() === id
        );

        // 3. Handle product removal logic
        if (productIndex > -1) {
            // Product exists in the cart, so remove it entirely
            user.cart_products.splice(productIndex, 1); // Remove 1 element at productIndex

            // 4. Save the updated user document
            await user.save();

            // Respond with success message and the updated cart (for frontend live update)
            res.status(200).json({
                message: 'Product completely removed from cart successfully.'
            });
        } else {
            // Product does not exist in the cart
            return res.status(404).json({ message: 'Product not found in cart.' });
        }

    } catch (error) {
        console.error("Error in RemoveFromCart:", error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

const UpdateCartProductQuantity = async (req, res) => {
    try {
        const { id } = req.params; // This `id` is the product ID to be removed
        // For 'delete whole product', you no longer need quantityToRemove from req.body
        // const { userId, quantityToRemove } = req.body; // No longer needed for full removal
        const { userId, cartEvent, quantity } = req.body; // Assuming userId still comes from the body,
        // though typically it would be from req.user.id via auth.

        // 1. Find the user
        const user = await UserModel.findById(userId); // Or UserModel.findById(req.user.id)

        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // 2. Find the product in the cart
        const productIndex = user.cart_products.findIndex(
            (item) => item.product_id.toString() === id
        );

        // 3. Handle product removal logic
        if (productIndex > -1) {
            if (cartEvent === 'increaseQuantity') {
                user.cart_products[productIndex].quantity += quantity || 1;
            } else {
                user.cart_products[productIndex].quantity -= quantity || 1;
                if (user.cart_products[productIndex].quantity === 0) {
                    user.cart_products.splice(productIndex, 1); // Remove 1 element at productIndex
                }
            }

            // 4. Save the updated user document
            await user.save();

            // Respond with success message and the updated cart (for frontend live update)
            res.status(200).json({
                message: 'Product quantity updated successfully.'
            });
        } else {
            // Product does not exist in the cart
            return res.status(404).json({ message: 'Product not found in cart.' });
        }

    } catch (error) {
        console.error("Error in UpdateCartProductQuantity:", error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

module.exports = {
    GetCartProducts,
    AddToCart,
    RemoveFromCart,
    UpdateCartProductQuantity
};
