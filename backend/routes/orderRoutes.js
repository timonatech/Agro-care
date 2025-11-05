const express = require("express");
const {
  createOrder,
  getUserOrders,
  getAllOrders,
  updateOrderStatus,
  deleteOrder
} = require("../controllers/orderController.js");

const router = express.Router();

// POST create new order
router.post("/", createOrder);

// GET all orders (admin)
router.get("/", getAllOrders);

// GET orders for a specific user
router.get("/user/:userId", getUserOrders);

// PUT update order status
router.put("/:id", updateOrderStatus);

// DELETE cancel or remove an order
router.delete("/:id", deleteOrder);

module.exports = router;
