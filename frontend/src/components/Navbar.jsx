import { SignedIn, SignedOut, UserButton, SignInButton } from "@clerk/clerk-react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav
      style={{
        padding: "1rem",
        background: "#eef",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      {/* Logo */}
      <h3 style={{ margin: 0 }}>🌾 Farmer’s Marketplace</h3>

      {/* Navigation links */}
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <Link to="/" style={linkStyle}>Home</Link>

        <SignedIn>
          <Link to="/dashboard" style={linkStyle}>Dashboard</Link>
          <Link to="/products" style={linkStyle}>Products</Link>
          <Link to="/add-product" style={linkStyle}>Add Product</Link>
          <Link to="/orders" style={linkStyle}>Orders</Link>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>

        <SignedOut>
          <SignInButton mode="modal">
            <button style={buttonStyle}>Sign In</button>
          </SignInButton>
        </SignedOut>
      </div>
    </nav>
  );
}

// simple link styling
const linkStyle = {
  textDecoration: "none",
  color: "#333",
  fontWeight: "500",
  fontSize: "1rem",
};

// simple button styling
const buttonStyle = {
  backgroundColor: "#4CAF50",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  padding: "0.4rem 0.8rem",
  cursor: "pointer",
};
