import type { Request, Response } from "express";

import { prisma } from "../lib/prisma";

const Register = async (request: Request, response: Response) => {
  console.log("new user: ", request.body);

  const { email, username, password } = request.body;

  try {
    const existingEmail = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (existingEmail) {
      return response.status(409).json({ message: "Email already in use" });
    }

    const existingUsername = await prisma.user.findUnique({
      where: {
        username: username,
      },
    });

    if (existingUsername) {
      return response.status(409).json({ message: "Username already in use" });
    }

    const user = await prisma.user.create({
      data: {
        email: email,
        username: username,
        password: password,
      },
    });

    console.log("user", user);

    return response.status(201).json({ message: "Account created" });
  } catch (error: any) {
    if (error.code === "P2002") {
      return response
        .status(409)
        .json({ message: "Email or username already taken" });
    }
    console.error(error);
    return response.status(500).json({ message: "Something went wrong" });
  }
};

export default { Register };
