import styled from "styled-components";
import { animated } from "@react-spring/web";

const Container = styled.section`
  height: 70vh;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: 1fr;
`;

const TravellingMan = styled(animated.div)`
  align-self: flex-end;
`;

export const S = { TravellingMan, Container };
