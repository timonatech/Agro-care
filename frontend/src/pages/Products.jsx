import React, { useEffect, useState } from "react";
import { fetchProducts } from "../api/api";
import ProductCard from "../components/ProductCard";

export default function Products() {
  const [products, setProducts] = useState([]);      // ✅ always start as array
  const [loading, setLoading] = useState(true);      // ✅ track loading
  const [error, setError] = useState(null);          // ✅ track errors

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const res = await fetchProducts();
        // ✅ Some APIs return data in res.data, others directly in res
        setProducts(res.data || res);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  // ✅ Loading state
  if (loading) return <p>Loading products...</p>;

  // ✅ Error state
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Available Products</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
        {products.length === 0 ? (
          <p>No products found.</p>
        ) : (
          products.map((p) => <ProductCard key={p._id} product={p} />)
        )}
      </div>
    </div>
  );
}
