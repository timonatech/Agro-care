import { useUser, useAuth } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "./Dashboard.css";

export default function Dashboard() {
  const { user, isLoaded } = useUser();
  const { getToken } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    orders: 0,
    products: 0,
    spent: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      if (!user) return;
      
      try {
        const token = await getToken();

        // Fetch user's orders
        const ordersResponse = await axios.get(
          "http://localhost:5000/api/orders/user",
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );

        // Fetch all products count
        const productsResponse = await axios.get(
          "http://localhost:5000/api/products"
        );

        // Calculate stats from orders
        const orders = ordersResponse.data || [];
        const totalOrders = orders.length;
        const totalSpent = orders.reduce((sum, order) => sum + order.totalAmount, 0);
        const productsCount = productsResponse.data?.length || 0;

        setStats({
          orders: totalOrders,
          products: productsCount,
          spent: totalSpent
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
        // Keep stats at 0 if there's an error
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchStats();
    }
  }, [user, getToken]);

  if (!isLoaded || loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <img 
            src={user?.imageUrl || "https://via.placeholder.com/120"} 
            alt={user?.fullName || "User"} 
            className="hero-avatar"
          />
          <div className="hero-text">
            <p className="greeting">🌾 Welcome back to AgriSoko!</p>
            <h1>{user?.fullName || "Farmer"}</h1>
            <p className="user-email">{user?.primaryEmailAddress?.emailAddress}</p>
            <span className="user-badge">🌱 Buyer / Farmer</span>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        <div className="stat-card">
          <span className="stat-icon">📦</span>
          <p className="stat-value">{stats.orders}</p>
          <p className="stat-label">Total Orders</p>
        </div>
        <div className="stat-card">
          <span className="stat-icon">🛒</span>
          <p className="stat-value">{stats.products}</p>
          <p className="stat-label">Products Available</p>
        </div>
        <div className="stat-card">
          <span className="stat-icon">💰</span>
          <p className="stat-value">KSh {stats.spent.toLocaleString()}</p>
          <p className="stat-label">Total Spent</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions">
        <h2>⚡ Quick Actions</h2>
        <div className="actions-grid">
          <button onClick={() => navigate('/products')} className="action-button">
            <span className="action-icon">🌾</span>
            <h3>Browse Products</h3>
            <p>Find fresh produce</p>
          </button>
          <button onClick={() => navigate('/orders')} className="action-button">
            <span className="action-icon">📋</span>
            <h3>My Orders</h3>
            <p>Track your purchases</p>
          </button>
          <button onClick={() => navigate('/products/new')} className="action-button">
            <span className="action-icon">➕</span>
            <h3>Add Product</h3>
            <p>List your produce</p>
          </button>
          <button onClick={() => navigate('/profile')} className="action-button">
            <span className="action-icon">👤</span>
            <h3>My Profile</h3>
            <p>Update your info</p>
          </button>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="recent-activity">
        <h2>📊 Recent Activity</h2>
        <div className="activity-item">
          <span className="activity-icon">✅</span>
          <div className="activity-text">
            <p>Order placed successfully</p>
            <span className="activity-time">2 hours ago</span>
          </div>
        </div>
        <div className="activity-item">
          <span className="activity-icon">🌽</span>
          <div className="activity-text">
            <p>New maize seeds available</p>
            <span className="activity-time">1 day ago</span>
          </div>
        </div>
        <div className="activity-item">
          <span className="activity-icon">🚚</span>
          <div className="activity-text">
            <p>Order #1234 shipped</p>
            <span className="activity-time">3 days ago</span>
          </div>
        </div>
      </div>
    </div>
  );
}