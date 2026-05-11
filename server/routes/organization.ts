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
  "/all",
  authMiddleware,
  organizationController.getOrganizations,
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

// Invitations

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

// Project routes

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

organizationRouter.get(
  "/:orgId/project/:projectId/teams",
  authMiddleware,
  projectController.getProjectMembers,
);

organizationRouter.post(
  "/:orgId/project/:projectId/teams",
  authMiddleware,
  projectController.setProjectMember,
);

organizationRouter.delete(
  "/:orgId/project/:projectId/teams",
  authMiddleware,
  projectController.removeMember,
);

export default organizationRouter;
