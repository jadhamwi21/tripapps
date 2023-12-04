import React from "react";
import PageWrapper from "@/components/PageWrapper/PageWrapper";
import { getSeeds } from "@/api/seeds";
import FindAppsSearch from "@/features/FindApps/components/Search/FindAppsSearch";
import AppsList from "@/features/FindApps/components/AppsList/AppsList";
import { fixParams } from "@/utils/utils";
import "server-only";
import { getAppsInCategory, StoreType } from "@/api/apps";
import Meta from "@/components/Meta/Meta";

interface Props {
	params: { subcategory: string; category: string; store: StoreType };
}

const page = async ({ params }: Props) => {
	const paramsFixed = fixParams(params);
	const seeds = await getSeeds();
	const apps = await getAppsInCategory(
		paramsFixed.store,
		paramsFixed.subcategory
	);

	return (
		<Meta
			title={`${paramsFixed.store} | ${paramsFixed.subcategory} ${paramsFixed.category} Apps`}
		>
			<PageWrapper>
				<FindAppsSearch
					seeds={seeds}
					initials={{
						initialSubcategory: paramsFixed.subcategory,
						initialCategory: paramsFixed.category,
						initialCountry: "None",
						initialCity: "None",
					}}
				/>
				<AppsList apps={apps} />
			</PageWrapper>
		</Meta>
	);
};

export default page;
