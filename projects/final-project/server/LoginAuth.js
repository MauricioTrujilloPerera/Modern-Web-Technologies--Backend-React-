import express from "express";
import User from "./models/user.js";
import bcrypt from "bcrypt";

const router = express.Router();

// POST /register
router.post("/register", async (req, res) => {
  const { username, email, password, phone, province } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ message: "Username, email, and password are required." });
  }
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already in use." });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      phone,
      province,
    });
    await newUser.save();
    return res.status(201).json({ message: "User registered successfully!" });
  } catch (err) {
    return res.status(500).json({ message: "Server error.", error: err.message });
  }
});

// POST /login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required." });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password." });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password." });
    }
    // For now, just return user info (not password)
    return res.status(200).json({
      message: "Login successful!",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        phone: user.phone,
        province: user.province,
        profilePic: user.profilePic,
        createdAt: user.createdAt,
      },
    });
  } catch (err) {
    return res.status(500).json({ message: "Server error.", error: err.message });
  }
});

// POST /update-profile
router.post("/update-profile", async (req, res) => {
  const { id, username, email, phone, province, profilePic } = req.body;
  if (!id) {
    return res.status(400).json({ message: "User ID is required." });
  }
  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { username, email, phone, province, profilePic },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found." });
    }
    res.status(200).json({
      message: "Profile updated successfully!",
      user: {
        id: updatedUser._id,
        username: updatedUser.username,
        email: updatedUser.email,
        phone: updatedUser.phone,
        province: updatedUser.province,
        profilePic: updatedUser.profilePic,
        createdAt: updatedUser.createdAt,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Server error.", error: err.message });
  }
});

// POST /change-password
router.post("/change-password", async (req, res) => {
  const { id, currentPassword, newPassword } = req.body;
  if (!id || !currentPassword || !newPassword) {
    return res.status(400).json({ message: "All fields are required." });
  }
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Current password is incorrect." });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();
    res.status(200).json({ message: "Password changed successfully!" });
  } catch (err) {
    res.status(500).json({ message: "Server error.", error: err.message });
  }
});

export default router; 