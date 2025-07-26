const express = require("express");
const router = express.Router();
const { getAdminDashboard } = require("../controllers/adminController");
const { protect, authorizeRoles } = require("../middleware/authMiddleware");

router.get("/dashboard", protect, authorizeRoles("admin"), getAdminDashboard);

module.exports = router;
