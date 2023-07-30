import React from "react";
import PageWrapper from "@/components/PageWrapper/PageWrapper";
import FindAppsSearch from "@/features/FindApps/components/Search/FindAppsSearch";
import axios, { AxiosResponse } from "axios";
import CategoriesFilter from "@/features/FindApps/components/CategoriesFilter/CategoriesFilter";
import { IApp } from "@/ts/interfaces/apps.interfaces";
import AppsList from "@/features/FindApps/components/AppsList/AppsList";
import { getSeeds } from "@/api/seeds";

export const getAllApps = async () => {
  return await axios
    .get<{}, AxiosResponse<IApp[]>>("http://localhost:80/apps")
    .then(({ data }) => data);
};

const page = async () => {
  const seeds = await getSeeds();
  const apps = await getAllApps();

  return (
    <PageWrapper>
      <FindAppsSearch locations={seeds.locations} />
      <CategoriesFilter categories={seeds.categories} />
      <AppsList apps={apps} />
    </PageWrapper>
  );
};

export default page;
