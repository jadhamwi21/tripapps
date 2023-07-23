import styled from "styled-components";

const Grid = styled.section`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1em;
  padding: 2em;
  place-items: center;
  width: 100%;
  height: 100%;
`;

export const S = { Grid };
