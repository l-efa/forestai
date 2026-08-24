import type { Request, Response } from "express";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import crypto from "crypto";

import { prisma } from "../lib/prisma";

const dummyHash = argon2.hash("dummy-password-for-timing-safety");

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

    const user = await prisma.user.create({
      data: {
        email: email,
        username: username,
        password: hashedPassword,
      },
    });

    await prisma.userSettings.create({
      data: {
        userId: user.id,
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
      await argon2.verify(await dummyHash, password);
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
      { expiresIn: "2m" },
    );

    response.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 2 * 60 * 1000,
    });

    if (remember) {
      const refresh = crypto.randomBytes(32).toString("hex");
      const refreshTokenMaxAge = 30 * 24 * 60 * 60 * 1000;

      response.cookie("refresh", refresh, {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
        maxAge: refreshTokenMaxAge,
        path: "/api/auth",
      });

      const refreshHash = crypto
        .createHash("sha256")
        .update(refresh)
        .digest("hex");

      await prisma.refreshToken.create({
        data: {
          userId: existingUser.id,
          token: refreshHash,
          expiresAt: new Date(Date.now() + refreshTokenMaxAge),
        },
      });
    }

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
  const refresh = request.cookies?.refresh as string | undefined;
  const userId = request.user?.id as string;

  if (refresh) {
    const refreshHash = crypto
      .createHash("sha256")
      .update(refresh)
      .digest("hex");

    try {
      await prisma.refreshToken.update({
        where: {
          token: refreshHash,
          userId: userId,
        },
        data: {
          revoked: true,
        },
      });
    } catch (error) {
      console.error(error);
    }
  }

  response.clearCookie("token", {
    httpOnly: true,
    secure: false,
    sameSite: "strict",
  });

  response.clearCookie("refresh", {
    httpOnly: true,
    secure: false,
    sameSite: "strict",
    path: "/api/auth",
  });

  return response.status(200).json({ message: "Logged out" });
};

const Refresh = async (request: Request, response: Response) => {
  const refresh = request.cookies?.refresh as string | undefined;

  if (refresh) {
    const hashedRefresh = crypto
      .createHash("sha256")
      .update(refresh)
      .digest("hex");

    try {
      const validRefresh = await prisma.refreshToken.findUnique({
        where: {
          token: hashedRefresh,
          revoked: false,
        },
      });

      if (validRefresh) {
        if (validRefresh.expiresAt < new Date(Date.now())) {
          await prisma.refreshToken.update({
            where: { id: validRefresh.id },
            data: { revoked: true },
          });

          return response
            .status(401)
            .json({ message: "Refresh token expired" });
        }

        const user = await prisma.user.findFirst({
          where: {
            id: validRefresh.userId,
          },
        });

        if (user) {
          const newToken = jwt.sign(
            { id: user.id, username: user.username },
            process.env.SECRET_KEY!,
            { expiresIn: "15m" },
          );

          response.cookie("token", newToken, {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            maxAge: 15 * 60 * 1000,
          });
          return response.status(200).json({ message: "Re-Signed" });
        }
      }
    } catch (error) {
      return response
        .status(500)
        .json({ message: "Something went wrong while refreshing" });
    }
  }

  return response.status(401).json({ message: "Unauthorized" });
};

export default { Register, Login, Me, Logout, Refresh };
