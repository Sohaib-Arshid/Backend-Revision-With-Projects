import { Router } from "express";
import { registerUser } from "../controllers/auth/register.js";
import { upload } from "../middlewares/multer.middlewares.js";
import {login} from "../controllers/auth/login.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router()
router.route("/register").post(upload.fields([
    {name : "avatar" , maxCount : 1},{name : "coverImage" , maxCount : 1}
]) ,registerUser)

router.route("/login").post(login)
router.route("/logout").post(verifyJWT,logout)

export default router