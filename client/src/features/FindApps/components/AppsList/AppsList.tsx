"use client";
import React, { FunctionComponent, useMemo, useRef } from "react";
import { IApp } from "@/ts/interfaces/apps.interfaces";
import classes from "./AppsList.module.css";
import AppItem from "@/features/FindApps/components/AppsList/AppItem/AppItem";
import { FixedSizeList as List } from "react-window";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

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
					const listRef = useRef<HTMLDivElement>(null);
					return (
						<React.Fragment key={keyword}>
							<div className={classes.keyword}>{keyword}</div>
							<div className={classes.keyword_flexbox}>
								<div className={classes.icon}>
									<FontAwesomeIcon
										icon={faArrowLeft}
										size={"xl"}
										onClick={() => {
											if (listRef.current) {
												listRef.current.scrollTo({
													left: listRef.current.scrollLeft - ITEM_SIZE,
												});
											}
										}}
									/>
								</div>
								<List
									height={325}
									itemSize={ITEM_SIZE}
									itemCount={list.length}
									layout={"horizontal"}
									width={800}
									outerRef={listRef}
								>
									{({ index, style }) => (
										<AppItem
											app={list[index]}
											key={list[index].appId}
											style={style}
										/>
									)}
								</List>
								<div className={classes.icon}>
									<FontAwesomeIcon
										icon={faArrowRight}
										size={"xl"}
										onClick={() => {
											if (listRef.current) {
												listRef.current.scrollTo({
													left: listRef.current.scrollLeft + ITEM_SIZE,
												});
											}
										}}
									/>
								</div>
							</div>
						</React.Fragment>
					);
				})
			) : (
				<div className={classes.grid}>
					{apps.map((app) => (
						<AppItem app={app} key={app.appId} />
					))}
				</div>
			)}
		</div>
	);
};

export default AppsList;
