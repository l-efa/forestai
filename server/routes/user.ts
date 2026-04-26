import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import userController from "../controllers/user";

const userRouter = Router();

userRouter.get("/search", authMiddleware, userController.findUsers);

export default userRouter;
