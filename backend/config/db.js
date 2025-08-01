const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Mongo Db Connected");
  } catch (error){
    console.log("error while connecting DB " + error.message);
    process.exit(1);
  }
};

module.exports = connectDB;