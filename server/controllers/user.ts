import { Request, Response } from "express";
import { prisma } from "../lib/prisma";

const findUsers = async (request: Request, response: Response) => {
  const username = request.query.q as string;
  if (!username || username.length < 2) {
    return response.status(400).json({ message: "Search query too short" });
  }

  try {
    const users = await prisma.user.findMany({
      where: {
        username: {
          contains: username,
          mode: "insensitive",
        },
      },
      select: {
        id: true,
        username: true,
        profileColor: true,
      },
      take: 10,
    });
    return response.status(200).json(users);
  } catch (error) {
    console.error(error);
    return response.status(500).json({ message: "Something went wrong" });
  }
};

export default { findUsers };
