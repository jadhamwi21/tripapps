"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FunctionComponent } from "react";
import Menu from "./Menu/Menu";
import classes from "./Navigation.module.scss";
export const linkSelectedChecker =
	(currentRoute: string) =>
	(linkRoute: string, partial = false) =>
		!partial ? currentRoute === linkRoute : currentRoute.startsWith(linkRoute);

type Props = {};

const Navigation: FunctionComponent<Props> = (props) => {
	const pathname = usePathname();
	const isLinkSelected = linkSelectedChecker(pathname!);

	return (
		<>
			<Menu isLinkSelected={isLinkSelected} />

			<nav className={classes.nav}>
				<Link
					className={
						isLinkSelected("/")
							? [classes.nav_item, classes.selected].join(" ")
							: classes.nav_item
					}
					href={"/"}
				>
					Home
				</Link>
				<Link
					className={
						isLinkSelected("/apps", true)
							? [classes.nav_item, classes.selected].join(" ")
							: classes.nav_item
					}
					href={"/apps"}
				>
					Find Apps
				</Link>
				<Link
					className={
						isLinkSelected("/about")
							? [classes.nav_item, classes.selected].join(" ")
							: classes.nav_item
					}
					href={"/about"}
				>
					About
				</Link>
			</nav>
		</>
	);
};

export default Navigation;
