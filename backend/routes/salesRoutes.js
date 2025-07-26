const express = require("express");
const router = express.Router();
const { createSale } = require("../controllers/salesController");
const { protect, authorizeRoles } = require("../middleware/authMiddleware");

router.post("/create", protect, authorizeRoles("staff", "admin"), createSale);

module.exports = router;
