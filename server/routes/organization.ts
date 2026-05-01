import { Router } from "express";
import organizationController from "../controllers/organization";
import projectController from "../controllers/project";
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

organizationRouter.get(
  "/:orgId/project",
  authMiddleware,
  projectController.getProjects,
);

organizationRouter.post(
  "/:orgId/project",
  authMiddleware,
  projectController.addProject,
);

organizationRouter.get(
  "/:orgId/project/:projectId",
  authMiddleware,
  projectController.getProjectData,
);

organizationRouter.delete(
  "/:orgId/project/:projectId",
  authMiddleware,
  projectController.deleteProject,
);

export default organizationRouter;
