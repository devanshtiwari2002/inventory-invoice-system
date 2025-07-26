const User = require("../models/userModel");
const bcrypt = require("bcryptjs");

// GET all users (admin only)
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password"); // hide password
    res.status(200).json(users);
  } catch (error) {
    res
      .send(500)
      .json({ message: "failed to fetch users ", error: error.message });
  }
};

// CREATE new user( admin only)
const createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    //check if email already exists
    const existing = await User.findOne({ email });
    if (existing)
      return res.status(400).json({ message: "email already registered" });

    //hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role || "staff",
    });

    res.status(201).json({
      message: "User Created ",
      user: { ...newUser._doc, password: undefined },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create user", error: error.message });
  }
};

// UPDATE user by ID
const updateUser = async (req, res) => {
  try {
    const { name, email, role } = req.body;
    const updateUser = await User.findByIdAndUpdate(
      req.params.id,
      { name, email, role },
      { new: true }
    ).select("-password");

    if (!updateUser) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ message: "User updated", updateUser });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update user", error: error.message });
  }
};

// DELETE user (admin only)
const deleteUser = async (req, res) => {
  try {
    const deleted = await User.findByIdAndDelete(req.params.id);
    if (!deleted) return res.send(404).json({ message: "User not Found" });

    res.status(200).json({ message: "user deleted sucessfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete user ", error: error.message });
  }
};

module.exports = {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
};
