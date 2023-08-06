import React from "react";
import PageWrapper from "@/components/PageWrapper/PageWrapper";
import FindAppsSearch from "@/features/FindApps/components/Search/FindAppsSearch";
import AppsList from "@/features/FindApps/components/AppsList/AppsList";
import { getSeeds } from "@/api/seeds";
import { getAllApps } from "@/api/apps";

const page = async () => {
  const seeds = await getSeeds();
  const apps = await getAllApps();

  return (
    <PageWrapper>
      <FindAppsSearch seeds={seeds} />
      <AppsList apps={apps} />
    </PageWrapper>
  );
};

export default page;
