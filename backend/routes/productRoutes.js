const express = require("express");
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} = require("../controllers/productController.js");

const router = express.Router();

// GET all products
router.get("/", getAllProducts);

// GET single product by ID
router.get("/:id", getProductById);

// POST create new product
router.post("/", createProduct);

// PUT update product
router.put("/:id", updateProduct);

// DELETE remove product
router.delete("/:id", deleteProduct);

module.exports = router;
