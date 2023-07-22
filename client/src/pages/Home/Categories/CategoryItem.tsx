import React, { FunctionComponent } from "react";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { S } from "@/pages/Home/Categories/Categories.styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useInView } from "@react-spring/web";

type Props = {
  name: string;
  icon: IconProp;
};

const CategoryItem: FunctionComponent<Props> = ({ name, icon }) => {
  const [ref, springs] = useInView(
    () => ({
      from: {
        opacity: 0,
        y: 200,
      },
      to: {
        opacity: 1,
        y: 0,
      },
    }),
    {
      rootMargin: "100px",
    },
  );
  return (
    <S.CategoryContainer ref={ref} style={springs}>
      <FontAwesomeIcon icon={icon} size={"2x"} color={"var(--yellow)"} />
      <S.CategoryName>{name}</S.CategoryName>
    </S.CategoryContainer>
  );
};

export default CategoryItem;
