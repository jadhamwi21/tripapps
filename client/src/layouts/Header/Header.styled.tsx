import styled from "styled-components";
import Link from "next/link";

const Container = styled.header`
  background-color: transparent;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 2em;
  height: 75px;
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
