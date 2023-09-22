import React, { FunctionComponent } from "react";
import classes from "./About.module.scss";

interface OwnProps {}

type Props = { content: string };

const About: FunctionComponent<Props> = ({ content }) => {
	const lines = content.split("\n");
	const jsxElements = lines.map((line, index) => (
		<React.Fragment key={index}>
			{line}
			{index !== lines.length - 1 && <br />}
		</React.Fragment>
	));
	return <p className={classes.text}>{jsxElements}</p>;
};

export default About;
