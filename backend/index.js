const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const connectDB = require("./config/db");
const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes");
const salesRoutes = require("./routes/salesRoutes");
const adminRoutes = require("./routes/adminRoutes");
const userRoutes = require("./routes/userRoutes");

const path = require("path");

connectDB();

const app = express();
app.use(cors());
app.use(express.json());

//debugging
console.log("SECRET_KEY from .env", process.env.SECRET_KEY);

//debugging
app.use((req, res, next) => {
  console.log("middleware -req.body", req.body);
  next();
});

//routes

//product route
app.use("/api/products", productRoutes);

// auth Route
app.use("/api/auth", authRoutes);

// sales routes
app.use("/api/sales", salesRoutes);

//admin dashboard
app.use("/api/admin", adminRoutes);

//user routes (admin only)
app.use("/api/users", userRoutes);

//invoice download button
app.use("/invoices", express.static(path.join(__dirname, "invoices")));

app.listen(process.env.PORT, () => {
  console.log(`server running on port ${process.env.PORT}`);
});
