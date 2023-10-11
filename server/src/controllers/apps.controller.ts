import { NextFunction, Request, Response } from "express";
import { AppsService } from "../services/apps.service";
import z from "zod";
import { StoreType } from "../ts/types/store.types";
import { LocationType } from "../ts/types/locations.types";

const schema = z.object({
	store: z.enum(["playstore", "appstore"]),
	locationType: z.enum(["countries", "cities"]).optional(),
	location: z.string().optional(),
});

export interface IGetAppsParams {
	store: StoreType;
	locationType?: LocationType;
	location?: string;
}

export interface IGetAppsQuery {
	category?: string;
	subcategory?: string;
}

const getApps = async (
	req: Request<IGetAppsParams, {}, {}, IGetAppsQuery>,
	res: Response,
	next: NextFunction
) => {
	const { params, query } = req;
	try {
		schema.parse(params);
		const apps = await AppsService.getApps(params, query);
		return res.status(200).send(apps);
	} catch (e) {
		next(e);
	}
};

export const AppsController = {
	getApps,
};
