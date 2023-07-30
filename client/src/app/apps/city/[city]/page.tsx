import React from "react";
import PageWrapper from "@/components/PageWrapper/PageWrapper";
import { getSeeds } from "@/api/seeds";
import FindAppsSearch from "@/features/FindApps/components/Search/FindAppsSearch";
import CategoriesFilter from "@/features/FindApps/components/CategoriesFilter/CategoriesFilter";
import AppsList from "@/features/FindApps/components/AppsList/AppsList";
import { getCityApps } from "@/api/apps";
import { fixParams } from "@/utils/utils";

export const generateStaticParams = async () => {
  const seeds = await getSeeds();

  return Object.values(seeds.locations).flat();
};

interface Props {
  params: { city: string };
}

const page = async ({ params }: Props) => {
  const paramsFixed = fixParams(params);
  const seeds = await getSeeds();
  const apps = await getCityApps(paramsFixed.city);
  return (
    <PageWrapper>
      <FindAppsSearch
        locations={seeds.locations}
        initialCity={paramsFixed.city}
      />
      <CategoriesFilter categories={seeds.categories} />
      <AppsList apps={apps} />
    </PageWrapper>
  );
};

export default page;
