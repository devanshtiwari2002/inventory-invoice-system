const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

// token genrator
const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.SECRET_KEY, { expiresIn: "7d" });
};

//debugg
console.log("SECRET_KEY in auth=", process.env.SECRET_KEY);

// Register User
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExist = await User.findOne({ email });
    if (userExist)
      return res.status(404).json({ message: "user already exists" });

    const user = await User.create({
      name,
      email,
      password,
      role: req.body.role || "staff",
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id, user.role),
    });
  } catch (error) {
    console.error(" registration error ", error);
    res.status(500).json({
      message: "registration failed",
    });
  }
};

// User Login
const LoginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({
        message: "invalid credentails",
      });
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id, user.role),
    });
  } catch (error) {
    res.status(500).json({ message: "login Failed" });
  }
};

module.exports = { registerUser, LoginUser };
