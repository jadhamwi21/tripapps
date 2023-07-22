import React from "react";
import { S } from "@/layouts/Header/Header.styled";
import Navigation from "@/layouts/Header/Navigation/Navigation";
import { useSpring } from "@react-spring/web";

const Header = () => {
  const [props, api] = useSpring(() => ({
    from: { y: -200, opacity: 0 },
    to: { y: 0, opacity: 1 },
  }));

  return (
    <S.Container style={props}>
      <S.AppName>TripApps</S.AppName>
      <Navigation />
    </S.Container>
  );
};

export default Header;
