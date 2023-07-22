import styled from "styled-components";
import { animated } from "@react-spring/web";

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
`;

const CategoryName = styled.p`
  color: var(--grey);
`;

export const S = { Container, CategoryContainer, CategoryName };
