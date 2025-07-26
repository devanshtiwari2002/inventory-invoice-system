const mongoose = require("mongoose");
const bcrypt = require("bcryptjs"); // password varification

// user schema desing
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: "staff" },
});

// Before save : hash password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // if already hased skip

  const salt = await bcrypt.genSalt(10); // salting 10 round
  this.password = await bcrypt.hash(this.password, salt); // encrypt password
  next();
});

// method to compare password
// login password will compare to encrypted DB password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
