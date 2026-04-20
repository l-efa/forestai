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
  const id = request.params.id as string;

  try {
    const organization = await prisma.organization.findUnique({
      where: { id },
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

export default { createOrganization, getOwnedOrganizations, getOrganization };
