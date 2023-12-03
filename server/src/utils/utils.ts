import { AppstoreApp, PlaystoreApp } from "../models/apps.model";
import { StoreType } from "../ts/types/store.types";

export const titlize = (str: string) => {
	const hasSpace = str.split(" ").length !== 0;
	if (hasSpace) {
		return str
			.split(" ")
			.map((str) => str[0].toUpperCase() + str.slice(1).toLowerCase())
			.join(" ");
	} else {
		return str[0].toUpperCase() + str.slice(1).toLowerCase();
	}
};

export const getAppModelByStore = (store: StoreType) =>
	store === "Playstore" ? PlaystoreApp : AppstoreApp;
