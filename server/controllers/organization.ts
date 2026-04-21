import type { Request, Response } from "express";

import { prisma } from "../lib/prisma";

const createOrganization = async (request: Request, response: Response) => {
  const { name } = request.body;
  const userId = request.user?.id;

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
    });

    return response.status(200).json(organizations);
  } catch (error) {
    console.error(error);
    return response.status(500).json({ message: "Something went wrong" });
  }
};

const getOrganization = async (request: Request, response: Response) => {
  const orgId = request.params.id as string;
  const userId = request.user?.id as string;

  if (!orgId || !userId)
    return response.status(500).json({ message: "Id not found" });

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
  const orgId = request.params.id as string;
  const userId = request.user?.id as string;

  if (!orgId) return response.status(400).json({ message: "invalid id" });

  try {
    const org = await prisma.organization.findUnique({ where: { id: orgId } });

    if (!org) return response.status(404).json({ message: "Organization not found" });
    if (org.ownerId !== userId) return response.status(403).json({ message: "Only the owner can delete this organization" });

    await prisma.$transaction([
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

export default {
  createOrganization,
  getOwnedOrganizations,
  getOrganization,
  deleteOrganization,
};
