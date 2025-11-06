import React, { useState } from "react";
import axios from "axios";

export default function AddProduct() {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    image: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/products", formData);
      alert("✅ Product added successfully!");
      setFormData({ name: "", price: "", category: "", description: "", image: "" });
      console.log(res.data);
    } catch (err) {
      console.error("Error adding product:", err);
      alert("❌ Failed to add product. Check console for details.");
    }
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "600px", margin: "auto" }}>
      <h2>➕ Add New Product</h2>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          marginTop: "1rem",
        }}
      >
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Product Description"
          value={formData.description}
          onChange={handleChange}
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleChange}
        />
        <input
        type="number"
        name="quantity"
        placeholder="Enter quantity"
        value={formData.quantity}
        onChange={handleChange}
        />

        <button
          type="submit"
          style={{
            background: "#4CAF50",
            color: "white",
            border: "none",
            padding: "0.8rem",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Add Product
        </button>
      </form>
    </div>
  );
}
