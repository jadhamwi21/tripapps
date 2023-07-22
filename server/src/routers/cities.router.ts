import {Router} from "express";
import {AppsController} from "../controllers/apps.controller";
import {CountriesRouter} from "./countries.router";


export const CitiesRouter = Router();

CitiesRouter.get("/:city/apps",AppsController.getAppsHandler)