"use client";
import { FunctionComponent } from "react";
import { ReactSVG } from "react-svg";
import classes from "./Card.module.scss";

type Props = {
	name: string;
	onClick?: () => void;
	icon: string;
	type: "flag" | "category";
};

const Card: FunctionComponent<Props> = ({ name, icon, onClick, type }) => {
	return (
		<div className={classes.container} onClick={onClick}>
			{icon && type === "flag" ? (
				<ReactSVG className={classes.flag} src={icon} />
			) : (
				<ReactSVG src={icon} className={classes.category} />
			)}
			<p className={classes.name}>{name}</p>
		</div>
	);
};

export default Card;
