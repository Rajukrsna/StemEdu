const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const dotenv = require("dotenv");
dotenv.config();
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware"); // ✅ Import the middleware

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  console.log(name, email, password);
  try {
    const user = new User({ name, email, password });
    await user.save();
    res.status(201).json({ message: "User registered" });
  } catch (err) {
    res.status(400).json({ message: "Error registering user" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email});
  //console.log(user)
  if (!user || !(await bcrypt.compare(password, user.password)))
    return res.status(401).json({ message: "Invalid credentials" });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7h" });
  //console.log(token)
  res.json({ token, userId: user._id, name: user.name }); // Send user ID along with token
});

router.get("/me", verifyToken, async (req, res) => {
  try {
    //  Use `req.user.id` (fixed from `req.userId`)
    const user = await User.findById(req.user.id).select("-password"); 
    //console.log(user)// Exclude password from response
    if (!user) return res.status(404).json({ error: "User not found" });

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});


module.exports = router;
