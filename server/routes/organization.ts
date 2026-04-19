import { Router } from "express";
import organizationController from "../controllers/organization";

const organizationRouter = Router();

organizationRouter.use("/create", organizationController.createOrganization);

export default organizationRouter;
