import { Router } from "express";
import authRouter from "./routes/auth";
import organizationRouter from "./routes/organization";

const router = Router();

router.use("/auth", authRouter);
router.use("/organization", organizationRouter);

export default router;
