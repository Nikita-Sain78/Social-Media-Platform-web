import express from "express";
import {
  checkAuth,
  getAllUsers,
  login,
  logout,
  signup,
  toggleAccountType,
  updateProfile,
} from "../controllers/auth.controller";
import { protectRoute } from "../middlewares/auth.middleware";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

router.put("/update-profile", protectRoute, updateProfile);

router.get("/check", protectRoute, checkAuth);
router.patch("/toggle-account", protectRoute, toggleAccountType);

export default router;
