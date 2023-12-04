"use client";
import { Fade as Hamburger } from "hamburger-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import navstyles from "../Navigation.module.scss";
import styles from "./Menu.module.scss";

type Props = {
	isLinkSelected: (linkRoute: string, partial?: boolean) => boolean;
};

const Menu = ({ isLinkSelected }: Props) => {
	const [toggled, setToggled] = useState(false);
	const pathname = usePathname();
	useEffect(() => {
		setToggled(false);
	}, [pathname]);
	return (
		<>
			<div className={styles.hamburger}>
				<Hamburger
					toggled={toggled}
					onToggle={setToggled}
					color="var(--grey)"
				/>
			</div>
			<nav
				className={
					toggled ? [styles.nav, styles.toggled].join(" ") : styles.nav
				}
			>
				<Link
					className={
						isLinkSelected("/")
							? [navstyles.nav_item, navstyles.selected].join(" ")
							: navstyles.nav_item
					}
					href={"/"}
				>
					Home
				</Link>
				<Link
					className={
						isLinkSelected("/apps", true)
							? [navstyles.nav_item, navstyles.selected].join(" ")
							: navstyles.nav_item
					}
					href={"/apps"}
				>
					Find Apps
				</Link>
				<Link
					className={
						isLinkSelected("/about")
							? [navstyles.nav_item, navstyles.selected].join(" ")
							: navstyles.nav_item
					}
					href={"/about"}
				>
					About
				</Link>
			</nav>
		</>
	);
};

export default Menu;
