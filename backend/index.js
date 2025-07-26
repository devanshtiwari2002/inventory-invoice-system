const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes");
const salesRoutes = require("./routes/salesRoutes");
const adminRoutes = require("./routes/adminRoutes");
const userRoutes = require("./routes/userRoutes");

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

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

app.listen(process.env.PORT, () => {
  console.log(`server running on port ${process.env.PORT}`);
});
