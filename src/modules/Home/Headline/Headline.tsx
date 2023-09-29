"use client";
import React, { useEffect, useState } from "react";
import classes from "./Headline.module.scss";
import HeadlineContent from "@/modules/Home/Headline/Content/HeadlineContent";
import TravellingManImage from "@/../public/travelling_man.png";

import Image from "next/image";

const Headline = () => {
	const [opacity, setOpacity] = useState(0);
	useEffect(() => {
		setTimeout(() => {
			setOpacity(1);
		}, 200);
	}, []);
	return (
		<div className={classes.container}>
			<HeadlineContent />
			<div className={classes.travelling_man} style={{ opacity }}>
				<Image
					priority
					src={TravellingManImage}
					alt={"travelling_man"}
					height={400}
				/>
			</div>
		</div>
	);
};

export default Headline;
