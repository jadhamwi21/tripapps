import styled from "styled-components";
import { animated } from "@react-spring/web";
import { ReactSVG } from "react-svg";

const Container = styled(animated.div)`
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
  transition: all 0.15s ease;

  &:hover {
    transform: translateY(-5px);
    background-color: rgba(0, 0, 0, 0.2);
  }
`;

const Name = styled.p`
  color: var(--grey);
`;

const FlagIcon = styled(ReactSVG)`
  height: 35px;
  width: 35px;
`;

const CategoryIcon = styled(ReactSVG)`
  height: 35px;
  width: 35px;

  & svg {
    fill: var(--yellow);
  }
`;

export const S = { Container, Name, CategoryIcon, FlagIcon };
