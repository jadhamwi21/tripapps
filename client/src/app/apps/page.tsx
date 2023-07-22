import React from "react";
import PageWrapper from "@/components/PageWrapper/PageWrapper";
import FindAppsSearch from "@/features/FindApps/components/Search/FindAppsSearch";
import axios, { AxiosResponse } from "axios";
import { ISeeds } from "@/ts/interfaces/seeds.interfaces";
import CategoriesFilter from "@/features/FindApps/components/CategoriesFilter/CategoriesFilter";

export const getSeeds = async () => {
  return await axios
    .get<{}, AxiosResponse<ISeeds>>("http://localhost:80/seeds")
    .then(({ data }) => data);
};

const page = async () => {
  const seeds = await getSeeds();

  return (
    <PageWrapper>
      <FindAppsSearch locations={seeds.locations} />
      <CategoriesFilter categories={seeds.categories} />
    </PageWrapper>
  );
};

export default page;
