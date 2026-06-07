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

userRouter.put(
  "/profileColor",
  authMiddleware,
  userController.changeProfileColor,
);

userRouter.get("/userSettings", authMiddleware, userController.getUserSettings);

userRouter.put(
  "/userSettings",
  authMiddleware,
  userController.changeUserSettings,
);

export default userRouter;
