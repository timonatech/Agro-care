const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { requireAuth } = require("@clerk/express"); // Fixed import

const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController.js");

const router = express.Router();

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) cb(null, true);
    else cb(new Error("Only images allowed"), false);
  },
});

// Public routes
router.get("/", getAllProducts);
router.get("/:id", getProductById);

// Protected routes - Fixed to use requireAuth()
router.post("/", requireAuth(), upload.single("image"), createProduct);
router.put("/:id", requireAuth(), upload.single("image"), updateProduct);
router.delete("/:id", requireAuth(), deleteProduct);

module.exports = router;