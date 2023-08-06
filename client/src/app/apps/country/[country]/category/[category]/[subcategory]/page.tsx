import React from "react";
import PageWrapper from "@/components/PageWrapper/PageWrapper";
import { getSeeds } from "@/api/seeds";
import FindAppsSearch from "@/features/FindApps/components/Search/FindAppsSearch";
import AppsList from "@/features/FindApps/components/AppsList/AppsList";
import { getCountryAppsInCategoryAndSubcategory } from "@/api/apps";
import { fixParams } from "@/utils/utils";

export const generateStaticParams = async () => {
  const seeds = await getSeeds();
  return Object.values(seeds.categories).flat();
};

interface Props {
  params: { category: string; country: string; subcategory: string };
}

const page = async ({ params }: Props) => {
  const paramsFixed = fixParams(params);
  const seeds = await getSeeds();
  const apps = await getCountryAppsInCategoryAndSubcategory(
    paramsFixed.country,
    paramsFixed.category,
    paramsFixed.subcategory,
  );

  return (
    <PageWrapper>
      <FindAppsSearch
        seeds={seeds}
        initials={{
          initialCountry: paramsFixed.country,
          initialCategory: paramsFixed.category,
          initialSubcategory: paramsFixed.subcategory,
        }}
      />
      <AppsList apps={apps} />
    </PageWrapper>
  );
};

export default page;
