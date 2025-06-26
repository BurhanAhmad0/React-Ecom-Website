const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const ConnectDB = require("./Configs/ConnectDB.js");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const authRoutes = require("./Routes/authRoutes.js");
const userRoutes = require("./Routes/userRoutes.js");
const productRoutes = require("./Routes/productRoutes.js");
const carRoutes = require("./Routes/cartRoutes.js");
const orderRoutes = require("./Routes/orderRoutes.js");
const uploadRoutes = require("./Routes/uploadImageRoutes.js");
const OpenAIRoutes = require("./Routes/openAIRoutes.js");
const dialogflowRoutes = require("./Routes/dialogflowRoutes.js");

const app = express();

ConnectDB();
// const port = 3000;

app.use(
  cors({
    origin: process.env.FRONTEND_URI,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
  })
);

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cookieParser());

app.get("/", (req, res) => res.send("Welcome to Exclusive Server"));
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/product", productRoutes);
app.use("/api/cart", carRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/openai", OpenAIRoutes);
app.use("/api/dialogflow", dialogflowRoutes);

// app.listen(port, () => {
//   console.log(`Server is running successfully on port ${port}`);
// });

module.exports = app;
