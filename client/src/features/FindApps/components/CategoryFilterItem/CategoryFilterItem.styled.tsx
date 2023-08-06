import styled from "styled-components";
import { animated } from "@react-spring/web";

const Container = styled(animated.div)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 0.5em;
  color: var(--grey);
  font-size: 15px;
  transition: all 0.2s ease;
  height: fit-content;
  background-color: var(--light-black);
  padding: 0.5em 1em;
  width: 100%;
  max-width: 200px;
  flex: 1;
  border-radius: 4px;

  &:hover {
    cursor: pointer;
    color: var(--yellow);
  }
`;

const IconContainer = styled.div`
  height: 15px;
  width: 15px;

  & svg {
    fill: var(--yellow) !important;
  }
`;

export const S = { Container, IconContainer };
