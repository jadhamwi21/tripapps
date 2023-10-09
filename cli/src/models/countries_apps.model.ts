import { model, Schema } from "mongoose";

const countriesAppsSchema = new Schema({
  country_name: String,
  apps: Schema.Types.Mixed, // Categories and their apps
  all: [Schema.Types.Mixed], // All apps in the country
});

export const CountriesApps = model("countries_apps", countriesAppsSchema);
