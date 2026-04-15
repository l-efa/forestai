import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authMiddleware = (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const token = request.cookies?.token;
  if (!token) {
    return response.status(401).json({ message: "Not authenticated" });
  }

  try {
    request.user = jwt.verify(token, process.env.SECRET_KEY!) as { id: string; username: string };
    next();
  } catch (error) {
    return response.status(401).json({ message: "Invalid token" });
  }
};
