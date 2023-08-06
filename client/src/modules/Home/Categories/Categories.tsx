import React, { FunctionComponent } from "react";
import { S } from "@/modules/Home/Categories/Categories.styled";
import CategoryItem from "@/modules/Home/Categories/CategoryItem";

type Props = {
  categories: string[];
};

const Categories: FunctionComponent<Props> = ({ categories }: Props) => {
  return (
    <S.Container>
      {categories.map((category) => (
        <CategoryItem name={category} key={category} />
      ))}
    </S.Container>
  );
};

export default Categories;
