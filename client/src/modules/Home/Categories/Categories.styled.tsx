import styled from "styled-components";
import { animated } from "@react-spring/web";
import { ReactSVG } from "react-svg";

const Container = styled.section`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);
  padding: 2em;
`;

const CategoryContainer = styled(animated.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 4em;
  gap: 0.5em;
  border: solid 1px var(--yellow);
  border-radius: 4px;
  padding: 2em;
  cursor: pointer;
`;

const CategoryName = styled.p`
  color: var(--grey);
`;

const CategoryIcon = styled(ReactSVG)`
  height: 35px;
  width: 35px;

  & svg {
    fill: var(--yellow) !important;
  }
`;

export const S = { Container, CategoryContainer, CategoryName, CategoryIcon };
