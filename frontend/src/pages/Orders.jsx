import React, { useEffect, useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import axios from "axios";
import "./Orders.css";

export default function Orders() {
  const { getToken, userId, isLoaded } = useAuth();
  const [orders, setOrders] = useState([]); // Always initialize as array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isLoaded) return; // Wait for Clerk to load
    if (!userId) {
      setLoading(false);
      return;
    }

    const loadOrders = async () => {
      try {
        setLoading(true);
        const token = await getToken();
        
        const response = await axios.get(
          "http://localhost:5000/api/orders/user",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Handle different response formats
        const ordersData = response.data || [];
        setOrders(Array.isArray(ordersData) ? ordersData : []);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setError("Failed to load orders. Please try again later.");
        setOrders([]); // Set empty array on error
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, [userId, isLoaded, getToken]);

  // Loading state
  if (loading) {
    return (
      <div className="orders-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading your orders...</p>
        </div>
      </div>
    );
  }

  // Not logged in
  if (!userId) {
    return (
      <div className="orders-container">
        <div className="empty-state">
          <span className="empty-icon">🔒</span>
          <h3>Please sign in to view your orders</h3>
          <a href="/sign-in" className="sign-in-link">Sign In</a>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="orders-container">
        <div className="error-message">
          <span className="error-icon">⚠️</span>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="orders-container">
      <div className="orders-header">
        <h1>📦 Your Orders</h1>
        <p className="orders-subtitle">Track and manage your orders</p>
      </div>

      {orders.length === 0 ? (
        <div className="empty-state">
          <span className="empty-icon">📦</span>
          <h3>No orders yet</h3>
          <p>Start shopping to see your orders here!</p>
          <a href="/products" className="shop-button">Browse Products</a>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <OrderCard key={order._id} order={order} />
          ))}
        </div>
      )}
    </div>
  );
}

// Simple OrderCard component
function OrderCard({ order }) {
  const statusColors = {
    pending: "#FFA500",
    confirmed: "#4CAF50",
    processing: "#2196F3",
    shipped: "#9C27B0",
    delivered: "#4CAF50",
    cancelled: "#F44336"
  };

  const statusColor = statusColors[order.status] || "#757575";

  return (
    <div className="order-card">
      <div className="order-header">
        <div className="order-id">
          <strong>Order #{order._id.slice(-8)}</strong>
          <span className="order-date">
            {new Date(order.createdAt).toLocaleDateString()}
          </span>
        </div>
        <span 
          className="order-status" 
          style={{ backgroundColor: statusColor }}
        >
          {order.status.toUpperCase()}
        </span>
      </div>

      <div className="order-body">
        <div className="order-product">
          {order.productImage && (
            <img 
              src={order.productImage.startsWith('http') 
                ? order.productImage 
                : `http://localhost:5000${order.productImage}`
              } 
              alt={order.productName}
              className="order-product-image"
            />
          )}
          <div className="order-product-info">
            <h3>{order.productName}</h3>
            <p>Quantity: {order.quantity}</p>
            <p>Price: ${order.price}</p>
          </div>
        </div>

        <div className="order-total">
          <strong>Total: ${order.totalAmount.toFixed(2)}</strong>
        </div>
      </div>
    </div>
  );
}