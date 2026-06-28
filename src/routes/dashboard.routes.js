import { Router } from "express";  // ✅ Consistent import
import { dashboardStats } from "../controllers/dashboard.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/stats").get(verifyJWT, dashboardStats);

export default router;