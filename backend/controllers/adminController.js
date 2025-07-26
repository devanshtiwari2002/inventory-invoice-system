const Sale = require("../models/salesModel");
const Product = require("../models/productModel");
const User = require("../models/userModel");
const mongoose = require("mongoose");
const { startOfToday, endOfToday } = require("date-fns");

const getAdminDashboard = async (req, res) => {
  try {
    // todays date range
    const today = new Date();
    const todayStart = startOfToday();
    const todayEnd = endOfToday();

    // todays total sales
    const todaySales = await Sale.aggregate([
      {
        $match: {
          date: {
            $gte: todayStart,
            $lte: todayEnd,
          },
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$grandTotal" },
          count: { $sum: 1 },
        },
      },
    ]);

    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6); // including today

    const weeklySales = await Sale.aggregate([
      {
        $match: {
          date: {
            $gte: sevenDaysAgo,
          },
        },
      },
      {
        // group by date in yyyy-mm-dd format
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$date" },
          },
          total: { $sum: "$grandTotal" },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    // staff wise sales performance
    const staffPerformance = await Sale.aggregate([
      {
        $group: {
          _id: "$staff", // group by staff ID
          totalSales: { $sum: "$grandTotal" },
          count: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: "users", // join with users collection
          localField: "_id",
          foreignField: "_id",
          as: "staffInfo",
        },
      },
      { $unwind: "$staffInfo" },
      {
        $project: {
          name: "$staffInfo.name",
          email: "$staffInfo.email",
          totalSales: 1,
          count: 1,
        },
      },
    ]);

    //stock info
    const stock = await Product.find({}, "name quantity");

    // final sashboard response
    res.status(200).json({
      todaySales: todaySales[0] || { total: 0, count: 0 },
      weeklySales,
      staffPerformance,
      stock,
    });
  } catch (error) {
    console.log("Dashboard error", error.message);
    res.status(500).json({
      message: "Failed to load Dashboard",
      error: error.message,
    });
  }
};

module.exports = { getAdminDashboard };
