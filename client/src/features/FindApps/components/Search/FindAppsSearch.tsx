"use client";
import Select from "@/components/Select/Select";
import CategoryFilterItem from "@/features/FindApps/components/CategoryFilterItem/CategoryFilterItem";
import { useSearch as useLocationFilters } from "@/features/FindApps/hooks/useSearch";
import { ISeeds } from "@/ts/interfaces/seeds.interfaces";
import { FunctionComponent, useMemo, useState } from "react";
import classes from "./FindAppsSearch.module.scss";
import Button from "@/components/Button/Button";
import Link from "next/link";
import { faAppStoreIos } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { StoreType } from "@/api/apps";
import AppstoreIcon from "../../../../../public/appstore.svg";
import PlaystoreIcon from "../../../../../public/playstore.svg";

type Props = {
	seeds: ISeeds;
	initials?: {
		initialCountry?: string;
		initialCity?: string;
		initialCategory?: string;
		initialSubcategory?: string;
		initialStore?: StoreType;
	};
};

const FindAppsSearch: FunctionComponent<Props> = ({ seeds, initials }) => {
	const {
		cityOnChange,
		countryOnChange,
		search,
		countries,
		cities,
		storeOnChange,
	} = useLocationFilters(seeds.locations, {
		country: initials?.initialCountry,
		city: initials?.initialCity,
		store: initials?.initialStore,
	});

	const [filter, setFilter] = useState({
		category: initials?.initialCategory || "",
		subcategory: initials?.initialSubcategory || "",
	});

	const categoryOnClick = (category: string, subcategory?: string) => {
		setFilter({ category, subcategory: subcategory || "" });
	};

	const linkTo = useMemo(() => {
		if (
			search.city ||
			search.country ||
			filter.subcategory ||
			filter.category ||
			search.store
		) {
			if (search.country === "None" && search.city === "None") {
				if (search.store) {
					if (filter.subcategory) {
						return `/apps/${search.store.toLowerCase()}/category/${filter.category.toLowerCase()}/${filter.subcategory.toLowerCase()}`;
					} else if (filter.category) {
						return `/apps/${search.store.toLowerCase()}/category/${filter.category.toLowerCase()}`;
					} else {
						return `/apps/${search.store.toLowerCase()}`;
					}
				}
			} else {
				const routePathArray = [`/apps/${search.store.toLowerCase()}`];
				const { country, city } = search;
				const { category, subcategory } = filter;
				if (city !== "None") {
					routePathArray.push(...["city", city.toLowerCase()]);
				} else {
					routePathArray.push(...["country", country.toLowerCase()]);
				}
				if (category) {
					routePathArray.push(...["category", category.toLowerCase()]);
					if (subcategory) {
						routePathArray.push(subcategory.toLowerCase());
					}
				}
				return routePathArray.join("/");
			}
		}
		return "";
	}, [search, filter]);

	return (
		<div className={classes.container}>
			<Select
				label={"Store"}
				list={[
					{
						name: "Playstore",
						value: "Playstore",
						image: PlaystoreIcon,
					},
					{ name: "Appstore", value: "Appstore", image: AppstoreIcon },
				]}
				onChange={storeOnChange}
				value={search.store}
			/>
			<Select
				label={"Country"}
				list={countries.map((country) => ({
					name: country,
					value: country,
					icon: `${process.env.NEXT_PUBLIC_API_URL}/icons/countries/${country}.svg`,
				}))}
				onChange={countryOnChange}
				value={search.country}
			/>

			<Select
				disabled={cities.length === 0}
				label={"City"}
				list={cities.map((country) => ({
					name: country,
					value: country,
				}))}
				onChange={cityOnChange}
				value={search.city}
			/>
			<div className={classes.query_text}>
				{filter.category && (
					<span
						className={classes.query_category}
						onClick={() => {
							setFilter({ category: "", subcategory: "" });
						}}
					>
						{filter.category}
					</span>
				)}
				{filter.subcategory && (
					<>
						<span style={{ color: "var(--grey)" }}>/</span>
						<span
							className={classes.query_category}
							onClick={() => {
								setFilter({ ...filter, subcategory: "" });
							}}
						>
							{filter.subcategory}
						</span>
					</>
				)}
			</div>

			{(!filter.category || !filter.subcategory) && (
				<div className={classes.filters_container}>
					{!filter.category
						? Object.keys(seeds.categories).map((category) => (
								<CategoryFilterItem
									name={category}
									key={category}
									onClick={categoryOnClick}
								/>
						  ))
						: seeds.categories[filter.category]
						? seeds.categories[filter.category].map((subcategory) => (
								<CategoryFilterItem
									name={subcategory}
									key={subcategory}
									onClick={(subcategory) =>
										categoryOnClick(filter.category, subcategory)
									}
								/>
						  ))
						: null}
				</div>
			)}
			<Link href={linkTo}>
				<Button variant="primary">Find</Button>
			</Link>
		</div>
	);
};

export default FindAppsSearch;
