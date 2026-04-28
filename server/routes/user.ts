import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import userController from "../controllers/user";

const userRouter = Router();

userRouter.get("/search", authMiddleware, userController.findUsers);
userRouter.get(
  "/notifications",
  authMiddleware,
  userController.getUserNotifications,
);

export default userRouter;
