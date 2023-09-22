import React from "react";
import classes from "./Header.module.scss";
import Navigation from "@/layouts/Header/Navigation/Navigation";

const Header = () => {
	return (
		<div className={classes.container}>
			<p className={classes.app_name}>TripApps</p>
			<Navigation />
		</div>
	);
};

export default Header;
