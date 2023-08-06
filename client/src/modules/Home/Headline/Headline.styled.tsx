import styled, { keyframes } from "styled-components";
import { animated } from "@react-spring/web";

const Container = styled.section`
  height: calc(100vh - 75px);
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: 1fr;
`;

const TravellingManKeyframe = keyframes({
  from: { transform: "translateY(0)" },
  to: { transform: "translateY(-1.5em)" },
});

const TravellingMan = styled(animated.div)`
  display: grid;
  place-items: center;
  animation-name: ${TravellingManKeyframe};
  animation-direction: alternate;
  animation-duration: 1s;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
`;

export const S = { TravellingMan, Container };
