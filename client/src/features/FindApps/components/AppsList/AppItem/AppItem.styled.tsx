import styled from "styled-components";
import Image from "next/image";

const Card = styled.div`
  background-color: var(--light-black);
  color: var(--grey);
  height: 300px;
  width: 250px;
  border-radius: 5px;
  padding: 1em;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 0.5em;
`;

const AppIcon = styled(Image)`
  border-radius: 5px;
`;

const TextContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5em;
`;

const AppName = styled.p`
  width: 100%;
  color: var(--grey);
  font-weight: 500;
  font-size: 16px;

  text-align: center;
`;

const Downloads = styled.p`
  font-size: 12px;
  color: var(--grey);
  opacity: 0.8;
`;
const Ratings = styled.p`
  font-size: 12px;
  color: var(--blue);
`;

export const S = { Card, AppIcon, AppName, Downloads, Ratings, TextContainer };
