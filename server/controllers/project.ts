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
        members: {
          create: {
            userId: userId,
            role: "admin",
          },
        },
      },
    });

    return response.status(200).json({ message: "Project created" });
  } catch (error) {
    return response.status(500).json({ message: "Something went wrong" });
  }
};

const getProjectData = async (request: Request, response: Response) => {
  const orgId = request.params.orgId as string;
  const projectId = request.params.projectId as string;
  const userId = request.user?.id as string;

  if (!orgId || !projectId || !userId) {
    return response.status(400).json({ message: "Missing parameters" });
  }

  try {
    const user = await prisma.projectMember.findUnique({
      where: {
        userId_projectId: {
          userId: userId,
          projectId: projectId,
        },
      },
    });

    if (!user) {
      return response.status(403).json({ message: "Project not found" });
    }
    const project = await prisma.project.findUnique({
      where: {
        id: projectId,
      },
    });

    return response.status(200).json({ ...project, role: user.role });
  } catch (error) {
    return response.status(500).json({ message: "Something went wrong" });
  }
};

const deleteProject = async (request: Request, response: Response) => {
  const orgId = request.params.orgId as string;
  const projectId = request.params.projectId as string;
  const userId = request.user?.id as string;

  if (!orgId || !projectId || !userId) {
    return response.status(400).json({ message: "Missing parameters" });
  }

  try {
    const project = await prisma.project.findFirst({
      where: {
        id: projectId,
        ownerId: userId,
      },
    });

    if (!project) {
      return response
        .status(403)
        .json({ message: "Unauthorized to delete this project" });
    }

    await prisma.$transaction([
      prisma.projectMember.deleteMany({ where: { projectId } }),
      prisma.project.delete({ where: { id: projectId } }),
    ]);

    return response.status(200).json({ message: "Project deleted" });
  } catch (error) {
    return response.status(500).json({ message: "Something went wrong" });
  }
};

const getProjectMembers = async (request: Request, response: Response) => {
  const userId = request.user?.id as string;
  const projectId = request.params.projectId as string;

  if (!projectId || !userId)
    return response.status(400).json({ message: "Id not found" });

  try {
    const isMember = await prisma.projectMember.findUnique({
      where: {
        userId_projectId: {
          userId: userId,
          projectId: projectId,
        },
      },
    });

    if (!isMember) return response.status(403).json({ message: "Forbidden" });

    const members = await prisma.projectMember.findMany({
      where: {
        projectId: projectId,
      },
      include: {
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
    return response.status(500).json({ message: "Something went wrong" });
  }
};

const setProjectMember = async (request: Request, response: Response) => {
  const userId = request.user?.id;
  const projectId = request.params.projectId as string;
  const { selectedUser } = request.body;

  if (!userId || !selectedUser) {
    return response.status(400).json({ message: "All fields required" });
  }

  try {
    const isAdmin = await prisma.projectMember.findFirst({
      where: {
        userId: userId,
        role: "admin",
      },
    });
    if (!isAdmin) {
      return response.status(401).json({ message: "forbidden" });
    }

    await prisma.projectMember.create({
      data: {
        userId: selectedUser,
        projectId: projectId,
      },
    });

    return response.status(200).json({ message: "User added to project" });
  } catch (error) {
    return response.status(500).json({ message: "Something went wrong" });
  }
};

const removeMember = async (request: Request, response: Response) => {
  const userId = request.user?.id;
  const projectId = request.params.projectId as string;
  const { removedUser } = request.body;

  if (!userId || !removedUser) {
    return response.status(400).json({ message: "All fields required" });
  }

  try {
    const isAdmin = await prisma.projectMember.findFirst({
      where: {
        userId: userId,
        role: "admin",
      },
    });
    if (!isAdmin) {
      return response.status(401).json({ message: "forbidden" });
    }

    await prisma.projectMember.delete({
      where: {
        userId_projectId: { userId: removedUser, projectId: projectId },
      },
    });

    return response.status(200).json({ message: "User removed from project" });
  } catch (error) {
    return response.status(500).json({ message: "Something went wrong" });
  }
};

export default {
  getProjects,
  addProject,
  getProjectData,
  deleteProject,
  getProjectMembers,
  setProjectMember,
  removeMember,
};
