const express = require("express");
const router = express.Router();

const { placeOrder, getOrders } = require("../Controllers/orderController.js");

const Auth = require("../Middlewares/Auth.js");

// Route for user registration
router.get("/", Auth, getOrders);
router.post("/", Auth, placeOrder);

module.exports = router;
