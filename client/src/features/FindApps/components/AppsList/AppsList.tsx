"use client";
import AppItem from "@/features/FindApps/components/AppsList/AppItem/AppItem";
import { IApp } from "@/ts/interfaces/apps.interfaces";
import React, { FunctionComponent, useMemo, useRef } from "react";
import Carousel from "react-bootstrap/Carousel";
import classes from "./AppsList.module.css";
type Props = { apps: IApp[]; isPortfolio?: boolean; category?: string };

const ITEM_SIZE = 300;

const AppsList: FunctionComponent<Props> = ({
	apps,
	isPortfolio = false,
	category,
}) => {
	const allKeywords = useMemo(() => {
		const keywords = Array.from(
			new Set(apps.map((app) => app.keywords).flat())
		);
		if (category) {
			keywords.splice(keywords.indexOf(category), 1);
			keywords.unshift(category);
			return keywords;
		}
		return keywords;
	}, []);
	return (
		<div className={classes.container}>
			{isPortfolio ? (
				allKeywords.map((keyword) => {
					const list = apps.filter((app) => app.keywords.includes(keyword));

					return (
						<React.Fragment key={keyword}>
							<div className={classes.keyword}>{keyword}</div>
							<div className={classes.keyword_flexbox}>
								<Carousel>
									{list.map((app) => (
										<AppItem app={app} key={app.id} />
									))}
								</Carousel>
							</div>
						</React.Fragment>
					);
				})
			) : (
				<div className={classes.grid}>
					{apps.map((app) => (
						<AppItem app={app} key={app.id} />
					))}
				</div>
			)}
		</div>
	);
};

export default AppsList;
