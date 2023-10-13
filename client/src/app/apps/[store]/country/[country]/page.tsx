import "server-only";
import React from "react";
import PageWrapper from "@/components/PageWrapper/PageWrapper";
import { getSeeds } from "@/api/seeds";
import FindAppsSearch from "@/features/FindApps/components/Search/FindAppsSearch";
import AppsList from "@/features/FindApps/components/AppsList/AppsList";
import {getCountryApps, StoreType} from "@/api/apps";
import { fixParams } from "@/utils/utils";

interface Props {
	params: { country: string,store:StoreType};
}

const page = async ({ params }: Props) => {
	const paramsFixed = fixParams(params);
	const seeds = await getSeeds();
	const apps = await getCountryApps(paramsFixed.store,paramsFixed.country);
	return (
		<PageWrapper>
			<FindAppsSearch
				seeds={seeds}
				initials={{ initialCountry: paramsFixed.country,initialStore:paramsFixed.store,}}
			/>
			<AppsList apps={apps} isPortfolio />
		</PageWrapper>
	);
};

export default page;
