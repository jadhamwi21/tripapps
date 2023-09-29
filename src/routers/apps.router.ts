import { Router } from "express";
import { AppsController } from "../controllers/apps.controller";

export const AppsRouter = Router();

AppsRouter.get("/", AppsController.getAppsHandler);
