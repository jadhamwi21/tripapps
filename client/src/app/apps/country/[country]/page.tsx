import React from "react";
import PageWrapper from "@/components/PageWrapper/PageWrapper";
import { getSeeds } from "@/api/seeds";
import FindAppsSearch from "@/features/FindApps/components/Search/FindAppsSearch";
import AppsList from "@/features/FindApps/components/AppsList/AppsList";
import { getCountryApps } from "@/api/apps";
import { fixParams } from "@/utils/utils";

export const generateStaticParams = async () => {
  const seeds = await getSeeds();

  return Object.keys(seeds.locations).map((country) => ({
    country,
  }));
};

interface Props {
  params: { country: string };
}

const page = async ({ params }: Props) => {
  const paramsFixed = fixParams(params);
  const seeds = await getSeeds();
  const apps = await getCountryApps(paramsFixed.country);
  return (
    <PageWrapper>
      <FindAppsSearch
        seeds={seeds}
        initials={{ initialCountry: paramsFixed.country }}
      />
      <AppsList apps={apps} isPortfolio />
    </PageWrapper>
  );
};

export default page;
