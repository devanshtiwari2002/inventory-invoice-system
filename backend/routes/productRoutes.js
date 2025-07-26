const express = require("express");
const router = express.Router();

const {
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");
const { protect, authorizeRoles } = require("../middleware/authMiddleware");

router.get("/", getProduct); //GET all
router.post("/add", protect, authorizeRoles("staff", "admin"), createProduct); //POST create , only staff and admin can add
router.put("/:id", updateProduct); // PUT update
router.delete("/:id", deleteProduct); // DELETE

module.exports = router;
