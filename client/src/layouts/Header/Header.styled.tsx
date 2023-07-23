import styled from "styled-components";
import Link from "next/link";
import { animated } from "@react-spring/web";

const Container = styled(animated.header)`
  background-color: var(--black);
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 2em;
  height: 75px;
  position: sticky;
  top: 0;
  width: 100%;
  z-index: 20;
`;

const AppName = styled.p`
  color: var(--yellow);
  user-select: none;
  font-size: 1.5em;
`;

const NavigationsContainer = styled.nav`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 30%;
`;

const NavigationItem = styled(Link)`
  color: red;
`;

export const S = { NavigationItem, Container, AppName, NavigationsContainer };
