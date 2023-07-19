import React, { FunctionComponent } from "react";
import { S } from "@/layouts/Header/Header.styled";
import Navigation from "@/layouts/Header/Navigation/Navigation";

type Props = {};

const Header: FunctionComponent<Props> = (props) => {
  return (
    <S.Container>
      <S.AppName>TripApps</S.AppName>
      <Navigation />
    </S.Container>
  );
};

export default Header;
