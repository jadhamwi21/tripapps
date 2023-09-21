import React from "react";
import classes from "./HeadlineContent.module.scss";
import Button from "@/components/Button/Button";
import { useRouter } from "next/navigation";
import { animated, useSpring } from "@react-spring/web";

const HeadlineContent = () => {
	const router = useRouter();
	const [contentHeaderSprings] = useSpring(
		() => ({
			from: { opacity: 0, translateX: -100 },
			to: { opacity: 1, translateX: 0 },
			config: { tension: 120 },
		}),
		[]
	);

	const [contentBodySprings] = useSpring(
		() => ({
			from: { opacity: 0, translateY: 100 },
			to: { opacity: 1, translateY: 0 },
			config: { tension: 120 },
		}),
		[]
	);
	return (
		<div className={classes.container}>
			<div className={classes.flexbox}>
				<animated.div
					className={classes.content_header}
					style={contentHeaderSprings}
				>
					Pack your <span className={classes.yellow}>Apps</span> as you travel
					the world
				</animated.div>
				<animated.div
					className={classes.content_body}
					style={contentBodySprings}
				>
					with <span className={classes.yellow}>TripApps</span>, there is no
					hesitation in travelling the world, as you can{" "}
					<span className={classes.yellow}>
						discover popular apps used in many aspects
					</span>
					, with ease.
					<Button
						variant={"primary"}
						onClick={() => router.push("/apps")}
						styles={{ marginTop: "0.75em" }}
					>
						Start Packing
					</Button>
				</animated.div>
			</div>
		</div>
	);
};

export default HeadlineContent;
