const mongoose = require("mongoose");

const salesSchema = new mongoose.Schema({
  customerName: String,
  customerPhone: String,
  products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      name: String,
      quantity: Number,
      price: Number,
      total: Number,
    },
  ],
  paymentMode: { type: String, enum: ["cash", "upi"] },
  grandTotal: Number,
  staff: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Sale", salesSchema);
