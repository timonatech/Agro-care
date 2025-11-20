import React, { useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./ProductCard.css";

export default function ProductCard({ product }) {
  const { getToken, userId } = useAuth();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleOrder = async () => {
    if (!userId) {
      alert("Please sign in to place an order");
      navigate("/sign-in");
      return;
    }

    setLoading(true);
    try {
      const token = await getToken();

      const orderData = {
        productId: product._id,
        productName: product.name,
        quantity: quantity,
        price: product.price,
        totalAmount: product.price * quantity,
        sellerId: product.createdBy || "unknown_seller", // Fallback for old products
        productImage: product.image,
      };

      // Debug: Log what we're sending
      console.log("📦 Order data:", orderData);
      console.log("🔑 User ID:", userId);

      const response = await axios.post(
        "http://localhost:5000/api/orders",
        orderData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("✅ Order created:", response.data);
      alert("✅ Order placed successfully!");
      navigate("/orders"); // Redirect to orders page
    } catch (error) {
      console.error("❌ Error placing order:", error);
      console.error("Response:", error.response?.data);
      alert("Failed to place order: " + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="product-card">
      <div className="product-image-container">
        {product.image ? (
          <img
            src={`http://localhost:5000${product.image}`}
            alt={product.name}
            className="product-image"
          />
        ) : (
          <div className="product-image-placeholder">
            <span>🌾</span>
          </div>
        )}
      </div>

      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-description">{product.description}</p>
        
        <div className="product-details">
          <span className="product-category">📦 {product.category}</span>
          <span className="product-stock">
            {product.stock > 0 ? `✅ ${product.stock} in stock` : "❌ Out of stock"}
          </span>
        </div>

        <div className="product-price">
          <span className="price-label">Price:</span>
          <span className="price-value">${product.price}</span>
        </div>

        <div className="product-actions">
          <div className="quantity-selector">
            <label htmlFor={`qty-${product._id}`}>Qty:</label>
            <input
              type="number"
              id={`qty-${product._id}`}
              min="1"
              max={product.stock}
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, Math.min(product.stock, parseInt(e.target.value) || 1)))}
              className="quantity-input"
              disabled={product.stock === 0}
            />
          </div>

          <button
            onClick={handleOrder}
            disabled={loading || product.stock === 0}
            className="order-button"
          >
            {loading ? "⏳ Processing..." : "🛒 Order Now"}
          </button>
        </div>

        <div className="product-total">
          Total: <strong>${(product.price * quantity).toFixed(2)}</strong>
        </div>
      </div>
    </div>
  );
}