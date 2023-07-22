import {Router} from "express";
import {AppsController} from "../controllers/apps.controller";


export const CountriesRouter = Router();


CountriesRouter.get("/:country/apps",AppsController.getAppsHandler)