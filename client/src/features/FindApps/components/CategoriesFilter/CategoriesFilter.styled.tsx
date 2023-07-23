import styled from "styled-components";
import { animated } from "@react-spring/web";

const Container = styled(animated.div)`
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
  border-bottom: solid 1px rgba(255, 255, 255, 0.05);
`;

const AppliedFiltersText = styled.p`
  color: var(--grey);
  font-size: 14px;
`;

export const S = {
  Container,
  AvailableCategoriesContainer,
  SelectedCategoriesContainer,
  AppliedFiltersText,
};
