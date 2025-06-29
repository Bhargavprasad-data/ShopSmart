const express = require('express');
const router = express.Router();
const User = require('../models/User');
const nodemailer = require('nodemailer');

// Email sending
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'Email not found' });
    }

    const resetLink = `http://localhost:3000/reset-password/${user._id}`; // This can be a token-based system in future

    await transporter.sendMail({
      to: email,
      subject: 'Password Reset - ShopSmart',
      html: `<p>Click the link to reset your password:</p>
             <a href="${resetLink}">${resetLink}</a>`
    });

    res.json({ message: 'Reset link sent to your email.' });
  } catch (err) {
    console.error("❌ Error sending reset mail:", err);
    res.status(500).json({ message: 'Failed to send reset link' });
  }
});

// Signup
router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;
  console.log("📥 Received from frontend:", name, email, password);

  const userExists = await User.findOne({ email });
  if (userExists) {
    console.log("⚠️ User already exists");
    return res.status(400).json({ message: 'User already exists' });
  }

  const user = new User({ name, email, password });
  await user.save();

  console.log("✅ User saved:", user);

  res.status(201).json({ message: 'User registered successfully', user });
});

// Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email, password });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        res.json({ message: 'Login successful', user });
    } catch (err) {
        res.status(500).json({ message: 'Login failed', error: err.message });
    }
});

module.exports = router;
