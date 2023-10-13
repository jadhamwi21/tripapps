import "server-only";
import React from "react";
import PageWrapper from "@/components/PageWrapper/PageWrapper";
import { getSeeds } from "@/api/seeds";
import FindAppsSearch from "@/features/FindApps/components/Search/FindAppsSearch";
import AppsList from "@/features/FindApps/components/AppsList/AppsList";
import {getCityApps, StoreType} from "@/api/apps";
import { fixParams } from "@/utils/utils";
import "server-only";

interface Props {
	params: { city: string,store:StoreType };
}

const page = async ({ params }: Props) => {
	const paramsFixed = fixParams(params);
	const seeds = await getSeeds();
	const apps = await getCityApps(paramsFixed.store,paramsFixed.city);
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
					initialCountry: country,initialStore:paramsFixed.store,
				}}
			/>
			<AppsList apps={apps} isPortfolio />
		</PageWrapper>
	);
};

export default page;
