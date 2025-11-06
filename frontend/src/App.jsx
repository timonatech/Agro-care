import { Routes, Route } from "react-router-dom";
import { SignIn, SignUp, SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import AddProduct from "./pages/AddProduct";
import Orders from "./pages/Orders";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/sign-in/*" element={<SignIn />} />
        <Route path="/sign-up/*" element={<SignUp />} />

        {/* Protected Routes - Only accessible when signed in */}
        <Route
          path="/dashboard"
          element={
            <SignedIn>
              <Dashboard />
            </SignedIn>
          }
        />

        <Route
          path="/products"
          element={
            <SignedIn>
              <Products />
            </SignedIn>
          }
        />

        <Route
          path="/add-product"
          element={
            <SignedIn>
              <AddProduct />
            </SignedIn>
          }
        />

        <Route
          path="/orders"
          element={
            <SignedIn>
              <Orders />
            </SignedIn>
          }
        />

        {/* Redirect if not logged in */}
        <Route
          path="/private"
          element={
            <SignedOut>
              <RedirectToSignIn />
            </SignedOut>
          }
        />
      </Routes>
    </>
  );
}