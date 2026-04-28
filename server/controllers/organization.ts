import type { Request, Response } from "express";

import { prisma } from "../lib/prisma";

const createOrganization = async (request: Request, response: Response) => {
  const { name } = request.body;

  if (!name) {
    return response
      .status(400)
      .json({ message: "Organization name is required" });
  }

  try {
    await prisma.organization.create({
      data: {
        name,
        ownerId: request.user!.id,
        members: {
          create: {
            userId: request.user!.id,
            role: "admin",
          },
        },
      },
    });
    return response.status(201).json({ message: "Organization created" });
  } catch (error) {
    console.error(error);
    return response.status(500).json({ message: "Something went wrong" });
  }
};

const getOwnedOrganizations = async (request: Request, response: Response) => {
  const id = request.user?.id;

  try {
    const organizations = await prisma.organization.findMany({
      where: {
        ownerId: id,
      },
      include: {
        _count: {
          select: {
            members: true,
            projects: true,
          },
        },
      },
    });

    return response.status(200).json(organizations);
  } catch (error) {
    console.error(error);
    return response.status(500).json({ message: "Something went wrong" });
  }
};

const getOrganization = async (request: Request, response: Response) => {
  const orgId = request.params.orgId as string;
  const userId = request.user?.id as string;

  if (!orgId || !userId)
    return response.status(400).json({ message: "Id not found" });

  try {
    const isMember = await prisma.organizationMember.findUnique({
      where: {
        userId_organizationId: {
          userId: userId,
          organizationId: orgId,
        },
      },
    });

    if (!isMember) return response.status(403).json({ message: "Forbidden" });

    const organization = await prisma.organization.findUnique({
      where: { id: orgId },
      include: {
        _count: {
          select: {
            members: true,
            projects: true,
          },
        },
      },
    });

    if (!organization) {
      return response.status(404).json({ message: "Organization not found" });
    }

    return response.status(200).json(organization);
  } catch (error) {
    console.error(error);
    return response.status(500).json({ message: "Something went wrong" });
  }
};

const deleteOrganization = async (request: Request, response: Response) => {
  const orgId = request.params.orgId as string;
  const userId = request.user?.id as string;

  if (!orgId) return response.status(400).json({ message: "invalid id" });

  try {
    const org = await prisma.organization.findUnique({ where: { id: orgId } });

    if (!org)
      return response.status(404).json({ message: "Organization not found" });
    if (org.ownerId !== userId)
      return response
        .status(403)
        .json({ message: "Only the owner can delete this organization" });

    await prisma.$transaction([
      prisma.invitation.deleteMany({ where: { organizationId: orgId } }),
      prisma.projectMember.deleteMany({
        where: { project: { organizationId: orgId } },
      }),
      prisma.project.deleteMany({ where: { organizationId: orgId } }),
      prisma.organizationMember.deleteMany({
        where: { organizationId: orgId },
      }),
      prisma.organization.delete({ where: { id: orgId } }),
    ]);

    return response.status(200).json({ message: "Organization deleted" });
  } catch (error) {
    console.error(error);
    return response.status(500).json({ message: "Something went wrong" });
  }
};

const getOrganizationMembers = async (request: Request, response: Response) => {
  const orgId = request.params.orgId as string;
  const userId = request.user?.id as string;

  try {
    const isUserInOrg = await prisma.organizationMember.findFirst({
      where: {
        userId: userId,
        organizationId: orgId,
      },
    });

    if (!isUserInOrg) {
      return response.status(403).json({ message: "Forbidden" });
    }
    const members = await prisma.organizationMember.findMany({
      where: { organizationId: orgId },
      select: {
        userId: true,
        role: true,
        createdAt: true,
        user: {
          select: {
            username: true,
            email: true,
            profileColor: true,
          },
        },
      },
    });

    return response.status(200).json(members);
  } catch (error) {
    console.error(error);
    return response.status(500).json({ message: "Something went wrong" });
  }
};

const inviteUserToOrg = async (request: Request, response: Response) => {
  const { userId } = request.body;
  const orgId = request.params.orgId as string;
  const by = request.user?.id as string;

  if (!userId) return response.status(400).json({ message: "Invalid id" });

  try {
    const inviter = await prisma.organizationMember.findUnique({
      where: {
        userId_organizationId: {
          userId: by,
          organizationId: orgId,
        },
      },
    });

    if (!inviter || inviter.role !== "admin") {
      return response
        .status(403)
        .json({ message: "Only admins can invite members" });
    }

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) return response.status(400).json({ message: "User not found" });

    const userInOrg = await prisma.organizationMember.findUnique({
      where: {
        userId_organizationId: {
          userId: userId,
          organizationId: orgId,
        },
      },
    });

    if (userInOrg)
      return response
        .status(409)
        .json({ message: "User already in organization" });

    const existingInvite = await prisma.invitation.findFirst({
      where: {
        invitedUserId: userId,
        organizationId: orgId,
      },
    });

    if (existingInvite) {
      return response.status(409).json({ message: "Invitation already sent" });
    }

    await prisma.invitation.create({
      data: {
        organizationId: orgId,
        invitedById: by,
        invitedUserId: userId,
      },
    });

    return response.status(201).json({ message: "Invitation sent" });
  } catch (error) {
    console.error(error);
    return response.status(500).json({ message: "Something went wrong" });
  }
};

const deleteUserFromOrg = async (request: Request, response: Response) => {
  const { userId } = request.body;
  const by = request.user?.id as string;
  const orgId = request.params.orgId as string;

  if (!userId) return response.status(400).json({ message: "Invalid id" });

  try {
    const inviter = await prisma.organizationMember.findUnique({
      where: {
        userId_organizationId: {
          userId: by,
          organizationId: orgId,
        },
      },
    });

    if (!inviter || inviter.role !== "admin") {
      return response
        .status(403)
        .json({ message: "Only admins can delete members" });
    }

    const org = await prisma.organization.findUnique({
      where: {
        id: orgId,
      },
    });

    if (org?.ownerId === userId) {
      return response
        .status(403)
        .json({ message: "Cannot remove the organization owner" });
    }

    const isUserInOrg = await prisma.organizationMember.findFirst({
      where: {
        userId: userId,
        organizationId: orgId,
      },
    });

    if (!isUserInOrg) {
      return response.status(404).json({ message: "Unable to remove user" });
    }

    await prisma.organizationMember.delete({
      where: {
        userId_organizationId: {
          userId: userId,
          organizationId: orgId,
        },
      },
    });

    return response
      .status(200)
      .json({ message: "User deleted from organization" });
  } catch (error) {
    console.error(error);
    return response.status(500).json({ message: "Something went wrong" });
  }
};

const acceptInvitation = async (request: Request, response: Response) => {
  const userId = request.user?.id as string;
  const invitationId = request.params.invitationId as string;

  if (!invitationId) {
    return response.status(400).json({ message: "Invalid invitation" });
  }

  try {
    const invitation = await prisma.invitation.findUnique({
      where: {
        id: invitationId,
      },
    });

    if (!invitation || invitation.invitedUserId !== userId) {
      return response.status(400).json({ message: "Invitation is expired" });
    }

    await prisma.organizationMember.create({
      data: {
        userId: userId,
        organizationId: invitation.organizationId,
      },
    });

    await prisma.invitation.delete({
      where: {
        id: invitationId,
      },
    });

    return response.status(200).json({ message: "Invitation accepted" });
  } catch (error) {
    return response.status(500).json({ message: "Something went wrong" });
  }
};

const declineInvitation = async (request: Request, response: Response) => {
  const invitationId = request.params.invitationId as string;
  const userId = request.user?.id as string;

  if (!invitationId) {
    return response.status(400).json({ message: "Invalid invitation" });
  }

  try {
    const invitation = await prisma.invitation.findUnique({
      where: {
        id: invitationId,
      },
    });

    if (!invitation || invitation.invitedUserId !== userId) {
      return response.status(400).json({ message: "Invitation not found" });
    }

    await prisma.invitation.delete({
      where: {
        id: invitationId,
      },
    });

    return response.status(200).json({ message: "Invitation declined" });
  } catch (error) {
    return response.status(500).json({ message: "Something went wrong" });
  }
};

export default {
  createOrganization,
  getOwnedOrganizations,
  getOrganization,
  deleteOrganization,
  getOrganizationMembers,
  inviteUserToOrg,
  deleteUserFromOrg,
  acceptInvitation,
  declineInvitation,
};
