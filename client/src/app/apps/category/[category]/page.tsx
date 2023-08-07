import React from "react";
import PageWrapper from "@/components/PageWrapper/PageWrapper";
import FindAppsSearch from "@/features/FindApps/components/Search/FindAppsSearch";
import AppsList from "@/features/FindApps/components/AppsList/AppsList";
import { getSeeds } from "@/api/seeds";
import { getAppsInCategory } from "@/api/apps";
import { fixParams } from "@/utils/utils";

export const generateStaticParams = async () => {
  const seeds = await getSeeds();

  return Object.keys(seeds.categories).map((category) => ({
    category,
  }));
};

interface IProps {
  params: {
    category: string;
  };
}

const page = async ({ params }: IProps) => {
  console.log(params);
  const paramsFixed = fixParams(params);
  const seeds = await getSeeds();
  const apps = await getAppsInCategory(paramsFixed.category);

  return (
    <PageWrapper>
      <FindAppsSearch
        seeds={seeds}
        initials={{ initialCategory: paramsFixed.category }}
      />
      <AppsList apps={apps} />
    </PageWrapper>
  );
};

export default page;
