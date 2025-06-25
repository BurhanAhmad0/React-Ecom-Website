const OrderModel = require("../Models/OrderModel.js");
const ProductModel = require("../Models/ProductModel.js");
const Stripe = require("stripe");
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const placeOrder = async (req, res) => {
  try {
    const { products, shipping, totalAmount } = req.body;
    const userId = req.user.userId;

    // 1. Validate required data
    if (!products || !shipping || !totalAmount || !userId) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // 2. Calculate and verify prices from DB to avoid frontend manipulation
    const populatedProducts = await Promise.all(
      products.map(async (item) => {
        const productData = await ProductModel.findById(item.product_id._id);
        if (!productData)
          throw new Error("Product not found: " + item.product_id._id);

        return {
          productId: item.product_id._id,
          quantity: item.quantity,
          priceAtOrder: productData.product_price,
        };
      })
    );

    // 3. Calculate verified total amount (in cents)
    const verifiedTotal = populatedProducts.reduce((acc, item) => {
      return acc + item.priceAtOrder * item.quantity;
    }, 0);

    // 4. Create Stripe PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(verifiedTotal * 100), // in cents
      currency: "usd",
      payment_method_types: ["card"],
    });

    // 5. Create order with status pending (Stripe transaction ID unknown yet)
    const newOrder = new OrderModel({
      userId,
      products: populatedProducts,
      totalAmount: Math.round(verifiedTotal * 100),
      status: "Pending",
      paymentInfo: {
        method: "Card",
        transactionId: paymentIntent.id, // store actual Stripe ID
      },
      shippingAddress: {
        fullName: shipping.fullName,
        address1: shipping.address1,
        address2: shipping.address2 || "",
        city: shipping.city,
        stateProvince: shipping.stateProvince,
        zipCode: shipping.zipCode,
        country: shipping.country,
        phone: shipping.phone,
      },
    });

    await newOrder.save();

    // 6. Return client_secret for front-end payment
    return res.status(200).json({
      success: true,
      order: newOrder,
      clientSecret: paymentIntent.client_secret,
    });
  } catch (err) {
    console.error("Order Error:", err.message);
    return res
      .status(500)
      .json({ error: "Order creation failed", detail: err.message });
  }
};

const getOrders = async (req, res) => {
  try {
    const userId = req.user.userId || req.user._id;

    const orders = await OrderModel.find({ userId: userId }).populate("userId");

    return res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error("Order Fetching Error:", err.message);
    return res
      .status(500)
      .json({ error: "Orders fetching faile", detail: err.message });
  }
};

module.exports = {
  placeOrder,
  getOrders,
};
