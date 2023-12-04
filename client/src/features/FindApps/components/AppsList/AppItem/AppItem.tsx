"use client";
import { IApp } from "@/ts/interfaces/apps.interfaces";
import * as _ from "lodash";
import Image from "next/image";
import React, { FunctionComponent, useState } from "react";
import classes from "./AppItem.module.css";
import Button from "@/components/Button/Button";
import { Rating } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import ReviewModal from "../ReviewModal/ReviewModal";

type Props = {
	app: IApp;
	style?: React.CSSProperties;
};

const AppItem: FunctionComponent<Props> = ({ app, style }) => {
	const [opened, setOpened] = useState(false);
	const [appState, setAppState] = useState(app);
	return (
		<div className={classes.card} style={style}>
			{!_.isUndefined(appState.image) && (
				<div className={classes.image}>
					<Image
						className={classes.image}
						src={`/imageProxy?imageUrl=${appState.image!}`}
						height={60}
						width={60}
						alt={`${appState.name}-icon`}
					/>
				</div>
			)}
			<p className={classes.app_name}>
				{appState.name.replaceAll("&amp;", "&")}
			</p>
			<Rating
				value={appState.score}
				size="small"
				readOnly
				emptyIcon={
					<StarIcon style={{ color: "var(--grey)" }} fontSize="inherit" />
				}
				precision={0.5}
			/>
			<div
				className={classes.write_review_text}
				onClick={() => setOpened(true)}
			>
				Write a review
			</div>
			<div className={classes.text}>
				<Button variant="primary">
					<a href={appState.link} target="_blank" className={classes.link}>
						Download
					</a>
				</Button>
			</div>
			<ReviewModal
				reviews={appState.reviews}
				opened={opened}
				closeHandler={() => setOpened(false)}
				appId={appState.id}
				updateApp={(app: Partial<IApp>) =>
					setAppState((prev) => ({ ...prev, ...app }))
				}
			/>
		</div>
	);
};

export default AppItem;
