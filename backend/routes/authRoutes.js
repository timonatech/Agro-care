const express = require("express");
const { requireAuth } = require("@clerk/express");
const { syncUser } = require("../controllers/authController.js");

const router = express.Router();

// Protect the sync route
router.post("/sync", requireAuth(), syncUser);

module.exports = router;
