import { model, Schema } from "mongoose";

const citiesAppstoreAppsSchema = new Schema({
  name: String,
  apps: Schema.Types.Mixed, // Categories and their apps
  all: [Schema.Types.Mixed], // All apps in the country
});

const citiesPlaystoreAppsSchema = new Schema({
  name: String,
  apps: Schema.Types.Mixed, // Categories and their apps
  all: [Schema.Types.Mixed], // All apps in the country
});

export const CitiesAppstoreApps = model(
  "cities_appstore_apps",
  citiesAppstoreAppsSchema
);
export const CitiesPlaystoreApps = model(
  "cities_playstore_apps",
  citiesPlaystoreAppsSchema
);
