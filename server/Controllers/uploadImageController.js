const cloudinary = require("../Configs/CloudinaryConfig");
const jwt = require("jsonwebtoken");

const ProductModel = require("../Models/ProductModel");
const UserModel = require("../Models/UserModel");

// Upload profile image
const uploadProfileImage = async (req, res) => {
  try {
    // Check if file exists
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // Upload image from buffer
    const streamUpload = (buffer) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { resource_type: "image" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        stream.end(buffer);
      });
    };

    const result = await streamUpload(req.file.buffer);

    // Find the user
    const user = await UserModel.findById(req.user?.userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Update profile image
    user.profile_image = result.secure_url;
    await user.save();

    // Create token (limit sensitive data)
    const SESSION_TOKEN = jwt.sign(
      {
        userId: user._id,
        role: user.user_role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Set cookie (for serverless environment use setHeader)
    res.setHeader(
      "Set-Cookie",
      `SESSION_TOKEN=${SESSION_TOKEN}; HttpOnly; Path=/; Max-Age=${
        7 * 24 * 60 * 60
      }; ${
        process.env.NODE_ENV === "production" ? "Secure; SameSite=Strict" : ""
      }`
    );

    res.json({ message: "Image uploaded successfully" });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "Something went wrong. Please try again later." });
  }
};

// Upload product image
const uploadProductImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    if (!req.body.productId) {
      return res.status(400).json({ error: "Product ID is required" });
    }

    const streamUpload = (buffer) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { resource_type: "image" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        stream.end(buffer);
      });
    };

    const result = await streamUpload(req.file.buffer);

    const product = await ProductModel.findById(req.body.productId);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    product.product_image = result.secure_url;
    await product.save();

    res.json({ message: "Product image uploaded successfully" });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "Something went wrong. Please try again later." });
  }
};

module.exports = {
  uploadProfileImage,
  uploadProductImage,
};
