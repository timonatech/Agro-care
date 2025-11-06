import React from "react";

export default function ProductCard({ product }) {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "1rem",
        borderRadius: "8px",
        width: "200px",
      }}
    >
      <h3>{product.name}</h3>
      <p>Price: KSh {product.price}</p>
      <p>{product.description}</p>
    </div>
  );
}
