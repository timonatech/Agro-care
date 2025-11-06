import { SignedIn, SignedOut } from "@clerk/clerk-react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div style={{ textAlign: "center", marginTop: "3rem" }}>
      <h2>Welcome to 🌾 Farmer’s Marketplace</h2>

      <SignedOut>
        <p>Please sign in or sign up to continue.</p>
        <Link to="/sign-in">Sign In</Link> | <Link to="/sign-up">Sign Up</Link>
      </SignedOut>

      <SignedIn>
        <p>You are signed in! Go to your <Link to="/dashboard">Dashboard</Link>.</p>
      </SignedIn>
    </div>
  );
}
