import { IApp } from "@/ts/interfaces/apps.interfaces";
import * as _ from "lodash";
import Image from "next/image";
import React, { FunctionComponent } from "react";
import classes from "./AppItem.module.css";

type Props = { app: IApp; style?: React.CSSProperties };

const AppItem: FunctionComponent<Props> = ({ app, style }) => {
	return (
		<div className={classes.card} style={style}>
			{!_.isUndefined(app.image) && (
				<Image
					className={classes.image}
					src={`/imageProxy?imageUrl=${app.image!}`}
					height={60}
					width={60}
					alt={`${app.name}-icon`}
				/>
			)}
			<p className={classes.app_name}>{app.name}</p>
			<div className={classes.text}>
				<a href={app.link} target="_blank" className={classes.link}>
					Download
				</a>
			</div>
		</div>
	);
};

export default AppItem;
