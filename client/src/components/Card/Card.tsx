import React, { FunctionComponent } from "react";
import classes from "./Card.module.scss";
import { useRouter } from "next/navigation";
import AnimationOnScroll from "@/components/AnimationOnScroll/AnimationOnScroll";
import { ReactSVG } from "react-svg";

type Props = {
	name: string;
	onClick?: () => void;
	icon: string;
	type: "flag" | "category";
};

const Card: FunctionComponent<Props> = ({ name, icon, onClick, type }) => {
	const router = useRouter();
	return (
		<AnimationOnScroll>
			<div className={classes.container} onClick={onClick}>
				{icon && type === "flag" ? (
					<ReactSVG className={classes.flag} src={icon} />
				) : (
					<ReactSVG src={icon} className={classes.category} />
				)}
				<p className={classes.name}>{name}</p>
			</div>
		</AnimationOnScroll>
	);
};

export default Card;
