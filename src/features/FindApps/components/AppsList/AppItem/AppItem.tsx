import React, { FunctionComponent } from "react";
import { IApp } from "@/ts/interfaces/apps.interfaces";
import classes from "./AppItem.module.css";
import { Rating } from "@mui/material";
import * as _ from "lodash";
import { abbreviateNumber } from "js-abbreviation-number";
import Image from "next/image";

type Props = { app: IApp; style?: React.CSSProperties };

const AppItem: FunctionComponent<Props> = ({ app, style }) => {
	return (
		<div style={style}>
			<div className={classes.card}>
				{!_.isUndefined(app.icon) && (
					<Image
						className={classes.image}
						src={app.icon!}
						height={60}
						width={60}
						alt={`${app.name}-icon`}
					/>
				)}
				<p className={classes.app_name}>{app.name}</p>
				<div className={classes.text}>
					{!_.isUndefined(app.score) && (
						<Rating value={app.score} readOnly size={"small"} precision={0.5} />
					)}
					{!_.isUndefined(app.downloads) && (
						<div className={classes.downloads}>Downloads : {app.downloads}</div>
					)}
					{!_.isUndefined(app.ratings) && (
						<div className={classes.ratings}>
							Ratings : {abbreviateNumber(app.ratings)}
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default AppItem;
