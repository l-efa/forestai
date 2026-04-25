import { Router } from "express";
import organizationController from "../controllers/organization";
import { authMiddleware } from "../middleware/authMiddleware";

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
  "/:orgId",
  authMiddleware,
  organizationController.getOrganization,
);

organizationRouter.delete(
  "/:orgId",
  authMiddleware,
  organizationController.deleteOrganization,
);

export default organizationRouter;
