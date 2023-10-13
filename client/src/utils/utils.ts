import { ISeeds } from "@/ts/interfaces/seeds.interfaces";
import _ from "lodash";

export const titlize = (str?: string) => {
	if (_.isUndefined(str)) return "";
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

export const fixParams = <T extends object>(obj: T): T => {
	return Object.fromEntries(
		Object.entries(obj).map(([k, v]) =>
			[k, titlize(decodeURI(v))]
		)
	) as T;
};
