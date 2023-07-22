"use client";
import React from "react";
import Headline from "@/pages/Home/Headline/Headline";
import Categories from "@/pages/Home/Categories/Categories";
import PageWrapper from "@/components/PageWrapper/PageWrapper";

const HomePage = () => {
  return (
    <PageWrapper>
      <Headline />
      <Categories />
    </PageWrapper>
  );
};

export default HomePage;
