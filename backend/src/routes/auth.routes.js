import { Router } from "express";
import { registerValidation, loginValidation } from "../validators/auth.validation.js";
import { getMe, login, register, verifyEmail } from "../controllers/auth.controller.js";
import { authUser } from "../middleware/auth.middleware.js";

const authRouter = Router();

authRouter.post("/register", registerValidation, register);
authRouter.post("/login", loginValidation, login);
authRouter.get("/get-me", authUser, getMe);
authRouter.get("/verify-email", verifyEmail);

export default authRouter;