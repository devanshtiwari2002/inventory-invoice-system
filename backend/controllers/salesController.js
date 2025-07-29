const Sale = require("../models/salesModel");
const Product = require("../models/productModel");
const generateInvoice = require("../utils/generateInvoice");

const createSale = async (req, res) => {
  try {
    const { customerName, customerPhone, products, paymentMode } = req.body;

    let grandTotal = 0;

    const enrichedProducts = await Promise.all(
      products.map(async (item) => {
        const product = await Product.findById(item.productId);
        if (!product) {
          throw new Error(`Product not found: ${item.productId}`);
        }

        if (product.stock < item.quantity) {
          throw new Error(`Insufficient stock for ${product.name}`);
        }

        // ✅ Reduce stock
        // product.stock -= item.quantity;
        if (typeof product.stock !== "number") {
          throw new Error(`Invalid stock value for product ${product.name}`);
        }

        product.stock = product.stock - item.quantity;
        await product.save();

        const total = product.sellingPrice * item.quantity;
        grandTotal += total;

        return {
          productId: product._id,
          name: product.name,
          quantity: item.quantity,
          sellingPrice: product.sellingPrice,
          total,
        };
      })
    );

    const sale = await Sale.create({
      customerName,
      customerPhone,
      products: enrichedProducts,
      paymentMode,
      grandTotal,
      staff: req.user._id,
    });

    await generateInvoice(sale);

    res.status(201).json({
      message: "Sale created successfully",
      sale,
      invoiceUrl: `/invoices/invoice-${sale._id}.pdf`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Sale Failed", error: error.message });
  }
};

module.exports = { createSale };
