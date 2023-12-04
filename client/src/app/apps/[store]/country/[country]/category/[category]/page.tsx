import "server-only";
import React from "react";
import PageWrapper from "@/components/PageWrapper/PageWrapper";
import { getSeeds } from "@/api/seeds";
import FindAppsSearch from "@/features/FindApps/components/Search/FindAppsSearch";
import AppsList from "@/features/FindApps/components/AppsList/AppsList";
import { getCountryAppsInCategory, StoreType } from "@/api/apps";
import { fixParams } from "@/utils/utils";
import Meta from "@/components/Meta/Meta";

interface Props {
	params: { category: string; country: string; store: StoreType };
}

const page = async ({ params }: Props) => {
	const paramsFixed = fixParams(params);
	const seeds = await getSeeds();
	const apps = await getCountryAppsInCategory(
		paramsFixed.store,
		paramsFixed.country,
		paramsFixed.category
	);

	return (
		<Meta
			title={`${paramsFixed.store} | ${paramsFixed.category} Apps | ${paramsFixed.country}`}
		>
			<PageWrapper>
				<FindAppsSearch
					seeds={seeds}
					initials={{
						initialStore: paramsFixed.store,
						initialCountry: paramsFixed.country,
						initialCategory: paramsFixed.category,

						initialCity: "None",
					}}
				/>
				<AppsList apps={apps} portfolio category={paramsFixed.category} />
			</PageWrapper>
		</Meta>
	);
};

export default page;
