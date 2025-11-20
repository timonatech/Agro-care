import { SignedIn, SignedOut } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import "./Home.css";

export default function Home() {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="hero-title">Welcome to AgriSoko</h1>
          <p className="hero-subtitle">
            Connecting Farmers and Buyers for a Better Tomorrow
          </p>
          
          <SignedOut>
            <div className="hero-cta">
              <Link to="/sign-up" className="btn btn-primary">Get Started</Link>
              <Link to="/sign-in" className="btn btn-secondary">Sign In</Link>
            </div>
          </SignedOut>

          <SignedIn>
            <div className="hero-cta">
              <Link to="/dashboard" className="btn btn-primary">Go to Dashboard</Link>
              <Link to="/products" className="btn btn-secondary">Browse Products</Link>
            </div>
          </SignedIn>
        </div>
      </section>

      {/* Services Section */}
      <section className="services-section">
        <div className="container">
          <h2 className="section-title">Our Services</h2>
          <p className="section-subtitle">Everything you need for agricultural trade</p>
          
          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon">🌾</div>
              <h3>Fresh Produce</h3>
              <p>Direct access to fresh farm produce from local farmers across Kenya</p>
            </div>

            <div className="service-card">
              <div className="service-icon">🚚</div>
              <h3>Fast Delivery</h3>
              <p>Quick and reliable delivery of your orders right to your doorstep</p>
            </div>

            <div className="service-card">
              <div className="service-icon">💰</div>
              <h3>Fair Prices</h3>
              <p>Best market prices for both farmers and buyers with transparent pricing</p>
            </div>

            <div className="service-card">
              <div className="service-icon">🔒</div>
              <h3>Secure Payments</h3>
              <p>Safe and secure payment options for all your transactions</p>
            </div>

            <div className="service-card">
              <div className="service-icon">📱</div>
              <h3>Easy to Use</h3>
              <p>User-friendly platform accessible on any device, anytime</p>
            </div>

            <div className="service-card">
              <div className="service-icon">🤝</div>
              <h3>Community Support</h3>
              <p>Join a growing community of farmers and buyers helping each other</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works">
        <div className="container">
          <h2 className="section-title">How It Works</h2>
          <div className="steps-grid">
            <div className="step">
              <div className="step-number">1</div>
              <h3>Sign Up</h3>
              <p>Create your account as a farmer or buyer</p>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <h3>Browse Products</h3>
              <p>Explore fresh produce from local farmers</p>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <h3>Place Orders</h3>
              <p>Select products and place your order</p>
            </div>
            <div className="step">
              <div className="step-number">4</div>
              <h3>Get Delivered</h3>
              <p>Receive your fresh produce at your location</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <h2>Ready to Get Started?</h2>
          <p>Join thousands of farmers and buyers on AgriSoko today</p>
          <SignedOut>
            <Link to="/sign-up" className="btn btn-large">Join AgriSoko Now</Link>
          </SignedOut>
          <SignedIn>
            <Link to="/products" className="btn btn-large">Start Shopping</Link>
          </SignedIn>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h3>AgriSoko</h3>
              <p>Empowering farmers and connecting communities through technology.</p>
            </div>

            <div className="footer-section">
              <h4>Quick Links</h4>
              <ul>
                <li><Link to="/products">Products</Link></li>
                <li><Link to="/dashboard">Dashboard</Link></li>
                <li><Link to="/orders">Orders</Link></li>
                <li><Link to="/about">About Us</Link></li>
              </ul>
            </div>

            <div className="footer-section">
              <h4>Connect With Us</h4>
              <div className="social-links">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-link">
                  Facebook
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-link">
                  Twitter
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-link">
                  Instagram
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-link">
                  LinkedIn
                </a>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <p>&copy; 2025 AgriSoko. All rights reserved.</p>
            <p className="developer-credit">
              Developed by <strong>Timona Sifuma</strong>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}