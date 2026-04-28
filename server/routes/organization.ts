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

organizationRouter.get(
  "/:orgId/members",
  authMiddleware,
  organizationController.getOrganizationMembers,
);

organizationRouter.post(
  "/:orgId/invite",
  authMiddleware,
  organizationController.inviteUserToOrg,
);

organizationRouter.delete(
  "/:orgId/members",
  authMiddleware,
  organizationController.deleteUserFromOrg,
);

organizationRouter.post(
  "/invitations/:invitationId/accept",
  authMiddleware,
  organizationController.acceptInvitation,
);

organizationRouter.delete(
  "/invitations/:invitationId/decline",
  authMiddleware,
  organizationController.declineInvitation,
);

export default organizationRouter;
