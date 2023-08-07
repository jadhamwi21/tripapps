import React, { FunctionComponent } from "react";
import { S } from "./Card.styled";
import { useRouter } from "next/navigation";
import AnimationOnScroll from "@/components/AnimationOnScroll/AnimationOnScroll";

type Props = {
  name: string;
  onClick?: () => void;
  icon: string;
  type: "flag" | "category";
};

const Card: FunctionComponent<Props> = ({ name, icon, onClick, type }) => {
  const router = useRouter();
  return (
    <AnimationOnScroll>
      <S.Container onClick={onClick}>
        {icon && type === "flag" ? (
          <S.FlagIcon src={icon} />
        ) : (
          <S.CategoryIcon src={icon} />
        )}
        <S.Name>{name}</S.Name>
      </S.Container>
    </AnimationOnScroll>
  );
};

export default Card;
