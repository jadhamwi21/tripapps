import { model, Schema } from "mongoose";

const citiesAppsSchema = new Schema({
  city_name: String,
  apps: Schema.Types.Mixed, // Categories and their apps
  all: [Schema.Types.Mixed], // All apps of a city
});

export const CitiesApps = model("cities_apps", citiesAppsSchema);
