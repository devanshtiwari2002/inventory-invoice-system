const Product = require("../models/productModel");

const csv = require("csv-parser");
const fs = require("fs");

// Get all products
const getProduct = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};

// CREATE single Product
const createProduct = async (req, res) => {
  try {
    const { name, stock, costPrice, sellingPrice, category, description } =
      req.body;

    const sku = `SKU-${Date.now()}`;

    const product = new Product({
      sku,
      name,
      quantity: stock,
      costPrice,
      sellingPrice,
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

//  BULK upload products from CSV

const uploadProductsFromCSV = async (req, res) => {
  const filePath = req.file.path;
  const products = [];

  // debugg
  console.log("📥 File received:", req.file);

  fs.createReadStream(filePath)
    .pipe(csv())
    .on("data", (row) => {
      const {
        sku,
        name,
        costPrice,
        sellingPrice,
        stock,
        category,
        description,
      } = row;

      products.push({
        sku: sku || `sku-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        name,
        costPrice,
        sellingPrice,
        quantity: stock,
        category,
        description,
      });
    })
    .on("end", async () => {
      try {
        await Product.insertMany(products);
        fs.unlinkSync(filePath); // delete the file after use
        res.status(200).json({ message: "Products uploaded sucessfully" });
      } catch (error) {
        console.error("Bulk insert error :", error);
        res.status(500).json({ message: "Error uploading products" });
      }
    });
};

// Update product
const updateProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  product.name = req.body.name || product.name;
  product.quantity = req.body.quantity || product.quantity;
  product.costPrice = req.body.costPrice || product.costPrice;
  product.sellingPrice = req.body.sellingPrice || product.sellingPrice;
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
  uploadProductsFromCSV,
};
