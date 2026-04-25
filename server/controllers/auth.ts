import type { Request, Response } from "express";
import argon2 from "argon2";
import jwt from "jsonwebtoken";

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

const Login = async (request: Request, response: Response) => {
  const { username, password, remember } = request.body;

  if (!username || !password) {
    return response.status(400).json({ message: "All fields are required" });
  }
  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        username: username,
      },
    });

    if (!existingUser) {
      return response
        .status(401)
        .json({ message: "Invalid username or password" });
    }

    if (!(await argon2.verify(existingUser.password, password))) {
      return response
        .status(401)
        .json({ message: "Invalid username or password" });
    }

    const token = jwt.sign(
      { id: existingUser.id, username: existingUser.username },
      process.env.SECRET_KEY!,
      { expiresIn: "1h" },
    );

    response.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 60 * 60 * 1000,
    });

    return response.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.error(error);
    return response.status(500).json({ message: "Something went wrong" });
  }
};

const Me = async (request: Request, response: Response) => {
  const id = request.user?.id;

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        username: true,
        email: true,
        profileColor: true,
      },
    });

    return response.status(200).json(user);
  } catch (error) {
    console.error(error);
    return response.status(500).json({ message: "Something went wrong" });
  }
};

const Logout = async (request: Request, response: Response) => {
  response.clearCookie("token", {
    httpOnly: true,
    secure: false,
    sameSite: "strict",
  });

  return response.status(200).json({ message: "Logged out" });
};

export default { Register, Login, Me, Logout };
