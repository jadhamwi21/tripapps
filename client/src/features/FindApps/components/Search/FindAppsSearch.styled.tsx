import styled from "styled-components";
import { animated } from "@react-spring/web";

const Container = styled(animated.div)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  max-width: 250px;
  margin: 1em auto;
  gap: 1em;
`;

const CitySelectAnimatedDiv = styled(animated.div)`
  width: 100%;
  height: fit-content;
`;

export const S = { Container, CitySelectAnimatedDiv };
