import { Request, Response } from "express";

import { prisma } from "../lib/prisma";

const createOrganization = async (request: Request, response: Response) => {
  console.log(request.body);

  await prisma.organization.create({
    data: {
      name: request.body.name,
      owner: request.body.owner,
    },
  });
  return response.status(200).json({ message: "created" });
};

export default { createOrganization };
