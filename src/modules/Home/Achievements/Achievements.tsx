import React, { FunctionComponent } from "react";
import classes from "./Achievements.module.scss";
import AchievementCard from "@/modules/Home/Achievements/Card/AchievementCard";
import {
	faCubes,
	faFlag,
	faLayerGroup,
} from "@fortawesome/free-solid-svg-icons";
import CountUp from "react-countup";

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
		<div className={classes.container}>
			<AchievementCard icon={faCubes}>
				we have came up with a rich database, with over
				<span className={classes.highlight}>{appsSize}</span> distinctive apps!
			</AchievementCard>{" "}
			<AchievementCard icon={faLayerGroup}>
				with <span className={classes.highlight}>{categoriesSize}</span>{" "}
				categories for you to explore. From transportation, to delivery, to
				shopping, to find exactly what you need.
			</AchievementCard>
			<AchievementCard icon={faFlag}>
				we have gathered apps for{" "}
				<span className={classes.highlight}>{countriesSize}</span> countries and{" "}
				<span className={classes.highlight}>{citiesSize}</span> cities, allowing
				you to pick the right appropriate application for your need, that people
				use in these locations.
			</AchievementCard>
		</div>
	);
};

export default Achievements;
