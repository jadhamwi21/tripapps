import styled from "styled-components";

const ListItem = styled.li`
  color: rgba(255, 255, 255, 0.6);
  font-size: 14px;
  cursor: pointer;
  transition: all 0.12s ease;
  list-style: none;

  &:hover {
    color: var(--yellow);
  }
`;

export const S = { ListItem };