// const Sale = require("../models/salesModel");
// const Product = require("../models/productModel");
// const generateInvoice = require("../utils/generateInvoice");

// const createSale = async (req, res) => {
//   try {
//     const { customerName, customerPhone, products, paymentMode } = req.body;

//     let grandTotal = 0;

//     const enrichedProducts = await Promise.all(
//       products.map(async (item) => {
//         const product = await Product.findById(item.productId);
//         if (!product) {
//           throw new Error(`Product not found: ${item.productId}`);
//         }

//         if (product.stock < item.quantity) {
//           throw new Error(`Insufficient stock for ${product.name}`);
//         }

//         // ✅ Reduce stock
//         // product.stock -= item.quantity;
//         if (typeof product.stock !== "number") {
//           throw new Error(`Invalid stock value for product ${product.name}`);
//         }

//         product.stock = product.stock - item.quantity;
//         await product.save();

//         const total = product.sellingPrice * item.quantity;
//         grandTotal += total;

//         return {
//           productId: product._id,
//           name: product.name,
//           quantity: item.quantity,
//           sellingPrice: product.sellingPrice,
//           total,
//         };
//       })
//     );

//     const sale = await Sale.create({
//       customerName,
//       customerPhone,
//       products: enrichedProducts,
//       paymentMode,
//       grandTotal,
//       staff: req.user._id,
//     });

//     await generateInvoice(sale);

//     res.status(201).json({
//       message: "Sale created successfully",
//       sale,
//       invoiceUrl: `/invoices/invoice-${sale._id}.pdf`,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Sale Failed", error: error.message });
//   }
// };

// module.exports = { createSale };

// --------------------------------
const Sale = require("../models/salesModel");
const Product = require("../models/productModel");
const generateInvoice = require("../utils/generateInvoice");

const createSale = async (req, res) => {
  try {
    const { customerName, customerPhone, products, paymentMode } = req.body;

    if (!Array.isArray(products) || products.length === 0) {
      return res
        .status(400)
        .json({ message: "Products array is empty or invalid" });
    }

    let grandTotal = 0;

    const enrichedProducts = await Promise.all(
      products.map(async (item) => {
        const product = await Product.findById(item.productId);
        if (!product) {
          throw new Error(`Product not found: ${item.productId}`);
        }

        const stockInDB = product.quantity; // ✅ use correct field
        const requestedQty = item.quantity;

        // Log for debugging
        console.log("🛒 Selling:", {
          productId: product._id,
          name: product.name,
          stockInDB,
          requestedQty,
        });

        if (typeof stockInDB !== "number") {
          throw new Error(`Invalid stock value for product ${product.name}`);
        }

        if (
          typeof requestedQty !== "number" ||
          requestedQty <= 0 ||
          isNaN(requestedQty)
        ) {
          throw new Error(`Invalid quantity for product ${product.name}`);
        }

        if (stockInDB < requestedQty) {
          throw new Error(
            `Insufficient stock for ${product.name}. Available: ${stockInDB}, Requested: ${requestedQty}`
          );
        }

        // ✅ Update stock
        product.quantity = stockInDB - requestedQty;
        await product.save();

        const total = product.sellingPrice * requestedQty;
        grandTotal += total;

        return {
          productId: product._id,
          name: product.name,
          quantity: requestedQty,
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
      message: "✅ Sale created successfully",
      sale,
      invoiceUrl: `/invoices/invoice-${sale._id}.pdf`,
    });
  } catch (error) {
    console.error("❌ Sale Error:", error.message);
    res.status(500).json({ message: "❌ Sale Failed", error: error.message });
  }

  console.log("📦 Creating Sale with:", {
    customerName,
    customerPhone,
    enrichedProducts,
    paymentMode,
    grandTotal,
    staffId: req.user?._id,
  });
};

// Get All Sales (admin)
const getAllSales = async (req, res) => {
  try {
    const sales = await Sale.find()
      .populate("staff", "name email")
      .sort({ date: -1 });

    res.status(200).json(sales);
  } catch (error) {
    console.error("Error fetching sales:", error);
    res.status(500).json({ message: "Failed to fetch sales" });
  }
};

module.exports = { getAllSales, createSale };
