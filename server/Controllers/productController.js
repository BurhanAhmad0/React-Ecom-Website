const ProductModel = require("../Models/ProductModel.js");
const mongoose = require("mongoose");

const GetProduct = async (req, res) => {
  try {
    const products = await ProductModel.find({});

    return res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    console.error("Error fetching products:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const GetProductById = async (req, res) => {
  try {
    const productId = req.params.id;

    const product = await ProductModel.findById(productId);

    res.json({ message: "Products", product: product });
  } catch (error) {
    console.error("Error in User:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const GetProductByCategory = async (req, res) => {
  try {
    const productCategory = req.params.category;

    if (!productCategory) {
      return res
        .status(400)
        .json({ message: "Category parameter is required" });
    }

    const products = await ProductModel.find({
      product_category: { $regex: new RegExp(`^${productCategory}$`, "i") },
    });

    res
      .status(200)
      .json({ message: "Products fetched successfully", products });
  } catch (error) {
    console.error("Error in GetProductByCategory:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const AddProduct = async (req, res) => {
  try {
    const {
      product_category,
      product_description,
      product_imageUrl,
      product_name,
      product_quantity,
      product_price,
    } = req.body;

    if (!product_name || !product_price) {
      res.json({ success: false, message: "All fields are required" });
    }

    const newProduct = new ProductModel({
      product_name,
      product_description,
      product_price,
      product_category,
      product_quantity,
      product_image: product_imageUrl,
    });
    await newProduct.save();

    res.status(201).json({ message: "Product Added" });
  } catch (error) {
    console.error("Error in User:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const UpdateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const {
      product_category,
      product_description,
      product_imageUrl,
      product_name,
      product_quantity,
      product_price,
    } = req.body;

    if (!productId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const updatedFields = {};

    if (product_name) updatedFields.product_name = product_name;
    if (product_description)
      updatedFields.product_description = product_description;
    if (product_category) updatedFields.product_category = product_category;
    if (product_price) updatedFields.product_price = product_price;
    if (product_quantity) updatedFields.product_quantity = product_quantity;
    if (product_imageUrl) updatedFields.product_imageUrl = product_imageUrl;

    const updatedProduct = await ProductModel.findByIdAndUpdate(
      productId,
      updatedFields,
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(201).json({ message: "Product Updated" });
  } catch (error) {
    console.error("UpdateUser error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const DeleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    if (!productId) {
      return res.status(400).json({ message: "Product ID is required" });
    }

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    const deletedProduct = await ProductModel.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(201).json({ message: "Product Deleted" });
  } catch (error) {
    console.error("DeleteUser error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  GetProduct,
  GetProductById,
  GetProductByCategory,
  AddProduct,
  UpdateProduct,
  DeleteProduct,
};
