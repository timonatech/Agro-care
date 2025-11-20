import React, { useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AddProduct.css";

export default function AddProduct() {
  const { getToken } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    quantity: "",
    image: null,
  });
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      const file = files[0];
      setFormData({ ...formData, image: file });
      
      // Create preview
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result);
        };
        reader.readAsDataURL(file);
      } else {
        setPreview(null);
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = await getToken();

      // Build FormData
      const form = new FormData();
      form.append("name", formData.name);
      form.append("price", formData.price);
      form.append("category", formData.category);
      form.append("description", formData.description);
      form.append("quantity", formData.quantity);
      if (formData.image) form.append("image", formData.image);

      const res = await axios.post("http://localhost:5000/api/products", form, {
        headers: { 
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${token}`
        },
      });

      alert("✅ Product added successfully!");
      console.log("Response:", res.data);
      
      // Reset form
      setFormData({
        name: "",
        price: "",
        category: "",
        description: "",
        quantity: "",
        image: null,
      });
      setPreview(null);
      
      // Redirect to products page
      navigate("/products");
    } catch (err) {
      console.error("❌ Error adding product:", err.response?.data || err);
      alert("Failed to add product: " + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-product-page">
      <div className="add-product-container">
        <div className="form-header">
          <h1>Add New Product</h1>
          <p>List your fresh produce on AgriSoko marketplace</p>
        </div>

        <form onSubmit={handleSubmit} className="product-form">
          {/* Image Upload with Preview */}
          <div className="form-group image-upload-section">
            <label htmlFor="image" className="image-upload-label">
              {preview ? (
                <div className="image-preview">
                  <img src={preview} alt="Preview" />
                  <span className="change-image">Click to change image</span>
                </div>
              ) : (
                <div className="image-placeholder">
                  <span className="upload-icon">📷</span>
                  <span>Click to upload product image</span>
                  <span className="upload-hint">PNG, JPG up to 5MB</span>
                </div>
              )}
            </label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleChange}
              style={{ display: "none" }}
            />
          </div>

          {/* Product Name */}
          <div className="form-group">
            <label htmlFor="name">Product Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="e.g., Fresh Tomatoes"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          {/* Price and Quantity Row */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="price">Price (KSh) *</label>
              <input
                type="number"
                id="price"
                name="price"
                placeholder="100"
                value={formData.price}
                onChange={handleChange}
                required
                min="0"
                step="0.01"
              />
            </div>

            <div className="form-group">
              <label htmlFor="quantity">Quantity *</label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                placeholder="50"
                value={formData.quantity}
                onChange={handleChange}
                required
                min="1"
              />
            </div>
          </div>

          {/* Category */}
          <div className="form-group">
            <label htmlFor="category">Category *</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="">Select a category</option>
              <option value="vegetables">Vegetables</option>
              <option value="fruits">Fruits</option>
              <option value="grains">Grains</option>
              <option value="seeds">Seeds</option>
              <option value="dairy">Dairy</option>
              <option value="poultry">Poultry</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Description */}
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              placeholder="Describe your product, quality, origin, etc."
              value={formData.description}
              onChange={handleChange}
              rows="4"
            />
          </div>

          {/* Submit Button */}
          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Adding Product..." : "Add Product"}
          </button>

          <button
            type="button"
            className="cancel-btn"
            onClick={() => navigate("/products")}
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}