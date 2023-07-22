import styled from "styled-components";
import { animated } from "@react-spring/web";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  position: relative;
  gap: 0.5em;
  width: 100%;
  max-width: 250px;
  min-width: 100px;
  font-size: 15px;
  user-select: none;
`;

const Label = styled.p`
  margin: 0;

  color: var(--grey);
  padding-left: 0.2em;
`;

const Field = styled.div`
  border: none;
  background-color: var(--light-black);
  color: var(--grey);
  outline: none;
  padding: 0.5em;
  width: 100%;
  height: 30px;
  border-radius: 0.2em;
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const List = styled(animated.ul)`
  background-color: var(--light-black);
  position: absolute;
  top: 100%;
  list-style: none;
  border-radius: 0.2em;
  width: 100%;
  height: fit-content;
  user-select: none;
  gap: 0.2em;
  max-height: 150px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.2em 0.5em;
  z-index: 5;
`;

const ListItem = styled.li`
  color: var(--grey);
  padding: 0.5em;
  display: block;
  width: 100%;

  &:hover {
    cursor: pointer;
    background-color: var(--yellow);
    color: var(--black);
  }
`;

const ToggleContainer = styled.div`
  position: absolute;
  top: 50%;
  right: 4%;
  transform: translateY(-50%) translateX(4%);
`;

export const S = { Container, Label, Field, List, ListItem, ToggleContainer };
