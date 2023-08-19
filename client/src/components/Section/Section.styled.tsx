import styled from "styled-components";

const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
`;

const Title = styled.h4`
  color: var(--yellow);
  text-align: center;
`;

export const S = { Container, Title };
