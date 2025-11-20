import React from "react";

export default function OrderCard({ order }) {
  if (!order) return null; // safety check

  const { product, quantity, totalPrice, status, createdAt, clerkUserId } = order;

  return (
    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: "10px",
        padding: "1rem",
        background: "#fff",
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
        marginBottom: "1rem",
      }}
    >
      <img
        src={product?.image || "https://via.placeholder.com/150"}
        alt={product?.name || "Product"}
        style={{
          width: "100%",
          height: "150px",
          objectFit: "cover",
          borderRadius: "10px",
          marginBottom: "10px",
        }}
      />
      <h3>{product?.name || "Unnamed Product"}</h3>
      <p>Quantity: {quantity ?? 0}</p>
      <p>Total: ${totalPrice?.toFixed(2) ?? 0}</p>
      <p>Status: {status || "Pending"}</p>
      <p>Buyer ID: {clerkUserId || "N/A"}</p>
      <small>Ordered on: {createdAt ? new Date(createdAt).toLocaleDateString() : "N/A"}</small>
    </div>
  );
}
