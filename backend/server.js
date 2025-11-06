const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db.js');
const cors = require('cors');

// Route imports
const authRoutes = require('./routes/authRoutes.js');
const productRoutes = require('./routes/productRoutes.js');
const orderRoutes = require('./routes/orderRoutes.js');

// Load environment variables
dotenv.config();
console.log("✅ Loaded PORT:", process.env.PORT);
console.log("✅ Loaded MONGO_URI:", process.env.MONGO_URI);

// Initialize express app 
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("🌾 Farmer’s Marketplace API is running...");
});

// Start server after DB connection
const startServer = async () => {
  try {
    await connectDB();
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  } catch (err) {
    console.error('Failed to start server due to DB connection error');
  }
};

startServer();

// Export app for testing
module.exports = app;
