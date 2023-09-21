"use client";
import React from "react";
import classes from "./Headline.module.scss";
import HeadlineContent from "@/modules/Home/Headline/Content/HeadlineContent";
import TravellingManImage from "@/../public/travelling_man.png";
import { animated, useSpring } from "@react-spring/web";
import Image from "next/image";

const Headline = () => {
	const [travellingManSprings] = useSpring(
		() => ({
			from: { opacity: 0 },
			to: { opacity: 1 },
			config: { tension: 120 },
		}),
		[]
	);
	return (
		<div className={classes.container}>
			<HeadlineContent />
			<animated.div
				className={classes.travelling_man}
				style={travellingManSprings}
			>
				<Image
					priority
					src={TravellingManImage}
					alt={"travelling_man"}
					height={400}
				/>
			</animated.div>
		</div>
	);
};

export default Headline;
