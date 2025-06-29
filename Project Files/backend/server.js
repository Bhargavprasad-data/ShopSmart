const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/shopsmart', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.once("open", () => {
  console.log("✅ MongoDB Connected");
});

// Middleware
app.use(cors());
app.use(express.json());

// Import routes
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes'); // should contain signup/login logic
const orderRoutes = require('./routes/orderRoutes');
const feedbackRoutes = require('./routes/feedback');


// Mount routes
app.use('/api/products', productRoutes);
app.use('/api', orderRoutes);
app.use('/api', userRoutes); // Handles /signup and /login
app.use('/api/feedback', feedbackRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
