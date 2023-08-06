"use client";
import React, { FunctionComponent } from "react";
import { S } from "@/layouts/Footer/Footer.styled";
import FooterList from "@/layouts/Footer/List/FooterList";
import { getSeeds } from "@/api/seeds";

interface OwnProps {}

type Props = {};

const Footer: FunctionComponent<Props> = async (props) => {
  const seeds = await getSeeds();
  const mainCategories = Object.keys(seeds.categories);
  return (
    <S.Container>
      <FooterList
        name={"Categories"}
        list={mainCategories.map((category) => ({
          name: category,
          route: `/apps/category/${category}`,
        }))}
      />
      {/*<S.Separator />*/}
      {/*<FooterItem name={"Home"} route={"/"} />*/}
    </S.Container>
  );
};

export default Footer;
