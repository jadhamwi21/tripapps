import "server-only";
import React from "react";
import PageWrapper from "@/components/PageWrapper/PageWrapper";
import { getSeeds } from "@/api/seeds";
import FindAppsSearch from "@/features/FindApps/components/Search/FindAppsSearch";
import AppsList from "@/features/FindApps/components/AppsList/AppsList";
import { fixParams } from "@/utils/utils";
import { getCountryAppsInCategory } from "@/api/apps";

interface Props {
	params: { category: string; country: string; subcategory: string };
}

const page = async ({ params }: Props) => {
	const paramsFixed = fixParams(params);
	const seeds = await getSeeds();
	const apps = await getCountryAppsInCategory(
		paramsFixed.country,
		paramsFixed.subcategory
	);

	return (
		<PageWrapper>
			<FindAppsSearch
				seeds={seeds}
				initials={{
					initialCountry: paramsFixed.country,
					initialCategory: paramsFixed.category,
					initialSubcategory: paramsFixed.subcategory,
				}}
			/>
			<AppsList apps={apps} />
		</PageWrapper>
	);
};

export default page;
