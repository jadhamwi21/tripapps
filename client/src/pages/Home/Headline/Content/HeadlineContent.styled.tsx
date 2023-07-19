import styled from "styled-components";
import { animated } from "@react-spring/web";

const Container = styled.div`
  display: grid;
  place-items: center;
`;

const Flexbox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 80%;
`;

const YellowText = styled.span`
  color: var(--yellow);
`;

const ContentHeader = styled(animated.p)`
  color: var(--grey);
  font-size: 1.5em;
`;

const ContentBody = styled(animated.p)`
  padding: 1em 0;
  color: var(--grey);
  font-size: 1em;
`;

export const S = {
  Container,
  YellowText,
  ContentBody,
  ContentHeader,
  Flexbox,
};
