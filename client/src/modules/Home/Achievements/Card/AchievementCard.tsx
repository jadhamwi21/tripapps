import React, { FunctionComponent } from "react";
import { S } from "./AchievementCard.styled";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface OwnProps {}

type Props = { children: React.ReactNode; icon: IconDefinition };

const AchievementCard: FunctionComponent<Props> = ({ children, icon }) => {
  return (
    <S.Container>
      <S.Children>
        <S.Icon>
          <FontAwesomeIcon icon={icon} size={"2x"} />
        </S.Icon>
        <S.Content>{children}</S.Content>
      </S.Children>
    </S.Container>
  );
};

export default AchievementCard;
