import axios from "axios";
import { AppstoreApp, PlaystoreApp } from "../models/apps.model";
import {
  CitiesAppstoreApps,
  CitiesPlaystoreApps,
} from "../models/cities_apps.model";
import {
  CountriesAppstoreApps,
  CountriesPlaystoreApps,
} from "../models/countries_apps.model";
import { EnLocation, EnStores } from "../ts/enums";
import { IApp } from "../ts/interfaces";
import { Categories, LocationsType, ScrapAnswers } from "../ts/types";
const SCRAPERS_API_URL =
  process.env.SCRAPERS_API_URL || "http://localhost:8000";

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
      const newApp = new appsModel({
        ...app,
        keywords: [category],
        score: 0,
        reviews: [],
      });
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
    console.log(`Scrapping Apps in ${location}`);

    for (const [category, subcategories] of Object.entries(categories)) {
      console.log(`Scrapping ${category} Apps in ${location}`);
      const apps: IApp[] = await axios
        .get(
          `${SCRAPERS_API_URL}/apps?category=${category}&store=${storeType}&location=${location}`
        )
        .then((res) => res.data);
      await saveApps(location, category, apps, appsModel, locationAppsModel!);
      for (const subcategory of subcategories) {
        console.log(`Scrapping ${subcategory} ${category} Apps in ${location}`);
        const apps: IApp[] = await axios
          .get(
            `${SCRAPERS_API_URL}/apps?category=${subcategory} ${category}&store=${storeType}&location=${location}`
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
    console.log(`Scrapping ${store} Apps`);
    await scrapStore(categories, locations, locationType, store);
  }
};
