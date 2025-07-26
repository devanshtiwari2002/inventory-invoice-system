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
          throw new Error(`product not found ${item.productId}`);
        }

        const total = product.price * item.quantity;
        grandTotal += total;

        return {
          productId: product._id,
          name: product.name,
          quantity: item.quantity,
          price: product.price,
          total,
        };
      })
    );
    console.log("📦 enrichedProducts", enrichedProducts);

    const sale = await Sale.create({
      customerName,
      customerPhone,
      products: enrichedProducts,
      paymentMode,
      grandTotal,
      staff: req.user._id,
    });

    //debug
    console.log("SALE-OBJECT", JSON.stringify(sale, null, 2));

    await generateInvoice(sale);

    res.status(201).json({
      message: "Sale created successfully",
      sale,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Sale Failed", error: error.message });
  }
};

module.exports = { createSale };
