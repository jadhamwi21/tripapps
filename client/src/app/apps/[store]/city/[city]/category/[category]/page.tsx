import React from "react";
import PageWrapper from "@/components/PageWrapper/PageWrapper";
import { getSeeds } from "@/api/seeds";
import FindAppsSearch from "@/features/FindApps/components/Search/FindAppsSearch";
import AppsList from "@/features/FindApps/components/AppsList/AppsList";
import { getCityAppsInCategory, StoreType } from "@/api/apps";
import { fixParams } from "@/utils/utils";
import "server-only";
import Meta from "@/components/Meta/Meta";

interface Props {
	params: { category: string; city: string; store: StoreType };
}

const page = async ({ params }: Props) => {
	const paramsFixed = fixParams(params);
	const seeds = await getSeeds();
	const apps = await getCityAppsInCategory(
		paramsFixed.store,
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
		<Meta
			title={`${paramsFixed.store} | ${paramsFixed.category} Apps | ${paramsFixed.city}`}
		>
			<PageWrapper>
				<FindAppsSearch
					seeds={seeds}
					initials={{
						initialCity: paramsFixed.city,
						initialCategory: paramsFixed.category,
						initialCountry: country,
						initialStore: paramsFixed.store,
					}}
				/>
				<AppsList apps={apps} portfolio category={paramsFixed.category} />
			</PageWrapper>
		</Meta>
	);
};

export default page;
