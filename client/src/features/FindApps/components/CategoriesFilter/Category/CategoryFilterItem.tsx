import React, { FunctionComponent } from "react";
import { S } from "@/features/FindApps/components/CategoriesFilter/Category/CategoryFilterItem.styled";
import { useSpring } from "@react-spring/web";

type Props = {
  name: string;
  onClick: (category: string) => void;
  checked?: boolean;
  animationDelay?: number;
};

const CategoryFilterItem: FunctionComponent<Props> = ({
  name,
  onClick,
  checked = false,
  animationDelay = 0,
}) => {
  const [springs] = useSpring(() => ({
    from: { opacity: 0, x: -5 },
    to: { opacity: 1, x: 0 },
    config: { duration: 1 },
    delay: animationDelay,
  }));
  return (
    <S.Container
      style={springs}
      onClick={() => {
        onClick(name);
      }}
    >
      <S.SelectBox $checked={checked} />
      <div>{name}</div>
    </S.Container>
  );
};

export default CategoryFilterItem;
