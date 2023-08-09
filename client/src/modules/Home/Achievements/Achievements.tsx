import React, { FunctionComponent } from "react";
import { S } from "./Achievements.styled";
import AchievementCard from "@/modules/Home/Achievements/Card/AchievementCard";
import {
  faCubes,
  faFlag,
  faLayerGroup,
} from "@fortawesome/free-solid-svg-icons";
import CountUp from "react-countup";
import AnimationOnScroll from "@/components/AnimationOnScroll/AnimationOnScroll";

interface OwnProps {}

type Props = {
  categoriesSize: number;
  appsSize: number;
  countriesSize: number;
  citiesSize: number;
};

const Achievements: FunctionComponent<Props> = ({
  appsSize,
  categoriesSize,
  citiesSize,
  countriesSize,
}) => {
  return (
    <AnimationOnScroll>
      {(inView) => (
        <S.Container>
          <AchievementCard icon={faCubes}>
            we have came up with a rich database, with over
            <S.Highlight>
              {inView && <CountUp end={appsSize} />}
            </S.Highlight>{" "}
            distinctive apps!
          </AchievementCard>{" "}
          <AchievementCard icon={faLayerGroup}>
            with{" "}
            <S.Highlight>
              {inView && <CountUp end={categoriesSize} />}
            </S.Highlight>{" "}
            categories for you to explore. From transportation, to delivery, to
            shopping, to find exactly what you need.
          </AchievementCard>
          <AchievementCard icon={faFlag}>
            we have gathered apps for{" "}
            <S.Highlight>
              {inView && <CountUp end={countriesSize} />}
            </S.Highlight>{" "}
            countries and{" "}
            <S.Highlight>{inView && <CountUp end={citiesSize} />}</S.Highlight>{" "}
            cities, allowing you to pick the right appropriate application for
            your need, that people use in these locations.
          </AchievementCard>
        </S.Container>
      )}
    </AnimationOnScroll>
  );
};

export default Achievements;
