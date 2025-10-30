import User from "../models/userModel.js";
import bcrypt from 'bcryptjs';
import { sendVerificationCode } from "../middlewares/emailService.js";
import jwt from 'jsonwebtoken';
import 'dotenv/config';

// Registration
export const userRegister = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) 
      return res.status(400).json({ message: "All fields are required" });

    const existingUser = await User.findOne({ email });
    if (existingUser) 
      return res.status(409).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      verificationcode: verificationCode
    });

    await sendVerificationCode(newUser.email, verificationCode);

    return res.status(201).json({
      success: true,
      message: "User registered. Verification code sent to email.",
      user: { id: newUser._id, name: newUser.name, email: newUser.email }
    });
  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Email Verification
export const verifyEmail = async (req, res) => {
  try {
    const { code } = req.body;
    if (!code) return res.status(400).json({ success: false, message: "Verification code is required" });

    const user = await User.findOne({ verificationcode: code.trim() });
    if (!user) return res.status(400).json({ success: false, message: "Invalid or expired verification code" });
    if (user.isVerified) return res.status(400).json({ success: false, message: "Email already verified" });

    user.isVerified = true;
    user.verificationcode = undefined;
    await user.save();

    return res.status(200).json({ success: true, message: "Email verified successfully" });
  } catch (error) {
    console.error("Email verification error:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};



export const userLogout = async (req, res) => {
  try {
    // Since JWT is stateless, we just inform the client to remove the token.
    return res.status(200).json({ success: true, message: "Logout successful" });
  } catch (error) {
    console.error("Logout error:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Login
export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: "All fields are required" });

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    if (!user.isVerified) return res.status(403).json({ message: "Email not verified", requiresVerification: true });

    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "3d" });

    return res.status(200).json({ message: "Login successful", token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

