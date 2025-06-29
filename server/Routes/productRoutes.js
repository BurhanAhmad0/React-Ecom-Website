const express = require("express");
const router = express.Router();

const {
  GetProduct,
  GetProductById,
  AddProduct,
  UpdateProduct,
  DeleteProduct,
  GetProductByCategory,
} = require("../Controllers/productController.js");

const Auth = require("../Middlewares/Auth.js");

// Route for user
router.get("/", GetProduct);
router.get("/:id", GetProductById);
router.get("/category/:category", GetProductByCategory);
router.post("/", Auth, AddProduct);
router.put("/:id", Auth, UpdateProduct);
router.delete("/:id", Auth, DeleteProduct);

module.exports = router;
