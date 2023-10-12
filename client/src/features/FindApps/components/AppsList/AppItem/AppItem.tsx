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
				{!_.isUndefined(app.image) && (
					<Image
						className={classes.image}
						src={app.image!}
						height={60}
						width={60}
						alt={`${app.name}-icon`}
					/>
				)}
				<p className={classes.app_name}>{app.name}</p>
				<div className={classes.text}>
					<a href={app.link} target="_blank" className={classes.link}>
						View
					</a>
				</div>
			</div>
		</div>
	);
};

export default AppItem;
