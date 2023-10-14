import React from "react";
import classes from "./HeadlineContent.module.scss";
import Button from "@/components/Button/Button";
import Link from "next/link";

const HeadlineContent = () => {
	return (
		<div className={classes.container}>
			<div className={classes.flexbox}>
				<div className={classes.content_header}>
					Pack your <span className={classes.yellow}>Apps</span> as you travel
					the world
				</div>
				<div className={classes.content_body}>
					with <span className={classes.yellow}>TripApps</span>, there is no
					hesitation in travelling the world, as you can{" "}
					<span className={classes.yellow}>
						discover popular apps used in many aspects
					</span>
					, with ease.
					<br />
					<Link href={"/apps"}>
						<Button variant={"primary"} styles={{ marginTop: "0.75em" }}>
							Start Packing
						</Button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default HeadlineContent;
