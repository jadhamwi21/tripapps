import { IGetAppsParams, IGetAppsQuery } from "../controllers/apps.controller";
import { AppstoreApp, PlaystoreApp } from "../models/apps.model";
import {
	CitiesAppstoreApps,
	CitiesPlaystoreApps,
} from "../models/cities_apps.model";
import moment from "moment";
import {
	CountriesAppstoreApps,
	CountriesPlaystoreApps,
} from "../models/countries_apps.model";
import { CustomError } from "../models/error.models";
import { IApp, IAppReview } from "../ts/interfaces/apps.interfaces";
import { LocationType } from "../ts/types/locations.types";
import { StoreType } from "../ts/types/store.types";
import { getAppModelByStore } from "../utils/utils";

const getStoreAllApps = async (store: StoreType, category?: string) => {
	let apps: IApp[] = [];
	if (store === "Playstore") {
		apps = await PlaystoreApp.find().lean();
	}
	if (store === "Appstore") {
		apps = await AppstoreApp.find().lean();
	}
	if (category) {
		return apps.filter((app) => app.keywords.indexOf(category) >= 0);
	} else {
		return apps;
	}
};

const getAllAppsInLocation = async (
	store: StoreType,
	locationType: LocationType,
	location?: string
) => {
	const StoreAppsModel = store === "Playstore" ? PlaystoreApp : AppstoreApp;
	const LocationTypeAppsModel = (function () {
		if (locationType === "countries") {
			return store === "Playstore"
				? CountriesPlaystoreApps
				: CountriesAppstoreApps;
		}
		if (locationType === "cities") {
			return store === "Playstore" ? CitiesPlaystoreApps : CitiesAppstoreApps;
		}
	})();
	const allAppsReferences = Array.from(
		new Set(
			(
				await LocationTypeAppsModel?.find(
					location ? { name: location } : {}
				).lean()
			)
				?.map((doc) => doc.all)
				.flat()
		)
	);
	const apps = await StoreAppsModel.find()
		.lean()
		.where("id")
		.in(allAppsReferences)
		.exec();
	return apps;
};

const getAllAppsInLocationWithQuery = async (
	store: StoreType,
	locationType: LocationType,
	location: string,
	category: string
) => {
	const StoreAppsModel = store === "Playstore" ? PlaystoreApp : AppstoreApp;
	const LocationTypeAppsModel = (function () {
		if (locationType === "countries") {
			return store === "Playstore"
				? CountriesPlaystoreApps
				: CountriesAppstoreApps;
		}
		if (locationType === "cities") {
			return store === "Playstore" ? CitiesPlaystoreApps : CitiesAppstoreApps;
		}
	})();

	const _allAppsReferences = await LocationTypeAppsModel?.findOne({
		name: location,
	}).lean();

	const allAppsReferences = _allAppsReferences?.apps[category] || [];

	const apps = await StoreAppsModel.find()
		.lean()
		.where("id")
		.in(allAppsReferences)
		.exec();
	return apps;
};

const getApps = async (params: IGetAppsParams, query: IGetAppsQuery) => {
	if (params.location && query.category) {
		return await getAllAppsInLocationWithQuery(
			params.store,
			params.locationType,
			params.location,
			query.category
		);
	} else if (params.locationType) {
		return await getAllAppsInLocation(
			params.store,
			params.locationType,
			params.location
		);
	}
};

const addNewAppReview = async (
	store: StoreType,
	appId: string,
	review: Omit<IAppReview, "date">
) => {
	const appModel = getAppModelByStore(store);
	const app = await appModel.findOne({ id: appId });
	if (app) {
		const prevReviews: IAppReview[] = app.reviews;
		const appReview: IAppReview = {
			...review,
			date: moment().unix(),
		};
		const newReviews = [...prevReviews, appReview];
		const newScore =
			newReviews.reduce((prev, current) => prev + current.score, 0) /
			newReviews.length;
		app.reviews = newReviews;
		app.score = newScore;
		await app.save();
		return { review: appReview, score: newScore };
	} else {
		throw new CustomError(404, `App with id ${appId} is not found`, "App");
	}
};

export const AppsService = { getApps, getStoreAllApps, addNewAppReview };
