const UserModel = require("../Models/UserModel.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const transporter = require("../Configs/NodemailerConfig.js");

RegisterUser = async (req, res) => {
  try {
    // console.log("Headers:", req.headers);
    // console.log("RegisterUser called with body:", req.body);

    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new UserModel({
      name,
      email,
      password: hashedPassword,
      user_role: role || "user", // Default role for new users
    });
    await newUser.save();

    const SESSION_TOKEN = jwt.sign(
      {
        userId: newUser._id,
        profile_image: newUser.profile_image,
        email: newUser.email,
        name: newUser.name,
        user_role: newUser.user_role,
        createdAt: newUser.createdAt,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("SESSION_TOKEN", SESSION_TOKEN, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    const emailOptions = {
      from: `"Codiqon Support" <${process.env.SENDER_EMAIL}>`, // Use your Brevo email here
      to: email,
      subject: "Welcome to Our Website",
      text: "Your account has been created successfully.",
      html: "<h1>Welcome to Our Website</h1><p>Your account has been created successfully.</p>",
    };

    // Send welcome email
    const info = await transporter.sendMail(emailOptions);
    // console.log("Message sent:", info.messageId);

    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    console.error("Error in RegisterUser:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

LoginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await UserModel.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const verifyPassword = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!verifyPassword) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const SESSION_TOKEN = jwt.sign(
      {
        userId: existingUser._id,
        profile_image: existingUser.profile_image,
        email: existingUser.email,
        name: existingUser.name,
        user_role: existingUser.user_role,
        createdAt: existingUser.createdAt,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("SESSION_TOKEN", SESSION_TOKEN, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res
      .status(201)
      .json({ message: "User logged in successfully", user: existingUser });
  } catch (error) {
    console.error("Error in RegisterUser:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

LogoutUser = (req, res) => {
  try {
    // console.log("req.cookies:", req.cookies);
    // console.log("req.headers:", req.headers);

    res.clearCookie("SESSION_TOKEN", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    res.status(201).json({ message: "User logged out successfully" });
  } catch (error) {
    console.error("Error in LogoutUser:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  RegisterUser,
  LoginUser,
  LogoutUser,
};
