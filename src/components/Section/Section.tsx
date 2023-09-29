import React, { FunctionComponent } from "react";
import classes from "./Section.module.scss";

interface OwnProps {}

type Props = { children: React.ReactNode; title: string };

const Section: FunctionComponent<Props> = ({ children, title }) => {
	return (
		<div className={classes.container}>
			<p className={classes.title}>{title}</p>
			{children}
		</div>
	);
};

export default Section;
