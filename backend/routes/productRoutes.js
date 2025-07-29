const express = require("express");
const router = express.Router();
const multer = require("multer");

const {
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  uploadProductsFromCSV,
} = require("../controllers/productController");
const { protect, authorizeRoles } = require("../middleware/authMiddleware");

// configure multer for csv upload
const upload = multer({ dest: "uploads/" });

router.get("/", getProduct); //GET all
router.post("/add", protect, authorizeRoles("staff", "admin"), createProduct); //POST create , only staff and admin can add

// bulk upload from CSV
router.post(
  "/upload",
  protect,
  authorizeRoles("admin", "staff"),
  upload.single("file"),
  uploadProductsFromCSV
);

router.put("/:id", protect, authorizeRoles("admin"), updateProduct); // PUT update
router.delete("/:id", deleteProduct); // DELETE

module.exports = router;
