import styled from "styled-components";

const Container = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 0.2em;
`;

const Header = styled.p`
  color: var(--grey);
  font-size: 13px;
  font-weight: 600;
`;

const List = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 0.1em;
`;

export const S = { Container, Header, List };
