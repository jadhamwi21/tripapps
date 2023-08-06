import styled from "styled-components";

const Container = styled.footer`
  height: 200px;
  width: 100%;
  background-color: var(--black);
  color: var(--yellow);
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  border-top: solid 1px var(--light-black);
  padding: 0 2em;
  gap: 1em;
`;
const Separator = styled.div`
  height: 90%;
  width: 1px;
  background-color: var(--light-black);
  margin: 0 2em;
`;

export const S = {
  Container,
  Separator,
};
