import { categories } from "google-play-scraper";
import { EnLocation, EnStores } from "../ts/enums";
import { Categories, LocationsType, ScrapAnswers } from "../ts/types";
import { IApp } from "../ts/interfaces";
import { AppstoreApp, PlaystoreApp } from "../models/apps.model";
import axios from "axios";
import {
  CountriesAppstoreApps,
  CountriesPlaystoreApps,
} from "../models/countries_apps.model";
import {
  CitiesAppstoreApps,
  CitiesPlaystoreApps,
} from "../models/cities_apps.model";
import { Model } from "mongoose";

type AppsModelType = typeof PlaystoreApp | typeof AppstoreApp;

type LocationsModelType =
  | typeof CountriesAppstoreApps
  | typeof CountriesPlaystoreApps
  | typeof CitiesAppstoreApps
  | typeof CitiesPlaystoreApps;

const saveApps = async (
  location: string,
  category: string,
  apps: IApp[],
  appsModel: AppsModelType,
  locationAppsModel: LocationsModelType
) => {
  for (const app of apps) {
    const appDoc = await appsModel.findOne({ id: app.id });

    if (appDoc) {
      await appDoc.updateOne({
        ...app,
        keywords: Array.from(new Set([...appDoc.keywords, category])),
      });
    } else {
      const newApp = new appsModel({ ...app, keywords: [category] });
      await newApp.save();
    }
    const locationAppsDoc = await locationAppsModel?.findOne({
      name: location,
    });
    if (locationAppsDoc) {
      locationAppsDoc.all = Array.from(
        new Set([...locationAppsDoc.all, app.id])
      );
      if (locationAppsDoc.apps[category]) {
        locationAppsDoc.apps = {
          ...locationAppsDoc.apps,
          [category]: Array.from(
            new Set([...locationAppsDoc.apps[category], app.id])
          ),
        };
      } else {
        locationAppsDoc.apps = {
          ...locationAppsDoc.apps,
          [category]: [app.id],
        };
      }
      await locationAppsDoc.save();
    } else {
      const newLocationAppsDoc = new locationAppsModel();
      newLocationAppsDoc.all = [app.id];
      newLocationAppsDoc.apps = { [category]: [app.id] };
      newLocationAppsDoc.name = location;
      await newLocationAppsDoc.save();
    }
  }
};

const SCRAPPER_URL = "http://127.0.0.1:8000/apps";

const scrapStore = async (
  categories: Categories,
  locations: LocationsType,
  locationType: EnLocation,
  storeType: EnStores
) => {
  const appsModel =
    storeType === EnStores.PLAYSTORE ? PlaystoreApp : AppstoreApp;
  const locationAppsModel = (function () {
    if (locationType === EnLocation.COUNTRIES) {
      return storeType === EnStores.APPSTORE
        ? CountriesAppstoreApps
        : CountriesPlaystoreApps;
    }
    if (locationType === EnLocation.CITIES) {
      return storeType === EnStores.APPSTORE
        ? CitiesAppstoreApps
        : CitiesPlaystoreApps;
    }
  })();
  storeType === EnStores.PLAYSTORE ? CitiesPlaystoreApps : CitiesAppstoreApps;
  for (const location of locations) {
    for (const [category, subcategories] of Object.entries(categories)) {
      const apps: IApp[] = await axios
        .get(
          `${SCRAPPER_URL}?category=${category}&store=${storeType}&location=${location}`
        )
        .then((res) => res.data);
      await saveApps(location, category, apps, appsModel, locationAppsModel!);
      for (const subcategory of subcategories) {
        const apps: IApp[] = await axios
          .get(
            `${SCRAPPER_URL}?category=${subcategory}&store=${storeType}&location=${location}`
          )
          .then((res) => res.data);
        await saveApps(
          location,
          subcategory,
          apps,
          appsModel,
          locationAppsModel!
        );
      }
    }
  }
};

export const scrap = async (scrapAnswers: ScrapAnswers) => {
  const { stores, categories, locations, locationType } = scrapAnswers;
  for (const store of stores) {
    await scrapStore(categories, locations, locationType, store);
  }
};
