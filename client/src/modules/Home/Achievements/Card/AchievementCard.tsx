import React, { FunctionComponent } from "react";
import classes from "./AchievementCard.module.scss";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface OwnProps {}

type Props = { children: React.ReactNode; icon: IconDefinition };

const AchievementCard: FunctionComponent<Props> = ({ children, icon }) => {
	return (
		<div className={classes.container}>
			<div className={classes.children}>
				<div className={classes.icon}>
					<FontAwesomeIcon icon={icon} size={"2x"} />
				</div>
				<div className={classes.content}>{children}</div>
			</div>
		</div>
	);
};

export default AchievementCard;
