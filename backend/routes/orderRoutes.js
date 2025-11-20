const express = require("express");
const router = express.Router();
const { requireAuth } = require("@clerk/express");

const {
  createOrder,
  getUserOrders,
  getAllOrders,
  updateOrderStatus,
  deleteOrder
} = require("../controllers/orderController.js");

// Debug: Log when routes are registered
console.log("📋 Registering order routes...");

// Protected routes
router.post("/", requireAuth(), createOrder);
router.get("/user", requireAuth(), getUserOrders);
router.get("/", requireAuth(), getAllOrders);
router.put("/:id", requireAuth(), updateOrderStatus);
router.delete("/:id", requireAuth(), deleteOrder);

console.log("✅ Order routes registered");

module.exports = router;