const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const User = require('../models/User');
const nodemailer = require('nodemailer');

// Email sending function
const sendOrderConfirmationEmail = async (to, orderDetails) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject: 'Order Confirmation - ShopSmart',
        html: `<h3>Thank you for your order!</h3>
               <p>Total: ₹${orderDetails.total}</p>
               <p>We’ll deliver your items soon. 🛒</p>`
    };

    return transporter.sendMail(mailOptions);
};

// Place Order
router.post('/orders', async (req, res) => {
    try {
        const { items, totalPrice, userId } = req.body;
        console.log("🛒 Order Request:", { userId, items, totalPrice });

        if (!userId || !items || items.length === 0) {
            return res.status(400).json({ message: 'Invalid order data' });
        }

        const order = new Order({ user: userId, items, totalPrice });
        await order.save();

        const user = await User.findById(userId);
        if (user?.email) {
            try {
                await sendOrderConfirmationEmail(user.email, { total: totalPrice, items });
                console.log("✅ Confirmation email sent");
            } catch (emailErr) {
                console.warn("❌ Email send failed:", emailErr.message);
            }
        }

        return res.status(201).json({ message: 'Order placed', order });
    } catch (err) {
        console.error("❌ Order failed:", err);
        return res.status(500).json({ message: `Order failed: ${err.message}` });
    }
});

// Get Orders for a User
router.get('/orders/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        if (!userId) return res.status(400).json({ message: 'Missing userId' });

        const orders = await Order.find({ user: userId }).sort({ createdAt: -1 });
        return res.json(orders);
    } catch (err) {
        console.error("❌ Detailed Order error:", err.stack);
        return res.status(500).json({ message: `Order failed: ${err.message}` });
    }
});

module.exports = router;
