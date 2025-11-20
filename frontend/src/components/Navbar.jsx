import { SignedIn, SignedOut, UserButton, SignInButton } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import "./Navbar.css";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="navbar-logo" onClick={closeMenu}>
          🌾 AgriSoko
        </Link>

        {/* Hamburger Menu (Mobile) */}
        <button 
          className={`hamburger ${isMenuOpen ? 'active' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Navigation Links */}
        <div className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          <Link to="/" className="nav-link" onClick={closeMenu}>
             Home
          </Link>

          <SignedIn>
            <Link to="/dashboard" className="nav-link" onClick={closeMenu}>
               Dashboard
            </Link>
            <Link to="/products" className="nav-link" onClick={closeMenu}>
               Products
            </Link>
            <Link to="/add-product" className="nav-link" onClick={closeMenu}>
               Add Product
            </Link>
            <Link to="/orders" className="nav-link" onClick={closeMenu}>
               Orders
            </Link>
            
            <div className="user-button-wrapper">
              <UserButton afterSignOutUrl="/" />
            </div>
          </SignedIn>

          <SignedOut>
            <SignInButton mode="modal">
              <button className="sign-in-button">
                 Sign In
              </button>
            </SignInButton>
          </SignedOut>
        </div>
      </div>
    </nav>
  );
}