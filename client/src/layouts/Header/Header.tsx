import React from "react";
import classes from "./Header.module.scss";
import Navigation from "@/layouts/Header/Navigation/Navigation";
import { animated, useSpring } from "@react-spring/web";

const Header = () => {
	const [props, api] = useSpring(() => ({
		from: { y: -200, opacity: 0 },
		to: { y: 0, opacity: 1 },
	}));

	return (
		<animated.div className={classes.container} style={props}>
			<p className={classes.app_name}>TripApps</p>
			<Navigation />
		</animated.div>
	);
};

export default Header;
