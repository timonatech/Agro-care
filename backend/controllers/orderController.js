const Order = require("../models/order.js");

// Create order
const createOrder = async (req, res) => {
  try {
    const clerkUserId = req.auth.userId;
    
    // Debug logging
    console.log("📥 Received order request:");
    console.log("  - clerkUserId:", clerkUserId);
    console.log("  - req.body:", req.body);
    
    // Validate required fields
    const { productId, productName, quantity, price, totalAmount, sellerId } = req.body;
    
    if (!productId || !productName || !quantity || !price || !totalAmount || !sellerId) {
      console.log("❌ Missing fields:", {
        productId: !!productId,
        productName: !!productName,
        quantity: !!quantity,
        price: !!price,
        totalAmount: !!totalAmount,
        sellerId: !!sellerId
      });
      return res.status(400).json({ 
        message: "Missing required fields",
        required: ["productId", "productName", "quantity", "price", "totalAmount", "sellerId"],
        received: req.body
      });
    }

    // Create order with clerkUserId from auth
    const order = await Order.create({ 
      clerkUserId, // From authentication
      productId,
      productName,
      productImage: req.body.productImage,
      quantity,
      price,
      totalAmount,
      sellerId,
      deliveryAddress: req.body.deliveryAddress,
      phone: req.body.phone,
      notes: req.body.notes,
      status: "pending"
    });
    
    res.status(201).json(order);
  } catch (error) {
    console.error("Create order error:", error);
    res.status(500).json({ message: error.message });
  }
};

// Get logged-in user's orders
const getUserOrders = async (req, res) => {
  console.log("🎯 getUserOrders called");
  console.log("  - req.auth:", req.auth);
  console.log("  - userId:", req.auth?.userId);
  
  try {
    const clerkUserId = req.auth.userId;
    
    if (!clerkUserId) {
      return res.status(401).json({ message: "User not authenticated" });
    }
    
    console.log("  - Fetching orders for user:", clerkUserId);
    const orders = await Order.find({ clerkUserId })
      .populate('productId')
      .sort({ createdAt: -1 });
    
    console.log("  - Found orders:", orders.length);
    res.json(orders);
  } catch (error) {
    console.error("Get user orders error:", error);
    res.status(500).json({ message: error.message });
  }
};

// Get all orders (admin)
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('productId')
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    console.error("Get all orders error:", error);
    res.status(500).json({ message: error.message });
  }
};

// Update order status
const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id, 
      { status: req.body.status }, 
      { new: true, runValidators: true }
    );
    
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    
    res.json(order);
  } catch (error) {
    console.error("Update order error:", error);
    res.status(500).json({ message: error.message });
  }
};

// Delete order
const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    
    res.json({ message: "Order deleted successfully" });
  } catch (error) {
    console.error("Delete order error:", error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = { 
  createOrder, 
  getUserOrders, 
  getAllOrders, 
  updateOrderStatus, 
  deleteOrder 
};