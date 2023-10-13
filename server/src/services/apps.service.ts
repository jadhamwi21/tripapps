import { IGetAppsParams, IGetAppsQuery } from "../controllers/apps.controller";
import { AppstoreApp, PlaystoreApp } from "../models/apps.model";
import {
	CitiesAppstoreApps,
	CitiesPlaystoreApps,
} from "../models/cities_apps.model";
import {
	CountriesAppstoreApps,
	CountriesPlaystoreApps,
} from "../models/countries_apps.model";
import { IApp } from "../ts/interfaces/apps.interfaces";
import { LocationType } from "../ts/types/locations.types";
import { StoreType } from "../ts/types/store.types";

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

export const AppsService = { getApps, getStoreAllApps };
