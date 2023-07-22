import styled from "styled-components";
import { animated } from "@react-spring/web";

const Container = styled.section`
  height: calc(100vh - 75px);
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: 1fr;
`;

const TravellingMan = styled(animated.div)`
  display: grid;
  place-items: center;
`;

export const S = { TravellingMan, Container };
