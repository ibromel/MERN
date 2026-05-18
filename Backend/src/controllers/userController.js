import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// POST /api/users
export const register = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    if (await User.findOne({ email }))
      return res.status(400).json({ message: "Email already exists" });
    const user = new User({ name, email, password, role });
    await user.save();
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(201).json({ token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// POST /api/users/login
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Invalid credentials" });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/users
export const listUsers = async (req, res) => {
  const users = await User.find().select("_id name email role creatAt updatedAt");
  res.json(users);
};

// GET /api/users/me
export const getMe = async (req, res) => {
  // req.user est fourni par le middleware protect
  res.json({
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email,
    role: req.user.role,
    creatAt: req.user.creatAt,
    updatedAt: req.user.updatedAt,
  });
};

// GET /api/users/:id
export const getUser = async (req, res) => {
  const user = await User.findById(req.params.id).select(
    "_id name email role creatAt updatedAt"
  );
  if (!user) return res.status(404).json({ message: "Not found" });
  res.json(user);
};

// PUT /api/users/:id
export const updateUser = async (req, res) => {
  const { name, email, role, password } = req.body;
  try {
    let updateData = { name, email, role, updatedAt: Date.now() };
    if (password) {
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(password, salt);
    }
    const user = await User.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    }).select("_id name email role creatAt updatedAt");
    if (!user) return res.status(404).json({ message: "Not found" });
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE /api/users/:id
export const deleteUser = async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id).select(
    "_id name email role"
  );
  if (!user) return res.status(404).json({ message: "Not found" });
  res.json({ message: "Deleted", user });
};


// GET /api/users/motdepasse/:length
export const generatePassword = (req, res) => {
  const length = parseInt(req.params.length, 10);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let password = "";
  for (let i = 0; i < length; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  res.json({ password });
};