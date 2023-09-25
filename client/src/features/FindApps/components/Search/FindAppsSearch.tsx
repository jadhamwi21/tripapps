"use client";
import Select from "@/components/Select/Select";
import CategoryFilterItem from "@/features/FindApps/components/CategoryFilterItem/CategoryFilterItem";
import { useSearch as useLocationFilters } from "@/features/FindApps/hooks/useSearch";
import { ISeeds } from "@/ts/interfaces/seeds.interfaces";
import { FunctionComponent, useMemo, useState } from "react";
import classes from "./FindAppsSearch.module.scss";
import Button from "@/components/Button/Button";
import Link from "next/link";

type Props = {
	seeds: ISeeds;
	initials?: {
		initialCountry?: string;
		initialCity?: string;
		initialCategory?: string;
		initialSubcategory?: string;
	};
};

const FindAppsSearch: FunctionComponent<Props> = ({ seeds, initials }) => {
	const { cityOnChange, countryOnChange, search, countries, cities } =
		useLocationFilters(seeds.locations, {
			country: initials?.initialCountry,
			city: initials?.initialCity,
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
			filter.category
		) {
			if (!search.country && !search.city) {
				if (filter.subcategory) {
					return `/apps/category/${filter.category.toLowerCase()}/${filter.subcategory.toLowerCase()}`;
				} else {
					return `/apps/category/${filter.category.toLowerCase()}`;
				}
			} else {
				const routePathArray = ["/apps"];
				const { country, city } = search;
				const { category, subcategory } = filter;
				if (city) {
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

			<div className={classes.filters_container}>
				{Object.keys(seeds.categories).map((category, index) => (
					<CategoryFilterItem
						name={category}
						key={category}
						onClick={categoryOnClick}
						subcategories={seeds.categories[category] ?? []}
						categorySelected={filter.category}
						subcategorySelected={filter.subcategory}
					/>
				))}
			</div>
			<Link href={linkTo}>
				<Button variant="primary">Find</Button>
			</Link>
		</div>
	);
};

export default FindAppsSearch;
