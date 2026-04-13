import { Router } from "express";
import authController from "../controllers/auth";

const authRouter = Router();

authRouter.post("/register", authController.Register);

export default authRouter;
