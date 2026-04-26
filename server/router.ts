import { Router } from "express";
import authRouter from "./routes/auth";
import organizationRouter from "./routes/organization";
import userRouter from "./routes/user";

const router = Router();

router.use("/auth", authRouter);
router.use("/organization", organizationRouter);
router.use("/user", userRouter);

export default router;
