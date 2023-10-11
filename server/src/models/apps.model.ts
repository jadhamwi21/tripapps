import { model, Schema } from "mongoose";

const playstoreAppSchema = new Schema({
  id: String,
  name: String,
  link: String,
  image: String,
  keywords: [String],
});

const appstoreAppSchema = new Schema({
  id: String,
  name: String,
  link: String,
  image: String,
  keywords: [String],
});

export const PlaystoreApp = model("playstore_apps", appstoreAppSchema);
export const AppstoreApp = model("appstore_apps", playstoreAppSchema);
