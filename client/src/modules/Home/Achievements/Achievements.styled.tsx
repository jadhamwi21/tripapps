import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  gap: 1em;
  width: 100%;
  height: 50vh;
  margin-bottom: 4em;
`;

const Highlight = styled.span`
  color: var(--yellow);
`;

export const S = { Container, Highlight };
