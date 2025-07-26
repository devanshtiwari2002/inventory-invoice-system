const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");
const salesModel = require("../models/salesModel");

const generateInvoice = async (sale) => {
  const doc = new PDFDocument();
  const invoicePath = path.join(
    __dirname,
    `../invoices/inoice-${sale._id}.pdf`
  );
  const writeStream = fs.createWriteStream(invoicePath);
  doc.pipe(writeStream);

  // Heading
  doc.fontSize(20).text("INVOICE", { align: "center" }).moveDown();

  // Customer Info
  doc
    .fontSize(12)
    .text(`Customer: ${sale.customerName}`)
    .text(`Phone: ${sale.customerPhone}`)
    .text(`Date: ${new Date(sale.date).toLocaleString()}`)
    .moveDown();

  // Product Table Headers
  doc
    .font("Helvetica-Bold")
    .text("Name", 50)
    .text("Price", 250)
    .text("Qty", 350)
    .text("Total", 450);
  doc
    .moveTo(50, doc.y + 5)
    .lineTo(550, doc.y + 5)
    .stroke();
  doc.moveDown();

  // Product Table Rows
  doc.font("Helvetica");
  sale.products.forEach((p) => {
    doc
      .text(p.name, 50)
      .text(`₹${p.price}`, 250)
      .text(`${p.quantity}`, 350)
      .text(`₹${p.total}`, 450);
  });

  doc.moveDown();
  doc
    .moveTo(50, doc.y + 5)
    .lineTo(550, doc.y + 5)
    .stroke();

  // Footer
  doc
    .moveDown()
    .font("Helvetica-Bold")
    .text(`Payment Mode: ${sale.paymentMode}`, { align: "left" })
    .text(`Grand Total: ₹${sale.grandTotal}`, { align: "left" });

  doc.end();

  return new Promise((resolve, reject) => {
    writeStream.on("finish", () => {
      console.log("invoice generated");
      resolve();
    });
    writeStream.on("error", (err) => {
      reject(err);
    });
  });
};

module.exports = generateInvoice;
