import React, { FunctionComponent } from "react";
import classes from "./Button.module.scss";

type Props = {
	children: React.ReactNode;
	onClick?: () => void;
	variant: "primary" | "secondary";
	styles?: React.CSSProperties;
	disabled?: boolean;
};

const Button: FunctionComponent<Props> = ({
	styles,
	variant,
	children,
	onClick,
	disabled = false,
}) => {
	const buttonClasses = disabled
		? [classes.button, classes[variant], classes.disabled].join(" ")
		: [classes.button, classes[variant]].join(" ");
	return (
		<button onClick={onClick} className={buttonClasses} style={styles}>
			{children}
		</button>
	);
};

export default Button;
