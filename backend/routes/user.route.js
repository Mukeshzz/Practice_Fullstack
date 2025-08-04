import { Router } from "express";
import { logged, login, logout, register } from "../controllers/user.controller.js";
import { auth } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/signup").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route('/me').get(auth, logged)

export default router;
