import { Request, response, Response } from "express";
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

const getUserNotifications = async (request: Request, response: Response) => {
  const userId = request.user?.id as string;

  if (!userId) {
    return response.status(400).json({ message: "Forbidden" });
  }
  try {
    const invites = await prisma.invitation.findMany({
      where: {
        invitedUserId: userId,
      },
      select: {
        id: true,
        createdAt: true,
        organization: {
          select: {
            id: true,
            name: true,
          },
        },
        invitedBy: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    });

    return response.status(200).json(invites);
  } catch (error) {
    return response.status(500).json({ message: "Something went wrong" });
  }
};

const changeProfileColor = async (request: Request, response: Response) => {
  const userId = request.user?.id as string;
  const { profileColor } = request.body;

  try {
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        profileColor: profileColor,
      },
    });

    return response.status(200).json({ message: "Profile color changed" });
  } catch (error) {
    return response.status(500).json({ message: "Something went wrong" });
  }
};

const getUserSettings = async (request: Request, response: Response) => {
  const userId = request.user?.id as string;

  if (!userId) {
    return response.status(400).json({ message: "Unauthorized" });
  }

  try {
    const settings = await prisma.userSettings.findUnique({
      where: { userId: userId },
    });

    return response.status(200).json(settings);
  } catch (error) {
    return response.status(500).json({ message: "Something went wrong" });
  }
};

const changeUserSettings = async (request: Request, response: Response) => {
  const userId = request.user?.id as string;
  const { settings } = request.body;

  console.log("settings: ", settings);

  try {
    await prisma.userSettings.upsert({
      where: { userId },
      update: settings,
      create: {
        userId,
        ...settings,
      },
    });

    return response.status(200).json({ message: "Settings updated" });
  } catch (error) {
    return response.status(500).json({ message: "Something went wrong" });
  }
};

const getUserCalendar = async (request: Request, response: Response) => {
  const userId = request.user?.id as string;
  const month = Number(request.query.month);
  const year = Number(request.query.year);

  const start = new Date(Date.UTC(year, month - 1, 1));
  const end = new Date(Date.UTC(year, month + 2, 1));

  try {
    const reminders = await prisma.calendarReminder.findMany({
      where: { userId, date: { gte: start, lt: end } },
    });

    return response.status(200).json(reminders);
  } catch (error) {
    return response.status(500).json({ message: "Something went wrong" });
  }
};

const newReminder = async (request: Request, response: Response) => {
  const userId = request.user?.id as string;
  const { date, month, year } = request.body;
  const { reminder, reminderTime } = request.body;

  console.log(reminderTime);

  if (!date || !month || !year) {
    return response.status(400).json({ message: "All fields are required" });
  }

  if (!userId) {
    return response.status(403).json({ message: "Unauthorized" });
  }

  const newDate = new Date(Date.UTC(year, month, date));

  try {
    await prisma.calendarReminder.create({
      data: { date: newDate, reminder, userId, time: reminderTime },
    });

    return response.status(200).json({ message: "Reminder created" });
  } catch (error) {
    return response.status(500).json({ message: "Something went wrong" });
  }
};

export default {
  findUsers,
  getUserNotifications,
  changeProfileColor,
  getUserSettings,
  changeUserSettings,
  getUserCalendar,
  newReminder,
};
