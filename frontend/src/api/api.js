import axios from "axios";

// Create axios instance for backend API
const api = axios.create({
  baseURL: "http://localhost:5000/api", // ✅ your backend URL
});

// Fetch all products
export const fetchProducts = async () => {
  const response = await api.get("/products");
  return response.data;
};

// Add a new product
export const addProduct = async (productData) => {
  const response = await api.post("/products", productData);
  return response.data;
};

// Fetch all orders
export const fetchOrders = async () => {
  const response = await api.get("/orders");
  return response.data;
};

// Add an order
export const addOrder = async (orderData) => {
  const response = await api.post("/orders", orderData);
  return response.data;
};

export default api;
