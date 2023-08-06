import styled from "styled-components";

const ListItem = styled.li`
  color: var(--grey);
  font-size: 14px;
  cursor: pointer;
  transition: all 0.12s ease;
  list-style: none;

  &:hover {
    color: var(--yellow);
  }
`;

export const S = { ListItem };
