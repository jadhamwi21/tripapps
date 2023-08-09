"use client";
import React from "react";
import Headline from "@/modules/Home/Headline/Headline";
import Categories from "@/modules/Home/Categories/Categories";
import PageWrapper from "@/components/PageWrapper/PageWrapper";
import { getSeeds } from "@/api/seeds";
import Countries from "@/modules/Home/Countries/Countries";
import Achievements from "@/modules/Home/Achievements/Achievements";
import { getAllApps } from "@/api/apps";

const HomePage = async () => {
  const seeds = await getSeeds();
  const apps = await getAllApps();
  const numberOfCategories = (() => {
    const { categories } = seeds;
    const mainCategories = Object.keys(categories);
    const subCategories = Object.values(categories).flat();
    return mainCategories.length + subCategories.length;
  })();
  const { countriesSize, citiesSize } = (() => {
    const { locations } = seeds;
    const countries = Object.keys(locations);
    const cities = Object.values(locations).flat();
    return { countriesSize: countries.length, citiesSize: cities.length };
  })();

  return (
    <PageWrapper>
      <Headline />
      <Achievements
        categoriesSize={numberOfCategories}
        appsSize={apps.length}
        countriesSize={countriesSize}
        citiesSize={citiesSize}
      />
      <Categories categories={Object.keys(seeds.categories)} />
      <Countries countries={Object.keys(seeds.locations)} />
    </PageWrapper>
  );
};

export default HomePage;
