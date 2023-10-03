import React from "react";
import PageWrapper from "@/components/PageWrapper/PageWrapper";
import { getSeeds } from "@/api/seeds";
import FindAppsSearch from "@/features/FindApps/components/Search/FindAppsSearch";
import AppsList from "@/features/FindApps/components/AppsList/AppsList";
import { getCityAppsInCategory } from "@/api/apps";
import { fixParams } from "@/utils/utils";
import "server-only";

interface Props {
	params: { category: string; city: string };
}

const page = async ({ params }: Props) => {
	const paramsFixed = fixParams(params);
	const seeds = await getSeeds();
	const apps = await getCityAppsInCategory(
		paramsFixed.city,
		paramsFixed.category
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
					initialCountry: country,
				}}
			/>
			<AppsList apps={apps} isPortfolio category={paramsFixed.category} />
		</PageWrapper>
	);
};

export default page;
