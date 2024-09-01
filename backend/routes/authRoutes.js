import express  from "express";
import { getUserProfile, loginUser, registerUser } from "../controllers/authController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// User registration
router.post("/register", registerUser);

// User login
router.post("/login", loginUser);

// User profile (protected)
router.get("/profile", protect, getUserProfile);

export default router;