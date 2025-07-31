const express = require("express");
const router = express.Router();
const { createSale, getAllSales } = require("../controllers/salesController");
const { protect, authorizeRoles } = require("../middleware/authMiddleware");

// create sales
router.post("/create", protect, authorizeRoles("staff", "admin"), createSale);

// get all sales (admin only)
router.get("/", protect, authorizeRoles("admin"), getAllSales);
module.exports = router;
