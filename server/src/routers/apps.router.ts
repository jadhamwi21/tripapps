import { Router } from "express";
import { AppsController } from "../controllers/apps.controller";

export const AppsRouter = Router();

AppsRouter.get("/:store/:locationType/:location?", AppsController.getApps);
AppsRouter.put("/:store/:appId/reviews", AppsController.addAppReview);
AppsRouter.get("/:store", AppsController.getStoreApps);
