import "server-only";
import { AxiosResponse } from "axios";
import { IApp } from "@/ts/interfaces/apps.interfaces";
import { axiosInstance } from "@/api/index";

export const getAllApps = async () => {
	return await axiosInstance
		.get<{}, AxiosResponse<IApp[]>>("/apps/playstore")
		.then(({ data }) => data);
};

export const getCountryApps = async (country: string) => {
	return await axiosInstance
		.get<{}, AxiosResponse<IApp[]>>(`/apps/playstore/countries/${country}`)
		.then(({ data }) => data);
};

export const getCountryAppsInCategory = async (
	country: string,
	category: string
) => {
	return await axiosInstance
		.get<{}, AxiosResponse<IApp[]>>(
			`/apps/playstore/countries/${country}?category=${category}`
		)
		.then(({ data }) => data);
};

export const getCityApps = async (city: string) => {
	return await axiosInstance
		.get<{}, AxiosResponse<IApp[]>>(`/apps/playstore/cities/${city}`)
		.then(({ data }) => data);
};

export const getCityAppsInCategory = async (city: string, category: string) => {
	return await axiosInstance
		.get<{}, AxiosResponse<IApp[]>>(
			`/apps/playstore/cities/${city}?category=${category}`
		)
		.then(({ data }) => data);
};

export const getAppsInCategory = async (category: string) => {
	return await axiosInstance
		.get<{}, AxiosResponse<IApp[]>>(`/apps/playstore?category=${category}`)
		.then(({ data }) => data);
};
