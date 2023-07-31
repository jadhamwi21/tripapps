import React, { FunctionComponent } from "react";
import { S } from "@/features/FindApps/components/CategoryFilterItem/CategoryFilterItem.styled";
import { useSpring } from "@react-spring/web";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useIsFirstRender } from "usehooks-ts";

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
  const firstRender = useIsFirstRender();
  const [springs] = useSpring(() =>
    checked
      ? {
          from: { opacity: 0, x: -5 },
          to: { opacity: 1, x: 0 },
          config: { duration: 0.15 * 1000 },
          delay: animationDelay,
        }
      : {
          from: { opacity: 0 },
          to: { opacity: 1 },
          config: { duration: 0.15 * 1000 },

          delay: animationDelay,
        },
  );
  return (
    <S.Container
      style={springs}
      onClick={() => {
        onClick(name);
      }}
    >
      <S.IconContainer>
        <FontAwesomeIcon icon={checked ? faMinus : faPlus} />
      </S.IconContainer>
      <div>{name}</div>
    </S.Container>
  );
};

export default CategoryFilterItem;
