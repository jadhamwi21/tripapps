"use client";
import AppItem from "@/features/FindApps/components/AppsList/AppItem/AppItem";
import { IApp } from "@/ts/interfaces/apps.interfaces";
import React, { FunctionComponent, useMemo, useRef, useState } from "react";
import classes from "./AppsList.module.scss";
import { log } from "console";
type Props = { apps: IApp[]; isPortfolio?: boolean; category?: string };

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
	const [appsState, setAppsState] = useState(
		Object.fromEntries(apps.map((app) => [app.id, app]))
	);

	return (
		<div className={classes.container}>
			{isPortfolio ? (
				allKeywords.map((keyword) => {
					const list = apps.filter((app) => app.keywords.includes(keyword));

					return (
						<React.Fragment key={keyword}>
							<div className={classes.keyword}>{keyword}</div>
							<div className={classes.keyword_flexbox}>
								{list.map((app) => (
									<AppItem app={app} key={app.id} />
								))}
							</div>
						</React.Fragment>
					);
				})
			) : (
				<div className={classes.grid}>
					{Object.values(appsState).map((app) => (
						<AppItem app={app} key={app.id} />
					))}
				</div>
			)}
		</div>
	);
};

export default AppsList;
