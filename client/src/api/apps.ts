import axios, { AxiosResponse } from "axios";
import { IApp } from "@/ts/interfaces/apps.interfaces";

export const getAllApps = async () => {
  return await axios
    .get<{}, AxiosResponse<IApp[]>>("http://localhost:80/apps")
    .then(({ data }) => data);
};

export const getCountryApps = async (country: string) => {
  return await axios
    .get<{}, AxiosResponse<IApp[]>>(
      `http://localhost:80/countries/${country}/apps`,
    )
    .then(({ data }) => data);
};

export const getCountryAppsInCategory = async (
  country: string,
  category: string,
) => {
  return await axios
    .get<{}, AxiosResponse<IApp[]>>(
      `http://localhost:80/countries/${country}/apps?category=${category}`,
    )
    .then(({ data }) => data);
};

export const getCountryAppsInCategoryAndSubcategory = async (
  country: string,
  category: string,
  subcategory: string,
) => {
  return await axios
    .get<{}, AxiosResponse<IApp[]>>(
      `http://localhost:80/countries/${country}/apps?category=${category}&subcategory=${subcategory}`,
    )
    .then(({ data }) => data);
};

export const getCityApps = async (country: string) => {
  return await axios
    .get<{}, AxiosResponse<IApp[]>>(
      `http://localhost:80/cities/${country}/apps`,
    )
    .then(({ data }) => data);
};

export const getCityAppsInCategory = async (city: string, category: string) => {
  return await axios
    .get<{}, AxiosResponse<IApp[]>>(
      `http://localhost:80/cities/${city}/apps?category=${category}`,
    )
    .then(({ data }) => data);
};

export const getCityAppsInCategoryAndSubcategory = async (
  city: string,
  category: string,
  subcategory: string,
) => {
  return await axios
    .get<{}, AxiosResponse<IApp[]>>(
      `http://localhost:80/cities/${city}/apps?category=${category}&subcategory=${subcategory}`,
    )
    .then(({ data }) => data);
};
