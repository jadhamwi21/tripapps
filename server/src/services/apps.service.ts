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
import { LocationType } from "../ts/types/locations.types";
import { StoreType } from "../ts/types/store.types";

const getAllApps = async (store: StoreType) => {
	if (store === "playstore") {
		return await PlaystoreApp.find().lean();
	}
	if (store === "appstore") {
		return await AppstoreApp.find().lean();
	}
};

const getAllAppsInLocationType = async (
	store: StoreType,
	locationType: LocationType
) => {
	const StoreAppsModel = store === "playstore" ? PlaystoreApp : AppstoreApp;
	const LocationTypeAppsModel = (function () {
		if (locationType === "countries") {
			return store === "playstore"
				? CountriesPlaystoreApps
				: CountriesAppstoreApps;
		}
		if (locationType === "cities") {
			return store === "playstore" ? CitiesPlaystoreApps : CitiesAppstoreApps;
		}
	})();
	const allAppsReferences = Array.from(
		new Set(
			(
				await LocationTypeAppsModel?.find(
					{},
					{},
					{ projection: { all: true } }
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

const getApps = async (params: IGetAppsParams, query: IGetAppsQuery) => {
	if (false) {
	} else if (params.location && params.locationType) {
		return await getAllAppsInLocationType(params.store, params.locationType);
	} else {
		return await getAllApps(params.store);
	}
};

export const AppsService = { getApps };
