import type { Request, Response } from "express";
import argon2 from "argon2";

import { prisma } from "../lib/prisma";

const Register = async (request: Request, response: Response) => {
  const { email, username, password } = request.body;

  if (!email || !username || !password) {
    return response.status(400).json({ message: "All fields are required" });
  }

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

    const hashedPassword = await argon2.hash(password);

    await prisma.user.create({
      data: {
        email: email,
        username: username,
        password: hashedPassword,
      },
    });

    return response
      .status(201)
      .json({ message: "Account created from server" });
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
