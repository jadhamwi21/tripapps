import styled from "styled-components";
import { animated } from "@react-spring/web";

const Container = styled(animated.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin: 1em auto;
  gap: 1em;
`;

const CitySelectAnimatedDiv = styled(animated.div)`
  width: fit-content;
  height: fit-content;
  margin: 0 auto;
`;

const FiltersContainer = styled.div`
  display: grid;
  grid-template-rows: repeat(2, 0.5fr);
  height: 30vh;
  width: 50vw;
  gap: 0.5em;
  margin: 1em auto;

  & > div {
    height: 100%;
    width: 100%;
  }
`;

const AvailableCategoriesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  align-items: center;
`;

const SelectedCategoriesContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 0.5em;
`;

export const S = {
  FiltersContainer,
  AvailableCategoriesContainer,
  SelectedCategoriesContainer,
  Container,
  CitySelectAnimatedDiv,
};
