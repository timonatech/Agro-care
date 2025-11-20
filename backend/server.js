const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db.js');
const cors = require('cors');
const path = require('path');
const { requireAuth, clerkMiddleware } = require('@clerk/express'); // Fixed import
const { clerkClient } = require('@clerk/clerk-sdk-node'); // Fixed import

dotenv.config();

// Add these debug lines
console.log("🔑 CLERK_PUBLISHABLE_KEY:", process.env.CLERK_PUBLISHABLE_KEY ? "✅ Found" : "❌ Missing");
console.log("🔑 CLERK_SECRET_KEY:", process.env.CLERK_SECRET_KEY ? "✅ Found" : "❌ Missing");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Clerk global middleware - FIXED
app.use(clerkMiddleware());

// Connect to DB
connectDB();

// Routes
const authRoutes = require('./routes/authRoutes.js');
const productRoutes = require('./routes/productRoutes.js');
const orderRoutes = require('./routes/orderRoutes.js');

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

// Test protected route
app.get("/api/auth/verify", requireAuth(), (req, res) => {
  res.json({
    message: "🔐 Clerk authentication successful!",
    userId: req.auth.userId,
  });
});

// Get full Clerk user details - FIXED
app.get("/api/auth/profile", requireAuth(), async (req, res) => {
  try {
    const user = await clerkClient.users.getUser(req.auth.userId);
    res.json({
      id: user.id,
      name: `${user.firstName} ${user.lastName}`,
      email: user.emailAddresses[0]?.emailAddress,
      image: user.imageUrl,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/", (req, res) => {
  res.send("🌾 Farmer's Marketplace API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

module.exports = app;