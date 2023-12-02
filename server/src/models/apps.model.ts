import { model, Schema } from "mongoose";

const playstoreAppSchema = new Schema({
	id: String,
	name: String,
	link: String,
	image: String,
	keywords: [String],
	reviews: [Object],
	score: Number,
});

const appstoreAppSchema = new Schema({
	id: String,
	name: String,
	link: String,
	image: String,
	keywords: [String],
	reviews: [Object],
	score: Number,
});

export const PlaystoreApp = model("playstore_apps", appstoreAppSchema);
export const AppstoreApp = model("appstore_apps", playstoreAppSchema);
