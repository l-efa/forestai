import { Request, Response } from "express";
import { prisma } from "../lib/prisma";

const getProjects = async (request: Request, response: Response) => {
  const orgId = request.params.orgId as string;
  const userId = request.user?.id as string;

  if (!orgId || !userId) {
    return response.status(400).json({ message: "Invalid parameters" });
  }

  try {
    const projects = await prisma.project.findMany({
      where: {
        organizationId: orgId,
      },
    });

    return response.status(200).json(projects);
  } catch (error) {
    return response.status(500).json({ message: "Something went wrong" });
  }
};

const addProject = async (request: Request, response: Response) => {
  const orgId = request.params.orgId as string;
  const userId = request.user?.id as string;
  const { name } = request.body;

  if (!orgId || !userId) {
    return response.status(400).json({ message: "Invalid parameters" });
  }

  try {
    await prisma.project.create({
      data: {
        name: name,
        ownerId: userId,
        organizationId: orgId,
      },
    });

    return response.status(200).json({ message: "Project created" });
  } catch (error) {
    return response.status(500).json({ message: "Something went wrong" });
  }
};

export default { getProjects, addProject };
