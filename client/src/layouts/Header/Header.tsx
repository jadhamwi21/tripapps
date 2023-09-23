import React from "react";
import classes from "./Header.module.scss";
import Navigation from "@/layouts/Header/Navigation/Navigation";
import Link from "next/link";

const Header = () => {
	return (
		<div className={classes.container}>
			<Link href={"/"}>
				<p className={classes.app_name}>TripApps</p>
			</Link>
			<Navigation />
		</div>
	);
};

export default Header;
