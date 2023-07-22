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
  width: fit-content;
  transition: all 0.2s ease;
  height: fit-content;

  &:hover {
    cursor: pointer;
    color: var(--yellow);
  }
`;

const SelectBox = styled.div<{ $checked: boolean }>`
  height: 10px;
  width: 10px;
  border-radius: 2px;
  border: solid 1px var(--yellow);

  background-color: ${({ $checked }) =>
    $checked ? "var(--yellow)" : "transparent"};
  display: grid;
  place-items: center;
`;

export const S = { Container, SelectBox };
