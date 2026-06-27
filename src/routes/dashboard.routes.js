import express from "express";
import { dashboardStats } from "../controllers/dashboard.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();
router.route("/stats").get(verifyJWT, dashboardStats);

export default router;