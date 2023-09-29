import React from "react";
import PageWrapper from "@/components/PageWrapper/PageWrapper";
import { getSeeds } from "@/api/seeds";
import FindAppsSearch from "@/features/FindApps/components/Search/FindAppsSearch";
import AppsList from "@/features/FindApps/components/AppsList/AppsList";
import { getCityAppsInCategoryAndSubcategory } from "@/api/apps";
import { fixParams } from "@/utils/utils";
import "server-only";

export async function generateStaticParams() {
	const seeds = await getSeeds();

	return Object.values(seeds.categories)
		.flat()
		.map((subcategory) => ({ subcategory: subcategory.toLowerCase() }));
}

interface Props {
	params: { category: string; city: string; subcategory: string };
}

const page = async ({ params }: Props) => {
	const paramsFixed = fixParams(params);
	const seeds = await getSeeds();
	const apps = await getCityAppsInCategoryAndSubcategory(
		paramsFixed.city,
		paramsFixed.category,
		paramsFixed.subcategory
	);
	const country = (() => {
		for (const country of Object.keys(seeds.locations)) {
			const countryCities = seeds.locations[country];
			if (countryCities.indexOf(paramsFixed.city) >= 0) {
				return country;
			}
		}
		return "";
	})();

	return (
		<PageWrapper>
			<FindAppsSearch
				seeds={seeds}
				initials={{
					initialCity: paramsFixed.city,
					initialCategory: paramsFixed.category,
					initialSubcategory: paramsFixed.subcategory,
					initialCountry: country,
				}}
			/>
			<AppsList apps={apps} />
		</PageWrapper>
	);
};

export default page;
