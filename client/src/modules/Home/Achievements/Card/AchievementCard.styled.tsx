import styled from "styled-components";

const Container = styled.div`
  height: 300px;
  width: 250px;
  border-radius: 4px;
  padding: 1em;
  background-color: transparent;
  border: solid 1px var(--yellow);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

const Title = styled.h2`
  color: var(--yellow);
`;

const Children = styled.div`
  color: var(--yellow);
`;

const Icon = styled.div`
  margin: 1em auto;
  width: fit-content;
`;

const Content = styled.p`
  font-size: 14px;
  color: var(--grey);
`;

export const S = { Container, Title, Children, Icon, Content };
