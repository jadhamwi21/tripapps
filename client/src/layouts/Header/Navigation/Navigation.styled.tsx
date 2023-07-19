import styled from "styled-components";
import Link from "next/link";

const NavigationsContainer = styled.nav`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 30%;
`;

const NavigationItem = styled(Link)<{ $selected: boolean }>`
  transition: all 0.2s ease;
  color: ${({ $selected }) => ($selected ? "var(--yellow)" : "var(--grey)")};
  outline: none;
  text-decoration: none;
  font-weight: 300;
  border-bottom: solid 1px transparent;
  padding-bottom: 0.1em;
  pointer-events: ${({ $selected }) => ($selected ? "none" : "initial")};

  &:hover {
    border-bottom-color: ${({ $selected }) =>
      $selected ? "transparent" : "var(--grey)"};
    cursor: pointer;
  }
`;

export const S = { NavigationsContainer, NavigationItem };
