const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
require("dotenv/config");

const JWT_SECRET = process.env.JWT_SECRET;

// Signup
exports.signup = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "Email already in use" });

        const user = new User({ email, password });
        await user.save();
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        next(error);
    }
};

// Login
exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "7d" });
        res.json({ message: "Login successful", token });
    } catch (error) {
        next(error);
    }
};

// Forgot Password
exports.forgotPassword = async (req, res, next) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "User not found" });

        const token = crypto.randomBytes(32).toString("hex");
        user.resetToken = token;
        user.resetTokenExpiry = Date.now() + 3600000; // 1 hour
        await user.save();

        const resetLink = `http://localhost:5000/reset-password/${token}`;
        await sendEmail(email, "Password Reset", `Click here to reset password: ${resetLink}`);

        res.json({ message: "Password reset email sent!" });
    } catch (error) {
        next(error);
    }
};

// Reset Password
exports.resetPassword = async (req, res, next) => {
    try {
        const { token } = req.params;
        const { newPassword } = req.body;

        const user = await User.findOne({ resetToken: token, resetTokenExpiry: { $gt: Date.now() } });
        if (!user) return res.status(400).json({ message: "Invalid or expired token" });

        user.password = await bcrypt.hash(newPassword, 10);
        user.resetToken = undefined;
        user.resetTokenExpiry = undefined;
        await user.save();

        res.json({ message: "Password reset successfully!" });
    } catch (error) {
        next(error);
    }
};
