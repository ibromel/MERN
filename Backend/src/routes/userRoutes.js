import express from "express";
import {
  register,
  login,
  listUsers,
  getMe,
  getUser,
  updateUser,
  deleteUser,
  generatePassword,
} from "../controllers/userController.js";
import { protect } from "../middleware/auth.js";
import { adminCheck } from "../middleware/rolecheck.js";
const router = express.Router();

// Public route for password generation
router.get("/motdepasse/:length", generatePassword);

// User management routes
router.post("/", register);
router.post("/login", login);
router.get("/me", protect, getMe);
router.get("/", protect, adminCheck, listUsers);
router.get("/:id", protect, getUser);
router.put("/:id", protect, updateUser);
router.delete("/:id", protect, deleteUser);

export { router as default };
