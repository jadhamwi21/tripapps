import { NextFunction, Request, Response } from "express";
import { AppsService } from "../services/apps.service";
import z from "zod";
import { StoreType } from "../ts/types/store.types";
import { LocationType } from "../ts/types/locations.types";
import { IAppReview } from "../ts/interfaces/apps.interfaces";

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

interface IAddAppReviewParams {
	store: StoreType;
	appId: string;
}

const ADD_APP_REVIEW_SCHEMA = z.object({
	params: z.object({
		store: z.enum(["Playstore", "Appstore"]),
		appId: z.string(),
	}),
	body: z.object({
		score: z.number(),
		review: z.string(),
	}),
});

const addAppReview = async (
	req: Request<IAddAppReviewParams, {}, Omit<IAppReview, "date">>,
	res: Response,
	next: NextFunction
) => {
	try {
		console.log(req.params, req.body);
		ADD_APP_REVIEW_SCHEMA.parse(req);
		const { body } = req;
		const review = body;
		const { appId, store } = req.params;

		const data = await AppsService.addNewAppReview(store, appId, review);
		return res.status(200).send({ message: "Review added successfully", data });
	} catch (e) {
		next(e);
	}
};

export const AppsController = {
	getApps,
	getStoreApps,
	addAppReview,
};
