import "server-only";
import React from "react";
import PageWrapper from "@/components/PageWrapper/PageWrapper";
import { getSeeds } from "@/api/seeds";
import FindAppsSearch from "@/features/FindApps/components/Search/FindAppsSearch";
import AppsList from "@/features/FindApps/components/AppsList/AppsList";
import { fixParams } from "@/utils/utils";
import { getCountryAppsInCategory, StoreType } from "@/api/apps";
import Meta from "@/components/Meta/Meta";

interface Props {
	params: {
		category: string;
		country: string;
		subcategory: string;
		store: StoreType;
	};
}

const page = async ({ params }: Props) => {
	const paramsFixed = fixParams(params);
	const seeds = await getSeeds();
	const apps = await getCountryAppsInCategory(
		paramsFixed.store,
		paramsFixed.country,
		paramsFixed.subcategory
	);

	return (
		<Meta
			title={`${paramsFixed.store} | ${paramsFixed.subcategory} ${paramsFixed.category} Apps | ${paramsFixed.country}`}
		>
			<PageWrapper>
				<FindAppsSearch
					seeds={seeds}
					initials={{
						initialCountry: paramsFixed.country,
						initialCategory: paramsFixed.category,
						initialSubcategory: paramsFixed.subcategory,
						initialStore: paramsFixed.store,
						initialCity: "None",
					}}
				/>
				<AppsList apps={apps} />
			</PageWrapper>
		</Meta>
	);
};

export default page;
