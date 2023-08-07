import React, { FunctionComponent } from "react";
import { S } from "./Section.styled";

interface OwnProps {}

type Props = { children: React.ReactNode; title: string };

const Section: FunctionComponent<Props> = ({ children, title }) => {
  return (
    <S.Container>
      <S.Title>{title}</S.Title>
      {children}
    </S.Container>
  );
};

export default Section;
