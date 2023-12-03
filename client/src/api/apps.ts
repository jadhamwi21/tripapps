import "server-only";
import { AxiosResponse } from "axios";
import { IApp, IAppReview } from "@/ts/interfaces/apps.interfaces";
import { axiosServerInstance } from "@/api/index.server";

export type StoreType = "Playstore" | "Appstore";

export const getAllApps = async (store: StoreType) => {
	return await axiosServerInstance
		.get<{}, AxiosResponse<IApp[]>>(`/apps/${store}`)
		.then(({ data }) => data);
};

export const getCountryApps = async (store: StoreType, country: string) => {
	return await axiosServerInstance
		.get<{}, AxiosResponse<IApp[]>>(`/apps/${store}/countries/${country}`)
		.then(({ data }) => data);
};

export const getCountryAppsInCategory = async (
	store: StoreType,
	country: string,
	category: string
) => {
	return await axiosServerInstance
		.get<{}, AxiosResponse<IApp[]>>(
			`/apps/${store}/countries/${country}?category=${category}`
		)
		.then(({ data }) => data);
};

export const getCityApps = async (store: StoreType, city: string) => {
	return await axiosServerInstance
		.get<{}, AxiosResponse<IApp[]>>(`/apps/${store}/cities/${city}`)
		.then(({ data }) => data);
};

export const getCityAppsInCategory = async (
	store: StoreType,
	city: string,
	category: string
) => {
	return await axiosServerInstance
		.get<{}, AxiosResponse<IApp[]>>(
			`/apps/${store}/cities/${city}?category=${category}`
		)
		.then(({ data }) => data);
};

export const getAppsInCategory = async (store: StoreType, category: string) => {
	return await axiosServerInstance
		.get<{}, AxiosResponse<IApp[]>>(`/apps/${store}?category=${category}`)
		.then(({ data }) => data);
};
