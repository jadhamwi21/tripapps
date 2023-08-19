import styled from "styled-components";

const Container = styled.div`
  margin-bottom: 1em;
`;

const Grid = styled.section`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1em;
  padding: 2em;
  place-items: center;
  width: 100%;
  height: 100%;
`;

const Keyword = styled.h4`
  color: var(--yellow);
  text-align: center;

  margin: 1.5em;
`;

const KeywordFlexbox = styled.section`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin: 0 auto;
  width: fit-content;
`;

const IconContainer = styled.div`
  margin: 1em;
  color: var(--yellow);
  cursor: pointer;
  height: fit-content;
  width: fit-content;
  border-radius: 8px;
  padding: 0.25em;
  transition: all 0.2s ease;
`;

export const S = { Grid, Keyword, KeywordFlexbox, Container, IconContainer };
