import express from "express";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

const router = express.Router();

/**
 * 🟢 Signup / Register
 */
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Create new user (password will be hashed by pre-save hook)
    const user = await User.create({ name, email, password });

    // Generate JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(201).json({
      success: true,
      message: "Signup successful",
      customerId: user.customerId,
      name: user.name,
      email: user.email,
      token,
    });
  } catch (err) {
    console.error("Signup error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * 🟠 Login
 */
router.post("/login", async (req, res) => {
  try {
    const { customerId, password } = req.body;

    if (!customerId || !password) {
      return res
        .status(400)
        .json({ message: "Customer ID and password are required" });
    }

    const user = await User.findOne({
      customerId: customerId.trim().toUpperCase(),
    });
    if (!user) return res.status(400).json({ message: "Invalid Customer ID" });

    const match = await user.matchPassword(password);
    if (!match) return res.status(400).json({ message: "Invalid Password" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      customerId: user.customerId,
      name: user.name,
      email: user.email,
    });
  } catch (err) {
    console.error("Login error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
