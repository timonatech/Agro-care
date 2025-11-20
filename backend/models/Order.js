const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  // Clerk user ID (string, not ObjectId)
  clerkUserId: { 
    type: String, 
    required: true,
    index: true 
  },
  
  // Single product order
  productId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Product", 
    required: true 
  },
  productName: { 
    type: String, 
    required: true 
  },
  productImage: { 
    type: String 
  },
  
  // Quantity and pricing
  quantity: { 
    type: Number, 
    required: true, 
    min: 1,
    default: 1
  },
  price: { 
    type: Number, 
    required: true,
    min: 0
  },
  totalAmount: { 
    type: Number, 
    required: true,
    min: 0
  },
  
  // Seller info
  sellerId: { 
    type: String, 
    required: true 
  },
  
  // Order status
  status: { 
    type: String, 
    enum: ["pending", "confirmed", "processing", "shipped", "delivered", "cancelled"],
    default: "pending" 
  },
  
  // Optional delivery info
  deliveryAddress: { 
    type: String 
  },
  phone: { 
    type: String 
  },
  notes: { 
    type: String 
  }
}, { 
  timestamps: true // Adds createdAt and updatedAt automatically
});

// Index for faster queries
orderSchema.index({ clerkUserId: 1, createdAt: -1 });
orderSchema.index({ status: 1 });

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;