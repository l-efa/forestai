import { Router } from "express";
import organizationController from "../controllers/organization";
import { authMiddleware } from "../middleware/authMiddleware";
import auth from "../controllers/auth";

const organizationRouter = Router();

organizationRouter.post(
  "/",
  authMiddleware,
  organizationController.createOrganization,
);

organizationRouter.get(
  "/",
  authMiddleware,
  organizationController.getOwnedOrganizations,
);

organizationRouter.get(
  "/:id",
  authMiddleware,
  organizationController.getOrganization,
);

export default organizationRouter;
