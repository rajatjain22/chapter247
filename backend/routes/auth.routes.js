import express from "express";
import { login, signup, logout, getProfile } from "../controllers/auth.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/login", login);
router.post("/signup", signup);
router.post("/logout", logout);
router.get("/me", authMiddleware, getProfile);

export default router;
