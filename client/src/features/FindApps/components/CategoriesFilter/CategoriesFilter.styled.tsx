import styled from "styled-components";
import { animated } from "@react-spring/web";

const Container = styled(animated.div)`
  display: grid;
  grid-template-columns: 0.2fr 0.8fr;
  height: 30vh;

  gap: 0.5em;
  margin: 1em;

  & > div {
    height: 100%;
    width: 100%;
  }
`;

const AvailableCategoriesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  align-items: center;
  border-left: solid 1px rgba(255, 255, 255, 0.2);
  padding-left: 1.5em;
`;

const SelectedCategoriesContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 0.5em;
`;

export const S = {
  Container,
  AvailableCategoriesContainer,
  SelectedCategoriesContainer,
};
