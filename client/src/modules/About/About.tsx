"use client";
import React, { FunctionComponent } from "react";
import { S } from "./About.styled";

interface OwnProps {}

type Props = { content: string };

const About: FunctionComponent<Props> = ({ content }) => {
  const lines = content.split("\n");
  const jsxElements = lines.map((line, index) => (
    <React.Fragment key={index}>
      {line}
      {index !== lines.length - 1 && <br />}
    </React.Fragment>
  ));
  return <S.Text>{jsxElements}</S.Text>;
};

export default About;
