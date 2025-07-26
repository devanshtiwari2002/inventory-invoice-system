const Product = require("../models/productModel");

// Get all products
const getProduct = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};

// Add new product
const createProduct = async (req, res) => {
  try {
    const { name, stock, price, category, description } = req.body;

    const product = new Product({
      name,
      quantity: stock,
      price,
      category,
      description,
    });
    await product.save();

    res.status(201).json(product);
  } catch (error) {
    console.error("Error in createProduct:", error);
    res.status(500).json({ message: "Server Error" });
  }

  console.log("📦 Reached createProduct API");
  console.log("Request body:", req.body);
};

// Update product
const updateProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  product.name = req.body.name || product.name;
  product.quantity = req.body.quantity || product.quantity;
  product.price = req.body.price || product.price;
  product.category = req.body.category || product.category;

  const updated = await product.save();
  res.json(updated);
};

// Delete product
const deleteProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  await product.deleteOne();
  res.json({ message: "Product deleted" });
};

// ✅ Export all
module.exports = {
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
