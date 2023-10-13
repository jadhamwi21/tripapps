import "server-only";
import React from "react";
import PageWrapper from "@/components/PageWrapper/PageWrapper";
import { getSeeds } from "@/api/seeds";
import FindAppsSearch from "@/features/FindApps/components/Search/FindAppsSearch";
import AppsList from "@/features/FindApps/components/AppsList/AppsList";
import { StoreType, getAllApps, getCountryApps } from "@/api/apps";
import { fixParams } from "@/utils/utils";

interface Props {
	params: { store: StoreType };
}

const page = async ({ params }: Props) => {
	const paramsFixed = fixParams(params);
	const seeds = await getSeeds();

	const apps = await getAllApps(paramsFixed.store);
	return (
		<PageWrapper>
			<FindAppsSearch
				seeds={seeds}
				initials={{
					initialStore: paramsFixed.store,
				}}
			/>
			<AppsList apps={apps} isPortfolio />
		</PageWrapper>
	);
};

export default page;
