const Product = require("../models/Product");

// Get all products
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single product by ID
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Create product (supports file upload or image URL)
const createProduct = async (req, res) => {
  try {
    const { name, description, price, category, quantity } = req.body;

    // Use uploaded file path if exists, otherwise use image URL from body
    const image = req.file ? `/uploads/${req.file.filename}` : req.body.image;

    const product = await Product.create({
      name,
      description,
      price,
      category,
      image,
      quantity,
    });

    res.status(201).json(product);
  } catch (error) {
    console.error("❌ Error creating product:", error);
    res.status(500).json({ message: error.message });
  }
};

// Update product
const updateProduct = async (req, res) => {
  try {
    const updatedData = req.body;

    // Handle image update if a new file is uploaded
    if (req.file) {
      updatedData.image = `/uploads/${req.file.filename}`;
    }

    const product = await Product.findByIdAndUpdate(req.params.id, updatedData, {
      new: true,
    });

    if (!product) return res.status(404).json({ message: "Product not found" });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete product
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
