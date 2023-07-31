import React, { FunctionComponent } from "react";
import { S } from "@/layouts/Header/Navigation/Navigation.styled";
import { usePathname } from "next/navigation";

const linkSelectedChecker =
  (currentRoute: string) =>
  (linkRoute: string, partial = false) =>
    !partial ? currentRoute === linkRoute : currentRoute.startsWith(linkRoute);

type Props = {};

const Navigation: FunctionComponent<Props> = (props) => {
  const pathname = usePathname();
  const isLinkSelected = linkSelectedChecker(pathname!);
  return (
    <S.NavigationsContainer>
      <S.NavigationItem $selected={isLinkSelected("/")} href={"/"}>
        Home
      </S.NavigationItem>
      <S.NavigationItem
        $selected={isLinkSelected("/apps", true)}
        href={"/apps"}
      >
        Find Apps
      </S.NavigationItem>
      <S.NavigationItem $selected={isLinkSelected("/about")} href={"/about"}>
        About
      </S.NavigationItem>
    </S.NavigationsContainer>
  );
};

export default Navigation;
