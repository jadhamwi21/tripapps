import React, { ComponentProps, FunctionComponent } from "react";
import { S } from "@/pages/Home/Categories/Categories.styled";
import CategoryItem from "@/pages/Home/Categories/CategoryItem";
import {
  faCar,
  faCartShopping,
  faHandshake,
  faHeart,
  faTruck,
} from "@fortawesome/free-solid-svg-icons";

type Props = {};

export const CATEGORIES_ICONS: ComponentProps<typeof CategoryItem>[] = [
  { name: "Transportation", icon: faCar },
  { name: "Shopping", icon: faCartShopping },
  { name: "Government", icon: faHandshake },
  { name: "Delivery", icon: faTruck },
  { name: "Dating", icon: faHeart },
];
const Categories: FunctionComponent<Props> = () => {
  return (
    <S.Container>
      {CATEGORIES_ICONS.map((categoryProps, index) => (
        <CategoryItem {...categoryProps} key={categoryProps.name} />
      ))}
    </S.Container>
  );
};

export default Categories;
