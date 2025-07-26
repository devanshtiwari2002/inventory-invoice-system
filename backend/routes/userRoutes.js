const express = require("express");
const router = express.Router();

const {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

const { protect, authorizeRoles } = require("../middleware/authMiddleware");

// admin only routes
router.get("/", protect, authorizeRoles("admin"), getAllUsers);
router.post("/create", protect, authorizeRoles("admin"), createUser);
router.put("/:id", protect, authorizeRoles("admin"), updateUser);
router.delete("/:id", protect, authorizeRoles("admin"), deleteUser);

module.exports = router;
