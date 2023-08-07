"use client";
import React from "react";
import Headline from "@/modules/Home/Headline/Headline";
import Categories from "@/modules/Home/Categories/Categories";
import PageWrapper from "@/components/PageWrapper/PageWrapper";
import { getSeeds } from "@/api/seeds";
import Countries from "@/modules/Home/Countries/Countries";

const HomePage = async () => {
  const seeds = await getSeeds();
  return (
    <PageWrapper>
      <Headline />
      <Categories categories={Object.keys(seeds.categories)} />
      <Countries countries={Object.keys(seeds.locations)} />
    </PageWrapper>
  );
};

export default HomePage;
