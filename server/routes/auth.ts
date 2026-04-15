import { Router } from "express";
import authController from "../controllers/auth";
import { authMiddleware } from "../middleware/authMiddleware";

const authRouter = Router();

authRouter.post("/register", authController.Register);
authRouter.post("/login", authController.Login);
authRouter.get("/me", authMiddleware, authController.Me);

export default authRouter;
