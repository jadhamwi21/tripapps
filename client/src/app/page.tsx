"use client";
import React from "react";
import Headline from "@/modules/Home/Headline/Headline";
import Categories from "@/modules/Home/Categories/Categories";
import PageWrapper from "@/components/PageWrapper/PageWrapper";
import { getSeeds } from "@/api/seeds";

const HomePage = async () => {
  const seeds = await getSeeds();
  return (
    <PageWrapper>
      <Headline />
      <Categories categories={Object.keys(seeds.categories)} />
    </PageWrapper>
  );
};

export default HomePage;
