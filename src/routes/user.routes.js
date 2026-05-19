import { Router } from "express";
import { register } from "../controllers/auth/register.js";
import { upload } from "../middlewares/multer.middlewares.js";
import {login} from "../controllers/auth/login-logout.js"
import {logout} from "../controllers/auth/login-logout.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router()
router.route("/register").post(upload.fields([
    {name : "avatar" , maxCount : 1},{name : "coverImage" , maxCount : 1}
]) ,register)

router.route("/login").post(login)
router.route("/logout").post(verifyJWT,logout)

export default router