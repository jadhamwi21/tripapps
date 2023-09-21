import "server-only";
import { AxiosResponse } from "axios";
import { IApp } from "@/ts/interfaces/apps.interfaces";
import { axiosInstance } from "@/api/index";

export const getAllApps = async () => {
	return await axiosInstance
		.get<{}, AxiosResponse<IApp[]>>("/apps")
		.then(({ data }) => data);
};

export const getCountryApps = async (country: string) => {
	return await axiosInstance
		.get<{}, AxiosResponse<IApp[]>>(`/countries/${country}/apps`)
		.then(({ data }) => data);
};

export const getCountryAppsInCategory = async (
	country: string,
	category: string
) => {
	return await axiosInstance
		.get<{}, AxiosResponse<IApp[]>>(
			`/countries/${country}/apps?category=${category}`
		)
		.then(({ data }) => data);
};

export const getCountryAppsInCategoryAndSubcategory = async (
	country: string,
	category: string,
	subcategory: string
) => {
	return await axiosInstance
		.get<{}, AxiosResponse<IApp[]>>(
			`/countries/${country}/apps?category=${category}&subcategory=${subcategory}`
		)
		.then(({ data }) => data);
};

export const getCityApps = async (country: string) => {
	return await axiosInstance
		.get<{}, AxiosResponse<IApp[]>>(`/cities/${country}/apps`)
		.then(({ data }) => data);
};

export const getCityAppsInCategory = async (city: string, category: string) => {
	return await axiosInstance
		.get<{}, AxiosResponse<IApp[]>>(`/cities/${city}/apps?category=${category}`)
		.then(({ data }) => data);
};

export const getCityAppsInCategoryAndSubcategory = async (
	city: string,
	category: string,
	subcategory: string
) => {
	return await axiosInstance
		.get<{}, AxiosResponse<IApp[]>>(
			`/cities/${city}/apps?category=${category}&subcategory=${subcategory}`
		)
		.then(({ data }) => data);
};

export const getAppsInCategory = async (category: string) => {
	return await axiosInstance
		.get<{}, AxiosResponse<IApp[]>>(`/apps?category=${category}`)
		.then(({ data }) => data);
};

export const getAppsInSubCategory = async (subcategory: string) => {
	return await axiosInstance
		.get<{}, AxiosResponse<IApp[]>>(`/apps?subcategory=${subcategory}`)
		.then(({ data }) => data);
};
