"use client";
import React, { FunctionComponent, useEffect, useMemo } from "react";
import { ISeeds } from "@/ts/interfaces/seeds.interfaces";
import classes from "./FindAppsSearch.module.scss";
import Select from "@/components/Select/Select";
import { useSearch } from "@/features/FindApps/hooks/useSearch";
import { useCategoriesFilter } from "@/features/FindApps/hooks/useCategoriesFilter";
import CategoryFilterItem from "@/features/FindApps/components/CategoryFilterItem/CategoryFilterItem";
import { useRouter } from "next/navigation";
import { useIsFirstRender } from "usehooks-ts";
import Link from "next/link";
import Button from "@/components/Button/Button";

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
		useSearch(seeds.locations, {
			country: initials?.initialCountry,
			city: initials?.initialCity,
		});
	const {
		categoryOnClick,
		categoriesItems,
		filter,
		clearCategory,
		clearSubCategory,
	} = useCategoriesFilter(seeds.categories, {
		category: initials?.initialCategory,
		subcategory: initials?.initialSubcategory,
	});

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
				{(filter.category || filter.subcategory) && (
					<div className={classes.selected_categories}>
						{filter.category && (
							<CategoryFilterItem
								name={filter.category}
								onClick={clearCategory}
							/>
						)}
						{filter.subcategory && (
							<CategoryFilterItem
								name={filter.subcategory}
								onClick={clearSubCategory}
							/>
						)}
					</div>
				)}
				<div className={classes.available_categories}>
					{categoriesItems.map((category, index) => (
						<CategoryFilterItem
							name={category}
							key={category}
							onClick={categoryOnClick}
						/>
					))}
				</div>
			</div>
			<Link href={linkTo}>
				<Button variant="primary">Search</Button>
			</Link>
		</div>
	);
};

export default FindAppsSearch;
