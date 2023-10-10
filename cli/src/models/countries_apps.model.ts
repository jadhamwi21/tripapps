import { model, Schema } from "mongoose";

const countriesAppstoreAppsSchema = new Schema({
  name: String,
  apps: Schema.Types.Mixed, // Categories and their apps
  all: [Schema.Types.Mixed], // All apps in the country
});

const countriesPlaystoreAppsSchema = new Schema({
  name: String,
  apps: Schema.Types.Mixed, // Categories and their apps
  all: [Schema.Types.Mixed], // All apps in the country
});

export const CountriesAppstoreApps = model(
  "countries_appstore_apps",
  countriesAppstoreAppsSchema
);
export const CountriesPlaystoreApps = model(
  "countries_playstore_apps",
  countriesPlaystoreAppsSchema
);
