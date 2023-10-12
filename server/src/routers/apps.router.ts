import { Router } from "express";
import { AppsController } from "../controllers/apps.controller";

export const AppsRouter = Router();

AppsRouter.use("/:store/:locationType/:location?", AppsController.getApps);
AppsRouter.use("/:store", AppsController.getStoreApps);
