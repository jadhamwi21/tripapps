import { NextFunction, Request, Response } from "express";
import { AppsService } from "../services/apps.service";
import z from "zod";
import { StoreType } from "../ts/types/store.types";
import { LocationType } from "../ts/types/locations.types";

const GET_APPS_SCHEMA = z.object({
	store: z.enum(["Playstore", "Appstore"]),
	locationType: z.enum(["countries", "cities"]),
	location: z.string().optional(),
});

export interface IGetAppsParams {
	store: StoreType;
	locationType: LocationType;
	location?: string;
}

export interface IGetAppsQuery {
	category?: string;
}

const getApps = async (
	req: Request<IGetAppsParams, {}, {}, IGetAppsQuery>,
	res: Response,
	next: NextFunction
) => {
	const { params, query } = req;
	try {
		GET_APPS_SCHEMA.parse(params);
		const apps = await AppsService.getApps(params, query);
		return res.status(200).send(apps);
	} catch (e) {
		next(e);
	}
};

interface IGetStoreAppsParams {
	store: StoreType;
}

const GET_STOREAPPS_SCHEMA = z.object({
	store: z.enum(["Playstore", "Appstore"]),
});

const getStoreApps = async (
	req: Request<IGetStoreAppsParams, {}, {}, IGetAppsQuery>,
	res: Response,
	next: NextFunction
) => {
	const { params, query } = req;
	try {
		GET_STOREAPPS_SCHEMA.parse(params);
		const apps = await AppsService.getStoreAllApps(
			params.store,
			query.category
		);
		return res.status(200).send(apps);
	} catch (e) {
		next(e);
	}
};

export const AppsController = {
	getApps,
	getStoreApps,
};
