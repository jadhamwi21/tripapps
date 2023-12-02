import { IApp } from "@/ts/interfaces/apps.interfaces";
import * as _ from "lodash";
import Image from "next/image";
import React, { FunctionComponent } from "react";
import classes from "./AppItem.module.css";
import Button from "@/components/Button/Button";
import { Rating } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";

type Props = { app: IApp; style?: React.CSSProperties };

const AppItem: FunctionComponent<Props> = ({ app, style }) => {
	return (
		<div className={classes.card} style={style}>
			{!_.isUndefined(app.image) && (
				<div className={classes.image}>
					<Image
						className={classes.image}
						src={`/imageProxy?imageUrl=${app.image!}`}
						height={60}
						width={60}
						alt={`${app.name}-icon`}
					/>
				</div>
			)}
			<p className={classes.app_name}>{app.name.replaceAll("&amp;", "&")}</p>
			<Rating
				value={app.score}
				size="small"
				readOnly
				emptyIcon={
					<StarIcon style={{ color: "var(--grey)" }} fontSize="inherit" />
				}
				precision={0.5}
			/>
			<div className={classes.write_review_text}>Write a review</div>
			<div className={classes.text}>
				<Button variant="primary">
					<a href={app.link} target="_blank" className={classes.link}>
						Download
					</a>
				</Button>
			</div>
		</div>
	);
};

export default AppItem;
