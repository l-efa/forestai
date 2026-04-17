import { Router } from "express";
import authController from "../controllers/auth";
import { authMiddleware } from "../middleware/authMiddleware";
import auth from "../controllers/auth";

const authRouter = Router();

authRouter.post("/register", authController.Register);
authRouter.post("/login", authController.Login);
authRouter.get("/me", authMiddleware, authController.Me);
authRouter.post("/logout", authMiddleware, authController.Logout);

export default authRouter;
